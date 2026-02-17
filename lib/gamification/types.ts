// Duolingo-style gamification types

export interface UserGamification {
  user_id: string
  xp: number
  total_xp: number
  level: number
  hearts: number
  max_hearts: number
  streak_days: number
  last_activity_date: string | null
  streak_freeze_count: number
  gems: number
  league: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  league_position: number
  created_at: string
  updated_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  unit_id: string
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed' | 'mastered'
  stars: number // 0-3
  xp_earned: number
  completion_date: string | null
  last_attempted: string | null
  attempts: number
  created_at: string
  updated_at: string
}

export interface QuestionAttempt {
  id: string
  user_id: string
  question_id: string
  lesson_id: string
  is_correct: boolean
  time_taken_seconds: number
  heart_lost: boolean
  created_at: string
}

export interface DailyChallenge {
  id: string
  user_id: string
  challenge_type: 'xp_goal' | 'lessons_completed' | 'perfect_lesson' | 'streak_maintain'
  target_value: number
  current_value: number
  is_completed: boolean
  reward_gems: number
  challenge_date: string
  created_at: string
  completed_at: string | null
}

export interface Achievement {
  id: string
  key: string
  name: string
  description: string
  icon: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  xp_reward: number
  gem_reward: number
  requirement_value: number
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  progress: number
}

export interface LeaderboardEntry {
  user_id: string
  username: string
  avatar_url: string | null
  xp_this_week: number
  league: string
  rank: number
}

export interface ShopItem {
  id: string
  name: string
  description: string
  icon: string
  type: 'streak_freeze' | 'heart_refill' | 'xp_boost' | 'heart_unlimited'
  cost_gems: number
  duration_hours?: number
}

export interface ShopPurchase {
  id: string
  user_id: string
  item_type: string
  gems_spent: number
  expires_at: string | null
  is_active: boolean
  created_at: string
}

// Lesson Structure Types
export interface Unit {
  id: string
  order: number
  name: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  unitId: string
  order: number
  title: string
  description: string
  type: 'lesson' | 'story' | 'practice' | 'unit_review' | 'chest'
  icon: string
  xpReward: number
  questions: LessonQuestion[]
  requiredLessons?: string[] // IDs of lessons that must be completed first
}

export interface LessonQuestion {
  id: string
  type: 'multiple_choice' | 'scenario' | 'match' | 'select_missing' | 'true_false' | 'pairing'
  question: string
  context?: string
  options?: string[]
  pairs?: Array<{ term: string; definition: string }> // For pairing questions
  correctAnswer: string | string[]
  explanation: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  xp: number
  hints?: Record<string, string> // For tap-to-see-meaning: word -> definition
  isMultiSelect?: boolean
  selectCount?: number
}

// UI State Types
export interface CelebrationData {
  type: 'lesson_complete' | 'level_up' | 'achievement' | 'streak' | 'perfect'
  title: string
  message: string
  xp?: number
  gems?: number
  achievement?: Achievement
  level?: number
}

export interface HeartLossData {
  question: string
  correctAnswer: string
  yourAnswer: string
  explanation: string
}
