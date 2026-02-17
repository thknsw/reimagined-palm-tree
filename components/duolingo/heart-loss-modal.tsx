'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import type { HeartLossData } from '@/lib/gamification/types'

interface HeartLossModalProps {
  data: HeartLossData
  onContinue: () => void
}

export function HeartLossModal({ data, onContinue }: HeartLossModalProps) {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6 py-6">
          {/* Broken Heart Animation */}
          <div className="flex justify-center">
            <div className="relative animate-in zoom-in duration-500">
              <Heart className="w-20 h-20 text-red-500 fill-red-500 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0.5 h-24 bg-background rotate-45" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Oops! Lost a heart
            </h2>
            <p className="text-muted-foreground">
              Don't worry, let's review the correct answer
            </p>
          </div>

          {/* Explanation */}
          <div className="bg-muted p-4 rounded-lg text-left space-y-3 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-1">Question:</p>
              <p className="text-muted-foreground">{data.question}</p>
            </div>
            <div>
              <p className="font-semibold text-red-600 dark:text-red-400 mb-1">Your answer:</p>
              <p className="text-muted-foreground">{data.yourAnswer}</p>
            </div>
            <div>
              <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Correct answer:</p>
              <p className="text-muted-foreground">{data.correctAnswer}</p>
            </div>
            {data.explanation && (
              <div>
                <p className="font-semibold text-foreground mb-1">Explanation:</p>
                <p className="text-muted-foreground leading-relaxed">{data.explanation}</p>
              </div>
            )}
          </div>

          <Button
            onClick={onContinue}
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
          >
            GOT IT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
