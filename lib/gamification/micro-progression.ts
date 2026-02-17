import type { LessonQuestion } from './types'

// Duolingo-style micro-progression question generator
// Starts with smallest possible learning units and builds up

export interface MicroVocabTerm {
  term: string // AWS service/concept name
  definition: string // What it does
  category: string
  relatedTerms?: string[] // Other terms that often appear together
  visualIcon?: string // Emoji or icon
  example?: string // Simple use case
}

// STEP 1: Tap matching pairs (simplest introduction)
export function generateMatchingPairs(terms: MicroVocabTerm[]): LessonQuestion {
  // Take 5 terms and create tap-to-match exercise
  const selectedTerms = terms.slice(0, 5)
  
  return {
    id: `match-${terms[0].category}-${Date.now()}`,
    type: 'match',
    question: 'Tap the matching pairs',
    // For match type, we store pairs in a special format
    context: JSON.stringify({
      pairs: selectedTerms.map(t => ({
        left: t.term,
        right: t.definition
      }))
    }),
    correctAnswer: selectedTerms.map(t => t.term),
    explanation: `These are fundamental ${terms[0].category} concepts in AWS.`,
    category: terms[0].category,
    difficulty: 'easy',
    xp: 5
  }
}

// STEP 2: Select correct image/icon (visual association)
export function generateVisualSelection(term: MicroVocabTerm, distractors: MicroVocabTerm[]): LessonQuestion {
  const allOptions = [term, ...distractors.slice(0, 3)]
  const shuffled = allOptions.sort(() => Math.random() - 0.5)
  
  return {
    id: `visual-${term.term}-${Date.now()}`,
    type: 'multiple_choice',
    question: `Select the correct service`,
    context: term.definition,
    options: shuffled.map(t => `${t.visualIcon || '📦'} ${t.term}`),
    correctAnswer: `${term.visualIcon || '📦'} ${term.term}`,
    explanation: `${term.term}: ${term.definition}`,
    category: term.category,
    difficulty: 'easy',
    xp: 5
  }
}

// STEP 3: Translate with word bank (constructive practice with hints)
export function generateWordBankTranslation(
  scenario: string,
  targetSentence: string,
  terms: MicroVocabTerm[],
  distractors: string[]
): LessonQuestion {
  // Parse target sentence to identify blanks
  const words = targetSentence.split(' ')
  const allWords = [...words, ...distractors].sort(() => Math.random() - 0.5)
  
  return {
    id: `wordbank-${Date.now()}`,
    type: 'select_missing',
    question: 'Complete the AWS solution',
    context: scenario, // The sentence with blanks: "Use ___ to store ___ files"
    options: allWords,
    correctAnswer: words,
    explanation: `This solution uses: ${terms.map(t => `${t.term} (${t.definition})`).join(', ')}`,
    category: terms[0].category,
    difficulty: 'easy',
    xp: 10,
    hints: terms.reduce((acc, t) => {
      acc[t.term] = t.definition
      return acc
    }, {} as Record<string, string>)
  }
}

// STEP 4: Reverse recognition (which service does X?)
export function generateReverseRecognition(term: MicroVocabTerm, distractors: MicroVocabTerm[]): LessonQuestion {
  const allOptions = [term, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5)
  
  return {
    id: `reverse-${term.term}-${Date.now()}`,
    type: 'multiple_choice',
    question: term.definition,
    context: 'Which AWS service does this?',
    options: allOptions.map(t => t.term),
    correctAnswer: term.term,
    explanation: `${term.term} is the AWS service that ${term.definition.toLowerCase()}`,
    category: term.category,
    difficulty: 'easy',
    xp: 5
  }
}

// STEP 5: Select correct usage (no scaffolding)
export function generateUsageSelection(term: MicroVocabTerm, correctUsage: string, incorrectUsages: string[]): LessonQuestion {
  const allOptions = [correctUsage, ...incorrectUsages].sort(() => Math.random() - 0.5)
  
  return {
    id: `usage-${term.term}-${Date.now()}`,
    type: 'multiple_choice',
    question: `When would you use ${term.term}?`,
    options: allOptions,
    correctAnswer: correctUsage,
    explanation: `${term.term}: ${term.definition}. ${term.example || ''}`,
    category: term.category,
    difficulty: 'medium',
    xp: 10
  }
}

// Micro-lesson generator: takes 3-5 new terms and creates progressive exercises
export function generateMicroLesson(terms: MicroVocabTerm[], allTerms: MicroVocabTerm[]): LessonQuestion[] {
  const questions: LessonQuestion[] = []
  
  // Get distractor terms from same category
  const distractors = allTerms.filter(t => 
    t.category === terms[0].category && !terms.includes(t)
  )
  
  // 1. Matching pairs (introduce all terms at once)
  questions.push(generateMatchingPairs(terms))
  
  // 2. Visual selection for each term
  terms.forEach(term => {
    questions.push(generateVisualSelection(term, distractors))
  })
  
  // 3. Reverse recognition for each term
  terms.forEach(term => {
    questions.push(generateReverseRecognition(term, distractors))
  })
  
  // 4. Word bank translation using learned terms
  const scenario = `Use ___ to ___ and ___ for ___`
  const targetSentence = terms.map(t => t.term).join(' ')
  questions.push(generateWordBankTranslation(
    scenario,
    targetSentence,
    terms,
    distractors.slice(0, 3).map(d => d.term)
  ))
  
  // 5. Usage selection for each term
  terms.forEach(term => {
    const incorrectUsages = distractors.slice(0, 2).map(d => d.definition)
    questions.push(generateUsageSelection(term, term.example || term.definition, incorrectUsages))
  })
  
  return questions
}
