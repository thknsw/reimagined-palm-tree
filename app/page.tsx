"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Header } from "@/components/study-app/header"
import { Sidebar } from "@/components/study-app/sidebar"
import { QuestionCard } from "@/components/study-app/question-card"
import { Dashboard } from "@/components/study-app/dashboard"
import { TimedQuizSetup } from "@/components/study-app/timed-quiz-setup"
import { QuizResults } from "@/components/study-app/quiz-results"
import { StudyPlanSetup } from "@/components/study-app/study-plan-setup"
import { PreparednessCard } from "@/components/study-app/preparedness-card"
import { ExamTips } from "@/components/study-app/exam-tips"
import { DailyQuestionCard } from "@/components/study-app/daily-question"
import { QuickQuizSetup } from "@/components/study-app/quick-quiz-setup"
import { StudyTimeline } from "@/components/study-app/study-timeline"
import { AcronymMatch } from "@/components/study-app/acronym-match"
import { PreTestSetup } from "@/components/study-app/pretest-setup"
import { PreTestResults } from "@/components/study-app/pretest-results"
import { ServiceCompare } from "@/components/study-app/service-compare"
import { Achievements } from "@/components/study-app/achievements"
import { BadgeNotification } from "@/components/study-app/badge-notification"
import { calculatePreparedness, generateDailyGoal } from "@/lib/preparedness"
import {
  generatePreTestQuestions,
  generatePreTestResult,
  initializeAdaptiveData,
  updateAdaptiveData,
  getAdaptiveScenarios,
} from "@/lib/adaptive"
import { checkNewBadges } from "@/lib/achievements"
import { SCENARIOS, shuffleArray, type Scenario } from "@/lib/scenarios"
import type {
  StudyMode,
  SessionStats,
  DomainProgress,
  SpacedRepetitionData,
  QuizResult,
  StudyPlan,
  QuestionOfTheDay,
  StudySession,
  AdaptiveStudyData,
  PreTestResult,
  ConfidenceRating,
  ConfidenceData,
  UnlockedBadge,
  AchievementBadge,
} from "@/lib/study-types"

// ... existing code (getTodayString, getDailyQuestionId) ...

function getTodayString() {
  return new Date().toISOString().split("T")[0]
}

