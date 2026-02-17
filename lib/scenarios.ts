export type Scenario = {
  id: string
  domain: string
  difficulty: "beginner" | "intermediate" | "advanced"
  scenario: string
  options: string[]
  correctAnswer: number | number[] // number for single, number[] for multi-select
  isMultiSelect?: boolean
  selectCount?: number // How many to select for multi-select
  explanation: string
  incorrectExplanations: string[]
  relatedServices: string[]
  tags: string[]
}

export const DOMAINS = [
  "All Domains",
  "Cloud Concepts",
  "Security and Compliance",
  "Cloud Technology and Services",
  "Billing, Pricing and Support",
  "Deployment and Operations",
  "Monitoring and Optimization",
]

// Shuffle function for randomizing questions
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const SCENARIOS: Scenario[] = [
  // Original 18 questions
  {
    id: "1",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "A startup company is launching their first web application. They want to avoid large upfront infrastructure costs and only pay for the computing resources they actually use. The application traffic is unpredictable and may spike during marketing campaigns. Which AWS benefit best addresses their needs?",
    options: [
      "High availability across multiple data centers",
      "Pay-as-you-go pricing model with no upfront costs",
      "Automated security patches and updates",
      "Global content delivery network",
    ],
    correctAnswer: 1,
    explanation:
      "The pay-as-you-go pricing model is a fundamental benefit of AWS cloud computing. It allows the startup to avoid capital expenses and only pay for resources consumed. This elasticity is perfect for unpredictable workloads, as they can scale up during traffic spikes and scale down during quiet periods, optimizing costs.",
    incorrectExplanations: [
      "While high availability is important, it doesn't directly address the cost and unpredictable traffic concerns mentioned.",
      "Security patches are valuable but don't solve the upfront cost or variable traffic challenges.",
      "CDN is useful for performance but doesn't address the core requirement of flexible, usage-based pricing.",
    ],
    relatedServices: ["EC2", "Lambda", "Auto Scaling"],
    tags: ["pricing", "elasticity", "cost-optimization"],
  },
  {
    id: "2",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A healthcare company needs to store patient medical records in AWS. They must comply with HIPAA regulations and ensure that all data is encrypted both in transit and at rest. They also need to maintain detailed audit logs of who accessed what data and when. Which AWS service combination best meets these requirements?",
    options: [
      "S3 with server-side encryption and CloudWatch Logs",
      "S3 with server-side encryption, CloudTrail, and AWS Config",
      "EBS volumes with encryption and VPC Flow Logs",
      "RDS with automated backups and CloudWatch Metrics",
    ],
    correctAnswer: 1,
    explanation:
      "S3 with server-side encryption provides data encryption at rest. CloudTrail logs all API calls and data access events, creating a comprehensive audit trail. AWS Config tracks configuration changes and compliance status. This combination meets HIPAA requirements for encryption and audit logging. S3 also supports encryption in transit via HTTPS.",
    incorrectExplanations: [
      "CloudWatch Logs alone doesn't provide comprehensive audit trails of data access and API calls.",
      "EBS and VPC Flow Logs are for compute instances and network traffic, not ideal for document storage and access auditing.",
      "RDS is for databases, not document storage, and CloudWatch Metrics don't provide detailed access audit logs.",
    ],
    relatedServices: ["S3", "CloudTrail", "AWS Config", "KMS"],
    tags: ["compliance", "encryption", "audit", "HIPAA"],
  },
  {
    id: "3",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "An e-commerce company experiences heavy traffic during holiday sales, with traffic increasing by 300% during peak hours. They want their application to automatically add more servers during high traffic and remove them when traffic decreases, without manual intervention. Which AWS service should they implement?",
    options: [
      "Amazon CloudFront for content caching",
      "AWS Auto Scaling with EC2 instances",
      "Amazon Route 53 for DNS management",
      "AWS Lambda for serverless computing",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Auto Scaling automatically adjusts the number of EC2 instances based on demand. You can set scaling policies based on metrics like CPU utilization or request count. During traffic spikes, it launches additional instances, and during low traffic, it terminates unnecessary instances, optimizing both performance and cost.",
    incorrectExplanations: [
      "CloudFront improves performance through caching but doesn't automatically scale backend servers.",
      "Route 53 handles DNS routing but doesn't manage server capacity or scaling.",
      "While Lambda is serverless and scales automatically, the question specifically mentions adding/removing servers, indicating EC2-based architecture.",
    ],
    relatedServices: ["EC2", "Auto Scaling", "CloudWatch", "Elastic Load Balancing"],
    tags: ["scalability", "elasticity", "auto-scaling", "performance"],
  },
  {
    id: "4",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario:
      "A company wants to reduce their AWS costs for EC2 instances that run continuously for their production database servers. These servers must run 24/7 for the next three years. The workload is steady and predictable. Which pricing model would provide the most cost savings?",
    options: [
      "On-Demand Instances for maximum flexibility",
      "Spot Instances for lowest cost",
      "Reserved Instances with 3-year commitment",
      "Dedicated Hosts for compliance requirements",
    ],
    correctAnswer: 2,
    explanation:
      "Reserved Instances offer up to 75% discount compared to On-Demand pricing when you commit to a 1 or 3-year term. Since the workload is steady, predictable, and must run continuously for three years, Reserved Instances provide the best cost savings without sacrificing availability or performance.",
    incorrectExplanations: [
      "On-Demand offers flexibility but is the most expensive option for continuous workloads.",
      "Spot Instances can be interrupted by AWS and aren't suitable for production databases requiring 24/7 availability.",
      "Dedicated Hosts are for specific compliance needs and are more expensive than Reserved Instances.",
    ],
    relatedServices: ["EC2", "Cost Explorer", "AWS Budgets"],
    tags: ["pricing", "cost-optimization", "reserved-instances"],
  },
  {
    id: "5",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A financial services company needs to implement multi-factor authentication for all users accessing their AWS Management Console. They also want to enforce a policy where users must rotate their passwords every 90 days and cannot reuse their last 5 passwords. Which AWS service should they configure to implement these security requirements?",
    options: [
      "AWS Organizations with Service Control Policies",
      "AWS IAM with password policies and MFA",
      "AWS Security Hub for centralized security management",
      "Amazon Cognito for user authentication",
    ],
    correctAnswer: 1,
    explanation:
      "AWS IAM (Identity and Access Management) allows you to configure password policies including password rotation requirements, password reuse prevention, and complexity requirements. IAM also supports MFA enforcement for console access. You can set account-wide password policies and require MFA for individual users or groups.",
    incorrectExplanations: [
      "Organizations and SCPs control service access across accounts but don't manage password policies or MFA for console users.",
      "Security Hub aggregates security findings but doesn't enforce password policies or MFA requirements.",
      "Cognito is for application user authentication, not for AWS Management Console access.",
    ],
    relatedServices: ["IAM", "AWS Organizations", "CloudTrail"],
    tags: ["security", "MFA", "password-policy", "IAM"],
  },
  {
    id: "6",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A media company needs to store millions of video files that are frequently accessed during the first month after upload, but rarely accessed afterward. They want to minimize storage costs while maintaining quick access when needed. Which S3 storage class strategy should they implement?",
    options: [
      "Store all files in S3 Standard for consistent performance",
      "Use S3 Intelligent-Tiering to automatically move files between access tiers",
      "Store all files in S3 Glacier for lowest cost",
      "Use S3 One Zone-IA for all files",
    ],
    correctAnswer: 1,
    explanation:
      "S3 Intelligent-Tiering automatically moves objects between frequent and infrequent access tiers based on usage patterns. Files accessed frequently stay in the frequent access tier, while files not accessed for 30 days automatically move to lower-cost infrequent access tiers. This optimizes costs without manual intervention or lifecycle policies.",
    incorrectExplanations: [
      "S3 Standard is most expensive and doesn't optimize costs for infrequently accessed files.",
      "S3 Glacier has retrieval delays (minutes to hours) and isn't suitable for files that need quick access.",
      "One Zone-IA stores data in a single AZ (less durability) and doesn't automatically optimize based on access patterns.",
    ],
    relatedServices: ["S3", "S3 Intelligent-Tiering", "S3 Lifecycle"],
    tags: ["storage", "cost-optimization", "s3", "storage-classes"],
  },
  {
    id: "7",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A development team wants to deploy their web application across multiple AWS regions to serve global customers with low latency. They need a service that can automatically route users to the nearest healthy endpoint and perform health checks. Which AWS service should they use?",
    options: [
      "Amazon CloudFront with origin failover",
      "AWS Global Accelerator with health checks",
      "Elastic Load Balancing across regions",
      "Amazon Route 53 with geolocation routing",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Global Accelerator provides static IP addresses that route traffic to optimal endpoints across multiple regions based on health, geography, and routing policies. It performs continuous health checks and automatically routes traffic away from unhealthy endpoints. It uses the AWS global network for improved performance and availability.",
    incorrectExplanations: [
      "CloudFront is a CDN for content caching, not for routing application traffic to multiple regional endpoints.",
      "ELB works within a region, not across multiple regions for global traffic routing.",
      "Route 53 can do geolocation routing but doesn't provide the same level of traffic optimization and health checking as Global Accelerator.",
    ],
    relatedServices: ["Global Accelerator", "Route 53", "CloudFront"],
    tags: ["global", "routing", "high-availability", "multi-region"],
  },
  {
    id: "8",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A company wants to receive immediate notifications when their EC2 instance CPU utilization exceeds 80% for more than 5 minutes. They also want to automatically trigger a Lambda function to investigate the issue. Which AWS services should they combine to implement this solution?",
    options: [
      "CloudWatch Alarms with SNS notifications and Lambda trigger",
      "AWS Config with remediation actions",
      "CloudTrail with EventBridge rules",
      "Systems Manager with automation documents",
    ],
    correctAnswer: 0,
    explanation:
      "CloudWatch Alarms can monitor EC2 metrics like CPU utilization and trigger actions when thresholds are breached. You can configure the alarm to send notifications via SNS (for email/SMS alerts) and also trigger a Lambda function directly. This provides both human notification and automated response capabilities.",
    incorrectExplanations: [
      "AWS Config tracks configuration changes and compliance, not performance metrics like CPU utilization.",
      "CloudTrail logs API calls, not performance metrics, and isn't designed for real-time metric monitoring.",
      "Systems Manager is for operational tasks but CloudWatch is the primary service for metric monitoring and alarming.",
    ],
    relatedServices: ["CloudWatch", "SNS", "Lambda", "EC2"],
    tags: ["monitoring", "alarms", "automation", "cloudwatch"],
  },
  {
    id: "9",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A large enterprise is migrating to AWS and wants to ensure their architecture can handle component failures without impacting users. They need their application to continue running even if an entire data center becomes unavailable. Which AWS architectural principle should they implement?",
    options: [
      "Deploy across multiple Availability Zones within a region",
      "Use larger EC2 instance types for better performance",
      "Implement automated backups every hour",
      "Deploy in a single AZ with redundant components",
    ],
    correctAnswer: 0,
    explanation:
      "Deploying across multiple Availability Zones (AZs) provides high availability and fault tolerance. Each AZ is a physically separate data center with independent power, cooling, and networking. If one AZ fails, the application continues running in other AZs. This is a fundamental AWS best practice for building resilient architectures.",
    incorrectExplanations: [
      "Larger instances improve performance but don't protect against data center failures.",
      "Backups help with data recovery but don't provide continuous availability during failures.",
      "Single AZ deployment, even with redundancy, doesn't protect against data center-level failures.",
    ],
    relatedServices: ["EC2", "ELB", "RDS Multi-AZ", "S3"],
    tags: ["high-availability", "fault-tolerance", "architecture", "multi-az"],
  },
  {
    id: "10",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A startup wants to track their AWS spending and receive alerts when costs exceed their monthly budget. They also want to analyze which services are consuming the most budget and identify opportunities for cost savings. Which AWS tools should they use?",
    options: [
      "AWS Cost Explorer and AWS Budgets",
      "CloudWatch Metrics and Alarms",
      "AWS Trusted Advisor only",
      "AWS Organizations consolidated billing",
    ],
    correctAnswer: 0,
    explanation:
      "AWS Cost Explorer provides detailed cost analysis and visualization, showing spending by service, region, and time period. AWS Budgets allows you to set custom cost and usage budgets with alerts when thresholds are exceeded. Together, they provide comprehensive cost monitoring, analysis, and alerting capabilities.",
    incorrectExplanations: [
      "CloudWatch monitors resource metrics and performance, not costs and billing.",
      "Trusted Advisor provides recommendations but doesn't offer detailed cost tracking or budget alerts.",
      "Consolidated billing combines bills across accounts but doesn't provide cost analysis or budget alerting.",
    ],
    relatedServices: ["Cost Explorer", "AWS Budgets", "Cost and Usage Reports"],
    tags: ["cost-management", "budgets", "cost-optimization", "billing"],
  },
  {
    id: "11",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario:
      "A company wants to control network access to their EC2 instances, allowing only HTTP traffic from the internet and SSH access from their office IP address. Which AWS feature should they configure?",
    options: ["Network Access Control Lists (NACLs)", "Security Groups", "AWS WAF rules", "VPC Route Tables"],
    correctAnswer: 1,
    explanation:
      "Security Groups act as virtual firewalls for EC2 instances, controlling inbound and outbound traffic. You can specify allowed protocols, ports, and source IP addresses. They are stateful, meaning return traffic is automatically allowed. Security Groups are the primary method for controlling instance-level network access.",
    incorrectExplanations: [
      "NACLs operate at the subnet level and are stateless, making them less convenient for instance-specific rules.",
      "AWS WAF protects web applications from common exploits but doesn't control basic network access.",
      "Route Tables determine network routing paths, not access control.",
    ],
    relatedServices: ["EC2", "VPC", "Security Groups"],
    tags: ["security", "network", "firewall", "security-groups"],
  },
  {
    id: "12",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A gaming company needs to run compute-intensive game simulations that can be interrupted and resumed without data loss. The workload is flexible on timing and they want to minimize costs. Some simulations may take several hours. Which EC2 pricing model is most appropriate?",
    options: [
      "On-Demand Instances for guaranteed availability",
      "Reserved Instances for cost savings",
      "Spot Instances with checkpointing",
      "Dedicated Hosts for isolation",
    ],
    correctAnswer: 2,
    explanation:
      "Spot Instances offer up to 90% discount compared to On-Demand pricing and are perfect for fault-tolerant, flexible workloads. Since the simulations can be interrupted and resumed (with checkpointing to save progress), Spot Instances provide massive cost savings. AWS gives a 2-minute warning before interruption, allowing the application to save state.",
    incorrectExplanations: [
      "On-Demand is most expensive and unnecessary since the workload can tolerate interruptions.",
      "Reserved Instances require long-term commitment and aren't ideal for flexible, interruptible workloads.",
      "Dedicated Hosts are for compliance/licensing needs and are more expensive than Spot Instances.",
    ],
    relatedServices: ["EC2 Spot Instances", "EC2", "Auto Scaling"],
    tags: ["pricing", "spot-instances", "cost-optimization", "compute"],
  },
  {
    id: "13",
    domain: "Deployment and Operations",
    difficulty: "beginner",
    scenario:
      "A company wants to deploy a simple web application without managing servers, operating systems, or runtime environments. They want AWS to handle all infrastructure management while they focus only on their application code. Which AWS service should they use?",
    options: ["Amazon EC2 with Auto Scaling", "AWS Elastic Beanstalk", "Amazon ECS with Fargate", "AWS Lambda"],
    correctAnswer: 1,
    explanation:
      "AWS Elastic Beanstalk is a Platform as a Service (PaaS) that handles deployment, capacity provisioning, load balancing, auto-scaling, and application health monitoring. Developers simply upload their code, and Elastic Beanstalk automatically handles all infrastructure management, making it ideal for teams that want to focus on code rather than infrastructure.",
    incorrectExplanations: [
      "EC2 requires managing servers and operating systems, which contradicts the requirement.",
      "ECS with Fargate is for containerized applications and requires more configuration than Elastic Beanstalk.",
      "Lambda is for serverless functions, not full web applications with traditional architecture.",
    ],
    relatedServices: ["Elastic Beanstalk", "EC2", "CloudFormation"],
    tags: ["deployment", "paas", "managed-service", "web-application"],
  },
  {
    id: "14",
    domain: "Monitoring and Optimization",
    difficulty: "beginner",
    scenario:
      "A development team needs to collect and analyze application logs from multiple EC2 instances running their microservices. They want a centralized location to search, filter, and visualize log data in real-time. Which AWS service should they use?",
    options: [
      "Amazon S3 for log storage",
      "AWS CloudTrail for API logging",
      "Amazon CloudWatch Logs",
      "AWS Config for configuration tracking",
    ],
    correctAnswer: 2,
    explanation:
      "Amazon CloudWatch Logs enables you to collect, monitor, and analyze log files from EC2 instances and other sources. It provides real-time log streaming, powerful search and filter capabilities, and integration with CloudWatch dashboards for visualization. You can create metric filters and set alarms based on log patterns.",
    incorrectExplanations: [
      "S3 is for storage but doesn't provide real-time search, filtering, or visualization capabilities.",
      "CloudTrail logs AWS API calls, not application logs from EC2 instances.",
      "AWS Config tracks resource configuration changes, not application logs.",
    ],
    relatedServices: ["CloudWatch Logs", "CloudWatch", "EC2"],
    tags: ["monitoring", "logging", "cloudwatch", "observability"],
  },
  {
    id: "15",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A retail company experiences predictable traffic patterns with significant spikes during lunch hours (12-2 PM) and evenings (6-9 PM) every day. They want to optimize costs by automatically adjusting their compute capacity based on these known patterns. Which AWS feature should they implement?",
    options: [
      "Reactive Auto Scaling based on CPU metrics",
      "Scheduled Auto Scaling with time-based policies",
      "Manual scaling during peak hours",
      "Always-on Reserved Instances",
    ],
    correctAnswer: 1,
    explanation:
      "Scheduled Auto Scaling allows you to scale your application based on predictable load patterns. You can create scheduled actions that automatically increase capacity before peak hours and decrease it afterward. This is more cost-effective than reactive scaling for predictable patterns, as it proactively adjusts capacity before demand increases.",
    incorrectExplanations: [
      "Reactive scaling responds to metrics but may lag behind sudden demand, potentially causing performance issues.",
      "Manual scaling is inefficient, error-prone, and requires constant human intervention.",
      "Always-on Reserved Instances waste money during off-peak hours when capacity isn't needed.",
    ],
    relatedServices: ["Auto Scaling", "EC2", "CloudWatch"],
    tags: ["auto-scaling", "cost-optimization", "scheduled-scaling", "elasticity"],
  },
  {
    id: "16",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to ensure that all data stored in their S3 buckets is encrypted and that only authorized applications can decrypt the data. They want full control over encryption keys, including the ability to rotate keys and audit their usage. Which encryption approach should they use?",
    options: [
      "S3 default encryption with Amazon S3-managed keys (SSE-S3)",
      "Client-side encryption before uploading to S3",
      "S3 encryption with AWS KMS-managed keys (SSE-KMS)",
      "S3 encryption with customer-provided keys (SSE-C)",
    ],
    correctAnswer: 2,
    explanation:
      "SSE-KMS (Server-Side Encryption with AWS Key Management Service) provides full control over encryption keys while AWS manages the encryption process. KMS allows you to create, rotate, disable, and audit key usage through CloudTrail. You can also set fine-grained access policies to control which applications can decrypt data, meeting all the requirements.",
    incorrectExplanations: [
      "SSE-S3 uses Amazon-managed keys without customer control over key management or rotation.",
      "Client-side encryption requires managing encryption in application code and doesn't leverage AWS key management services.",
      "SSE-C requires customers to manage and provide keys with each request, which is operationally complex.",
    ],
    relatedServices: ["S3", "KMS", "CloudTrail"],
    tags: ["encryption", "kms", "s3", "security", "key-management"],
  },
  {
    id: "17",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario:
      "A large enterprise with multiple development teams wants to implement cost allocation and chargeback across departments. Each team has their own AWS account, and the company wants to consolidate billing while maintaining visibility into each team's spending. Which AWS feature should they implement?",
    options: [
      "AWS Cost Explorer with resource tags",
      "AWS Organizations with consolidated billing and cost allocation tags",
      "Separate AWS accounts with individual billing",
      "AWS Budgets for each team",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Organizations with consolidated billing allows you to combine usage across multiple accounts for volume discounts while maintaining separate accounts for each team. Cost allocation tags enable you to categorize and track costs by team, project, or department. This provides centralized billing management with detailed cost visibility for chargeback purposes.",
    incorrectExplanations: [
      "Cost Explorer alone doesn't consolidate billing across multiple accounts or provide organizational structure.",
      "Separate billing prevents volume discounts and makes cost management more complex.",
      "Budgets help with cost control but don't consolidate billing or enable proper chargeback mechanisms.",
    ],
    relatedServices: ["AWS Organizations", "Cost Explorer", "Cost Allocation Tags"],
    tags: ["billing", "organizations", "cost-allocation", "consolidated-billing"],
  },
  {
    id: "18",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A financial application needs to process transactions in the exact order they are received, with no duplicates or message loss. The processing system occasionally goes offline for maintenance. Which AWS service should they use for message queuing?",
    options: [
      "Amazon SQS Standard Queue",
      "Amazon SQS FIFO Queue",
      "Amazon SNS for pub/sub messaging",
      "Amazon Kinesis Data Streams",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon SQS FIFO (First-In-First-Out) queues guarantee exactly-once processing and preserve the exact order of messages. FIFO queues support message deduplication and are designed for applications where order matters. Messages are retained even when consumers are offline, ensuring no message loss during maintenance windows.",
    incorrectExplanations: [
      "Standard SQS queues provide at-least-once delivery but don't guarantee message order.",
      "SNS is for pub/sub messaging and doesn't guarantee message ordering or persistence for offline consumers.",
      "Kinesis is for streaming data and real-time analytics, not for guaranteed ordered message processing with offline tolerance.",
    ],
    relatedServices: ["SQS", "SQS FIFO", "Lambda"],
    tags: ["messaging", "sqs", "fifo", "ordering", "queuing"],
  },
  // NEW QUESTIONS - Adding 30+ more scenarios
  {
    id: "19",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "A company is evaluating whether to build their own data center or use AWS. They are concerned about the time it takes to provision new servers when they need to scale. Which cloud computing benefit addresses this concern?",
    options: [
      "Global reach with multiple regions",
      "Agility and speed of provisioning resources",
      "Economy of scale pricing",
      "Shared security responsibility",
    ],
    correctAnswer: 1,
    explanation:
      "Cloud agility refers to the ability to quickly provision and de-provision resources. In AWS, you can launch new servers in minutes instead of weeks or months required for traditional data centers. This speed enables businesses to respond rapidly to changing demands and experiment with new ideas without long procurement cycles.",
    incorrectExplanations: [
      "Global reach helps with serving worldwide customers but doesn't directly address provisioning speed.",
      "Economy of scale affects pricing but not the speed of resource provisioning.",
      "Shared responsibility is about security, not provisioning speed.",
    ],
    relatedServices: ["EC2", "CloudFormation", "Elastic Beanstalk"],
    tags: ["cloud-concepts", "agility", "provisioning"],
  },
  {
    id: "20",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company wants to understand who is responsible for what in AWS. They are confused about whether they need to patch the operating system on their EC2 instances or if AWS handles it. Which model defines these responsibilities?",
    options: [
      "AWS Well-Architected Framework",
      "AWS Shared Responsibility Model",
      "AWS Service Level Agreement",
      "AWS Acceptable Use Policy",
    ],
    correctAnswer: 1,
    explanation:
      'The AWS Shared Responsibility Model defines the division of security responsibilities between AWS and customers. AWS is responsible for security "of" the cloud (infrastructure, hardware, facilities), while customers are responsible for security "in" the cloud (OS patching, data encryption, access management). For EC2, customers must patch the operating system.',
    incorrectExplanations: [
      "The Well-Architected Framework provides best practices for building systems, not responsibility definitions.",
      "SLAs define service availability guarantees, not security responsibilities.",
      "The Acceptable Use Policy defines what you can and cannot do with AWS services.",
    ],
    relatedServices: ["EC2", "IAM", "All AWS Services"],
    tags: ["shared-responsibility", "security", "compliance"],
  },
  {
    id: "21",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A solutions architect is designing a disaster recovery strategy. The business requires the application to recover within 1 hour of a disaster with minimal data loss. Which disaster recovery strategy should they implement?",
    options: ["Backup and Restore", "Pilot Light", "Warm Standby", "Multi-Site Active/Active"],
    correctAnswer: 2,
    explanation:
      "Warm Standby maintains a scaled-down but fully functional version of your environment running in another region. During a disaster, you scale up the standby environment to handle production traffic. This achieves RTO of minutes to hours and RPO of seconds to minutes, meeting the 1-hour recovery requirement cost-effectively.",
    incorrectExplanations: [
      "Backup and Restore has the longest recovery time (hours to days) and wouldn't meet the 1-hour requirement.",
      "Pilot Light has core components running but requires more time to scale up than Warm Standby.",
      "Multi-Site Active/Active provides instant failover but is significantly more expensive than needed for a 1-hour RTO.",
    ],
    relatedServices: ["Route 53", "Auto Scaling", "RDS", "S3"],
    tags: ["disaster-recovery", "high-availability", "architecture"],
  },
  {
    id: "22",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario:
      "A developer needs to grant their application running on EC2 temporary credentials to access an S3 bucket. They don't want to hardcode AWS access keys in the application. What should they use?",
    options: [
      "Store credentials in environment variables",
      "Use an IAM role attached to the EC2 instance",
      "Create an IAM user and store keys in a configuration file",
      "Use AWS Secrets Manager to store the keys",
    ],
    correctAnswer: 1,
    explanation:
      "IAM roles for EC2 instances provide temporary security credentials that are automatically rotated. The EC2 instance can assume the role and receive credentials without any keys stored in code or configuration files. This is the most secure and recommended approach for granting AWS permissions to applications on EC2.",
    incorrectExplanations: [
      "Environment variables still require managing and rotating credentials manually.",
      "Storing keys in configuration files is a security risk and requires manual key rotation.",
      "Secrets Manager could store keys but IAM roles are the native and recommended solution for EC2.",
    ],
    relatedServices: ["IAM", "EC2", "S3"],
    tags: ["security", "iam-roles", "credentials", "best-practices"],
  },
  {
    id: "23",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company discovered that an employee's AWS access keys were accidentally committed to a public GitHub repository. The keys were exposed for 2 hours before being detected. What should be their FIRST response?",
    options: [
      "Delete the GitHub repository",
      "Immediately deactivate or delete the exposed access keys",
      "Change the user's console password",
      "Enable MFA on the affected account",
    ],
    correctAnswer: 1,
    explanation:
      "The first priority is to immediately deactivate or delete the exposed access keys to prevent unauthorized access. Attackers often have automated tools scanning GitHub for exposed AWS credentials. After securing the keys, you should audit CloudTrail logs for any unauthorized activity, then create new keys if needed.",
    incorrectExplanations: [
      "Deleting the repository doesn't help - the keys are already exposed and cached by search engines and bots.",
      "Changing the console password doesn't affect programmatic access via access keys.",
      "MFA is important but doesn't stop access via already-exposed programmatic access keys.",
    ],
    relatedServices: ["IAM", "CloudTrail", "Security Hub"],
    tags: ["security", "incident-response", "access-keys", "best-practices"],
  },
  {
    id: "24",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company needs to restrict their developers from launching EC2 instances larger than t3.medium in development accounts. They want this restriction applied across all development accounts in their organization. Which AWS feature should they use?",
    options: [
      "IAM policies attached to developer groups",
      "AWS Organizations Service Control Policies (SCPs)",
      "AWS Config rules with auto-remediation",
      "VPC security groups",
    ],
    correctAnswer: 1,
    explanation:
      "Service Control Policies (SCPs) in AWS Organizations allow you to set permission guardrails across multiple accounts. SCPs act as a filter for IAM permissions, ensuring that even if a user has IAM permissions to launch large instances, the SCP will deny it. This provides centralized governance across all development accounts.",
    incorrectExplanations: [
      "IAM policies work but must be applied to each account individually and can be modified by account admins.",
      "AWS Config can detect violations after they occur but doesn't prevent them proactively like SCPs.",
      "Security groups control network access, not instance types or sizes.",
    ],
    relatedServices: ["AWS Organizations", "IAM", "Control Tower"],
    tags: ["organizations", "scp", "governance", "multi-account"],
  },
  {
    id: "25",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company needs to host a static website consisting of HTML, CSS, JavaScript, and image files. They expect millions of visitors monthly and want the lowest cost solution with high availability. Which AWS service should they use?",
    options: [
      "EC2 instances behind an Application Load Balancer",
      "AWS Elastic Beanstalk",
      "Amazon S3 static website hosting",
      "Amazon Lightsail",
    ],
    correctAnswer: 2,
    explanation:
      "Amazon S3 static website hosting is the most cost-effective solution for hosting static content. S3 provides 99.999999999% durability, scales automatically to handle millions of requests, and you only pay for storage and data transfer. Combined with CloudFront, it delivers content globally with low latency.",
    incorrectExplanations: [
      "EC2 instances require server management and are much more expensive for static content.",
      "Elastic Beanstalk is designed for dynamic applications, not static websites.",
      "Lightsail provides virtual servers which are overkill for static content hosting.",
    ],
    relatedServices: ["S3", "CloudFront", "Route 53"],
    tags: ["s3", "static-hosting", "cost-optimization", "web-hosting"],
  },
  {
    id: "26",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A mobile application needs to store user profile images. The images are uploaded frequently and accessed globally. The application needs to handle sudden traffic spikes without performance degradation. Which storage solution is most appropriate?",
    options: [
      "Amazon EBS volumes attached to EC2 instances",
      "Amazon EFS for shared file storage",
      "Amazon S3 with CloudFront distribution",
      "Amazon FSx for high-performance computing",
    ],
    correctAnswer: 2,
    explanation:
      "Amazon S3 provides unlimited, highly durable object storage that scales automatically. CloudFront caches content at edge locations worldwide, reducing latency for global users and handling traffic spikes. S3 can handle virtually unlimited concurrent requests, making it ideal for user-generated content with unpredictable access patterns.",
    incorrectExplanations: [
      "EBS is block storage attached to single EC2 instances and doesn't scale globally.",
      "EFS is for shared file systems within a region, not optimized for global content delivery.",
      "FSx is for high-performance file systems (HPC, Windows workloads), not for serving images globally.",
    ],
    relatedServices: ["S3", "CloudFront", "Lambda@Edge"],
    tags: ["storage", "s3", "cloudfront", "mobile", "scalability"],
  },
  {
    id: "27",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company is building a real-time analytics dashboard that processes millions of events per second from IoT devices. They need to ingest, process, and analyze this streaming data with sub-second latency. Which AWS service combination should they use?",
    options: [
      "Amazon SQS and Lambda",
      "Amazon Kinesis Data Streams and Kinesis Data Analytics",
      "Amazon SNS and EC2",
      "Amazon MQ and ECS",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon Kinesis Data Streams can ingest millions of records per second with low latency. Kinesis Data Analytics allows real-time SQL queries on streaming data for immediate analysis. This combination is designed specifically for real-time streaming analytics at scale with sub-second processing latency.",
    incorrectExplanations: [
      "SQS is for message queuing with higher latency, not designed for real-time streaming analytics.",
      "SNS is for pub/sub notifications, not for high-volume streaming data ingestion and analysis.",
      "Amazon MQ is for traditional message broker workloads, not optimized for IoT-scale streaming.",
    ],
    relatedServices: ["Kinesis Data Streams", "Kinesis Data Analytics", "Kinesis Data Firehose"],
    tags: ["streaming", "kinesis", "real-time", "analytics", "iot"],
  },
  {
    id: "28",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company needs a managed relational database for their e-commerce application. They want automatic backups, patching, and the ability to scale read traffic by adding read replicas. Which AWS service should they choose?",
    options: ["Amazon DynamoDB", "Amazon RDS", "Amazon ElastiCache", "Amazon Redshift"],
    correctAnswer: 1,
    explanation:
      "Amazon RDS (Relational Database Service) is a managed service for relational databases like MySQL, PostgreSQL, and Oracle. It handles administrative tasks like backups, patching, and failover. RDS supports read replicas to scale read operations, making it ideal for read-heavy e-commerce workloads.",
    incorrectExplanations: [
      "DynamoDB is a NoSQL database, not relational, and has a different data model.",
      "ElastiCache is an in-memory caching service, not a primary database.",
      "Redshift is a data warehouse for analytics, not for transactional e-commerce workloads.",
    ],
    relatedServices: ["RDS", "Aurora", "ElastiCache"],
    tags: ["database", "rds", "managed-service", "relational"],
  },
  {
    id: "29",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario:
      "A small business is new to AWS and wants to learn best practices without hiring a consultant. They need recommendations for cost optimization, security, performance, and fault tolerance. Which AWS service provides these recommendations for free?",
    options: [
      "AWS Support (Basic tier)",
      "AWS Trusted Advisor (Core checks)",
      "AWS Professional Services",
      "AWS Well-Architected Tool",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Trusted Advisor provides automated recommendations across five categories: cost optimization, performance, security, fault tolerance, and service limits. The core checks are available to all AWS customers for free, providing valuable insights without any additional cost or expertise required.",
    incorrectExplanations: [
      "Basic Support provides documentation access but limited Trusted Advisor checks.",
      "Professional Services are paid consulting engagements.",
      "Well-Architected Tool helps with architecture reviews but requires more expertise to use effectively.",
    ],
    relatedServices: ["Trusted Advisor", "AWS Support", "Well-Architected Tool"],
    tags: ["trusted-advisor", "best-practices", "cost-optimization", "free-tier"],
  },
  {
    id: "30",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A company runs workloads that have flexible start and end times. The workloads can be interrupted without any issues, and the company wants to save up to 90% compared to On-Demand pricing. Which EC2 purchasing option should they consider?",
    options: ["Reserved Instances", "Spot Instances", "Dedicated Instances", "Savings Plans"],
    correctAnswer: 1,
    explanation:
      "Spot Instances let you use unused EC2 capacity at up to 90% discount compared to On-Demand prices. They're perfect for fault-tolerant, flexible workloads that can handle interruptions. AWS provides a 2-minute warning before interruption, allowing applications to save state or gracefully shut down.",
    incorrectExplanations: [
      "Reserved Instances require commitment and don't offer 90% savings.",
      "Dedicated Instances are for isolation requirements and cost more than On-Demand.",
      "Savings Plans offer up to 72% savings but not 90% like Spot Instances.",
    ],
    relatedServices: ["EC2", "EC2 Spot", "Auto Scaling"],
    tags: ["spot-instances", "cost-optimization", "pricing", "ec2"],
  },
  {
    id: "31",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario:
      "A company wants to commit to a consistent amount of compute usage over 1-3 years but needs flexibility to change instance families, sizes, operating systems, and tenancy. They also want savings across EC2, Lambda, and Fargate. Which purchasing option fits best?",
    options: ["EC2 Reserved Instances", "Compute Savings Plans", "EC2 Instance Savings Plans", "Capacity Reservations"],
    correctAnswer: 1,
    explanation:
      "Compute Savings Plans offer the most flexibility with up to 66% savings. They automatically apply to EC2 instances (regardless of family, size, OS, tenancy, or region), Lambda functions, and Fargate tasks. Unlike Reserved Instances, you're not locked to specific instance attributes.",
    incorrectExplanations: [
      "Reserved Instances are locked to specific instance attributes and don't cover Lambda/Fargate.",
      "EC2 Instance Savings Plans are locked to a specific instance family within a region.",
      "Capacity Reservations ensure capacity availability but don't provide discounts.",
    ],
    relatedServices: ["EC2", "Lambda", "Fargate", "Cost Explorer"],
    tags: ["savings-plans", "cost-optimization", "pricing", "flexibility"],
  },
  {
    id: "32",
    domain: "Deployment and Operations",
    difficulty: "beginner",
    scenario:
      "A developer needs to create multiple AWS resources (VPC, subnets, EC2 instances, security groups) in a repeatable, version-controlled manner. They want to define their infrastructure as code. Which AWS service should they use?",
    options: ["AWS Systems Manager", "AWS CloudFormation", "AWS OpsWorks", "AWS Service Catalog"],
    correctAnswer: 1,
    explanation:
      "AWS CloudFormation allows you to define infrastructure as code using JSON or YAML templates. You can version control these templates, create identical environments repeatedly, and manage updates through change sets. CloudFormation handles dependencies between resources automatically.",
    incorrectExplanations: [
      "Systems Manager is for operational tasks on running resources, not infrastructure provisioning.",
      "OpsWorks is for configuration management with Chef/Puppet, not general infrastructure provisioning.",
      "Service Catalog is for creating approved product portfolios, built on top of CloudFormation.",
    ],
    relatedServices: ["CloudFormation", "CDK", "Service Catalog"],
    tags: ["infrastructure-as-code", "cloudformation", "automation", "deployment"],
  },
  {
    id: "33",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A development team wants to implement continuous integration and continuous deployment (CI/CD) for their application. They need to automatically build, test, and deploy code whenever changes are pushed to their repository. Which AWS services should they combine?",
    options: [
      "CodeCommit, CodeBuild, and CodeDeploy",
      "S3, Lambda, and API Gateway",
      "ECR, ECS, and CloudWatch",
      "Elastic Beanstalk and CloudFormation",
    ],
    correctAnswer: 0,
    explanation:
      "AWS provides a complete CI/CD suite: CodeCommit for source control (Git repository), CodeBuild for building and testing code, and CodeDeploy for automated deployments. These services integrate seamlessly with CodePipeline to create end-to-end automated deployment pipelines.",
    incorrectExplanations: [
      "S3, Lambda, and API Gateway are for serverless applications, not CI/CD pipelines.",
      "ECR and ECS are for container workloads, not for building CI/CD pipelines.",
      "Elastic Beanstalk handles deployment but doesn't provide full CI/CD pipeline capabilities.",
    ],
    relatedServices: ["CodeCommit", "CodeBuild", "CodeDeploy", "CodePipeline"],
    tags: ["ci-cd", "devops", "automation", "deployment"],
  },
  {
    id: "34",
    domain: "Deployment and Operations",
    difficulty: "advanced",
    scenario:
      "A company is migrating thousands of on-premises servers to AWS. They need to discover their existing server inventory, analyze dependencies between applications, and track the migration progress. Which AWS service should they use?",
    options: [
      "AWS Database Migration Service",
      "AWS Application Discovery Service",
      "AWS Server Migration Service",
      "AWS DataSync",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Application Discovery Service helps plan migration projects by gathering information about on-premises data centers. It collects server utilization and dependency data, helping you understand application dependencies and right-size AWS resources. It integrates with AWS Migration Hub to track migration progress.",
    incorrectExplanations: [
      "Database Migration Service is specifically for database migrations, not server discovery.",
      "Server Migration Service performs the actual migration but doesn't do discovery or dependency analysis.",
      "DataSync is for transferring data between on-premises and AWS storage, not server discovery.",
    ],
    relatedServices: ["Application Discovery Service", "Migration Hub", "Server Migration Service"],
    tags: ["migration", "discovery", "planning", "on-premises"],
  },
  {
    id: "35",
    domain: "Monitoring and Optimization",
    difficulty: "beginner",
    scenario:
      "A company wants a unified view of their AWS resources' health and performance. They need pre-built dashboards showing metrics for EC2, RDS, Lambda, and other services without manual configuration. Which feature provides this?",
    options: [
      "CloudWatch Logs Insights",
      "CloudWatch Automatic Dashboards",
      "AWS X-Ray",
      "AWS Personal Health Dashboard",
    ],
    correctAnswer: 1,
    explanation:
      "CloudWatch Automatic Dashboards provide pre-built, cross-service dashboards that aggregate metrics from all your AWS resources. They automatically show relevant metrics for each service you use, providing instant visibility without any manual dashboard configuration.",
    incorrectExplanations: [
      "Logs Insights is for querying and analyzing log data, not dashboards.",
      "X-Ray is for distributed tracing of applications, not resource health dashboards.",
      "Personal Health Dashboard shows AWS service events affecting your resources, not performance metrics.",
    ],
    relatedServices: ["CloudWatch", "CloudWatch Dashboards"],
    tags: ["monitoring", "cloudwatch", "dashboards", "observability"],
  },
  {
    id: "36",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A company wants to identify the root cause of high latency in their distributed microservices application. Requests pass through multiple services including API Gateway, Lambda, and DynamoDB. Which AWS service helps trace requests across these services?",
    options: ["Amazon CloudWatch", "AWS X-Ray", "Amazon Inspector", "AWS CloudTrail"],
    correctAnswer: 1,
    explanation:
      "AWS X-Ray provides distributed tracing for applications. It shows the complete request path through all services, identifies bottlenecks, and measures latency at each step. X-Ray integrates with API Gateway, Lambda, EC2, and many other AWS services to provide end-to-end visibility.",
    incorrectExplanations: [
      "CloudWatch monitors individual service metrics but doesn't trace requests across services.",
      "Inspector is for security vulnerability assessments, not performance tracing.",
      "CloudTrail logs API calls but doesn't trace application request flows.",
    ],
    relatedServices: ["X-Ray", "CloudWatch", "Lambda"],
    tags: ["tracing", "x-ray", "performance", "microservices", "debugging"],
  },
  {
    id: "37",
    domain: "Monitoring and Optimization",
    difficulty: "advanced",
    scenario:
      "A company wants to automatically right-size their EC2 instances based on actual utilization patterns. They have hundreds of instances and need recommendations on which instances are over-provisioned or under-provisioned. Which AWS service provides these recommendations?",
    options: ["AWS Trusted Advisor", "AWS Compute Optimizer", "AWS Cost Explorer", "Amazon CloudWatch"],
    correctAnswer: 1,
    explanation:
      "AWS Compute Optimizer uses machine learning to analyze historical utilization metrics and recommend optimal AWS compute resources. It provides specific recommendations for EC2 instances, EBS volumes, Lambda functions, and ECS services, including projected cost savings and performance impact.",
    incorrectExplanations: [
      "Trusted Advisor provides high-level recommendations but Compute Optimizer offers more detailed ML-based analysis.",
      "Cost Explorer shows spending patterns but doesn't provide compute rightsizing recommendations.",
      "CloudWatch collects metrics but doesn't analyze them for rightsizing recommendations.",
    ],
    relatedServices: ["Compute Optimizer", "Cost Explorer", "Trusted Advisor"],
    tags: ["optimization", "rightsizing", "cost-optimization", "machine-learning"],
  },
  {
    id: "38",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company needs a NoSQL database that provides single-digit millisecond latency at any scale. The database should automatically scale capacity based on traffic patterns. Which AWS service should they use?",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Neptune", "Amazon DocumentDB"],
    correctAnswer: 1,
    explanation:
      "Amazon DynamoDB is a fully managed NoSQL database designed for applications that need consistent, single-digit millisecond response times at any scale. With DynamoDB on-demand capacity mode, it automatically scales up and down based on traffic patterns without capacity planning.",
    incorrectExplanations: [
      "RDS is for relational databases with SQL, not NoSQL.",
      "Neptune is a graph database for relationship-heavy data, not general NoSQL.",
      "DocumentDB is MongoDB-compatible but DynamoDB is AWS's primary auto-scaling NoSQL service.",
    ],
    relatedServices: ["DynamoDB", "DAX", "DynamoDB Streams"],
    tags: ["nosql", "dynamodb", "database", "serverless", "scalability"],
  },
  {
    id: "39",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A gaming company needs a database optimized for leaderboards and session management where data must be accessed with microsecond latency. The data access patterns are primarily key-value lookups. Which AWS service is best suited?",
    options: ["Amazon RDS with read replicas", "Amazon DynamoDB", "Amazon ElastiCache for Redis", "Amazon Aurora"],
    correctAnswer: 2,
    explanation:
      "Amazon ElastiCache for Redis provides microsecond latency for in-memory caching. It's perfect for leaderboards (using sorted sets), session management, and real-time analytics in gaming. Redis supports complex data structures while maintaining sub-millisecond response times.",
    incorrectExplanations: [
      "RDS has millisecond latency, not microsecond, and isn't optimized for key-value access.",
      "DynamoDB provides single-digit millisecond latency, which is slower than ElastiCache's microsecond latency.",
      "Aurora is a relational database not optimized for sub-millisecond key-value access.",
    ],
    relatedServices: ["ElastiCache", "Redis", "Memcached"],
    tags: ["caching", "elasticache", "gaming", "low-latency", "in-memory"],
  },
  {
    id: "40",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario:
      "A company wants to protect their web application from common attacks like SQL injection and cross-site scripting (XSS). They need a service that can inspect HTTP/HTTPS requests and block malicious traffic. Which AWS service should they use?",
    options: ["AWS Shield", "AWS WAF", "Amazon Inspector", "AWS GuardDuty"],
    correctAnswer: 1,
    explanation:
      "AWS WAF (Web Application Firewall) protects web applications from common exploits like SQL injection and XSS. It lets you create rules that block, allow, or count web requests based on conditions like IP addresses, HTTP headers, request body, and URI strings.",
    incorrectExplanations: [
      "Shield protects against DDoS attacks, not application-layer attacks like SQL injection.",
      "Inspector scans for vulnerabilities in your infrastructure, not real-time web traffic.",
      "GuardDuty detects threats and anomalies but doesn't block web application attacks.",
    ],
    relatedServices: ["WAF", "Shield", "CloudFront"],
    tags: ["security", "waf", "web-security", "sql-injection", "xss"],
  },
  {
    id: "41",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company stores sensitive customer data and needs to discover, classify, and protect it. They want to automatically scan their S3 buckets and identify data that contains personally identifiable information (PII). Which AWS service should they use?",
    options: ["AWS CloudTrail", "Amazon Macie", "AWS Config", "Amazon Inspector"],
    correctAnswer: 1,
    explanation:
      "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data in S3. It identifies PII such as names, addresses, credit card numbers, and can alert you when sensitive data is unprotected or improperly accessed. Macie helps with GDPR and other compliance requirements.",
    incorrectExplanations: [
      "CloudTrail logs API activity but doesn't scan data for PII.",
      "AWS Config tracks resource configurations, not data content.",
      "Inspector scans for infrastructure vulnerabilities, not data classification.",
    ],
    relatedServices: ["Macie", "S3", "Security Hub"],
    tags: ["security", "data-protection", "pii", "compliance", "machine-learning"],
  },
  {
    id: "42",
    domain: "Deployment and Operations",
    difficulty: "beginner",
    scenario:
      "A company wants to connect their on-premises data center to AWS with a dedicated, private network connection for consistent performance and lower latency compared to internet-based connections. Which AWS service should they use?",
    options: ["AWS VPN", "AWS Direct Connect", "AWS Transit Gateway", "VPC Peering"],
    correctAnswer: 1,
    explanation:
      "AWS Direct Connect provides a dedicated, private network connection from your premises to AWS. It offers more consistent network performance, reduced bandwidth costs, and lower latency compared to VPN connections over the public internet. It's ideal for high-throughput workloads and hybrid architectures.",
    incorrectExplanations: [
      "VPN uses the public internet and doesn't provide dedicated bandwidth or consistent latency.",
      "Transit Gateway connects VPCs but doesn't provide dedicated on-premises connectivity.",
      "VPC Peering connects VPCs within AWS, not on-premises data centers.",
    ],
    relatedServices: ["Direct Connect", "VPN", "Transit Gateway"],
    tags: ["networking", "hybrid-cloud", "direct-connect", "connectivity"],
  },
  {
    id: "43",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "A company wants to evaluate AWS services before committing to paid usage. They want to experiment with EC2, S3, and Lambda without incurring costs. What allows them to do this?",
    options: ["AWS Free Tier", "AWS Credits", "AWS Trial", "AWS Activate"],
    correctAnswer: 0,
    explanation:
      'The AWS Free Tier provides free usage of many AWS services. It includes "Always Free" offers (like 1 million Lambda requests/month), "12 Months Free" (like 750 hours of t2.micro EC2), and "Trials" for specific services. This allows experimentation and learning without cost.',
    incorrectExplanations: [
      "AWS Credits are promotional credits, not a structured free usage program.",
      "AWS doesn't have a formal \"Trial\" program - it's part of Free Tier.",
      "AWS Activate is for startups and provides credits, not free tier access.",
    ],
    relatedServices: ["All AWS Services", "Billing Console"],
    tags: ["free-tier", "pricing", "getting-started", "cost"],
  },
  {
    id: "44",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario:
      "A company needs 24/7 access to AWS support engineers who can help with production system issues within 4 hours. They also need architectural guidance for their workloads. Which AWS Support plan should they choose?",
    options: ["Basic Support", "Developer Support", "Business Support", "Enterprise Support"],
    correctAnswer: 2,
    explanation:
      "Business Support provides 24/7 access to Cloud Support Engineers via phone, chat, and email. It includes a 4-hour response time for production system impaired issues, full access to Trusted Advisor checks, and use-case architectural guidance. This meets the company's requirements cost-effectively.",
    incorrectExplanations: [
      "Basic Support doesn't include access to support engineers or architectural guidance.",
      "Developer Support has limited hours and only email access, with 12+ hour response times.",
      "Enterprise Support exceeds requirements and is more expensive; needed for mission-critical workloads.",
    ],
    relatedServices: ["AWS Support", "Trusted Advisor"],
    tags: ["support", "pricing", "sla", "enterprise"],
  },
  {
    id: "45",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to run containers without managing servers or clusters. They want to simply define their containers and let AWS handle the underlying infrastructure. Which AWS service combination should they use?",
    options: ["ECS on EC2 instances", "ECS with Fargate", "EKS on EC2 instances", "EC2 with Docker installed"],
    correctAnswer: 1,
    explanation:
      "Amazon ECS (Elastic Container Service) with AWS Fargate is a serverless compute engine for containers. Fargate removes the need to provision, configure, and scale clusters of virtual machines. You just define your task definitions and Fargate handles all infrastructure management.",
    incorrectExplanations: [
      "ECS on EC2 requires managing the underlying EC2 instances.",
      "EKS on EC2 requires managing both Kubernetes and EC2 infrastructure.",
      "EC2 with Docker requires full server and Docker management.",
    ],
    relatedServices: ["ECS", "Fargate", "ECR"],
    tags: ["containers", "fargate", "serverless", "ecs"],
  },
  {
    id: "46",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to run short-lived, event-driven functions that respond to API calls, S3 uploads, and DynamoDB changes. The functions run for less than 15 minutes and they want to pay only when code executes. Which AWS service should they use?",
    options: ["Amazon EC2", "AWS Lambda", "AWS Batch", "Amazon ECS"],
    correctAnswer: 1,
    explanation:
      "AWS Lambda is a serverless compute service perfect for event-driven workloads. It automatically scales, supports multiple event sources (API Gateway, S3, DynamoDB Streams, etc.), and you pay only for compute time used. Lambda functions can run up to 15 minutes, matching the requirement.",
    incorrectExplanations: [
      "EC2 requires server management and you pay for running instances even when idle.",
      "AWS Batch is for batch computing jobs, not event-driven functions.",
      "ECS requires container management and isn't serverless without Fargate.",
    ],
    relatedServices: ["Lambda", "API Gateway", "Step Functions"],
    tags: ["serverless", "lambda", "event-driven", "functions"],
  },
  {
    id: "47",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company needs to aggregate security findings from multiple AWS services (GuardDuty, Inspector, Macie, IAM Access Analyzer) into a single dashboard. They want to prioritize findings and automate remediation. Which AWS service should they use?",
    options: ["AWS CloudWatch", "AWS Security Hub", "AWS Config", "AWS CloudTrail"],
    correctAnswer: 1,
    explanation:
      "AWS Security Hub provides a comprehensive view of security alerts and compliance status across AWS accounts. It aggregates findings from GuardDuty, Inspector, Macie, Firewall Manager, and third-party tools. Security Hub prioritizes findings, provides automated compliance checks, and supports automated remediation through EventBridge.",
    incorrectExplanations: [
      "CloudWatch monitors operational metrics, not security findings aggregation.",
      "Config tracks resource configurations but doesn't aggregate security findings.",
      "CloudTrail logs API activity but doesn't aggregate or prioritize security findings.",
    ],
    relatedServices: ["Security Hub", "GuardDuty", "Inspector", "Macie"],
    tags: ["security", "compliance", "security-hub", "aggregation"],
  },
  {
    id: "48",
    domain: "Monitoring and Optimization",
    difficulty: "advanced",
    scenario:
      "A company runs a complex application with dependencies on multiple AWS services. They want to understand how changes to one service might impact others and visualize the relationships between their resources. Which AWS feature helps with this?",
    options: [
      "AWS X-Ray Service Map",
      "CloudWatch Container Insights",
      "AWS Resource Groups",
      "AWS Systems Manager Inventory",
    ],
    correctAnswer: 0,
    explanation:
      "AWS X-Ray Service Map provides a visual representation of your application's components and their connections. It shows how services interact, where errors occur, and how latency propagates through your system. This helps understand the impact of changes and identify dependencies.",
    incorrectExplanations: [
      "Container Insights is specifically for container metrics, not application-wide service mapping.",
      "Resource Groups organize resources by tags but don't show runtime dependencies.",
      "Systems Manager Inventory tracks installed software, not service relationships.",
    ],
    relatedServices: ["X-Ray", "CloudWatch", "ServiceLens"],
    tags: ["tracing", "service-map", "dependencies", "visualization"],
  },
  {
    id: "49",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A company is planning their cloud transformation and needs to establish financial management processes for their AWS spending. They want to implement chargeback mechanisms and optimize cloud costs across departments. According to the AWS Cloud Adoption Framework (CAF), which perspective addresses these requirements?",
    options: ["Business Perspective", "Governance Perspective", "Platform Perspective", "Operations Perspective"],
    correctAnswer: 1,
    explanation:
      "The Governance Perspective of AWS CAF focuses on orchestrating cloud initiatives while managing risk. It includes Cloud Financial Management capability, which covers budgeting, cost allocation, and chargeback mechanisms. Other capabilities include Program & Project Management, Risk Management, and Application Portfolio Management.",
    incorrectExplanations: [
      "Business Perspective focuses on business value and ROI, not the detailed financial governance.",
      "Platform Perspective focuses on building the technical cloud platform.",
      "Operations Perspective focuses on delivering services at agreed service levels.",
    ],
    relatedServices: ["AWS Organizations", "Cost Explorer", "AWS Budgets"],
    tags: ["caf", "governance", "cloud-financial-management", "transformation"],
  },
  {
    id: "50",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A company is migrating to AWS and wants to assess which existing applications should be migrated, modernized, or retired. They need to manage their application inventory systematically. According to AWS CAF, which perspective and capability addresses this?",
    options: [
      "Business Perspective - Benefits Realization",
      "Governance Perspective - Application Portfolio Management",
      "Platform Perspective - Modern Application Development",
      "Operations Perspective - Application Management",
    ],
    correctAnswer: 1,
    explanation:
      "Application Portfolio Management is a capability under the Governance Perspective in AWS CAF. It involves assessing and categorizing applications to determine migration strategies (7 Rs), identifying applications for modernization, and deciding which to retire. This is distinct from Application Management in Operations (day-to-day operations).",
    incorrectExplanations: [
      "Benefits Realization measures business outcomes, not application assessment.",
      "Modern Application Development is about building new applications, not assessing existing portfolio.",
      "Application Management in Operations handles day-to-day operations of applications, not strategic portfolio decisions.",
    ],
    relatedServices: ["AWS Migration Hub", "Application Discovery Service"],
    tags: ["caf", "governance", "portfolio-management", "migration"],
  },
  {
    id: "51",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company wants to establish a culture of continuous improvement and innovation as part of their cloud transformation. They need to develop cloud skills across their workforce and transform organizational mindsets. According to AWS CAF, which perspective addresses these needs?",
    options: ["Business Perspective", "People Perspective", "Governance Perspective", "Security Perspective"],
    correctAnswer: 1,
    explanation:
      "The People Perspective focuses on evolving culture, organizational structure, and leadership to support cloud transformation. Key capabilities include Culture Evolution, Cloud Fluency (skills development), Workforce Transformation, Change Acceleration, and Transformational Leadership. This perspective addresses the human side of cloud adoption.",
    incorrectExplanations: [
      "Business Perspective focuses on business outcomes and IT-business alignment.",
      "Governance Perspective focuses on managing risk and financial governance.",
      "Security Perspective focuses on data protection and security controls.",
    ],
    relatedServices: ["AWS Training and Certification", "AWS Skill Builder"],
    tags: ["caf", "people", "culture", "workforce", "transformation"],
  },
  {
    id: "52",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company storing customer data needs to implement threat detection, vulnerability scanning, and incident response capabilities. According to the AWS CAF Security Perspective, which capabilities should they focus on? (Select the most comprehensive answer)",
    options: [
      "Only Identity & Access Management",
      "Threat Detection, Vulnerability Management, and Incident Response",
      "Only Data Protection and Infrastructure Protection",
      "Only Security Governance and Compliance",
    ],
    correctAnswer: 1,
    explanation:
      "The Security Perspective in AWS CAF includes multiple capabilities: Threat Detection (using services like GuardDuty), Vulnerability Management (using Inspector), and Incident Response (using Security Hub, Detective). Together these provide comprehensive security monitoring and response capabilities as specified in the scenario.",
    incorrectExplanations: [
      "IAM alone doesn't address threat detection or incident response.",
      "Data and Infrastructure Protection are important but don't cover threat detection or incident response.",
      "Governance and Compliance are strategic, not operational security capabilities.",
    ],
    relatedServices: ["GuardDuty", "Inspector", "Security Hub", "Detective"],
    tags: ["caf", "security", "threat-detection", "incident-response"],
  },
  {
    id: "53",
    domain: "Deployment and Operations",
    difficulty: "advanced",
    scenario:
      "A company wants to implement automated monitoring, event correlation, and self-healing infrastructure. According to the AWS CAF Operations Perspective, which capability specifically addresses using AI and machine learning for operational intelligence?",
    options: [
      "Observability",
      "Event Management (AIOps)",
      "Incident & Problem Management",
      "Performance & Capacity Management",
    ],
    correctAnswer: 1,
    explanation:
      "Event Management (AIOps) in the Operations Perspective specifically focuses on using AI and machine learning to correlate events, predict issues, and automate responses. This includes intelligent alerting, anomaly detection, and automated remediation. Observability provides the data, but AIOps provides the intelligent analysis.",
    incorrectExplanations: [
      "Observability collects metrics, logs, and traces but doesn't include AI analysis.",
      "Incident & Problem Management handles reactive response, not predictive AI capabilities.",
      "Performance & Capacity Management focuses on resource optimization, not AI-driven operations.",
    ],
    relatedServices: ["CloudWatch", "DevOps Guru", "Systems Manager"],
    tags: ["caf", "operations", "aiops", "automation"],
  },
  {
    id: "54",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company is migrating to AWS and has an on-premises Oracle database. They want to move to AWS but the application is not compatible with any AWS-native database. They decide to keep using Oracle but run it on EC2 instances instead of their on-premises servers. Which migration strategy (from the 7 Rs) is this?",
    options: ["Rehost (Lift and Shift)", "Replatform", "Repurchase", "Refactor"],
    correctAnswer: 0,
    explanation:
      "Rehost (Lift and Shift) means moving applications to the cloud without modifications. Running Oracle on EC2 instead of on-premises servers is a classic lift-and-shift - same application, same database, just running on AWS infrastructure instead of on-premises hardware.",
    incorrectExplanations: [
      "Replatform involves making minor optimizations (like moving to RDS), not just moving servers.",
      "Repurchase means switching to a different product (like SaaS), not moving existing software.",
      "Refactor means re-architecting the application for cloud-native features.",
    ],
    relatedServices: ["EC2", "Migration Hub", "Application Migration Service"],
    tags: ["migration", "7rs", "rehost", "lift-and-shift"],
  },
  {
    id: "55",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company has an on-premises MySQL database and wants to migrate to AWS. They decide to move to Amazon RDS for MySQL, which reduces their operational overhead but requires some configuration changes for the managed service. Which migration strategy is this?",
    options: ["Rehost", "Replatform (Lift, Tinker, and Shift)", "Refactor", "Retire"],
    correctAnswer: 1,
    explanation:
      "Replatform (Lift, Tinker, and Shift) involves making some optimizations during migration to achieve tangible benefits without changing the core architecture. Moving from self-managed MySQL to RDS MySQL is replatforming - same database engine, but now AWS-managed with some configuration adjustments.",
    incorrectExplanations: [
      "Rehost would be running MySQL on EC2 exactly as before, not using managed RDS.",
      "Refactor would involve changing to a different architecture (like DynamoDB or Aurora Serverless).",
      "Retire means decommissioning applications no longer needed.",
    ],
    relatedServices: ["RDS", "Database Migration Service"],
    tags: ["migration", "7rs", "replatform", "database"],
  },
  {
    id: "56",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company uses an on-premises CRM system that requires significant maintenance. Instead of migrating it, they decide to switch to Salesforce (a SaaS solution). Which migration strategy (from the 7 Rs) does this represent?",
    options: ["Rehost", "Replatform", "Repurchase", "Refactor"],
    correctAnswer: 2,
    explanation:
      "Repurchase means moving to a different product, typically a SaaS solution. Switching from an on-premises CRM to Salesforce is repurchasing - you're not migrating the existing application but buying a new solution that replaces its functionality.",
    incorrectExplanations: [
      "Rehost means moving the same application to cloud infrastructure.",
      "Replatform means making minor optimizations while keeping the same product.",
      "Refactor means re-architecting the existing application for cloud-native.",
    ],
    relatedServices: ["AWS Marketplace"],
    tags: ["migration", "7rs", "repurchase", "saas"],
  },
  {
    id: "57",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A company is migrating to AWS and discovers that one of their legacy applications is only used by 5 people and duplicates functionality available in another system. What migration strategy should they apply?",
    options: ["Retain", "Retire", "Rehost", "Relocate"],
    correctAnswer: 1,
    explanation:
      "Retire means decommissioning applications that are no longer useful. If an application has minimal users and duplicate functionality exists elsewhere, retiring it reduces migration effort, costs, and technical debt. Not every application needs to be migrated.",
    incorrectExplanations: [
      "Retain is for applications you're not ready to migrate yet, not ones to decommission.",
      "Rehost would waste effort on an application that should be retired.",
      "Relocate is for moving to AWS Outposts or VMware Cloud on AWS.",
    ],
    relatedServices: ["Migration Hub", "Application Discovery Service"],
    tags: ["migration", "7rs", "retire", "rationalization"],
  },
  {
    id: "58",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company wants to build a GraphQL API that automatically synchronizes data between a mobile app, web app, and backend databases in real-time. Which AWS service provides managed GraphQL APIs with real-time data synchronization?",
    options: ["Amazon API Gateway", "AWS AppSync", "AWS Lambda", "Amazon EventBridge"],
    correctAnswer: 1,
    explanation:
      "AWS AppSync is a fully managed service for building GraphQL APIs. It provides real-time data synchronization across devices and offline data access. AppSync integrates with DynamoDB, Lambda, and other data sources, making it ideal for mobile and web apps needing real-time updates.",
    incorrectExplanations: [
      "API Gateway supports REST and WebSocket APIs but doesn't provide native GraphQL support.",
      "Lambda is for serverless functions, not API management.",
      "EventBridge is for event routing, not building GraphQL APIs.",
    ],
    relatedServices: ["AppSync", "DynamoDB", "Cognito"],
    tags: ["appsync", "graphql", "real-time", "mobile"],
  },
  {
    id: "59",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to run containers without managing EC2 instances or clusters. They want to just define their container images and resource requirements, and have AWS handle all infrastructure management. Which service should they use?",
    options: ["Amazon ECS on EC2", "Amazon EKS on EC2", "AWS Fargate", "Amazon Lightsail Containers"],
    correctAnswer: 2,
    explanation:
      "AWS Fargate is a serverless compute engine for containers that works with ECS and EKS. With Fargate, you don't need to provision, configure, or scale clusters of virtual machines. You just specify your container requirements and Fargate handles all infrastructure management.",
    incorrectExplanations: [
      "ECS on EC2 requires you to manage EC2 instances in your cluster.",
      "EKS on EC2 requires managing both Kubernetes and EC2 instances.",
      "Lightsail Containers is simplified but not as flexible as Fargate for production workloads.",
    ],
    relatedServices: ["Fargate", "ECS", "EKS"],
    tags: ["fargate", "serverless", "containers", "managed-service"],
  },
  {
    id: "60",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A financial services company needs to process high-volume streaming data from trading systems. They want a fully managed service compatible with Apache Kafka without managing Kafka clusters themselves. Which AWS service should they use?",
    options: [
      "Amazon Kinesis Data Streams",
      "Amazon MSK (Managed Streaming for Apache Kafka)",
      "Amazon SQS",
      "Amazon MQ",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon MSK (Managed Streaming for Apache Kafka) provides fully managed Apache Kafka service. It handles cluster provisioning, patching, and management while maintaining compatibility with existing Kafka applications. MSK is ideal for organizations already using Kafka or needing Kafka-specific features.",
    incorrectExplanations: [
      "Kinesis is AWS-native streaming but not Kafka-compatible.",
      "SQS is a message queue service, not a streaming platform like Kafka.",
      "MQ is for traditional message brokers (ActiveMQ, RabbitMQ), not Kafka workloads.",
    ],
    relatedServices: ["MSK", "Kinesis", "MSK Connect"],
    tags: ["msk", "kafka", "streaming", "managed-service"],
  },
  {
    id: "61",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A company wants to use Chef or Puppet for configuration management of their EC2 instances. They need a managed service that handles the Chef/Puppet servers. Which AWS service provides this?",
    options: ["AWS Systems Manager", "AWS OpsWorks", "AWS CloudFormation", "AWS Config"],
    correctAnswer: 1,
    explanation:
      "AWS OpsWorks is a configuration management service that provides managed instances of Chef and Puppet. OpsWorks Stacks uses Chef, and OpsWorks for Puppet Enterprise uses Puppet. It automates server configuration, deployment, and management using these popular tools.",
    incorrectExplanations: [
      "Systems Manager provides AWS-native automation, not Chef/Puppet management.",
      "CloudFormation is for infrastructure provisioning, not configuration management.",
      "Config tracks resource configuration changes, not configuration management.",
    ],
    relatedServices: ["OpsWorks", "Chef", "Puppet"],
    tags: ["opsworks", "configuration-management", "chef", "puppet"],
  },
  {
    id: "62",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company wants to convert text to lifelike speech for their customer service application. They need support for multiple languages and natural-sounding voices. Which AWS service provides text-to-speech capabilities?",
    options: ["Amazon Transcribe", "Amazon Polly", "Amazon Comprehend", "Amazon Lex"],
    correctAnswer: 1,
    explanation:
      "Amazon Polly is a text-to-speech service that converts text into lifelike speech. It supports dozens of languages and voices, including neural text-to-speech for extremely natural speech. Polly is used for applications like audiobooks, accessibility features, and voice assistants.",
    incorrectExplanations: [
      "Transcribe converts speech to text (opposite of Polly).",
      "Comprehend analyzes text for sentiment and entities, not speech conversion.",
      "Lex is for building conversational chatbots, not text-to-speech.",
    ],
    relatedServices: ["Polly", "Transcribe", "Lex"],
    tags: ["polly", "text-to-speech", "ai-ml", "speech"],
  },
  {
    id: "63",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A development team needs to securely store database passwords, API keys, and other secrets. They want automatic rotation of these credentials without changing application code. Which AWS service should they use?",
    options: ["AWS Systems Manager Parameter Store", "AWS Secrets Manager", "AWS KMS", "Amazon Cognito"],
    correctAnswer: 1,
    explanation:
      "AWS Secrets Manager is designed specifically for managing secrets like database credentials and API keys. It provides automatic rotation of secrets for supported databases (RDS, Redshift, DocumentDB) without application changes. Secrets Manager encrypts secrets using KMS and integrates with IAM for access control.",
    incorrectExplanations: [
      "Parameter Store can store secrets but doesn't provide automatic rotation.",
      "KMS manages encryption keys, not secrets/credentials themselves.",
      "Cognito handles user authentication, not application secrets.",
    ],
    relatedServices: ["Secrets Manager", "KMS", "RDS"],
    tags: ["secrets-manager", "security", "credentials", "rotation"],
  },
  {
    id: "64",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company runs an application on Amazon RDS. A third-party auditor asks who is responsible for patching the database engine. According to the Shared Responsibility Model, who handles this?",
    options: [
      "The customer is fully responsible",
      "AWS is responsible for patching the database engine",
      "The third-party auditor is responsible",
      "Shared equally between customer and AWS",
    ],
    correctAnswer: 1,
    explanation:
      "For managed services like RDS, AWS is responsible for patching the underlying database engine, operating system, and infrastructure. The customer is responsible for data security, managing access, and configuring security groups. This differs from EC2 where customers patch everything above the hypervisor.",
    incorrectExplanations: [
      "Customers don't patch RDS engines - that's why it's a managed service.",
      "Auditors review security but don't perform operational tasks.",
      "Database engine patching is not shared - AWS handles it entirely for RDS.",
    ],
    relatedServices: ["RDS", "EC2"],
    tags: ["shared-responsibility", "rds", "patching", "security"],
  },
  {
    id: "65",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company uses EC2 instances and has contracted a third-party vendor to manage their applications. A security vulnerability is found in the application code. According to the Shared Responsibility Model, who is responsible for fixing it?",
    options: [
      "AWS is responsible",
      "The customer (or their vendor acting on their behalf)",
      "The third-party vendor independently",
      "No one - application code is not covered",
    ],
    correctAnswer: 1,
    explanation:
      "Under the Shared Responsibility Model, customers are responsible for security 'in' the cloud, including application code, data, and configurations. If a customer hires a vendor to manage their applications, the customer is still ultimately responsible - the vendor acts on their behalf but doesn't change the responsibility boundary.",
    incorrectExplanations: [
      "AWS is responsible for security 'of' the cloud (infrastructure), not application code.",
      "The vendor acts as an agent of the customer, not as an independent responsible party.",
      "Application security is definitely covered - it's the customer's responsibility.",
    ],
    relatedServices: ["EC2", "IAM", "CloudTrail"],
    tags: ["shared-responsibility", "ec2", "application-security", "vendor"],
  },
  // MULTI-SELECT QUESTIONS
  {
    id: "66",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to protect their web application from common web exploits and DDoS attacks. Which TWO AWS services should they implement together for comprehensive protection?",
    options: ["AWS WAF", "AWS Shield", "Amazon Inspector", "AWS Config"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS WAF protects against common web exploits like SQL injection and cross-site scripting by filtering HTTP/HTTPS requests. AWS Shield provides DDoS protection - Shield Standard is free and protects against most common attacks, while Shield Advanced provides enhanced protection with 24/7 DDoS response team access.",
    incorrectExplanations: [
      "Inspector assesses EC2 instances for vulnerabilities, not web application protection.",
      "Config tracks resource configuration changes, not real-time attack protection.",
    ],
    relatedServices: ["WAF", "Shield", "CloudFront"],
    tags: ["security", "waf", "ddos", "shield", "multi-select"],
  },
  {
    id: "67",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company wants to migrate their on-premises MySQL database to AWS with minimal downtime. Which TWO AWS services can help with this database migration?",
    options: [
      "AWS Database Migration Service (DMS)",
      "AWS Schema Conversion Tool (SCT)",
      "Amazon CloudWatch",
      "AWS Direct Connect",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS DMS migrates databases to AWS with minimal downtime by continuously replicating changes. AWS SCT converts database schemas when migrating between different database engines. Together they provide a complete migration solution for database workloads.",
    incorrectExplanations: [
      "CloudWatch monitors resources but doesn't migrate databases.",
      "Direct Connect provides dedicated network connections but doesn't migrate data.",
    ],
    relatedServices: ["DMS", "SCT", "RDS"],
    tags: ["migration", "database", "dms", "multi-select"],
  },
  {
    id: "68",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "Which TWO of the following are benefits of using AWS Cloud compared to on-premises infrastructure?",
    options: [
      "Trade capital expense for variable expense",
      "Benefit from massive economies of scale",
      "Guaranteed 100% uptime",
      "No need for any security measures",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS allows you to pay only for what you use (OpEx vs CapEx) and benefit from AWS's massive scale which lowers costs. However, no service guarantees 100% uptime, and security is a shared responsibility - customers still need security measures.",
    incorrectExplanations: [
      "No cloud provider guarantees 100% uptime - AWS SLAs typically guarantee 99.9-99.99%.",
      "Security is a shared responsibility - customers are responsible for security IN the cloud.",
    ],
    relatedServices: ["All AWS Services"],
    tags: ["cloud-concepts", "benefits", "cost", "multi-select"],
  },
  {
    id: "69",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A company wants to reduce costs for their development and test environments that run 8 hours a day, 5 days a week. Which TWO strategies would be most effective?",
    options: [
      "Use Spot Instances for fault-tolerant workloads",
      "Schedule instances to stop outside business hours",
      "Purchase 3-year Reserved Instances",
      "Migrate to Dedicated Hosts",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Spot Instances offer up to 90% discount and are perfect for dev/test workloads that can tolerate interruptions. Scheduling instances to stop when not needed (evenings/weekends) eliminates costs during idle time. Together these can reduce dev/test costs by 70-90%.",
    incorrectExplanations: [
      "Reserved Instances require 24/7 usage to be cost-effective - not suitable for part-time workloads.",
      "Dedicated Hosts are more expensive and used for licensing/compliance, not cost savings.",
    ],
    relatedServices: ["EC2", "Instance Scheduler", "Auto Scaling"],
    tags: ["cost-optimization", "spot", "scheduling", "multi-select"],
  },
  {
    id: "70",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A security team needs to detect and investigate potential security threats across their AWS environment. Which TWO services provide threat detection and security investigation capabilities?",
    options: ["Amazon GuardDuty", "Amazon Detective", "AWS Trusted Advisor", "AWS Cost Explorer"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Amazon GuardDuty uses machine learning to detect threats by analyzing CloudTrail, VPC Flow Logs, and DNS logs. Amazon Detective helps investigate security findings by automatically collecting and analyzing log data to identify the root cause of potential security issues.",
    incorrectExplanations: [
      "Trusted Advisor provides best practice recommendations, not threat detection.",
      "Cost Explorer analyzes costs, not security threats.",
    ],
    relatedServices: ["GuardDuty", "Detective", "Security Hub"],
    tags: ["security", "threat-detection", "guardduty", "detective", "multi-select"],
  },
  {
    id: "71",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to store files that must be accessible from multiple EC2 instances simultaneously. Which TWO storage services support concurrent access from multiple instances?",
    options: ["Amazon EFS", "Amazon FSx", "Amazon EBS", "Instance Store"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Amazon EFS (Elastic File System) is a managed NFS file system that can be mounted by thousands of EC2 instances simultaneously. Amazon FSx provides managed file systems (Windows File Server, Lustre, NetApp, OpenZFS) that also support concurrent access from multiple instances.",
    incorrectExplanations: [
      "EBS volumes can only be attached to one EC2 instance at a time (except Multi-Attach for io1/io2).",
      "Instance Store is ephemeral storage tied to a single instance.",
    ],
    relatedServices: ["EFS", "FSx", "EBS"],
    tags: ["storage", "efs", "fsx", "shared-storage", "multi-select"],
  },
  {
    id: "72",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A DevOps team wants to trace requests through their microservices architecture to identify performance bottlenecks. Which TWO AWS services help with distributed tracing and application performance monitoring?",
    options: ["AWS X-Ray", "Amazon CloudWatch Application Insights", "AWS Config", "AWS CloudTrail"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS X-Ray traces requests as they travel through your application, showing a map of services and identifying latency issues. CloudWatch Application Insights provides automated dashboards and anomaly detection for application performance monitoring.",
    incorrectExplanations: [
      "Config tracks resource configuration, not application performance.",
      "CloudTrail logs API calls, not application request tracing.",
    ],
    relatedServices: ["X-Ray", "CloudWatch", "Lambda"],
    tags: ["monitoring", "tracing", "x-ray", "performance", "multi-select"],
  },
  {
    id: "73",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A company wants to automate the deployment of their infrastructure and ensure consistent environments across development, staging, and production. Which TWO AWS services support Infrastructure as Code?",
    options: ["AWS CloudFormation", "AWS CDK", "Amazon EC2", "Amazon S3"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS CloudFormation lets you define infrastructure in YAML or JSON templates. AWS CDK (Cloud Development Kit) lets you define infrastructure using familiar programming languages (TypeScript, Python, Java, etc.) and synthesizes to CloudFormation. Both enable Infrastructure as Code.",
    incorrectExplanations: [
      "EC2 is a compute service, not an IaC tool (though it can be provisioned by IaC).",
      "S3 is object storage, not an IaC tool (though it can be provisioned by IaC).",
    ],
    relatedServices: ["CloudFormation", "CDK", "Terraform"],
    tags: ["iac", "cloudformation", "cdk", "automation", "multi-select"],
  },
  // MORE SINGLE-SELECT QUESTIONS
  {
    id: "74",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "A company wants to ensure their application remains available even if a single server fails. Which AWS design principle should they follow?",
    options: [
      "Design for failure and nothing will fail",
      "Implement manual recovery procedures",
      "Use the largest possible instance size",
      "Keep all resources in a single location",
    ],
    correctAnswer: 0,
    explanation:
      "The AWS Well-Architected Framework emphasizes 'Design for failure' - assume components will fail and architect systems to automatically recover. Use multiple AZs, Auto Scaling, and self-healing architectures rather than relying on single points of failure.",
    incorrectExplanations: [
      "Manual recovery increases downtime and doesn't leverage cloud automation capabilities.",
      "Instance size doesn't address failure scenarios - any size instance can fail.",
      "Single location creates a single point of failure.",
    ],
    relatedServices: ["Auto Scaling", "ELB", "Route 53"],
    tags: ["well-architected", "reliability", "design-principles"],
  },
  {
    id: "75",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "According to the AWS Well-Architected Framework, which pillar focuses on protecting information, systems, and assets while delivering business value through risk assessment?",
    options: ["Operational Excellence", "Security", "Reliability", "Performance Efficiency"],
    correctAnswer: 1,
    explanation:
      "The Security pillar of the Well-Architected Framework focuses on protecting data, systems, and assets. It includes identity management, detective controls, infrastructure protection, data protection, and incident response - all while enabling business operations.",
    incorrectExplanations: [
      "Operational Excellence focuses on running and monitoring systems to deliver business value.",
      "Reliability focuses on workload ability to perform intended function correctly and consistently.",
      "Performance Efficiency focuses on using computing resources efficiently.",
    ],
    relatedServices: ["IAM", "KMS", "GuardDuty"],
    tags: ["well-architected", "security", "pillars"],
  },
  {
    id: "76",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario:
      "A startup is just beginning to use AWS and wants basic technical support with access to AWS documentation and forums. Which AWS Support plan should they choose?",
    options: ["Basic Support", "Developer Support", "Business Support", "Enterprise Support"],
    correctAnswer: 0,
    explanation:
      "Basic Support is free and includes 24/7 access to customer service, documentation, whitepapers, AWS re:Post community forums, and AWS Trusted Advisor (7 core checks). It's ideal for accounts just getting started or for non-production workloads.",
    incorrectExplanations: [
      "Developer Support costs money and provides more features than a startup just beginning may need.",
      "Business Support is for production workloads and costs significantly more.",
      "Enterprise Support is for mission-critical workloads with costs starting at $15,000/month.",
    ],
    relatedServices: ["AWS Support", "Trusted Advisor"],
    tags: ["support", "pricing", "basic-support"],
  },
  {
    id: "77",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A company runs production workloads on AWS and needs 24/7 phone access to Cloud Support Engineers with a response time of less than 1 hour for production system down issues. Which is the minimum support plan that meets these requirements?",
    options: ["Developer Support", "Business Support", "Enterprise Support", "Basic Support"],
    correctAnswer: 1,
    explanation:
      "Business Support provides 24/7 phone, email, and chat access to Cloud Support Engineers. It includes a less than 1-hour response time for production system down cases. Enterprise Support offers faster response times but Business Support is the minimum plan meeting these requirements.",
    incorrectExplanations: [
      "Developer Support only provides business hours access and email support, not 24/7 phone.",
      "Enterprise Support exceeds the requirements and costs more.",
      "Basic Support has no technical support access.",
    ],
    relatedServices: ["AWS Support"],
    tags: ["support", "pricing", "business-support"],
  },
  {
    id: "78",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company needs a relational database that is compatible with MySQL but provides 5x better performance and automatic storage scaling up to 128TB. Which AWS service should they use?",
    options: ["Amazon RDS for MySQL", "Amazon Aurora", "Amazon DynamoDB", "Amazon Redshift"],
    correctAnswer: 1,
    explanation:
      "Amazon Aurora is a MySQL and PostgreSQL-compatible relational database with up to 5x the throughput of standard MySQL. It features automatic storage scaling up to 128TB, 6-way replication across 3 AZs, and continuous backup to S3 - all while being compatible with MySQL applications.",
    incorrectExplanations: [
      "RDS for MySQL provides standard MySQL performance without Aurora's enhancements.",
      "DynamoDB is a NoSQL database, not relational or MySQL-compatible.",
      "Redshift is a data warehouse for analytics, not an operational database.",
    ],
    relatedServices: ["Aurora", "RDS", "MySQL"],
    tags: ["database", "aurora", "mysql", "performance"],
  },
  {
    id: "79",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to cache frequently accessed data to reduce database load and improve application response times. The cache must support data structures like strings, hashes, and sorted sets. Which AWS service should they use?",
    options: ["Amazon ElastiCache for Redis", "Amazon DynamoDB DAX", "Amazon CloudFront", "Amazon S3"],
    correctAnswer: 0,
    explanation:
      "Amazon ElastiCache for Redis provides an in-memory data store supporting complex data structures (strings, hashes, lists, sets, sorted sets). It's ideal for caching, session storage, and real-time analytics with sub-millisecond latency.",
    incorrectExplanations: [
      "DAX is specifically for DynamoDB acceleration, not general-purpose caching.",
      "CloudFront caches static content at edge locations, not application data structures.",
      "S3 is object storage, not an in-memory cache.",
    ],
    relatedServices: ["ElastiCache", "Redis", "Memcached"],
    tags: ["caching", "elasticache", "redis", "performance"],
  },
  {
    id: "80",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to automatically discover and protect sensitive data like PII and financial information stored in their S3 buckets. Which AWS service uses machine learning to classify and protect sensitive data?",
    options: ["Amazon Inspector", "Amazon Macie", "AWS Config", "Amazon Detective"],
    correctAnswer: 1,
    explanation:
      "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data in S3. It identifies PII, financial data, and credentials, providing dashboards and alerts for data security monitoring and compliance.",
    incorrectExplanations: [
      "Inspector assesses EC2 instances for vulnerabilities, not S3 data classification.",
      "Config tracks resource configurations, not data content.",
      "Detective investigates security findings, not data discovery.",
    ],
    relatedServices: ["Macie", "S3", "Security Hub"],
    tags: ["security", "macie", "data-protection", "pii"],
  },
  {
    id: "81",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company needs to consolidate security findings from GuardDuty, Inspector, Macie, and third-party tools into a single dashboard with automated remediation workflows. Which AWS service provides this capability?",
    options: ["AWS CloudTrail", "AWS Security Hub", "Amazon Detective", "AWS Config"],
    correctAnswer: 1,
    explanation:
      "AWS Security Hub provides a comprehensive view of security alerts and compliance status across AWS accounts. It aggregates findings from GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer, and third-party tools. It supports automated remediation through EventBridge rules.",
    incorrectExplanations: [
      "CloudTrail logs API calls but doesn't aggregate security findings.",
      "Detective helps investigate specific findings, not aggregate them.",
      "Config tracks resource compliance but doesn't aggregate multi-service security findings.",
    ],
    relatedServices: ["Security Hub", "GuardDuty", "Inspector", "Macie"],
    tags: ["security", "security-hub", "compliance", "aggregation"],
  },
  {
    id: "82",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario:
      "A company wants to understand how much of their current infrastructure utilization is being used in their data center before migrating to AWS. Which AWS service helps with this discovery and planning?",
    options: [
      "AWS Migration Hub",
      "AWS Application Discovery Service",
      "AWS Server Migration Service",
      "AWS DataSync",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Application Discovery Service collects information about on-premises servers including configuration, usage, and behavior data. This helps plan migrations by understanding current utilization, dependencies, and performance requirements.",
    incorrectExplanations: [
      "Migration Hub tracks migration progress but doesn't perform initial discovery.",
      "Server Migration Service migrates VMs, doesn't discover infrastructure details.",
      "DataSync transfers data, doesn't discover infrastructure.",
    ],
    relatedServices: ["Application Discovery Service", "Migration Hub"],
    tags: ["migration", "discovery", "planning"],
  },
  {
    id: "83",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to run batch computing jobs that process large amounts of data. The jobs can take hours to complete and can be interrupted and restarted. Which AWS service is purpose-built for batch computing workloads?",
    options: ["AWS Lambda", "AWS Batch", "Amazon EC2", "AWS Step Functions"],
    correctAnswer: 1,
    explanation:
      "AWS Batch is a fully managed service that enables you to run batch computing workloads on AWS. It dynamically provisions the optimal quantity and type of compute resources based on job requirements. Batch handles job scheduling, retries, and can use Spot Instances for cost savings.",
    incorrectExplanations: [
      "Lambda has 15-minute timeout, unsuitable for hours-long batch jobs.",
      "EC2 requires manual management of compute resources and job scheduling.",
      "Step Functions orchestrates workflows but doesn't manage compute resources for batch processing.",
    ],
    relatedServices: ["Batch", "EC2", "Fargate"],
    tags: ["batch", "compute", "processing"],
  },
  {
    id: "84",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A company wants to automate the creation of machine images that include their application code and configurations. They need to create identical AMIs for multiple AWS regions. Which AWS service should they use?",
    options: ["AWS CloudFormation", "EC2 Image Builder", "AWS Systems Manager", "AWS CodeDeploy"],
    correctAnswer: 1,
    explanation:
      "EC2 Image Builder automates the creation, testing, and distribution of VM images. It creates a pipeline for building custom AMIs with your software, applies security patches, runs tests, and distributes images to multiple regions. This ensures consistent, secure, up-to-date images.",
    incorrectExplanations: [
      "CloudFormation provisions infrastructure but doesn't build AMIs.",
      "Systems Manager can run commands but doesn't provide automated image building pipelines.",
      "CodeDeploy deploys applications to existing instances, doesn't create AMIs.",
    ],
    relatedServices: ["EC2 Image Builder", "EC2", "AMI"],
    tags: ["image-builder", "ami", "automation", "deployment"],
  },
  {
    id: "85",
    domain: "Monitoring and Optimization",
    difficulty: "beginner",
    scenario:
      "A company wants to receive recommendations on how to improve their AWS environment in terms of cost, performance, security, and fault tolerance. Which AWS service provides these best practice recommendations?",
    options: ["AWS CloudWatch", "AWS Trusted Advisor", "AWS Config", "AWS Inspector"],
    correctAnswer: 1,
    explanation:
      "AWS Trusted Advisor inspects your AWS environment and provides real-time recommendations in five categories: cost optimization, performance, security, fault tolerance, and service limits. It checks against AWS best practices and helps optimize your infrastructure.",
    incorrectExplanations: [
      "CloudWatch monitors metrics and logs but doesn't provide best practice recommendations.",
      "Config tracks configuration changes and compliance with specific rules.",
      "Inspector assesses EC2 instance security vulnerabilities, not overall AWS best practices.",
    ],
    relatedServices: ["Trusted Advisor", "AWS Support"],
    tags: ["trusted-advisor", "optimization", "best-practices"],
  },
  {
    id: "86",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A company with multiple AWS accounts wants to share Reserved Instance discounts across all accounts and receive a single consolidated bill. Which AWS service provides these capabilities?",
    options: ["AWS Cost Explorer", "AWS Organizations", "AWS Budgets", "AWS Cost and Usage Report"],
    correctAnswer: 1,
    explanation:
      "AWS Organizations enables consolidated billing across multiple AWS accounts. Reserved Instance and Savings Plan discounts are automatically shared across all accounts in the organization, maximizing utilization. You receive a single bill while maintaining account-level cost visibility.",
    incorrectExplanations: [
      "Cost Explorer analyzes costs but doesn't consolidate billing.",
      "Budgets set spending alerts but don't consolidate billing.",
      "Cost and Usage Report provides detailed billing data but doesn't enable sharing discounts.",
    ],
    relatedServices: ["Organizations", "Consolidated Billing"],
    tags: ["organizations", "billing", "reserved-instances", "multi-account"],
  },
  {
    id: "87",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to build a data lake that can store structured, semi-structured, and unstructured data. They want to query this data using standard SQL without moving it. Which combination of AWS services is best suited for this?",
    options: [
      "Amazon S3 and Amazon Athena",
      "Amazon RDS and Amazon Redshift",
      "Amazon DynamoDB and Amazon EMR",
      "Amazon EBS and Amazon EC2",
    ],
    correctAnswer: 0,
    explanation:
      "Amazon S3 is ideal for data lake storage - it handles any data format at any scale with low cost. Amazon Athena allows you to query data directly in S3 using standard SQL without loading it into a database. Together they provide a serverless, cost-effective data lake solution.",
    incorrectExplanations: [
      "RDS and Redshift require data to be loaded into databases before querying.",
      "DynamoDB is NoSQL, EMR requires cluster management - neither is optimal for simple SQL queries on diverse data.",
      "EBS is block storage attached to EC2, not suitable for data lake architecture.",
    ],
    relatedServices: ["S3", "Athena", "Glue", "Lake Formation"],
    tags: ["data-lake", "athena", "s3", "analytics"],
  },
  {
    id: "88",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario:
      "A developer needs to grant their Lambda function permissions to read from a DynamoDB table. What is the recommended way to provide these permissions?",
    options: [
      "Hardcode AWS access keys in the Lambda function code",
      "Store access keys in environment variables",
      "Attach an IAM execution role to the Lambda function",
      "Make the DynamoDB table public",
    ],
    correctAnswer: 2,
    explanation:
      "IAM execution roles are the recommended way to grant Lambda functions permissions to AWS services. The role is automatically assumed by Lambda, providing temporary credentials. This is more secure than hardcoding keys and follows AWS best practices for least privilege.",
    incorrectExplanations: [
      "Hardcoding keys is a security anti-pattern and requires manual rotation.",
      "Environment variables with keys are slightly better but still require manual key management.",
      "Making resources public is a major security risk and violates least privilege.",
    ],
    relatedServices: ["Lambda", "IAM", "DynamoDB"],
    tags: ["security", "iam", "lambda", "best-practices"],
  },
  {
    id: "89",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to run SQL queries on data stored in Amazon S3 without loading it into a database. The data is in CSV and Parquet formats. Which AWS service allows serverless SQL queries directly on S3?",
    options: ["Amazon Redshift", "Amazon RDS", "Amazon Athena", "Amazon EMR"],
    correctAnswer: 2,
    explanation:
      "Amazon Athena is a serverless, interactive query service that makes it easy to analyze data directly in S3 using standard SQL. It supports various data formats including CSV, JSON, Parquet, and ORC. You pay only for the queries you run with no infrastructure to manage.",
    incorrectExplanations: [
      "Redshift requires loading data into a data warehouse.",
      "RDS is a relational database that requires data to be imported.",
      "EMR requires cluster management and is more complex than Athena for simple queries.",
    ],
    relatedServices: ["Athena", "S3", "Glue"],
    tags: ["athena", "serverless", "sql", "analytics"],
  },
  {
    id: "90",
    domain: "Deployment and Operations",
    difficulty: "beginner",
    scenario:
      "A company wants to quickly deploy a WordPress website on AWS without managing servers or infrastructure. They want a simple, low-cost solution. Which AWS service is best suited for this?",
    options: ["Amazon EC2", "Amazon Lightsail", "AWS Elastic Beanstalk", "Amazon EKS"],
    correctAnswer: 1,
    explanation:
      "Amazon Lightsail provides the easiest way to launch and manage virtual private servers. It offers pre-configured blueprints for common applications like WordPress, simple pricing, and includes compute, storage, and networking at predictable monthly prices - ideal for simple websites.",
    incorrectExplanations: [
      "EC2 requires more configuration and infrastructure management.",
      "Elastic Beanstalk is for deploying custom applications, overkill for simple WordPress.",
      "EKS is for Kubernetes container orchestration, far too complex for a simple website.",
    ],
    relatedServices: ["Lightsail", "EC2"],
    tags: ["lightsail", "wordpress", "simple-hosting"],
  },
  // More questions for comprehensive coverage
  {
    id: "91",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "Which of the following is a design principle of the AWS Well-Architected Framework's Operational Excellence pillar?",
    options: [
      "Perform operations as code",
      "Enable traceability",
      "Automatically recover from failure",
      "Use serverless architectures",
    ],
    correctAnswer: 0,
    explanation:
      "The Operational Excellence pillar emphasizes 'Perform operations as code' - define your entire workload as code and update operations with code. This enables consistent, repeatable operations and reduces human error. It includes using CloudFormation, CDK, and automation.",
    incorrectExplanations: [
      "Enable traceability is part of the Security pillar.",
      "Automatically recover from failure is part of the Reliability pillar.",
      "Use serverless architectures is part of the Performance Efficiency pillar.",
    ],
    relatedServices: ["CloudFormation", "Systems Manager", "CodePipeline"],
    tags: ["well-architected", "operational-excellence", "automation"],
  },
  {
    id: "92",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A solutions architect is designing a system that must handle 10x normal traffic during flash sales without performance degradation. According to the Reliability pillar, which approach should they take?",
    options: [
      "Scale up by using larger instance types",
      "Scale out by adding more resources horizontally",
      "Use a single powerful dedicated host",
      "Provision for peak capacity at all times",
    ],
    correctAnswer: 1,
    explanation:
      "The Reliability pillar recommends horizontal scaling (adding more resources) over vertical scaling (larger instances). Horizontal scaling provides better fault tolerance, eliminates single points of failure, and can scale more dynamically. Auto Scaling enables automatic horizontal scaling based on demand.",
    incorrectExplanations: [
      "Scaling up has limits and creates a single point of failure.",
      "A single dedicated host is a major single point of failure.",
      "Provisioning for peak wastes money during normal traffic periods.",
    ],
    relatedServices: ["Auto Scaling", "ELB", "EC2"],
    tags: ["well-architected", "reliability", "scaling"],
  },
  {
    id: "93",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to monitor and log all API calls made to their AWS account for security auditing and compliance purposes. Which AWS service provides this capability?",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon GuardDuty"],
    correctAnswer: 1,
    explanation:
      "AWS CloudTrail records all API calls made in your AWS account, including who made the call, when, from where, and what resources were affected. It's essential for security auditing, compliance, and operational troubleshooting. Logs can be stored in S3 and analyzed with Athena.",
    incorrectExplanations: [
      "CloudWatch monitors performance metrics and logs, not API calls.",
      "Config tracks resource configuration changes, not API calls.",
      "GuardDuty detects threats but doesn't log all API calls for auditing.",
    ],
    relatedServices: ["CloudTrail", "S3", "Athena"],
    tags: ["cloudtrail", "auditing", "compliance", "security"],
  },
  {
    id: "94",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario:
      "A company needs to deliver video content to users worldwide with low latency. Which AWS service provides a global content delivery network (CDN)?",
    options: ["Amazon S3", "Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53"],
    correctAnswer: 1,
    explanation:
      "Amazon CloudFront is a global content delivery network (CDN) that caches content at edge locations worldwide. It reduces latency by serving content from locations closest to users. CloudFront works with S3, EC2, ELB, and custom origins for both static and dynamic content.",
    incorrectExplanations: [
      "S3 stores content but doesn't provide global edge caching.",
      "Global Accelerator optimizes network paths but doesn't cache content.",
      "Route 53 is DNS service, not content delivery.",
    ],
    relatedServices: ["CloudFront", "S3", "Lambda@Edge"],
    tags: ["cloudfront", "cdn", "performance", "global"],
  },
  {
    id: "95",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario:
      "A company runs EC2 instances across multiple instance types and wants flexibility in how they commit to compute savings. They want discounts that apply across EC2, Fargate, and Lambda. Which pricing option provides this flexibility?",
    options: [
      "EC2 Reserved Instances",
      "Compute Savings Plans",
      "EC2 Instance Savings Plans",
      "Spot Instances",
    ],
    correctAnswer: 1,
    explanation:
      "Compute Savings Plans offer the most flexibility - discounts apply to any EC2 instance regardless of family, size, OS, tenancy, or region, plus Fargate and Lambda usage. They provide up to 66% savings with a commitment to consistent compute usage measured in $/hour.",
    incorrectExplanations: [
      "Reserved Instances are locked to specific instance types and don't cover Fargate/Lambda.",
      "EC2 Instance Savings Plans offer more savings but are locked to a specific instance family.",
      "Spot Instances offer the highest discounts but can be interrupted and don't cover Fargate/Lambda.",
    ],
    relatedServices: ["EC2", "Fargate", "Lambda", "Savings Plans"],
    tags: ["pricing", "savings-plans", "cost-optimization"],
  },
  {
    id: "96",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to run Windows-based file shares that are compatible with SMB protocol for their hybrid cloud environment. Which AWS service provides fully managed Windows file systems?",
    options: [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
      "AWS Storage Gateway",
    ],
    correctAnswer: 1,
    explanation:
      "Amazon FSx for Windows File Server provides fully managed Windows file systems with native SMB support, Windows NTFS, and Active Directory integration. It's ideal for Windows-based applications requiring shared file storage and supports hybrid cloud scenarios.",
    incorrectExplanations: [
      "EFS uses NFS protocol, not SMB, and doesn't support Windows natively.",
      "S3 is object storage without native file system protocol support.",
      "Storage Gateway is a hybrid service but FSx is the native AWS Windows file system.",
    ],
    relatedServices: ["FSx", "Directory Service", "Storage Gateway"],
    tags: ["fsx", "windows", "file-storage", "smb"],
  },
  {
    id: "97",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A company wants to coordinate multiple AWS Lambda functions into serverless workflows with branching logic, error handling, and retries. Which AWS service orchestrates serverless workflows?",
    options: ["Amazon EventBridge", "AWS Step Functions", "Amazon SQS", "AWS Lambda Layers"],
    correctAnswer: 1,
    explanation:
      "AWS Step Functions coordinates multiple Lambda functions into visual workflows. It provides built-in error handling, retries, parallelization, and branching logic using the Amazon States Language. Step Functions is ideal for complex orchestration of serverless applications.",
    incorrectExplanations: [
      "EventBridge routes events but doesn't orchestrate complex workflows.",
      "SQS provides message queuing, not workflow orchestration.",
      "Lambda Layers share code between functions, not orchestrate them.",
    ],
    relatedServices: ["Step Functions", "Lambda", "EventBridge"],
    tags: ["step-functions", "serverless", "orchestration", "workflows"],
  },
  {
    id: "98",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario:
      "A company wants to implement single sign-on (SSO) for their employees to access multiple AWS accounts and applications. Which AWS service provides centralized identity management and SSO?",
    options: ["Amazon Cognito", "AWS IAM Identity Center", "AWS Directory Service", "Amazon GuardDuty"],
    correctAnswer: 1,
    explanation:
      "AWS IAM Identity Center (formerly AWS SSO) provides centralized access management across multiple AWS accounts and business applications. It integrates with corporate directories and enables SSO using a user portal. It simplifies permission management across an AWS Organization.",
    incorrectExplanations: [
      "Cognito is for application user authentication, not employee SSO to AWS.",
      "Directory Service provides managed directories but doesn't provide SSO portal.",
      "GuardDuty is threat detection, not identity management.",
    ],
    relatedServices: ["IAM Identity Center", "Organizations", "Directory Service"],
    tags: ["sso", "identity", "iam-identity-center", "multi-account"],
  },
  {
    id: "99",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A company wants to analyze their EC2 instances and receive recommendations on the optimal instance types based on actual utilization patterns. Which AWS service provides these right-sizing recommendations?",
    options: [
      "AWS Trusted Advisor",
      "AWS Compute Optimizer",
      "Amazon CloudWatch",
      "AWS Cost Explorer",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Compute Optimizer analyzes your resource utilization and provides recommendations for optimal AWS resource types and sizes. It uses machine learning to analyze CloudWatch metrics and recommends right-sized EC2 instances, EBS volumes, and Lambda function configurations.",
    incorrectExplanations: [
      "Trusted Advisor provides general best practices but less detailed sizing recommendations.",
      "CloudWatch collects metrics but doesn't provide instance type recommendations.",
      "Cost Explorer shows costs but doesn't analyze utilization for right-sizing.",
    ],
    relatedServices: ["Compute Optimizer", "EC2", "CloudWatch"],
    tags: ["compute-optimizer", "right-sizing", "optimization", "cost"],
  },
  {
    id: "100",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to process and analyze clickstream data from their website in real-time. The data arrives continuously and must be transformed before loading into a data warehouse. Which AWS service provides managed ETL for streaming data?",
    options: [
      "Amazon Kinesis Data Firehose",
      "AWS Glue",
      "Amazon EMR",
      "AWS Data Pipeline",
    ],
    correctAnswer: 0,
    explanation:
      "Amazon Kinesis Data Firehose is the easiest way to load streaming data into data stores and analytics services. It can capture, transform, and deliver streaming data to S3, Redshift, Elasticsearch, and Splunk. Built-in transformations via Lambda enable real-time ETL without managing infrastructure.",
    incorrectExplanations: [
      "Glue is for batch ETL jobs, not real-time streaming data.",
      "EMR requires cluster management and is more complex for simple streaming ETL.",
      "Data Pipeline is for batch data movement, not real-time streaming.",
    ],
    relatedServices: ["Kinesis Data Firehose", "Kinesis Data Streams", "Redshift"],
    tags: ["kinesis", "streaming", "etl", "real-time"],
  },
  // Additional multi-select questions
  {
    id: "101",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "Which TWO of the following are design principles from the AWS Well-Architected Framework's Reliability pillar?",
    options: [
      "Test recovery procedures",
      "Automatically recover from failure",
      "Use serverless architectures",
      "Implement least privilege access",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "The Reliability pillar includes: Test recovery procedures (regularly test how your system recovers), and Automatically recover from failure (use automation to detect and recover from failures). Serverless is Performance Efficiency, and least privilege is Security.",
    incorrectExplanations: [
      "Use serverless architectures is a Performance Efficiency principle.",
      "Implement least privilege is a Security principle.",
    ],
    relatedServices: ["CloudWatch", "Auto Scaling", "Route 53"],
    tags: ["well-architected", "reliability", "design-principles", "multi-select"],
  },
  {
    id: "102",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which TWO AWS services help you understand, control, and optimize your AWS costs?",
    options: ["AWS Cost Explorer", "AWS Budgets", "Amazon CloudWatch", "AWS CloudTrail"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Cost Explorer visualizes and analyzes your costs and usage over time with filtering and forecasting. AWS Budgets lets you set custom budgets and receive alerts when actual or forecasted costs exceed thresholds. Together they provide comprehensive cost management.",
    incorrectExplanations: [
      "CloudWatch monitors resource performance, not costs.",
      "CloudTrail logs API activity, not cost information.",
    ],
    relatedServices: ["Cost Explorer", "Budgets", "Cost and Usage Report"],
    tags: ["cost-management", "budgets", "cost-explorer", "multi-select"],
  },
  {
    id: "103",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "Which TWO AWS services can automatically remediate non-compliant resources in your AWS environment?",
    options: ["AWS Config", "AWS Systems Manager Automation", "Amazon Inspector", "AWS CloudTrail"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Config can detect non-compliant resources using Config Rules and trigger automatic remediation using SSM Automation documents. AWS Systems Manager Automation provides pre-built and custom runbooks for automated remediation actions. Together they enable proactive compliance management.",
    incorrectExplanations: [
      "Inspector identifies vulnerabilities but doesn't automatically remediate them.",
      "CloudTrail logs activities but doesn't perform remediation.",
    ],
    relatedServices: ["Config", "Systems Manager", "Lambda"],
    tags: ["compliance", "remediation", "automation", "multi-select"],
  },
  {
    id: "104",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which TWO services can you use to securely connect your on-premises data center to your AWS VPC?",
    options: ["AWS Site-to-Site VPN", "AWS Direct Connect", "Amazon CloudFront", "Amazon Route 53"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Site-to-Site VPN creates encrypted tunnels over the public internet for quick, cost-effective connectivity. AWS Direct Connect provides dedicated private network connections for consistent performance and reduced bandwidth costs. Both securely extend your data center to AWS.",
    incorrectExplanations: [
      "CloudFront is a CDN for content delivery, not VPC connectivity.",
      "Route 53 is DNS service, not network connectivity.",
    ],
    relatedServices: ["VPN", "Direct Connect", "VPC"],
    tags: ["networking", "hybrid", "vpn", "direct-connect", "multi-select"],
  },
  {
    id: "105",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "Which TWO AWS services can be used to implement continuous integration and continuous delivery (CI/CD) pipelines?",
    options: ["AWS CodePipeline", "AWS CodeBuild", "Amazon S3", "Amazon RDS"],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS CodePipeline automates the build, test, and deploy phases of your release process. AWS CodeBuild compiles source code, runs tests, and produces deployable artifacts. Together with CodeCommit and CodeDeploy, they form a complete CI/CD solution.",
    incorrectExplanations: [
      "S3 can store artifacts but isn't a CI/CD service.",
      "RDS is a database service, not related to CI/CD.",
    ],
    relatedServices: ["CodePipeline", "CodeBuild", "CodeDeploy", "CodeCommit"],
    tags: ["devops", "cicd", "codepipeline", "codebuild", "multi-select"],
  },
  // ADDITIONAL PRACTICE QUESTIONS FROM USER SUBMISSIONS
  {
    id: "106",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which AWS Support plan provides architectural guidance contextual to your specific use-cases?",
    options: [
      "AWS Developer Support",
      "AWS Enterprise On-Ramp Support",
      "AWS Business Support",
      "AWS Enterprise Support",
    ],
    correctAnswer: 2,
    explanation:
      "AWS Business Support provides architectural guidance contextual to your specific use-cases through access to AWS Support Engineers. It also includes third-party software support, faster response times, and full access to Trusted Advisor checks - making it ideal for production workloads.",
    incorrectExplanations: [
      "Developer Support provides general guidance but not contextual architectural guidance.",
      "Enterprise On-Ramp has architectural support but Business Support is the minimum tier for contextual guidance.",
      "Enterprise Support offers the most comprehensive architectural guidance but Business meets the requirement.",
    ],
    relatedServices: ["AWS Support", "Trusted Advisor"],
    tags: ["support", "business-support", "architecture"],
  },
  {
    id: "107",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "A multi-national corporation wants to get expert professional advice on migrating to AWS and managing their applications on AWS Cloud. Which of the following entities would you recommend for this engagement?",
    options: [
      "AWS Trusted Advisor",
      "APN Technology Partner",
      "Concierge Support Team",
      "APN Consulting Partner",
    ],
    correctAnswer: 3,
    explanation:
      "APN Consulting Partners are professional services firms that help customers design, architect, build, migrate, and manage workloads on AWS. They provide deep expertise in cloud migration and application management, making them ideal for comprehensive multi-national migration projects.",
    incorrectExplanations: [
      "Trusted Advisor provides automated best practice checks, not migration consulting.",
      "Technology Partners provide software solutions, not consulting services.",
      "Concierge Support Team assists with billing and accounts for Enterprise Support customers.",
    ],
    relatedServices: ["AWS Partner Network", "AWS Professional Services"],
    tags: ["partners", "consulting", "migration"],
  },
  {
    id: "108",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario:
      "Which of the following AWS Support plans provide access to guidance, configuration, and troubleshooting of AWS interoperability with third-party software? (Select two)",
    options: [
      "AWS Developer Support",
      "AWS Business Support",
      "AWS Corporate Support",
      "AWS Basic Support",
      "AWS Enterprise Support",
    ],
    correctAnswer: [1, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Business Support and AWS Enterprise Support both provide access to guidance, configuration, and troubleshooting of AWS interoperability with third-party software. This includes popular technologies like databases, web servers, and application frameworks. Developer and Basic Support do not include third-party software support.",
    incorrectExplanations: [
      "Developer Support does not include third-party software troubleshooting.",
      "Corporate Support is not a real AWS Support plan.",
      "Basic Support includes no technical support access.",
    ],
    relatedServices: ["AWS Support"],
    tags: ["support", "third-party", "business-support", "enterprise-support", "multi-select"],
  },
  {
    id: "109",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which of the following AWS Support plans provide access to only core checks from the AWS Trusted Advisor Best Practice Checks? (Select two)",
    options: [
      "AWS Business Support",
      "AWS Enterprise Support",
      "AWS Developer Support",
      "AWS Enterprise On-Ramp Support",
      "AWS Basic Support",
    ],
    correctAnswer: [2, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Basic Support and AWS Developer Support provide access to only 7 core Trusted Advisor checks (S3 bucket permissions, security groups, IAM use, MFA on root account, EBS public snapshots, RDS public snapshots, and service limits). Business, Enterprise On-Ramp, and Enterprise Support provide access to all Trusted Advisor checks.",
    incorrectExplanations: [
      "Business Support provides full Trusted Advisor access.",
      "Enterprise Support provides full Trusted Advisor access.",
      "Enterprise On-Ramp Support provides full Trusted Advisor access.",
    ],
    relatedServices: ["Trusted Advisor", "AWS Support"],
    tags: ["support", "trusted-advisor", "core-checks", "multi-select"],
  },
  {
    id: "110",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A multi-national company has just moved its infrastructure from its on-premises data center to AWS Cloud. As part of the shared responsibility model, AWS is responsible for which of the following?",
    options: [
      "Configuring customer applications",
      "Service and Communications Protection or Zone Security",
      "Patching guest OS",
      "Physical and Environmental controls",
    ],
    correctAnswer: 3,
    explanation:
      "AWS is responsible for security 'of' the cloud, which includes physical infrastructure, environmental controls, hardware, and the foundational services. This includes data center security, power, cooling, and physical access controls. Customers are responsible for security 'in' the cloud.",
    incorrectExplanations: [
      "Configuring applications is customer responsibility.",
      "Zone security configuration is a shared responsibility depending on the service.",
      "Patching guest OS on EC2 is customer responsibility (AWS patches RDS engines).",
    ],
    relatedServices: ["All AWS Services"],
    tags: ["shared-responsibility", "physical-security", "infrastructure"],
  },
  {
    id: "111",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "Which of the following are correct statements regarding the AWS Global Infrastructure? (Select two)",
    options: [
      "Each Availability Zone (AZ) consists of two or more discrete data centers",
      "Each AWS Region consists of a minimum of two Availability Zones (AZ)",
      "Each AWS Region consists of two or more Edge Locations",
      "Each AWS Region consists of a minimum of three Availability Zones (AZ)",
      "Each Availability Zone (AZ) consists of one or more discrete data centers",
    ],
    correctAnswer: [3, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Each AWS Region consists of a minimum of three Availability Zones to provide high availability and fault tolerance. Each Availability Zone consists of one or more discrete data centers with redundant power, networking, and connectivity, all housed in separate facilities.",
    incorrectExplanations: [
      "AZs consist of one or more data centers, not always two or more.",
      "Regions have a minimum of three AZs, not two.",
      "Edge Locations are separate from Regions and AZs - they're part of CloudFront CDN network.",
    ],
    relatedServices: ["Global Infrastructure"],
    tags: ["global-infrastructure", "regions", "availability-zones", "multi-select"],
  },
  {
    id: "112",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario: "Which type of cloud computing does Amazon Elastic Compute Cloud (EC2) represent?",
    options: [
      "Network as a Service (NaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Infrastructure as a Service (IaaS)",
    ],
    correctAnswer: 3,
    explanation:
      "Amazon EC2 is Infrastructure as a Service (IaaS) - you get virtual machines and have full control over the operating system, networking, and storage. You're responsible for patching, scaling, and managing the infrastructure, but AWS manages the physical hardware.",
    incorrectExplanations: [
      "NaaS isn't a standard cloud computing model.",
      "PaaS (like Elastic Beanstalk) abstracts infrastructure management.",
      "SaaS (like Gmail) provides ready-to-use applications, not infrastructure.",
    ],
    relatedServices: ["EC2", "VPC"],
    tags: ["cloud-concepts", "iaas", "ec2", "service-models"],
  },
  {
    id: "113",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which of the following statements are CORRECT regarding the AWS VPC service? (Select two)",
    options: [
      "A Network Address Translation instance (NAT instance) is managed by AWS",
      "A Network Address Translation gateway (NAT gateway) is managed by AWS",
      "A Security Group can have both allow and deny rules",
      "A network access control list (network ACL) can have allow rules only",
      "A Security Group can have allow rules only",
    ],
    correctAnswer: [1, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "NAT gateways are fully managed by AWS (automatic scaling, high availability). Security Groups are stateful firewalls that only support allow rules - traffic is implicitly denied if not explicitly allowed. Network ACLs support both allow and deny rules, while NAT instances are customer-managed EC2 instances.",
    incorrectExplanations: [
      "NAT instances are customer-managed EC2 instances, not managed by AWS.",
      "Security Groups only support allow rules, no explicit deny rules.",
      "Network ACLs can have both allow and deny rules.",
    ],
    relatedServices: ["VPC", "NAT Gateway", "Security Groups", "Network ACL"],
    tags: ["vpc", "networking", "security-groups", "nat-gateway", "multi-select"],
  },
  {
    id: "114",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which of the following AWS services support VPC Gateway Endpoint for a private connection from a VPC? (Select two)",
    options: [
      "Amazon DynamoDB",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Simple Notification Service (SNS)",
      "Amazon Simple Queue Service (SQS)",
      "Amazon Elastic Compute Cloud (Amazon EC2)",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "VPC Gateway Endpoints are only available for Amazon S3 and Amazon DynamoDB. They allow private connectivity to these services without using internet gateways, NAT devices, VPN connections, or AWS Direct Connect. For other AWS services, you must use VPC Interface Endpoints (AWS PrivateLink).",
    incorrectExplanations: [
      "SNS requires Interface Endpoints (PrivateLink), not Gateway Endpoints.",
      "SQS requires Interface Endpoints (PrivateLink), not Gateway Endpoints.",
      "EC2 doesn't use VPC endpoints - instances are already in your VPC.",
    ],
    relatedServices: ["VPC", "S3", "DynamoDB", "VPC Endpoints"],
    tags: ["vpc", "endpoints", "gateway-endpoint", "s3", "dynamodb", "multi-select"],
  },
  {
    id: "115",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "An organization needs to securely access AWS services and establish private connectivity between its Virtual Private Clouds (VPCs) and supported AWS services without using the public internet. Which AWS services can meet this requirement? (Select two)",
    options: [
      "Amazon Inspector",
      "AWS Internet Gateway",
      "AWS PrivateLink",
      "Amazon Connect",
      "AWS Transit Gateway",
    ],
    correctAnswer: [2, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS PrivateLink provides private connectivity between VPCs and AWS services using Interface Endpoints, keeping traffic within the AWS network. AWS Transit Gateway connects multiple VPCs and on-premises networks through a central hub, enabling private connectivity without internet gateways.",
    incorrectExplanations: [
      "Inspector is a security assessment service, not a networking service.",
      "Internet Gateway enables public internet access, opposite of the requirement.",
      "Connect is a contact center service, not a networking service.",
    ],
    relatedServices: ["PrivateLink", "Transit Gateway", "VPC"],
    tags: ["networking", "privatelink", "transit-gateway", "private-connectivity", "multi-select"],
  },
  {
    id: "116",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which of the following is an AWS database service?",
    options: [
      "Amazon Redshift",
      "AWS Glue",
      "AWS Database Migration Service (AWS DMS)",
      "AWS Storage Gateway",
    ],
    correctAnswer: 0,
    explanation:
      "Amazon Redshift is a fully managed data warehouse database service designed for analytics and large-scale data processing using SQL. It's optimized for running complex queries on petabytes of structured data using columnar storage and parallel query execution.",
    incorrectExplanations: [
      "Glue is an ETL (Extract, Transform, Load) service, not a database.",
      "DMS migrates databases but isn't a database service itself.",
      "Storage Gateway is a hybrid storage service, not a database.",
    ],
    relatedServices: ["Redshift", "RDS", "DynamoDB"],
    tags: ["database", "redshift", "data-warehouse"],
  },
  {
    id: "117",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company wants to support active-active configuration in both the East and West US AWS regions using a NoSQL database. Which AWS database service is the right fit for this requirement?",
    options: [
      "Amazon Relational Database Service (Amazon RDS) for MYSQL",
      "Amazon DynamoDB with DynamoDB Accelerator",
      "Amazon Aurora with multi-master clusters",
      "Amazon DynamoDB with global tables",
    ],
    correctAnswer: 3,
    explanation:
      "Amazon DynamoDB with global tables provides multi-region, multi-master replication for active-active configurations. It automatically replicates data across selected AWS Regions with sub-second latency, allowing writes in any region with automatic conflict resolution.",
    incorrectExplanations: [
      "RDS for MySQL doesn't natively support active-active multi-region writes.",
      "DAX is a DynamoDB caching layer, not a multi-region solution.",
      "Aurora multi-master supports multiple write nodes but only within a single region.",
    ],
    relatedServices: ["DynamoDB", "Global Tables"],
    tags: ["database", "dynamodb", "global-tables", "multi-region", "active-active"],
  },
  {
    id: "118",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS services can be used to decouple components of a microservices based application on AWS Cloud? (Select two)",
    options: [
      "Amazon Simple Queue Service (SQS)",
      "AWS Lambda",
      "AWS Step Functions",
      "Amazon Elastic Compute Cloud (Amazon EC2)",
      "Amazon Simple Notification Service (SNS)",
    ],
    correctAnswer: [0, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Amazon SQS provides message queuing for asynchronous communication between microservices. Amazon SNS provides pub/sub messaging for fanout patterns. Together, they enable loose coupling where services don't need to know about each other, improving scalability and fault tolerance.",
    incorrectExplanations: [
      "Lambda is compute for running code, not specifically for decoupling (though it can consume from SQS/SNS).",
      "Step Functions orchestrate workflows but don't decouple services.",
      "EC2 is compute infrastructure, not a decoupling service.",
    ],
    relatedServices: ["SQS", "SNS", "EventBridge"],
    tags: ["microservices", "decoupling", "sqs", "sns", "messaging", "multi-select"],
  },
  {
    id: "119",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which of the following is a serverless AWS service?",
    options: ["Amazon Elastic Compute Cloud (Amazon EC2)", "AWS Elastic Beanstalk", "AWS Lambda", "Amazon EMR"],
    correctAnswer: 2,
    explanation:
      "AWS Lambda is a serverless compute service where you run code without provisioning or managing servers. You pay only for the compute time you consume - there's no charge when your code isn't running. Lambda automatically scales and handles infrastructure management.",
    incorrectExplanations: [
      "EC2 requires you to provision and manage virtual machines.",
      "Elastic Beanstalk abstracts infrastructure but still runs on EC2 instances you provision.",
      "EMR is a managed big data platform but requires cluster provisioning.",
    ],
    relatedServices: ["Lambda", "API Gateway", "DynamoDB"],
    tags: ["serverless", "lambda", "compute"],
  },
  {
    id: "120",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which of the following is the MOST cost-effective option to purchase an EC2 Reserved Instance (RI)?",
    options: [
      "All upfront payment option with the standard 1-year term",
      "No upfront payment option with standard 3-years term",
      "Partial upfront payment option with standard 3-years term",
      "No upfront payment option with standard 1-year term",
    ],
    correctAnswer: 2,
    explanation:
      "The partial upfront payment option with a 3-year term provides the best balance of cost savings and flexibility. Three-year terms offer deeper discounts than 1-year terms, and partial upfront provides significant savings while not requiring full payment upfront, making it the most cost-effective overall option.",
    incorrectExplanations: [
      "1-year terms offer less discount than 3-year terms.",
      "No upfront offers less discount than partial upfront for the same term.",
      "1-year with no upfront provides the least savings of all options.",
    ],
    relatedServices: ["EC2", "Reserved Instances"],
    tags: ["pricing", "reserved-instances", "cost-optimization"],
  },
  {
    id: "121",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario:
      "A startup wants to get an estimate of the monthly AWS bill based on the services they plan to use. Which service would you suggest?",
    options: ["AWS Pricing Calculator", "AWS Budgets", "AWS Cost Explorer", "AWS Cost & Usage Report (AWS CUR)"],
    correctAnswer: 0,
    explanation:
      "AWS Pricing Calculator (formerly Simple Monthly Calculator) allows you to create estimates for AWS services based on your expected usage. It helps you model different configurations and compare costs before deploying resources, making it ideal for planning and budgeting.",
    incorrectExplanations: [
      "Budgets helps you track actual spending against budgets, not create estimates.",
      "Cost Explorer analyzes historical costs, not future estimates.",
      "Cost & Usage Report provides detailed billing data for actual usage, not estimates.",
    ],
    relatedServices: ["Pricing Calculator", "Budgets", "Cost Explorer"],
    tags: ["pricing", "calculator", "cost-estimation"],
  },
  {
    id: "122",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "An on-demand EC2 instance with per-second billing is terminated within 30 seconds. What is the duration for which the instance would be charged?",
    options: ["300 seconds", "60 seconds", "30 seconds", "600 seconds"],
    correctAnswer: 1,
    explanation:
      "EC2 instances with per-second billing have a minimum charge of 60 seconds. After the first minute, you're charged for every second the instance runs. So even if you terminate an instance after 30 seconds, you'll be charged for the full 60-second minimum.",
    incorrectExplanations: [
      "300 seconds (5 minutes) is not related to EC2 billing.",
      "30 seconds would be correct without the 60-second minimum.",
      "600 seconds (10 minutes) is not related to EC2 billing.",
    ],
    relatedServices: ["EC2", "Billing"],
    tags: ["pricing", "ec2", "per-second-billing", "minimum-charge"],
  },
  {
    id: "123",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which AWS service will help you receive alerts when the reservation utilization falls below the defined threshold?",
    options: ["AWS CloudTrail", "AWS Budgets", "AWS Trusted Advisor", "AWS Pricing Calculator"],
    correctAnswer: 1,
    explanation:
      "AWS Budgets allows you to set custom budgets and receive alerts for various metrics including Reserved Instance utilization. You can configure alerts to notify you when RI utilization falls below thresholds, helping you optimize your Reserved Instance purchases and coverage.",
    incorrectExplanations: [
      "CloudTrail logs API activity, not cost or utilization metrics.",
      "Trusted Advisor provides best practice recommendations but doesn't send custom utilization alerts.",
      "Pricing Calculator estimates costs, it doesn't monitor actual utilization.",
    ],
    relatedServices: ["Budgets", "Cost Explorer", "Reserved Instances"],
    tags: ["budgets", "alerts", "reserved-instances", "utilization"],
  },
  {
    id: "124",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario: "Which of the following AWS services has encryption enabled by default?",
    options: [
      "Amazon Elastic File System (Amazon EFS)",
      "AWS CloudTrail Logs",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Relational Database Service (Amazon RDS)",
    ],
    correctAnswer: 1,
    explanation:
      "AWS CloudTrail logs are encrypted by default using Amazon S3 server-side encryption (SSE-S3). For other services like EFS, EBS, and RDS, you must explicitly enable encryption when creating the resource, although encryption at rest is strongly recommended.",
    incorrectExplanations: [
      "EFS requires you to enable encryption when creating the file system.",
      "EBS requires you to enable encryption when creating volumes.",
      "RDS requires you to enable encryption when creating the database instance.",
    ],
    relatedServices: ["CloudTrail", "S3", "KMS"],
    tags: ["encryption", "cloudtrail", "security", "default-encryption"],
  },
  {
    id: "125",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "A company wants to have control over creating and using its own keys for encryption. Which of the following can be used?",
    options: ["AWS managed key", "AWS Secrets Manager", "AWS owned key", "customer managed key (CMK)"],
    correctAnswer: 3,
    explanation:
      "Customer managed keys (CMKs) in AWS KMS give you full control over key creation, rotation policies, and usage permissions through IAM policies. You can view key usage in CloudTrail, enable/disable keys, and define who can use them for encryption/decryption operations.",
    incorrectExplanations: [
      "AWS managed keys are created and managed by AWS on your behalf - you don't control them.",
      "Secrets Manager stores secrets/credentials, it doesn't provide encryption key control.",
      "AWS owned keys are used by AWS for internal operations - you can't view or control them.",
    ],
    relatedServices: ["KMS", "CMK"],
    tags: ["encryption", "kms", "cmk", "customer-managed-keys"],
  },
  {
    id: "126",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario: "Which statement is CORRECT regarding AZ characteristics of EBS and EFS?",
    options: [
      "EBS volume can be attached to instances in multiple AZs and EFS in the same AZ",
      "EBS volume can be attached to a single instance in the same AZ and EFS only in the same AZ",
      "EBS volume can be attached to a single instance in the same AZ whereas EFS file system can be mounted on instances across multiple Availability Zones (AZ)",
      "EBS volume can be attached to instances in multiple AZs and EFS across multiple AZs",
    ],
    correctAnswer: 2,
    explanation:
      "EBS volumes are AZ-specific and can only be attached to EC2 instances in the same Availability Zone. Amazon EFS is a regional service that can be mounted by EC2 instances across multiple AZs in the same region simultaneously, providing high availability and shared access.",
    incorrectExplanations: [
      "EBS cannot be attached to instances in multiple AZs (except multi-attach io1/io2 within same AZ).",
      "EFS is not limited to the same AZ - it spans multiple AZs in a region.",
      "EBS cannot span multiple AZs.",
    ],
    relatedServices: ["EBS", "EFS", "EC2"],
    tags: ["storage", "ebs", "efs", "availability-zones"],
  },
  {
    id: "127",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "A research group needs high-performance disks with fast I/O for fault-tolerant scientific computation. Which is the MOST cost-effective solution?",
    options: [
      "Amazon Elastic File System (Amazon EFS)",
      "Instance Store",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic Block Store (EBS)",
    ],
    correctAnswer: 1,
    explanation:
      "Instance Store provides temporary block-level storage directly attached to the host computer, offering the highest I/O performance (NVMe SSD) at no additional cost beyond the instance price. For fault-tolerant workloads that can handle data loss (since instance store is ephemeral), it's the most cost-effective high-performance option.",
    incorrectExplanations: [
      "EFS is network-based and more expensive than instance store for compute-intensive workloads.",
      "S3 is object storage with higher latency, not suitable for high-performance disk I/O.",
      "EBS provides persistence but costs more and has lower performance than instance store.",
    ],
    relatedServices: ["Instance Store", "EC2", "EBS"],
    tags: ["storage", "instance-store", "performance", "cost-optimization"],
  },
  {
    id: "128",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario: "AWS Web Application Firewall (WAF) offers protection at which layer?",
    options: ["Layer 4 and 7", "Layer 7", "Layer 3", "Layer 4"],
    correctAnswer: 1,
    explanation:
      "AWS WAF operates at Layer 7 (Application Layer) of the OSI model, protecting web applications by filtering HTTP/HTTPS requests. It can inspect headers, body, and query strings to block common attacks like SQL injection, cross-site scripting (XSS), and other web exploits.",
    incorrectExplanations: [
      "Layer 4 and 7 would be Shield Advanced plus WAF, not WAF alone.",
      "Layer 3 (Network Layer) is handled by network ACLs and security groups.",
      "Layer 4 (Transport Layer) is handled by security groups and Network Load Balancers.",
    ],
    relatedServices: ["WAF", "CloudFront", "ALB", "API Gateway"],
    tags: ["security", "waf", "layer-7", "web-security"],
  },
  {
    id: "129",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "Which option is a common stakeholder role for the AWS Cloud Adoption Framework (AWS CAF) platform perspective? (Select two)",
    options: [
      "Chief Technology Officer (CTO)",
      "Chief Data Officer (CDO)",
      "Chief Product Officer (CPO)",
      "Chief Information Officer (CIO)",
      "Engineer",
    ],
    correctAnswer: [0, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "The Platform perspective of AWS CAF focuses on describing the architecture of the target state environment in detail. Common stakeholder roles include CTO (technical strategy), Engineers (implementation), and architects. They focus on principles and patterns for implementing cloud platforms and migrating workloads.",
    incorrectExplanations: [
      "CDO typically aligns with the Governance perspective.",
      "CPO typically aligns with the Business perspective.",
      "CIO typically aligns with multiple perspectives including Business and Platform, but Engineer is more specific to Platform.",
    ],
    relatedServices: ["CAF", "Migration"],
    tags: ["caf", "cloud-adoption-framework", "platform-perspective", "stakeholders", "multi-select"],
  },
  // ADDITIONAL 30 QUESTIONS SPANNING ALL DOMAINS
  {
    id: "130",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company wants to move their legacy application to AWS quickly without making any modifications. Which migration strategy should they use?",
    options: ["Replatform", "Rehost", "Refactor", "Repurchase"],
    correctAnswer: 1,
    explanation:
      "Rehost (Lift and Shift) moves applications to the cloud without changing the architecture. It's the quickest migration path with minimal disruption, ideal for legacy systems that need to be moved urgently without modifications.",
    incorrectExplanations: [
      "Replatform involves small optimizations during migration.",
      "Refactor requires redesigning the application for cloud-native features.",
      "Repurchase means replacing with a new SaaS product.",
    ],
    relatedServices: ["Migration Hub", "Application Discovery Service"],
    tags: ["migration", "rehost", "7-rs", "lift-and-shift"],
  },
  {
    id: "131",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "A company wants to migrate their self-managed database to Amazon RDS while moving to AWS. Which migration strategy is this an example of?",
    options: ["Rehost", "Replatform", "Retire", "Relocate"],
    correctAnswer: 1,
    explanation:
      "Replatform (Lift, Tinker, and Shift) involves moving to the cloud with small optimizations. Migrating a self-managed database to Amazon RDS is a classic example - you're optimizing the infrastructure without changing the application architecture significantly.",
    incorrectExplanations: [
      "Rehost would keep the database self-managed on EC2.",
      "Retire means shutting down the application entirely.",
      "Relocate is for large-scale VM migrations using tools like CloudEndure.",
    ],
    relatedServices: ["RDS", "DMS", "Migration Hub"],
    tags: ["migration", "replatform", "7-rs", "rds"],
  },
  {
    id: "132",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A company decides to replace their legacy CRM system with Salesforce when moving to the cloud. Which migration strategy is this?",
    options: ["Refactor", "Repurchase", "Replatform", "Retain"],
    correctAnswer: 1,
    explanation:
      "Repurchase (Drop and Shop) involves replacing an existing application with a SaaS alternative. Moving from a legacy CRM to Salesforce is a classic repurchase scenario - you're buying a new cloud-native solution instead of migrating the old system.",
    incorrectExplanations: [
      "Refactor means redesigning your existing application, not replacing it.",
      "Replatform means optimizing during migration, not replacing with SaaS.",
      "Retain means keeping the application on-premises.",
    ],
    relatedServices: ["AWS Marketplace"],
    tags: ["migration", "repurchase", "7-rs", "saas"],
  },
  {
    id: "133",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "During a cloud migration assessment, a company identifies several applications that are no longer used. What migration strategy should they apply?",
    options: ["Retain", "Retire", "Relocate", "Rehost"],
    correctAnswer: 1,
    explanation:
      "Retire (Decommission) is used for applications that are no longer needed. It's a low-effort strategy that reduces costs by shutting down unused systems instead of migrating them to the cloud.",
    incorrectExplanations: [
      "Retain is for keeping applications on-premises.",
      "Relocate is for migrating large workloads.",
      "Rehost is for migrating applications that are still needed.",
    ],
    relatedServices: ["Migration Hub"],
    tags: ["migration", "retire", "7-rs", "decommission"],
  },
  {
    id: "134",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A healthcare company must keep certain patient record systems on-premises due to specific compliance requirements. Which migration strategy applies?",
    options: ["Retire", "Retain", "Rehost", "Refactor"],
    correctAnswer: 1,
    explanation:
      "Retain (Revisit) is used when applications must stay on-premises, often due to compliance, regulatory, or technical constraints. The company can revisit the decision later when requirements change or cloud compliance certifications become available.",
    incorrectExplanations: [
      "Retire means shutting down, not keeping operational.",
      "Rehost would migrate to the cloud, violating compliance.",
      "Refactor also migrates to the cloud.",
    ],
    relatedServices: ["Compliance Programs", "HIPAA"],
    tags: ["migration", "retain", "7-rs", "compliance"],
  },
  {
    id: "135",
    domain: "Cloud Concepts",
    difficulty: "advanced",
    scenario:
      "A company wants to migrate 1,000 VMware virtual machines to AWS with minimal changes. Which migration strategy and tool combination is most appropriate?",
    options: [
      "Rehost using AWS Application Discovery Service",
      "Relocate using AWS Application Migration Service",
      "Replatform using AWS Database Migration Service",
      "Refactor using AWS CloudFormation",
    ],
    correctAnswer: 1,
    explanation:
      "Relocate (Hypervisor-level Migration) is designed for migrating large numbers of workloads without modifying them. AWS Application Migration Service (formerly CloudEndure) provides automated lift-and-shift for VMware VMs at scale with minimal downtime.",
    incorrectExplanations: [
      "Application Discovery Service discovers applications but doesn't migrate them.",
      "DMS is for database migration, not VMs.",
      "CloudFormation provisions infrastructure, not a migration tool.",
    ],
    relatedServices: ["Application Migration Service", "VMware Cloud on AWS"],
    tags: ["migration", "relocate", "7-rs", "vmware"],
  },
  {
    id: "136",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to redesign their monolithic application into microservices to take advantage of auto-scaling and serverless features. Which migration strategy is this?",
    options: ["Replatform", "Refactor", "Rehost", "Repurchase"],
    correctAnswer: 1,
    explanation:
      "Refactor (Re-architect) involves redesigning applications to leverage cloud-native features like microservices, containers, and serverless. This is a high-effort strategy but provides the most benefits in terms of scalability, agility, and performance.",
    incorrectExplanations: [
      "Replatform makes small optimizations, not major architectural changes.",
      "Rehost moves without changes.",
      "Repurchase replaces with SaaS, doesn't redesign existing apps.",
    ],
    relatedServices: ["Lambda", "ECS", "EKS", "API Gateway"],
    tags: ["migration", "refactor", "7-rs", "microservices"],
  },
  {
    id: "137",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which AWS service provides a visual interface to understand your AWS costs and usage patterns over time?",
    options: ["AWS Budgets", "AWS Cost Explorer", "AWS Billing Dashboard", "AWS Organizations"],
    correctAnswer: 1,
    explanation:
      "AWS Cost Explorer provides interactive visualizations to analyze your AWS costs and usage over time. It allows filtering by service, region, tag, and includes forecasting capabilities to predict future costs based on historical patterns.",
    incorrectExplanations: [
      "Budgets sets spending limits and alerts, doesn't visualize historical data.",
      "Billing Dashboard shows current charges but lacks Cost Explorer's analysis features.",
      "Organizations manages multiple accounts, not cost visualization.",
    ],
    relatedServices: ["Cost Explorer", "Cost and Usage Report"],
    tags: ["cost-management", "cost-explorer", "visualization"],
  },
  {
    id: "138",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario:
      "A company with Enterprise Support needs assistance with their AWS account, billing inquiries, and service limit increases. Which team should they contact?",
    options: [
      "AWS Concierge Support Team",
      "AWS Cloud Support Engineers",
      "AWS Professional Services",
      "AWS Account Manager",
    ],
    correctAnswer: 0,
    explanation:
      "The AWS Concierge Support Team is a dedicated team for Enterprise Support customers that helps with billing and account inquiries, service limit increases, and other account-related issues. They act as a single point of contact for non-technical account matters.",
    incorrectExplanations: [
      "Cloud Support Engineers handle technical issues, not account/billing.",
      "Professional Services provides consulting, not account support.",
      "Account Managers (TAMs) provide guidance but Concierge handles specific account tasks.",
    ],
    relatedServices: ["Enterprise Support", "Concierge"],
    tags: ["support", "enterprise-support", "concierge"],
  },
  {
    id: "139",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service allows you to run containers without managing the underlying servers or clusters?",
    options: ["Amazon ECS", "Amazon EKS", "AWS Fargate", "AWS Lambda"],
    correctAnswer: 2,
    explanation:
      "AWS Fargate is a serverless compute engine for containers that works with both ECS and EKS. You don't need to provision or manage servers - Fargate automatically scales compute capacity and you only pay for the resources your containers use.",
    incorrectExplanations: [
      "ECS requires you to manage EC2 instances (unless using Fargate launch type).",
      "EKS requires managing Kubernetes control plane and worker nodes (unless using Fargate).",
      "Lambda runs functions, not containers (though it supports container images).",
    ],
    relatedServices: ["Fargate", "ECS", "EKS"],
    tags: ["containers", "fargate", "serverless", "compute"],
  },
  {
    id: "140",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs a fully managed message broker service compatible with Apache ActiveMQ and RabbitMQ. Which AWS service meets this requirement?",
    options: ["Amazon SQS", "Amazon SNS", "Amazon MQ", "Amazon Kinesis"],
    correctAnswer: 2,
    explanation:
      "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ. It's ideal for migrating existing applications that rely on these standard protocols without rewriting code to use SQS or SNS.",
    incorrectExplanations: [
      "SQS is AWS's native queue service, not compatible with ActiveMQ/RabbitMQ protocols.",
      "SNS is for pub/sub messaging, not a message broker.",
      "Kinesis is for real-time streaming data, not message brokering.",
    ],
    relatedServices: ["Amazon MQ", "ActiveMQ", "RabbitMQ"],
    tags: ["messaging", "amazon-mq", "message-broker"],
  },
  {
    id: "141",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service provides managed Apache Kafka for building real-time streaming data pipelines?",
    options: ["Amazon Kinesis Data Streams", "Amazon MSK", "Amazon EMR", "AWS Glue"],
    correctAnswer: 1,
    explanation:
      "Amazon MSK (Managed Streaming for Apache Kafka) provides fully managed Apache Kafka. It handles cluster setup, monitoring, and maintenance while giving you full control over Kafka configuration for building streaming applications.",
    incorrectExplanations: [
      "Kinesis Data Streams is AWS's proprietary streaming service, not Kafka.",
      "EMR is for big data processing with Hadoop/Spark, not Kafka management.",
      "Glue is for ETL jobs, not streaming data.",
    ],
    relatedServices: ["MSK", "Kafka", "Kinesis"],
    tags: ["streaming", "kafka", "msk", "real-time"],
  },
  {
    id: "142",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company needs to analyze VPC Flow Logs to identify security threats and unusual traffic patterns. Which AWS service uses machine learning for this purpose?",
    options: ["AWS Config", "Amazon GuardDuty", "Amazon Inspector", "AWS CloudTrail"],
    correctAnswer: 1,
    explanation:
      "Amazon GuardDuty uses machine learning to analyze VPC Flow Logs, CloudTrail logs, and DNS logs to detect threats like compromised instances, reconnaissance, and data exfiltration. It provides automated threat detection without requiring manual rule configuration.",
    incorrectExplanations: [
      "Config tracks resource configurations, not threat detection.",
      "Inspector assesses EC2 vulnerabilities, doesn't analyze network traffic.",
      "CloudTrail records API calls but doesn't analyze for threats.",
    ],
    relatedServices: ["GuardDuty", "VPC Flow Logs", "Security Hub"],
    tags: ["security", "guardduty", "threat-detection", "machine-learning"],
  },
  {
    id: "143",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "Which AWS service helps developers securely store and rotate database credentials, API keys, and other secrets?",
    options: ["AWS Systems Manager Parameter Store", "AWS Secrets Manager", "AWS KMS", "Amazon Cognito"],
    correctAnswer: 1,
    explanation:
      "AWS Secrets Manager is purpose-built for managing secrets with automatic rotation capabilities. It natively integrates with RDS, Redshift, and DocumentDB to automatically rotate database credentials without application downtime.",
    incorrectExplanations: [
      "Parameter Store stores configuration data but lacks native secret rotation for databases.",
      "KMS manages encryption keys, not application secrets.",
      "Cognito manages user authentication, not application secrets.",
    ],
    relatedServices: ["Secrets Manager", "RDS", "KMS"],
    tags: ["security", "secrets-manager", "credentials", "rotation"],
  },
  {
    id: "144",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A company wants to create custom metrics from their application logs to monitor business KPIs. Which AWS service feature should they use?",
    options: [
      "CloudWatch Logs Insights",
      "CloudWatch Metric Filters",
      "CloudWatch Alarms",
      "CloudWatch Dashboards",
    ],
    correctAnswer: 1,
    explanation:
      "CloudWatch Metric Filters extract metrics from log data by searching for specific patterns. You can then create alarms and dashboards based on these custom metrics, enabling monitoring of business KPIs derived from application logs.",
    incorrectExplanations: [
      "Logs Insights queries logs but doesn't create persistent metrics.",
      "Alarms trigger on metrics but don't create them from logs.",
      "Dashboards display metrics but don't extract them from logs.",
    ],
    relatedServices: ["CloudWatch", "CloudWatch Logs"],
    tags: ["monitoring", "cloudwatch", "metrics", "logs"],
  },
  {
    id: "145",
    domain: "Monitoring and Optimization",
    difficulty: "advanced",
    scenario:
      "Which AWS service provides a unified view of operational health and automates response to operational events?",
    options: ["AWS Systems Manager", "AWS CloudFormation", "Amazon EventBridge", "AWS Config"],
    correctAnswer: 0,
    explanation:
      "AWS Systems Manager provides a unified interface to view operational data from multiple AWS services and automate operational tasks. It includes features like OpsCenter for managing operational issues, Automation for remediation, and Inventory for resource tracking.",
    incorrectExplanations: [
      "CloudFormation provisions infrastructure, doesn't provide operational dashboards.",
      "EventBridge routes events but doesn't provide operational health views.",
      "Config tracks configurations, not operational health.",
    ],
    relatedServices: ["Systems Manager", "OpsCenter", "Automation"],
    tags: ["monitoring", "systems-manager", "operations", "automation"],
  },
  {
    id: "146",
    domain: "Deployment and Operations",
    difficulty: "intermediate",
    scenario:
      "A company wants to deploy application updates with the ability to quickly roll back if issues occur. Which AWS deployment service provides this capability?",
    options: ["AWS CloudFormation", "AWS CodeDeploy", "AWS Elastic Beanstalk", "AWS OpsWorks"],
    correctAnswer: 1,
    explanation:
      "AWS CodeDeploy automates application deployments with built-in rollback capabilities. It supports various deployment strategies (in-place, blue/green) and can automatically roll back if deployment fails or alarms trigger, ensuring application stability.",
    incorrectExplanations: [
      "CloudFormation manages infrastructure, not application deployments.",
      "Elastic Beanstalk can deploy apps but CodeDeploy offers more control over deployment strategies.",
      "OpsWorks is configuration management, not focused on deployment strategies.",
    ],
    relatedServices: ["CodeDeploy", "CodePipeline", "Auto Scaling"],
    tags: ["deployment", "codedeploy", "rollback", "cicd"],
  },
  {
    id: "147",
    domain: "Deployment and Operations",
    difficulty: "advanced",
    scenario:
      "Which AWS service enables you to run configuration management using Chef or Puppet?",
    options: ["AWS Systems Manager", "AWS OpsWorks", "AWS CloudFormation", "AWS Config"],
    correctAnswer: 1,
    explanation:
      "AWS OpsWorks is a configuration management service that provides managed instances of Chef and Puppet. It automates server configuration, deployment, and management using familiar Chef recipes and Puppet manifests.",
    incorrectExplanations: [
      "Systems Manager uses its own documents, not Chef/Puppet.",
      "CloudFormation uses JSON/YAML templates, not Chef/Puppet.",
      "Config tracks configurations but doesn't manage them with Chef/Puppet.",
    ],
    relatedServices: ["OpsWorks", "Chef", "Puppet"],
    tags: ["configuration-management", "opsworks", "chef", "puppet"],
  },
  {
    id: "148",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company needs to convert text to lifelike speech for their accessibility application. Which AWS service provides text-to-speech capabilities?",
    options: ["Amazon Transcribe", "Amazon Polly", "Amazon Comprehend", "Amazon Translate"],
    correctAnswer: 1,
    explanation:
      "Amazon Polly converts text into lifelike speech using deep learning. It supports multiple languages and voices, with options for neural text-to-speech (NTTS) for the most natural-sounding voices, ideal for accessibility applications.",
    incorrectExplanations: [
      "Transcribe converts speech to text (opposite direction).",
      "Comprehend analyzes text for sentiment and entities.",
      "Translate converts text between languages, not to speech.",
    ],
    relatedServices: ["Polly", "Transcribe"],
    tags: ["ai-ml", "polly", "text-to-speech", "accessibility"],
  },
  {
    id: "149",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service automatically converts speech from audio/video files into text?",
    options: ["Amazon Polly", "Amazon Transcribe", "Amazon Rekognition", "Amazon Textract"],
    correctAnswer: 1,
    explanation:
      "Amazon Transcribe automatically converts speech to text using automatic speech recognition (ASR). It supports multiple languages, custom vocabularies, and can identify different speakers, making it ideal for transcribing meetings, lectures, and media content.",
    incorrectExplanations: [
      "Polly converts text to speech (opposite direction).",
      "Rekognition analyzes images and videos, not audio.",
      "Textract extracts text from documents, not audio.",
    ],
    relatedServices: ["Transcribe", "Polly"],
    tags: ["ai-ml", "transcribe", "speech-to-text", "asr"],
  },
  {
    id: "150",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to extract text, forms data, and tables from scanned documents and PDFs. Which AWS service is purpose-built for this?",
    options: ["Amazon Comprehend", "Amazon Textract", "Amazon Rekognition", "AWS Glue"],
    correctAnswer: 1,
    explanation:
      "Amazon Textract uses machine learning to extract text, handwriting, tables, and form data from scanned documents and PDFs. It goes beyond simple OCR by understanding document structure and relationships between data elements.",
    incorrectExplanations: [
      "Comprehend analyzes text for insights, doesn't extract from documents.",
      "Rekognition analyzes images/videos but isn't optimized for document extraction.",
      "Glue is for ETL, not document processing.",
    ],
    relatedServices: ["Textract", "S3"],
    tags: ["ai-ml", "textract", "ocr", "document-processing"],
  },
  {
    id: "151",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "Which TWO AWS services work together to provide DDoS protection at both the network and application layers?",
    options: [
      "AWS Shield Standard",
      "AWS WAF",
      "Amazon GuardDuty",
      "AWS Firewall Manager",
      "Network ACLs",
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Shield Standard provides DDoS protection at the network and transport layers (Layer 3/4) for all AWS customers at no cost. AWS WAF protects at the application layer (Layer 7) by filtering HTTP/HTTPS requests. Together they provide comprehensive DDoS protection.",
    incorrectExplanations: [
      "GuardDuty detects threats but doesn't actively block DDoS attacks.",
      "Firewall Manager manages security policies, not direct DDoS protection.",
      "Network ACLs provide basic filtering but aren't DDoS-specific protection.",
    ],
    relatedServices: ["Shield", "WAF", "CloudFront"],
    tags: ["security", "ddos", "shield", "waf", "multi-select"],
  },
  {
    id: "152",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario:
      "Which AWS Support plan provides access to a Technical Account Manager (TAM)?",
    options: ["Business Support", "Enterprise Support", "Developer Support", "Enterprise On-Ramp Support"],
    correctAnswer: 1,
    explanation:
      "Enterprise Support includes a designated Technical Account Manager (TAM) who provides proactive guidance, reviews, and advocacy. The TAM helps with architectural reviews, operational support, and acts as a primary point of contact for your AWS environment.",
    incorrectExplanations: [
      "Business Support provides support engineers but not a dedicated TAM.",
      "Developer Support provides technical support during business hours only.",
      "Enterprise On-Ramp provides access to a pool of TAMs but not a designated TAM.",
    ],
    relatedServices: ["Enterprise Support", "TAM"],
    tags: ["support", "enterprise-support", "tam"],
  },
  {
    id: "153",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to build a GraphQL API that integrates with multiple data sources including DynamoDB, Lambda, and HTTP endpoints. Which AWS service is purpose-built for this?",
    options: ["Amazon API Gateway", "AWS AppSync", "AWS Amplify", "Amazon EventBridge"],
    correctAnswer: 1,
    explanation:
      "AWS AppSync is a fully managed GraphQL service that makes it easy to build data-driven applications. It can integrate with DynamoDB, Lambda, HTTP endpoints, and RDS, providing real-time updates and offline capabilities with automatic conflict resolution.",
    incorrectExplanations: [
      "API Gateway creates REST and WebSocket APIs, not GraphQL.",
      "Amplify is a development platform that uses AppSync for GraphQL, not the core service.",
      "EventBridge is for event routing, not GraphQL APIs.",
    ],
    relatedServices: ["AppSync", "GraphQL", "DynamoDB"],
    tags: ["application-services", "appsync", "graphql", "api"],
  },
  {
    id: "154",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service provides a Git-based source control repository similar to GitHub?",
    options: ["AWS CodeCommit", "AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline"],
    correctAnswer: 0,
    explanation:
      "AWS CodeCommit is a fully managed source control service that hosts secure Git repositories. It scales automatically, integrates with IAM for access control, and encrypts repositories at rest and in transit.",
    incorrectExplanations: [
      "CodeBuild compiles code and runs tests, doesn't host repositories.",
      "CodeDeploy automates application deployments.",
      "CodePipeline orchestrates CI/CD workflows.",
    ],
    relatedServices: ["CodeCommit", "Git", "CodePipeline"],
    tags: ["developer-tools", "codecommit", "source-control", "git"],
  },
  {
    id: "155",
    domain: "Deployment and Operations",
    difficulty: "advanced",
    scenario:
      "Which TWO AWS services can help automate the patching of EC2 instances?",
    options: [
      "AWS Systems Manager Patch Manager",
      "AWS CloudFormation",
      "AWS Config",
      "AWS Systems Manager Maintenance Windows",
      "Amazon Inspector",
    ],
    correctAnswer: [0, 3],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS Systems Manager Patch Manager automates the process of patching managed instances. Maintenance Windows define schedules for when patches should be applied, allowing you to control when patches run to avoid business-critical hours.",
    incorrectExplanations: [
      "CloudFormation provisions infrastructure, doesn't patch running instances.",
      "Config tracks configurations and compliance, doesn't apply patches.",
      "Inspector identifies vulnerabilities but doesn't patch systems.",
    ],
    relatedServices: ["Systems Manager", "Patch Manager", "Maintenance Windows"],
    tags: ["operations", "patching", "systems-manager", "automation", "multi-select"],
  },
  {
    id: "156",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario:
      "According to the AWS Well-Architected Framework, which design principle helps reduce the impact of failures?",
    options: [
      "Implement strong identity foundation",
      "Stop guessing capacity",
      "Manage change in automation",
      "Automatically recover from failure",
    ],
    correctAnswer: 3,
    explanation:
      "The Reliability pillar of the Well-Architected Framework emphasizes 'Automatically recover from failure' - monitor KPIs and trigger automated recovery when thresholds are breached. This reduces Mean Time To Recovery (MTTR) and minimizes the impact of failures.",
    incorrectExplanations: [
      "Strong identity foundation is a Security pillar principle.",
      "Stop guessing capacity is a Performance Efficiency principle.",
      "Manage change in automation is an Operational Excellence principle.",
    ],
    relatedServices: ["Well-Architected Framework", "Auto Scaling"],
    tags: ["well-architected", "reliability", "failure-recovery"],
  },
  {
    id: "157",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario:
      "A company wants to be notified when their monthly AWS bill exceeds $10,000. Which AWS service should they configure?",
    options: ["AWS Cost Explorer", "AWS Budgets", "CloudWatch Billing Alarms", "AWS Cost Anomaly Detection"],
    correctAnswer: 1,
    explanation:
      "AWS Budgets allows you to set custom cost and usage budgets and receive alerts via SNS when actual or forecasted costs exceed your thresholds. It provides more flexibility than CloudWatch Billing Alarms and can track both cost and usage.",
    incorrectExplanations: [
      "Cost Explorer analyzes costs but doesn't send alerts.",
      "CloudWatch Billing Alarms work but Budgets provides more features for cost management.",
      "Cost Anomaly Detection detects unusual spending, not threshold-based alerts.",
    ],
    relatedServices: ["Budgets", "SNS", "Cost Explorer"],
    tags: ["billing", "budgets", "cost-management", "alerts"],
  },
  {
    id: "158",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to process large-scale genomics data that requires high-performance computing with thousands of CPU cores. Which AWS service is optimized for this workload?",
    options: ["AWS Batch", "Amazon EMR", "AWS ParallelCluster", "AWS Lambda"],
    correctAnswer: 2,
    explanation:
      "AWS ParallelCluster is an AWS-supported open-source cluster management tool for deploying and managing High Performance Computing (HPC) clusters. It's ideal for scientific computing workloads like genomics that require thousands of tightly-coupled CPU cores.",
    incorrectExplanations: [
      "Batch is for batch processing but not optimized for tightly-coupled HPC workloads.",
      "EMR is for big data processing with Hadoop/Spark, not HPC.",
      "Lambda has execution time limits and isn't suitable for long-running HPC jobs.",
    ],
    relatedServices: ["ParallelCluster", "EC2", "HPC"],
    tags: ["compute", "hpc", "parallelcluster", "scientific-computing"],
  },
  {
    id: "159",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "Which S3 storage class is designed for data that is accessed less frequently but requires rapid access when needed?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Standard-Infrequent Access (S3 Standard-IA)",
      "S3 Glacier",
    ],
    correctAnswer: 2,
    explanation:
      "S3 Standard-IA (Infrequent Access) is optimized for data accessed less frequently but requires millisecond access when needed. It offers lower storage costs than S3 Standard but has a retrieval fee, making it ideal for backups and disaster recovery.",
    incorrectExplanations: [
      "S3 Standard is for frequently accessed data and costs more.",
      "Intelligent-Tiering automatically moves data between tiers, not specifically for infrequent access.",
      "Glacier is for archival with retrieval times from minutes to hours.",
    ],
    relatedServices: ["S3", "S3 Storage Classes"],
    tags: ["storage", "s3", "storage-classes", "infrequent-access"],
  },
  // PRIORITY 1: SECURITY AND COMPLIANCE (15 questions) - Critical Gap
  {
    id: "160",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to grant temporary access to AWS resources for users who already have corporate credentials. Which AWS service provides this capability?",
    options: ["AWS IAM Users", "AWS IAM Groups", "AWS Single Sign-On (SSO)", "AWS Cognito"],
    correctAnswer: 2,
    explanation:
      "AWS IAM Identity Center (formerly AWS SSO) enables centralized access management for multiple AWS accounts and applications using existing corporate credentials through SAML 2.0 federation. Users can sign in once with their existing credentials and access all authorized AWS accounts and applications.",
    incorrectExplanations: [
      "IAM Users require creating and managing separate AWS credentials, not using corporate credentials.",
      "IAM Groups organize IAM users but don't provide federation with corporate credentials.",
      "Cognito is for customer-facing applications, not enterprise employee federation.",
    ],
    relatedServices: ["IAM Identity Center", "SSO", "SAML"],
    tags: ["security", "iam", "sso", "federation"],
  },
  {
    id: "161",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "Which AWS service allows you to download compliance reports and AWS security certifications such as ISO, PCI, and SOC reports?",
    options: ["AWS Config", "AWS Artifact", "AWS Security Hub", "AWS Compliance Manager"],
    correctAnswer: 1,
    explanation:
      "AWS Artifact provides on-demand access to AWS security and compliance reports and select online agreements. You can download ISO certifications, PCI reports, SOC reports, and other compliance documentation directly from the console at no charge.",
    incorrectExplanations: [
      "Config tracks resource configurations for compliance but doesn't provide certification reports.",
      "Security Hub aggregates security findings but doesn't provide compliance documentation.",
      "Compliance Manager doesn't exist; AWS Audit Manager helps assess compliance, but Artifact provides the reports.",
    ],
    relatedServices: ["Artifact", "Compliance", "Security"],
    tags: ["security", "compliance", "artifact", "certifications"],
  },
  {
    id: "162",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "What is the main difference between Security Groups and Network ACLs in a VPC?",
    options: [
      "Security Groups are stateful and NACLs are stateless",
      "Security Groups operate at subnet level and NACLs at instance level",
      "Security Groups support deny rules and NACLs only support allow rules",
      "Security Groups apply to all resources and NACLs only to EC2",
    ],
    correctAnswer: 0,
    explanation:
      "Security Groups are stateful - return traffic is automatically allowed regardless of rules. Network ACLs are stateless - you must explicitly configure both inbound and outbound rules. This is the fundamental difference that impacts how you configure rules for bidirectional traffic.",
    incorrectExplanations: [
      "Security Groups operate at instance level, NACLs at subnet level (opposite of stated).",
      "Security Groups only support allow rules; NACLs support both allow and deny rules (opposite of stated).",
      "Security Groups apply to ENIs/instances; NACLs apply to entire subnets.",
    ],
    relatedServices: ["VPC", "Security Groups", "Network ACL"],
    tags: ["security", "networking", "vpc", "security-groups", "nacl"],
  },
  {
    id: "163",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company wants to enforce that EC2 instances cannot be launched without encryption in a specific AWS account. Which service should they use?",
    options: ["AWS Config Rules", "AWS Organizations Service Control Policies (SCPs)", "IAM Policies", "AWS Systems Manager"],
    correctAnswer: 1,
    explanation:
      "Service Control Policies (SCPs) in AWS Organizations set permission guardrails for all accounts in the organization. An SCP can deny the launch of unencrypted EC2 instances across the entire account, overriding any IAM permissions. SCPs are the most effective way to enforce organizational policies.",
    incorrectExplanations: [
      "Config Rules detect non-compliant resources after creation but don't prevent the action.",
      "IAM Policies control individual user/role permissions but can be overridden by account admins; SCPs provide account-level enforcement.",
      "Systems Manager manages and patches instances but doesn't enforce launch policies.",
    ],
    relatedServices: ["Organizations", "SCP", "IAM"],
    tags: ["security", "organizations", "scp", "governance"],
  },
  {
    id: "164",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "According to the AWS Shared Responsibility Model, which of the following is AWS responsible for? (Select TWO)",
    options: [
      "Patching EC2 instance operating systems",
      "Physical security of data centers",
      "Encrypting data at rest in S3",
      "Managing the hypervisor layer",
      "Configuring security groups",
    ],
    correctAnswer: [1, 3],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "AWS is responsible for security 'of' the cloud including physical infrastructure (data centers, hardware) and the virtualization layer (hypervisor). AWS maintains physical security, manages hardware lifecycle, and ensures the underlying infrastructure is secure.",
    incorrectExplanations: [
      "Patching guest OS on EC2 is customer responsibility (AWS patches RDS/managed services).",
      "While AWS provides encryption tools, choosing to encrypt S3 data is customer responsibility.",
      "Configuring security groups is customer responsibility - AWS provides the service.",
    ],
    relatedServices: ["Shared Responsibility Model"],
    tags: ["security", "shared-responsibility", "compliance"],
  },
  {
    id: "165",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company needs to automatically discover and protect sensitive data like credit card numbers in S3 buckets. Which service should they use?",
    options: ["AWS Secrets Manager", "Amazon Macie", "Amazon GuardDuty", "AWS Security Hub"],
    correctAnswer: 1,
    explanation:
      "Amazon Macie uses machine learning to automatically discover, classify, and protect sensitive data in S3. It recognizes PII (Personally Identifiable Information) including credit card numbers, SSNs, and API keys, then provides dashboards and alerts for data security.",
    incorrectExplanations: [
      "Secrets Manager stores and rotates secrets like passwords, not discovering sensitive data in S3.",
      "GuardDuty detects threats and malicious activity, not sensitive data classification.",
      "Security Hub aggregates findings from other services but doesn't discover sensitive data itself.",
    ],
    relatedServices: ["Macie", "S3", "Data Protection"],
    tags: ["security", "macie", "data-protection", "pii"],
  },
  {
    id: "166",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "What is an IAM policy permission boundary used for?",
    options: [
      "To grant permissions to IAM users and roles",
      "To set the maximum permissions an IAM entity can have",
      "To define resource-based access policies",
      "To create temporary security credentials",
    ],
    correctAnswer: 1,
    explanation:
      "Permission boundaries set the maximum permissions that an identity-based policy can grant to an IAM entity. Even if a user has an identity policy granting full access, the permission boundary limits what they can actually do. This is useful for delegating user creation while maintaining security controls.",
    incorrectExplanations: [
      "Identity-based policies grant permissions; boundaries only restrict them.",
      "Resource-based policies are attached to resources (like S3 buckets), not IAM entities.",
      "STS creates temporary credentials, not permission boundaries.",
    ],
    relatedServices: ["IAM", "Permission Boundaries"],
    tags: ["security", "iam", "permission-boundaries", "delegation"],
  },
  {
    id: "167",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "Which AWS service provides centralized security findings from GuardDuty, Inspector, Macie, and other security services?",
    options: ["AWS Config", "AWS Security Hub", "Amazon Detective", "AWS CloudTrail"],
    correctAnswer: 1,
    explanation:
      "AWS Security Hub provides a comprehensive view of security alerts and compliance status across AWS accounts. It aggregates, organizes, and prioritizes findings from GuardDuty, Inspector, Macie, IAM Access Analyzer, and third-party tools into a single dashboard.",
    incorrectExplanations: [
      "Config tracks resource configurations, not security findings.",
      "Detective helps investigate security findings but doesn't aggregate them from multiple services.",
      "CloudTrail logs API calls but doesn't aggregate security findings.",
    ],
    relatedServices: ["Security Hub", "GuardDuty", "Inspector", "Macie"],
    tags: ["security", "security-hub", "centralized-management"],
  },
  {
    id: "168",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A company wants to conduct penetration testing on their AWS infrastructure. What must they do first?",
    options: [
      "Request permission from AWS Support",
      "Nothing - penetration testing is allowed for most AWS services",
      "Contact law enforcement",
      "Purchase AWS Shield Advanced",
    ],
    correctAnswer: 1,
    explanation:
      "AWS allows penetration testing on your own AWS resources without prior approval for most services including EC2, RDS, CloudFront, Aurora, API Gateway, Lambda, Lightsail, and Elastic Beanstalk. You must follow AWS Customer Support Policy for Penetration Testing and not perform prohibited activities like DDoS simulation.",
    incorrectExplanations: [
      "Prior AWS approval is no longer required since 2019 for most services.",
      "Law enforcement notification is not required for testing your own infrastructure.",
      "Shield Advanced is for DDoS protection, not penetration testing authorization.",
    ],
    relatedServices: ["Security", "Compliance"],
    tags: ["security", "penetration-testing", "compliance"],
  },
  {
    id: "169",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "Which combination provides the BEST protection against DDoS attacks for a web application?",
    options: [
      "AWS WAF + Security Groups",
      "AWS Shield Standard + AWS WAF + Amazon CloudFront",
      "Network ACLs + AWS Config",
      "Amazon GuardDuty + AWS Inspector",
    ],
    correctAnswer: 1,
    explanation:
      "AWS Shield Standard (free, automatic) protects against common Layer 3/4 attacks. AWS WAF protects against Layer 7 (application layer) attacks like SQL injection and XSS. CloudFront distributes traffic globally and works with Shield for DDoS protection. Together they provide comprehensive multi-layer DDoS protection.",
    incorrectExplanations: [
      "Security Groups don't provide DDoS protection; they're for basic firewall rules.",
      "NACLs and Config provide basic security but no DDoS-specific protection.",
      "GuardDuty and Inspector detect threats but don't prevent DDoS attacks.",
    ],
    relatedServices: ["Shield", "WAF", "CloudFront"],
    tags: ["security", "ddos", "shield", "waf", "multi-select"],
  },
  {
    id: "170",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "A developer accidentally committed AWS access keys to a public GitHub repository. What is the BEST immediate action?",
    options: [
      "Delete the GitHub repository",
      "Rotate the exposed access keys immediately",
      "Enable MFA on the root account",
      "Create a new AWS account",
    ],
    correctAnswer: 1,
    explanation:
      "Immediately rotate (deactivate and replace) the exposed access keys to prevent unauthorized access. AWS monitors public repositories and may quarantine your account if credentials are detected. After rotation, review CloudTrail logs for unauthorized activity and implement secrets management practices.",
    incorrectExplanations: [
      "Deleting the repo doesn't revoke the keys; they're already exposed and may be cached.",
      "MFA on root is good practice but doesn't address the exposed IAM access keys.",
      "Creating a new account is excessive; rotating the keys resolves the immediate threat.",
    ],
    relatedServices: ["IAM", "Access Keys", "Security"],
    tags: ["security", "iam", "access-keys", "incident-response"],
  },
  {
    id: "171",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "Which AWS service helps ensure EC2 instances are compliant with security best practices by assessing vulnerabilities?",
    options: ["AWS Config", "Amazon Inspector", "Amazon GuardDuty", "AWS Systems Manager"],
    correctAnswer: 1,
    explanation:
      "Amazon Inspector automatically assesses EC2 instances, container images, and Lambda functions for software vulnerabilities and unintended network exposure. It provides a risk score for each finding and recommends remediation steps, making it ideal for vulnerability management.",
    incorrectExplanations: [
      "Config tracks configuration compliance but doesn't scan for software vulnerabilities.",
      "GuardDuty detects threats and malicious activity but doesn't assess vulnerability compliance.",
      "Systems Manager patches instances but doesn't assess vulnerabilities like Inspector does.",
    ],
    relatedServices: ["Inspector", "EC2", "Security"],
    tags: ["security", "inspector", "vulnerability-scanning", "compliance"],
  },
  {
    id: "172",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "What is the primary purpose of AWS CloudTrail?",
    options: [
      "Monitor application performance",
      "Log and monitor AWS API calls for governance and compliance",
      "Encrypt data at rest",
      "Provide network traffic analysis",
    ],
    correctAnswer: 1,
    explanation:
      "AWS CloudTrail logs all API calls made in your AWS account, including who made the call, when, from what IP, and what actions were performed. This provides an audit trail for security analysis, compliance auditing, and operational troubleshooting. CloudTrail is essential for governance and forensic investigation.",
    incorrectExplanations: [
      "CloudWatch monitors performance; CloudTrail logs API activity.",
      "KMS encrypts data; CloudTrail logs access to encryption keys but doesn't encrypt.",
      "VPC Flow Logs analyze network traffic; CloudTrail logs API calls.",
    ],
    relatedServices: ["CloudTrail", "CloudWatch", "Compliance"],
    tags: ["security", "cloudtrail", "audit", "compliance"],
  },
  {
    id: "173",
    domain: "Security and Compliance",
    difficulty: "advanced",
    scenario:
      "A company needs to ensure all EBS volumes are encrypted across their AWS Organization. What combination achieves this? (Select TWO)",
    options: [
      "Enable default encryption for new EBS volumes",
      "Use AWS Config to detect unencrypted volumes",
      "Use Security Groups to block unencrypted volumes",
      "Use AWS Certificate Manager",
      "Use Service Control Policies to prevent unencrypted volumes",
    ],
    correctAnswer: [0, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation:
      "Enable default EBS encryption at the account level to automatically encrypt all new volumes. Use Service Control Policies (SCPs) to prevent creation of unencrypted volumes organization-wide by denying ec2:RunInstances without encryption. This combination provides both automatic encryption and enforcement.",
    incorrectExplanations: [
      "Config can detect violations after creation but doesn't enforce or encrypt automatically.",
      "Security Groups control network traffic, not encryption enforcement.",
      "Certificate Manager manages SSL/TLS certificates, not EBS encryption.",
    ],
    relatedServices: ["EBS", "KMS", "Organizations", "SCP"],
    tags: ["security", "encryption", "ebs", "organizations", "multi-select"],
  },
  {
    id: "174",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario:
      "Which AWS service should you use to manage SSL/TLS certificates for your application load balancers?",
    options: ["AWS KMS", "AWS Certificate Manager (ACM)", "AWS Secrets Manager", "AWS IAM"],
    correctAnswer: 1,
    explanation:
      "AWS Certificate Manager (ACM) provisions, manages, and deploys public and private SSL/TLS certificates for use with AWS services like ALB, CloudFront, and API Gateway. ACM handles certificate renewal automatically and integrates seamlessly with load balancers.",
    incorrectExplanations: [
      "KMS manages encryption keys, not SSL/TLS certificates.",
      "Secrets Manager stores application secrets like passwords, not certificates.",
      "IAM can store certificates but doesn't provide automated renewal like ACM.",
    ],
    relatedServices: ["ACM", "ALB", "CloudFront"],
    tags: ["security", "acm", "certificates", "ssl-tls"],
  },
  // PRIORITY 1: STORAGE (15 questions) - Critical Gap
  {
    id: "175",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "A company has data that is rarely accessed but must be retained for 7 years for compliance. Retrieval times of 12 hours are acceptable. Which S3 storage class is MOST cost-effective?",
    options: ["S3 Standard-IA", "S3 One Zone-IA", "S3 Glacier Deep Archive", "S3 Glacier Flexible Retrieval"],
    correctAnswer: 2,
    explanation:
      "S3 Glacier Deep Archive is the lowest-cost storage class designed for long-term archival of data accessed once or twice per year. With retrieval times of 12-48 hours and the lowest storage cost, it's ideal for compliance archives where retrieval is rare and 12-hour retrieval is acceptable.",
    incorrectExplanations: [
      "Standard-IA is for infrequent access but costs more than Glacier for rarely accessed data.",
      "One Zone-IA lacks durability of other classes and costs more than Glacier Deep Archive.",
      "Glacier Flexible Retrieval is cheaper than IA classes but more expensive than Deep Archive for this use case.",
    ],
    relatedServices: ["S3", "Glacier", "Storage Classes"],
    tags: ["storage", "s3", "glacier", "deep-archive", "cost-optimization"],
  },
  {
    id: "176",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "What S3 feature automatically transitions objects between storage classes based on access patterns?",
    options: ["S3 Lifecycle Policies", "S3 Intelligent-Tiering", "S3 Replication", "S3 Versioning"],
    correctAnswer: 1,
    explanation:
      "S3 Intelligent-Tiering automatically moves objects between access tiers (Frequent, Infrequent, Archive, Deep Archive) based on changing access patterns. It monitors access and moves objects automatically, optimizing costs without retrieval fees or operational overhead.",
    incorrectExplanations: [
      "Lifecycle Policies transition based on time/rules you define, not automatic access pattern monitoring.",
      "Replication copies objects to another region or bucket, doesn't change storage classes based on access.",
      "Versioning keeps multiple versions of objects but doesn't manage storage classes.",
    ],
    relatedServices: ["S3", "Intelligent-Tiering"],
    tags: ["storage", "s3", "intelligent-tiering", "cost-optimization"],
  },
  {
    id: "177",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "A company wants to automatically transition S3 objects to Glacier after 90 days and delete them after 7 years. What should they use?",
    options: ["S3 Intelligent-Tiering", "S3 Lifecycle Policies", "S3 Object Lock", "AWS Backup"],
    correctAnswer: 1,
    explanation:
      "S3 Lifecycle Policies allow you to define rules for transitioning objects between storage classes and deleting objects after specified time periods. You can create a policy to transition to Glacier after 90 days and expire (delete) objects after 7 years automatically.",
    incorrectExplanations: [
      "Intelligent-Tiering moves based on access patterns, not fixed time periods.",
      "Object Lock prevents deletion for compliance but doesn't automate transitions or deletion.",
      "AWS Backup manages backups but doesn't control S3 lifecycle transitions.",
    ],
    relatedServices: ["S3", "Lifecycle Policies", "Glacier"],
    tags: ["storage", "s3", "lifecycle", "automation"],
  },
  {
    id: "178",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "What is the difference between S3 Cross-Region Replication (CRR) and Same-Region Replication (SRR)?",
    options: [
      "CRR replicates to different region, SRR within same region for compliance/lower latency",
      "CRR is automatic, SRR requires manual configuration",
      "CRR is free, SRR has data transfer costs",
      "CRR replicates metadata only, SRR replicates full objects",
    ],
    correctAnswer: 0,
    explanation:
      "Cross-Region Replication (CRR) replicates objects to buckets in different AWS Regions for disaster recovery and compliance. Same-Region Replication (SRR) replicates within the same region to aggregate logs, replicate between production and test accounts, or meet data sovereignty requirements with lower latency.",
    incorrectExplanations: [
      "Both CRR and SRR require configuration; neither is automatic by default.",
      "Both have costs; CRR has cross-region data transfer costs, SRR has same-region costs.",
      "Both replicate full objects including metadata; no metadata-only replication.",
    ],
    relatedServices: ["S3", "CRR", "SRR", "Replication"],
    tags: ["storage", "s3", "replication", "crr", "srr"],
  },
  {
    id: "179",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "Which S3 feature prevents accidental deletion of objects by keeping multiple versions of each object?",
    options: ["S3 Object Lock", "S3 Versioning", "S3 Lifecycle Policies", "S3 MFA Delete"],
    correctAnswer: 1,
    explanation:
      "S3 Versioning keeps multiple versions of an object in the same bucket. When you delete an object, S3 inserts a delete marker instead of removing it, allowing you to restore previous versions. This protects against accidental deletions and allows rollback to previous versions.",
    incorrectExplanations: [
      "Object Lock prevents deletion for a retention period (WORM model) but doesn't keep versions automatically.",
      "Lifecycle Policies manage object transitions and expiration, don't prevent deletion.",
      "MFA Delete requires MFA for deleting versions but doesn't keep versions; it's used with Versioning.",
    ],
    relatedServices: ["S3", "Versioning"],
    tags: ["storage", "s3", "versioning", "data-protection"],
  },
  {
    id: "180",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "A company needs to transfer 80TB of data to AWS for initial migration. Upload over internet would take weeks. Which AWS service is MOST appropriate?",
    options: ["AWS Direct Connect", "AWS DataSync", "AWS Snowball", "S3 Transfer Acceleration"],
    correctAnswer: 2,
    explanation:
      "AWS Snowball is a petabyte-scale data transfer device for moving large amounts of data (50-80TB per device) into AWS when network transfer is impractical. You copy data to the device on-premises, ship it to AWS, and AWS uploads to S3. For 80TB, Snowball is faster and more cost-effective than internet transfer.",
    incorrectExplanations: [
      "Direct Connect provides dedicated network connection but doesn't solve the initial large transfer problem.",
      "DataSync transfers data online; for 80TB, physical transfer via Snowball is faster.",
      "Transfer Acceleration speeds up S3 uploads but still uses internet; not practical for 80TB initial migration.",
    ],
    relatedServices: ["Snowball", "Snow Family", "Migration"],
    tags: ["storage", "migration", "snowball", "data-transfer"],
  },
  {
    id: "181",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "What is the largest AWS Snow Family device for exabyte-scale data transfer?",
    options: ["AWS Snowcone", "AWS Snowball", "AWS Snowmobile", "AWS DataSync"],
    correctAnswer: 2,
    explanation:
      "AWS Snowmobile is a 45-foot shipping container truck that can transfer up to 100PB of data (exabyte-scale). It's for the largest data migrations like data center shutdowns. AWS drives the truck to your location, connects it to your network, you transfer data, then AWS transports it to an AWS region.",
    incorrectExplanations: [
      "Snowcone is the smallest device (8-14TB), for edge computing and small transfers.",
      "Snowball handles 50-80TB; much smaller than Snowmobile.",
      "DataSync is software for online data transfer, not a physical device.",
    ],
    relatedServices: ["Snowmobile", "Snow Family"],
    tags: ["storage", "migration", "snowmobile", "exabyte"],
  },
  {
    id: "182",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "A company needs to integrate on-premises applications with cloud storage while caching frequently accessed data locally. Which service is appropriate?",
    options: ["AWS Direct Connect", "AWS Storage Gateway", "AWS DataSync", "Amazon EFS"],
    correctAnswer: 1,
    explanation:
      "AWS Storage Gateway is a hybrid cloud storage service that connects on-premises applications to AWS storage (S3, EBS, FSx) with local caching. File Gateway, Volume Gateway, and Tape Gateway variants provide seamless integration while caching hot data on-premises for low-latency access.",
    incorrectExplanations: [
      "Direct Connect provides network connectivity but doesn't cache data locally.",
      "DataSync transfers data between on-premises and AWS but doesn't provide application integration or caching.",
      "EFS is cloud-native file storage; Storage Gateway provides the hybrid integration and caching.",
    ],
    relatedServices: ["Storage Gateway", "Hybrid Cloud"],
    tags: ["storage", "hybrid", "storage-gateway", "caching"],
  },
  {
    id: "183",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "Which Storage Gateway type presents cloud storage as iSCSI block volumes for on-premises applications?",
    options: ["File Gateway", "Volume Gateway", "Tape Gateway", "S3 Gateway"],
    correctAnswer: 1,
    explanation:
      "Volume Gateway presents cloud-backed iSCSI block storage volumes to on-premises applications. It provides cached volumes (primary storage in AWS with local cache) or stored volumes (primary storage on-premises with async backup to AWS), ideal for applications requiring block storage.",
    incorrectExplanations: [
      "File Gateway presents S3 as NFS/SMB file shares, not block storage.",
      "Tape Gateway emulates physical tape libraries for backup applications.",
      "S3 Gateway isn't a Storage Gateway type; File Gateway uses S3.",
    ],
    relatedServices: ["Storage Gateway", "Volume Gateway", "iSCSI"],
    tags: ["storage", "storage-gateway", "volume-gateway", "iscsi"],
  },
  {
    id: "184",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "A Windows application requires shared file storage accessible from multiple EC2 instances. Which service is MOST appropriate?",
    options: ["Amazon EBS", "Amazon EFS", "Amazon FSx for Windows File Server", "Amazon S3"],
    correctAnswer: 2,
    explanation:
      "Amazon FSx for Windows File Server provides fully managed Windows-native shared file storage built on Windows Server with SMB protocol, NTFS, and Active Directory integration. It's designed for Windows applications requiring shared file storage, unlike EFS which is for Linux.",
    incorrectExplanations: [
      "EBS is block storage attached to single instance, not shared file storage.",
      "EFS is designed for Linux workloads using NFS protocol, not Windows SMB.",
      "S3 is object storage, not file system storage with Windows features.",
    ],
    relatedServices: ["FSx", "Windows File Server", "Storage"],
    tags: ["storage", "fsx", "windows", "shared-storage"],
  },
  {
    id: "185",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "Which FSx file system is optimized for high-performance computing workloads processing massive datasets?",
    options: ["FSx for Windows File Server", "FSx for Lustre", "FSx for NetApp ONTAP", "FSx for OpenZFS"],
    correctAnswer: 1,
    explanation:
      "Amazon FSx for Lustre provides high-performance file systems optimized for HPC, machine learning, and media processing. It delivers sub-millisecond latencies, up to hundreds of GB/s throughput, and millions of IOPS. It can integrate with S3 for processing large datasets.",
    incorrectExplanations: [
      "FSx for Windows is for Windows applications, not optimized for HPC.",
      "FSx for NetApp ONTAP provides NetApp features but not Lustre's HPC performance.",
      "FSx for OpenZFS provides ZFS features but not specialized for HPC like Lustre.",
    ],
    relatedServices: ["FSx", "Lustre", "HPC"],
    tags: ["storage", "fsx", "lustre", "hpc"],
  },
  {
    id: "186",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "Which AWS service automates data transfer between on-premises storage and AWS with bandwidth throttling and data validation?",
    options: ["AWS Storage Gateway", "AWS DataSync", "AWS Transfer Family", "AWS Direct Connect"],
    correctAnswer: 1,
    explanation:
      "AWS DataSync is purpose-built for automating data transfers between on-premises and AWS (or between AWS storage services) with up to 10x faster speeds than open-source tools. It includes data validation, bandwidth throttling, scheduling, and encryption, ideal for migrations and periodic transfers.",
    incorrectExplanations: [
      "Storage Gateway provides hybrid storage access, not automated bulk transfers.",
      "Transfer Family provides SFTP/FTPS/FTP servers for file transfers, not automated data sync.",
      "Direct Connect provides network connectivity but doesn't automate data transfer.",
    ],
    relatedServices: ["DataSync", "Migration"],
    tags: ["storage", "datasync", "migration", "automation"],
  },
  {
    id: "187",
    domain: "Storage and Encryption",
    difficulty: "advanced",
    scenario:
      "A company needs centralized backup management across EC2, EBS, RDS, DynamoDB, and on-premises with compliance reporting. What should they use?",
    options: ["AWS Backup", "EBS Snapshots", "RDS Automated Backups", "AWS Storage Gateway"],
    correctAnswer: 0,
    explanation:
      "AWS Backup provides centralized backup management across AWS services (EC2, EBS, RDS, DynamoDB, EFS, FSx, Storage Gateway) with policy-based backup schedules, retention, lifecycle, and compliance reporting. It simplifies backup management compared to using each service's individual backup features.",
    incorrectExplanations: [
      "EBS Snapshots only backup EBS volumes, not other services or centralized management.",
      "RDS Automated Backups only backup RDS databases, not a centralized solution.",
      "Storage Gateway enables hybrid storage but isn't a backup management service.",
    ],
    relatedServices: ["AWS Backup", "Backup Management"],
    tags: ["storage", "backup", "disaster-recovery", "compliance"],
  },
  {
    id: "188",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "What S3 feature can accelerate uploads and downloads by using CloudFront's edge locations?",
    options: ["S3 Multipart Upload", "S3 Transfer Acceleration", "S3 Cross-Region Replication", "S3 Intelligent-Tiering"],
    correctAnswer: 1,
    explanation:
      "S3 Transfer Acceleration uses CloudFront's globally distributed edge locations to accelerate uploads to S3. Data arrives at an edge location and is routed to S3 over optimized network paths, providing up to 50-500% faster transfers for long-distance uploads.",
    incorrectExplanations: [
      "Multipart Upload improves large file uploads by parallelization but doesn't use edge locations.",
      "CRR replicates data between regions after upload, doesn't accelerate initial upload.",
      "Intelligent-Tiering optimizes storage costs, not transfer speeds.",
    ],
    relatedServices: ["S3", "Transfer Acceleration", "CloudFront"],
    tags: ["storage", "s3", "transfer-acceleration", "performance"],
  },
  {
    id: "189",
    domain: "Storage and Encryption",
    difficulty: "intermediate",
    scenario:
      "Which EBS volume type provides the highest IOPS performance for mission-critical databases?",
    options: ["General Purpose SSD (gp3)", "Provisioned IOPS SSD (io2)", "Throughput Optimized HDD (st1)", "Cold HDD (sc1)"],
    correctAnswer: 1,
    explanation:
      "Provisioned IOPS SSD (io2/io2 Block Express) provides the highest performance with up to 64,000 IOPS and 99.999% durability. It's designed for mission-critical applications, I/O-intensive databases, and workloads requiring sustained IOPS performance with low latency.",
    incorrectExplanations: [
      "gp3 provides good performance (16,000 IOPS) but io2 delivers higher IOPS for critical workloads.",
      "st1 is HDD optimized for throughput, not IOPS-intensive workloads.",
      "sc1 is lowest-cost HDD for infrequently accessed data, not high-performance.",
    ],
    relatedServices: ["EBS", "io2", "Storage"],
    tags: ["storage", "ebs", "iops", "performance"],
  },
  // PRIORITY 1: NETWORKING (10 questions)
  {
    id: "190",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to route HTTP/HTTPS traffic to multiple target groups based on URL path (e.g., /api, /images). Which load balancer should they use?",
    options: ["Classic Load Balancer", "Network Load Balancer", "Application Load Balancer", "Gateway Load Balancer"],
    correctAnswer: 2,
    explanation:
      "Application Load Balancer (ALB) operates at Layer 7 (HTTP/HTTPS) and supports content-based routing including path-based routing, host-based routing, and query string routing. It can route requests to different target groups based on URL paths, making it ideal for microservices.",
    incorrectExplanations: [
      "Classic Load Balancer is legacy and doesn't support advanced routing features.",
      "Network Load Balancer operates at Layer 4 (TCP/UDP) and doesn't inspect HTTP content for routing.",
      "Gateway Load Balancer is for deploying third-party virtual appliances, not web traffic routing.",
    ],
    relatedServices: ["ALB", "ELB", "Load Balancing"],
    tags: ["networking", "alb", "load-balancing", "layer-7"],
  },
  {
    id: "191",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "Which load balancer provides ultra-low latency and handles millions of requests per second while preserving source IP addresses?",
    options: ["Application Load Balancer", "Network Load Balancer", "Classic Load Balancer", "Gateway Load Balancer"],
    correctAnswer: 1,
    explanation:
      "Network Load Balancer (NLB) operates at Layer 4 (TCP/UDP/TLS) and provides extreme performance with ultra-low latency, handling millions of requests per second. It preserves the client's source IP address and supports static IP addresses via Elastic IPs, ideal for high-performance or static IP requirements.",
    incorrectExplanations: [
      "ALB operates at Layer 7 with slightly higher latency than NLB; doesn't preserve source IP by default.",
      "Classic Load Balancer has lower performance than NLB and is legacy.",
      "Gateway Load Balancer is for virtual appliance deployment, not general application traffic.",
    ],
    relatedServices: ["NLB", "ELB", "Load Balancing"],
    tags: ["networking", "nlb", "load-balancing", "layer-4", "performance"],
  },
  {
    id: "192",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which Route 53 routing policy routes traffic to multiple resources based on weights you assign?",
    options: ["Simple routing", "Weighted routing", "Latency-based routing", "Failover routing"],
    correctAnswer: 1,
    explanation:
      "Weighted routing policy allows you to associate multiple resources with a DNS name and specify a weight (0-255) for each. Route 53 routes traffic proportionally based on these weights, useful for load balancing, A/B testing, or gradual deployment rollouts.",
    incorrectExplanations: [
      "Simple routing returns all values in random order, no weight control.",
      "Latency-based routing routes based on lowest network latency, not weights.",
      "Failover routing routes to primary unless unhealthy, then to secondary.",
    ],
    relatedServices: ["Route 53", "DNS"],
    tags: ["networking", "route-53", "weighted-routing", "traffic-management"],
  },
  {
    id: "193",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which Route 53 routing policy should be used to route users to the endpoint with the lowest network latency?",
    options: ["Geolocation routing", "Geoproximity routing", "Latency-based routing", "Weighted routing"],
    correctAnswer: 2,
    explanation:
      "Latency-based routing routes users to the AWS region that provides the lowest latency. Route 53 measures latency between users and AWS regions, then routes each request to the region with best performance, improving user experience for global applications.",
    incorrectExplanations: [
      "Geolocation routing routes based on geographic location, not network latency.",
      "Geoproximity routing routes based on physical distance and bias, not measured latency.",
      "Weighted routing distributes traffic based on assigned weights, not latency.",
    ],
    relatedServices: ["Route 53", "DNS"],
    tags: ["networking", "route-53", "latency-routing", "performance"],
  },
  {
    id: "194",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "What is the main difference between AWS Direct Connect and AWS VPN?",
    options: [
      "Direct Connect uses dedicated private connection, VPN uses encrypted internet connection",
      "Direct Connect is slower than VPN",
      "Direct Connect requires AWS Shield, VPN doesn't",
      "Direct Connect is only for S3, VPN is for all services",
    ],
    correctAnswer: 0,
    explanation:
      "AWS Direct Connect establishes a dedicated private network connection from your premises to AWS, bypassing the internet for consistent network performance. AWS VPN creates encrypted connections over the public internet. Direct Connect offers more consistent bandwidth and lower latency but takes weeks to set up and costs more.",
    incorrectExplanations: [
      "Direct Connect is typically faster and more consistent than VPN over internet.",
      "Neither requires Shield; Direct Connect provides private connection security without encryption overhead.",
      "Both can access all AWS services; Direct Connect isn't limited to S3.",
    ],
    relatedServices: ["Direct Connect", "VPN", "Networking"],
    tags: ["networking", "direct-connect", "vpn", "hybrid-connectivity"],
  },
  {
    id: "195",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company has 20 VPCs that need to communicate with each other. What is the MOST scalable solution compared to VPC peering?",
    options: ["AWS Direct Connect", "AWS Transit Gateway", "VPC Peering mesh", "AWS PrivateLink"],
    correctAnswer: 1,
    explanation:
      "AWS Transit Gateway acts as a central hub connecting multiple VPCs and on-premises networks through a single gateway. It eliminates complex peering relationships (20 VPCs would require 190 peering connections in a mesh). Transit Gateway simplifies management, reduces operational overhead, and scales to thousands of VPCs.",
    incorrectExplanations: [
      "Direct Connect connects on-premises to AWS but doesn't simplify VPC-to-VPC connectivity.",
      "VPC Peering mesh requires N*(N-1)/2 connections; doesn't scale well for many VPCs.",
      "PrivateLink provides private access to services, not general VPC interconnection.",
    ],
    relatedServices: ["Transit Gateway", "VPC", "Networking"],
    tags: ["networking", "transit-gateway", "vpc", "scalability"],
  },
  {
    id: "196",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service improves global application availability and performance by routing traffic through the AWS global network?",
    options: ["Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53", "Elastic Load Balancing"],
    correctAnswer: 1,
    explanation:
      "AWS Global Accelerator provides two static anycast IP addresses that route traffic through the AWS global network infrastructure to optimal endpoints. Unlike CloudFront (caching CDN), Global Accelerator improves performance for non-HTTP use cases (TCP/UDP) and provides instant failover and static IPs.",
    incorrectExplanations: [
      "CloudFront is a CDN that caches content; Global Accelerator improves routing for any protocol.",
      "Route 53 provides DNS routing but Global Accelerator routes through AWS backbone network.",
      "ELB distributes traffic within a region; Global Accelerator optimizes global routing.",
    ],
    relatedServices: ["Global Accelerator", "Networking"],
    tags: ["networking", "global-accelerator", "performance", "availability"],
  },
  {
    id: "197",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company wants to connect two VPCs in the same region to share resources. What is the SIMPLEST solution?",
    options: ["AWS Transit Gateway", "VPC Peering", "AWS PrivateLink", "Internet Gateway"],
    correctAnswer: 1,
    explanation:
      "VPC Peering creates a direct network connection between two VPCs allowing resources to communicate using private IP addresses. For connecting just two VPCs, peering is simpler and more cost-effective than Transit Gateway. It works across regions and accounts.",
    incorrectExplanations: [
      "Transit Gateway is better for multiple VPCs but adds complexity and cost for just two VPCs.",
      "PrivateLink provides access to specific services, not general VPC-to-VPC communication.",
      "Internet Gateway provides internet access, not private VPC-to-VPC connectivity.",
    ],
    relatedServices: ["VPC", "VPC Peering", "Networking"],
    tags: ["networking", "vpc-peering", "vpc", "connectivity"],
  },
  {
    id: "198",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which service distributes incoming application traffic across multiple targets in multiple Availability Zones?",
    options: ["Amazon Route 53", "AWS Auto Scaling", "Elastic Load Balancing", "AWS Global Accelerator"],
    correctAnswer: 2,
    explanation:
      "Elastic Load Balancing (ELB) automatically distributes incoming traffic across multiple targets (EC2 instances, containers, IP addresses) in one or more Availability Zones. ELB performs health checks and only routes to healthy targets, increasing application fault tolerance.",
    incorrectExplanations: [
      "Route 53 provides DNS routing to different regions, not load balancing within a region.",
      "Auto Scaling launches/terminates instances but doesn't distribute traffic; works with ELB.",
      "Global Accelerator routes traffic globally through AWS network but doesn't replace regional load balancing.",
    ],
    relatedServices: ["ELB", "ALB", "NLB"],
    tags: ["networking", "elb", "load-balancing", "high-availability"],
  },
  {
    id: "199",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "What Route 53 routing policy routes traffic based on the geographic location of users?",
    options: ["Latency-based routing", "Geolocation routing", "Geoproximity routing", "Multivalue answer routing"],
    correctAnswer: 1,
    explanation:
      "Geolocation routing routes traffic based on the geographic location of your users (continent, country, or state). Use cases include content localization, restricting content distribution, and load balancing predictably. It's based on user location, not proximity to resources.",
    incorrectExplanations: [
      "Latency-based routing uses measured latency, not geographic location.",
      "Geoproximity routing uses geographic location AND bias to shift traffic, with more granular control.",
      "Multivalue answer routing returns multiple healthy IP addresses randomly, not based on location.",
    ],
    relatedServices: ["Route 53", "DNS"],
    tags: ["networking", "route-53", "geolocation", "routing"],
  },
  // PRIORITY 1: ANALYTICS (8 questions) - Almost No Coverage
  {
    id: "200",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "A company wants to analyze data stored in S3 using standard SQL queries without moving the data. Which service should they use?",
    options: ["Amazon Redshift", "Amazon Athena", "Amazon EMR", "AWS Glue"],
    correctAnswer: 1,
    explanation:
      "Amazon Athena is a serverless interactive query service that analyzes data directly in S3 using standard SQL. You don't need to load data or manage infrastructure - just point Athena at your S3 data, define schema, and start querying. You pay only for queries run.",
    incorrectExplanations: [
      "Redshift is a data warehouse requiring data loading; not for querying data in-place in S3.",
      "EMR processes big data using Hadoop/Spark but requires cluster management.",
      "Glue is an ETL service for preparing and transforming data, not querying.",
    ],
    relatedServices: ["Athena", "S3", "Analytics"],
    tags: ["analytics", "athena", "sql", "serverless"],
  },
  {
    id: "201",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service provides business intelligence dashboards and visualizations?",
    options: ["Amazon Athena", "Amazon QuickSight", "AWS Glue", "Amazon CloudWatch"],
    correctAnswer: 1,
    explanation:
      "Amazon QuickSight is a cloud-native business intelligence service for creating interactive dashboards and visualizations. It connects to various data sources (RDS, Redshift, Athena, S3), uses machine learning for insights, and allows sharing dashboards with users at scale.",
    incorrectExplanations: [
      "Athena queries data but doesn't create dashboards; QuickSight visualizes Athena results.",
      "Glue prepares data for analysis but doesn't create visualizations.",
      "CloudWatch monitors AWS resources, not a BI tool for business data visualization.",
    ],
    relatedServices: ["QuickSight", "BI", "Analytics"],
    tags: ["analytics", "quicksight", "bi", "dashboards"],
  },
  {
    id: "202",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to ingest, process, and analyze real-time streaming data from thousands of IoT devices. Which service is MOST appropriate?",
    options: ["Amazon SQS", "Amazon Kinesis Data Streams", "AWS Lambda", "Amazon SNS"],
    correctAnswer: 1,
    explanation:
      "Amazon Kinesis Data Streams is designed for real-time data ingestion at scale from hundreds of thousands of sources. It continuously captures and stores streaming data (logs, IoT telemetry, clickstreams) with low latency, allowing real-time processing and analysis.",
    incorrectExplanations: [
      "SQS is for message queuing, not real-time streaming data collection and analysis.",
      "Lambda processes data but doesn't collect/stream it; often used to process Kinesis streams.",
      "SNS is for pub/sub notifications, not streaming data collection.",
    ],
    relatedServices: ["Kinesis", "Streaming", "IoT"],
    tags: ["analytics", "kinesis", "streaming", "real-time", "iot"],
  },
  {
    id: "203",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which Kinesis service loads streaming data into data stores like S3, Redshift, and Elasticsearch?",
    options: ["Kinesis Data Streams", "Kinesis Data Firehose", "Kinesis Data Analytics", "Kinesis Video Streams"],
    correctAnswer: 1,
    explanation:
      "Amazon Kinesis Data Firehose is the easiest way to load streaming data into data stores and analytics services. It captures, transforms, and automatically loads data into S3, Redshift, Elasticsearch, or Splunk without writing code. It's fully managed with automatic scaling.",
    incorrectExplanations: [
      "Kinesis Data Streams captures data but requires you to write consumers to load into destinations.",
      "Kinesis Data Analytics analyzes streaming data with SQL, doesn't load data.",
      "Kinesis Video Streams captures video streams, not general data loading.",
    ],
    relatedServices: ["Kinesis", "Firehose", "Streaming"],
    tags: ["analytics", "kinesis", "firehose", "data-loading"],
  },
  {
    id: "204",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company wants to run SQL queries on streaming data in real-time to generate alerts. Which service should they use?",
    options: ["Kinesis Data Streams", "Kinesis Data Firehose", "Kinesis Data Analytics", "Amazon Athena"],
    correctAnswer: 2,
    explanation:
      "Amazon Kinesis Data Analytics allows you to process and analyze streaming data in real-time using standard SQL. You can query data from Kinesis streams or Firehose, create alerts based on patterns, and send results to AWS services like Lambda for action.",
    incorrectExplanations: [
      "Kinesis Data Streams captures data but doesn't provide SQL query capability.",
      "Kinesis Data Firehose delivers data but doesn't analyze or query it.",
      "Athena queries static data in S3, not real-time streaming data.",
    ],
    relatedServices: ["Kinesis", "Data Analytics", "Streaming"],
    tags: ["analytics", "kinesis", "real-time", "sql"],
  },
  {
    id: "205",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS service is a fully managed ETL (Extract, Transform, Load) service for preparing data for analytics?",
    options: ["AWS Glue", "Amazon Athena", "Amazon EMR", "AWS Data Pipeline"],
    correctAnswer: 0,
    explanation:
      "AWS Glue is a serverless ETL service that discovers, catalogs, and transforms data for analytics. It automatically generates ETL code (Python/Scala), has a Data Catalog for metadata management, and integrates with Athena, Redshift, and EMR. It simplifies data preparation without managing infrastructure.",
    incorrectExplanations: [
      "Athena queries data but doesn't transform it for ETL purposes.",
      "EMR processes big data but requires cluster management; Glue is serverless.",
      "Data Pipeline orchestrates data workflows but is being replaced by Glue and Step Functions.",
    ],
    relatedServices: ["Glue", "ETL", "Analytics"],
    tags: ["analytics", "glue", "etl", "data-preparation"],
  },
  {
    id: "206",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs to process large datasets using Apache Spark and Hadoop. Which AWS service should they use?",
    options: ["AWS Glue", "Amazon EMR", "Amazon Athena", "AWS Batch"],
    correctAnswer: 1,
    explanation:
      "Amazon EMR (Elastic MapReduce) is a managed big data platform for processing vast amounts of data using Apache Spark, Hadoop, HBase, Presto, and Flink. It handles cluster provisioning, configuration, and tuning while you focus on data processing. It's ideal for log analysis, machine learning, and data transformations.",
    incorrectExplanations: [
      "Glue is serverless ETL; EMR provides full big data framework support for complex processing.",
      "Athena queries data but doesn't provide Spark/Hadoop frameworks for complex processing.",
      "Batch runs batch computing jobs but doesn't provide big data frameworks.",
    ],
    relatedServices: ["EMR", "Spark", "Hadoop", "Big Data"],
    tags: ["analytics", "emr", "big-data", "spark", "hadoop"],
  },
  {
    id: "207",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which service provides machine learning-based forecasting for time series data like product demand or resource needs?",
    options: ["Amazon SageMaker", "Amazon Forecast", "Amazon Comprehend", "Amazon Rekognition"],
    correctAnswer: 1,
    explanation:
      "Amazon Forecast uses machine learning to deliver highly accurate time series forecasts. You provide historical time series data and any additional variables, and Forecast automatically builds models for predictions like product demand, inventory needs, or workforce requirements.",
    incorrectExplanations: [
      "SageMaker is a general ML platform for building custom models; Forecast is purpose-built for time series.",
      "Comprehend does natural language processing, not forecasting.",
      "Rekognition analyzes images and videos, not time series forecasting.",
    ],
    relatedServices: ["Forecast", "Machine Learning"],
    tags: ["analytics", "ml", "forecast", "time-series"],
  },
  // PRIORITY 2: DATABASES (6 questions)
  {
    id: "208",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS caching service provides an in-memory data store compatible with Redis and Memcached?",
    options: ["Amazon DynamoDB", "Amazon RDS", "Amazon ElastiCache", "Amazon Aurora"],
    correctAnswer: 2,
    explanation:
      "Amazon ElastiCache is a fully managed in-memory caching service supporting Redis and Memcached. It improves application performance by caching frequently accessed data, reducing database load. Use Redis for advanced features (persistence, pub/sub) or Memcached for simple caching.",
    incorrectExplanations: [
      "DynamoDB is a NoSQL database with optional DAX caching, not a general caching service.",
      "RDS is a relational database, not an in-memory cache.",
      "Aurora is a relational database; though fast, it's not an in-memory cache.",
    ],
    relatedServices: ["ElastiCache", "Redis", "Memcached"],
    tags: ["database", "caching", "elasticache", "performance"],
  },
  {
    id: "209",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "What is the difference between ElastiCache Redis and Memcached?",
    options: [
      "Redis supports persistence and complex data types, Memcached is simpler and multi-threaded",
      "Memcached is faster than Redis in all scenarios",
      "Redis only works with RDS, Memcached with DynamoDB",
      "They are identical in features and use cases",
    ],
    correctAnswer: 0,
    explanation:
      "Redis supports data persistence, complex data types (lists, sets, sorted sets), pub/sub messaging, replication, and automatic failover. Memcached is simpler, multi-threaded for multi-core usage, and best for simple key-value caching with horizontal scaling. Choose Redis for advanced features, Memcached for simple distributed caching.",
    incorrectExplanations: [
      "Performance depends on use case; Memcached's multi-threading helps for simple caching at scale.",
      "Neither is specific to RDS or DynamoDB; both work with any application.",
      "They have different architectures and feature sets as described.",
    ],
    relatedServices: ["ElastiCache", "Redis", "Memcached"],
    tags: ["database", "caching", "redis", "memcached", "comparison"],
  },
  {
    id: "210",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS database service is designed for graph databases to store and query highly connected data?",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Neptune", "Amazon DocumentDB"],
    correctAnswer: 2,
    explanation:
      "Amazon Neptune is a fully managed graph database service supporting property graph (Gremlin) and RDF (SPARQL) query languages. It's optimized for storing and navigating relationships in highly connected datasets like social networks, recommendation engines, fraud detection, and knowledge graphs.",
    incorrectExplanations: [
      "RDS supports relational databases, not graph databases.",
      "DynamoDB is a key-value/document NoSQL database, not optimized for graph queries.",
      "DocumentDB is compatible with MongoDB for document data, not graph relationships.",
    ],
    relatedServices: ["Neptune", "Graph Database"],
    tags: ["database", "neptune", "graph", "relationships"],
  },
  {
    id: "211",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which database service provides MongoDB compatibility for document-oriented database workloads?",
    options: ["Amazon DynamoDB", "Amazon DocumentDB", "Amazon RDS", "Amazon Neptune"],
    correctAnswer: 1,
    explanation:
      "Amazon DocumentDB is a fast, scalable, highly available document database service that's compatible with MongoDB APIs. It's designed for JSON data and MongoDB workloads, providing MongoDB compatibility while being fully managed by AWS with automatic backups and patching.",
    incorrectExplanations: [
      "DynamoDB is document-capable but doesn't provide MongoDB compatibility.",
      "RDS supports relational databases (MySQL, PostgreSQL, etc.), not MongoDB.",
      "Neptune is for graph databases, not document databases.",
    ],
    relatedServices: ["DocumentDB", "MongoDB"],
    tags: ["database", "documentdb", "mongodb", "nosql"],
  },
  {
    id: "212",
    domain: "Cloud Technology and Services",
    difficulty: "advanced",
    scenario:
      "A company needs a ledger database that provides an immutable, cryptographically verifiable transaction log. Which service is appropriate?",
    options: ["Amazon RDS", "Amazon QLDB", "Amazon DynamoDB", "Amazon Aurora"],
    correctAnswer: 1,
    explanation:
      "Amazon QLDB (Quantum Ledger Database) is a purpose-built ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central authority. It tracks all application data changes with complete and verifiable history, ideal for systems of record like financial transactions.",
    incorrectExplanations: [
      "RDS is a general relational database without built-in cryptographic verification.",
      "DynamoDB provides consistency but not cryptographically verifiable immutability.",
      "Aurora is a relational database without ledger-specific features.",
    ],
    relatedServices: ["QLDB", "Ledger", "Blockchain"],
    tags: ["database", "qldb", "ledger", "immutable"],
  },
  {
    id: "213",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario:
      "Which AWS database is optimized for storing and analyzing time-series data like IoT sensor data?",
    options: ["Amazon RDS", "Amazon Timestream", "Amazon DynamoDB", "Amazon Redshift"],
    correctAnswer: 1,
    explanation:
      "Amazon Timestream is a purpose-built time series database for IoT and operational applications. It stores and analyzes trillions of events per day at 1/10th the cost of relational databases. It automatically tiers data from memory to optimized storage and includes built-in time series analytics functions.",
    incorrectExplanations: [
      "RDS is general-purpose relational, not optimized for time series at scale.",
      "DynamoDB can store time series but isn't optimized with time series query functions.",
      "Redshift is for data warehousing, not real-time time series ingestion and analysis.",
    ],
    relatedServices: ["Timestream", "Time Series", "IoT"],
    tags: ["database", "timestream", "time-series", "iot"],
  },
]
