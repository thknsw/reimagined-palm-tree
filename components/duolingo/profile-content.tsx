'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Trophy, Flame, Star, Calendar, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { UserGamification, LessonProgress } from '@/lib/gamification/types'
import type { User } from '@supabase/supabase-js'
import { toast } from 'sonner'

interface ProfileContentProps {
  user: User
  gamification: UserGamification
  lessonProgress: LessonProgress[]
}

export function ProfileContent({ user, gamification, lessonProgress }: ProfileContentProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
    router.refresh()
  }

  const completedLessons = lessonProgress.filter(p => p.status === 'completed' || p.status === 'mastered').length
  const totalStars = lessonProgress.reduce((sum, p) => sum + p.stars, 0)
  const masteredLessons = lessonProgress.filter(p => p.status === 'mastered').length

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const memberSince = new Date(gamification.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-green-400 to-blue-500 text-white">
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{user.email}</h1>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {memberSince}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span className="capitalize">{gamification.league} League</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg">
            {gamification.level}
          </div>
          <p className="text-2xl font-bold">{gamification.level}</p>
          <p className="text-sm text-muted-foreground">Level</p>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold">{gamification.streak_days}</p>
          <p className="text-sm text-muted-foreground">Day Streak</p>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold">{completedLessons}</p>
          <p className="text-sm text-muted-foreground">Lessons</p>
        </Card>

        <Card className="p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold">{totalStars}</p>
          <p className="text-sm text-muted-foreground">Total Stars</p>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {completedLessons > 0 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">🎯</div>
              <div>
                <p className="font-semibold">First Lesson</p>
                <p className="text-xs text-muted-foreground">Completed your first lesson</p>
              </div>
            </div>
          )}
          
          {gamification.streak_days >= 7 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">🔥</div>
              <div>
                <p className="font-semibold">Week Warrior</p>
                <p className="text-xs text-muted-foreground">7 day streak achieved</p>
              </div>
            </div>
          )}

          {masteredLessons > 0 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">⭐</div>
              <div>
                <p className="font-semibold">Perfectionist</p>
                <p className="text-xs text-muted-foreground">Mastered a lesson with no mistakes</p>
              </div>
            </div>
          )}

          {gamification.total_xp >= 100 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">⚡</div>
              <div>
                <p className="font-semibold">XP Collector</p>
                <p className="text-xs text-muted-foreground">Earned 100+ XP</p>
              </div>
            </div>
          )}

          {completedLessons >= 10 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">📚</div>
              <div>
                <p className="font-semibold">Dedicated Learner</p>
                <p className="text-xs text-muted-foreground">Completed 10 lessons</p>
              </div>
            </div>
          )}

          {gamification.level >= 5 && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="text-3xl">🚀</div>
              <div>
                <p className="font-semibold">Rising Star</p>
                <p className="text-xs text-muted-foreground">Reached level 5</p>
              </div>
            </div>
          )}
        </div>

        {completedLessons === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Complete lessons to unlock achievements!
          </p>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => router.push('/learn')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold"
        >
          Continue Learning
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/learn/stats')}
        >
          View Stats
        </Button>
      </div>
    </div>
  )
}
