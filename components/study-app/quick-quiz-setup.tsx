"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Zap, Clock, ArrowLeft, Target } from "lucide-react"

type QuickQuizSetupProps = {
  onStart: (questionCount: number) => void
  onCancel: () => void
  domain: string
}

export function QuickQuizSetup({ onStart, onCancel, domain }: QuickQuizSetupProps) {
  const [questionCount, setQuestionCount] = useState(10)

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-lg mx-auto space-y-6">
        <Button variant="ghost" onClick={onCancel} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Quick Quiz
            </CardTitle>
            <CardDescription>Fast practice without a timer. Perfect for a quick study session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question Count */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Number of Questions
              </Label>
              <RadioGroup
                value={questionCount.toString()}
                onValueChange={(val) => setQuestionCount(Number.parseInt(val))}
                className="grid grid-cols-3 gap-2"
              >
                {[5, 10, 15].map((count) => (
                  <div key={count}>
                    <RadioGroupItem value={count.toString()} id={`count-${count}`} className="peer sr-only" />
                    <Label
                      htmlFor={`count-${count}`}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-card p-3 hover:bg-secondary/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 cursor-pointer transition-all"
                    >
                      <span className="text-lg font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">questions</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Domain display */}
            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Domain: <span className="font-medium text-foreground">{domain}</span>
              </p>
            </div>

            {/* Estimate */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>Estimated time: ~{Math.ceil(questionCount * 1.5)} minutes</span>
            </div>

            <Button
              onClick={() => onStart(questionCount)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-5 text-base font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Quick Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
