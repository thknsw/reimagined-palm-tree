import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LearnPath } from '@/components/duolingo/learn-path'
import { DuolingoHeader } from '@/components/duolingo/duolingo-header'
import { BottomNav } from '@/components/duolingo/bottom-nav'
import { DailyChallengeCard } from '@/components/duolingo/daily-challenge-card'
import { getUserGamification, getAllLessonProgress, updateStreak, getDailyChallenges } from '@/lib/gamification/actions'
import { createLessonStructure } from '@/lib/gamification/lesson-mapper'

export default async function LearnPage({
  searchParams,
}: {
  searchParams: { demo?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check if in demo mode
  const isDemoMode = searchParams.demo === 'true'

  if (!user && !isDemoMode) {
    redirect('/')
  }

  const units = createLessonStructure()

  // Demo mode with default values
  if (isDemoMode && !user) {
    return (
      <div className="min-h-screen bg-background">
        <DuolingoHeader
          xp={0}
          level={1}
          hearts={5}
          maxHearts={5}
          streak={0}
          gems={100}
          isDemoMode={true}
        />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-8">
          {/* Demo Banner */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-lg text-center">
            <p className="font-semibold text-blue-900 dark:text-blue-100">
              You're in Demo Mode - Progress won't be saved. Sign up to track your learning!
            </p>
          </div>

          <LearnPath
            units={units}
            lessonProgress={[]}
            userId="demo"
            isDemoMode={true}
          />
        </main>
        
        <BottomNav />
      </div>
    )
  }

  // Authenticated user flow
  const gamification = await getUserGamification(user!.id)
  const lessonProgress = await getAllLessonProgress(user!.id)
  const dailyChallenges = await getDailyChallenges(user!.id)

  // Update streak
  await updateStreak(user!.id)
  
  // Get today's challenge
  const today = new Date().toISOString().split('T')[0]
  const todayChallenge = dailyChallenges.find(c => c.challenge_date.startsWith(today))

  return (
    <div className="min-h-screen bg-background">
      <DuolingoHeader
        xp={gamification?.xp || 0}
        level={gamification?.level || 1}
        hearts={gamification?.hearts || 5}
        maxHearts={gamification?.max_hearts || 5}
        streak={gamification?.streak_days || 0}
        gems={gamification?.gems || 0}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-8">
        <LearnPath
          units={units}
          lessonProgress={lessonProgress}
          userId={user!.id}
        />
      </main>
      
      <BottomNav />
    </div>
  )
}
