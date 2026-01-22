import { SCENARIOS, DOMAINS } from "./scenarios"
import type { AdaptiveStudyData, PreTestResult, Scenario } from "./study-types"

// Domain weights based on AWS exam blueprint
const DOMAIN_WEIGHTS: { [key: string]: number } = {
  "Cloud Concepts": 0.24,
  "Security and Compliance": 0.3,
  "Cloud Technology and Services": 0.34,
  "Billing, Pricing and Support": 0.12,
}

export function generatePreTestQuestions(): Scenario[] {
  const questions: Scenario[] = []
  const targetCount = 65

  // Calculate questions per domain based on weights
  const domainCounts: { [key: string]: number } = {}
  let totalAssigned = 0

  for (const [domain, weight] of Object.entries(DOMAIN_WEIGHTS)) {
    const count = Math.round(targetCount * weight)
    domainCounts[domain] = count
    totalAssigned += count
  }

  // Adjust for rounding
  if (totalAssigned < targetCount) {
    domainCounts["Cloud Technology and Services"] += targetCount - totalAssigned
  }

  // Select questions from each domain
  for (const [domain, count] of Object.entries(domainCounts)) {
    const domainScenarios = SCENARIOS.filter(
      (s) =>
        s.domain === domain ||
        (domain === "Cloud Technology and Services" &&
          (s.domain === "Deployment and Operations" || s.domain === "Monitoring and Optimization")),
    )

    const shuffled = [...domainScenarios].sort(() => Math.random() - 0.5)
    questions.push(...shuffled.slice(0, Math.min(count, shuffled.length)))
  }

  // If we don't have enough questions, fill with random ones
  if (questions.length < targetCount) {
    const usedIds = new Set(questions.map((q) => q.id))
    const remaining = SCENARIOS.filter((s) => !usedIds.has(s.id))
    const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5)
    questions.push(...shuffledRemaining.slice(0, targetCount - questions.length))
  }

  // Final shuffle
  return questions.sort(() => Math.random() - 0.5).slice(0, targetCount)
}

export function calculateScaledScore(correct: number, total: number): number {
  // AWS uses a scaled score of 100-1000, with 700 passing
  // This is a simplified approximation
  const rawPercentage = correct / total

  // Map percentage to 100-1000 scale with some curve
  // 0% = 100, ~72% = 700 (passing), 100% = 1000
  const scaledScore = Math.round(100 + rawPercentage * 900)

  return Math.min(1000, Math.max(100, scaledScore))
}

export function generatePreTestResult(
  questions: Scenario[],
  answers: { [questionId: string]: number | number[] },
  timeSpent: number,
): PreTestResult {
  const domainScores: { [domain: string]: { correct: number; total: number } } = {}
  let totalCorrect = 0

  // Initialize domain scores
  for (const domain of DOMAINS.filter((d) => d !== "All Domains")) {
    domainScores[domain] = { correct: 0, total: 0 }
  }

  // Calculate scores
  for (const question of questions) {
    const userAnswer = answers[question.id]
    const domain = question.domain

    if (!domainScores[domain]) {
      domainScores[domain] = { correct: 0, total: 0 }
    }

    domainScores[domain].total++

    const isMultiSelect = question.isMultiSelect === true
    const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]

    let isCorrect: boolean
    if (isMultiSelect) {
      const selected = Array.isArray(userAnswer) ? userAnswer : []
      isCorrect = selected.length === correctAnswers.length && selected.every((s) => correctAnswers.includes(s))
    } else {
      isCorrect = userAnswer === question.correctAnswer
    }

    if (isCorrect) {
      domainScores[domain].correct++
      totalCorrect++
    }
  }

  // Determine weak and strong areas
  const weakAreas: string[] = []
  const strongAreas: string[] = []

  for (const [domain, scores] of Object.entries(domainScores)) {
    if (scores.total === 0) continue
    const percentage = (scores.correct / scores.total) * 100

    if (percentage < 70) {
      weakAreas.push(domain)
    } else if (percentage >= 80) {
      strongAreas.push(domain)
    }
  }

  const scaledScore = calculateScaledScore(totalCorrect, questions.length)

  return {
    id: Date.now().toString(),
    date: Date.now(),
    totalQuestions: questions.length,
    correct: totalCorrect,
    timeSpent,
    domainScores,
    weakAreas,
    strongAreas,
    scaledScore,
    passed: scaledScore >= 700,
  }
}

