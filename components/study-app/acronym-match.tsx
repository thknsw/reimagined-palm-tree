"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shuffle, Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import { GLOSSARY_TERMS } from "@/lib/study-types"

type AcronymMatchProps = {
  onBack: () => void
  onComplete?: (score: number, total: number) => void
}

type MatchItem = {
  id: string
  type: "acronym" | "definition"
  text: string
  matchId: string
  selected: boolean
  matched: boolean
  incorrect: boolean
}

export function AcronymMatch({ onBack, onComplete }: AcronymMatchProps) {
  const [mode, setMode] = useState<"menu" | "match" | "flashcard" | "results">("menu")
  const [items, setItems] = useState<MatchItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MatchItem | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [matchedCount, setMatchedCount] = useState(0)
  const [totalPairs, setTotalPairs] = useState(0)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [flashcardScore, setFlashcardScore] = useState({ correct: 0, incorrect: 0 })
  const [shuffledTerms, setShuffledTerms] = useState(GLOSSARY_TERMS)
  const [category, setCategory] = useState<string>("all")

  const categories = ["all", ...new Set(GLOSSARY_TERMS.map((t) => t.category))]

  const initMatchGame = useCallback(
    (pairCount = 6) => {
      const filteredTerms = category === "all" ? GLOSSARY_TERMS : GLOSSARY_TERMS.filter((t) => t.category === category)

      const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(pairCount, shuffled.length))

      const acronyms: MatchItem[] = selected.map((term) => ({
        id: `a-${term.acronym}`,
        type: "acronym",
        text: term.acronym,
        matchId: term.acronym,
        selected: false,
        matched: false,
        incorrect: false,
      }))

      const definitions: MatchItem[] = selected.map((term) => ({
        id: `d-${term.acronym}`,
        type: "definition",
        text: term.fullName,
        matchId: term.acronym,
        selected: false,
        matched: false,
        incorrect: false,
      }))

      const shuffledAcronyms = [...acronyms].sort(() => Math.random() - 0.5)
      const shuffledDefinitions = [...definitions].sort(() => Math.random() - 0.5)

      setItems([...shuffledAcronyms, ...shuffledDefinitions])
      setSelectedItem(null)
      setScore(0)
      setAttempts(0)
      setMatchedCount(0)
      setTotalPairs(selected.length)
      setMode("match")
    },
    [category],
  )

  const initFlashcards = useCallback(() => {
    const filteredTerms = category === "all" ? GLOSSARY_TERMS : GLOSSARY_TERMS.filter((t) => t.category === category)
    const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5)
    setShuffledTerms(shuffled)
    setFlashcardIndex(0)
    setShowAnswer(false)
    setFlashcardScore({ correct: 0, incorrect: 0 })
    setMode("flashcard")
  }, [category])

  const handleItemClick = (item: MatchItem) => {
    if (item.matched || item.incorrect) return

    if (!selectedItem) {
      setItems((prev) =>
        prev.map((i) => ({
          ...i,
          selected: i.id === item.id,
          incorrect: false,
        })),
      )
      setSelectedItem(item)
    } else if (selectedItem.id === item.id) {
      setItems((prev) =>
        prev.map((i) => ({
          ...i,
          selected: false,
        })),
      )
      setSelectedItem(null)
    } else if (selectedItem.type === item.type) {
      setItems((prev) =>
        prev.map((i) => ({
          ...i,
          selected: i.id === item.id,
          incorrect: false,
        })),
      )
      setSelectedItem(item)
    } else {
      setAttempts((prev) => prev + 1)

      if (selectedItem.matchId === item.matchId) {
        setScore((prev) => prev + 1)
        setMatchedCount((prev) => prev + 1)
        setItems((prev) =>
          prev.map((i) => ({
            ...i,
            selected: false,
            matched: i.matchId === item.matchId ? true : i.matched,
          })),
        )
        setSelectedItem(null)

        if (matchedCount + 1 === totalPairs) {
          setTimeout(() => setMode("results"), 500)
        }
      } else {
        setItems((prev) =>
          prev.map((i) => ({
            ...i,
            selected: false,
            incorrect: i.id === selectedItem.id || i.id === item.id,
          })),
        )
        setTimeout(() => {
          setItems((prev) =>
            prev.map((i) => ({
              ...i,
              incorrect: false,
            })),
          )
        }, 800)
        setSelectedItem(null)
      }
    }
  }

  const handleFlashcardResponse = (knew: boolean) => {
    if (knew) {
      setFlashcardScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setFlashcardScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
    }

    if (flashcardIndex < shuffledTerms.length - 1) {
      setFlashcardIndex((prev) => prev + 1)
      setShowAnswer(false)
    } else {
      setMode("results")
    }
  }

  const acronyms = items.filter((i) => i.type === "acronym")
  const definitions = items.filter((i) => i.type === "definition")

  if (mode === "menu") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Acronym Study</h1>
              <p className="text-primary-foreground/70 text-sm">Master AWS terminology</p>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto p-4 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Choose Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-accent transition-colors" onClick={() => initMatchGame(6)}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shuffle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Match Game</h3>
                  <p className="text-sm text-muted-foreground">Match acronyms to their definitions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-accent transition-colors" onClick={initFlashcards}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Flashcards</h3>
                  <p className="text-sm text-muted-foreground">
                    Review all{" "}
                    {category === "all"
                      ? GLOSSARY_TERMS.length
                      : GLOSSARY_TERMS.filter((t) => t.category === category).length}{" "}
                    terms one by one
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            {GLOSSARY_TERMS.length} acronyms & terms to master
          </div>
        </main>
      </div>
    )
  }

  if (mode === "match") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setMode("menu")}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold">Match Game</h1>
                <p className="text-primary-foreground/70 text-xs">
                  {matchedCount}/{totalPairs} matched
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                Score: {score}/{attempts || "-"}
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground text-center mb-3">ACRONYMS</p>
              {acronyms.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.matched}
                  className={`w-full p-3 rounded-lg text-left font-mono font-bold text-sm transition-all ${
                    item.matched
                      ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                      : item.incorrect
                        ? "bg-destructive/20 text-destructive border border-destructive/30 animate-shake"
                        : item.selected
                          ? "bg-accent text-accent-foreground border border-accent"
                          : "bg-card border border-border hover:border-accent"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground text-center mb-3">DEFINITIONS</p>
              {definitions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.matched}
                  className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                    item.matched
                      ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                      : item.incorrect
                        ? "bg-destructive/20 text-destructive border border-destructive/30 animate-shake"
                        : item.selected
                          ? "bg-accent text-accent-foreground border border-accent"
                          : "bg-card border border-border hover:border-accent"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (mode === "flashcard") {
    const currentTerm = shuffledTerms[flashcardIndex]

    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setMode("menu")}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold">Flashcards</h1>
                <p className="text-primary-foreground/70 text-xs">
                  {flashcardIndex + 1}/{shuffledTerms.length}
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-green-400">{flashcardScore.correct} ✓</span>
              <span className="text-red-400">{flashcardScore.incorrect} ✗</span>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto p-4 pt-8">
          <Card
            className="min-h-[300px] flex flex-col items-center justify-center cursor-pointer"
            onClick={() => !showAnswer && setShowAnswer(true)}
          >
            <CardContent className="p-8 text-center">
              <p className="text-4xl font-mono font-bold text-accent mb-4">{currentTerm.acronym}</p>

              {showAnswer ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-xl font-semibold">{currentTerm.fullName}</p>
                  <p className="text-muted-foreground">{currentTerm.description}</p>
                  <span className="inline-block text-xs bg-secondary px-2 py-1 rounded-full capitalize">
                    {currentTerm.category}
                  </span>
                </div>
              ) : (
                <p className="text-muted-foreground">Tap to reveal</p>
              )}
            </CardContent>
          </Card>

          {showAnswer && (
            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => handleFlashcardResponse(false)}
                variant="outline"
                className="flex-1 h-14 border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Didn&apos;t Know
              </Button>
              <Button
                onClick={() => handleFlashcardResponse(true)}
                className="flex-1 h-14 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Knew It
              </Button>
            </div>
          )}

          <div className="mt-6">
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="h-2 rounded-full bg-accent transition-all"
                style={{ width: `${((flashcardIndex + 1) / shuffledTerms.length) * 100}%` }}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Results
  const isMatchMode = items.length > 0
  const resultScore = isMatchMode ? score : flashcardScore.correct
  const resultTotal = isMatchMode ? totalPairs : flashcardScore.correct + flashcardScore.incorrect
  const percentage = Math.round((resultScore / resultTotal) * 100)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            onClick={() => setMode("menu")}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Results</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <Trophy className={`w-16 h-16 mx-auto ${percentage >= 80 ? "text-yellow-500" : "text-muted-foreground"}`} />

            <div>
              <p className="text-5xl font-bold text-accent">{percentage}%</p>
              <p className="text-muted-foreground mt-1">
                {resultScore} out of {resultTotal} correct
              </p>
            </div>

            <p className="text-lg">
              {percentage >= 90
                ? "Excellent! You've mastered these terms!"
                : percentage >= 70
                  ? "Great job! Keep practicing to perfect your knowledge."
                  : percentage >= 50
                    ? "Good effort! Review the terms you missed."
                    : "Keep studying! Practice makes perfect."}
            </p>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setMode("menu")} className="flex-1">
                Back to Menu
              </Button>
              <Button onClick={isMatchMode ? () => initMatchGame(6) : initFlashcards} className="flex-1">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
