"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Flag, Clock, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import type { Scenario } from "@/lib/scenarios"

type ExamSimulationProps = {
  questions: Scenario[]
  onComplete: (results: ExamResults) => void
  onExit: () => void
}

type ExamResults = {
  score: number
  correct: number
  incorrect: number
  totalQuestions: number
  timeSpent: number
  domainScores: Record<string, { correct: number; total: number }>
  answers: Array<{
    questionId: string
    correct: boolean
    selectedAnswer: number | number[]
    correctAnswer: number | number[]
  }>
}

export function ExamSimulation({ questions, onComplete, onExit }: ExamSimulationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number | number[]>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(65 * 60) // 65 minutes in seconds
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(userAnswers).length
  const flaggedCount = flaggedQuestions.size

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = useCallback(
    (answer: number) => {
      if (currentQuestion.isMultiSelect) {
        const current = (userAnswers[currentIndex] as number[]) || []
        const newAnswers = current.includes(answer) ? current.filter((a) => a !== answer) : [...current, answer]
        setUserAnswers((prev) => ({ ...prev, [currentIndex]: newAnswers }))
      } else {
        setUserAnswers((prev) => ({ ...prev, [currentIndex]: answer }))
      }
    },
    [currentIndex, currentQuestion.isMultiSelect, userAnswers]
  )

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex)
      } else {
        newSet.add(currentIndex)
      }
      return newSet
    })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToQuestion = (index: number) => {
    setCurrentIndex(index)
  }

  const handleAutoSubmit = () => {
    finishExam()
  }

  const finishExam = () => {
    const domainScores: Record<string, { correct: number; total: number }> = {}
    let correct = 0
    const answers: ExamResults["answers"] = []

    questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx]
      const isCorrect = Array.isArray(q.correctAnswer)
        ? Array.isArray(userAnswer) &&
          q.correctAnswer.length === userAnswer.length &&
          q.correctAnswer.every((a) => userAnswer.includes(a))
        : userAnswer === q.correctAnswer

      if (isCorrect) correct++

      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 }
      }
      domainScores[q.domain].total++
      if (isCorrect) domainScores[q.domain].correct++

      answers.push({
        questionId: q.id,
        correct: isCorrect,
        selectedAnswer: userAnswer || (Array.isArray(q.correctAnswer) ? [] : -1),
        correctAnswer: q.correctAnswer,
      })
    })

    const timeSpent = 65 * 60 - timeRemaining

    onComplete({
      score: Math.round((correct / questions.length) * 100),
      correct,
      incorrect: questions.length - correct,
      totalQuestions: questions.length,
      timeSpent,
      domainScores,
      answers,
    })
  }

  const selectedAnswer = userAnswers[currentIndex]
  const isAnswered = selectedAnswer !== undefined
  const isFlagged = flaggedQuestions.has(currentIndex)

  if (showExitConfirm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md">
          <div className="flex items-center gap-3 mb-4 text-destructive">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-xl font-bold">Exit Exam Simulation?</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            {'Your progress will be lost. Are you sure you want to exit?'}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowExitConfirm(false)} className="flex-1">
              Continue Exam
            </Button>
            <Button variant="destructive" onClick={onExit} className="flex-1">
              Exit
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (showSubmitConfirm) {
    const unanswered = questions.length - answeredCount
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md">
          <h3 className="text-xl font-bold mb-4">Submit Exam?</h3>
          <div className="space-y-2 text-sm text-muted-foreground mb-6">
            <p>
              Answered: {answeredCount} / {questions.length}
            </p>
            {unanswered > 0 && <p className="text-destructive">Unanswered: {unanswered} questions</p>}
            <p>Flagged for review: {flaggedCount}</p>
            <p className="font-semibold text-foreground mt-4">{'You cannot change answers after submitting.'}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowSubmitConfirm(false)} className="flex-1">
              Review Answers
            </Button>
            <Button onClick={finishExam} className="flex-1">
              Submit Exam
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with timer and progress */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Exam Simulation</h2>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={`font-mono text-lg ${timeRemaining < 300 ? "text-red-300 font-bold" : ""}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowExitConfirm(true)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-primary-foreground/20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 flex gap-6">
        {/* Question Panel */}
        <div className="flex-1">
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{currentQuestion.domain}</span>
                  <span className="text-sm px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                    {currentQuestion.difficulty}
                  </span>
                  {isFlagged && <Flag className="w-4 h-4 text-destructive fill-destructive" />}
                </div>
                <p className="text-lg leading-relaxed">{currentQuestion.scenario}</p>
                {currentQuestion.isMultiSelect && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">
                    Select {currentQuestion.selectCount || 2} answers
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={toggleFlag} className="ml-4">
                <Flag className={`w-5 h-5 ${isFlagged ? "fill-destructive text-destructive" : ""}`} />
              </Button>
            </div>

            <div className="space-y-3 mt-6">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = Array.isArray(selectedAnswer)
                  ? selectedAnswer.includes(idx)
                  : selectedAnswer === idx

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        }`}
                      >
                        {isSelected && <div className="w-3 h-3 bg-primary-foreground rounded-sm" />}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button onClick={handlePrevious} disabled={currentIndex === 0} variant="outline">
              Previous
            </Button>
            <div className="flex gap-3">
              <Button onClick={toggleFlag} variant="outline">
                {isFlagged ? "Unflag" : "Flag for Review"}
              </Button>
              {currentIndex === questions.length - 1 ? (
                <Button onClick={() => setShowSubmitConfirm(true)}>Submit Exam</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="p-4 sticky top-24">
            <h3 className="font-bold mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined
                const isFlagged = flaggedQuestions.has(idx)
                const isCurrent = idx === currentIndex

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToQuestion(idx)}
                    className={`aspect-square rounded text-sm font-medium transition-all ${
                      isCurrent
                        ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                        : isAnswered
                          ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900"
                          : "bg-secondary hover:bg-secondary/80"
                    } ${isFlagged ? "ring-2 ring-destructive ring-offset-1" : ""}`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Answered
                </span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                  Unanswered
                </span>
                <span className="font-bold">{questions.length - answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-destructive" />
                  Flagged
                </span>
                <span className="font-bold">{flaggedCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
