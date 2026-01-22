"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import type { PreTestResult } from "@/lib/study-types"

type PreTestResultsProps = {
  result: PreTestResult
  onClose: () => void
}

export function PreTestResults({ result, onClose }: PreTestResultsProps) {
  const percentage = Math.round((result.correct / result.totalQuestions) * 100)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold">Pre-Test Results</h1>
          <p className="text-primary-foreground/70 text-sm">Diagnostic complete</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Score Card */}
        <Card
          className={result.passed ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}
        >
          <CardContent className="p-6 text-center">
            <Trophy
              className={`w-16 h-16 mx-auto mb-4 ${result.passed ? "text-green-500" : "text-muted-foreground"}`}
            />

            <div className="space-y-2">
              <p className="text-5xl font-bold">{result.scaledScore}</p>
              <p className="text-muted-foreground">Scaled Score (700 to pass)</p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {result.passed ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-semibold">Passing Score</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive font-semibold">Below Passing</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{percentage}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">
                {result.correct}/{result.totalQuestions}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{formatTime(result.timeSpent)}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Domain Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Domain Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.domainScores).map(([domain, scores]) => {
              const domainPct = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0
              const isWeak = domainPct < 70
              return (
                <div key={domain}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{domain}</span>
                    <span className={`text-sm ${isWeak ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
                      {scores.correct}/{scores.total} ({domainPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${isWeak ? "bg-destructive" : "bg-green-500"}`}
                      style={{ width: `${domainPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Weak/Strong Areas */}
        <div className="grid md:grid-cols-2 gap-4">
          {result.weakAreas.length > 0 && (
            <Card className="border-destructive/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-destructive">Focus Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.weakAreas.map((area) => (
                    <li key={area} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.strongAreas.length > 0 && (
            <Card className="border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-green-600 dark:text-green-400">Strong Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.strongAreas.map((area) => (
                    <li key={area} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Adaptive Study Explanation */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Your Personalized Study Plan</h3>
            <p className="text-sm text-muted-foreground">
              Based on your pre-test results, the app will now prioritize questions from your weak areas.
              {result.weakAreas.length > 0 && (
                <>
                  {" "}
                  You&apos;ll see {Math.round(result.weakAreas.length * 1.5)}x more questions from:{" "}
                  {result.weakAreas.slice(0, 2).join(", ")}.
                </>
              )}{" "}
              As you improve, the algorithm will automatically adjust.
            </p>
          </CardContent>
        </Card>

        <Button onClick={onClose} className="w-full h-12" size="lg">
          Start Studying
        </Button>
      </main>
    </div>
  )
}
