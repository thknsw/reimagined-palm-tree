"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Timer, Play, Target } from "lucide-react"
import { SCENARIOS } from "@/lib/scenarios"

type TimedQuizSetupProps = {
  onStart: (questionCount: number, timeLimit: number) => void
  onCancel: () => void
  domain: string
}

export function TimedQuizSetup({ onStart, onCancel, domain }: TimedQuizSetupProps) {
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)

  const availableQuestions =
    domain === "All Domains" ? SCENARIOS.length : SCENARIOS.filter((s) => s.domain === domain).length

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
            <Timer className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl">Timed Quiz</CardTitle>
          <CardDescription>Test yourself under exam-like conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Domain Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Domain</Label>
            <div className="w-full p-3 rounded-lg border border-input bg-secondary/30 text-foreground text-sm">
              {domain}
            </div>
            <p className="text-xs text-muted-foreground">{availableQuestions} questions available</p>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Number of Questions
            </Label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((count) => (
                <Button
                  key={count}
                  variant={questionCount === count ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQuestionCount(Math.min(count, availableQuestions))}
                  disabled={count > availableQuestions}
                  className="flex-1"
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Time Limit (minutes)
            </Label>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((time) => (
                <Button
                  key={time}
                  variant={timeLimit === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeLimit(time)}
                  className="flex-1"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
            <p className="text-sm font-medium">Quiz Summary</p>
            <p className="text-xs text-muted-foreground">
              {questionCount} questions • {timeLimit} minutes • ~{Math.round((timeLimit * 60) / questionCount)}s per
              question
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={() => onStart(questionCount, timeLimit * 60)}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
