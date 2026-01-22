"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart3,
} from "lucide-react"
import type { PreparednessData, StudyPlan } from "@/lib/study-types"

type PreparednessCardProps = {
  preparedness: PreparednessData
  studyPlan: StudyPlan | null
  onEditPlan: () => void
  onShowTimeline?: () => void
  compact?: boolean
}

export function PreparednessCard({
  preparedness,
  studyPlan,
  onEditPlan,
  onShowTimeline,
  compact = false,
}: PreparednessCardProps) {
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

  const getStatusIcon = () => {
    if (preparedness.overallScore >= 80) return <CheckCircle2 className="w-5 h-5 text-success" />
    if (preparedness.onTrack) return <TrendingUp className="w-5 h-5 text-accent" />
    return <AlertTriangle className="w-5 h-5 text-warning" />
  }

  if (compact) {
    return (
      <div className="flex gap-2">
        <button
          onClick={onEditPlan}
          className="flex-1 bg-secondary/50 rounded-lg p-3 flex items-center justify-between hover:bg-secondary/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${getScoreBg(preparedness.overallScore)} flex items-center justify-center`}
            >
              <span className={`text-sm font-bold ${getScoreColor(preparedness.overallScore)}`}>
                {Math.round(preparedness.overallScore)}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Test Readiness</p>
              <p className="text-xs text-muted-foreground">
                {studyPlan ? `${preparedness.daysUntilTest}d until exam` : "No plan set"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        {studyPlan && onShowTimeline && (
          <button
            onClick={onShowTimeline}
            className="bg-secondary/50 rounded-lg p-3 flex items-center justify-center hover:bg-secondary/70 transition-colors"
            title="View Study Timeline"
          >
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    )
  }

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Test Preparedness
          </CardTitle>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-20 h-20 rounded-full ${getScoreBg(preparedness.overallScore)} flex items-center justify-center`}
          >
            <span className={`text-2xl font-bold ${getScoreColor(preparedness.overallScore)}`}>
              {Math.round(preparedness.overallScore)}%
            </span>
          </div>
          <div className="flex-1">
            <p className="font-medium">{preparedness.recommendation}</p>
            {studyPlan && (
              <p className="text-sm text-muted-foreground mt-1">{preparedness.daysUntilTest} days until your exam</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to target</span>
            <span>{studyPlan?.targetScore || 70}% goal</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                preparedness.overallScore >= (studyPlan?.targetScore || 70) ? "bg-success" : "bg-accent"
              }`}
              style={{ width: `${Math.min(100, (preparedness.overallScore / (studyPlan?.targetScore || 70)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {studyPlan && (
            <div className="bg-secondary/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">Exam Date</span>
              </div>
              <p className="text-sm font-medium">
                {new Date(studyPlan.testDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
          <div className="bg-secondary/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Target className="w-3 h-3" />
              <span className="text-xs">Est. Ready</span>
            </div>
            <p className="text-sm font-medium">
              {preparedness.estimatedReadyDate
                ? new Date(preparedness.estimatedReadyDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Need more data"}
            </p>
          </div>
        </div>

        {preparedness.weakestDomains.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Focus Areas</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {preparedness.weakestDomains.slice(0, 2).map((domain) => (
                <span key={domain} className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                  {domain.replace(" and ", " & ")}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onEditPlan} variant="outline" className="flex-1 bg-transparent" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            {studyPlan ? "Edit Study Plan" : "Set Up Study Plan"}
          </Button>
          {studyPlan && onShowTimeline && (
            <Button onClick={onShowTimeline} variant="outline" className="bg-transparent" size="sm">
              <BarChart3 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
