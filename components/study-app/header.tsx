"use client"

import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Menu,
  X,
  Timer,
  BookOpen,
  Sparkles,
  RotateCcw,
  GraduationCap,
  Zap,
  FileText,
  BookA,
  Trophy,
  ArrowLeftRight,
} from "lucide-react"
import type { StudyMode } from "@/lib/study-types"

type HeaderProps = {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  setShowDashboard: (show: boolean) => void
  studyMode: StudyMode
  setStudyMode: (mode: StudyMode) => void
  timeRemaining?: number
  onShowExamTips?: () => void
  onShowAchievements?: () => void
  onShowServiceCompare?: () => void
  unlockedBadgeCount?: number
}

export function Header({
  showSidebar,
  setShowSidebar,
  setShowDashboard,
  studyMode,
  setStudyMode,
  timeRemaining,
  onShowExamTips,
  onShowAchievements,
  onShowServiceCompare,
  unlockedBadgeCount = 0,
}: HeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <header className="bg-primary text-primary-foreground p-4 md:p-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
            >
              {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-lg md:text-2xl font-bold tracking-tight">AWS CLF-C02</h1>
              <p className="text-primary-foreground/70 text-xs md:text-sm">Cloud Practitioner Study</p>
            </div>
          </div>

          {(studyMode === "timed" || studyMode === "pretest") && timeRemaining !== undefined && (
            <div className="flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-mono text-sm font-bold">
              <Timer className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>
          )}

          <div className="flex items-center gap-2">
            {onShowAchievements && (
              <Button
                onClick={onShowAchievements}
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex relative"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Badges
                {unlockedBadgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unlockedBadgeCount}
                  </span>
                )}
              </Button>
            )}
            {onShowServiceCompare && (
              <Button
                onClick={onShowServiceCompare}
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Compare
              </Button>
            )}
            {onShowExamTips && (
              <Button
                onClick={onShowExamTips}
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Exam Tips
              </Button>
            )}
            <Button onClick={() => setShowDashboard(true)} variant="secondary" size="sm" className="hidden md:flex">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Study Mode Selector */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <Button
            variant={studyMode === "practice" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("practice")}
            className={
              studyMode !== "practice"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            Practice
          </Button>
          <Button
            variant={studyMode === "pretest" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("pretest")}
            className={
              studyMode !== "pretest"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <FileText className="w-4 h-4 mr-1.5" />
            Pre-Test
          </Button>
          <Button
            variant={studyMode === "acronym" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("acronym")}
            className={
              studyMode !== "acronym"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <BookA className="w-4 h-4 mr-1.5" />
            Acronyms
          </Button>
          <Button
            variant={studyMode === "quick" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("quick")}
            className={
              studyMode !== "quick"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Quick 10
          </Button>
          <Button
            variant={studyMode === "timed" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("timed")}
            className={
              studyMode !== "timed"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <Timer className="w-4 h-4 mr-1.5" />
            Timed
          </Button>
          <Button
            variant={studyMode === "spaced" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("spaced")}
            className={
              studyMode !== "spaced"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Spaced
          </Button>
          <Button
            variant={studyMode === "review" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStudyMode("review")}
            className={
              studyMode !== "review"
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                : ""
            }
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Review
          </Button>
          {onShowServiceCompare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowServiceCompare}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
            >
              <ArrowLeftRight className="w-4 h-4 mr-1.5" />
              Compare
            </Button>
          )}
          {onShowAchievements && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowAchievements}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 md:hidden relative"
            >
              <Trophy className="w-4 h-4 mr-1.5" />
              Badges
            </Button>
          )}
          {onShowExamTips && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowExamTips}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 md:hidden"
            >
              <GraduationCap className="w-4 h-4 mr-1.5" />
              Tips
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
