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
  {
    acronym: "Rehost",
    fullName: "Lift and Shift",
    description: "Move applications to cloud without changing architecture (Low effort)",
    category: "general",
  },
  {
    acronym: "Replatform",
    fullName: "Lift, Tinker, and Shift",
    description: "Move to cloud with small optimizations like moving DB to RDS (Low-Medium effort)",
    category: "general",
  },
  {
    acronym: "Repurchase",
    fullName: "Drop and Shop",
    description: "Replace existing application with SaaS alternative (Medium effort)",
    category: "general",
  },
  {
    acronym: "Refactor",
    fullName: "Re-architect",
    description: "Redesign application to leverage cloud-native features (High effort)",
    category: "general",
  },
  {
    acronym: "Retire",
    fullName: "Decommission",
    description: "Shut down applications no longer needed (Low effort)",
    category: "general",
  },
  {
    acronym: "Retain",
    fullName: "Revisit",
    description: "Keep certain applications on-premises, e.g., due to compliance (Low effort)",
    category: "general",
  },
  {
    acronym: "Relocate",
    fullName: "Hypervisor-level Migration",
    description: "Migrate large numbers of workloads using tools like CloudEndure (Medium effort)",
    category: "general",
  },
]

// Foundational AWS Service Flashcards
export const AWS_SERVICE_CARDS: Array<{ term: string; definition: string; category: string }> = [
  // Cloud Service Models
  {
    term: "IaaS",
    definition:
      "Infrastructure as a Service - Provides virtualized computing resources over the internet. You manage OS, applications, and data. AWS provides servers, storage, and networking. Examples: EC2, EBS, VPC. Most control over IT resources.",
    category: "Cloud Models",
  },
  {
    term: "PaaS",
    definition:
      "Platform as a Service - Provides a platform for developing, running, and managing applications without managing infrastructure. AWS manages servers, OS, and runtime. Examples: Elastic Beanstalk, RDS, Lambda. Medium control.",
    category: "Cloud Models",
  },
  {
    term: "SaaS",
    definition:
      "Software as a Service - Complete application delivered over the internet. Provider manages everything. You just use the software. Examples: Amazon WorkMail, Chime, QuickSight. Least control over IT resources.",
    category: "Cloud Models",
  },
  // Compute Services
  {
    term: "Amazon EC2",
    definition:
      "Elastic Compute Cloud - Virtual servers in the cloud. Full control over OS and applications. Choose instance types for compute, memory, storage. Pay for what you use. Used for any workload requiring full OS access.",
    category: "Compute",
  },
  {
    term: "AWS Lambda",
    definition:
      "Serverless compute service. Run code without provisioning servers. Pay only when code runs. Automatically scales. Max 15-minute execution. Perfect for event-driven applications, microservices, and backend APIs.",
    category: "Compute",
  },
  {
    term: "AWS Elastic Beanstalk",
    definition:
      "Platform for deploying and scaling web applications. Upload your code, Beanstalk handles deployment, capacity provisioning, load balancing, and auto-scaling. You retain control of underlying resources. Supports Java, .NET, PHP, Node.js, Python, Ruby, Go.",
    category: "Compute",
  },
  {
    term: "Amazon ECS",
    definition:
      "Elastic Container Service - Fully managed container orchestration service. Run Docker containers at scale. Integrates with ALB, IAM, CloudWatch. You manage EC2 instances or use Fargate for serverless containers.",
    category: "Compute",
  },
  {
    term: "Amazon EKS",
    definition:
      "Elastic Kubernetes Service - Managed Kubernetes service for running containerized applications. AWS manages control plane. Kubernetes-compatible for portability. Use when you need Kubernetes features or multi-cloud strategy.",
    category: "Compute",
  },
  {
    term: "AWS Fargate",
    definition:
      "Serverless compute engine for containers. Works with ECS and EKS. No need to manage servers or clusters. Pay for vCPU and memory used. Focus on application design, not infrastructure.",
    category: "Compute",
  },
  {
    term: "AWS Lightsail",
    definition:
      "Simplified cloud platform for simple web applications. Fixed monthly price. Includes VM, SSD storage, data transfer, DNS, static IP. Easy-to-use alternative to EC2 for simple workloads. Good for beginners.",
    category: "Compute",
  },
  {
    term: "AWS Batch",
    definition:
      "Fully managed batch processing service. Run hundreds of thousands of batch computing jobs. Dynamically provisions compute resources based on job requirements. Ideal for data processing, rendering, simulations.",
    category: "Compute",
  },
  {
    term: "VMware Cloud on AWS",
    definition:
      "Run VMware workloads on AWS infrastructure. Migrate existing VMware environments to cloud without re-architecting. Same VMware tools and processes. Hybrid cloud solution.",
    category: "Compute",
  },
  {
    term: "AWS Outposts",
    definition:
      "Bring AWS infrastructure and services to your on-premises data center. Same AWS APIs, tools, and hardware. For low-latency, local data processing, or data residency requirements.",
    category: "Compute",
  },
  // Storage Services
  {
    term: "Amazon S3",
    definition:
      "Simple Storage Service - Object storage for any amount of data. 99.999999999% (11 9's) durability. Store files up to 5TB. Use for backups, data lakes, websites, archives. Access via HTTP/HTTPS.",
    category: "Storage",
  },
  {
    term: "Amazon S3 Glacier",
    definition:
      "Low-cost archival storage class of S3. For data accessed rarely (once per year). Retrieval times from minutes to hours. Much cheaper than S3 Standard. Use for compliance archives, long-term backups.",
    category: "Storage",
  },
  {
    term: "Amazon EBS",
    definition:
      "Elastic Block Store - Block-level storage volumes for EC2. Persistent storage survives instance termination. Choose SSD (gp3, io2) for IOPS or HDD (st1, sc1) for throughput. Automatically replicated within AZ.",
    category: "Storage",
  },
  {
    term: "Amazon EFS",
    definition:
      "Elastic File System - Managed NFS file system for Linux. Automatically grows and shrinks. Mount on multiple EC2 instances simultaneously. Pay for storage used. Use for shared file access, content management.",
    category: "Storage",
  },
  // Database Services
  {
    term: "Amazon RDS",
    definition:
      "Relational Database Service - Managed relational databases. Supports MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora. AWS handles backups, patching, failover. You manage queries and schema.",
    category: "Database",
  },
  {
    term: "Amazon DynamoDB",
    definition:
      "Fully managed NoSQL database. Key-value and document store. Single-digit millisecond performance at any scale. Serverless option available. Use for mobile apps, gaming, IoT, real-time applications.",
    category: "Database",
  },
  {
    term: "Amazon Redshift",
    definition:
      "Fully managed data warehouse for analytics. Columnar storage for fast queries on petabyte-scale data. SQL-compatible. Integrates with BI tools. Use for business intelligence, reporting, complex queries on large datasets.",
    category: "Database",
  },
  {
    term: "Amazon Aurora",
    definition:
      "MySQL and PostgreSQL-compatible relational database built for the cloud. 5x faster than MySQL, 3x faster than PostgreSQL. Auto-scaling storage up to 128TB. Up to 15 read replicas. High availability with automated failover.",
    category: "Database",
  },
  // Networking Services
  {
    term: "Amazon VPC",
    definition:
      "Virtual Private Cloud - Isolated virtual network in AWS. Define IP ranges, subnets, route tables, gateways. Full control over networking environment. Launch resources in isolated network sections.",
    category: "Networking",
  },
  {
    term: "Amazon Route 53",
    definition:
      "Scalable DNS and domain registration service. Routes users to applications. Health checks and failover. Multiple routing policies: simple, weighted, latency-based, failover, geolocation.",
    category: "Networking",
  },
  {
    term: "Amazon CloudFront",
    definition:
      "Content Delivery Network (CDN) - Delivers content with low latency using global edge locations. Caches content close to users. Integrates with S3, EC2, ALB. DDoS protection included.",
    category: "Networking",
  },
  {
    term: "Elastic Load Balancing",
    definition:
      "Distributes incoming traffic across multiple targets. Three types: Application LB (HTTP/HTTPS, Layer 7), Network LB (TCP/UDP, Layer 4), Classic LB (legacy). Increases fault tolerance and availability.",
    category: "Networking",
  },
  // Security Services
  {
    term: "AWS IAM",
    definition:
      "Identity and Access Management - Control access to AWS resources. Create users, groups, roles, and policies. Enables MFA. Free service. Follow principle of least privilege. Root user vs IAM users.",
    category: "Security",
  },
  {
    term: "Amazon Cognito",
    definition:
      "User identity and data synchronization service. Add sign-up, sign-in, and access control to web and mobile apps. Supports social identity providers (Google, Facebook). User pools for authentication, identity pools for authorization.",
    category: "Security",
  },
  {
    term: "AWS Shield",
    definition:
      "Managed DDoS protection service. Shield Standard (free, automatic) protects all AWS customers. Shield Advanced ($3,000/month) provides enhanced protection, cost protection, and 24/7 DDoS response team.",
    category: "Security",
  },
  {
    term: "AWS Artifact",
    definition:
      "Portal for on-demand access to AWS compliance reports and agreements. Download ISO certifications, PCI reports, SOC reports. No charge. Use for audits and compliance validation.",
    category: "Security",
  },
  {
    term: "AWS KMS",
    definition:
      "Key Management Service - Create and control encryption keys. Integrated with most AWS services. Hardware Security Module (HSM) backed. Audit key usage with CloudTrail. Supports customer-managed keys (CMK).",
    category: "Security",
  },
  // Management and Governance
  {
    term: "AWS CloudWatch",
    definition:
      "Monitoring and observability service. Collect and track metrics, logs, and events. Set alarms. Create dashboards. Monitor resource utilization, application performance. Integrates with most AWS services.",
    category: "Management",
  },
  {
    term: "AWS CloudTrail",
    definition:
      "Governance, compliance, and audit service. Logs all API calls made in AWS account. Who did what, when, from where. Stores logs in S3. Essential for security analysis and troubleshooting.",
    category: "Management",
  },
  {
    term: "AWS Trusted Advisor",
    definition:
      "Real-time guidance to provision resources following AWS best practices. Checks cost optimization, performance, security, fault tolerance, service limits. Basic checks free, full checks with Business or Enterprise Support.",
    category: "Management",
  },
  {
    term: "AWS Auto Scaling",
    definition:
      "Automatically adjust capacity to maintain performance at lowest cost. Scale EC2 instances, DynamoDB tables, ECS services. Define scaling policies based on metrics. Predictive scaling uses ML to forecast.",
    category: "Management",
  },
  {
    term: "AWS CLI",
    definition:
      "Command Line Interface - Control AWS services from command line. Automate tasks with scripts. Alternative to Management Console. Available for Windows, macOS, Linux. Requires IAM access keys for authentication.",
    category: "Management",
  },
  {
    term: "AWS Config",
    definition:
      "Track resource configuration changes over time. Assess compliance with desired configurations. View configuration history. Set rules to auto-remediate non-compliant resources. Audit and security tool.",
    category: "Management",
  },
  {
    term: "AWS Organizations",
    definition:
      "Centrally manage multiple AWS accounts. Consolidated billing. Apply Service Control Policies (SCPs) across accounts. Organize accounts into Organizational Units (OUs). Volume discounts.",
    category: "Management",
  },
  // AWS Categories
  {
    term: "Analytics Services",
    definition:
      "AWS services for data analysis: Athena (query S3 with SQL), Kinesis (real-time data streaming), EMR (big data processing), QuickSight (BI dashboards), Glue (ETL), Redshift (data warehouse).",
    category: "Service Categories",
  },
  {
    term: "Application Integration",
    definition:
      "Services to connect applications: SNS (pub/sub messaging), SQS (message queuing), EventBridge (event bus), Step Functions (workflow orchestration), AppSync (GraphQL).",
    category: "Service Categories",
  },
  {
    term: "Business Applications",
    definition:
      "Productivity and collaboration tools: WorkMail (email), WorkDocs (document storage), Chime (video conferencing), Connect (contact center), WorkSpaces (virtual desktops).",
    category: "Service Categories",
  },
  {
    term: "Cost Management",
    definition:
      "Tools to manage AWS costs: Cost Explorer (visualize costs), Budgets (set alerts), Cost & Usage Report (detailed billing), Savings Plans, Reserved Instances. Trusted Advisor for optimization recommendations.",
    category: "Service Categories",
  },
  {
    term: "Developer Tools",
    definition:
      "Services for software development: CodeCommit (Git repos), CodeBuild (compile code), CodeDeploy (automate deployments), CodePipeline (CI/CD), Cloud9 (cloud IDE), X-Ray (application debugging).",
    category: "Service Categories",
  },
  {
    term: "Machine Learning",
    definition:
      "AI/ML services: SageMaker (build/train/deploy ML models), Rekognition (image analysis), Polly (text-to-speech), Transcribe (speech-to-text), Translate, Comprehend (NLP), Forecast (time series), Lex (chatbots).",
    category: "Service Categories",
  },
  {
    term: "Migration Services",
    definition:
      "Tools for migrating to AWS: DMS (Database Migration Service), Snowball (physical data transfer), DataSync (online data transfer), Migration Hub (track migrations), Application Discovery Service.",
    category: "Service Categories",
  },
  {
    term: "End User Computing",
    definition:
      "Virtual desktop and application services: WorkSpaces (virtual desktops), AppStream 2.0 (stream applications), WorkLink (secure mobile access). Provide cloud-based workstations for employees.",
    category: "Service Categories",
  },
  // Service Selection Concepts
  {
    term: "Choosing Compute Services",
    definition:
      "Selection depends on: Need for OS control? (EC2) Serverless? (Lambda) Containers? (ECS/EKS/Fargate) Simple web app? (Lightsail/Beanstalk) Batch jobs? (Batch) VMware? (VMware Cloud) On-premises? (Outposts)",
    category: "Decision Framework",
  },
  {
    term: "Choosing Storage Services",
    definition:
      "Selection depends on: Object storage? (S3) Block storage for EC2? (EBS) Shared file system? (EFS for Linux, FSx for Windows) Archive? (Glacier) Edge locations? (CloudFront) Hybrid? (Storage Gateway)",
    category: "Decision Framework",
  },
  {
    term: "Choosing Database Services",
    definition:
      "Selection depends on: Relational? (RDS/Aurora) NoSQL key-value? (DynamoDB) Data warehouse? (Redshift) In-memory cache? (ElastiCache) Graph? (Neptune) Document? (DocumentDB) Ledger? (QLDB)",
    category: "Decision Framework",
  },
  // AWS vs Traditional IT Comparisons
  {
    term: "Security: AWS vs Traditional IT",
    definition:
      "Traditional: Firewalls (hardware appliances), ACLs (access control lists on network devices), Administrators (manual user management). AWS: Security Groups (virtual firewalls for EC2), Network ACLs (subnet-level traffic control), IAM (centralized identity and access management). AWS automates and scales security.",
    category: "AWS vs Traditional IT",
  },
  {
    term: "Networking: AWS vs Traditional IT",
    definition:
      "Traditional: Physical routers (route traffic between networks), network pipelines (physical cables), switches (connect devices in LAN). AWS: Elastic Load Balancing (automatically distributes traffic), Amazon VPC (software-defined networking), virtualized infrastructure. No physical hardware to manage.",
    category: "AWS vs Traditional IT",
  },
  {
    term: "Compute: AWS vs Traditional IT",
    definition:
      "Traditional: On-premises servers (physical machines in your data center, fixed capacity, capital expense, maintenance required). AWS: AMI (Amazon Machine Images - server templates), EC2 instances (virtual servers, scale on demand, pay-as-you-go, no hardware maintenance).",
    category: "AWS vs Traditional IT",
  },
  {
    term: "Storage: AWS vs Traditional IT",
    definition:
      "Traditional: DAS (Direct Attached Storage - hard drives in server), SAN (Storage Area Network - dedicated network storage), NAS (Network Attached Storage - file-level shared storage), RDBMS (database on local servers). AWS: EBS (block storage for EC2), EFS (shared file storage), S3 (object storage), RDS (managed databases). Scales automatically, high durability.",
    category: "AWS vs Traditional IT",
  },
  {
    term: "Why AWS vs Traditional IT?",
    definition:
      "AWS advantages: No upfront capital investment in hardware. Pay only for what you use. Scale instantly (minutes vs months). Global reach in minutes. No hardware maintenance. High availability built-in. AWS manages infrastructure while you focus on applications. Traditional IT requires: Large upfront costs, capacity planning, slow provisioning, hardware maintenance, limited geographic reach.",
    category: "AWS vs Traditional IT",
  },
  // Core AWS Concepts
  {
    term: "AWS Global Infrastructure",
    definition:
      "Regions (geographic areas with multiple Availability Zones), Availability Zones (isolated data centers within a Region - at least 3 per Region), Edge Locations (for CloudFront CDN and Route 53). Design for multi-AZ for high availability. Choose Region based on: latency to users, compliance requirements, available services, cost.",
    category: "Core Concepts",
  },
  {
    term: "AWS Shared Responsibility Model",
    definition:
      "AWS: Security OF the cloud (physical infrastructure, hardware, network, managed service operations). Customer: Security IN the cloud (data, encryption, OS patching for EC2, firewall rules, IAM users/policies, application code). Varies by service: IaaS = more customer responsibility, SaaS = less customer responsibility.",
    category: "Core Concepts",
  },
  {
    term: "AWS Well-Architected Framework",
    definition:
      "Six pillars: 1) Operational Excellence (run and monitor systems), 2) Security (protect data and systems), 3) Reliability (recover from failures, meet demand), 4) Performance Efficiency (use resources efficiently), 5) Cost Optimization (avoid unnecessary costs), 6) Sustainability (minimize environmental impact). Use for architecture reviews.",
    category: "Core Concepts",
  },
  {
    term: "AWS Total Cost of Ownership (TCO)",
    definition:
      "Compare costs of running on-premises vs AWS. Include: server costs, storage costs, network costs, IT labor costs, facility costs (power, cooling, space). AWS typically 30-70% cheaper than on-premises due to: no hardware purchases, economies of scale, reduced labor, pay-as-you-go pricing. Use AWS Pricing Calculator to estimate.",
    category: "Core Concepts",
  },
  {
    term: "AWS Support Plans",
    definition:
      "Basic (free): Customer service, documentation, forums, Health Dashboard. Developer ($29/mo): Email support, 12-24hr response. Business ($100/mo): 24/7 phone/chat, <1hr response for urgent issues, Trusted Advisor. Enterprise ($15,000/mo): TAM (Technical Account Manager), <15min response for critical issues, architecture reviews.",
    category: "Core Concepts",
  },
]

// Merge AWS service cards with existing glossary terms for flashcards
export const ALL_FLASHCARD_TERMS = [
  ...GLOSSARY_TERMS.map((term) => ({
    term: term.acronym,
    definition: `${term.fullName} - ${term.description}`,
    category: term.category.charAt(0).toUpperCase() + term.category.slice(1),
  })),
  ...AWS_SERVICE_CARDS,
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
