'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trophy, Flame, Heart, Star, Zap, Target } from 'lucide-react'
import { useState } from 'react'
import { AuthDialog } from '@/components/auth/auth-dialog'

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-bold text-lg">AWS Academy</span>
          </div>
          <Button onClick={() => setShowAuth(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold">
            GET STARTED
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            Learn AWS the fun way
          </h1>
          <p className="text-xl text-muted-foreground">
            Master AWS CLF-C02 certification with bite-sized lessons, gamification, and science-backed learning methods
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => setShowAuth(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14 px-8"
            >
              START LEARNING FREE
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/learn?demo=true'}
              className="font-bold text-lg h-14 px-8"
            >
              TRY DEMO
            </Button>
          </div>

          {/* Preview Animation */}
          <div className="pt-12">
            <div className="relative max-w-2xl mx-auto">
              <Card className="p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="font-bold">7 day streak</span>
                  </div>
                  <div className="flex gap-2">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto flex items-center justify-center text-4xl shadow-lg">
                  ☁️
                </div>
                <p className="mt-4 font-semibold">Lesson 1: Cloud Concepts</p>
                <div className="flex gap-1 justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why AWS Academy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-xl">Bite-sized Lessons</h3>
            <p className="text-muted-foreground">
              Quick 5-10 minute lessons that fit into your busy schedule
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mx-auto flex items-center justify-center">
              <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl">Gamified Learning</h3>
            <p className="text-muted-foreground">
              Earn XP, maintain streaks, and unlock achievements as you learn
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto flex items-center justify-center">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-xl">Real AWS Content</h3>
            <p className="text-muted-foreground">
              250+ questions covering all AWS CLF-C02 exam topics
            </p>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold">250+</div>
            <div className="text-lg opacity-90 mt-2">Practice Questions</div>
          </div>
          <div>
            <div className="text-5xl font-bold">5</div>
            <div className="text-lg opacity-90 mt-2">Core Units</div>
          </div>
          <div>
            <div className="text-5xl font-bold">100%</div>
            <div className="text-lg opacity-90 mt-2">Free to Use</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to ace AWS CLF-C02?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of learners mastering AWS certification
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setShowAuth(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14 px-8"
            >
              START FOR FREE
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/learn?demo=true'}
              className="font-bold text-lg h-14 px-8"
            >
              TRY DEMO
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AWS Academy. Practice for AWS CLF-C02 Certification.</p>
        </div>
      </footer>

      {/* Auth Dialog */}
      {showAuth && (
        <AuthDialog
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  )
}
