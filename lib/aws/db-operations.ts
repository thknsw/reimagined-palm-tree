import { pgPool } from './clients'

/**
 * Get user gamification data
 */
export async function getUserGamification(userId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      SELECT * FROM user_gamification 
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
    `
    const result = await client.query(query, [userId])
    
    if (result.rows.length === 0) {
      // Initialize gamification for new user
      const initQuery = `
        INSERT INTO user_gamification (user_id, xp, level, hearts, max_hearts, gems, streak_days)
        VALUES ((SELECT id FROM users WHERE cognito_user_id = $1), 0, 1, 5, 5, 0, 0)
        RETURNING *
      `
      const initResult = await client.query(initQuery, [userId])
      return initResult.rows[0]
    }
    
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Award XP to user
 */
export async function awardXp(userId: string, xpAmount: number) {
  const client = await pgPool.connect()
  try {
    const query = `
      UPDATE user_gamification
      SET xp = xp + $1
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $2)
      RETURNING xp, level
    `
    const result = await client.query(query, [xpAmount, userId])
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Lose a heart
 */
export async function loseHeart(userId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      UPDATE user_gamification
      SET hearts = CASE 
        WHEN hearts > 0 THEN hearts - 1 
        ELSE 0 
      END
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      RETURNING hearts, max_hearts
    `
    const result = await client.query(query, [userId])
    const row = result.rows[0]
    
    return {
      heartsRemaining: row.hearts,
      gameOver: row.hearts <= 0
    }
  } finally {
    client.release()
  }
}

/**
 * Update lesson progress
 */
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  unitId: string,
  progressData: {
    status: string
    stars: number
    xp_earned: number
    completion_date?: string
    attempts?: number
  }
) {
  const client = await pgPool.connect()
  try {
    const query = `
      INSERT INTO lesson_progress (user_id, lesson_id, unit_id, status, stars, xp_earned, attempts, completion_date)
      VALUES (
        (SELECT id FROM users WHERE cognito_user_id = $1),
        $2, $3, $4, $5, $6, $7, $8
      )
      ON CONFLICT (user_id, lesson_id) DO UPDATE SET
        status = $4,
        stars = GREATEST(lesson_progress.stars, $5),
        xp_earned = $6,
        attempts = $7,
        completion_date = $8,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    
    const result = await client.query(query, [
      userId,
      lessonId,
      unitId,
      progressData.status,
      progressData.stars,
      progressData.xp_earned,
      progressData.attempts || 1,
      progressData.completion_date || null
    ])
    
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Get lesson progress for user
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      SELECT * FROM lesson_progress
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      AND lesson_id = $2
    `
    const result = await client.query(query, [userId, lessonId])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

/**
 * Get all lesson progress for user
 */
export async function getAllLessonProgress(userId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      SELECT * FROM lesson_progress
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      ORDER BY created_at DESC
    `
    const result = await client.query(query, [userId])
    return result.rows
  } finally {
    client.release()
  }
}

/**
 * Record question attempt
 */
export async function recordQuestionAttempt(
  userId: string,
  questionId: string,
  lessonId: string,
  isCorrect: boolean,
  timeTaken: number,
  heartLost: boolean
) {
  const client = await pgPool.connect()
  try {
    const query = `
      INSERT INTO question_attempts (user_id, question_id, lesson_id, is_correct, time_taken_seconds, heart_lost)
      VALUES (
        (SELECT id FROM users WHERE cognito_user_id = $1),
        $2, $3, $4, $5, $6
      )
      RETURNING *
    `
    
    const result = await client.query(query, [
      userId,
      questionId,
      lessonId,
      isCorrect,
      timeTaken,
      heartLost
    ])
    
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Update streak
 */
export async function updateStreak(userId: string) {
  const client = await pgPool.connect()
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const query = `
      UPDATE user_streaks
      SET last_activity_date = $1::date,
          current_streak = CASE
            WHEN last_activity_date = $1::date - INTERVAL '1 day' THEN current_streak + 1
            WHEN last_activity_date = $1::date THEN current_streak
            ELSE 1
          END,
          longest_streak = GREATEST(longest_streak, current_streak),
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $2)
      RETURNING current_streak, longest_streak
    `
    
    const result = await client.query(query, [today, userId])
    return result.rows[0]
  } finally {
    client.release()
  }
}

/**
 * Get daily challenges
 */
export async function getDailyChallenges(userId: string) {
  const client = await pgPool.connect()
  try {
    const query = `
      SELECT * FROM daily_challenges
      WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)
      AND challenge_date >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY challenge_date DESC
    `
    const result = await client.query(query, [userId])
    return result.rows
  } finally {
    client.release()
  }
}

/**
 * Update daily challenge progress
 */
export async function updateDailyChallengeProgress(
  userId: string,
  challengeType: string,
  amount: number
) {
  const client = await pgPool.connect()
  try {
    const today = new Date().toISOString().split('T')[0]
    
    const query = `
      INSERT INTO daily_challenges (user_id, challenge_type, target_value, current_value, challenge_date)
      VALUES (
        (SELECT id FROM users WHERE cognito_user_id = $1),
        $2, $3, $4, $5::date
      )
      ON CONFLICT (user_id, challenge_type, challenge_date) DO UPDATE SET
        current_value = daily_challenges.current_value + $4,
        completed = CASE 
          WHEN daily_challenges.current_value + $4 >= daily_challenges.target_value THEN true
          ELSE false
        END,
        completed_at = CASE 
          WHEN daily_challenges.current_value + $4 >= daily_challenges.target_value THEN CURRENT_TIMESTAMP
          ELSE daily_challenges.completed_at
        END,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    
    const targetValue = challengeType === 'xp_goal' ? 100 : 5
    const result = await client.query(query, [userId, challengeType, targetValue, amount, today])
    
    return result.rows[0]
  } finally {
    client.release()
  }
}
