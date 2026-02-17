"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, Clock, Target } from "lucide-react"

type ExamResultsProps = {
  results: {
    score: number
    correct: number
    incorrect: number
    totalQuestions: number
    timeSpent: number
    domainScores: Record<string, { correct: number; total: number }>
  }
  onReviewAnswers: () => void
  onRetakeExam: () => void
  onBackToDashboard: () => void
}

export function ExamResults({ results, onReviewAnswers, onRetakeExam, onBackToDashboard }: ExamResultsProps) {
  const { score, correct, incorrect, totalQuestions, timeSpent, domainScores } = results

  const passed = score >= 700 // AWS CLF-C02 passing score is 700/1000
  const scaledScore = Math.round((score / 100) * 1000) // Convert percentage to AWS scale

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card
          className={`p-8 text-center ${passed ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30" : "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30"}`}
        >
          <div className="flex items-center justify-center mb-4">
            {passed ? (
              <Trophy className="w-16 h-16 text-green-600 dark:text-green-400" />
            ) : (
              <Target className="w-16 h-16 text-red-600 dark:text-red-400" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{passed ? "Congratulations!" : "Keep Studying"}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {passed
              ? "You passed the exam simulation!"
              : "You need more practice to pass. Review your weak areas and try again."}
          </p>
          <div className="text-6xl font-bold mb-2">{scaledScore}</div>
          <p className="text-sm text-muted-foreground">
            Score (Passing: 700 / 1000) • {score}% Correct
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Correct Answers</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {correct} / {totalQuestions}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-muted-foreground">Incorrect Answers</span>
            </div>
            <div className="text-3xl font-bold text-red-600">
              {incorrect} / {totalQuestions}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Time Spent</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
          </Card>
        </div>

        {/* Domain Breakdown */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Performance by Domain</h2>
          <div className="space-y-4">
            {Object.entries(domainScores)
              .sort((a, b) => b[1].correct / b[1].total - a[1].correct / a[1].total)
              .map(([domain, scores]) => {
                const percentage = Math.round((scores.correct / scores.total) * 100)
                const isWeak = percentage < 70

                return (
                  <div key={domain}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{domain}</span>
                      <span className={`text-sm ${isWeak ? "text-red-600" : "text-green-600"}`}>
                        {scores.correct} / {scores.total} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className={`h-3 ${isWeak ? "bg-red-100 dark:bg-red-950" : ""}`} />
                    {isWeak && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Focus on this domain - below 70% proficiency
                      </p>
                    )}
                  </div>
                )
              })}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-950/30">
          <h2 className="text-xl font-bold mb-3">Next Steps</h2>
          <ul className="space-y-2 text-sm">
            {!passed && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Review questions you got wrong to understand the correct answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Focus on domains where you scored below 70%</span>
                </li>
              </>
            )}
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Study AWS documentation for services you're unsure about</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Take another practice exam after reviewing weak areas</span>
            </li>
            {passed && (
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>
                  You're ready! Schedule your AWS Certified Cloud Practitioner exam
                </span>
              </li>
            )}
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onReviewAnswers} variant="outline" className="flex-1 bg-transparent">
            Review Answers
          </Button>
          <Button onClick={onRetakeExam} variant="outline" className="flex-1 bg-transparent">
            Retake Exam
          </Button>
          <Button onClick={onBackToDashboard} className="flex-1">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
