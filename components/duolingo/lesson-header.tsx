'use client'

import { X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LessonHeaderProps {
  hearts: number
  maxHearts: number
  onExit: () => void
}

export function LessonHeader({ hearts, maxHearts, onExit }: LessonHeaderProps) {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Exit Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onExit}
          className="rounded-full hover:bg-accent"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Hearts */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxHearts }).map((_, i) => (
            <Heart
              key={i}
              className={cn(
                'w-6 h-6 transition-all',
                i < hearts 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-300 dark:text-gray-700'
              )}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
