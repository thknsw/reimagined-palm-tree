export type StudyMode = "practice" | "timed" | "review" | "spaced" | "daily" | "quick" | "acronym" | "pretest"

export type SessionStats = {
  attempted: number
  correct: number
  incorrect: number
  currentStreak: number
  bestStreak: number
  startTime: number
  timeLimit?: number
  timedMode?: boolean
}

export type DomainProgress = {
  [key: string]: {
    attempted: number
    correct: number
    total: number
  }
}

export type SpacedRepetitionData = {
  [scenarioId: string]: {
    easeFactor: number
    interval: number
    repetitions: number
    nextReview: number
    lastReview: number
  }
}

export type QuizResult = {
  id: string
  date: number
  mode: StudyMode
  totalQuestions: number
  correct: number
  timeSpent: number
  domain: string
}

export type StudyPlan = {
  testDate: number // Unix timestamp
  dailyStudyMinutes: number
  createdAt: number
  targetScore: number // Target passing score (default 70%)
  studyDaysPerWeek: 5 | 7
  notificationsEnabled: boolean
  notificationTime: string // HH:MM format
}

export type StudySession = {
  date: string // ISO date YYYY-MM-DD
  minutesStudied: number
  questionsCompleted: number
}

export type DailyGoal = {
  questionsTarget: number
  questionsCompleted: number
  minutesTarget: number
  minutesStudied: number
  date: string // ISO date string (YYYY-MM-DD)
}

export type PreparednessData = {
  overallScore: number // 0-100
  domainScores: { [domain: string]: number }
  weakestDomains: string[]
  strongestDomains: string[]
  questionsToMastery: number
  estimatedReadyDate: number | null
  daysUntilTest: number
  onTrack: boolean
  recommendation: string
}

export type ExamTip = {
  id: string
  category: "general" | "strategy" | "content" | "time"
  title: string
  description: string
  importance: "critical" | "high" | "medium"
}

export type GlossaryTerm = {
  acronym: string
  fullName: string
  description: string
  category: "security" | "compliance" | "networking" | "monitoring" | "general"
}

export type CAFPerspective = {
  name: string
  focus: string
  capabilities: string[]
}

export type ConfidenceRating = 1 | 2 | 3 | 4 | 5

export type ConfidenceData = {
  [scenarioId: string]: {
    rating: ConfidenceRating
    wasCorrect: boolean
    timestamp: number
  }
}

export type AchievementBadge = {
  id: string
  name: string
  description: string
  icon: string
  requirement: (stats: BadgeCheckData) => boolean
  tier: "bronze" | "silver" | "gold" | "platinum"
}

export type BadgeCheckData = {
  totalAttempted: number
  totalCorrect: number
  currentStreak: number
  bestStreak: number
  domainProgress: DomainProgress
  bookmarkedCount: number
  quizHistory: QuizResult[]
  preTestTaken: boolean
  dailyQuestionStreak: number
  confidenceData: ConfidenceData
}

export type UnlockedBadge = {
  badgeId: string
  unlockedAt: number
}

export type ServiceComparison = {
  id: string
  title: string
  services: string[]
  differences: { service: string; description: string }[]
  whenToUse: { service: string; useCase: string }[]
  category: "security" | "compute" | "storage" | "database" | "networking" | "monitoring"
}

export type QuestionOfTheDay = {
  scenarioId: string
  date: string // ISO date YYYY-MM-DD
  completed: boolean
  wasCorrect: boolean | null
}

export type PreTestResult = {
  id: string
  date: number
  totalQuestions: number
  correct: number
  timeSpent: number
  domainScores: { [domain: string]: { correct: number; total: number } }
  weakAreas: string[]
  strongAreas: string[]
  scaledScore: number // 100-1000 scale like real exam
  passed: boolean
}

export type AdaptiveStudyData = {
  preTestTaken: boolean
  preTestResult: PreTestResult | null
  weakDomainsMultiplier: { [domain: string]: number } // Higher = more questions from this domain
  lastAdaptiveUpdate: number
  consecutiveWeakPerformance: { [domain: string]: number }
  recentPerformance: { domain: string; correct: boolean; timestamp: number }[]
}

