'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'

interface DailyChallengeCardProps {
  challenge: {
    id: string
    challenge_date: string
    completed: boolean
    xp_reward: number
    gems_reward: number
  } | null
  streak: number
}

export function DailyChallengeCard({ challenge, streak }: DailyChallengeCardProps) {
  const isCompleted = challenge?.completed || false
  
  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-900">Daily Challenge</h3>
            <p className="text-sm text-orange-700">Complete today's special lesson</p>
          </div>
        </div>
        
        {isCompleted ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-bold">Done</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-200 text-orange-800">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-bold">Available</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 space-y-1">
          <div className="text-xs text-orange-600 font-medium">Rewards</div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-orange-900">+{challenge?.xp_reward || 20} XP</span>
            <span className="text-sm font-bold text-orange-900">+{challenge?.gems_reward || 5} Gems</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <div className="text-xs text-orange-600 font-medium">Current Streak</div>
          <div className="text-2xl font-bold text-orange-900">{streak} days 🔥</div>
        </div>
      </div>

      {!isCompleted ? (
        <Link href="/learn/practice">
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold">
            Start Challenge
          </Button>
        </Link>
      ) : (
        <Button disabled className="w-full" variant="outline">
          Challenge Completed
        </Button>
      )}
    </Card>
  )
}
