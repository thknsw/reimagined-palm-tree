'use client'

import { Heart, Flame, Gem, User } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { getXpForLevel } from '@/lib/gamification/lesson-mapper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DuolingoHeaderProps {
  xp: number
  level: number
  hearts: number
  maxHearts: number
  streak: number
  gems: number
  isDemoMode?: boolean
}

export function DuolingoHeader({ xp, level, hearts, maxHearts, streak, gems, isDemoMode = false }: DuolingoHeaderProps) {
  const xpForNextLevel = getXpForLevel(level + 1)
  const xpForCurrentLevel = getXpForLevel(level)
  const xpProgress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/learn" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-bold text-lg hidden sm:inline">AWS Academy</span>
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            {isDemoMode ? (
              <Button variant="ghost" size="sm" className="gap-2 cursor-not-allowed opacity-75">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-500">{streak}</span>
              </Button>
            ) : (
              <Link href="/learn/stats">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-orange-50 dark:hover:bg-orange-950">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-500">{streak}</span>
                </Button>
              </Link>
            )}

            {/* Hearts */}
            {isDemoMode ? (
              <Button variant="ghost" size="sm" className="gap-2 cursor-not-allowed opacity-75">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="font-bold text-red-500">{hearts}/{maxHearts}</span>
              </Button>
            ) : (
              <Link href="/shop">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-red-50 dark:hover:bg-red-950">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span className="font-bold text-red-500">{hearts}/{maxHearts}</span>
                </Button>
              </Link>
            )}

            {/* Gems */}
            {isDemoMode ? (
              <Button variant="ghost" size="sm" className="gap-2 cursor-not-allowed opacity-75">
                <Gem className="w-5 h-5 text-blue-500 fill-blue-500" />
                <span className="font-bold text-blue-500">{gems}</span>
              </Button>
            ) : (
              <Link href="/shop">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-950">
                  <Gem className="w-5 h-5 text-blue-500 fill-blue-500" />
                  <span className="font-bold text-blue-500">{gems}</span>
                </Button>
              </Link>
            )}

            {/* Level Progress */}
            <div className="hidden md:flex items-center gap-3 pl-4 border-l">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
                {level}
              </div>
              <div className="flex flex-col gap-1 min-w-[120px]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Level {level}</span>
                  <span className="text-muted-foreground font-medium">{Math.floor(xpProgress)}%</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </div>

            {/* Profile */}
            <Link href="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
