import type { Scenario } from '@/lib/scenarios'

// Additional AWS CLF-C02 questions extracted from practice tests
export const ADDITIONAL_SCENARIOS: Scenario[] = [
  {
    id: "aws-1",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario: "Which of the following statements are CORRECT regarding security groups and network access control lists (network ACL)? (Select two)",
    options: [
      "A network access control list (network ACL) contains a numbered list of rules and evaluates these rules in the increasing order while deciding whether to allow the traffic",
      "A security group contains a numbered list of rules and evaluates these rules in the increasing order while deciding whether to allow the traffic",
      "A network access control list (network ACL) is stateful, that is, it automatically allows the return traffic",
      "A security group is stateful, that is, it automatically allows the return traffic",
      "A security group is stateless, that is, the return traffic must be explicitly allowed"
    ],
    correctAnswer: [0, 3],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Network ACLs evaluate rules in order (lowest to highest) and are stateless, meaning return traffic must be explicitly allowed. Security groups are stateful, automatically allowing return traffic, and evaluate all rules before deciding whether to allow traffic.",
    incorrectExplanations: [
      "Security groups evaluate ALL rules before deciding, not in increasing order",
      "Network ACLs are stateless, not stateful",
      "Security groups are stateful, not stateless"
    ],
    relatedServices: ["VPC", "Security Groups", "Network ACLs"],
    tags: ["networking", "security", "vpc"]
  },
  {
    id: "aws-2",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which of the following is the best way to protect your data from accidental deletion on Amazon S3?",
    options: [
      "Amazon S3 Transfer Acceleration (Amazon S3TA)",
      "Amazon S3 storage classes",
      "Amazon S3 lifecycle configuration",
      "Amazon S3 Versioning"
    ],
    correctAnswer: 3,
    explanation: "S3 Versioning maintains multiple versions of an object, allowing you to recover from accidental deletions or overwrites. When versioning is enabled, deleting an object creates a delete marker rather than permanently removing it.",
    incorrectExplanations: [
      "Transfer Acceleration speeds up uploads but doesn't protect from deletion",
      "Storage classes are for cost optimization, not deletion protection",
      "Lifecycle configuration automates moving or deleting objects, doesn't protect from accidental deletion"
    ],
    relatedServices: ["S3", "S3 Versioning"],
    tags: ["storage", "data-protection", "s3"]
  },
  {
    id: "aws-3",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "An organization maintains separate Amazon Virtual Private Clouds (Amazon VPC) for each of its departments. With expanding business, the organization now wants to connect all Amazon Virtual Private Clouds (Amazon VPC) for better departmental collaboration. Which AWS service will help the organization tackle the issue effectively?",
    options: [
      "VPC peering connection",
      "AWS Direct Connect",
      "AWS Site-to-Site VPN",
      "AWS Transit Gateway"
    ],
    correctAnswer: 3,
    explanation: "AWS Transit Gateway acts as a cloud router to connect multiple VPCs and on-premises networks through a central hub. It simplifies network architecture and reduces the operational overhead of managing multiple VPC peering connections. As the number of VPCs grows, Transit Gateway is much more scalable than individual peering connections.",
    incorrectExplanations: [
      "VPC peering works but requires individual connections between each VPC pair, becoming complex with many VPCs",
      "Direct Connect is for connecting on-premises data centers to AWS, not for connecting VPCs",
      "Site-to-Site VPN is for connecting on-premises networks to AWS, not for inter-VPC connectivity"
    ],
    relatedServices: ["Transit Gateway", "VPC", "VPC Peering"],
    tags: ["networking", "vpc", "connectivity"]
  },
  {
    id: "aws-4",
    domain: "Billing, Pricing and Support",
    difficulty: "beginner",
    scenario: "Compared to the on-demand instance prices, what is the highest possible discount offered for reserved instances (RI)?",
    options: [
      "72%",
      "90%",
      "50%",
      "40%"
    ],
    correctAnswer: 0,
    explanation: "Reserved Instances can provide up to 72% discount compared to On-Demand pricing when you commit to a 1 or 3-year term. The discount is highest with 3-year, all upfront payment, convertible reserved instances.",
    incorrectExplanations: [
      "90% is too high, maximum is 72%",
      "50% is a typical discount but not the maximum",
      "40% is below the maximum discount available"
    ],
    relatedServices: ["EC2", "Reserved Instances", "Savings Plans"],
    tags: ["pricing", "cost-optimization", "ec2"]
  },
  {
    id: "aws-5",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which of the following AWS services offer block-level storage? (Select two)",
    options: [
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic File System (Amazon EFS)",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Elastic Container Service (Amazon ECS)",
      "Instance Store"
    ],
    correctAnswer: [2, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Amazon EBS provides persistent block-level storage volumes for EC2 instances. Instance Store provides temporary block-level storage that is physically attached to the host computer. Both offer block-level storage, though Instance Store is ephemeral while EBS is persistent.",
    incorrectExplanations: [
      "S3 is object storage, not block storage",
      "EFS is file storage, not block storage",
      "ECS is a container orchestration service, not a storage service"
    ],
    relatedServices: ["EBS", "EC2", "Instance Store"],
    tags: ["storage", "block-storage", "ebs"]
  },
  {
    id: "aws-6",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario: "According to the AWS Shared Responsibility Model, which of the following are the responsibilities of the customer? (Select two)",
    options: [
      "Ensuring AWS employees cannot access customer data",
      "Operating system patches and updates of an Amazon Elastic Compute Cloud (Amazon EC2) instance",
      "Compliance validation of Cloud infrastructure",
      "AWS Global Network Security",
      "Managing IAM users and roles"
    ],
    correctAnswer: [1, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Under the Shared Responsibility Model, customers are responsible for 'security IN the cloud' including OS patches for EC2 instances and managing IAM users/roles. AWS handles 'security OF the cloud' including physical infrastructure, network, and hypervisor.",
    incorrectExplanations: [
      "AWS is responsible for ensuring employee access controls to infrastructure",
      "AWS handles compliance validation of the cloud infrastructure itself",
      "AWS manages the security of the global network infrastructure"
    ],
    relatedServices: ["IAM", "EC2", "Shared Responsibility Model"],
    tags: ["security", "compliance", "shared-responsibility"]
  },
  {
    id: "aws-7",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which of the following AWS services are regional in scope? (Select two)",
    options: [
      "Amazon CloudFront",
      "Amazon Rekognition",
      "AWS Identity and Access Management (AWS IAM)",
      "AWS Lambda",
      "AWS Web Application Firewall (AWS WAF)"
    ],
    correctAnswer: [1, 3],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Amazon Rekognition and AWS Lambda are regional services - you deploy them in specific AWS regions. Resources and configurations don't automatically replicate across regions.",
    incorrectExplanations: [
      "CloudFront is a global service with edge locations worldwide",
      "IAM is a global service - users and roles apply across all regions",
      "WAF can be deployed regionally or globally with CloudFront"
    ],
    relatedServices: ["Lambda", "Rekognition", "CloudFront", "IAM", "WAF"],
    tags: ["regions", "global-services", "regional-services"]
  },
  {
    id: "aws-8",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which AWS services/features support High Availability by default? (Select two)",
    options: [
      "Subnet",
      "Amazon Elastic Block Store (Amazon EBS)",
      "Instance Store",
      "Amazon DynamoDB",
      "Amazon Elastic File System (Amazon EFS)"
    ],
    correctAnswer: [3, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "DynamoDB automatically replicates data across multiple Availability Zones in a region for high availability. EFS also stores data redundantly across multiple AZs by default, providing high availability and durability.",
    incorrectExplanations: [
      "Subnets exist in a single AZ, not highly available by default",
      "EBS volumes are tied to a single AZ, requiring snapshots for multi-AZ redundancy",
      "Instance Store is ephemeral storage tied to a single instance and AZ"
    ],
    relatedServices: ["DynamoDB", "EFS", "EBS"],
    tags: ["high-availability", "storage", "database"]
  },
  {
    id: "aws-9",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario: "AWS Trusted Advisor analyzes your AWS environment and provides best practice recommendations for which of the following categories? (Select two)",
    options: [
      "Service Limits",
      "Change Management",
      "Elasticity",
      "Documentation",
      "Cost Optimization"
    ],
    correctAnswer: [0, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "AWS Trusted Advisor provides recommendations in five categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits. It helps identify cost savings opportunities and monitors service quotas.",
    incorrectExplanations: [
      "Change Management is not a Trusted Advisor category",
      "Elasticity is covered under Performance but isn't a standalone category",
      "Documentation is not a Trusted Advisor category"
    ],
    relatedServices: ["AWS Trusted Advisor", "Cost Explorer"],
    tags: ["monitoring", "optimization", "trusted-advisor"]
  },
  {
    id: "aws-10",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario: "Which of the following statements are true about Cost Allocation Tags in AWS Billing? (Select two)",
    options: [
      "For each resource, each tag key must be unique, but can have multiple values",
      "For each resource, each tag key must be unique, and each tag key can have only one value",
      "You must activate both AWS generated tags and user-defined tags separately before they can appear in Cost Explorer or on a cost allocation report",
      "Tags help in organizing resources and are a mandatory configuration item to run reports",
      "Only user-defined tags need to be activated before they can appear in Cost Explorer or on a cost allocation report"
    ],
    correctAnswer: [1, 2],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Each tag key must be unique per resource and can only have one value. Both AWS-generated tags (like aws:createdBy) and user-defined tags must be activated separately in the Billing console before appearing in cost reports.",
    incorrectExplanations: [
      "Tag keys cannot have multiple values - each key has exactly one value",
      "Tags are helpful but not mandatory for running reports",
      "Both AWS-generated and user-defined tags need activation"
    ],
    relatedServices: ["Cost Explorer", "Cost Allocation Tags", "AWS Billing"],
    tags: ["billing", "cost-management", "tags"]
  },
  {
    id: "aws-11",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which of the following statements are CORRECT about the AWS Auto Scaling group? (Select two)",
    options: [
      "Auto Scaling group scales in and reduces the number of Amazon EC2 instances to match a decrease in demand",
      "Auto Scaling group scales out and adds more number of Amazon EC2 instances to match an increase in demand",
      "Auto Scaling group scales down and reduces the number of Amazon EC2 instances to match a decrease in demand",
      "Auto Scaling group scales up and upgrades to a more powerful Amazon EC2 instance to match an increase in demand",
      "Auto Scaling group scales down and downgrades to a less powerful Amazon EC2 instance to match a decrease in demand"
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Auto Scaling uses 'scale out' (add instances) and 'scale in' (remove instances) terminology for horizontal scaling - adding or removing instances. 'Scale up/down' refers to vertical scaling (changing instance types), which Auto Scaling doesn't do automatically.",
    incorrectExplanations: [
      "'Scale down' typically means vertical scaling (smaller instance type), not horizontal scaling",
      "'Scale up' means vertical scaling (larger instance type), which Auto Scaling doesn't handle",
      "'Scale down' for vertical scaling is not what Auto Scaling does"
    ],
    relatedServices: ["Auto Scaling", "EC2"],
    tags: ["auto-scaling", "ec2", "scalability"]
  },
  {
    id: "aws-12",
    domain: "Billing, Pricing and Support",
    difficulty: "advanced",
    scenario: "A customer is running a comparative study of pricing models of Amazon EFS and Amazon Elastic Block Store (Amazon EBS) that are used with the Amazon EC2 instances that host the application. Which of the following statements are correct regarding this use-case? (Select two)",
    options: [
      "You will pay a fee each time you read from or write data stored on the Amazon Elastic File System (Amazon EFS) - Infrequent Access storage class",
      "Amazon Elastic Block Store (Amazon EBS) Snapshots are stored incrementally, which means you are billed only for the changed blocks stored",
      "Amazon Elastic Compute Cloud (Amazon EC2) data transfer charges will apply for all Amazon Elastic Block Store (Amazon EBS) direct APIs for Snapshots",
      "Amazon Elastic Block Store (Amazon EBS) Snapshot storage pricing is based on the amount of space your data consumes in Amazon Elastic Block Store (Amazon EBS)",
      "With AWS Backup, you pay only for the amount of Amazon Elastic File System (Amazon EFS) backup storage you use in a month, you need not pay for restoring this data"
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "EFS Infrequent Access (IA) charges for storage plus per-GB data access fees for reads/writes. EBS Snapshots are incremental - only changed blocks since the last snapshot are stored and billed, saving costs.",
    incorrectExplanations: [
      "EC2 data transfer charges don't apply to EBS direct APIs for snapshots",
      "EBS Snapshot pricing is based on the amount stored in S3 (compressed), not the EBS volume size",
      "AWS Backup does charge for restoring EFS data"
    ],
    relatedServices: ["EFS", "EBS", "AWS Backup"],
    tags: ["pricing", "storage", "efs", "ebs"]
  },
  {
    id: "aws-13",
    domain: "Monitoring and Optimization",
    difficulty: "beginner",
    scenario: "Amazon CloudWatch billing metric data is stored in which AWS Region?",
    options: [
      "US East (N. Virginia) - us-east-1",
      "In the AWS Region where the AWS resource is provisioned",
      "In the AWS Region where the AWS account is created",
      "US West (N. California) - us-west-1"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch billing metrics are only available in the US East (N. Virginia) region (us-east-1), regardless of where your resources are located. You must switch to this region to view billing metrics in CloudWatch.",
    incorrectExplanations: [
      "Billing metrics are not stored in the resource's region",
      "Not related to where the account was created",
      "Not in us-west-1, specifically us-east-1"
    ],
    relatedServices: ["CloudWatch", "AWS Billing"],
    tags: ["monitoring", "billing", "cloudwatch"]
  },
  {
    id: "aws-14",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which Amazon Simple Storage Service (Amazon S3) storage class offers the lowest availability?",
    options: [
      "Amazon S3 Glacier Flexible Retrieval",
      "Amazon S3 Standard",
      "Amazon S3 Intelligent-Tiering",
      "Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)"
    ],
    correctAnswer: 3,
    explanation: "S3 One Zone-IA stores data in a single Availability Zone with 99.5% availability, which is lower than other S3 storage classes that store data across multiple AZs with 99.9-99.99% availability.",
    incorrectExplanations: [
      "Glacier has high durability, and while retrieval times vary, availability is still 99.9%",
      "S3 Standard offers 99.99% availability",
      "S3 Intelligent-Tiering offers 99.9% availability"
    ],
    relatedServices: ["S3", "S3 Storage Classes"],
    tags: ["storage", "s3", "availability"]
  },
  {
    id: "aws-15",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario: "A startup has just moved its IT infrastructure to AWS Cloud. The CTO would like to receive detailed reports that break down the startup's AWS costs by the hour in an Amazon Simple Storage Service (Amazon S3) bucket. As a Cloud Practitioner, which AWS service would you recommend for this use-case?",
    options: [
      "AWS Cost & Usage Report (AWS CUR)",
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator"
    ],
    correctAnswer: 0,
    explanation: "AWS Cost & Usage Report (CUR) provides the most detailed cost and usage data available, including hourly breakdowns. Reports are delivered to an S3 bucket in CSV format and can be analyzed with tools like Athena or QuickSight.",
    incorrectExplanations: [
      "Cost Explorer provides visualization but not detailed hourly reports in S3",
      "Budgets is for setting spending alerts, not generating detailed reports",
      "Pricing Calculator estimates costs before deployment, doesn't track actual usage"
    ],
    relatedServices: ["Cost & Usage Report", "Cost Explorer", "S3"],
    tags: ["billing", "cost-management", "reporting"]
  },
  {
    id: "aws-16",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which of the following capabilities does Amazon Rekognition provide as a ready-to-use feature?",
    options: [
      "Convert images into greyscale",
      "Identify objects in a photo",
      "Human pose detection",
      "Resize images quickly"
    ],
    correctAnswer: 1,
    explanation: "Amazon Rekognition is an AI service that provides image and video analysis capabilities, including object and scene detection, facial analysis, face comparison, text detection, and content moderation - all out of the box without needing ML expertise.",
    incorrectExplanations: [
      "Image format conversion is not a Rekognition feature",
      "While Rekognition can detect people, detailed pose detection is not a primary feature",
      "Image resizing is a basic image processing task, not an AI capability"
    ],
    relatedServices: ["Rekognition", "AI/ML Services"],
    tags: ["ai", "machine-learning", "image-recognition"]
  },
  {
    id: "aws-17",
    domain: "Cloud Technology and Services",
    difficulty: "beginner",
    scenario: "Which AWS service can be used to execute code triggered by new files being uploaded to Amazon Simple Storage Service (Amazon S3)?",
    options: [
      "Amazon Elastic Compute Cloud (Amazon EC2)",
      "Amazon Elastic Container Service (Amazon ECS)",
      "AWS Lambda",
      "Amazon Simple Queue Service (Amazon SQS)"
    ],
    correctAnswer: 2,
    explanation: "AWS Lambda is a serverless compute service that can automatically execute code in response to S3 events. You can configure S3 to trigger a Lambda function when objects are created, deleted, or modified, making it perfect for event-driven processing.",
    incorrectExplanations: [
      "EC2 requires manual setup and doesn't natively respond to S3 events",
      "ECS is for container orchestration, not event-driven execution",
      "SQS is a message queue service, not a compute service"
    ],
    relatedServices: ["Lambda", "S3", "S3 Event Notifications"],
    tags: ["serverless", "lambda", "s3", "event-driven"]
  },
  {
    id: "aws-18",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario: "Under the AWS Shared Responsibility Model, which of the following is the responsibility of a customer regarding AWS Lambda?",
    options: [
      "Maintain all runtime environments for AWS Lambda functions",
      "Configure networking infrastructure for the AWS Lambda functions",
      "Patch underlying OS for the AWS Lambda function infrastructure",
      "Maintain versions of an AWS Lambda function"
    ],
    correctAnswer: 3,
    explanation: "For Lambda, AWS manages the infrastructure, OS, runtime environments, and patching. Customers are responsible for their code, managing function versions, configuring function settings (memory, timeout), and IAM permissions.",
    incorrectExplanations: [
      "AWS maintains the runtime environments",
      "While customers configure VPC settings, AWS manages the underlying networking infrastructure",
      "AWS handles all OS patching for Lambda infrastructure"
    ],
    relatedServices: ["Lambda", "Shared Responsibility Model"],
    tags: ["serverless", "lambda", "security", "shared-responsibility"]
  },
  {
    id: "aws-19",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario: "Which budget types can be created under AWS Budgets? (Select three)",
    options: [
      "Cost budget",
      "Reservation budget",
      "Hardware budget",
      "Usage budget",
      "Software budget",
      "Resource budget"
    ],
    correctAnswer: [0, 1, 3],
    isMultiSelect: true,
    selectCount: 3,
    explanation: "AWS Budgets supports three types: Cost budgets (track spending), Usage budgets (track usage of services like GB-hours), and Reservation budgets (track Reserved Instance and Savings Plan utilization and coverage).",
    incorrectExplanations: [
      "Hardware budget is not a valid budget type",
      "Software budget is not a valid budget type",
      "Resource budget is not a valid budget type"
    ],
    relatedServices: ["AWS Budgets", "Cost Explorer"],
    tags: ["billing", "budgets", "cost-management"]
  },
  {
    id: "aws-20",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "What is the primary benefit of deploying an Amazon Relational Database Service (Amazon RDS) database in a Read Replica configuration?",
    options: [
      "Read Replica protects the database from a regional failure",
      "Read Replica enhances database availability",
      "Read Replica reduces database usage costs",
      "Read Replica improves database scalability"
    ],
    correctAnswer: 3,
    explanation: "Read Replicas primarily improve scalability by offloading read traffic from the primary database. You can create multiple read replicas to handle increased read workloads, allowing the primary instance to focus on writes. This horizontal scaling improves performance for read-heavy applications.",
    incorrectExplanations: [
      "Read Replicas can be cross-region, but regional protection is a secondary benefit, not the primary one",
      "Multi-AZ deployments enhance availability; Read Replicas are primarily for scaling reads",
      "Read Replicas add cost; they don't reduce it"
    ],
    relatedServices: ["RDS", "Read Replicas", "Multi-AZ"],
    tags: ["database", "rds", "scalability"]
  },
  {
    id: "aws-21",
    domain: "Cloud Concepts",
    difficulty: "beginner",
    scenario: "Which of the following Cloud Computing models does the 'gmail' service represent?",
    options: [
      "Platform as a service (PaaS)",
      "Function as a service (FaaS)",
      "Infrastructure as a service (IaaS)",
      "Software as a service (SaaS)"
    ],
    correctAnswer: 3,
    explanation: "Gmail is a Software as a Service (SaaS) - a fully managed application delivered over the internet. Users access the software through a web browser without managing any infrastructure, platform, or underlying code.",
    incorrectExplanations: [
      "PaaS provides platforms for developers to build applications (like AWS Elastic Beanstalk)",
      "FaaS is for running individual functions in response to events (like AWS Lambda)",
      "IaaS provides basic computing resources like VMs and storage (like EC2)"
    ],
    relatedServices: ["Cloud Service Models"],
    tags: ["cloud-concepts", "saas", "service-models"]
  },
  {
    id: "aws-22",
    domain: "Monitoring and Optimization",
    difficulty: "intermediate",
    scenario: "An IT company is on a cost-optimization spree and wants to identify all Amazon Elastic Compute Cloud (Amazon EC2) instances that are under-utilized. Which AWS services can be used off-the-shelf to address this use-case without needing any manual configurations? (Select two)",
    options: [
      "AWS Trusted Advisor",
      "AWS Cost Explorer",
      "AWS Cost & Usage Report (AWS CUR)",
      "Amazon CloudWatch"
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "AWS Trusted Advisor automatically identifies under-utilized EC2 instances based on CloudWatch metrics over the past 14 days. AWS Cost Explorer also has a Right Sizing Recommendations feature that identifies idle and under-utilized instances without requiring manual configuration.",
    incorrectExplanations: [
      "Cost & Usage Report provides raw data but requires analysis to identify under-utilized instances",
      "CloudWatch monitors metrics but requires you to create alarms and analyze the data manually"
    ],
    relatedServices: ["Trusted Advisor", "Cost Explorer", "Compute Optimizer"],
    tags: ["cost-optimization", "monitoring", "ec2"]
  },
  {
    id: "aws-23",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "An IT company would like to move its IT resources (including any data and applications) from an AWS Region in the US to another AWS Region in Europe. Which of the following represents the correct solution for this use-case?",
    options: [
      "The company should just start creating new resources in the destination AWS Region and then migrate the relevant data and applications into this new AWS Region",
      "The company should use AWS Database Migration Service (AWS DMS) to move the resources (including any data and applications) from source AWS Region to destination AWS Region",
      "The company should raise a ticket with AWS Support for this resource migration",
      "The company should use AWS CloudFormation to move the resources (including any data and applications) from source AWS Region to destination AWS Region"
    ],
    correctAnswer: 0,
    explanation: "AWS doesn't automatically migrate resources between regions. You must manually recreate resources in the destination region and migrate data. This typically involves: deploying infrastructure (possibly using CloudFormation templates), copying data (using services like S3 cross-region replication, DB snapshots, or DMS for databases), and updating application configurations.",
    incorrectExplanations: [
      "DMS is specifically for database migration, not all resources and applications",
      "AWS Support doesn't perform resource migrations for customers",
      "CloudFormation can help deploy infrastructure but doesn't automatically move data or migrate resources"
    ],
    relatedServices: ["CloudFormation", "DMS", "S3 Cross-Region Replication"],
    tags: ["migration", "regions", "deployment"]
  },
  {
    id: "aws-24",
    domain: "Cloud Concepts",
    difficulty: "intermediate",
    scenario: "An enterprise is developing a roadmap for its cloud adoption journey and wants to ensure its IT investments align with business objectives and deliver measurable value. Which perspective of the AWS Cloud Adoption Framework (CAF) addresses the strategy management capability?",
    options: [
      "Platform Perspective",
      "Operations Perspective",
      "Governance Perspective",
      "Business Perspective"
    ],
    correctAnswer: 3,
    explanation: "The Business Perspective of AWS CAF focuses on aligning IT strategy with business strategy. It includes capabilities like strategy management, portfolio management, innovation management, and ensuring that cloud investments deliver measurable business value and ROI.",
    incorrectExplanations: [
      "Platform Perspective focuses on cloud architecture and engineering",
      "Operations Perspective focuses on running and monitoring cloud workloads",
      "Governance Perspective focuses on risk management and compliance"
    ],
    relatedServices: ["Cloud Adoption Framework"],
    tags: ["cloud-concepts", "caf", "business-strategy"]
  },
  {
    id: "aws-25",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which of the following are components of an AWS Site-to-Site VPN? (Select two)",
    options: [
      "Virtual private gateway (VGW)",
      "AWS storage gateway",
      "Network Address Translation gateway (NAT gateway)",
      "Internet gateway",
      "Customer gateway"
    ],
    correctAnswer: [0, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "AWS Site-to-Site VPN consists of two main components: Virtual Private Gateway (VGW) on the AWS side, which attaches to your VPC, and Customer Gateway on your on-premises side, which represents your physical device or software application. Together they establish an encrypted VPN connection.",
    incorrectExplanations: [
      "Storage Gateway is for hybrid storage, not VPN connectivity",
      "NAT Gateway provides outbound internet access for private subnets, not VPN",
      "Internet Gateway provides internet connectivity, but VPN uses VGW instead"
    ],
    relatedServices: ["Site-to-Site VPN", "VPC", "Virtual Private Gateway"],
    tags: ["networking", "vpn", "hybrid-cloud"]
  },
  {
    id: "aws-26",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "Which Amazon Route 53 routing policy would you use when you want to route your traffic in an active-passive configuration?",
    options: [
      "Latency-based routing",
      "Weighted routing",
      "Simple routing",
      "Failover routing"
    ],
    correctAnswer: 3,
    explanation: "Failover routing implements active-passive configuration where traffic goes to a primary resource, and automatically fails over to a secondary resource if the primary becomes unhealthy. Route 53 health checks monitor the primary resource.",
    incorrectExplanations: [
      "Latency-based routing sends traffic to the lowest-latency endpoint, not active-passive",
      "Weighted routing distributes traffic across multiple resources based on weights",
      "Simple routing returns all values without health checks or failover"
    ],
    relatedServices: ["Route 53", "Route 53 Health Checks"],
    tags: ["networking", "route53", "high-availability"]
  },
  {
    id: "aws-27",
    domain: "Billing, Pricing and Support",
    difficulty: "intermediate",
    scenario: "AWS Lambda pricing is based on which of the following criteria? (Select two)",
    options: [
      "The size of the deployment package for the AWS Lambda function",
      "The language runtime of the AWS Lambda function",
      "The number of lines of code for the AWS Lambda function",
      "Number of requests for the AWS Lambda function",
      "The time it takes for the AWS Lambda function to execute"
    ],
    correctAnswer: [3, 4],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "Lambda pricing is based on two factors: the number of requests (first 1 million are free each month) and compute duration measured in GB-seconds (memory allocated × execution time). You're not charged for code size or programming language.",
    incorrectExplanations: [
      "Deployment package size doesn't affect pricing",
      "Runtime language doesn't affect pricing - all runtimes cost the same",
      "Lines of code don't affect pricing"
    ],
    relatedServices: ["Lambda", "Lambda Pricing"],
    tags: ["pricing", "lambda", "serverless"]
  },
  {
    id: "aws-28",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario: "AWS Identity and Access Management (AWS IAM) policies are written as JSON documents. Which of the following are mandatory elements of an IAM policy?",
    options: [
      "Effect, Sid",
      "Action, Condition",
      "Sid, Principal",
      "Effect, Action"
    ],
    correctAnswer: 3,
    explanation: "IAM policy documents require two mandatory elements: Effect (Allow or Deny) and Action (which API operations are allowed or denied). Optional elements include Resource, Condition, Sid (statement ID), and Principal (for resource-based policies).",
    incorrectExplanations: [
      "Sid is optional, not mandatory",
      "Condition is optional, and Action alone isn't enough without Effect",
      "Both Sid and Principal are optional elements"
    ],
    relatedServices: ["IAM", "IAM Policies"],
    tags: ["security", "iam", "policies"]
  },
  {
    id: "aws-29",
    domain: "Security and Compliance",
    difficulty: "beginner",
    scenario: "A financial services enterprise plans to enable Multi-Factor Authentication (MFA) for its employees. For ease of travel, they prefer not to use any physical devices to implement Multi-Factor Authentication (MFA). Which of the below options is best suited for this use case?",
    options: [
      "U2F security key",
      "Virtual Multi-Factor Authentication (MFA) device",
      "Hardware Multi-Factor Authentication (MFA) device",
      "Soft Token Multi-Factor Authentication (MFA) device"
    ],
    correctAnswer: 1,
    explanation: "Virtual MFA devices use authenticator apps (like Google Authenticator, Microsoft Authenticator, or Authy) on smartphones or tablets. They generate time-based codes without requiring physical hardware tokens, making them convenient for travelers.",
    incorrectExplanations: [
      "U2F security key is a physical device",
      "Hardware MFA device is a physical device",
      "Soft Token MFA is not a standard AWS term; Virtual MFA is the correct terminology"
    ],
    relatedServices: ["IAM", "MFA"],
    tags: ["security", "mfa", "authentication"]
  },
  {
    id: "aws-30",
    domain: "Security and Compliance",
    difficulty: "intermediate",
    scenario: "Which of the following AWS services have data encryption automatically enabled? (Select two)",
    options: [
      "AWS Storage Gateway",
      "Amazon Simple Storage Service (Amazon S3)",
      "Amazon Elastic File System (Amazon EFS)",
      "Amazon Redshift",
      "Amazon Elastic Block Store (Amazon EBS)"
    ],
    correctAnswer: [0, 1],
    isMultiSelect: true,
    selectCount: 2,
    explanation: "AWS Storage Gateway encrypts all data in transit (via SSL) and at rest automatically. S3 now has default encryption enabled for all new buckets. Other services like EFS, Redshift, and EBS require you to explicitly enable encryption when creating resources.",
    incorrectExplanations: [
      "EFS requires you to enable encryption at creation time",
      "Redshift requires enabling encryption when creating the cluster",
      "EBS volumes require enabling encryption when creating volumes"
    ],
    relatedServices: ["Storage Gateway", "S3", "Encryption"],
    tags: ["security", "encryption", "storage"]
  },
  {
    id: "aws-31",
    domain: "Cloud Technology and Services",
    difficulty: "intermediate",
    scenario: "A research lab wants to optimize the caching capabilities for its scientific computations application running on Amazon Elastic Compute Cloud (Amazon EC2) instances. Which Amazon Elastic Compute Cloud (Amazon EC2) storage option is best suited for this use-case?",
    options: [
      "Amazon Elastic Block Store (Amazon EBS)",
      "Amazon Elastic File System (Amazon EFS)",
      "Amazon Simple Storage Service (Amazon S3)",
      "Instance Store"
    ],
    correctAnswer: 3,
    explanation: "Instance Store provides temporary block-level storage physically attached to the host computer, offering very high I/O performance. It's ideal for caching, buffers, scratch data, and temporary content because of its high IOPS and low latency, though data is lost when instances stop.",
    incorrectExplanations: [
      "EBS is persistent but has higher latency than Instance Store",
      "EFS is network-based file storage with higher latency than Instance Store",
      "S3 is object storage with much higher latency than Instance Store"
    ],
    relatedServices: ["EC2", "Instance Store", "EBS"],
    tags: ["storage", "performance", "caching"]
  }
]
