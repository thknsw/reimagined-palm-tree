"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, Clock, BookOpen, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { EXAM_TIPS, GLOSSARY_TERMS, CAF_PERSPECTIVES, type ExamTip } from "@/lib/study-types"

type ExamTipsProps = {
  onBack: () => void
}

export function ExamTips({ onBack }: ExamTipsProps) {
  const [activeTab, setActiveTab] = useState<"tips" | "glossary" | "caf">("tips")
  const [expandedCAF, setExpandedCAF] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const getCategoryIcon = (category: ExamTip["category"]) => {
    switch (category) {
      case "general":
        return <AlertTriangle className="w-4 h-4" />
      case "time":
        return <Clock className="w-4 h-4" />
      case "content":
        return <BookOpen className="w-4 h-4" />
      case "strategy":
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getImportanceColor = (importance: ExamTip["importance"]) => {
    switch (importance) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-accent/10 text-accent border-accent/20"
      case "medium":
        return "bg-secondary text-secondary-foreground border-border"
    }
  }

  const filteredTips = filterCategory === "all" ? EXAM_TIPS : EXAM_TIPS.filter((tip) => tip.category === filterCategory)

  const glossaryCategories = [...new Set(GLOSSARY_TERMS.map((t) => t.category))]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Exam Preparation</h1>
            <p className="text-primary-foreground/70 text-sm">Tips from real exam experiences</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Tab Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant={activeTab === "tips" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("tips")}>
            Exam Tips
          </Button>
          <Button
            variant={activeTab === "glossary" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("glossary")}
          >
            Acronyms & Terms
          </Button>
          <Button variant={activeTab === "caf" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("caf")}>
            CAF Framework
          </Button>
        </div>

        {/* Exam Tips Tab */}
        {activeTab === "tips" && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["all", "general", "content", "strategy", "time"].map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterCategory(cat)}
                  className="capitalize"
                >
                  {cat === "all" ? "All Tips" : cat}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredTips.map((tip) => (
                <Card key={tip.id} className={`border ${getImportanceColor(tip.importance)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getCategoryIcon(tip.category)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{tip.title}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              tip.importance === "critical"
                                ? "bg-destructive text-destructive-foreground"
                                : tip.importance === "high"
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {tip.importance}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Glossary Tab */}
        {activeTab === "glossary" && (
          <div className="space-y-4">
            {glossaryCategories.map((category) => (
              <Card key={category}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {GLOSSARY_TERMS.filter((t) => t.category === category).map((term) => (
                      <div key={term.acronym} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50">
                        <span className="font-mono font-bold text-accent min-w-[80px]">{term.acronym}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{term.fullName}</p>
                          <p className="text-xs text-muted-foreground">{term.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CAF Tab */}
        {activeTab === "caf" && (
          <div className="space-y-4">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <p className="text-sm">
                  <strong>Critical:</strong> The AWS Cloud Adoption Framework (CAF) appears on 5-6 exam questions. You
                  must know which capabilities belong to which perspective. Questions ask you to match terms to their
                  perspective.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {CAF_PERSPECTIVES.map((perspective) => (
                <Card key={perspective.name}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedCAF(expandedCAF === perspective.name ? null : perspective.name)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{perspective.name} Perspective</h3>
                        <p className="text-sm text-muted-foreground">{perspective.focus}</p>
                      </div>
                      {expandedCAF === perspective.name ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedCAF === perspective.name && (
                      <div className="px-4 pb-4 border-t">
                        <p className="text-xs text-muted-foreground mt-3 mb-2">Key Capabilities:</p>
                        <div className="flex flex-wrap gap-2">
                          {perspective.capabilities.map((cap) => (
                            <span key={cap} className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
