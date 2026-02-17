'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Unit } from '@/lib/gamification/types'
import { cn } from '@/lib/utils'

interface UnitHeaderProps {
  unit: Unit
  completedLessons: number
  totalLessons: number
  isExpanded: boolean
  onToggle: () => void
}

export function UnitHeader({ unit, completedLessons, totalLessons, isExpanded, onToggle }: UnitHeaderProps) {
  const progress = (completedLessons / totalLessons) * 100
  const isCompleted = completedLessons === totalLessons

  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full justify-between p-6 h-auto hover:bg-accent"
      >
        <div className="flex items-center gap-4">
          {/* Unit Icon */}
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg',
            'bg-gradient-to-br',
            unit.color
          )}>
            {unit.icon}
          </div>

          {/* Unit Info */}
          <div className="text-left space-y-1">
            <h2 className="text-xl font-bold">Unit {unit.order + 1}</h2>
            <p className="text-lg font-semibold text-foreground">{unit.name}</p>
            <p className="text-sm text-muted-foreground">{unit.description}</p>
          </div>
        </div>

        {/* Toggle Icon */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">
              {completedLessons} / {totalLessons} lessons
            </p>
            {isCompleted && (
              <p className="text-xs text-green-600 dark:text-green-400 font-semibold">✓ Unit Complete</p>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </Button>

      {/* Progress Bar */}
      <div className="px-6">
        <Progress value={progress} className="h-3" />
      </div>
    </div>
  )
}
