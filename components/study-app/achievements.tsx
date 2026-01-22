"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trophy, Lock } from "lucide-react"
import { ACHIEVEMENT_BADGES, getTierColor } from "@/lib/achievements"
import type { UnlockedBadge } from "@/lib/study-types"

type AchievementsProps = {
  unlockedBadges: UnlockedBadge[]
  onBack: () => void
}

export function Achievements({ unlockedBadges, onBack }: AchievementsProps) {
  const unlockedIds = unlockedBadges.map((b) => b.badgeId)
  const unlockedCount = unlockedIds.length
  const totalCount = ACHIEVEMENT_BADGES.length

  const tierOrder = ["platinum", "gold", "silver", "bronze"] as const
  const sortedBadges = [...ACHIEVEMENT_BADGES].sort((a, b) => {
    const aUnlocked = unlockedIds.includes(a.id)
    const bUnlocked = unlockedIds.includes(b.id)
    if (aUnlocked !== bUnlocked) return aUnlocked ? -1 : 1
    return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </h1>
            <p className="text-primary-foreground/70 text-xs">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
          <Button onClick={onBack} variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Progress */}
        <Card className="border-border mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Collection Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round((unlockedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sortedBadges.map((badge) => {
            const isUnlocked = unlockedIds.includes(badge.id)
            const unlockedData = unlockedBadges.find((b) => b.badgeId === badge.id)

            return (
              <Card
                key={badge.id}
                className={`border-2 transition-all ${
                  isUnlocked ? getTierColor(badge.tier) : "border-border opacity-50 grayscale"
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">
                    {isUnlocked ? badge.icon : <Lock className="w-8 h-8 mx-auto text-muted-foreground" />}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      isUnlocked ? getTierColor(badge.tier) : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {badge.tier}
                  </span>
                  {isUnlocked && unlockedData && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(unlockedData.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
