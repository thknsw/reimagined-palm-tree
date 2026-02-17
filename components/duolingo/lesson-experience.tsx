'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Lesson, LessonProgress, LessonQuestion, HeartLossData, CelebrationData } from '@/lib/gamification/types'
import { LessonHeader } from './lesson-header'
import { QuestionDisplay } from './question-display'
import { HeartLossModal } from './heart-loss-modal'
import { LessonCompleteModal } from './lesson-complete-modal'
import { recordQuestionAttempt, awardXp, loseHeart, updateLessonProgress, updateDailyChallengeProgress } from '@/lib/gamification/actions'
import { Progress } from '@/components/ui/progress'

interface LessonExperienceProps {
  lesson: Lesson
  userId: string
  initialHearts: number
  maxHearts: number
  progress: LessonProgress | null
  isPracticeMode?: boolean
  isDemoMode?: boolean
}

export function LessonExperience({ lesson, userId, initialHearts, maxHearts, progress, isPracticeMode = false, isDemoMode = false }: LessonExperienceProps) {
  const router = useRouter()
  // DUOLINGO ALGORITHM: Use a queue that we can add failed questions back into
  const [questionQueue, setQuestionQueue] = useState<LessonQuestion[]>([...lesson.questions])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hearts, setHearts] = useState(initialHearts)
  const [earnedXp, setEarnedXp] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [showHeartLoss, setShowHeartLoss] = useState(false)
  const [heartLossData, setHeartLossData] = useState<HeartLossData | null>(null)
  const [showComplete, setShowComplete] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set())

  const currentQuestion = questionQueue[currentQuestionIndex]
  const progressPercent = (answeredQuestions.size / lesson.questions.length) * 100
  const totalQuestions = lesson.questions.length

  useEffect(() => {
    setStartTime(Date.now())
  }, [currentQuestionIndex])

  const handleAnswer = async (selectedAnswer: string | string[], isCorrect: boolean) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const heartLost = !isCorrect

    // Record attempt (skip in demo mode)
    if (!isDemoMode) {
      await recordQuestionAttempt(
        userId,
        currentQuestion.id,
        lesson.id,
        isCorrect,
        timeTaken,
        heartLost
      )
    }

    if (isCorrect) {
      // Award XP
      const xpGained = currentQuestion.xp
      setEarnedXp(prev => prev + xpGained)
      setCorrectCount(prev => prev + 1)
      
      // Mark question as answered
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id))
      
      // Update database (skip in demo mode)
      if (!isDemoMode) {
        await awardXp(userId, xpGained)
        await updateDailyChallengeProgress(userId, 'xp_goal', xpGained)
      }

      // Move to next question
      if (currentQuestionIndex < questionQueue.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1)
        }, 1000)
      } else {
        // All questions answered correctly - lesson complete
        setTimeout(() => {
          completeLesson()
        }, 1000)
      }
    } else {
      // DUOLINGO ALGORITHM: Wrong answer - push question to end of queue
      // This ensures the user MUST get it right to finish the lesson
      setMistakes(prev => prev + 1)
      
      // Add the question back to the end of the queue (only if not already re-queued)
      const isFirstAttempt = !answeredQuestions.has(currentQuestion.id)
      if (isFirstAttempt) {
        setQuestionQueue(prev => [...prev, currentQuestion])
      }
      
      // Handle heart loss
      if (isDemoMode) {
        // In demo mode, just decrement hearts locally
        const newHearts = hearts - 1
        setHearts(newHearts)
        
        if (newHearts <= 0) {
          router.push('/learn?demo=true')
          return
        }
      } else {
        const { heartsRemaining, gameOver } = await loseHeart(userId)
        setHearts(heartsRemaining)

        if (gameOver) {
          // No hearts left - redirect to shop
          router.push('/shop?reason=no-hearts')
          return
        }
      }
      
      {
        // Show heart loss modal with explanation
        setHeartLossData({
          question: currentQuestion.question,
          correctAnswer: Array.isArray(currentQuestion.correctAnswer) 
            ? currentQuestion.correctAnswer.join(', ') 
            : currentQuestion.correctAnswer,
          yourAnswer: Array.isArray(selectedAnswer) ? selectedAnswer.join(', ') : selectedAnswer,
          explanation: currentQuestion.explanation
        })
        setShowHeartLoss(true)
      }
    }
  }

  const handleHeartLossContinue = () => {
    setShowHeartLoss(false)
    setHeartLossData(null)
    
    // Move to next question in the queue
    if (currentQuestionIndex < questionQueue.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // If we've gone through all questions but haven't answered all unique ones, loop continues
      completeLesson()
    }
  }

  const completeLesson = async () => {
    const accuracy = (correctCount / totalQuestions) * 100
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1
    const isPerfect = mistakes === 0
    const status = isPerfect ? 'mastered' : 'completed'

    // Update database (skip in demo mode)
    if (!isDemoMode) {
      // Update lesson progress
      await updateLessonProgress(userId, lesson.id, lesson.unitId, {
        status,
        stars,
        xp_earned: earnedXp,
        completion_date: new Date().toISOString(),
        attempts: (progress?.attempts || 0) + 1
      })

      // Update daily challenge
      await updateDailyChallengeProgress(userId, 'lessons_completed', 1)

      // Bonus XP for perfect lesson
      if (isPerfect) {
        const bonusXp = Math.floor(lesson.xpReward * 0.5)
        await awardXp(userId, bonusXp)
        setEarnedXp(prev => prev + bonusXp)
      }
    }

    setIsComplete(true)
    setShowComplete(true)
  }

  const handleLessonComplete = () => {
    router.push(isDemoMode ? '/learn?demo=true' : '/learn')
  }

  if (showComplete) {
    return (
      <LessonCompleteModal
        lesson={lesson}
        earnedXp={earnedXp}
        stars={(correctCount / totalQuestions) >= 0.9 ? 3 : (correctCount / totalQuestions) >= 0.7 ? 2 : 1}
        accuracy={Math.round((correctCount / totalQuestions) * 100)}
        isPerfect={mistakes === 0}
        onContinue={handleLessonComplete}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LessonHeader
        hearts={hearts}
        maxHearts={maxHearts}
        onExit={() => router.push('/learn')}
      />

      {/* Progress Bar */}
      <div className="px-4 py-3 border-b">
        <Progress value={progressPercent} className="h-3" />
        <p className="text-xs text-center text-muted-foreground mt-2">
          {answeredQuestions.size} of {totalQuestions} answered correctly
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <QuestionDisplay
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        </div>
      </div>

      {/* Heart Loss Modal */}
      {showHeartLoss && heartLossData && (
        <HeartLossModal
          data={heartLossData}
          onContinue={handleHeartLossContinue}
        />
      )}
    </div>
  )
}
