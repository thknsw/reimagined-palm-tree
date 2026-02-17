'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, Star, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface AchievementUnlockModalProps {
  achievement: {
    id: string
    name: string
    description: string
    icon: string
    gemsReward: number
  }
  onClose: () => void
}

export function AchievementUnlockModal({ achievement, onClose }: AchievementUnlockModalProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    // Fire confetti
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setOpen(false)
    setTimeout(onClose, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <div className="text-center py-6 space-y-6">
          {/* Trophy Animation */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-30 animate-ping" />
            </div>
            <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <div className="absolute bottom-0 right-1/4">
              <Star className="w-5 h-5 text-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="absolute bottom-0 left-1/4">
              <Star className="w-4 h-4 text-yellow-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* Achievement Details */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-yellow-600">Achievement Unlocked!</h2>
            <h3 className="text-2xl font-bold">{achievement.name}</h3>
            <p className="text-muted-foreground">{achievement.description}</p>
          </div>

          {/* Gems Reward */}
          {achievement.gemsReward > 0 && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" opacity="0.6" />
                <path d="M2 12L12 17L22 12" opacity="0.8" />
              </svg>
              +{achievement.gemsReward} Gems
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleClose}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
