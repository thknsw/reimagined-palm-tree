import type { MicroVocabTerm } from './micro-progression'

// Micro-vocabulary: 3-5 terms introduced together
// Following Duolingo's method: introduce small chunks, build up progressively

export const AWS_MICRO_VOCABULARY: Record<string, MicroVocabTerm[]> = {
  'Cloud Concepts': [
    {
      term: 'EC2',
      definition: 'Virtual servers in the cloud',
      category: 'Cloud Concepts',
      visualIcon: '💻',
      example: 'Run applications on virtual machines',
      relatedTerms: ['Instance', 'AMI']
    },
    {
      term: 'S3',
      definition: 'Object storage for files and data',
      category: 'Cloud Concepts',
      visualIcon: '🪣',
      example: 'Store images, videos, and backups',
      relatedTerms: ['Bucket', 'Object']
    },
    {
      term: 'VPC',
      definition: 'Private network in the cloud',
      category: 'Cloud Concepts',
      visualIcon: '🔒',
      example: 'Isolate your resources securely',
      relatedTerms: ['Subnet', 'Security Group']
    },
    {
      term: 'Lambda',
      definition: 'Run code without servers',
      category: 'Cloud Concepts',
      visualIcon: '⚡',
      example: 'Execute functions on demand',
      relatedTerms: ['Serverless', 'Function']
    },
    {
      term: 'RDS',
      definition: 'Managed database service',
      category: 'Cloud Concepts',
      visualIcon: '🗄️',
      example: 'Run MySQL, PostgreSQL databases',
      relatedTerms: ['Database', 'SQL']
    }
  ],
  
  'Security and Compliance': [
    {
      term: 'IAM',
      definition: 'Manage user access and permissions',
      category: 'Security and Compliance',
      visualIcon: '👤',
      example: 'Control who can access your resources',
      relatedTerms: ['User', 'Role', 'Policy']
    },
    {
      term: 'Security Group',
      definition: 'Virtual firewall for instances',
      category: 'Security and Compliance',
      visualIcon: '🛡️',
      example: 'Control inbound and outbound traffic',
      relatedTerms: ['Firewall', 'Rules']
    },
    {
      term: 'KMS',
      definition: 'Encryption key management',
      category: 'Security and Compliance',
      visualIcon: '🔑',
      example: 'Encrypt data at rest and in transit',
      relatedTerms: ['Encryption', 'Key']
    },
    {
      term: 'CloudTrail',
      definition: 'Track user activity and API calls',
      category: 'Security and Compliance',
      visualIcon: '📜',
      example: 'Audit who did what and when',
      relatedTerms: ['Logging', 'Audit']
    }
  ],

  'Technology': [
    {
      term: 'EBS',
      definition: 'Block storage for EC2 instances',
      category: 'Technology',
      visualIcon: '💾',
      example: 'Persistent storage volumes',
      relatedTerms: ['Volume', 'Storage']
    },
    {
      term: 'ELB',
      definition: 'Distribute traffic across servers',
      category: 'Technology',
      visualIcon: '⚖️',
      example: 'Balance load between multiple EC2 instances',
      relatedTerms: ['Load Balancer', 'ALB', 'NLB']
    },
    {
      term: 'CloudFront',
      definition: 'Content delivery network (CDN)',
      category: 'Technology',
      visualIcon: '🌐',
      example: 'Cache content at edge locations worldwide',
      relatedTerms: ['CDN', 'Edge Location']
    },
    {
      term: 'Route 53',
      definition: 'DNS and domain name service',
      category: 'Technology',
      visualIcon: '🗺️',
      example: 'Route users to your application',
      relatedTerms: ['DNS', 'Domain']
    }
  ],

  'Billing and Pricing': [
    {
      term: 'Free Tier',
      definition: 'Free usage of AWS services',
      category: 'Billing and Pricing',
      visualIcon: '🎁',
      example: '12 months of free EC2, S3, and more',
      relatedTerms: ['Trial', 'Credits']
    },
    {
      term: 'Reserved Instance',
      definition: 'Commit to usage for discounts',
      category: 'Billing and Pricing',
      visualIcon: '💰',
      example: 'Save up to 72% vs On-Demand',
      relatedTerms: ['RI', 'Savings Plan']
    },
    {
      term: 'Cost Explorer',
      definition: 'Visualize and analyze costs',
      category: 'Billing and Pricing',
      visualIcon: '📊',
      example: 'Track spending over time',
      relatedTerms: ['Billing', 'Budget']
    }
  ]
}

// Lesson sets: 3-5 terms that work well together
export const MICRO_LESSON_SETS = {
  'Cloud Concepts': [
    {
      title: 'Core Services',
      terms: ['EC2', 'S3', 'VPC']
    },
    {
      title: 'Compute Options',
      terms: ['Lambda', 'EC2', 'RDS']
    }
  ],
  'Security and Compliance': [
    {
      title: 'Access Control',
      terms: ['IAM', 'Security Group', 'KMS']
    },
    {
      title: 'Monitoring Security',
      terms: ['CloudTrail', 'IAM', 'KMS']
    }
  ],
  'Technology': [
    {
      title: 'Storage & Network',
      terms: ['EBS', 'S3', 'ELB']
    },
    {
      title: 'Content Delivery',
      terms: ['CloudFront', 'Route 53', 'ELB']
    }
  ],
  'Billing and Pricing': [
    {
      title: 'Cost Management',
      terms: ['Free Tier', 'Reserved Instance', 'Cost Explorer']
    }
  ]
}
