"use client"

import { Button } from "@/components/ui/button"
import type { ConfidenceRating } from "@/lib/study-types"

type ConfidencePromptProps = {
  onSelect: (rating: ConfidenceRating) => void
  wasCorrect: boolean
}

const confidenceLevels: { rating: ConfidenceRating; label: string; description: string }[] = [
  { rating: 1, label: "Guessed", description: "Complete guess" },
  { rating: 2, label: "Unsure", description: "Mostly guessing" },
  { rating: 3, label: "Maybe", description: "Somewhat confident" },
  { rating: 4, label: "Likely", description: "Pretty sure" },
  { rating: 5, label: "Certain", description: "Absolutely sure" },
]

export function ConfidencePrompt({ onSelect, wasCorrect }: ConfidencePromptProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 border border-border">
      <p className="text-sm font-medium text-center mb-3">
        {wasCorrect ? "Nice! How confident were you?" : "How confident were you?"}
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        {confidenceLevels.map(({ rating, label }) => (
          <Button
            key={rating}
            variant="outline"
            size="sm"
            onClick={() => onSelect(rating)}
            className="bg-background hover:bg-accent hover:text-accent-foreground min-w-[60px]"
          >
            <span className="text-xs">{rating}</span>
            <span className="hidden sm:inline ml-1 text-xs">{label}</span>
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">1 = guessed, 5 = absolutely certain</p>
    </div>
  )
}
