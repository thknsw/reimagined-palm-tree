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
]