function getDailyQuestionId(date: string): string {
  let hash = 0
  for (let i = 0; i < date.length; i++) {
    const char = date.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  const index = Math.abs(hash) % SCENARIOS.length
  return SCENARIOS[index].id
}

export default function AWSStudyApp() {
  // ... existing state ...
  const [selectedDomain, setSelectedDomain] = useState("All Domains")
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null)
  const [lockedScenarioId, setLockedScenarioId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [studyMode, setStudyMode] = useState<StudyMode>("practice")
  const [attemptedScenarios, setAttemptedScenarios] = useState<Set<string>>(new Set())
  const [bookmarkedScenarios, setBookmarkedScenarios] = useState<string[]>([])
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([])

  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [showStudyPlanSetup, setShowStudyPlanSetup] = useState(false)
  const [showExamTips, setShowExamTips] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now())

  const [timedQuizActive, setTimedQuizActive] = useState(false)
  const [timedQuizSetup, setTimedQuizSetup] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [timedQuizQuestions, setTimedQuizQuestions] = useState<Scenario[]>([])
  const [timedQuizIndex, setTimedQuizIndex] = useState(0)
  const [timedQuizCorrect, setTimedQuizCorrect] = useState(0)
  const [timedQuizStartTime, setTimedQuizStartTime] = useState(0)
  const [showQuizResults, setShowQuizResults] = useState(false)

  const [quickQuizActive, setQuickQuizActive] = useState(false)
  const [quickQuizSetup, setQuickQuizSetup] = useState(false)
  const [quickQuizQuestions, setQuickQuizQuestions] = useState<Scenario[]>([])
  const [quickQuizIndex, setQuickQuizIndex] = useState(0)
  const [quickQuizCorrect, setQuickQuizCorrect] = useState(0)
  const [quickQuizStartTime, setQuickQuizStartTime] = useState(0)

  const [dailyQuestion, setDailyQuestion] = useState<QuestionOfTheDay | null>(null)
  const [showDailyQuestion, setShowDailyQuestion] = useState(false)

  const [spacedRepData, setSpacedRepData] = useState<SpacedRepetitionData>({})
  const [spacedSessionScenarios, setSpacedSessionScenarios] = useState<Scenario[]>([])

  const [preTestSetup, setPreTestSetup] = useState(false)
  const [preTestActive, setPreTestActive] = useState(false)
  const [preTestQuestions, setPreTestQuestions] = useState<Scenario[]>([])
  const [preTestIndex, setPreTestIndex] = useState(0)
  const [preTestAnswers, setPreTestAnswers] = useState<{ [id: string]: number | number[] }>({})
  const [preTestStartTime, setPreTestStartTime] = useState(0)
  const [showPreTestResults, setShowPreTestResults] = useState(false)
  const [latestPreTestResult, setLatestPreTestResult] = useState<PreTestResult | null>(null)
  const [adaptiveData, setAdaptiveData] = useState<AdaptiveStudyData | null>(null)

  const [confidenceData, setConfidenceData] = useState<ConfidenceData>({})
  const [showConfidencePrompt, setShowConfidencePrompt] = useState(false)
  const [pendingConfidenceScenario, setPendingConfidenceScenario] = useState<{
    id: string
    wasCorrect: boolean
  } | null>(null)
  const [unlockedBadges, setUnlockedBadges] = useState<UnlockedBadge[]>([])
  const [newBadgeQueue, setNewBadgeQueue] = useState<AchievementBadge[]>([])
  const [showAchievements, setShowAchievements] = useState(false)
  const [showServiceCompare, setShowServiceCompare] = useState(false)

  const [sessionStats, setSessionStats] = useState<SessionStats>({
    attempted: 0,
    correct: 0,
    incorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
    startTime: Date.now(),
  })

  const [domainProgress, setDomainProgress] = useState<DomainProgress>({})
  const [isHydrated, setIsHydrated] = useState(false)
  const [shuffledScenarios, setShuffledScenarios] = useState<Scenario[]>([])

  // Shuffle scenarios on mount
  useEffect(() => {
    setShuffledScenarios(shuffleArray(SCENARIOS))
  }, [])

  // ... existing memos ...
  const preparedness = useMemo(
    () => calculatePreparedness(domainProgress, sessionStats, spacedRepData, quizHistory, studyPlan),
    [domainProgress, sessionStats, spacedRepData, quizHistory, studyPlan],
  )

  const dailyGoal = useMemo(
    () => (studyPlan ? generateDailyGoal(studyPlan, preparedness, sessionStats) : null),
    [studyPlan, preparedness, sessionStats],
  )

  const adaptiveScenarios = useMemo(() => getAdaptiveScenarios(adaptiveData, SCENARIOS), [adaptiveData])

  // ... existing callbacks (getSpacedDueScenarios, getFilteredScenarios, currentScenario) ...
  const getSpacedDueScenarios = useCallback(() => {
    const now = Date.now()
    const dueScenarios = SCENARIOS.filter((s) => {
      const data = spacedRepData[s.id]
      if (!data) return true
      return data.nextReview <= now
    })
    return dueScenarios.length > 0 ? dueScenarios : SCENARIOS.slice(0, 5)
  }, [spacedRepData])

  const getFilteredScenarios = useCallback(() => {
    if (timedQuizActive) return timedQuizQuestions
    if (quickQuizActive) return quickQuizQuestions
    if (preTestActive) return preTestQuestions

    if (studyMode === "review") {
      return bookmarkedScenarios.length > 0 ? SCENARIOS.filter((s) => bookmarkedScenarios.includes(s.id)) : []
    }

    if (studyMode === "spaced") {
      return spacedSessionScenarios.length > 0 ? spacedSessionScenarios : getSpacedDueScenarios()
    }

    const baseScenarios = adaptiveData?.preTestTaken ? adaptiveScenarios : SCENARIOS

    if (studyMode === "practice" && dailyGoal?.focusDomain && selectedDomain === "All Domains") {
      const focusScenarios = baseScenarios.filter((s) => s.domain === dailyGoal.focusDomain)
      const otherScenarios = baseScenarios.filter((s) => s.domain !== dailyGoal.focusDomain)
      const interleaved: Scenario[] = []
      let focusIdx = 0,
        otherIdx = 0
      while (focusIdx < focusScenarios.length || otherIdx < otherScenarios.length) {
        if (focusIdx < focusScenarios.length) interleaved.push(focusScenarios[focusIdx++])
        if (focusIdx < focusScenarios.length) interleaved.push(focusScenarios[focusIdx++])
        if (otherIdx < otherScenarios.length) interleaved.push(otherScenarios[otherIdx++])
      }
      return interleaved
    }

    return selectedDomain === "All Domains" ? baseScenarios : baseScenarios.filter((s) => s.domain === selectedDomain)
  }, [
    selectedDomain,
    studyMode,
    bookmarkedScenarios,
    spacedSessionScenarios,
    getSpacedDueScenarios,
    timedQuizActive,
    timedQuizQuestions,
    quickQuizActive,
    quickQuizQuestions,
    preTestActive,
    preTestQuestions,
    dailyGoal,
    adaptiveData,
    adaptiveScenarios,
  ])

  const currentScenario = useMemo(() => {
    if (timedQuizActive) return timedQuizQuestions[timedQuizIndex]
    if (quickQuizActive) return quickQuizQuestions[quickQuizIndex]
    if (preTestActive) return preTestQuestions[preTestIndex]
    if (showDailyQuestion && dailyQuestion) {
      return SCENARIOS.find((s) => s.id === dailyQuestion.scenarioId)
    }
    if (lockedScenarioId) {
      const locked = SCENARIOS.find((s) => s.id === lockedScenarioId)
      if (locked) return locked
    }
    return getFilteredScenarios()[currentScenarioIndex]
  }, [
    timedQuizActive,
    timedQuizQuestions,
    timedQuizIndex,
    quickQuizActive,
    quickQuizQuestions,
    quickQuizIndex,
    preTestActive,
    preTestQuestions,
    preTestIndex,
    showDailyQuestion,
    dailyQuestion,
    lockedScenarioId,
    getFilteredScenarios,
    currentScenarioIndex,
  ])

  const checkAndUnlockBadges = useCallback(() => {
    if (!isHydrated) return

    const badgeCheckData = {
      totalAttempted: sessionStats.attempted,
      totalCorrect: sessionStats.correct,
      currentStreak: sessionStats.currentStreak,
      bestStreak: sessionStats.bestStreak,
      domainProgress,
      bookmarkedCount: bookmarkedScenarios.length,
      quizHistory,
      preTestTaken: adaptiveData?.preTestTaken || false,
      dailyQuestionStreak: 0, // Could track this separately
      confidenceData,
    }

    const alreadyUnlockedIds = unlockedBadges.map((b) => b.badgeId)
    const newBadges = checkNewBadges(badgeCheckData, alreadyUnlockedIds)

    if (newBadges.length > 0) {
      const now = Date.now()
      const newUnlocked = newBadges.map((badge) => ({
        badgeId: badge.id,
        unlockedAt: now,
      }))
      setUnlockedBadges((prev) => [...prev, ...newUnlocked])
      setNewBadgeQueue((prev) => [...prev, ...newBadges])
    }
  }, [
    isHydrated,
    sessionStats,
    domainProgress,
    bookmarkedScenarios,
    quizHistory,
    adaptiveData,
    confidenceData,
    unlockedBadges,
  ])

  // Load saved data
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("awsStudyProgress")
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress)
        if (parsed.domainProgress) setDomainProgress(parsed.domainProgress)
        if (parsed.bookmarked) setBookmarkedScenarios(parsed.bookmarked)
        if (parsed.spacedRepData) setSpacedRepData(parsed.spacedRepData)
        if (parsed.quizHistory) setQuizHistory(parsed.quizHistory)
        if (parsed.studyPlan) setStudyPlan(parsed.studyPlan)
        if (parsed.attemptedIds) setAttemptedScenarios(new Set(parsed.attemptedIds))
        if (parsed.dailyQuestion) setDailyQuestion(parsed.dailyQuestion)
        if (parsed.studySessions) setStudySessions(parsed.studySessions)
        if (parsed.adaptiveData) setAdaptiveData(parsed.adaptiveData)
        if (parsed.latestPreTestResult) setLatestPreTestResult(parsed.latestPreTestResult)
        if (parsed.confidenceData) setConfidenceData(parsed.confidenceData)
        if (parsed.unlockedBadges) setUnlockedBadges(parsed.unlockedBadges)
        if (parsed.sessionStats) {
          setSessionStats((prev) => ({
            ...prev,
            attempted: parsed.sessionStats.attempted || 0,
            correct: parsed.sessionStats.correct || 0,
            incorrect: parsed.sessionStats.incorrect || 0,
            bestStreak: parsed.sessionStats.bestStreak || 0,
            currentStreak: parsed.sessionStats.currentStreak || 0,
          }))
        }
      }
    } catch (e) {
      console.error("Failed to load progress:", e)
    }
    setSessionStartTime(Date.now())
    setIsHydrated(true)
  }, [])

  // Initialize daily question
  useEffect(() => {
    if (!isHydrated) return
    const today = getTodayString()
    if (!dailyQuestion || dailyQuestion.date !== today) {
      setDailyQuestion({
        scenarioId: getDailyQuestionId(today),
        date: today,
        completed: false,
        wasCorrect: null,
      })
    }
  }, [isHydrated, dailyQuestion])

  // Save progress
  useEffect(() => {
    if (!isHydrated) return

    const dataToSave = {
      domainProgress,
      bookmarked: bookmarkedScenarios,
      spacedRepData,
      quizHistory,
      studyPlan,
      attemptedIds: Array.from(attemptedScenarios),
      dailyQuestion,
      studySessions,
      adaptiveData,
      latestPreTestResult,
      confidenceData,
      unlockedBadges,
      sessionStats: {
        attempted: sessionStats.attempted,
        correct: sessionStats.correct,
        incorrect: sessionStats.incorrect,
        bestStreak: sessionStats.bestStreak,
        currentStreak: sessionStats.currentStreak,
      },
      lastSaved: Date.now(),
    }

    localStorage.setItem("awsStudyProgress", JSON.stringify(dataToSave))
  }, [
    isHydrated,
    domainProgress,
    bookmarkedScenarios,
    spacedRepData,
    quizHistory,
    studyPlan,
    sessionStats,
    attemptedScenarios,
    dailyQuestion,
    studySessions,
    adaptiveData,
    latestPreTestResult,
    confidenceData,
    unlockedBadges,
  ])

  useEffect(() => {
    checkAndUnlockBadges()
  }, [sessionStats.attempted, sessionStats.bestStreak, checkAndUnlockBadges])

  // ... existing timer and notification effects ...
  useEffect(() => {
    if ((!timedQuizActive && !preTestActive) || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (preTestActive) {
            handleEndPreTest()
          } else {
            handleEndTimedQuiz()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timedQuizActive, preTestActive, timeRemaining])

  useEffect(() => {
    if (!isHydrated || !studyPlan?.notificationsEnabled) return

    const scheduleNotification = () => {
      const [hours, minutes] = studyPlan.notificationTime.split(":").map(Number)
      const now = new Date()
      const notifyTime = new Date()
      notifyTime.setHours(hours, minutes, 0, 0)

      if (notifyTime <= now) {
        notifyTime.setDate(notifyTime.getDate() + 1)
      }

      const dayOfWeek = notifyTime.getDay()
      if (studyPlan.studyDaysPerWeek === 5 && (dayOfWeek === 0 || dayOfWeek === 6)) {
        return
      }

      const msUntilNotify = notifyTime.getTime() - now.getTime()

      const timerId = setTimeout(() => {
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          new Notification("AWS Study Reminder", {
            body: `Time to study! You have ${studyPlan.dailyStudyMinutes} minutes planned for today.`,
            icon: "/favicon.ico",
          })
        }
        scheduleNotification()
      }, msUntilNotify)

      return () => clearTimeout(timerId)
    }

    const cleanup = scheduleNotification()
    return cleanup
  }, [isHydrated, studyPlan])

  useEffect(() => {
    if (!isHydrated) return
    const today = getTodayString()
    const interval = setInterval(() => {
      const minutesSinceStart = Math.floor((Date.now() - sessionStartTime) / (1000 * 60))
      if (minutesSinceStart > 0 && sessionStats.attempted > 0) {
        setStudySessions((prev) => {
          const todaySession = prev.find((s) => s.date === today)
          if (todaySession) {
            return prev.map((s) =>
              s.date === today
                ? { ...s, minutesStudied: minutesSinceStart, questionsCompleted: sessionStats.attempted }
                : s,
            )
          } else {
            return [...prev, { date: today, minutesStudied: 1, questionsCompleted: 1 }]
          }
        })
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [isHydrated, sessionStartTime, sessionStats.attempted])

  const handleAnswerSelect = (answerIndex: number | number[]) => {
    if (!showFeedback && currentScenario) {
      setSelectedAnswer(answerIndex)
      setLockedScenarioId(currentScenario.id)

      if (preTestActive) {
        setPreTestAnswers((prev) => ({
          ...prev,
          [currentScenario.id]: answerIndex,
        }))
      }
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentScenario) return

    if (preTestActive) {
      if (preTestIndex < preTestQuestions.length - 1) {
        setPreTestIndex((prev) => prev + 1)
        setSelectedAnswer(preTestAnswers[preTestQuestions[preTestIndex + 1]?.id] ?? null)
        setLockedScenarioId(null)
      } else {
        handleEndPreTest()
      }
      return
    }

    const today = getTodayString()
    const existingSession = studySessions.find((s) => s.date === today)
    if (!existingSession) {
      setStudySessions((prev) => [...prev, { date: today, minutesStudied: 1, questionsCompleted: 1 }])
    } else {
      setStudySessions((prev) =>
        prev.map((s) => (s.date === today ? { ...s, questionsCompleted: s.questionsCompleted + 1 } : s)),
      )
    }

    const isMultiSelect = currentScenario.isMultiSelect === true
    const correctAnswers = Array.isArray(currentScenario.correctAnswer)
      ? currentScenario.correctAnswer
      : [currentScenario.correctAnswer]

    let isCorrect: boolean
    if (isMultiSelect) {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : []
      isCorrect = selected.length === correctAnswers.length && selected.every((s) => correctAnswers.includes(s))
    } else {
      isCorrect = selectedAnswer === currentScenario.correctAnswer
    }

    const newAttempted = new Set(attemptedScenarios)
    newAttempted.add(currentScenario.id)
    setAttemptedScenarios(newAttempted)

    if (timedQuizActive) {
      if (isCorrect) setTimedQuizCorrect((prev) => prev + 1)
    }

    if (quickQuizActive) {
      if (isCorrect) setQuickQuizCorrect((prev) => prev + 1)
    }

    if (showDailyQuestion && dailyQuestion) {
      setDailyQuestion({
        ...dailyQuestion,
        completed: true,
        wasCorrect: isCorrect,
      })
    }

    setSessionStats((prev) => ({
      ...prev,
      attempted: prev.attempted + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
      bestStreak: isCorrect ? Math.max(prev.bestStreak, prev.currentStreak + 1) : prev.bestStreak,
    }))

    setDomainProgress((prev) => {
      const domain = currentScenario.domain
      const current = prev[domain] || {
        attempted: 0,
        correct: 0,
        total: SCENARIOS.filter((s) => s.domain === domain).length,
      }
      return {
        ...prev,
        [domain]: {
          ...current,
          attempted: current.attempted + 1,
          correct: isCorrect ? current.correct + 1 : current.correct,
        },
      }
    })

    if (studyMode === "spaced" || studyMode === "practice" || showDailyQuestion || quickQuizActive) {
      updateSpacedRepetition(currentScenario.id, isCorrect)
    }

    if (adaptiveData && studyMode === "practice") {
      setAdaptiveData(updateAdaptiveData(adaptiveData, currentScenario.domain, isCorrect))
    }

    setShowConfidencePrompt(true)
    setPendingConfidenceScenario({ id: currentScenario.id, wasCorrect: isCorrect })
    setShowFeedback(true)
  }

  const handleConfidenceSelect = (rating: ConfidenceRating) => {
    if (pendingConfidenceScenario) {
      setConfidenceData((prev) => ({
        ...prev,
        [pendingConfidenceScenario.id]: {
          rating,
          wasCorrect: pendingConfidenceScenario.wasCorrect,
          timestamp: Date.now(),
        },
      }))
    }
    setShowConfidencePrompt(false)
    setPendingConfidenceScenario(null)
  }

  const handleDismissBadge = () => {
    setNewBadgeQueue((prev) => prev.slice(1))
  }

  const updateSpacedRepetition = (scenarioId: string, isCorrect: boolean) => {
    setSpacedRepData((prev) => {
      const data = prev[scenarioId] || {
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReview: Date.now(),
        lastReview: Date.now(),
      }

      let { easeFactor, interval, repetitions } = data
      const now = Date.now()
      const dayInMs = 24 * 60 * 60 * 1000

      if (isCorrect) {
        repetitions += 1
        if (repetitions === 1) {
          interval = 1
        } else if (repetitions === 2) {
          interval = 6
        } else {
          interval = Math.round(interval * easeFactor)
        }
        easeFactor = Math.max(1.3, easeFactor + 0.1)
      } else {
        repetitions = 0
        interval = 1
        easeFactor = Math.max(1.3, easeFactor - 0.2)
      }

      return {
        ...prev,
        [scenarioId]: {
          easeFactor,
          interval,
          repetitions,
          nextReview: now + interval * dayInMs,
          lastReview: now,
        },
      }
    })
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setLockedScenarioId(null)
    setShowFeedback(false)
    setShowConfidencePrompt(false)
    setPendingConfidenceScenario(null)

    if (showDailyQuestion) {
      setShowDailyQuestion(false)
      return
    }

    if (timedQuizActive) {
      if (timedQuizIndex < timedQuizQuestions.length - 1) {
        setTimedQuizIndex((prev) => prev + 1)
      } else {
        handleEndTimedQuiz()
      }
      return
    }

    if (quickQuizActive) {
      if (quickQuizIndex < quickQuizQuestions.length - 1) {
        setQuickQuizIndex((prev) => prev + 1)
      } else {
        handleEndQuickQuiz()
      }
      return
    }

    if (currentScenarioIndex < getFilteredScenarios().length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1)
    } else {
      if (studyMode === "spaced") {
        setSpacedSessionScenarios(getSpacedDueScenarios())
      }
      setCurrentScenarioIndex(0)
    }
  }

  // ... existing quiz handlers (handleEndTimedQuiz, handleEndQuickQuiz, handleEndPreTest, etc.) ...
  const handleEndTimedQuiz = () => {
    const timeSpent = Math.floor((Date.now() - timedQuizStartTime) / 1000)
    const result: QuizResult = {
      id: Date.now().toString(),
      date: Date.now(),
      mode: "timed",
      totalQuestions: timedQuizQuestions.length,
      correct: timedQuizCorrect,
      timeSpent,
      domain: selectedDomain,
    }
    setQuizHistory((prev) => [...prev, result])
    setTimedQuizActive(false)
    setShowQuizResults(true)
  }

  const handleEndQuickQuiz = () => {
    const timeSpent = Math.floor((Date.now() - quickQuizStartTime) / 1000)
    const result: QuizResult = {
      id: Date.now().toString(),
      date: Date.now(),
      mode: "quick",
      totalQuestions: quickQuizQuestions.length,
      correct: quickQuizCorrect,
      timeSpent,
      domain: selectedDomain,
    }
    setQuizHistory((prev) => [...prev, result])
    setQuickQuizActive(false)
    setShowQuizResults(true)
  }

  const handleEndPreTest = () => {
    const timeSpent = Math.floor((Date.now() - preTestStartTime) / 1000)
    const result = generatePreTestResult(preTestQuestions, preTestAnswers, timeSpent)
    setLatestPreTestResult(result)
    setAdaptiveData(initializeAdaptiveData(result))
    setPreTestActive(false)
    setShowPreTestResults(true)
  }

  const handleStartTimedQuiz = (questionCount: number, timeLimit: number) => {
    const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5)
    const questions =
      selectedDomain === "All Domains"
        ? shuffled.slice(0, questionCount)
        : shuffled.filter((s) => s.domain === selectedDomain).slice(0, questionCount)

    setTimedQuizQuestions(questions)
    setTimedQuizIndex(0)
    setTimedQuizCorrect(0)
    setTimeRemaining(timeLimit)
    setTimedQuizStartTime(Date.now())
    setTimedQuizActive(true)
    setTimedQuizSetup(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleStartQuickQuiz = (questionCount: number) => {
    const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5)
    const questions =
      selectedDomain === "All Domains"
        ? shuffled.slice(0, questionCount)
        : shuffled.filter((s) => s.domain === selectedDomain).slice(0, questionCount)

    setQuickQuizQuestions(questions)
    setQuickQuizIndex(0)
    setQuickQuizCorrect(0)
    setQuickQuizStartTime(Date.now())
    setQuickQuizActive(true)
    setQuickQuizSetup(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleStartPreTest = () => {
    const questions = generatePreTestQuestions(SCENARIOS)
    setPreTestQuestions(questions)
    setPreTestIndex(0)
    setPreTestAnswers({})
    setTimeRemaining(90 * 60)
    setPreTestStartTime(Date.now())
    setPreTestActive(true)
    setPreTestSetup(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleToggleBookmark = () => {
    if (!currentScenario) return
    setBookmarkedScenarios((prev) =>
      prev.includes(currentScenario.id)
        ? prev.filter((id) => id !== currentScenario.id)
        : [...prev, currentScenario.id],
    )
  }

  const handleExportProgress = () => {
    const data = {
      domainProgress,
      sessionStats,
      bookmarkedScenarios,
      quizHistory,
      studyPlan,
      confidenceData,
      unlockedBadges,
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aws-study-progress-${getTodayString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem("awsStudyProgress")
      setDomainProgress({})
      setSessionStats({
        attempted: 0,
        correct: 0,
        incorrect: 0,
        currentStreak: 0,
        bestStreak: 0,
        startTime: Date.now(),
      })
      setBookmarkedScenarios([])
      setSpacedRepData({})
      setQuizHistory([])
      setAttemptedScenarios(new Set())
      setStudyPlan(null)
      setStudySessions([])
      setAdaptiveData(null)
      setLatestPreTestResult(null)
      setConfidenceData({})
      setUnlockedBadges([])
      setCurrentScenarioIndex(0)
    }
  }

  const handleModeChange = (mode: StudyMode) => {
    setStudyMode(mode)
    setCurrentScenarioIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setShowConfidencePrompt(false)

    if (mode === "spaced") {
      setSpacedSessionScenarios(getSpacedDueScenarios())
    }

    if (mode === "timed") {
      setTimedQuizSetup(true)
    }

    if (mode === "quick") {
      setQuickQuizSetup(true)
    }

    if (mode === "pretest") {
      setPreTestSetup(true)
    }
  }

  // Loading state
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    )
  }

  if (showServiceCompare) {
    return <ServiceCompare onBack={() => setShowServiceCompare(false)} />
  }

  if (showAchievements) {
    return <Achievements unlockedBadges={unlockedBadges} onBack={() => setShowAchievements(false)} />
  }

  if (showDashboard) {
    return (
      <Dashboard
        sessionStats={sessionStats}
        domainProgress={domainProgress}
        bookmarkedScenarios={bookmarkedScenarios}
        quizHistory={quizHistory}
        studyPlan={studyPlan}
        preparedness={preparedness}
        onBack={() => setShowDashboard(false)}
        onReset={handleResetProgress}
        onExport={handleExportProgress}
        onEditPlan={() => {
          setShowDashboard(false)
          setShowStudyPlanSetup(true)
        }}
      />
    )
  }

  if (showExamTips) {
    return <ExamTips onBack={() => setShowExamTips(false)} />
  }

  if (showTimeline && studyPlan) {
    return (
      <StudyTimeline
        studyPlan={studyPlan}
        studySessions={studySessions}
        preparedness={preparedness}
        onBack={() => setShowTimeline(false)}
      />
    )
  }

  if (showStudyPlanSetup) {
    return (
      <StudyPlanSetup
        existingPlan={studyPlan}
        onSave={(plan) => {
          setStudyPlan(plan)
          setShowStudyPlanSetup(false)
        }}
        onCancel={() => setShowStudyPlanSetup(false)}
      />
    )
  }

  if (timedQuizSetup) {
    return (
      <TimedQuizSetup
        onStart={handleStartTimedQuiz}
        onCancel={() => setTimedQuizSetup(false)}
        domain={selectedDomain}
      />
    )
  }

  if (quickQuizSetup) {
    return (
      <QuickQuizSetup
        onStart={handleStartQuickQuiz}
        onCancel={() => setQuickQuizSetup(false)}
        domain={selectedDomain}
      />
    )
  }

  if (preTestSetup) {
    return (
      <PreTestSetup
        onStart={handleStartPreTest}
        onCancel={() => setPreTestSetup(false)}
        hasExistingPretest={!!latestPreTestResult}
      />
    )
  }

  if (showQuizResults) {
    const lastResult = quizHistory[quizHistory.length - 1]
    return (
      <QuizResults
        result={lastResult}
        onClose={() => setShowQuizResults(false)}
        onRetry={() => {
          setShowQuizResults(false)
          if (lastResult.mode === "timed") {
            setTimedQuizSetup(true)
          } else {
            setQuickQuizSetup(true)
          }
        }}
      />
    )
  }

  if (showPreTestResults && latestPreTestResult) {
    return (
      <PreTestResults
        result={latestPreTestResult}
        onClose={() => {
          setShowPreTestResults(false)
          setStudyMode("practice")
        }}
      />
    )
  }

  if (studyMode === "acronym") {
    return <AcronymMatch onBack={() => setStudyMode("practice")} />
  }

  const filteredScenarios = getFilteredScenarios()

  return (
    <div className="min-h-screen bg-background">
      {newBadgeQueue.length > 0 && <BadgeNotification badge={newBadgeQueue[0]} onDismiss={handleDismissBadge} />}

      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setShowDashboard={setShowDashboard}
        studyMode={studyMode}
        setStudyMode={handleModeChange}
        timeRemaining={timedQuizActive || preTestActive ? timeRemaining : undefined}
        onShowExamTips={() => setShowExamTips(true)}
        onShowAchievements={() => setShowAchievements(true)}
        onShowServiceCompare={() => setShowServiceCompare(true)}
        unlockedBadgeCount={unlockedBadges.length}
      />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar
          selectedDomain={selectedDomain}
          setSelectedDomain={(domain) => {
            setSelectedDomain(domain)
            setCurrentScenarioIndex(0)
            setSelectedAnswer(null)
            setShowFeedback(false)
          }}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          domainProgress={domainProgress}
        />

        <main className="flex-1 p-4 md:p-6 w-full">
          {studyMode === "practice" && !timedQuizActive && !quickQuizActive && !preTestActive && (
            <div className="mb-4 space-y-3">
              <PreparednessCard
                preparedness={preparedness}
                studyPlan={studyPlan}
                dailyGoal={dailyGoal}
                sessionStats={sessionStats}
                onEditPlan={() => setShowStudyPlanSetup(true)}
                onShowTimeline={() => setShowTimeline(true)}
                adaptiveActive={!!adaptiveData?.preTestTaken}
              />

              {dailyQuestion && !dailyQuestion.completed && (
                <DailyQuestionCard
                  completed={dailyQuestion.completed}
                  wasCorrect={dailyQuestion.wasCorrect}
                  onStart={() => setShowDailyQuestion(true)}
                />
              )}
            </div>
          )}

          {filteredScenarios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No questions available for this selection.</p>
              {studyMode === "review" && bookmarkedScenarios.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">Bookmark some questions to review them later!</p>
              )}
            </div>
          ) : currentScenario ? (
            <QuestionCard
              scenario={currentScenario}
              scenarioIndex={
                timedQuizActive
                  ? timedQuizIndex
                  : quickQuizActive
                    ? quickQuizIndex
                    : preTestActive
                      ? preTestIndex
                      : currentScenarioIndex
              }
              totalScenarios={filteredScenarios.length}
              selectedDomain={selectedDomain}
              selectedAnswer={selectedAnswer}
              showFeedback={showFeedback}
              isBookmarked={bookmarkedScenarios.includes(currentScenario.id)}
              onAnswerSelect={handleAnswerSelect}
              onSubmit={handleSubmit}
              onNext={handleNext}
              onToggleBookmark={handleToggleBookmark}
              hideBookmark={preTestActive}
              submitLabel={preTestActive ? (preTestIndex < preTestQuestions.length - 1 ? "Next" : "Finish") : undefined}
              showConfidencePrompt={showConfidencePrompt && !preTestActive}
              onConfidenceSelect={handleConfidenceSelect}
            />
          ) : null}
        </main>
      </div>
    </div>
  )
}
