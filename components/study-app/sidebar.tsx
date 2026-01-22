"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Flame, CheckCircle2 } from "lucide-react"
import { DOMAINS, SCENARIOS } from "@/lib/scenarios"
import type { DomainProgress, SessionStats } from "@/lib/study-types"

type SidebarProps = {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  selectedDomain: string
  setSelectedDomain: (domain: string) => void
  setCurrentScenarioIndex: (index: number) => void
  setSelectedAnswer: (answer: number | null) => void
  setShowFeedback: (show: boolean) => void
  sessionStats: SessionStats
  domainProgress: DomainProgress
}

const DEFAULT_SESSION_STATS: SessionStats = {
  attempted: 0,
  correct: 0,
  incorrect: 0,
  currentStreak: 0,
  bestStreak: 0,
  startTime: Date.now(),
}

export function Sidebar({
  showSidebar,
  setShowSidebar,
  selectedDomain,
  setSelectedDomain,
  setCurrentScenarioIndex,
  setSelectedAnswer,
  setShowFeedback,
  sessionStats,
  domainProgress,
}: SidebarProps) {
  const stats = sessionStats ?? DEFAULT_SESSION_STATS

  const getDomainStats = (domain: string) => {
    const domainStats = domainProgress[domain]
    if (!domainStats) return { attempted: 0, accuracy: 0, total: SCENARIOS.filter((s) => s.domain === domain).length }
    const accuracy = domainStats.attempted > 0 ? (domainStats.correct / domainStats.attempted) * 100 : 0
    return { ...domainStats, accuracy }
  }

  const overallAccuracy = stats.attempted > 0 ? ((stats.correct / stats.attempted) * 100).toFixed(0) : "0"

  return (
    <aside
      className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-72 bg-card border-r border-border p-4 space-y-4 overflow-y-auto`}
    >
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-accent" />
          Exam Domains
        </h3>
        <div className="space-y-1.5">
          {DOMAINS.map((domain) => {
            const domainStats = domain !== "All Domains" ? getDomainStats(domain) : null
            const isSelected = selectedDomain === domain
            return (
              <button
                key={domain}
                onClick={() => {
                  setSelectedDomain(domain)
                  setCurrentScenarioIndex(0)
                  setSelectedAnswer(null)
                  setShowFeedback(false)
                  setShowSidebar(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                }`}
              >
                <div className="font-medium text-sm">{domain}</div>
                {domainStats && (
                  <div className="flex items-center gap-2 text-xs mt-1 opacity-80">
                    <span>
                      {domainStats.attempted}/{domainStats.total}
                    </span>
                    <span>•</span>
                    <span className={domainStats.accuracy >= 70 ? "text-success" : ""}>
                      {domainStats.accuracy.toFixed(0)}%
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Flame className="w-4 h-4 text-accent" />
            Session Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm px-4 pb-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="font-semibold text-success">{overallAccuracy}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Streak</span>
            <span className="font-semibold text-accent">{stats.currentStreak}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Attempted</span>
            <span className="font-semibold">{stats.attempted}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Correct</span>
            <span className="font-semibold text-success flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {stats.correct}
            </span>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
