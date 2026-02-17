import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LessonExperience } from '@/components/duolingo/lesson-experience'
import { getUserGamification, getLessonProgress } from '@/lib/gamification/actions'
import { getLessonById } from '@/lib/gamification/lesson-mapper'

interface LessonPageProps {
  params: Promise<{ lessonId: string }>
  searchParams: Promise<{ practice?: string; demo?: string }>
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { lessonId } = await params
  const { practice, demo } = await searchParams
  const isPracticeMode = practice === 'true'
  const isDemoMode = demo === 'true'
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isDemoMode) {
    redirect('/')
  }

  const lesson = getLessonById(lessonId)
  if (!lesson) {
    redirect(isDemoMode ? '/learn?demo=true' : '/learn')
  }

  // Demo mode with default values
  if (isDemoMode && !user) {
    return (
      <LessonExperience
        lesson={lesson}
        userId="demo"
        initialHearts={5}
        maxHearts={5}
        progress={null}
        isPracticeMode={false}
        isDemoMode={true}
      />
    )
  }

  const gamification = await getUserGamification(user!.id)
  const progress = await getLessonProgress(user!.id, lessonId)

  // Check if user has hearts (skip check in practice mode)
  if (!isPracticeMode && (!gamification || gamification.hearts <= 0)) {
    redirect('/shop?reason=no-hearts')
  }

  return (
    <LessonExperience
      lesson={lesson}
      userId={user!.id}
      initialHearts={gamification.hearts}
      maxHearts={gamification.max_hearts}
      progress={progress}
      isPracticeMode={isPracticeMode}
    />
  )
}
