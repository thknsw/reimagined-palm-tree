"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowLeftRight, Search, Shield, Server, Database, HardDrive, Network, Activity } from "lucide-react"
import { SERVICE_COMPARISONS } from "@/lib/service-comparisons"
import type { ServiceComparison } from "@/lib/study-types"

type ServiceCompareProps = {
  onBack: () => void
}

const categoryIcons: Record<ServiceComparison["category"], React.ReactNode> = {
  security: <Shield className="w-4 h-4" />,
  compute: <Server className="w-4 h-4" />,
  storage: <HardDrive className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  networking: <Network className="w-4 h-4" />,
  monitoring: <Activity className="w-4 h-4" />,
}

const categoryColors: Record<ServiceComparison["category"], string> = {
  security: "bg-red-500/10 text-red-500 border-red-500/20",
  compute: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  storage: "bg-green-500/10 text-green-500 border-green-500/20",
  database: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  networking: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  monitoring: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
}

export function ServiceCompare({ onBack }: ServiceCompareProps) {
  const [selectedComparison, setSelectedComparison] = useState<ServiceComparison | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ServiceComparison["category"] | "all">("all")

  const filteredComparisons = SERVICE_COMPARISONS.filter((comp) => {
    const matchesSearch =
      searchQuery === "" ||
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || comp.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories: (ServiceComparison["category"] | "all")[] = [
    "all",
    "security",
    "compute",
    "storage",
    "database",
    "networking",
    "monitoring",
  ]

  if (selectedComparison) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold">{selectedComparison.title}</h1>
              <p className="text-primary-foreground/70 text-xs">Service Comparison</p>
            </div>
            <Button onClick={() => setSelectedComparison(null)} variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Services Header */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium">
                {selectedComparison.services[0]}
              </span>
            </div>
            <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
            <div className="text-center">
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium">
                {selectedComparison.services[1]}
              </span>
            </div>
          </div>

          {/* Differences */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Key Differences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedComparison.differences.map((diff, idx) => (
                <div key={idx} className="p-3 bg-secondary/30 rounded-lg">
                  <span className="font-semibold text-accent text-sm">{diff.service}</span>
                  <p className="text-sm text-muted-foreground mt-1">{diff.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* When to Use */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">When to Use Each</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedComparison.whenToUse.map((use, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm">{use.service}</span>
                    <p className="text-sm text-muted-foreground">{use.useCase}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Service Comparisons</h1>
            <p className="text-primary-foreground/70 text-xs">Understand the differences</p>
          </div>
          <Button onClick={onBack} variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="flex-shrink-0"
            >
              {cat !== "all" && categoryIcons[cat]}
              <span className="ml-1 capitalize">{cat}</span>
            </Button>
          ))}
        </div>

        {/* Comparisons List */}
        <div className="grid gap-3">
          {filteredComparisons.map((comp) => (
            <Card
              key={comp.id}
              className="border-border cursor-pointer hover:bg-secondary/30 transition-colors active:scale-[0.99]"
              onClick={() => setSelectedComparison(comp)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${categoryColors[comp.category]}`}>
                        {comp.category}
                      </span>
                    </div>
                    <h3 className="font-semibold">{comp.title}</h3>
                    <p className="text-sm text-muted-foreground">{comp.services.join(" vs ")}</p>
                  </div>
                  <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredComparisons.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No comparisons found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
