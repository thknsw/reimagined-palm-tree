"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle2, TrendingUp } from "lucide-react"
import type { StudyPlan, StudySession } from "@/lib/study-types"

type StudyTimelineProps = {
  studyPlan: StudyPlan
  studySessions: StudySession[]
  onClose: () => void
}

export function StudyTimeline({ studyPlan, studySessions, onClose }: StudyTimelineProps) {
  const timelineData = useMemo(() => {
    const startDate = new Date(studyPlan.createdAt)
    const testDate = new Date(studyPlan.testDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const totalDays = Math.ceil((testDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Create session lookup map
    const sessionMap = new Map<string, StudySession>()
    studySessions.forEach((s) => sessionMap.set(s.date, s))

    // Calculate study days based on 5 or 7 day schedule
    const isStudyDay = (date: Date) => {
      const dayOfWeek = date.getDay() // 0=Sun, 6=Sat
      if (studyPlan.studyDaysPerWeek === 5) {
        return dayOfWeek >= 1 && dayOfWeek <= 5 // Mon-Fri
      }
      return true // All days
    }

    // Build week data for visualization
    const weeks: {
      weekStart: Date
      days: { date: Date; isStudyDay: boolean; session: StudySession | null; isPast: boolean; isToday: boolean }[]
    }[] = []

    const currentDate = new Date(startDate)
    currentDate.setHours(0, 0, 0, 0)

    // Align to start of week (Sunday)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

    while (startOfWeek <= testDate) {
      const week: {
        weekStart: Date
        days: { date: Date; isStudyDay: boolean; session: StudySession | null; isPast: boolean; isToday: boolean }[]
      } = {
        weekStart: new Date(startOfWeek),
        days: [],
      }

      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek)
        dayDate.setDate(dayDate.getDate() + i)
        const dateStr = dayDate.toISOString().split("T")[0]
        const isInRange = dayDate >= startDate && dayDate <= testDate

        week.days.push({
          date: dayDate,
          isStudyDay: isInRange && isStudyDay(dayDate),
          session: sessionMap.get(dateStr) || null,
          isPast: dayDate < today,
          isToday: dayDate.getTime() === today.getTime(),
        })
      }

      if (week.days.some((d) => d.date >= startDate && d.date <= testDate)) {
        weeks.push(week)
      }

      startOfWeek.setDate(startOfWeek.getDate() + 7)
    }

    // Calculate stats
    const totalMinutesStudied = studySessions.reduce((sum, s) => sum + s.minutesStudied, 0)
    const totalQuestionsCompleted = studySessions.reduce((sum, s) => sum + s.questionsCompleted, 0)
    const daysStudied = studySessions.length

    // Expected study days so far
    let expectedStudyDays = 0
    const checkDate = new Date(startDate)
    while (checkDate < today && checkDate <= testDate) {
      if (isStudyDay(checkDate)) expectedStudyDays++
      checkDate.setDate(checkDate.getDate() + 1)
    }

    const adherenceRate = expectedStudyDays > 0 ? Math.round((daysStudied / expectedStudyDays) * 100) : 100

    return {
      weeks,
      totalDays,
      daysPassed,
      daysRemaining,
      totalMinutesStudied,
      totalQuestionsCompleted,
      daysStudied,
      expectedStudyDays,
      adherenceRate,
      studyDaysPerWeek: studyPlan.studyDaysPerWeek,
    }
  }, [studyPlan, studySessions])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Study Timeline</h1>
            <p className="text-sm text-muted-foreground">
              {timelineData.studyDaysPerWeek === 5 ? "5 days/week (Mon-Fri)" : "7 days/week"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{timelineData.daysRemaining}</div>
              <div className="text-xs text-muted-foreground">Days to exam</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">
                {Math.floor(timelineData.totalMinutesStudied / 60)}h {timelineData.totalMinutesStudied % 60}m
              </div>
              <div className="text-xs text-muted-foreground">Total studied</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{timelineData.daysStudied}</div>
              <div className="text-xs text-muted-foreground">Days studied</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <div
                className={`text-2xl font-bold ${timelineData.adherenceRate >= 80 ? "text-success" : timelineData.adherenceRate >= 50 ? "text-warning" : "text-destructive"}`}
              >
                {timelineData.adherenceRate}%
              </div>
              <div className="text-xs text-muted-foreground">Adherence rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Journey Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Started {formatDate(new Date(studyPlan.createdAt))}</span>
              <span>Exam {formatDate(new Date(studyPlan.testDate))}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 relative">
              <div
                className="h-3 rounded-full bg-accent transition-all duration-500"
                style={{ width: `${Math.min(100, (timelineData.daysPassed / timelineData.totalDays) * 100)}%` }}
              />
              {/* Test date marker */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
            </div>
            <div className="text-sm text-center text-muted-foreground">
              {timelineData.daysPassed} of {timelineData.totalDays} days completed
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Study Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground font-medium py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-1">
              {timelineData.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-cols-7 gap-1">
                  {week.days.map((day, dayIdx) => {
                    const isInPlan =
                      day.date >= new Date(studyPlan.createdAt) && day.date <= new Date(studyPlan.testDate)
                    const hasSession = day.session !== null
                    const missedStudyDay = day.isPast && day.isStudyDay && !hasSession && isInPlan

                    return (
                      <div
                        key={dayIdx}
                        className={`aspect-square rounded flex items-center justify-center text-xs relative ${
                          day.isToday ? "ring-2 ring-accent" : ""
                        } ${
                          !isInPlan
                            ? "opacity-30"
                            : hasSession
                              ? "bg-success/30 text-success"
                              : missedStudyDay
                                ? "bg-destructive/20 text-destructive"
                                : day.isStudyDay
                                  ? "bg-secondary/50"
                                  : "bg-secondary/20 text-muted-foreground"
                        }`}
                        title={
                          hasSession
                            ? `${day.session!.minutesStudied}m studied, ${day.session!.questionsCompleted} questions`
                            : day.isStudyDay
                              ? "Study day"
                              : "Rest day"
                        }
                      >
                        {day.date.getDate()}
                        {hasSession && (
                          <CheckCircle2 className="w-2.5 h-2.5 absolute bottom-0.5 right-0.5 text-success" />
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-success/30" />
                <span className="text-muted-foreground">Studied</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-secondary/50" />
                <span className="text-muted-foreground">Study day</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-destructive/20" />
                <span className="text-muted-foreground">Missed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-secondary/20" />
                <span className="text-muted-foreground">Rest day</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily breakdown of recent sessions */}
        {studySessions.length > 0 && (
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Study Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {studySessions
                  .slice(-7)
                  .reverse()
                  .map((session, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm">
                          {new Date(session.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.minutesStudied}m • {session.questionsCompleted} questions
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
