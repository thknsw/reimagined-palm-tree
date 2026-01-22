import { SCENARIOS, DOMAINS } from "./scenarios"
import type {
  DomainProgress,
  SessionStats,
  SpacedRepetitionData,
  StudyPlan,
  PreparednessData,
  QuizResult,
} from "./study-types"

// Domain weights based on AWS exam blueprint (approximate)
const DOMAIN_WEIGHTS: { [key: string]: number } = {
  "Cloud Concepts": 0.24,
  "Security and Compliance": 0.3,
  "Cloud Technology and Services": 0.34,
  "Billing, Pricing and Support": 0.12,
  "Deployment and Operations": 0.0, // Combined into Cloud Technology
  "Monitoring and Optimization": 0.0, // Combined into Cloud Technology
}

const DEFAULT_SESSION_STATS: SessionStats = {
  attempted: 0,
  correct: 0,
  incorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  startTime: Date.now(),
}

export function calculatePreparedness(
  domainProgress: DomainProgress,
  sessionStats: SessionStats | undefined | null,
  spacedRepData: SpacedRepetitionData,
  quizHistory: QuizResult[],
  studyPlan: StudyPlan | null,
): PreparednessData {
  const stats = sessionStats ?? DEFAULT_SESSION_STATS

  const domains = DOMAINS.filter((d) => d !== "All Domains")

  // Calculate domain scores
  const domainScores: { [key: string]: number } = {}

  for (const domain of domains) {
    const progress = domainProgress[domain]
    const domainScenarios = SCENARIOS.filter((s) => s.domain === domain)

    if (!progress || progress.attempted === 0) {
      domainScores[domain] = 0
      continue
    }

    // Components of domain score:
    // 1. Accuracy (60% weight)
    const accuracy = (progress.correct / progress.attempted) * 100

    // 2. Coverage (20% weight) - what percentage of questions attempted
    const coverage = (progress.attempted / domainScenarios.length) * 100

    // 3. Mastery (20% weight) - spaced repetition success
    let masteredCount = 0
    for (const scenario of domainScenarios) {
      const srData = spacedRepData[scenario.id]
      if (srData && srData.repetitions >= 3 && srData.easeFactor >= 2.3) {
        masteredCount++
      }
    }
    const mastery = domainScenarios.length > 0 ? (masteredCount / domainScenarios.length) * 100 : 0

    domainScores[domain] = Math.min(100, accuracy * 0.6 + coverage * 0.2 + mastery * 0.2)
  }

  // Calculate weighted overall score
  let weightedScore = 0
  let totalWeight = 0

  for (const domain of domains) {
    const weight = DOMAIN_WEIGHTS[domain] || 0.1
    if (domainScores[domain] > 0) {
      weightedScore += domainScores[domain] * weight
      totalWeight += weight
    }
  }

  // If user has attempted questions, calculate score; otherwise 0
  const overallScore =
    totalWeight > 0 ? weightedScore / totalWeight : stats.attempted > 0 ? (stats.correct / stats.attempted) * 100 : 0

  // Find weakest and strongest domains
  const sortedDomains = domains
    .filter((d) => domainScores[d] !== undefined)
    .sort((a, b) => domainScores[a] - domainScores[b])

  const weakestDomains = sortedDomains.filter((d) => domainScores[d] < 70).slice(0, 3)

  const strongestDomains = sortedDomains
    .filter((d) => domainScores[d] >= 70)
    .reverse()
    .slice(0, 2)

  // Calculate questions needed for mastery
  const totalScenarios = SCENARIOS.length
  const masteredScenarios = Object.values(spacedRepData).filter(
    (sr) => sr.repetitions >= 3 && sr.easeFactor >= 2.3,
  ).length
  const questionsToMastery = Math.max(0, Math.round(totalScenarios * 0.8) - masteredScenarios)

  // Estimate ready date based on learning rate
  let estimatedReadyDate: number | null = null
  const targetScore = studyPlan?.targetScore || 70

  if (stats.attempted >= 10) {
    const currentAccuracy = stats.correct / stats.attempted
    const improvementNeeded = targetScore / 100 - currentAccuracy

    if (improvementNeeded <= 0) {
      estimatedReadyDate = Date.now() // Already ready!
    } else {
      // Estimate based on recent quiz history improvement rate
      const recentQuizzes = quizHistory.slice(-5)
      let avgImprovement = 0.01 // Default 1% per day

      if (recentQuizzes.length >= 2) {
        const scores = recentQuizzes.map((q) => q.correct / q.totalQuestions)
        const improvement = scores[scores.length - 1] - scores[0]
        const daySpan = (recentQuizzes[recentQuizzes.length - 1].date - recentQuizzes[0].date) / (1000 * 60 * 60 * 24)
        if (daySpan > 0) {
          avgImprovement = Math.max(0.005, improvement / daySpan)
        }
      }

      const daysToReady = Math.ceil(improvementNeeded / avgImprovement)
      estimatedReadyDate = Date.now() + daysToReady * 24 * 60 * 60 * 1000
    }
  }

  // Calculate days until test
  const daysUntilTest = studyPlan ? Math.ceil((studyPlan.testDate - Date.now()) / (1000 * 60 * 60 * 24)) : 0

  // Determine if on track
  const onTrack =
    !studyPlan ||
    overallScore >= targetScore ||
    (estimatedReadyDate !== null && estimatedReadyDate <= studyPlan.testDate)

  // Generate recommendation
  let recommendation: string

  if (stats.attempted < 10) {
    recommendation = "Complete more questions to get accurate predictions"
  } else if (overallScore >= targetScore) {
    recommendation = "You're ready! Keep practicing to stay sharp"
  } else if (!studyPlan) {
    recommendation = "Set a study plan to track your exam readiness"
  } else if (onTrack) {
    recommendation = "You're on track! Keep up the good work"
  } else if (daysUntilTest <= 7) {
    recommendation = "Focus intensively on your weakest domains"
  } else {
    recommendation = `Focus on: ${weakestDomains[0] || "all domains"}`
  }

  return {
    overallScore,
    domainScores,
    weakestDomains,
    strongestDomains,
    questionsToMastery,
    estimatedReadyDate,
    daysUntilTest,
    onTrack,
    recommendation,
  }
}

export function generateDailyGoal(
  studyPlan: StudyPlan,
  preparedness: PreparednessData,
  sessionStats: SessionStats | undefined | null,
): { questionsTarget: number; focusDomain: string | null } {
  const stats = sessionStats ?? DEFAULT_SESSION_STATS

  const { dailyStudyMinutes, targetScore, studyDaysPerWeek } = studyPlan

  // Estimate ~2 minutes per question on average
  const baseQuestions = Math.round(dailyStudyMinutes / 2)

  // Adjust based on preparedness gap
  const gap = targetScore - preparedness.overallScore
  let multiplier = 1

  if (gap > 20) {
    multiplier = 1.3 // Need to study more
  } else if (gap > 10) {
    multiplier = 1.15
  } else if (gap <= 0) {
    multiplier = 0.8 // Maintenance mode
  }

  if (studyDaysPerWeek === 5) {
    multiplier *= 1.2 // 20% more per day to compensate for fewer days
  }

  const questionsTarget = Math.round(baseQuestions * multiplier)
  const focusDomain = preparedness.weakestDomains[0] || null

  return { questionsTarget, focusDomain }
}
