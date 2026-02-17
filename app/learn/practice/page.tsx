import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PracticeMode } from '@/components/duolingo/practice-mode'
import { DuolingoHeader } from '@/components/duolingo/duolingo-header'
import { getUserGamification } from '@/lib/gamification/actions'

export default async function PracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const gamification = await getUserGamification(user.id)

  if (!gamification) {
    redirect('/learn')
  }

  return (
    <div className="min-h-screen bg-background">
      <DuolingoHeader
        xp={gamification.xp}
        level={gamification.level}
        hearts={gamification.hearts}
        maxHearts={gamification.max_hearts}
        streak={gamification.streak_days}
        gems={gamification.gems}
      />
      
      <PracticeMode userId={user.id} />
    </div>
  )
}
