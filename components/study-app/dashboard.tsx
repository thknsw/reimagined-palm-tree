"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Target,
  TrendingUp,
  Award,
  RefreshCw,
  ArrowLeft,
  Download,
  Flame,
  Clock,
  BookmarkIcon,
  Calendar,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { DOMAINS, SCENARIOS } from "@/lib/scenarios"
import type { DomainProgress, SessionStats, QuizResult, StudyPlan, PreparednessData } from "@/lib/study-types"

type DashboardProps = {
  sessionStats: SessionStats
  domainProgress: DomainProgress
  bookmarkedScenarios: string[]
  quizHistory: QuizResult[]
  studyPlan: StudyPlan | null
  preparedness: PreparednessData
  onBack: () => void
  onReset: () => void
  onExport: () => void
  onEditPlan: () => void
}

const DEFAULT_SESSION_STATS: SessionStats = {
  attempted: 0,
  correct: 0,
  incorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  startTime: Date.now(),
}

export function Dashboard({
  sessionStats,
  domainProgress,
  bookmarkedScenarios,
  quizHistory,
  studyPlan,
  preparedness,
  onBack,
  onReset,
  onExport,
  onEditPlan,
}: DashboardProps) {
  const stats = sessionStats ?? DEFAULT_SESSION_STATS

  const overallAccuracy = stats.attempted > 0 ? ((stats.correct / stats.attempted) * 100).toFixed(1) : "0"

  const sessionTime = Math.floor((Date.now() - stats.startTime) / 1000 / 60)

  const getDomainStats = (domain: string) => {
    const domainStats = domainProgress[domain]
    if (!domainStats) return { attempted: 0, accuracy: 0, total: SCENARIOS.filter((s) => s.domain === domain).length }
    const accuracy = domainStats.attempted > 0 ? (domainStats.correct / domainStats.attempted) * 100 : 0
    return { ...domainStats, accuracy }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-accent"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success/20"
    if (score >= 60) return "bg-accent/20"
    if (score >= 40) return "bg-warning/20"
    return "bg-destructive/20"
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 md:p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Progress Dashboard</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Track your AWS certification journey</p>
          </div>
          <Button onClick={onBack} variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Study
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Score Circle */}
              <div
                className={`w-28 h-28 rounded-full ${getScoreBg(preparedness.overallScore)} flex items-center justify-center flex-shrink-0`}
              >
                <div className="text-center">
                  <span className={`text-3xl font-bold ${getScoreColor(preparedness.overallScore)}`}>
                    {Math.round(preparedness.overallScore)}%
                  </span>
                  <p className="text-xs text-muted-foreground">Ready</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Test Preparedness</h2>
                  {preparedness.onTrack ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{preparedness.recommendation}</p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  {studyPlan && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{preparedness.daysUntilTest} days until exam</span>
                    </div>
                  )}
                  {preparedness.estimatedReadyDate && (
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>
                        Est. ready:{" "}
                        {new Date(preparedness.estimatedReadyDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <Button onClick={onEditPlan} variant="outline" className="bg-transparent flex-shrink-0">
                <Clock className="w-4 h-4 mr-2" />
                {studyPlan ? "Edit Plan" : "Set Plan"}
              </Button>
            </div>

            {/* Progress to target */}
            {studyPlan && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress to {studyPlan.targetScore}% target</span>
                  <span>{Math.round(preparedness.overallScore)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      preparedness.overallScore >= studyPlan.targetScore ? "bg-success" : "bg-accent"
                    }`}
                    style={{ width: `${Math.min(100, (preparedness.overallScore / studyPlan.targetScore) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Attempted</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.attempted}</p>
                </div>
                <Target className="w-8 h-8 md:w-10 md:h-10 text-accent opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="text-2xl md:text-3xl font-bold text-success">{overallAccuracy}%</p>
                </div>
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-success opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                  <p className="text-2xl md:text-3xl font-bold text-accent">{stats.currentStreak}</p>
                </div>
                <Flame className="w-8 h-8 md:w-10 md:h-10 text-accent opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stats.bestStreak}</p>
                </div>
                <Award className="w-8 h-8 md:w-10 md:h-10 text-accent opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {(preparedness.weakestDomains.length > 0 || preparedness.strongestDomains.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preparedness.weakestDomains.length > 0 && (
              <Card className="border-border border-warning/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-warning" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {preparedness.weakestDomains.map((domain) => (
                      <div key={domain} className="flex justify-between items-center">
                        <span className="text-sm">{domain}</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(preparedness.domainScores[domain] || 0)}`}
                        >
                          {Math.round(preparedness.domainScores[domain] || 0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {preparedness.strongestDomains.length > 0 && (
              <Card className="border-border border-success/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Strongest Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {preparedness.strongestDomains.map((domain) => (
                      <div key={domain} className="flex justify-between items-center">
                        <span className="text-sm">{domain}</span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(preparedness.domainScores[domain] || 0)}`}
                        >
                          {Math.round(preparedness.domainScores[domain] || 0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Domain Performance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Domain Performance</CardTitle>
            <CardDescription>Track your progress across all AWS exam domains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DOMAINS.filter((d) => d !== "All Domains").map((domain) => {
                const domainStats = getDomainStats(domain)
                const progressPercent = domainStats.total > 0 ? (domainStats.attempted / domainStats.total) * 100 : 0
                const domainScore = preparedness.domainScores[domain] || 0

                return (
                  <div key={domain} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm text-foreground">{domain}</span>
                      <span className="text-xs text-muted-foreground">
                        {domainStats.attempted}/{domainStats.total} •{" "}
                        <span className={getScoreColor(domainScore)}>{Math.round(domainScore)}% ready</span>
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Session Info & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Session Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Correct Answers
                </span>
                <span className="font-semibold text-success">{stats.correct}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Incorrect Answers
                </span>
                <span className="font-semibold text-destructive">{stats.incorrect}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Session Time
                </span>
                <span className="font-semibold">{sessionTime} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <BookmarkIcon className="w-4 h-4" />
                  Bookmarked
                </span>
                <span className="font-semibold text-accent">{bookmarkedScenarios.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onExport} variant="outline" className="w-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Progress
              </Button>
              <Button onClick={onReset} variant="destructive" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset All Progress
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Export saves your progress as JSON. Reset clears all data.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz History */}
        {quizHistory.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Recent Quizzes</CardTitle>
              <CardDescription>Your last {Math.min(5, quizHistory.length)} quiz sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quizHistory
                  .slice(-5)
                  .reverse()
                  .map((result, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{result.domain}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(result.date).toLocaleDateString()} • {result.mode} mode
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {result.correct}/{result.totalQuestions}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((result.correct / result.totalQuestions) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
