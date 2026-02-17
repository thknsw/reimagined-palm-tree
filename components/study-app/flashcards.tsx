"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react"
import { ACRONYMS } from "@/components/study-app/exam-tips"

interface FlashcardsProps {
  onClose: () => void
}

export default function Flashcards({ onClose }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mastered, setMastered] = useState<Set<string>>(new Set())

  console.log("[v0] Total flashcards loaded:", ACRONYMS.length)
  console.log("[v0] First 5 cards:", ACRONYMS.slice(0, 5).map(c => c.term))
  console.log("[v0] Categories:", [...new Set(ACRONYMS.map(c => c.category))])

  const currentCard = ACRONYMS[currentIndex]
  const progress = ((currentIndex + 1) / ACRONYMS.length) * 100

  const handleNext = () => {
    if (currentIndex < ACRONYMS.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const toggleMastered = () => {
    const newMastered = new Set(mastered)
    if (mastered.has(currentCard.term)) {
      newMastered.delete(currentCard.term)
    } else {
      newMastered.add(currentCard.term)
    }
    setMastered(newMastered)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === " ") {
      e.preventDefault()
      handleFlip()
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Flashcards</h1>
            <p className="text-muted-foreground text-sm">
              Study {ACRONYMS.length} key AWS terms and acronyms
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Card {currentIndex + 1} of {ACRONYMS.length}
            </span>
            <span className="text-muted-foreground">{mastered.size} mastered</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div
          className="perspective-1000 mb-8 cursor-pointer"
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleFlip()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? "Show term" : "Show definition"}
        >
          <div
            className={`transform-style-3d relative h-[400px] transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* Front of card */}
            <Card
              className={`backface-hidden absolute inset-0 flex flex-col items-center justify-center p-8 shadow-lg ${isFlipped ? "hidden" : ""}`}
            >
              <div className="mb-4 rounded-full bg-primary/10 px-4 py-1 font-medium text-primary text-xs">
                {currentCard.category}
              </div>
              <h2 className="mb-4 text-balance text-center font-bold text-4xl md:text-5xl">
                {currentCard.term}
              </h2>
              <p className="text-center text-muted-foreground text-sm">Click or press Space to flip</p>
            </Card>

            {/* Back of card */}
            <Card
              className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center p-8 shadow-lg ${!isFlipped ? "hidden" : ""}`}
            >
              <div className="mb-4 rounded-full bg-primary/10 px-4 py-1 font-medium text-primary text-xs">
                Definition
              </div>
              <p className="mb-6 text-balance text-center text-lg leading-relaxed md:text-xl">{currentCard.definition}</p>
              <div className="w-full border-border border-t pt-4">
                <p className="text-center font-medium text-muted-foreground text-xs">
                  {currentCard.term}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentIndex === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === ACRONYMS.length - 1}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={mastered.has(currentCard.term) ? "default" : "outline"}
              size="sm"
              onClick={toggleMastered}
            >
              {mastered.has(currentCard.term) ? "Mastered ✓" : "Mark as Mastered"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
          <p className="mb-2 font-medium text-sm">Keyboard Shortcuts:</p>
          <div className="grid grid-cols-2 gap-2 text-muted-foreground text-xs md:grid-cols-3">
            <div>
              <kbd className="rounded bg-background px-2 py-1">Space</kbd> Flip card
            </div>
            <div>
              <kbd className="rounded bg-background px-2 py-1">←</kbd> Previous
            </div>
            <div>
              <kbd className="rounded bg-background px-2 py-1">→</kbd> Next
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
