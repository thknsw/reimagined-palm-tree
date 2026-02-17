// Duolingo-style progressive question generation
// Follows the pedagogy: Vocabulary → Recognition → Context → Construction

import type { LessonQuestion } from './types'

export interface VocabularyTerm {
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
  exampleContext?: string
}

export interface LessonVocabulary {
  mainTerms: VocabularyTerm[]  // 3-5 core terms to teach
  supportTerms: VocabularyTerm[] // 2-3 related terms for context
}

/**
 * STAGE 1: "What is X?" - Definition Recognition
 * Shows AWS term, user selects correct definition
 */
export function createDefinitionQuestion(vocab: VocabularyTerm, distractors: VocabularyTerm[]): LessonQuestion {
  const allOptions = [vocab.definition, ...distractors.map(d => d.definition)].sort(() => Math.random() - 0.5)
  
  return {
    id: `def-${vocab.term.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'multiple_choice',
    question: `What is ${vocab.term}?`,
    options: allOptions,
    correctAnswer: vocab.definition,
    explanation: `${vocab.term} is ${vocab.definition}`,
    category: vocab.category,
    difficulty: 'easy',
    xp: 5
  }
}

/**
 * STAGE 2: "Which service does X?" - Reverse Recognition
 * Shows definition/use case, user identifies the service
 */
export function createReverseQuestion(vocab: VocabularyTerm, distractors: VocabularyTerm[]): LessonQuestion {
  const allOptions = [vocab.term, ...distractors.map(d => d.term)].sort(() => Math.random() - 0.5)
  
  return {
    id: `rev-${vocab.term.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'multiple_choice',
    question: `Which AWS service ${vocab.definition.toLowerCase().replace(/^(provides?|offers?|is)\s+/i, 'provides ')}?`,
    options: allOptions,
    correctAnswer: vocab.term,
    explanation: `${vocab.term} ${vocab.definition.toLowerCase()}`,
    category: vocab.category,
    difficulty: 'easy',
    xp: 5
  }
}

/**
 * STAGE 3: "Read and Respond" - Contextual Comprehension
 * Shows a mini-scenario using the vocabulary, asks comprehension question
 */
export function createContextQuestion(
  mainVocab: VocabularyTerm[],
  scenarioText: string,
  question: string,
  correctAnswer: string,
  distractors: string[]
): LessonQuestion {
  const allOptions = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
  
  return {
    id: `ctx-${mainVocab[0].term.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'scenario',
    question,
    context: scenarioText,
    options: allOptions,
    correctAnswer,
    explanation: `In this scenario, ${correctAnswer} is the correct choice because ${mainVocab.find(v => correctAnswer.includes(v.term))?.definition || 'it matches the use case'}.`,
    category: mainVocab[0].category,
    difficulty: 'medium',
    xp: 10
  }
}

/**
 * STAGE 4: "Complete the sentence" - Fill in the blank using learned vocabulary
 * User must construct correct AWS statement using word bank
 */
export function createFillInBlankQuestion(
  vocab: VocabularyTerm,
  sentenceTemplate: string,
  blanks: string[],
  wordBank: string[]
): LessonQuestion {
  return {
    id: `fill-${vocab.term.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'select_missing',
    question: `Complete the sentence about ${vocab.term}`,
    context: sentenceTemplate,
    options: wordBank.sort(() => Math.random() - 0.5),
    correctAnswer: blanks,
    explanation: `${sentenceTemplate.replace(/_+/g, blanks.join(', '))}`,
    category: vocab.category,
    difficulty: 'medium',
    xp: 10
  }
}

/**
 * Generate a complete progressive lesson from vocabulary
 * Returns questions in pedagogical order: Definition → Reverse → Context → Fill-in
 */
export function generateProgressiveLesson(vocabulary: LessonVocabulary): LessonQuestion[] {
  const questions: LessonQuestion[] = []
  const allTerms = [...vocabulary.mainTerms, ...vocabulary.supportTerms]
  
  // Stage 1: Introduce each main term with "What is X?"
  vocabulary.mainTerms.forEach(term => {
    const distractors = allTerms.filter(t => t.term !== term.term).slice(0, 3)
    questions.push(createDefinitionQuestion(term, distractors))
  })
  
  // Stage 2: Test reverse recognition "Which service does X?"
  vocabulary.mainTerms.forEach(term => {
    const distractors = allTerms.filter(t => t.term !== term.term && t.category === term.category).slice(0, 3)
    questions.push(createReverseQuestion(term, distractors))
  })
  
  // Stage 3: Contextual scenario using all terms together
  if (vocabulary.mainTerms.length >= 2) {
    const scenarioText = generateMiniScenario(vocabulary.mainTerms, vocabulary.supportTerms)
    const comprehensionQ = generateComprehensionQuestion(vocabulary.mainTerms)
    questions.push(createContextQuestion(
      vocabulary.mainTerms,
      scenarioText,
      comprehensionQ.question,
      comprehensionQ.answer,
      comprehensionQ.distractors
    ))
  }
  
  // Stage 4: Fill-in-the-blank construction
  vocabulary.mainTerms.slice(0, 2).forEach(term => {
    const fillInQ = generateFillInBlank(term, vocabulary.supportTerms)
    questions.push(createFillInBlankQuestion(
      term,
      fillInQ.template,
      fillInQ.blanks,
      fillInQ.wordBank
    ))
  })
  
  return questions
}

/**
 * Generate mini AWS scenario using the vocabulary terms
 */
function generateMiniScenario(mainTerms: VocabularyTerm[], supportTerms: VocabularyTerm[]): string {
  const term1 = mainTerms[0]
  const term2 = mainTerms[1] || supportTerms[0]
  
  const scenarios = [
    `A startup is building a web application. They need to store user profile images and serve a dynamic website. The team is considering ${term1.term} for storage and ${term2.term} for compute.`,
    `An enterprise wants to ${term1.definition.toLowerCase()}. They're evaluating ${term1.term} alongside ${term2.term} for their cloud infrastructure.`,
    `A developer needs to ${term1.definition.toLowerCase().replace(/^(provides?|offers?|is)\s+/i, '')}. They're choosing between ${term1.term} and ${term2.term}.`
  ]
  
  return scenarios[Math.floor(Math.random() * scenarios.length)]
}

/**
 * Generate comprehension question from scenario
 */
function generateComprehensionQuestion(terms: VocabularyTerm[]): {
  question: string
  answer: string
  distractors: string[]
} {
  const term = terms[0]
  
  return {
    question: `Which service should they use for ${term.definition.toLowerCase().replace(/^(provides?|offers?|is)\s+/i, '')}?`,
    answer: term.term,
    distractors: terms.slice(1, 4).map(t => t.term).concat(['None of the above', 'All of the above']).slice(0, 3)
  }
}

/**
 * Generate fill-in-the-blank question
 */
function generateFillInBlank(term: VocabularyTerm, relatedTerms: VocabularyTerm[]): {
  template: string
  blanks: string[]
  wordBank: string[]
} {
  const templates = [
    {
      text: `_____ is an AWS service that ${term.definition.toLowerCase()}.`,
      blanks: [term.term],
      extras: relatedTerms.slice(0, 3).map(t => t.term)
    },
    {
      text: `You would use _____ when you need to ${term.definition.toLowerCase().replace(/^(provides?|offers?|is)\s+/i, '')}.`,
      blanks: [term.term],
      extras: relatedTerms.slice(0, 3).map(t => t.term)
    }
  ]
  
  const selected = templates[Math.floor(Math.random() * templates.length)]
  
  return {
    template: selected.text,
    blanks: selected.blanks,
    wordBank: [...selected.blanks, ...selected.extras]
  }
}
