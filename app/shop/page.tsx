import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ShopContent } from '@/components/duolingo/shop-content'
import { DuolingoHeader } from '@/components/duolingo/duolingo-header'
import { BottomNav } from '@/components/duolingo/bottom-nav'
import { getUserGamification } from '@/lib/gamification/actions'

export default async function ShopPage() {
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
      
      <main className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-8">
        <ShopContent
          userId={user.id}
          gems={gamification.gems}
          hearts={gamification.hearts}
          maxHearts={gamification.max_hearts}
        />
      </main>
      
      <BottomNav />
    </div>
  )
}
