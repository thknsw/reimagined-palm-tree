import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LandingPage } from '@/components/duolingo/landing-page'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is authenticated, redirect to learn page
  if (user) {
    redirect('/learn')
  }

  // Show landing page for non-authenticated users
  return <LandingPage />
}
