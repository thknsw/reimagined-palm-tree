'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LessonQuestion } from '@/lib/gamification/types'
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'
import { TapMatch } from './tap-match'

interface QuestionDisplayProps {
  question: LessonQuestion
  onAnswer: (answer: string | string[], isCorrect: boolean) => void
}

export function QuestionDisplay({ question, onAnswer }: QuestionDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]) // For multi-select
  const [pairMatches, setPairMatches] = useState<Record<string, string>>({}) // For pairing questions
  const [selectedWords, setSelectedWords] = useState<string[]>([]) // For fill-in-the-blank
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const isMultiSelect = question.isMultiSelect || (Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1)
  
  // Calculate number of blanks for fill-in-the-blank questions
  const blankCount = question.context ? (question.context.match(/___+/g) || []).length : 0

  const handleSelectAnswer = (answer: string) => {
    if (hasAnswered) return
    
    if (isMultiSelect) {
      // Multi-select: toggle answer in array
      setSelectedAnswers(prev => {
        if (prev.includes(answer)) {
          return prev.filter(a => a !== answer)
        } else {
          return [...prev, answer]
        }
      })
    } else {
      // Single select
      setSelectedAnswer(answer)
    }
  }

  const handleSelectWord = (word: string) => {
    if (hasAnswered) return
    if (selectedWords.length < blankCount) {
      setSelectedWords(prev => [...prev, word])
    }
  }

  const handleRemoveWord = (index: number) => {
    if (hasAnswered) return
    setSelectedWords(prev => prev.filter((_, i) => i !== index))
  }

  const handleMatchComplete = (correct: boolean) => {
    onAnswer('matched', correct)
  }

  const handleCheckAnswer = () => {
    let correct = false
    let answer: string | string[] = ''

    if (question.type === 'match') {
      // This shouldn't be called for match type as it auto-completes
      return
    } else if (question.type === 'pairing') {
      // Check if all pairs are matched correctly
      const allCorrect = question.pairs?.every(pair => 
        pairMatches[pair.term] === pair.definition
      )
      correct = allCorrect || false
      answer = Object.entries(pairMatches).map(([term, def]) => `${term}: ${def}`).join(', ')
    } else if (question.type === 'select_missing') {
      // Fill-in-the-blank: check if selected words match correct answer
      if (hasAnswered || selectedWords.length === 0) return
      
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer]
      
      // Check if words are in correct order
      correct = selectedWords.length === correctAnswers.length &&
                selectedWords.every((word, idx) => word === correctAnswers[idx])
      
      answer = selectedWords
    } else if (isMultiSelect) {
      // Multi-select: check if arrays match
      if (hasAnswered || selectedAnswers.length === 0) return
      
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.map(idx => typeof idx === 'number' ? question.options![idx] : idx)
        : [question.correctAnswer]
      
      // Check if selected answers match correct answers (order doesn't matter)
      correct = selectedAnswers.length === correctAnswers.length &&
                selectedAnswers.every(ans => correctAnswers.includes(ans))
      
      answer = selectedAnswers
    } else {
      // Single select
      if (!selectedAnswer || hasAnswered) return
      correct = selectedAnswer === question.correctAnswer
      answer = selectedAnswer
    }

    setIsCorrect(correct)
    setHasAnswered(true)

    // Call onAnswer after a brief delay to show feedback
    setTimeout(() => {
      onAnswer(answer, correct)
      // Reset for next question
      setSelectedAnswer(null)
      setSelectedAnswers([])
      setPairMatches({})
      setSelectedWords([])
      setHasAnswered(false)
      setIsCorrect(false)
    }, correct ? 1000 : 0)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Question */}
      <div className="space-y-4">
        {question.context && (
          <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
              <strong className="font-semibold">Scenario:</strong> {question.context}
            </p>
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-bold leading-tight text-balance">
            {question.question}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            {question.difficulty && (
              <span className={cn(
                'inline-block px-2 py-1 text-xs font-semibold rounded-full',
                question.difficulty === 'easy' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                question.difficulty === 'medium' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                question.difficulty === 'hard' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              )}>
                {question.difficulty}
              </span>
            )}
            {isMultiSelect && (
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Select {question.selectCount || 'multiple'} answers
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tap Matching Pairs */}
      {question.type === 'match' && question.context ? (
        <div className="space-y-4">
          <TapMatch
            pairs={JSON.parse(question.context).pairs}
            onComplete={handleMatchComplete}
          />
        </div>
      ) : null}

      {/* Fill-in-the-blank Questions */}
      {question.type === 'select_missing' && question.context ? (
        <div className="space-y-6">
          {/* Sentence with blanks */}
          <Card className="p-6 bg-accent/50 border-2">
            <div className="flex flex-wrap items-center gap-2 text-lg leading-relaxed">
              {question.context.split(/(\s+)/).map((part, index) => {
                if (part.match(/___+/)) {
                  const blankIndex = question.context!.substring(0, question.context!.indexOf(part)).split('___').length - 1
                  const filledWord = selectedWords[blankIndex]
                  
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => filledWord && handleRemoveWord(blankIndex)}
                      disabled={hasAnswered}
                      className={cn(
                        'min-w-[100px] h-10 border-2 border-dashed font-medium',
                        filledWord ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-300'
                      )}
                    >
                      {filledWord || '___'}
                    </Button>
                  )
                } else if (part.trim()) {
                  return <span key={index}>{part}</span>
                }
                return <span key={index}> </span>
              })}
            </div>
          </Card>

          {/* Word Bank */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              Tap the words to complete the sentence
              {question.hints && <span className="ml-1">(tap any word to see its meaning)</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {question.options?.map((word, index) => {
                const isUsed = selectedWords.includes(word)
                const hasHint = question.hints && question.hints[word]
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSelectWord(word)}
                    disabled={hasAnswered || isUsed}
                    title={hasHint ? question.hints[word] : undefined}
                    className={cn(
                      'h-12 px-6 text-base font-medium transition-all',
                      'hover:scale-105 active:scale-95',
                      isUsed && 'opacity-30 cursor-not-allowed',
                      hasHint && 'relative'
                    )}
                  >
                    {word}
                    {hasHint && !isUsed && (
                      <HelpCircle className="w-3 h-3 absolute -top-1 -right-1 text-blue-500" />
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* Pairing Questions */}
      {question.type === 'pairing' && question.pairs ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Match each term with its definition:</p>
          <div className="grid gap-3">
            {question.pairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 p-3 border-2 rounded-lg bg-card font-medium">
                  {pair.term}
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <select
                  value={pairMatches[pair.term] || ''}
                  onChange={(e) => setPairMatches(prev => ({ ...prev, [pair.term]: e.target.value }))}
                  disabled={hasAnswered}
                  className="flex-1 p-3 border-2 rounded-lg bg-card cursor-pointer hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <option value="">Select definition...</option>
                  {question.pairs?.map((p, i) => (
                    <option key={i} value={p.definition}>{p.definition}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Multiple Choice Options */}
      {question.type === 'multiple_choice' || question.type === 'scenario' ? (
        <div className="space-y-3">
          {question.options?.map((option, index) => {
            const isSelected = isMultiSelect ? selectedAnswers.includes(option) : selectedAnswer === option
            
            const correctAnswersList = Array.isArray(question.correctAnswer) 
              ? question.correctAnswer.map(idx => typeof idx === 'number' ? question.options![idx] : idx)
              : [question.correctAnswer]
            
            const showCorrect = hasAnswered && correctAnswersList.includes(option)
            const showWrong = hasAnswered && isSelected && !correctAnswersList.includes(option)

            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSelectAnswer(option)}
                disabled={hasAnswered}
                className={cn(
                  'w-full h-auto min-h-[60px] p-4 text-left justify-start text-base transition-all',
                  'hover:bg-accent hover:scale-[1.02] active:scale-[0.98]',
                  isSelected && !hasAnswered && 'border-blue-500 bg-blue-50 dark:bg-blue-950',
                  showCorrect && 'border-green-500 bg-green-50 dark:bg-green-950',
                  showWrong && 'border-red-500 bg-red-50 dark:bg-red-950'
                )}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={cn(
                    isMultiSelect ? 'w-8 h-8 rounded-md border-2' : 'w-8 h-8 rounded-full border-2',
                    'flex items-center justify-center flex-shrink-0 mt-0.5',
                    isSelected && !hasAnswered && 'border-blue-500 bg-blue-500',
                    showCorrect && 'border-green-500 bg-green-500',
                    showWrong && 'border-red-500 bg-red-500',
                    !isSelected && !showCorrect && !showWrong && 'border-gray-300 dark:border-gray-600'
                  )}>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                    {showWrong && <XCircle className="w-5 h-5 text-white" />}
                    {!showCorrect && !showWrong && isSelected && (
                      isMultiSelect ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )
                    )}
                  </div>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </div>
              </Button>
            )
          })}
        </div>
      ) : null}

      {/* Check Button */}
      {!hasAnswered && (
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleCheckAnswer}
            disabled={
              question.type === 'pairing'
                ? Object.keys(pairMatches).length !== question.pairs?.length
                : question.type === 'select_missing'
                ? selectedWords.length !== blankCount
                : isMultiSelect
                ? selectedAnswers.length === 0
                : !selectedAnswer
            }
            className="min-w-[200px] bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14 rounded-2xl shadow-lg disabled:opacity-50"
          >
            CHECK
          </Button>
        </div>
      )}

      {/* Feedback */}
      {hasAnswered && (
        <Card className={cn(
          'p-6 border-2 animate-in slide-in-from-bottom-2 duration-300',
          isCorrect 
            ? 'bg-green-50 dark:bg-green-950 border-green-500' 
            : 'bg-red-50 dark:bg-red-950 border-red-500'
        )}>
          <div className="flex items-start gap-4">
            {isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
            )}
            <div className="flex-1 space-y-2">
              <p className={cn(
                'font-bold text-lg',
                isCorrect ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
              )}>
                {isCorrect ? 'Excellent!' : 'Not quite'}
              </p>
              {!isCorrect && (
                <p className="text-sm">
                  <strong>Correct answer:</strong> {question.correctAnswer}
                </p>
              )}
              {isCorrect && question.explanation && (
                <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                  {question.explanation}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
