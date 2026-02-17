'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, Star, Sparkles } from 'lucide-react'
import type { Lesson } from '@/lib/gamification/types'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface LessonCompleteModalProps {
  lesson: Lesson
  earnedXp: number
  stars: number
  accuracy: number
  isPerfect: boolean
  onContinue: () => void
}

export function LessonCompleteModal({ 
  lesson, 
  earnedXp, 
  stars, 
  accuracy, 
  isPerfect,
  onContinue 
}: LessonCompleteModalProps) {
  const [showStars, setShowStars] = useState(false)

  useEffect(() => {
    // Trigger confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Show stars after a delay
    setTimeout(() => setShowStars(true), 500)
  }, [])

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6 py-6">
          {/* Trophy */}
          <div className="flex justify-center">
            <div className="relative animate-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
                <Trophy className="w-14 h-14 text-white" />
              </div>
              {isPerfect && (
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {isPerfect ? 'Perfect!' : 'Lesson Complete!'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isPerfect ? '🎉 No mistakes!' : `${accuracy}% accuracy`}
            </p>
          </div>

          {/* Stars */}
          {showStars && (
            <div className="flex justify-center gap-2 animate-in zoom-in duration-500">
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className={`w-12 h-12 transition-all duration-300 ${
                    i <= stars 
                      ? 'text-yellow-400 fill-yellow-400 scale-100' 
                      : 'text-gray-300 dark:text-gray-600 scale-90'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-3xl font-bold text-foreground">{earnedXp}</p>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-3xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>

          {/* Perfect bonus message */}
          {isPerfect && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                🌟 Bonus XP for perfect lesson!
              </p>
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14 rounded-2xl shadow-lg"
          >
            CONTINUE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
