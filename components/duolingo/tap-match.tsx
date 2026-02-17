'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TapMatchProps {
  pairs: Array<{ left: string; right: string }>
  onComplete: (correct: boolean) => void
}

export function TapMatch({ pairs, onComplete }: TapMatchProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [incorrectPairs, setIncorrectPairs] = useState<Set<string>>(new Set())

  // Shuffle right column
  const [rightOptions] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5).map(p => p.right)
  )

  const handleLeftClick = (left: string) => {
    // Don't allow clicking already matched items
    if (matches[left]) return
    
    setSelectedLeft(left)
    setIncorrectPairs(new Set()) // Clear incorrect highlight
    
    // If right is already selected, try to match
    if (selectedRight) {
      checkMatch(left, selectedRight)
    }
  }

  const handleRightClick = (right: string) => {
    // Don't allow clicking already matched items
    if (Object.values(matches).includes(right)) return
    
    setSelectedRight(right)
    setIncorrectPairs(new Set()) // Clear incorrect highlight
    
    // If left is already selected, try to match
    if (selectedLeft) {
      checkMatch(selectedLeft, right)
    }
  }

  const checkMatch = (left: string, right: string) => {
    const correctPair = pairs.find(p => p.left === left)
    
    if (correctPair && correctPair.right === right) {
      // Correct match!
      setMatches(prev => ({ ...prev, [left]: right }))
      setSelectedLeft(null)
      setSelectedRight(null)
      
      // Check if all matched
      if (Object.keys(matches).length + 1 === pairs.length) {
        setTimeout(() => onComplete(true), 500)
      }
    } else {
      // Incorrect match - show feedback briefly
      setIncorrectPairs(new Set([left, right]))
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setIncorrectPairs(new Set())
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-3">
          {pairs.map((pair, index) => {
            const isMatched = !!matches[pair.left]
            const isSelected = selectedLeft === pair.left
            const isIncorrect = incorrectPairs.has(pair.left)
            
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleLeftClick(pair.left)}
                disabled={isMatched}
                className={cn(
                  'w-full h-auto min-h-[60px] p-4 text-left justify-start text-base transition-all',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  isSelected && 'border-blue-500 bg-blue-50 dark:bg-blue-950 border-2',
                  isMatched && 'border-green-500 bg-green-50 dark:bg-green-950 opacity-75',
                  isIncorrect && 'border-red-500 bg-red-50 dark:bg-red-950 animate-shake'
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  <span className="flex-1 font-semibold leading-tight">{pair.left}</span>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Right column (shuffled) */}
        <div className="space-y-3">
          {rightOptions.map((right, index) => {
            const isMatched = Object.values(matches).includes(right)
            const isSelected = selectedRight === right
            const isIncorrect = incorrectPairs.has(right)
            
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleRightClick(right)}
                disabled={isMatched}
                className={cn(
                  'w-full h-auto min-h-[60px] p-4 text-left justify-start text-base transition-all',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  isSelected && 'border-blue-500 bg-blue-50 dark:bg-blue-950 border-2',
                  isMatched && 'border-green-500 bg-green-50 dark:bg-green-950 opacity-75',
                  isIncorrect && 'border-red-500 bg-red-50 dark:bg-red-950 animate-shake'
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  {isMatched && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  <span className="flex-1 leading-tight">{right}</span>
                </div>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="text-center text-sm text-muted-foreground">
        {Object.keys(matches).length} / {pairs.length} matched
      </div>
    </div>
  )
}
