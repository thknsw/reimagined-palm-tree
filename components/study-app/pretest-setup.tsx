"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, FileQuestion, AlertTriangle, Target } from "lucide-react"

type PreTestSetupProps = {
  onStart: () => void
  onCancel: () => void
  hasExistingPretest?: boolean
}

export function PreTestSetup({ onStart, onCancel, hasExistingPretest }: PreTestSetupProps) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            onClick={onCancel}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Diagnostic Pre-Test</h1>
            <p className="text-primary-foreground/70 text-sm">AWS CLF-C02 Exam Simulation</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Realistic Exam Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  This pre-test mirrors the actual AWS Cloud Practitioner exam. Your results will be used to create a
                  personalized study plan that adapts to your weak areas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <FileQuestion className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">65 Questions</p>
                <p className="text-sm text-muted-foreground">Same as real exam</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">90 Minutes</p>
                <p className="text-sm text-muted-foreground">Strict time limit</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Domain Weighted</p>
                <p className="text-sm text-muted-foreground">
                  Cloud Concepts 24%, Security 30%, Technology 34%, Billing 12%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exam Domain Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cloud Concepts</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-secondary rounded-full h-2">
                  <div className="h-2 rounded-full bg-accent" style={{ width: "24%" }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">24%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Security & Compliance</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-secondary rounded-full h-2">
                  <div className="h-2 rounded-full bg-accent" style={{ width: "30%" }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">30%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cloud Technology & Services</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-secondary rounded-full h-2">
                  <div className="h-2 rounded-full bg-accent" style={{ width: "34%" }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">34%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Billing, Pricing & Support</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-secondary rounded-full h-2">
                  <div className="h-2 rounded-full bg-accent" style={{ width: "12%" }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasExistingPretest && (
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                You have already taken a pre-test. Taking another will replace your previous results and reset your
                adaptive study plan.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-border"
            />
            <span className="text-sm text-muted-foreground">
              I understand this is a timed exam simulation. I have 90 minutes and should complete it in one sitting
              without interruptions.
            </span>
          </label>

          <Button onClick={onStart} disabled={!confirmed} className="w-full h-12" size="lg">
            Start Pre-Test
          </Button>
        </div>
      </main>
    </div>
  )
}
