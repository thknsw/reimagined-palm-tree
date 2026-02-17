// AWS CLF-C02 lessons with progressive pedagogy
// Each lesson introduces 3-5 terms, then builds comprehension

import type { VocabularyTerm, LessonVocabulary } from './progressive-questions'

export const AWS_PROGRESSIVE_LESSONS: Record<string, LessonVocabulary[]> = {
  'Cloud Concepts': [
    // Lesson 1: Basic Cloud Computing Terms
    {
      mainTerms: [
        {
          term: 'EC2',
          definition: 'Virtual servers in the cloud',
          category: 'Cloud Concepts',
          exampleContext: 'Run applications on virtual machines'
        },
        {
          term: 'S3',
          definition: 'Object storage for files and data',
          category: 'Cloud Concepts',
          exampleContext: 'Store images, videos, and backups'
        },
        {
          term: 'VPC',
          definition: 'Private network in the cloud',
          category: 'Cloud Concepts',
          exampleContext: 'Isolate resources in your own network'
        }
      ],
      supportTerms: [
        {
          term: 'Region',
          definition: 'Geographic location of AWS data centers',
          category: 'Cloud Concepts'
        },
        {
          term: 'Availability Zone',
          definition: 'Isolated location within a region',
          category: 'Cloud Concepts'
        }
      ]
    },
    // Lesson 2: Cloud Benefits
    {
      mainTerms: [
        {
          term: 'Elasticity',
          definition: 'Ability to scale resources up or down automatically',
          category: 'Cloud Concepts',
          exampleContext: 'Handle traffic spikes without manual intervention'
        },
        {
          term: 'Pay-as-you-go',
          definition: 'Only pay for what you use',
          category: 'Cloud Concepts',
          exampleContext: 'No upfront costs or long-term commitments'
        },
        {
          term: 'High Availability',
          definition: 'Service remains operational even if components fail',
          category: 'Cloud Concepts',
          exampleContext: 'Applications stay online during outages'
        }
      ],
      supportTerms: [
        {
          term: 'Scalability',
          definition: 'Ability to handle increased load',
          category: 'Cloud Concepts'
        },
        {
          term: 'Fault Tolerance',
          definition: 'System continues operating despite failures',
          category: 'Cloud Concepts'
        }
      ]
    }
  ],
  
  'Security and Compliance': [
    // Lesson 1: Identity and Access
    {
      mainTerms: [
        {
          term: 'IAM',
          definition: 'Manage user access and permissions',
          category: 'Security and Compliance',
          exampleContext: 'Control who can do what in AWS'
        },
        {
          term: 'IAM User',
          definition: 'Individual account for a person or application',
          category: 'Security and Compliance',
          exampleContext: 'Create accounts for team members'
        },
        {
          term: 'IAM Role',
          definition: 'Temporary permissions for AWS services',
          category: 'Security and Compliance',
          exampleContext: 'Let EC2 access S3 without credentials'
        }
      ],
      supportTerms: [
        {
          term: 'IAM Policy',
          definition: 'Document that defines permissions',
          category: 'Security and Compliance'
        },
        {
          term: 'MFA',
          definition: 'Extra layer of authentication security',
          category: 'Security and Compliance'
        }
      ]
    },
    // Lesson 2: Data Protection
    {
      mainTerms: [
        {
          term: 'Encryption at Rest',
          definition: 'Data is encrypted when stored',
          category: 'Security and Compliance',
          exampleContext: 'Protect data on disks and databases'
        },
        {
          term: 'Encryption in Transit',
          definition: 'Data is encrypted during transfer',
          category: 'Security and Compliance',
          exampleContext: 'Secure data moving over networks'
        },
        {
          term: 'KMS',
          definition: 'Service to create and manage encryption keys',
          category: 'Security and Compliance',
          exampleContext: 'Centralized key management'
        }
      ],
      supportTerms: [
        {
          term: 'SSL/TLS',
          definition: 'Protocols for secure internet communication',
          category: 'Security and Compliance'
        }
      ]
    }
  ],
  
  'Cloud Technology and Services': [
    // Lesson 1: Compute Services
    {
      mainTerms: [
        {
          term: 'Lambda',
          definition: 'Run code without managing servers',
          category: 'Cloud Technology and Services',
          exampleContext: 'Execute functions in response to events'
        },
        {
          term: 'ECS',
          definition: 'Run and manage Docker containers',
          category: 'Cloud Technology and Services',
          exampleContext: 'Deploy containerized applications'
        },
        {
          term: 'Elastic Beanstalk',
          definition: 'Deploy web apps without managing infrastructure',
          category: 'Cloud Technology and Services',
          exampleContext: 'Upload code and AWS handles the rest'
        }
      ],
      supportTerms: [
        {
          term: 'Auto Scaling',
          definition: 'Automatically adjust compute capacity',
          category: 'Cloud Technology and Services'
        },
        {
          term: 'Load Balancer',
          definition: 'Distribute traffic across multiple servers',
          category: 'Cloud Technology and Services'
        }
      ]
    },
    // Lesson 2: Storage Services
    {
      mainTerms: [
        {
          term: 'EBS',
          definition: 'Block storage volumes for EC2 instances',
          category: 'Cloud Technology and Services',
          exampleContext: 'Persistent storage for virtual machines'
        },
        {
          term: 'EFS',
          definition: 'Shared file storage across multiple instances',
          category: 'Cloud Technology and Services',
          exampleContext: 'Network file system for Linux'
        },
        {
          term: 'S3 Glacier',
          definition: 'Low-cost storage for data archiving',
          category: 'Cloud Technology and Services',
          exampleContext: 'Store backups and archives long-term'
        }
      ],
      supportTerms: [
        {
          term: 'Snapshot',
          definition: 'Point-in-time backup of EBS volume',
          category: 'Cloud Technology and Services'
        },
        {
          term: 'Lifecycle Policy',
          definition: 'Automatically move data between storage classes',
          category: 'Cloud Technology and Services'
        }
      ]
    },
    // Lesson 3: Database Services
    {
      mainTerms: [
        {
          term: 'RDS',
          definition: 'Managed relational database service',
          category: 'Cloud Technology and Services',
          exampleContext: 'Run MySQL, PostgreSQL, or SQL Server'
        },
        {
          term: 'DynamoDB',
          definition: 'Fast NoSQL database service',
          category: 'Cloud Technology and Services',
          exampleContext: 'Store key-value and document data'
        },
        {
          term: 'Aurora',
          definition: 'High-performance MySQL and PostgreSQL compatible database',
          category: 'Cloud Technology and Services',
          exampleContext: 'Enterprise-grade relational database'
        }
      ],
      supportTerms: [
        {
          term: 'Read Replica',
          definition: 'Copy of database for read-only queries',
          category: 'Cloud Technology and Services'
        },
        {
          term: 'Multi-AZ',
          definition: 'Database deployed across multiple zones',
          category: 'Cloud Technology and Services'
        }
      ]
    }
  ],
  
  'Billing, Pricing and Support': [
    // Lesson 1: Pricing Models
    {
      mainTerms: [
        {
          term: 'On-Demand Pricing',
          definition: 'Pay for compute by the hour or second',
          category: 'Billing, Pricing and Support',
          exampleContext: 'No long-term commitments'
        },
        {
          term: 'Reserved Instances',
          definition: 'Commit to 1 or 3 years for discounts up to 72%',
          category: 'Billing, Pricing and Support',
          exampleContext: 'Save money on predictable workloads'
        },
        {
          term: 'Spot Instances',
          definition: 'Bid for unused EC2 capacity at steep discounts',
          category: 'Billing, Pricing and Support',
          exampleContext: 'Up to 90% off for flexible workloads'
        }
      ],
      supportTerms: [
        {
          term: 'Savings Plans',
          definition: 'Flexible pricing model with significant savings',
          category: 'Billing, Pricing and Support'
        },
        {
          term: 'Free Tier',
          definition: 'Limited free usage for 12 months',
          category: 'Billing, Pricing and Support'
        }
      ]
    },
    // Lesson 2: Cost Management
    {
      mainTerms: [
        {
          term: 'Cost Explorer',
          definition: 'Visualize and analyze AWS spending',
          category: 'Billing, Pricing and Support',
          exampleContext: 'See where money is being spent'
        },
        {
          term: 'Budgets',
          definition: 'Set custom cost alerts and limits',
          category: 'Billing, Pricing and Support',
          exampleContext: 'Get notified when spending exceeds thresholds'
        },
        {
          term: 'Cost Allocation Tags',
          definition: 'Label resources to track costs by project or team',
          category: 'Billing, Pricing and Support',
          exampleContext: 'Organize billing by department'
        }
      ],
      supportTerms: [
        {
          term: 'Billing Dashboard',
          definition: 'Overview of current and forecast costs',
          category: 'Billing, Pricing and Support'
        }
      ]
    }
  ],
  
  'Monitoring and Optimization': [
    // Lesson 1: Monitoring Basics
    {
      mainTerms: [
        {
          term: 'CloudWatch',
          definition: 'Monitor AWS resources and applications',
          category: 'Monitoring and Optimization',
          exampleContext: 'Track metrics, logs, and events'
        },
        {
          term: 'CloudWatch Alarms',
          definition: 'Automatic notifications based on metrics',
          category: 'Monitoring and Optimization',
          exampleContext: 'Alert when CPU exceeds 80%'
        },
        {
          term: 'CloudTrail',
          definition: 'Track user activity and API calls',
          category: 'Monitoring and Optimization',
          exampleContext: 'Audit who did what in AWS'
        }
      ],
      supportTerms: [
        {
          term: 'Metrics',
          definition: 'Time-series data about resource performance',
          category: 'Monitoring and Optimization'
        },
        {
          term: 'Logs',
          definition: 'Records of events and activities',
          category: 'Monitoring and Optimization'
        }
      ]
    },
    // Lesson 2: Optimization Tools
    {
      mainTerms: [
        {
          term: 'Trusted Advisor',
          definition: 'Automated recommendations for best practices',
          category: 'Monitoring and Optimization',
          exampleContext: 'Find ways to save money and improve security'
        },
        {
          term: 'Compute Optimizer',
          definition: 'Recommends optimal instance types',
          category: 'Monitoring and Optimization',
          exampleContext: 'Right-size EC2 instances'
        },
        {
          term: 'Cost Anomaly Detection',
          definition: 'Automatically detect unusual spending',
          category: 'Monitoring and Optimization',
          exampleContext: 'Catch unexpected cost increases'
        }
      ],
      supportTerms: [
        {
          term: 'Well-Architected Tool',
          definition: 'Review workloads against best practices',
          category: 'Monitoring and Optimization'
        }
      ]
    }
  ]
}
