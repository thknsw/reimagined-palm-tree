'use client'

import { useState } from 'react'
import type { Unit, LessonProgress } from '@/lib/gamification/types'
import { LessonNode } from './lesson-node'
import { UnitHeader } from './unit-header'
import { cn } from '@/lib/utils'

interface LearnPathProps {
  units: Unit[]
  lessonProgress: LessonProgress[]
  userId: string
  isDemoMode?: boolean
}

export function LearnPath({ units, lessonProgress, userId, isDemoMode = false }: LearnPathProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set([units[0]?.id]))

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits)
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId)
    } else {
      newExpanded.add(unitId)
    }
    setExpandedUnits(newExpanded)
  }

  // Calculate which lessons should be unlocked
  const getProgress = (lessonId: string) => {
    return lessonProgress.find(p => p.lesson_id === lessonId)
  }

  const isLessonUnlocked = (lesson: any, unit: Unit) => {
    // In demo mode, unlock first 3 lessons of first unit
    if (isDemoMode) {
      return unit.order === 0 && lesson.order < 3
    }

    // First lesson of first unit is always unlocked
    if (unit.order === 0 && lesson.order === 0) return true

    // Check if required lessons are completed
    if (lesson.requiredLessons && lesson.requiredLessons.length > 0) {
      return lesson.requiredLessons.every((reqId: string) => {
        const reqProgress = getProgress(reqId)
        return reqProgress?.status === 'completed' || reqProgress?.status === 'mastered'
      })
    }

    // If no specific requirements, check if previous lesson in same unit is completed
    const previousLesson = unit.lessons.find(l => l.order === lesson.order - 1)
    if (previousLesson) {
      const prevProgress = getProgress(previousLesson.id)
      return prevProgress?.status === 'completed' || prevProgress?.status === 'mastered'
    }

    // Check if previous unit is completed
    if (lesson.order === 0 && unit.order > 0) {
      const previousUnit = units[unit.order - 1]
      const allPreviousCompleted = previousUnit.lessons.every(l => {
        const progress = getProgress(l.id)
        return progress?.status === 'completed' || progress?.status === 'mastered'
      })
      return allPreviousCompleted
    }

    return false
  }

  return (
    <div className="space-y-8 pb-20">
      {units.map((unit, unitIndex) => {
        const isExpanded = expandedUnits.has(unit.id)
        const unitLessons = unit.lessons
        const completedLessons = unitLessons.filter(l => {
          const progress = getProgress(l.id)
          return progress?.status === 'completed' || progress?.status === 'mastered'
        }).length

        return (
          <div key={unit.id} className="space-y-6">
            <UnitHeader
              unit={unit}
              completedLessons={completedLessons}
              totalLessons={unitLessons.length}
              isExpanded={isExpanded}
              onToggle={() => toggleUnit(unit.id)}
            />

            {isExpanded && (
              <div className="relative">
                {/* Path connector line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-border to-transparent" />

                {/* Lessons */}
                <div className="space-y-8 relative">
                  {unitLessons.map((lesson, lessonIndex) => {
                    const progress = getProgress(lesson.id)
                    const isUnlocked = isLessonUnlocked(lesson, unit)
                    const status = progress?.status || (isUnlocked ? 'unlocked' : 'locked')
                    const stars = progress?.stars || 0

                    // Alternate left and right
                    const position = lessonIndex % 2 === 0 ? 'left' : 'right'

                    return (
                      <LessonNode
                        key={lesson.id}
                        lesson={lesson}
                        status={status}
                        stars={stars}
                        position={position}
                        isUnlocked={isUnlocked}
                        isDemoMode={isDemoMode}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Coming Soon indicator */}
      <div className="flex justify-center py-12">
        <div className="text-center space-y-2 opacity-50">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <p className="text-sm text-muted-foreground">More units coming soon!</p>
        </div>
      </div>
    </div>
  )
}
