'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookOpen, Target, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PracticeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lessonId: string
  lessonTitle: string
}

export function PracticeModal({ open, onOpenChange, lessonId, lessonTitle }: PracticeModalProps) {
  const router = useRouter()

  const handlePractice = () => {
    router.push(`/learn/lesson/${lessonId}?practice=true`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Practice {lessonTitle}</DialogTitle>
          <DialogDescription>
            Review this lesson to strengthen your knowledge and earn bonus XP!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Review Questions</p>
              <p className="text-sm text-muted-foreground">Practice all questions from this lesson</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
            <Target className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">No Hearts Lost</p>
              <p className="text-sm text-muted-foreground">Practice mode won't cost you any hearts</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
            <Zap className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Earn Bonus XP</p>
              <p className="text-sm text-muted-foreground">Get extra experience points for reviewing</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handlePractice} className="flex-1">
            Start Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
