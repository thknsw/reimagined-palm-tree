// Maps existing AWS questions to Duolingo-style lesson structure
import { SCENARIOS } from '@/lib/scenarios'
import { ADDITIONAL_SCENARIOS } from '@/lib/scenarios-additional'
import { AWS_VOCABULARY } from './vocabulary'
import { AWS_PROGRESSIVE_LESSONS } from './aws-lessons'
import { generateProgressiveLesson } from './progressive-questions'
import { AWS_MICRO_VOCABULARY, MICRO_LESSON_SETS } from './aws-micro-vocab'
import { generateMicroLesson } from './micro-progression'
import type { Unit, Lesson, LessonQuestion } from './types'

// Combine all question sources
const ALL_SCENARIOS = [...SCENARIOS, ...ADDITIONAL_SCENARIOS]

// Group questions by category and create progressive lesson structure
export function createLessonStructure(): Unit[] {
  const questionsByCategory = new Map<string, typeof ALL_SCENARIOS>()
  
  // Group questions by domain (category in old system)
  ALL_SCENARIOS.forEach(q => {
    const category = q.domain || 'General'
    if (!questionsByCategory.has(category)) {
      questionsByCategory.set(category, [])
    }
    questionsByCategory.get(category)!.push(q)
  })

  const units: Unit[] = []
  let unitOrder = 0

  // Define unit structure with icons and colors
  const unitConfig: Record<string, { name: string; icon: string; color: string; order: number }> = {
    'Cloud Concepts': { name: 'Cloud Concepts', icon: '☁️', color: 'from-blue-400 to-blue-600', order: 0 },
    'Security and Compliance': { name: 'Security & Compliance', icon: '🔒', color: 'from-red-400 to-red-600', order: 1 },
    'Cloud Technology and Services': { name: 'AWS Technology', icon: '⚙️', color: 'from-purple-400 to-purple-600', order: 2 },
    'Technology': { name: 'AWS Technology', icon: '⚙️', color: 'from-purple-400 to-purple-600', order: 2 },
    'Billing, Pricing and Support': { name: 'Billing & Pricing', icon: '💰', color: 'from-green-400 to-green-600', order: 3 },
    'Billing and Pricing': { name: 'Billing & Pricing', icon: '💰', color: 'from-green-400 to-green-600', order: 3 },
    'Monitoring and Optimization': { name: 'Monitoring & Optimization', icon: '📊', color: 'from-cyan-400 to-cyan-600', order: 4 },
    'Deployment and Operations': { name: 'Deployment & Operations', icon: '🚀', color: 'from-indigo-400 to-indigo-600', order: 5 },
    'Storage and Encryption': { name: 'Storage & Encryption', icon: '💾', color: 'from-pink-400 to-pink-600', order: 6 },
    'General': { name: 'AWS Fundamentals', icon: '🎯', color: 'from-orange-400 to-orange-600', order: 7 }
  }

  // Create units from categories
  for (const [category, questions] of questionsByCategory.entries()) {
    const config = unitConfig[category] || unitConfig['General']
    
    const lessonsInUnit: Lesson[] = []
    let lessonOrder = 0
    
    // DUOLINGO MICRO-PEDAGOGY: Start with micro-progression (3-5 terms at a time)
    const microLessonSets = MICRO_LESSON_SETS[category] || []
    const categoryVocab = AWS_MICRO_VOCABULARY[category] || []
    
    microLessonSets.forEach((lessonSet, setIdx) => {
      // Get the terms for this lesson set
      const lessonTerms = lessonSet.terms
        .map(termName => categoryVocab.find(v => v.term === termName))
        .filter(Boolean) as typeof categoryVocab
      
      if (lessonTerms.length >= 3) {
        // Generate micro-progression questions:
        // 1. Tap matching pairs (introduce all terms)
        // 2. Visual/icon selection for each term
        // 3. Reverse recognition (definition → term)
        // 4. Word bank translation (build sentences)
        // 5. Usage selection (test understanding)
        const microQuestions = generateMicroLesson(lessonTerms, categoryVocab)
        
        lessonsInUnit.push({
          id: `${category.toLowerCase().replace(/\s+/g, '-')}-micro-${setIdx + 1}`,
          unitId: category,
          order: lessonOrder++,
          title: setIdx === 0 ? 'Getting Started' : lessonSet.title,
          description: `Learn ${lessonTerms.map(t => t.term).join(', ')}`,
          type: 'lesson',
          icon: '📖',
          xpReward: 25,
          questions: microQuestions
        })
      }
    })
    
    // Now add the regular scenario-based lessons
    const questionsPerLesson = 6
    const numLessons = Math.ceil(questions.length / questionsPerLesson)

    for (let i = 0; i < numLessons; i++) {
      const startIdx = i * questionsPerLesson
      const endIdx = Math.min(startIdx + questionsPerLesson, questions.length)
      const lessonQuestions = questions.slice(startIdx, endIdx)

      // Convert scenarios to lesson format
      const mappedQuestions: LessonQuestion[] = lessonQuestions.map(q => {
        // Extract the actual question from the scenario text
        const scenarioLines = q.scenario.split('\n')
        const questionLine = scenarioLines[scenarioLines.length - 1] || q.scenario
        
        return {
          id: q.id,
          type: 'scenario',
          question: questionLine,
          context: scenarioLines.length > 1 ? scenarioLines.slice(0, -1).join('\n') : undefined,
          options: q.options,
          correctAnswer: typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : q.options[q.correctAnswer[0]],
          explanation: q.explanation,
          category: q.domain,
          difficulty: q.difficulty === 'beginner' ? 'easy' : q.difficulty === 'intermediate' ? 'medium' : 'hard',
          xp: q.difficulty === 'advanced' ? 15 : q.difficulty === 'intermediate' ? 10 : 5
        }
      })

      const lessonId = `${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`
      
      // Determine lesson type (every 5th is a review, every 10th is a chest)
      let lessonType: Lesson['type'] = 'lesson'
      if ((i + 1) % 10 === 0) {
        lessonType = 'chest'
      } else if ((i + 1) % 5 === 0) {
        lessonType = 'unit_review'
      }

      const lesson: Lesson = {
        id: lessonId,
        unitId: category,
        order: lessonOrder++,
        title: lessonType === 'chest' ? '🎁 Treasure Chest' : 
               lessonType === 'unit_review' ? '📝 Unit Review' :
               `Lesson ${i + 1}`,
        description: lessonType === 'chest' ? 'Complete to earn bonus rewards!' :
                     lessonType === 'unit_review' ? 'Review everything you\'ve learned' :
                     `Master ${category} concepts`,
        type: lessonType,
        icon: lessonType === 'chest' ? '🎁' : 
              lessonType === 'unit_review' ? '📝' : '📚',
        xpReward: lessonType === 'chest' ? 50 : 
                  lessonType === 'unit_review' ? 30 : 20,
        questions: mappedQuestions,
        requiredLessons: lessonOrder > 1 ? [lessonsInUnit[lessonsInUnit.length - 1]?.id] : undefined
      }

      lessonsInUnit.push(lesson)
    }

    // Add practice lessons between regular lessons
    const lessonsWithPractice: Lesson[] = []
    lessonsInUnit.forEach((lesson, idx) => {
      lessonsWithPractice.push(lesson)
      
      // Add a practice lesson every 3 regular lessons
      if ((idx + 1) % 3 === 0 && idx < lessonsInUnit.length - 1) {
        const practiceId = `${category.toLowerCase().replace(/\s+/g, '-')}-practice-${Math.floor(idx / 3) + 1}`
        
        // Practice lessons reuse questions from previous lessons
        const previousLessons = lessonsInUnit.slice(Math.max(0, idx - 2), idx + 1)
        const practiceQuestions = previousLessons
          .flatMap(l => l.questions)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)

        lessonsWithPractice.push({
          id: practiceId,
          unitId: category,
          order: idx + 0.5,
          title: '⚡ Quick Practice',
          description: 'Reinforce what you\'ve learned',
          type: 'practice',
          icon: '⚡',
          xpReward: 15,
          questions: practiceQuestions,
          requiredLessons: [lessonsInUnit[idx].id]
        })
      }
    })

    const unit: Unit = {
      id: category,
      order: config.order,
      name: config.name,
      description: `Master ${config.name} for AWS CLF-C02`,
      icon: config.icon,
      color: config.color,
      lessons: lessonsWithPractice
    }

    units.push(unit)
  }

  return units.sort((a, b) => a.order - b.order)
}

// Get a specific lesson by ID
export function getLessonById(lessonId: string): Lesson | null {
  const units = createLessonStructure()
  for (const unit of units) {
    const lesson = unit.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return null
}

// Get all lessons in order
export function getAllLessons(): Lesson[] {
  const units = createLessonStructure()
  return units.flatMap(u => u.lessons).sort((a, b) => {
    // Sort by unit order, then lesson order
    const unitA = units.find(u => u.id === a.unitId)!
    const unitB = units.find(u => u.id === b.unitId)!
    if (unitA.order !== unitB.order) return unitA.order - unitB.order
    return a.order - b.order
  })
}

// Calculate XP needed for level
export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

// Get level from XP
export function getLevelFromXp(xp: number): number {
  let level = 1
  while (xp >= getXpForLevel(level + 1)) {
    level++
  }
  return level
}
