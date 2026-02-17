'use server'

import { createClient } from '@/lib/supabase/server'
import type { UserGamification, LessonProgress, DailyChallenge } from './types'
import { getLevelFromXp, getXpForLevel } from './lesson-mapper'

// Initialize user gamification profile
export async function initializeUserGamification(userId: string): Promise<UserGamification | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (data) return data

  // Create new profile
  const { data: newProfile, error: createError } = await supabase
    .from('user_gamification')
    .insert({
      user_id: userId,
      xp: 0,
      total_xp: 0,
      level: 1,
      hearts: 5,
      max_hearts: 5,
      streak_days: 0,
      gems: 0,
      league: 'bronze',
      league_position: 0
    })
    .select()
    .single()

  return newProfile || null
}

// Get user gamification data
export async function getUserGamification(userId: string): Promise<UserGamification | null> {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!data) {
    return await initializeUserGamification(userId)
  }

  return data
}

// Update streak
export async function updateStreak(userId: string): Promise<{ streakDays: number; isNewDay: boolean }> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!profile) return { streakDays: 0, isNewDay: false }

  const today = new Date().toISOString().split('T')[0]
  const lastActivity = profile.last_activity_date?.split('T')[0]

  if (lastActivity === today) {
    return { streakDays: profile.streak_days, isNewDay: false }
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = lastActivity === yesterday ? profile.streak_days + 1 : 1

  await supabase
    .from('user_gamification')
    .update({
      streak_days: newStreak,
      last_activity_date: new Date().toISOString()
    })
    .eq('user_id', userId)

  return { streakDays: newStreak, isNewDay: true }
}

// Award XP
export async function awardXp(userId: string, xp: number): Promise<{ newXp: number; levelUp: boolean; newLevel?: number }> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!profile) return { newXp: 0, levelUp: false }

  const newXp = profile.xp + xp
  const newTotalXp = profile.total_xp + xp
  const currentLevel = profile.level
  const newLevel = getLevelFromXp(newTotalXp)
  const levelUp = newLevel > currentLevel

  await supabase
    .from('user_gamification')
    .update({
      xp: newXp,
      total_xp: newTotalXp,
      level: newLevel
    })
    .eq('user_id', userId)

  return { newXp, levelUp, newLevel: levelUp ? newLevel : undefined }
}

// Lose a heart
export async function loseHeart(userId: string): Promise<{ heartsRemaining: number; gameOver: boolean }> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!profile) return { heartsRemaining: 0, gameOver: true }

  const newHearts = Math.max(0, profile.hearts - 1)
  const gameOver = newHearts === 0

  await supabase
    .from('user_gamification')
    .update({ hearts: newHearts })
    .eq('user_id', userId)

  return { heartsRemaining: newHearts, gameOver }
}

// Refill hearts
export async function refillHearts(userId: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('user_gamification')
    .update({ hearts: 5 })
    .eq('user_id', userId)

  return !error
}

// Award gems
export async function awardGems(userId: string, gems: number): Promise<number> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_gamification')
    .select('gems')
    .eq('user_id', userId)
    .single()

  if (!profile) return 0

  const newGems = profile.gems + gems

  await supabase
    .from('user_gamification')
    .update({ gems: newGems })
    .eq('user_id', userId)

  return newGems
}

// Spend gems
export async function spendGems(userId: string, gems: number): Promise<{ success: boolean; remainingGems: number }> {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('user_gamification')
    .select('gems')
    .eq('user_id', userId)
    .single()

  if (!profile || profile.gems < gems) {
    return { success: false, remainingGems: profile?.gems || 0 }
  }

  const newGems = profile.gems - gems

  await supabase
    .from('user_gamification')
    .update({ gems: newGems })
    .eq('user_id', userId)

  return { success: true, remainingGems: newGems }
}

// Get lesson progress
export async function getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single()

  return data
}

// Get all lesson progress for user
export async function getAllLessonProgress(userId: string): Promise<LessonProgress[]> {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)

  return data || []
}

// Update lesson progress
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  unitId: string,
  updates: Partial<LessonProgress>
): Promise<LessonProgress | null> {
  const supabase = await createClient()
  
  const { data: existing } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single()

  if (existing) {
    const { data } = await supabase
      .from('lesson_progress')
      .update(updates)
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .select()
      .single()
    
    return data
  }

  // Create new progress
  const { data } = await supabase
    .from('lesson_progress')
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      unit_id: unitId,
      status: 'unlocked',
      stars: 0,
      xp_earned: 0,
      attempts: 0,
      ...updates
    })
    .select()
    .single()

  return data
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
  const supabase = await createClient()
  
  await supabase
    .from('question_attempts')
    .insert({
      user_id: userId,
      question_id: questionId,
      lesson_id: lessonId,
      is_correct: isCorrect,
      time_taken_seconds: timeTaken,
      heart_lost: heartLost
    })
}

// Get daily challenges
export async function getDailyChallenges(userId: string): Promise<DailyChallenge[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  
  const { data } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('user_id', userId)
    .eq('challenge_date', today)

  if (data && data.length > 0) return data

  // Create today's challenges
  const challenges = [
    {
      user_id: userId,
      challenge_type: 'xp_goal',
      target_value: 50,
      current_value: 0,
      is_completed: false,
      reward_gems: 5,
      challenge_date: today
    },
    {
      user_id: userId,
      challenge_type: 'lessons_completed',
      target_value: 3,
      current_value: 0,
      is_completed: false,
      reward_gems: 10,
      challenge_date: today
    }
  ]

  const { data: newChallenges } = await supabase
    .from('daily_challenges')
    .insert(challenges)
    .select()

  return newChallenges || []
}

// Update daily challenge progress
export async function updateDailyChallengeProgress(
  userId: string,
  challengeType: string,
  increment: number
): Promise<void> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  
  const { data: challenge } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('user_id', userId)
    .eq('challenge_type', challengeType)
    .eq('challenge_date', today)
    .single()

  if (!challenge) return

  const newValue = challenge.current_value + increment
  const isCompleted = newValue >= challenge.target_value

  await supabase
    .from('daily_challenges')
    .update({
      current_value: newValue,
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null
    })
    .eq('id', challenge.id)

  if (isCompleted && !challenge.is_completed) {
    await awardGems(userId, challenge.reward_gems)
  }
}