export const EXAM_TIPS: ExamTip[] = [
  {
    id: "1",
    category: "general",
    title: "Real Exam is Harder",
    description:
      "The actual exam is significantly harder than mock exams. Expect longer, more complex scenario-based questions that combine multiple concepts. Don't be overconfident from practice scores.",
    importance: "critical",
  },
  {
    id: "2",
    category: "time",
    title: "Time Management",
    description:
      "Practice tests may take 30-40 minutes, but the real exam can take 90+ minutes. Questions are longer and require careful reading. Easy questions often appear near the end - manage your time wisely.",
    importance: "critical",
  },
  {
    id: "3",
    category: "content",
    title: "CAF is Critical",
    description:
      "Expect 5-6 direct questions from Cloud Adoption Framework (CAF). Know the 6 perspectives (Business, People, Governance, Platform, Security, Operations) and their sub-sections by exact wording.",
    importance: "critical",
  },
  {
    id: "4",
    category: "content",
    title: "Security Dominates",
    description:
      "Security questions are numerous and challenging. Know IAM, GuardDuty, Security Hub, KMS, WAF, Shield, Macie, CloudTrail, Config, Inspector, Cognito, Secrets Manager, and their differences.",
    importance: "critical",
  },
  {
    id: "5",
    category: "content",
    title: "Shared Responsibility Deep Dives",
    description:
      "Many questions about EC2/RDS shared responsibility with complex scenarios involving third parties. Understand who is responsible for what in different contexts.",
    importance: "high",
  },
  {
    id: "6",
    category: "content",
    title: "Know ALL Services",
    description:
      "Lesser-known services appear frequently: AppSync, Fargate, MSK (Managed Streaming for Kafka), OpsWorks, X-Ray, Polly, Secrets Manager. Have at least basic knowledge of what each does.",
    importance: "high",
  },
  {
    id: "7",
    category: "strategy",
    title: "Multi-Select Questions",
    description:
      "Many questions ask you to select 2 correct answers from 4-5 options. Read all options carefully - they often combine similar-sounding services.",
    importance: "high",
  },
  {
    id: "8",
    category: "content",
    title: "Pricing Complexity",
    description:
      "Pricing questions combine multiple criteria. Know the differences between Reserved Instances, Spot Instances, Savings Plans (Compute vs EC2 Instance), and when to use each.",
    importance: "high",
  },
  {
    id: "9",
    category: "content",
    title: "7 R's of Migration",
    description:
      "Know the migration strategies: Rehost (lift-and-shift), Replatform, Repurchase, Refactor, Retire, Retain, Relocate. Questions ask which R applies to specific scenarios.",
    importance: "medium",
  },
  {
    id: "10",
    category: "content",
    title: "Know Key Acronyms",
    description:
      "Questions use acronyms without explanation: MTTR, MTBF, HIPAA, PCI DSS, GDPR, SAML, HSM, SSE-C, STS. Know what they mean and when they apply.",
    importance: "medium",
  },
]

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    acronym: "MTTR",
    fullName: "Mean Time to Recovery",
    description: "Average time to restore service after failure",
    category: "monitoring",
  },
  {
    acronym: "MTBF",
    fullName: "Mean Time Between Failures",
    description: "Average time between system failures",
    category: "monitoring",
  },
  {
    acronym: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US healthcare data privacy regulation",
    category: "compliance",
  },
  {
    acronym: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description: "Security standard for credit card handling",
    category: "compliance",
  },
  {
    acronym: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "EU data privacy regulation",
    category: "compliance",
  },
  {
    acronym: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description: "US financial reporting regulation",
    category: "compliance",
  },
  {
    acronym: "SAML",
    fullName: "Security Assertion Markup Language",
    description: "XML standard for SSO authentication",
    category: "security",
  },
  {
    acronym: "HSM",
    fullName: "Hardware Security Module",
    description: "Physical device for secure key storage",
    category: "security",
  },
  {
    acronym: "SSE",
    fullName: "Server-Side Encryption",
    description: "AWS encrypts data at rest automatically",
    category: "security",
  },
  {
    acronym: "SSE-S3",
    fullName: "SSE with S3-Managed Keys",
    description: "Amazon manages encryption keys for you",
    category: "security",
  },
  {
    acronym: "SSE-KMS",
    fullName: "SSE with KMS-Managed Keys",
    description: "You control keys via KMS with audit trail",
    category: "security",
  },
  {
    acronym: "SSE-C",
    fullName: "SSE with Customer-Provided Keys",
    description: "You provide and manage your own keys",
    category: "security",
  },
  {
    acronym: "STS",
    fullName: "Security Token Service",
    description: "Provides temporary security credentials",
    category: "security",
  },
  {
    acronym: "ACL",
    fullName: "Access Control List",
    description: "List defining who can access resources",
    category: "security",
  },
  {
    acronym: "NFS",
    fullName: "Network File System",
    description: "Protocol for file sharing over network",
    category: "networking",
  },
  {
    acronym: "CIDR",
    fullName: "Classless Inter-Domain Routing",
    description: "IP address allocation method (e.g., 10.0.0.0/16)",
    category: "networking",
  },
  {
    acronym: "BGP",
    fullName: "Border Gateway Protocol",
    description: "Protocol for routing between networks",
    category: "networking",
  },
  {
    acronym: "TLS",
    fullName: "Transport Layer Security",
    description: "Protocol for secure data transmission",
    category: "security",
  },
  {
    acronym: "DNS",
    fullName: "Domain Name System",
    description: "Translates domain names to IP addresses",
    category: "networking",
  },
  {
    acronym: "DDoS",
    fullName: "Distributed Denial of Service",
    description: "Attack that floods servers with traffic",
    category: "security",
  },
  {
    acronym: "DR",
    fullName: "Disaster Recovery",
    description: "Process for recovering from major failures",
    category: "general",
  },
  {
    acronym: "RTO",
    fullName: "Recovery Time Objective",
    description: "Target time to restore service after disaster",
    category: "general",
  },
  {
    acronym: "RPO",
    fullName: "Recovery Point Objective",
    description: "Maximum acceptable data loss (in time)",
    category: "general",
  },
  {
    acronym: "EIP",
    fullName: "Elastic IP Address",
    description: "Static public IPv4 address in AWS",
    category: "networking",
  },
  {
    acronym: "CORS",
    fullName: "Cross-Origin Resource Sharing",
    description: "Mechanism allowing restricted cross-domain requests",
    category: "security",
  },
  {
    acronym: "SNI",
    fullName: "Server Name Indication",
    description: "TLS extension for multiple certificates on one IP",
    category: "networking",
  },
  {
    acronym: "FIPS",
    fullName: "Federal Information Processing Standards",
    description: "US government computer security standards",
    category: "compliance",
  },
  {
    acronym: "SLA",
    fullName: "Service Level Agreement",
    description: "Contract defining service availability guarantees",
    category: "general",
  },
  {
    acronym: "RI",
    fullName: "Reserved Instance",
    description: "EC2 capacity reservation with discount",
    category: "general",
  },
  {
    acronym: "AZ",
    fullName: "Availability Zone",
    description: "Isolated location within an AWS Region",
    category: "general",
  },
]

