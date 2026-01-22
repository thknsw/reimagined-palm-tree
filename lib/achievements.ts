import type { AchievementBadge, BadgeCheckData } from "./study-types"

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  // Getting Started
  {
    id: "first-question",
    name: "First Steps",
    description: "Answer your first question",
    icon: "🎯",
    tier: "bronze",
    requirement: (data) => data.totalAttempted >= 1,
  },
  {
    id: "ten-questions",
    name: "Getting Warmed Up",
    description: "Answer 10 questions",
    icon: "🔥",
    tier: "bronze",
    requirement: (data) => data.totalAttempted >= 10,
  },
  {
    id: "fifty-questions",
    name: "Dedicated Learner",
    description: "Answer 50 questions",
    icon: "📚",
    tier: "silver",
    requirement: (data) => data.totalAttempted >= 50,
  },
  {
    id: "hundred-questions",
    name: "Centurion",
    description: "Answer 100 questions",
    icon: "💯",
    tier: "gold",
    requirement: (data) => data.totalAttempted >= 100,
  },
  {
    id: "two-fifty-questions",
    name: "AWS Scholar",
    description: "Answer 250 questions",
    icon: "🎓",
    tier: "platinum",
    requirement: (data) => data.totalAttempted >= 250,
  },

  // Accuracy
  {
    id: "five-streak",
    name: "Hot Streak",
    description: "Get 5 correct answers in a row",
    icon: "⚡",
    tier: "bronze",
    requirement: (data) => data.bestStreak >= 5,
  },
  {
    id: "ten-streak",
    name: "On Fire",
    description: "Get 10 correct answers in a row",
    icon: "🔥",
    tier: "silver",
    requirement: (data) => data.bestStreak >= 10,
  },
  {
    id: "twenty-streak",
    name: "Unstoppable",
    description: "Get 20 correct answers in a row",
    icon: "🚀",
    tier: "gold",
    requirement: (data) => data.bestStreak >= 20,
  },
  {
    id: "fifty-streak",
    name: "Legendary",
    description: "Get 50 correct answers in a row",
    icon: "👑",
    tier: "platinum",
    requirement: (data) => data.bestStreak >= 50,
  },

  // Domain Mastery
  {
    id: "domain-master",
    name: "Domain Explorer",
    description: "Attempt questions in all 6 domains",
    icon: "🗺️",
    tier: "bronze",
    requirement: (data) => Object.keys(data.domainProgress).length >= 6,
  },
  {
    id: "security-expert",
    name: "Security Expert",
    description: "Score 80%+ accuracy in Security domain (min 10 questions)",
    icon: "🔒",
    tier: "gold",
    requirement: (data) => {
      const security = data.domainProgress["Security and Compliance"]
      return security && security.attempted >= 10 && security.correct / security.attempted >= 0.8
    },
  },
  {
    id: "cloud-architect",
    name: "Cloud Architect",
    description: "Score 80%+ accuracy in Cloud Technology domain (min 10 questions)",
    icon: "☁️",
    tier: "gold",
    requirement: (data) => {
      const tech = data.domainProgress["Cloud Technology and Services"]
      return tech && tech.attempted >= 10 && tech.correct / tech.attempted >= 0.8
    },
  },

  // Special
  {
    id: "pre-test-taker",
    name: "Brave Start",
    description: "Complete the diagnostic pre-test",
    icon: "📝",
    tier: "silver",
    requirement: (data) => data.preTestTaken,
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Bookmark 10 questions for review",
    icon: "🔖",
    tier: "bronze",
    requirement: (data) => data.bookmarkedCount >= 10,
  },
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    description: "Complete 5 quizzes with 80%+ score",
    icon: "🏆",
    tier: "gold",
    requirement: (data) => {
      const highScoreQuizzes = data.quizHistory.filter((q) => q.correct / q.totalQuestions >= 0.8)
      return highScoreQuizzes.length >= 5
    },
  },
  {
    id: "confident-learner",
    name: "Confident Learner",
    description: "Rate 20 answers with high confidence (4-5) and get them correct",
    icon: "💪",
    tier: "silver",
    requirement: (data) => {
      const highConfidenceCorrect = Object.values(data.confidenceData).filter(
        (c) => c.rating >= 4 && c.wasCorrect,
      ).length
      return highConfidenceCorrect >= 20
    },
  },
  {
    id: "self-aware",
    name: "Self Aware",
    description: "Correctly identify 5 questions you weren't confident about",
    icon: "🧠",
    tier: "silver",
    requirement: (data) => {
      const lowConfidenceCorrect = Object.values(data.confidenceData).filter(
        (c) => c.rating <= 2 && !c.wasCorrect,
      ).length
      return lowConfidenceCorrect >= 5
    },
  },
]

export function checkNewBadges(data: BadgeCheckData, alreadyUnlocked: string[]): AchievementBadge[] {
  return ACHIEVEMENT_BADGES.filter((badge) => !alreadyUnlocked.includes(badge.id) && badge.requirement(data))
}

export function getTierColor(tier: AchievementBadge["tier"]): string {
  switch (tier) {
    case "bronze":
      return "bg-amber-700/20 border-amber-700/50 text-amber-600"
    case "silver":
      return "bg-slate-400/20 border-slate-400/50 text-slate-400"
    case "gold":
      return "bg-yellow-500/20 border-yellow-500/50 text-yellow-500"
    case "platinum":
      return "bg-cyan-400/20 border-cyan-400/50 text-cyan-400"
  }
}
