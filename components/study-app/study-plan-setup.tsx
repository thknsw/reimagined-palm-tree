"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Clock, Target, ArrowRight, GraduationCap, Bell, CalendarDays } from "lucide-react"
import type { StudyPlan } from "@/lib/study-types"

type StudyPlanSetupProps = {
  existingPlan: StudyPlan | null
  onSave: (plan: StudyPlan) => void
  onCancel: () => void
}

export function StudyPlanSetup({ existingPlan, onSave, onCancel }: StudyPlanSetupProps) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDate = existingPlan
    ? new Date(existingPlan.testDate).toISOString().split("T")[0]
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const [testDate, setTestDate] = useState(defaultDate)
  const [dailyMinutes, setDailyMinutes] = useState(existingPlan?.dailyStudyMinutes || 30)
  const [targetScore, setTargetScore] = useState(existingPlan?.targetScore || 70)
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState<5 | 7>(existingPlan?.studyDaysPerWeek || 7)
  const [notificationsEnabled, setNotificationsEnabled] = useState(existingPlan?.notificationsEnabled || false)
  const [notificationTime, setNotificationTime] = useState(existingPlan?.notificationTime || "09:00")
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")

  const minuteOptions = [5, 10, 15, 30, 45, 60, 90, 120]
  const scoreOptions = [60, 65, 70, 75, 80, 85, 90]

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if (typeof Notification === "undefined") {
      alert("Notifications are not supported in this browser")
      return
    }
    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)
    if (permission === "granted") {
      setNotificationsEnabled(true)
    }
  }

  const handleSave = () => {
    const plan: StudyPlan = {
      testDate: new Date(testDate).getTime(),
      dailyStudyMinutes: dailyMinutes,
      targetScore,
      createdAt: existingPlan?.createdAt || Date.now(),
      studyDaysPerWeek,
      notificationsEnabled,
      notificationTime,
    }
    onSave(plan)
  }

  const daysUntilTest = Math.ceil((new Date(testDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const studyDays = Math.ceil((daysUntilTest / 7) * studyDaysPerWeek)
  const totalStudyHours = Math.round((studyDays * dailyMinutes) / 60)

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-lg border-border my-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-xl">{existingPlan ? "Update Study Plan" : "Create Your Study Plan"}</CardTitle>
          <CardDescription>Set your exam date and daily study commitment to get a personalized plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Date */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              When is your exam?
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              min={tomorrow.toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {daysUntilTest > 0 && (
              <p className="text-sm text-muted-foreground">
                {daysUntilTest} day{daysUntilTest !== 1 ? "s" : ""} until your exam
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              Study schedule
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStudyDaysPerWeek(5)}
                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                  studyDaysPerWeek === 5
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-secondary/50 border-border hover:border-accent/50"
                }`}
              >
                5 days/week
                <span className="block text-xs opacity-70 mt-0.5">Mon-Fri</span>
              </button>
              <button
                onClick={() => setStudyDaysPerWeek(7)}
                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                  studyDaysPerWeek === 7
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-secondary/50 border-border hover:border-accent/50"
                }`}
              >
                7 days/week
                <span className="block text-xs opacity-70 mt-0.5">Every day</span>
              </button>
            </div>
          </div>

          {/* Daily Study Time - updated grid for more options */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Daily study time
            </label>
            <div className="grid grid-cols-4 gap-2">
              {minuteOptions.map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDailyMinutes(mins)}
                  className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all ${
                    dailyMinutes === mins
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-secondary/50 border-border hover:border-accent/50"
                  }`}
                >
                  {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Target Score */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              Target passing score
            </label>
            <div className="grid grid-cols-4 gap-2">
              {scoreOptions.map((score) => (
                <button
                  key={score}
                  onClick={() => setTargetScore(score)}
                  className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all ${
                    targetScore === score
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-secondary/50 border-border hover:border-accent/50"
                  }`}
                >
                  {score}%
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">AWS CLF-C02 passing score is approximately 700/1000 (~70%)</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              Study reminders
            </label>
            {notificationPermission === "granted" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationsEnabled ? "bg-accent" : "bg-secondary"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm">{notificationsEnabled ? "Enabled" : "Disabled"}</span>
                </div>
                {notificationsEnabled && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Remind me at:</span>
                    <input
                      type="time"
                      value={notificationTime}
                      onChange={(e) => setNotificationTime(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                )}
              </div>
            ) : notificationPermission === "denied" ? (
              <p className="text-sm text-muted-foreground">
                Notifications are blocked. Enable them in your browser settings.
              </p>
            ) : (
              <Button
                variant="outline"
                onClick={requestNotificationPermission}
                className="w-full bg-transparent"
                size="sm"
              >
                <Bell className="w-4 h-4 mr-2" />
                Enable notifications
              </Button>
            )}
          </div>

          {/* Summary - updated to show study days */}
          {daysUntilTest > 0 && (
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Your study commitment:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • {dailyMinutes} minutes, {studyDaysPerWeek} days per week
                </li>
                <li>• ~{studyDays} study days total</li>
                <li>• ~{totalStudyHours} total hours of study time</li>
                <li>• ~{Math.round(dailyMinutes / 2)} questions per study day (est.)</li>
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-accent hover:bg-accent/90" disabled={daysUntilTest <= 0}>
              {existingPlan ? "Update Plan" : "Create Plan"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