export const CAF_PERSPECTIVES: CAFPerspective[] = [
  {
    name: "Business",
    focus: "Ensuring IT investments accelerate business outcomes",
    capabilities: ["IT Finance", "IT Strategy", "Benefits Realization", "Business Risk Management"],
  },
  {
    name: "People",
    focus: "Evolving culture, organizational structure, and leadership",
    capabilities: [
      "Culture Evolution",
      "Transformational Leadership",
      "Cloud Fluency",
      "Workforce Transformation",
      "Change Acceleration",
      "Organization Design",
      "Organizational Alignment",
    ],
  },
  {
    name: "Governance",
    focus: "Orchestrating cloud initiatives while managing risk",
    capabilities: [
      "Program & Project Management",
      "Benefits Management",
      "Risk Management",
      "Cloud Financial Management",
      "Application Portfolio Management",
      "Data Governance",
      "Data Curation",
    ],
  },
  {
    name: "Platform",
    focus: "Building enterprise-grade cloud platform",
    capabilities: [
      "Platform Architecture",
      "Data Architecture",
      "Platform Engineering",
      "Data Engineering",
      "Provisioning",
      "Modern Application Development",
      "CI/CD",
    ],
  },
  {
    name: "Security",
    focus: "Confidentiality, integrity, and availability of data",
    capabilities: [
      "Security Governance",
      "Security Assurance",
      "Identity & Access Management",
      "Threat Detection",
      "Vulnerability Management",
      "Infrastructure Protection",
      "Data Protection",
      "Application Security",
      "Incident Response",
    ],
  },
  {
    name: "Operations",
    focus: "Delivering cloud services at agreed service levels",
    capabilities: [
      "Observability",
      "Event Management (AIOps)",
      "Incident & Problem Management",
      "Change & Release Management",
      "Performance & Capacity Management",
      "Configuration Management",
      "Patch Management",
      "Availability & Continuity Management",
      "Application Management",
    ],
  },
]

export const SERVICE_COMPARISONS: ServiceComparison[] = [
  // Example service comparisons can be added here
]
