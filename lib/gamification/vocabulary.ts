// AWS vocabulary terms for Duolingo-style progressive learning
// Start with vocabulary building before complex scenarios

export interface VocabTerm {
  term: string
  definition: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const AWS_VOCABULARY: VocabTerm[] = [
  // Cloud Concepts - Easy
  {
    term: "Cloud Computing",
    definition: "On-demand delivery of IT resources over the internet with pay-as-you-go pricing",
    category: "Cloud Concepts",
    difficulty: "easy"
  },
  {
    term: "Scalability",
    definition: "The ability to easily grow or shrink resources as needed",
    category: "Cloud Concepts",
    difficulty: "easy"
  },
  {
    term: "Elasticity",
    definition: "Automatic scaling of resources based on demand",
    category: "Cloud Concepts",
    difficulty: "easy"
  },
  {
    term: "High Availability",
    definition: "System continues operating even when some components fail",
    category: "Cloud Concepts",
    difficulty: "easy"
  },
  {
    term: "Fault Tolerance",
    definition: "System can continue operating properly in the event of failures",
    category: "Cloud Concepts",
    difficulty: "medium"
  },
  
  // Security - Easy
  {
    term: "IAM",
    definition: "Identity and Access Management - controls who can access AWS resources",
    category: "Security and Compliance",
    difficulty: "easy"
  },
  {
    term: "MFA",
    definition: "Multi-Factor Authentication - adds extra security beyond passwords",
    category: "Security and Compliance",
    difficulty: "easy"
  },
  {
    term: "Encryption",
    definition: "Converting data into code to prevent unauthorized access",
    category: "Security and Compliance",
    difficulty: "easy"
  },
  {
    term: "Security Group",
    definition: "Virtual firewall controlling inbound and outbound traffic",
    category: "Security and Compliance",
    difficulty: "medium"
  },
  
  // Technology - Easy
  {
    term: "EC2",
    definition: "Elastic Compute Cloud - virtual servers in the cloud",
    category: "Cloud Technology and Services",
    difficulty: "easy"
  },
  {
    term: "S3",
    definition: "Simple Storage Service - object storage for files and data",
    category: "Cloud Technology and Services",
    difficulty: "easy"
  },
  {
    term: "Lambda",
    definition: "Serverless compute service that runs code without managing servers",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "VPC",
    definition: "Virtual Private Cloud - your own isolated network in AWS",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "RDS",
    definition: "Relational Database Service - managed database service",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  
  // Billing - Easy
  {
    term: "Pay-as-you-go",
    definition: "Only pay for resources you actually use",
    category: "Billing, Pricing and Support",
    difficulty: "easy"
  },
  {
    term: "Free Tier",
    definition: "Services and resources available at no cost for 12 months",
    category: "Billing, Pricing and Support",
    difficulty: "easy"
  },
  {
    term: "Reserved Instance",
    definition: "Pre-pay for compute capacity to get significant discounts",
    category: "Billing, Pricing and Support",
    difficulty: "medium"
  },
  {
    term: "Spot Instance",
    definition: "Use spare EC2 capacity at steep discounts (up to 90% off)",
    category: "Billing, Pricing and Support",
    difficulty: "medium"
  },
  
  // More terms - Medium difficulty
  {
    term: "Auto Scaling",
    definition: "Automatically adjusts the number of EC2 instances based on demand",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "Load Balancer",
    definition: "Distributes incoming traffic across multiple targets",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "CloudFront",
    definition: "Content Delivery Network (CDN) that delivers content globally with low latency",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "Route 53",
    definition: "Scalable DNS web service for routing users to applications",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "CloudWatch",
    definition: "Monitoring service for AWS resources and applications",
    category: "Monitoring and Optimization",
    difficulty: "medium"
  },
  {
    term: "CloudTrail",
    definition: "Logs all API calls made in your AWS account for auditing",
    category: "Security and Compliance",
    difficulty: "medium"
  },
  {
    term: "DynamoDB",
    definition: "Fast, flexible NoSQL database service",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "EBS",
    definition: "Elastic Block Store - persistent block storage for EC2",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "EFS",
    definition: "Elastic File System - scalable file storage for EC2",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "Glacier",
    definition: "Low-cost cloud storage for data archiving and long-term backup",
    category: "Cloud Technology and Services",
    difficulty: "medium"
  },
  {
    term: "Shared Responsibility Model",
    definition: "AWS secures the cloud infrastructure; customers secure what's in the cloud",
    category: "Security and Compliance",
    difficulty: "hard"
  },
]

// Generate vocabulary lessons that progressively introduce terms
export function generateVocabularyLessons(category: string): any[] {
  const categoryTerms = AWS_VOCABULARY.filter(v => v.category === category)
  const lessons: any[] = []
  
  // Lesson 1: Easy vocabulary matching (4-5 terms)
  const easyTerms = categoryTerms.filter(v => v.difficulty === 'easy').slice(0, 5)
  if (easyTerms.length > 0) {
    lessons.push({
      type: 'vocab_intro',
      title: 'Learn Key Terms',
      terms: easyTerms,
      exerciseType: 'match'
    })
  }
  
  // Lesson 2: Practice easy terms with fill-in-blank
  if (easyTerms.length > 0) {
    lessons.push({
      type: 'vocab_practice',
      title: 'Practice What You Learned',
      terms: easyTerms,
      exerciseType: 'fill_blank'
    })
  }
  
  // Lesson 3: Medium vocabulary
  const mediumTerms = categoryTerms.filter(v => v.difficulty === 'medium').slice(0, 5)
  if (mediumTerms.length > 0) {
    lessons.push({
      type: 'vocab_intro',
      title: 'Advanced Terms',
      terms: mediumTerms,
      exerciseType: 'match'
    })
  }
  
  return lessons
}
