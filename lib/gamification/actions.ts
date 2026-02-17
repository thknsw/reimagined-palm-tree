'use server'

import type { UserGamification, LessonProgress, DailyChallenge } from './types'
import { getLevelFromXp } from './lesson-mapper'
import {
  getUserGamification as getGamificationFromDb,
  awardXp as awardXpToDb,
  loseHeart as loseHeartFromDb,
  updateLessonProgress as updateLessonProgressInDb,
  getLessonProgress as getLessonProgressFromDb,
  getAllLessonProgress as getAllLessonProgressFromDb,
  recordQuestionAttempt as recordQuestionAttemptInDb,
  updateStreak as updateStreakInDb,
  getDailyChallenges as getDailyChallengesFromDb,
  updateDailyChallengeProgress as updateDailyChallengeProgressInDb
} from '@/lib/aws/db-operations'

// Initialize user gamification profile
export async function initializeUserGamification(userId: string): Promise<UserGamification | null> {
  try {
    const gamification = await getGamificationFromDb(userId)
    return gamification as UserGamification | null
  } catch (error) {
    console.error('Error initializing gamification:', error)
    return null
  }
}

// Get user gamification data
export async function getUserGamification(userId: string): Promise<UserGamification | null> {
  try {
    const data = await getGamificationFromDb(userId)
    return data as UserGamification | null
  } catch (error) {
    console.error('Error getting gamification:', error)
    return null
  }
}

// Update streak
export async function updateStreak(userId: string): Promise<{ streakDays: number; isNewDay: boolean }> {
  try {
    const result = await updateStreakInDb(userId)
    return {
      streakDays: result?.current_streak || 0,
      isNewDay: true
    }
  } catch (error) {
    console.error('Error updating streak:', error)
    return { streakDays: 0, isNewDay: false }
  }
}

// Award XP
export async function awardXp(userId: string, xp: number): Promise<{ newXp: number; levelUp: boolean; newLevel?: number }> {
  try {
    const result = await awardXpToDb(userId, xp)
    return {
      newXp: result?.xp || 0,
      levelUp: false,
      newLevel: undefined
    }
  } catch (error) {
    console.error('Error awarding XP:', error)
    return { newXp: 0, levelUp: false }
  }
}

// Lose a heart
export async function loseHeart(userId: string): Promise<{ heartsRemaining: number; gameOver: boolean }> {
  try {
    const result = await loseHeartFromDb(userId)
    return {
      heartsRemaining: result.heartsRemaining,
      gameOver: result.gameOver
    }
  } catch (error) {
    console.error('Error losing heart:', error)
    return { heartsRemaining: 0, gameOver: true }
  }
}

// Refill hearts (simplified for AWS - would need gem purchase logic)
export async function refillHearts(userId: string): Promise<boolean> {
  try {
    const client = await import('@/lib/aws/clients').then(m => m.pgPool)
    const dbClient = await client.connect()
    try {
      await dbClient.query(
        'UPDATE user_gamification SET hearts = max_hearts WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)',
        [userId]
      )
      return true
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error refilling hearts:', error)
    return false
  }
}

// Award gems
export async function awardGems(userId: string, gems: number): Promise<number> {
  try {
    const client = await import('@/lib/aws/clients').then(m => m.pgPool)
    const dbClient = await client.connect()
    try {
      const result = await dbClient.query(
        'UPDATE user_gamification SET gems = gems + $1 WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $2) RETURNING gems',
        [gems, userId]
      )
      return result.rows[0]?.gems || 0
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error awarding gems:', error)
    return 0
  }
}

// Spend gems
export async function spendGems(userId: string, gems: number): Promise<{ success: boolean; remainingGems: number }> {
  try {
    const client = await import('@/lib/aws/clients').then(m => m.pgPool)
    const dbClient = await client.connect()
    try {
      const checkResult = await dbClient.query(
        'SELECT gems FROM user_gamification WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $1)',
        [userId]
      )
      
      const currentGems = checkResult.rows[0]?.gems || 0
      if (currentGems < gems) {
        return { success: false, remainingGems: currentGems }
      }
      
      const result = await dbClient.query(
        'UPDATE user_gamification SET gems = gems - $1 WHERE user_id = (SELECT id FROM users WHERE cognito_user_id = $2) RETURNING gems',
        [gems, userId]
      )
      return { success: true, remainingGems: result.rows[0]?.gems || 0 }
    } finally {
      dbClient.release()
    }
  } catch (error) {
    console.error('Error spending gems:', error)
    return { success: false, remainingGems: 0 }
  }
}

// Get lesson progress
export async function getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
  try {
    const data = await getLessonProgressFromDb(userId, lessonId)
    return data as LessonProgress | null
  } catch (error) {
    console.error('Error getting lesson progress:', error)
    return null
  }
}

// Get all lesson progress for user
export async function getAllLessonProgress(userId: string): Promise<LessonProgress[]> {
  try {
    const data = await getAllLessonProgressFromDb(userId)
    return data as LessonProgress[]
  } catch (error) {
    console.error('Error getting all lesson progress:', error)
    return []
  }
}

// Update lesson progress
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  unitId: string,
  updates: Partial<LessonProgress>
): Promise<LessonProgress | null> {
  try {
    const data = await updateLessonProgressInDb(userId, lessonId, unitId, {
      status: updates.status || 'completed',
      stars: updates.stars || 0,
      xp_earned: updates.xp_earned || 0,
      completion_date: updates.completion_date,
      attempts: updates.attempts
    })
    return data as LessonProgress | null
  } catch (error) {
    console.error('Error updating lesson progress:', error)
    return null
  }
}

// Record question attempt
export async function recordQuestionAttempt(
  userId: string,
  questionId: string,
  lessonId: string,
  isCorrect: boolean,
  timeTaken: number,
  heartLost: boolean
): Promise<void> {
  try {
    await recordQuestionAttemptInDb(userId, questionId, lessonId, isCorrect, timeTaken, heartLost)
  } catch (error) {
    console.error('Error recording question attempt:', error)
  }
}

// Get daily challenges
export async function getDailyChallenges(userId: string): Promise<DailyChallenge[]> {
  try {
    const data = await getDailyChallengesFromDb(userId)
    return data as DailyChallenge[]
  } catch (error) {
    console.error('Error getting daily challenges:', error)
    return []
  }
}

// Update daily challenge progress
export async function updateDailyChallengeProgress(
  userId: string,
  challengeType: string,
  increment: number
): Promise<void> {
  try {
    await updateDailyChallengeProgressInDb(userId, challengeType, increment)
  } catch (error) {
    console.error('Error updating daily challenge progress:', error)
  }
}
