'use client'

import { Lock, Star, Trophy, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { Lesson } from '@/lib/gamification/types'
import { useState } from 'react'
import { PracticeModal } from './practice-modal'

interface LessonNodeProps {
  lesson: Lesson
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed' | 'mastered'
  stars: number
  position: 'left' | 'right'
  isUnlocked: boolean
  isDemoMode?: boolean
}

export function LessonNode({ lesson, status, stars, position, isUnlocked, isDemoMode = false }: LessonNodeProps) {
  const [showPracticeModal, setShowPracticeModal] = useState(false)
  const isLocked = status === 'locked' || !isUnlocked
  const isCompleted = status === 'completed' || status === 'mastered'
  const isMastered = status === 'mastered'

  // Different styles for different lesson types
  const getLessonStyle = () => {
    if (lesson.type === 'chest') {
      return 'bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700'
    }
    if (lesson.type === 'unit_review') {
      return 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700'
    }
    if (lesson.type === 'practice') {
      return 'bg-gradient-to-br from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700'
    }
    if (lesson.type === 'story') {
      return 'bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700'
    }
    
    // Regular lesson
    if (isMastered) {
      return 'bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700'
    }
    if (isCompleted) {
      return 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
    }
    if (isLocked) {
      return 'bg-gray-300 dark:bg-gray-700'
    }
    return 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700'
  }

  const getIcon = () => {
    if (isLocked) return <Lock className="w-6 h-6 text-gray-500" />
    if (lesson.type === 'chest') return <Gift className="w-8 h-8 text-white" />
    if (lesson.type === 'unit_review') return <Trophy className="w-7 h-7 text-white" />
    if (isMastered) return <Star className="w-7 h-7 text-white fill-white" />
    return <span className="text-3xl">{lesson.icon}</span>
  }

  const handleLessonClick = (e: React.MouseEvent) => {
    if (isCompleted && !isLocked) {
      e.preventDefault()
      setShowPracticeModal(true)
    }
  }

  return (
    <>
      <PracticeModal
        open={showPracticeModal}
        onOpenChange={setShowPracticeModal}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
      />
      
      <div className={cn(
        'flex items-center justify-center',
        position === 'left' ? 'flex-row pr-[50%]' : 'flex-row-reverse pl-[50%]'
      )}>
        <div className={cn(
          'flex flex-col items-center gap-2',
          position === 'left' ? 'items-end' : 'items-start'
        )}>
          {/* Lesson Button */}
          <Link 
            href={isLocked ? '#' : (isDemoMode ? `/learn/lesson/${lesson.id}?demo=true` : `/learn/lesson/${lesson.id}`)} 
            className={isLocked ? 'pointer-events-none' : ''} 
            onClick={handleLessonClick}
          >
          <Button
            disabled={isLocked}
            className={cn(
              'relative w-20 h-20 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95',
              getLessonStyle(),
              isLocked && 'opacity-50 cursor-not-allowed hover:scale-100'
            )}
          >
            {getIcon()}

            {/* Completion indicator */}
            {isCompleted && !isMastered && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs">✓</span>
              </div>
            )}

            {/* Mastered indicator */}
            {isMastered && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <Star className="w-4 h-4 text-yellow-900 fill-yellow-900" />
              </div>
            )}
          </Button>
        </Link>

        {/* Lesson Info */}
        <div className={cn(
          'max-w-[200px] text-center',
          position === 'left' ? 'text-right' : 'text-left'
        )}>
          <p className="font-semibold text-sm">{lesson.title}</p>
          {lesson.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{lesson.description}</p>
          )}
          
          {/* Stars */}
          {!isLocked && (
            <div className="flex gap-1 mt-1 justify-center">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i <= stars 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  )}
                />
              ))}
            </div>
          )}

          {/* XP Reward */}
          {!isLocked && !isCompleted && (
            <div className="flex items-center gap-1 mt-1 justify-center text-xs text-muted-foreground">
              <span>+{lesson.xpReward} XP</span>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