export function initializeAdaptiveData(preTestResult: PreTestResult): AdaptiveStudyData {
  const weakDomainsMultiplier: { [domain: string]: number } = {}

  // Set multipliers based on pre-test performance
  for (const [domain, scores] of Object.entries(preTestResult.domainScores)) {
    if (scores.total === 0) {
      weakDomainsMultiplier[domain] = 1
      continue
    }

    const percentage = (scores.correct / scores.total) * 100

    if (percentage < 50) {
      weakDomainsMultiplier[domain] = 2.5 // Very weak - 2.5x questions
    } else if (percentage < 70) {
      weakDomainsMultiplier[domain] = 1.8 // Weak - 1.8x questions
    } else if (percentage < 85) {
      weakDomainsMultiplier[domain] = 1.2 // Moderate - 1.2x questions
    } else {
      weakDomainsMultiplier[domain] = 0.8 // Strong - fewer questions
    }
  }

  return {
    preTestTaken: true,
    preTestResult,
    weakDomainsMultiplier,
    lastAdaptiveUpdate: Date.now(),
    consecutiveWeakPerformance: {},
    recentPerformance: [],
  }
}

export function updateAdaptiveData(
  currentData: AdaptiveStudyData,
  domain: string,
  wasCorrect: boolean,
): AdaptiveStudyData {
  const newRecentPerformance = [
    ...currentData.recentPerformance,
    { domain, correct: wasCorrect, timestamp: Date.now() },
  ].slice(-50) // Keep last 50 answers

  const newConsecutiveWeak = { ...currentData.consecutiveWeakPerformance }

  if (!wasCorrect) {
    newConsecutiveWeak[domain] = (newConsecutiveWeak[domain] || 0) + 1
  } else {
    newConsecutiveWeak[domain] = 0
  }

  // Recalculate multipliers every 10 questions
  const newMultipliers = { ...currentData.weakDomainsMultiplier }

  if (newRecentPerformance.length % 10 === 0) {
    // Calculate recent performance by domain
    const recentByDomain: { [d: string]: { correct: number; total: number } } = {}

    for (const perf of newRecentPerformance.slice(-30)) {
      if (!recentByDomain[perf.domain]) {
        recentByDomain[perf.domain] = { correct: 0, total: 0 }
      }
      recentByDomain[perf.domain].total++
      if (perf.correct) {
        recentByDomain[perf.domain].correct++
      }
    }

    // Adjust multipliers based on recent performance
    for (const [d, scores] of Object.entries(recentByDomain)) {
      if (scores.total < 3) continue

      const recentPct = (scores.correct / scores.total) * 100
      const currentMultiplier = newMultipliers[d] || 1

      if (recentPct < 50) {
        // Struggling - increase multiplier
        newMultipliers[d] = Math.min(3, currentMultiplier + 0.3)
      } else if (recentPct > 85) {
        // Improving - decrease multiplier
        newMultipliers[d] = Math.max(0.5, currentMultiplier - 0.2)
      }
    }
  }

  return {
    ...currentData,
    weakDomainsMultiplier: newMultipliers,
    lastAdaptiveUpdate: Date.now(),
    consecutiveWeakPerformance: newConsecutiveWeak,
    recentPerformance: newRecentPerformance,
  }
}

export function getAdaptiveScenarios(adaptiveData: AdaptiveStudyData | null, allScenarios: Scenario[]): Scenario[] {
  if (!adaptiveData || !adaptiveData.preTestTaken) {
    return allScenarios
  }

  // Build weighted pool
  const weightedPool: Scenario[] = []

  for (const scenario of allScenarios) {
    const multiplier = adaptiveData.weakDomainsMultiplier[scenario.domain] || 1
    const count = Math.round(multiplier)

    for (let i = 0; i < count; i++) {
      weightedPool.push(scenario)
    }
  }

  // Shuffle and return
  return weightedPool.sort(() => Math.random() - 0.5)
}
