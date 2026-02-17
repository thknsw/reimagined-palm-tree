'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, ArrowLeft } from 'lucide-react'
import { SCENARIOS } from '@/lib/scenarios'
import { ADDITIONAL_SCENARIOS } from '@/lib/scenarios-additional'
import { QuestionDisplay } from './question-display'
import { LessonCompleteModal } from './lesson-complete-modal'

export function PracticeMode({ userId }: { userId: string }) {
  const router = useRouter()
  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    // Combine all questions from both sources
    const allQuestions = [...SCENARIOS, ...ADDITIONAL_SCENARIOS]
    // Get 10 random questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffled)
  }, [])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === questions[currentIndex].correctAnswer
    setIsCorrect(correct)
    if (correct) setScore(score + 1)
  }

  const handleContinue = () => {
    if (currentIndex + 1 >= questions.length) {
      setShowComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => router.push('/learn')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Practice Mode</h1>
              <p className="text-purple-700">No hearts lost - pure practice!</p>
            </div>
          </div>
        </Card>

        <QuestionDisplay
          question={questions[currentIndex]}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onAnswer={handleAnswer}
          onContinue={handleContinue}
          currentQuestion={currentIndex + 1}
          totalQuestions={questions.length}
          showHearts={false}
        />
      </div>

      {showComplete && (
        <LessonCompleteModal
          xpEarned={score * 5}
          accuracy={Math.round((score / questions.length) * 100)}
          gemsEarned={0}
          onContinue={() => router.push('/learn')}
        />
      )}
    </>
  )
}
