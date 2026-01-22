"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react"
import type { QuestionOfTheDay } from "@/lib/study-types"

type DailyQuestionProps = {
  dailyQuestion: QuestionOfTheDay | null
  onStart: () => void
}

export function DailyQuestionCard({ dailyQuestion, onStart }: DailyQuestionProps) {
  const today = new Date().toISOString().split("T")[0]
  const isToday = dailyQuestion?.date === today
  const isCompleted = isToday && dailyQuestion?.completed

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Question of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCompleted ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {dailyQuestion?.wasCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm text-success font-medium">Completed - Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-sm text-destructive font-medium">Completed - Incorrect</span>
                </>
              )}
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">A new challenge awaits you today!</p>
            <Button onClick={onStart} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
