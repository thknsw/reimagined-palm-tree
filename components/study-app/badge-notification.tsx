"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import { getTierColor } from "@/lib/achievements"
import type { AchievementBadge } from "@/lib/study-types"

type BadgeNotificationProps = {
  badge: AchievementBadge
  onDismiss: () => void
}

export function BadgeNotification({ badge, onDismiss }: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100)

    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg bg-card ${getTierColor(badge.tier)}`}
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <span className="text-2xl">{badge.icon}</span>
        </div>
        <div>
          <p className="font-semibold text-sm">Badge Unlocked!</p>
          <p className="text-xs">{badge.name}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onDismiss} className="ml-2 h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
