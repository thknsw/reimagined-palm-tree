'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Flame, Zap, Shield, Gem } from 'lucide-react'
import { spendGems, refillHearts } from '@/lib/gamification/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ShopContentProps {
  userId: string
  gems: number
  hearts: number
  maxHearts: number
}

interface ShopItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  cost: number
  type: 'heart_refill' | 'streak_freeze' | 'xp_boost' | 'heart_unlimited'
  available: boolean
}

export function ShopContent({ userId, gems, hearts, maxHearts }: ShopContentProps) {
  const router = useRouter()
  const [purchasing, setPurchasing] = useState(false)
  const [currentGems, setCurrentGems] = useState(gems)

  const shopItems: ShopItem[] = [
    {
      id: 'refill',
      name: 'Refill Hearts',
      description: 'Restore all hearts to full',
      icon: <Heart className="w-8 h-8 text-red-500 fill-red-500" />,
      cost: 50,
      type: 'heart_refill',
      available: hearts < maxHearts
    },
    {
      id: 'freeze',
      name: 'Streak Freeze',
      description: 'Protect your streak for 24 hours',
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      cost: 100,
      type: 'streak_freeze',
      available: true
    },
    {
      id: 'boost',
      name: 'XP Boost',
      description: 'Earn 2x XP for 1 hour',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      cost: 150,
      type: 'xp_boost',
      available: true
    },
    {
      id: 'unlimited',
      name: 'Unlimited Hearts',
      description: 'Never lose hearts for 24 hours',
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      cost: 500,
      type: 'heart_unlimited',
      available: true
    }
  ]

  const handlePurchase = async (item: ShopItem) => {
    if (purchasing || currentGems < item.cost) return

    setPurchasing(true)

    try {
      const { success, remainingGems } = await spendGems(userId, item.cost)

      if (!success) {
        toast.error('Not enough gems!')
        return
      }

      // Apply the item effect
      if (item.type === 'heart_refill') {
        await refillHearts(userId)
        toast.success('Hearts refilled!')
      } else {
        toast.success(`${item.name} activated!`)
      }

      setCurrentGems(remainingGems)
      router.refresh()
    } catch (error) {
      toast.error('Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Shop</h1>
        <p className="text-muted-foreground">
          Use your gems to get power-ups and bonuses
        </p>
        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Gem className="w-6 h-6 text-blue-500 fill-blue-500" />
          <span>{currentGems} gems</span>
        </div>
      </div>

      {/* Shop Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopItems.map((item) => (
          <Card key={item.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-blue-500 fill-blue-500" />
                <span className="font-bold text-lg">{item.cost}</span>
              </div>

              <Button
                onClick={() => handlePurchase(item)}
                disabled={!item.available || currentGems < item.cost || purchasing}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              >
                {currentGems < item.cost ? 'Not enough gems' : item.available ? 'BUY' : 'Unavailable'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* How to Earn Gems */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-lg mb-3">How to earn gems</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span>Complete daily challenges</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span>Achieve perfect lessons (no mistakes)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span>Maintain long streaks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span>Unlock achievements</span>
          </li>
        </ul>
      </Card>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => router.push('/learn')}
          className="min-w-[200px]"
        >
          Back to Learning
        </Button>
      </div>
    </div>
  )
}
