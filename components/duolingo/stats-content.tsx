'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Flame, Trophy, Target, Star, Calendar, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import type { UserGamification, LessonProgress, DailyChallenge } from '@/lib/gamification/types'
import { getXpForLevel } from '@/lib/gamification/lesson-mapper'

interface StatsContentProps {
  gamification: UserGamification
  lessonProgress: LessonProgress[]
  dailyChallenges: DailyChallenge[]
}

export function StatsContent({ gamification, lessonProgress, dailyChallenges }: StatsContentProps) {
  const router = useRouter()

  const completedLessons = lessonProgress.filter(p => p.status === 'completed' || p.status === 'mastered').length
  const totalStars = lessonProgress.reduce((sum, p) => sum + p.stars, 0)
  const xpForNextLevel = getXpForLevel(gamification.level + 1)
  const xpForCurrentLevel = getXpForLevel(gamification.level)
  const xpProgress = ((gamification.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">
          Keep up the great work!
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Level Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {gamification.level}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Level {gamification.level}</h3>
              <p className="text-sm text-muted-foreground">
                {xpForNextLevel - gamification.xp} XP to level {gamification.level + 1}
              </p>
            </div>
          </div>
          <Progress value={xpProgress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{gamification.xp} XP</span>
            <span className="text-muted-foreground">{xpForNextLevel} XP</span>
          </div>
        </Card>

        {/* Streak Card */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{gamification.streak_days} Day Streak</h3>
              <p className="text-sm text-muted-foreground">
                {gamification.streak_days > 0 ? "Don't break it!" : "Start your streak today!"}
              </p>
            </div>
          </div>
          {gamification.streak_freeze_count > 0 && (
            <div className="text-sm flex items-center gap-2">
              <span>❄️</span>
              <span>{gamification.streak_freeze_count} streak freeze(s) available</span>
            </div>
          )}
        </Card>

        {/* Total XP */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{gamification.total_xp}</p>
              <p className="text-sm text-muted-foreground">Total XP earned</p>
            </div>
          </div>
        </Card>

        {/* Lessons Completed */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{completedLessons}</p>
              <p className="text-sm text-muted-foreground">Lessons completed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Challenges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="w-6 h-6" />
          Daily Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyChallenges.map((challenge) => {
            const progress = (challenge.current_value / challenge.target_value) * 100
            return (
              <Card key={challenge.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {challenge.challenge_type === 'xp_goal' && `Earn ${challenge.target_value} XP`}
                      {challenge.challenge_type === 'lessons_completed' && `Complete ${challenge.target_value} lessons`}
                      {challenge.challenge_type === 'perfect_lesson' && 'Complete a perfect lesson'}
                      {challenge.challenge_type === 'streak_maintain' && 'Maintain your streak'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {challenge.current_value} / {challenge.target_value}
                    </p>
                  </div>
                  {challenge.is_completed ? (
                    <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                      ✓ +{challenge.reward_gems} gems
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      +{challenge.reward_gems} gems
                    </div>
                  )}
                </div>
                <Progress value={progress} className="h-2" />
              </Card>
            )
          })}
        </div>
      </div>

      {/* League */}
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl capitalize">{gamification.league} League</h3>
            <p className="text-sm text-muted-foreground">
              Rank #{gamification.league_position || 'Unranked'}
            </p>
          </div>
        </div>
      </Card>

      {/* Back Button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => router.push('/learn')}
          className="min-w-[200px]"
        >
          Back to Learning
        </Button>
      </div>
    </div>
  )
}
