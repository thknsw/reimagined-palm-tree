import type { ServiceComparison } from "./study-types"

export const SERVICE_COMPARISONS: ServiceComparison[] = [
  {
    id: "guardduty-vs-inspector",
    title: "GuardDuty vs Inspector",
    services: ["GuardDuty", "Inspector"],
    category: "security",
    differences: [
      {
        service: "GuardDuty",
        description:
          "Threat detection service that continuously monitors for malicious activity and unauthorized behavior using ML, anomaly detection, and threat intelligence",
      },
      {
        service: "Inspector",
        description:
          "Automated vulnerability management that scans EC2 instances, container images, and Lambda functions for software vulnerabilities and network exposure",
      },
    ],
    whenToUse: [
      {
        service: "GuardDuty",
        useCase:
          "Detecting suspicious API calls, cryptocurrency mining, compromised instances, or unauthorized access patterns",
      },
      {
        service: "Inspector",
        useCase:
          "Finding CVEs in your software packages, checking for missing patches, identifying network misconfigurations",
      },
    ],
  },
  {
    id: "macie-vs-inspector",
    title: "Macie vs Inspector",
    services: ["Macie", "Inspector"],
    category: "security",
    differences: [
      {
        service: "Macie",
        description:
          "Data security service using ML to discover, classify, and protect sensitive data (PII, PHI, financial data) stored in S3",
      },
      {
        service: "Inspector",
        description:
          "Vulnerability scanner that checks for software vulnerabilities in EC2, ECR images, and Lambda functions",
      },
    ],
    whenToUse: [
      {
        service: "Macie",
        useCase: "Finding and protecting sensitive data like credit cards, SSNs, or health records in S3 buckets",
      },
      {
        service: "Inspector",
        useCase: "Scanning for known CVEs and vulnerabilities in your application code and dependencies",
      },
    ],
  },
  {
    id: "shield-vs-waf",
    title: "Shield vs WAF",
    services: ["Shield", "WAF"],
    category: "security",
    differences: [
      {
        service: "Shield",
        description:
          "DDoS protection service. Standard (free) protects against common attacks. Advanced ($3k/mo) provides enhanced protection with 24/7 DRT access",
      },
      {
        service: "WAF",
        description:
          "Web Application Firewall that filters HTTP/HTTPS traffic based on rules (SQL injection, XSS, geo-blocking, rate limiting)",
      },
    ],
    whenToUse: [
      {
        service: "Shield",
        useCase: "Protecting against volumetric DDoS attacks (UDP floods, SYN floods, reflection attacks)",
      },
      {
        service: "WAF",
        useCase:
          "Blocking malicious web requests, preventing SQL injection/XSS, implementing geo-restrictions or rate limits",
      },
    ],
  },
  {
    id: "secrets-manager-vs-parameter-store",
    title: "Secrets Manager vs Parameter Store",
    services: ["Secrets Manager", "Systems Manager Parameter Store"],
    category: "security",
    differences: [
      {
        service: "Secrets Manager",
        description:
          "Purpose-built for secrets with automatic rotation, cross-account access, and native RDS/Redshift/DocumentDB integration. Costs $0.40/secret/month",
      },
      {
        service: "Systems Manager Parameter Store",
        description:
          "General-purpose parameter storage. Standard tier is free. Advanced tier costs $0.05/parameter/month. No automatic rotation built-in",
      },
    ],
    whenToUse: [
      {
        service: "Secrets Manager",
        useCase: "Database credentials that need automatic rotation, API keys requiring cross-account access",
      },
      {
        service: "Parameter Store",
        useCase: "Configuration values, feature flags, non-secret parameters, or when cost is a primary concern",
      },
    ],
  },
  {
    id: "cloudtrail-vs-cloudwatch",
    title: "CloudTrail vs CloudWatch",
    services: ["CloudTrail", "CloudWatch"],
    category: "monitoring",
    differences: [
      {
        service: "CloudTrail",
        description:
          "Records WHO did WHAT and WHEN - logs all API calls and account activity for governance, compliance, and security auditing",
      },
      {
        service: "CloudWatch",
        description:
          "Monitors HOW resources are performing - collects metrics, logs, and events for operational monitoring and alerting",
      },
    ],
    whenToUse: [
      {
        service: "CloudTrail",
        useCase: "Security investigations, compliance audits, tracking user activity, detecting unauthorized API calls",
      },
      {
        service: "CloudWatch",
        useCase: "Monitoring CPU usage, setting alarms, viewing application logs, creating dashboards",
      },
    ],
  },
  {
    id: "config-vs-cloudtrail",
    title: "Config vs CloudTrail",
    services: ["AWS Config", "CloudTrail"],
    category: "monitoring",
    differences: [
      {
        service: "AWS Config",
        description:
          "Tracks WHAT your resource configuration IS and WAS - maintains configuration history and evaluates compliance rules",
      },
      {
        service: "CloudTrail",
        description:
          "Tracks WHO made changes and WHEN - logs API calls but doesn't maintain resource configuration state",
      },
    ],
    whenToUse: [
      {
        service: "AWS Config",
        useCase:
          "Compliance checking, configuration drift detection, seeing what a resource looked like at a specific time",
      },
      {
        service: "CloudTrail",
        useCase: "Security auditing, investigating who made a change, tracking API call patterns",
      },
    ],
  },
  {
    id: "rds-vs-dynamodb",
    title: "RDS vs DynamoDB",
    services: ["RDS", "DynamoDB"],
    category: "database",
    differences: [
      {
        service: "RDS",
        description:
          "Managed relational database (MySQL, PostgreSQL, etc.) for structured data with complex queries, joins, and ACID transactions",
      },
      {
        service: "DynamoDB",
        description:
          "Serverless NoSQL key-value/document database for high-scale, low-latency access patterns with simple queries",
      },
    ],
    whenToUse: [
      {
        service: "RDS",
        useCase:
          "Complex queries with joins, financial transactions requiring ACID, existing SQL applications, reporting",
      },
      {
        service: "DynamoDB",
        useCase:
          "High-traffic web apps, gaming leaderboards, session stores, IoT data, when you need single-digit ms latency",
      },
    ],
  },
  {
    id: "aurora-vs-rds",
    title: "Aurora vs RDS",
    services: ["Aurora", "RDS"],
    category: "database",
    differences: [
      {
        service: "Aurora",
        description:
          "AWS-built database compatible with MySQL/PostgreSQL. 5x throughput of MySQL, 3x of PostgreSQL. Auto-scaling storage up to 128TB",
      },
      {
        service: "RDS",
        description:
          "Managed versions of standard open-source and commercial databases. More engine options (Oracle, SQL Server, MariaDB)",
      },
    ],
    whenToUse: [
      {
        service: "Aurora",
        useCase:
          "High-performance MySQL/PostgreSQL workloads, need for auto-scaling, global databases, Serverless v2 for variable workloads",
      },
      {
        service: "RDS",
        useCase:
          "Need Oracle/SQL Server compatibility, lower cost for smaller workloads, familiar database engine behavior",
      },
    ],
  },
  {
    id: "s3-glacier-vs-glacier-deep",
    title: "S3 Glacier vs Glacier Deep Archive",
    services: ["S3 Glacier", "S3 Glacier Deep Archive"],
    category: "storage",
    differences: [
      {
        service: "S3 Glacier",
        description:
          "Archive storage with retrieval options: Expedited (1-5 min), Standard (3-5 hrs), Bulk (5-12 hrs). ~$0.004/GB/month",
      },
      {
        service: "S3 Glacier Deep Archive",
        description:
          "Lowest cost storage for data accessed once or twice a year. Retrieval: Standard (12 hrs), Bulk (48 hrs). ~$0.00099/GB/month",
      },
    ],
    whenToUse: [
      {
        service: "S3 Glacier",
        useCase: "Backups that might need faster retrieval, compliance archives with occasional access needs",
      },
      {
        service: "S3 Glacier Deep Archive",
        useCase:
          "Long-term archives rarely accessed (7-10+ year retention), regulatory compliance data, tape replacement",
      },
    ],
  },
  {
    id: "elb-types",
    title: "ALB vs NLB vs CLB",
    services: ["Application Load Balancer", "Network Load Balancer", "Classic Load Balancer"],
    category: "networking",
    differences: [
      {
        service: "Application Load Balancer",
        description:
          "Layer 7 (HTTP/HTTPS). Path-based routing, host-based routing, WebSocket support, container/microservices optimized",
      },
      {
        service: "Network Load Balancer",
        description:
          "Layer 4 (TCP/UDP). Ultra-low latency, millions of requests/sec, static IP support, preserves source IP",
      },
      {
        service: "Classic Load Balancer",
        description: "Legacy. Basic Layer 4/7 load balancing. Use ALB or NLB for new applications",
      },
    ],
    whenToUse: [
      {
        service: "Application Load Balancer",
        useCase: "Web applications, microservices, containers, need path/host routing or authentication",
      },
      {
        service: "Network Load Balancer",
        useCase: "Gaming, IoT, real-time streaming, need static IPs or extreme performance",
      },
      { service: "Classic Load Balancer", useCase: "Only for existing EC2-Classic applications - migrate to ALB/NLB" },
    ],
  },
  {
    id: "fargate-vs-ec2-ecs",
    title: "Fargate vs EC2 (for ECS)",
    services: ["Fargate", "EC2 Launch Type"],
    category: "compute",
    differences: [
      {
        service: "Fargate",
        description:
          "Serverless containers - no EC2 management. Pay per vCPU/memory per second. AWS manages infrastructure",
      },
      {
        service: "EC2 Launch Type",
        description:
          "You manage EC2 instances running containers. More control, can use Reserved/Spot instances for cost savings",
      },
    ],
    whenToUse: [
      {
        service: "Fargate",
        useCase: "Variable/unpredictable workloads, want zero infrastructure management, quick deployments",
      },
      {
        service: "EC2 Launch Type",
        useCase: "Predictable workloads (use RIs), need GPU instances, require specific instance configurations",
      },
    ],
  },
]
