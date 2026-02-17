"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BookmarkIcon, ChevronRight, Lightbulb, Tag } from "lucide-react"
import { ConfidencePrompt } from "./confidence-prompt"
import type { Scenario } from "@/lib/scenarios"
import type { ConfidenceRating } from "@/lib/study-types"

type QuestionCardProps = {
  scenario: Scenario
  scenarioIndex: number
  totalScenarios: number
  selectedDomain: string
  selectedAnswer: number | number[] | null
  showFeedback: boolean
  isBookmarked: boolean
  onAnswerSelect: (index: number | number[]) => void
  onSubmit: () => void
  onNext: () => void
  onToggleBookmark: () => void
  hideBookmark?: boolean
  submitLabel?: string
  showConfidencePrompt?: boolean
  onConfidenceSelect?: (rating: ConfidenceRating) => void
}

export function QuestionCard({
  scenario,
  scenarioIndex,
  totalScenarios,
  selectedDomain,
  selectedAnswer,
  showFeedback,
  isBookmarked,
  onAnswerSelect,
  onSubmit,
  onNext,
  onToggleBookmark,
  hideBookmark = false,
  submitLabel = "Submit Answer",
  showConfidencePrompt = false,
  onConfidenceSelect,
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-success bg-success/10 border-success/20"
      case "intermediate":
        return "text-warning bg-warning/10 border-warning/20"
      case "advanced":
        return "text-destructive bg-destructive/10 border-destructive/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const isMultiSelect = scenario.isMultiSelect === true
  const correctAnswers = Array.isArray(scenario.correctAnswer) ? scenario.correctAnswer : [scenario.correctAnswer]

  const handleMultiSelectToggle = (index: number) => {
    if (showFeedback) return
    const currentSelected = Array.isArray(selectedAnswer) ? selectedAnswer : []
    if (currentSelected.includes(index)) {
      onAnswerSelect(currentSelected.filter((i) => i !== index))
    } else {
      onAnswerSelect([...currentSelected, index])
    }
  }

  const isAnswerCorrect = () => {
    if (isMultiSelect) {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : []
      return selected.length === correctAnswers.length && selected.every((s) => correctAnswers.includes(s))
    }
    return selectedAnswer === scenario.correctAnswer
  }

  const hasAnswer = isMultiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0 : selectedAnswer !== null

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-card rounded-lg p-3 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            Question {scenarioIndex + 1} of {totalScenarios}
          </span>
          <span className="text-xs text-muted-foreground">{selectedDomain}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((scenarioIndex + 1) / totalScenarios) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="shadow-lg border-border">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(scenario.difficulty)}`}
                >
                  {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">{scenario.domain}</span>
                {isMultiSelect && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                    Select {correctAnswers.length}
                  </span>
                )}
              </div>
              <CardTitle className="text-lg font-semibold">Scenario</CardTitle>
            </div>
            {!hideBookmark && (
              <Button
                onClick={onToggleBookmark}
                variant="ghost"
                size="icon"
                className={isBookmarked ? "text-accent" : "text-muted-foreground"}
              >
                <BookmarkIcon className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-foreground leading-relaxed">{scenario.scenario}</p>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">
              {isMultiSelect ? `Select ${correctAnswers.length} answers:` : "Select your answer:"}
            </Label>

            {isMultiSelect ? (
              <div className="space-y-2">
                {scenario.options.map((option, index) => {
                  const isSelected = Array.isArray(selectedAnswer) && selectedAnswer.includes(index)
                  const isCorrectOption = correctAnswers.includes(index)

                  let bgColor = "bg-card hover:bg-secondary/50 border-border"
                  let textColor = ""

                  if (showFeedback) {
                    if (isCorrectOption) {
                      bgColor = "bg-success/10 border-success"
                      textColor = "text-success"
                    } else if (isSelected) {
                      bgColor = "bg-destructive/10 border-destructive"
                      textColor = "text-destructive"
                    }
                  } else if (isSelected) {
                    bgColor = "bg-accent/10 border-accent"
                  }

                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 min-h-[44px] rounded-lg border-2 transition-all ${bgColor} ${
                        !showFeedback ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                      }`}
                      onClick={() => handleMultiSelectToggle(index)}
                    >
                      <Checkbox checked={isSelected} disabled={showFeedback} className="mt-0.5" />
                      <span className={`flex-1 text-sm md:text-base leading-relaxed ${textColor}`}>{option}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(val) => onAnswerSelect(Number.parseInt(val))}
              >
                {scenario.options.map((option, index) => {
                  let bgColor = "bg-card hover:bg-secondary/50 border-border"
                  let textColor = ""

                  if (showFeedback) {
                    if (index === scenario.correctAnswer) {
                      bgColor = "bg-success/10 border-success"
                      textColor = "text-success"
                    } else if (index === selectedAnswer) {
                      bgColor = "bg-destructive/10 border-destructive"
                      textColor = "text-destructive"
                    }
                  } else if (selectedAnswer === index) {
                    bgColor = "bg-accent/10 border-accent"
                  }

                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 min-h-[44px] rounded-lg border-2 transition-all ${bgColor} ${
                        !showFeedback ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                      }`}
                      onClick={() => !showFeedback && onAnswerSelect(index)}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        disabled={showFeedback}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex-1 cursor-pointer text-sm md:text-base leading-relaxed ${textColor}`}
                      >
                        {option}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            )}
          </div>

          {!showFeedback && (
            <Button
              onClick={onSubmit}
              disabled={!hasAnswer}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground min-h-[44px] py-3 text-base font-semibold"
            >
              {submitLabel}
            </Button>
          )}

          {showFeedback && (
            <div className="space-y-4 mt-4">
              <div
                className={`p-4 rounded-lg border-2 ${
                  isAnswerCorrect() ? "bg-success/10 border-success" : "bg-destructive/10 border-destructive"
                }`}
              >
                <h3 className={`font-bold text-base mb-2 ${isAnswerCorrect() ? "text-success" : "text-destructive"}`}>
                  {isAnswerCorrect() ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-foreground text-sm leading-relaxed">{scenario.explanation}</p>
              </div>

              {!isAnswerCorrect() && (
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Why other options are incorrect:
                  </h4>
                  <ul className="space-y-2">
                    {scenario.incorrectExplanations.map((exp, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {showConfidencePrompt && onConfidenceSelect && (
                <ConfidencePrompt onSelect={onConfidenceSelect} wasCorrect={isAnswerCorrect()} />
              )}

              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-accent" />
                  Related AWS Services:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.relatedServices.map((service) => (
                    <span
                      key={service}
                      className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={onNext}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px] py-3 text-base font-semibold"
              >
                Next Question
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
