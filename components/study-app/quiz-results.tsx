"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Clock, RotateCcw, Home } from "lucide-react"
import type { QuizResult } from "@/lib/study-types"

type QuizResultsProps = {
  result: QuizResult
  onClose: () => void
  onRetry: () => void
}

export function QuizResults({ result, onClose, onRetry }: QuizResultsProps) {
  const percentage = Math.round((result.correct / result.totalQuestions) * 100)
  const passed = percentage >= 70
  const minutes = Math.floor(result.timeSpent / 60)
  const seconds = result.timeSpent % 60

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center pb-4">
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              passed ? "bg-green-500/10" : "bg-destructive/10"
            }`}
          >
            <Trophy className={`w-8 h-8 ${passed ? "text-green-500" : "text-destructive"}`} />
          </div>
          <CardTitle className="text-2xl">{passed ? "Great Job!" : "Keep Practicing!"}</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            {passed
              ? "You passed the quiz! Keep up the excellent work."
              : "You need 70% to pass. Review the topics and try again."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className={`text-5xl font-bold ${passed ? "text-green-500" : "text-destructive"}`}>{percentage}%</div>
            <p className="text-muted-foreground text-sm mt-1">
              {result.correct} out of {result.totalQuestions} correct
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <Target className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="text-lg font-semibold">{result.correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="text-lg font-semibold">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </p>
              <p className="text-xs text-muted-foreground">Time Spent</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Your Score</span>
              <span>Passing: 70%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 relative overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${passed ? "bg-green-500" : "bg-destructive"}`}
                style={{ width: `${percentage}%` }}
              />
              <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/50" style={{ left: "70%" }} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button onClick={onRetry} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
