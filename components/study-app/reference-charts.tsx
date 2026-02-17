"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Database, HardDrive, Network, DollarSign } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ReferenceChartsProps = {
  onBack: () => void
}

export function ReferenceCharts({ onBack }: ReferenceChartsProps) {
  const onClose = onBack; // Declare the onClose variable

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AWS Service Comparison Charts</h1>
          <Button onClick={onBack} variant="outline" className="min-h-[44px] bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Tabs defaultValue="storage" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="compute">Compute</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
          </TabsList>

          <TabsContent value="storage" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  S3 Storage Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Storage Class</th>
                        <th className="text-left p-3 font-bold">Use Case</th>
                        <th className="text-left p-3 font-bold">Availability</th>
                        <th className="text-left p-3 font-bold">Retrieval Time</th>
                        <th className="text-left p-3 font-bold">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 Standard</td>
                        <td className="p-3">Frequently accessed data</td>
                        <td className="p-3">99.99%</td>
                        <td className="p-3">Milliseconds</td>
                        <td className="p-3 text-red-600">$$$$</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 Standard-IA</td>
                        <td className="p-3">Infrequent access, rapid retrieval</td>
                        <td className="p-3">99.9%</td>
                        <td className="p-3">Milliseconds</td>
                        <td className="p-3 text-orange-600">$$$</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 One Zone-IA</td>
                        <td className="p-3">Infrequent, recreatable data</td>
                        <td className="p-3">99.5%</td>
                        <td className="p-3">Milliseconds</td>
                        <td className="p-3 text-yellow-600">$$</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 Intelligent-Tiering</td>
                        <td className="p-3">Unknown or changing access patterns</td>
                        <td className="p-3">99.9%</td>
                        <td className="p-3">Milliseconds</td>
                        <td className="p-3 text-orange-600">$$$</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 Glacier Flexible</td>
                        <td className="p-3">Archive, 1-2 times/year access</td>
                        <td className="p-3">99.99%</td>
                        <td className="p-3">Minutes to hours</td>
                        <td className="p-3 text-green-600">$</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">S3 Glacier Deep Archive</td>
                        <td className="p-3">Long-term archive, 7-10 years retention</td>
                        <td className="p-3">99.99%</td>
                        <td className="p-3">12-48 hours</td>
                        <td className="p-3 text-green-700 font-bold">Cheapest</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  EBS vs EFS vs Instance Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Feature</th>
                        <th className="text-left p-3 font-bold">EBS</th>
                        <th className="text-left p-3 font-bold">EFS</th>
                        <th className="text-left p-3 font-bold">Instance Store</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Type</td>
                        <td className="p-3">Block storage</td>
                        <td className="p-3">File storage (NFS)</td>
                        <td className="p-3">Block storage (ephemeral)</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Attachment</td>
                        <td className="p-3">Single EC2 instance (except io2 Multi-Attach)</td>
                        <td className="p-3">Multiple instances concurrently</td>
                        <td className="p-3">Single instance only</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Persistence</td>
                        <td className="p-3 text-green-600 font-bold">Persistent</td>
                        <td className="p-3 text-green-600 font-bold">Persistent</td>
                        <td className="p-3 text-red-600 font-bold">Ephemeral (lost on stop)</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Use Case</td>
                        <td className="p-3">Boot volumes, databases</td>
                        <td className="p-3">Shared file systems, web serving</td>
                        <td className="p-3">Temporary storage, caches, buffers</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">Performance</td>
                        <td className="p-3">Up to 64,000 IOPS (io2)</td>
                        <td className="p-3">Lower latency, scales throughput</td>
                        <td className="p-3">Very high IOPS, lowest latency</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  AWS Snow Family
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Device</th>
                        <th className="text-left p-3 font-bold">Capacity</th>
                        <th className="text-left p-3 font-bold">Use Case</th>
                        <th className="text-left p-3 font-bold">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Snowcone</td>
                        <td className="p-3">8-14 TB</td>
                        <td className="p-3">Small edge computing, IoT</td>
                        <td className="p-3">Portable, rugged, battery-operated</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Snowball Edge</td>
                        <td className="p-3">50-80 TB</td>
                        <td className="p-3">Data migration, edge computing</td>
                        <td className="p-3">Compute capabilities, S3 compatible</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">Snowmobile</td>
                        <td className="p-3">Up to 100 PB</td>
                        <td className="p-3">Exabyte-scale data center migration</td>
                        <td className="p-3">45-foot shipping container truck</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Service Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Service</th>
                        <th className="text-left p-3 font-bold">Type</th>
                        <th className="text-left p-3 font-bold">Use Case</th>
                        <th className="text-left p-3 font-bold">Key Feature</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Amazon RDS</td>
                        <td className="p-3">Relational (SQL)</td>
                        <td className="p-3">OLTP, traditional applications</td>
                        <td className="p-3">MySQL, PostgreSQL, Oracle, SQL Server, MariaDB</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Amazon Aurora</td>
                        <td className="p-3">Relational (SQL)</td>
                        <td className="p-3">High-performance, cloud-native</td>
                        <td className="p-3">5x faster than MySQL, 3x faster than PostgreSQL</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">DynamoDB</td>
                        <td className="p-3">NoSQL (Key-Value/Document)</td>
                        <td className="p-3">High-scale, serverless applications</td>
                        <td className="p-3">Single-digit millisecond latency at any scale</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">ElastiCache</td>
                        <td className="p-3">In-Memory Cache</td>
                        <td className="p-3">Caching, session storage</td>
                        <td className="p-3">Redis or Memcached compatible</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Neptune</td>
                        <td className="p-3">Graph Database</td>
                        <td className="p-3">Social networks, recommendation engines</td>
                        <td className="p-3">Highly connected data, relationship queries</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">DocumentDB</td>
                        <td className="p-3">Document (NoSQL)</td>
                        <td className="p-3">MongoDB workloads</td>
                        <td className="p-3">MongoDB API compatible</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Timestream</td>
                        <td className="p-3">Time Series</td>
                        <td className="p-3">IoT, operational monitoring</td>
                        <td className="p-3">1000x faster, 1/10th cost vs relational DBs</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">QLDB</td>
                        <td className="p-3">Ledger</td>
                        <td className="p-3">Immutable transaction logs</td>
                        <td className="p-3">Cryptographically verifiable, append-only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compute" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  EC2 Pricing Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Model</th>
                        <th className="text-left p-3 font-bold">Best For</th>
                        <th className="text-left p-3 font-bold">Savings</th>
                        <th className="text-left p-3 font-bold">Flexibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">On-Demand</td>
                        <td className="p-3">Short-term, unpredictable workloads</td>
                        <td className="p-3 text-red-600">0%</td>
                        <td className="p-3 text-green-600 font-bold">Highest</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Savings Plans</td>
                        <td className="p-3">Consistent usage, flexible instance families</td>
                        <td className="p-3 text-orange-600">Up to 72%</td>
                        <td className="p-3 text-green-600">High</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Reserved Instances</td>
                        <td className="p-3">Steady-state workloads, specific instance type</td>
                        <td className="p-3 text-orange-600">Up to 75%</td>
                        <td className="p-3 text-yellow-600">Medium</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">Spot Instances</td>
                        <td className="p-3">Fault-tolerant, flexible start/stop times</td>
                        <td className="p-3 text-green-600 font-bold">Up to 90%</td>
                        <td className="p-3 text-red-600">Lowest (can be terminated)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compute Service Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-2">EC2</h4>
                    <p>Full control over OS, instance type, networking. Best for traditional applications, custom configurations.</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-2">Lambda</h4>
                    <p>
                      Serverless, event-driven functions (max 15 min). Best for microservices, API backends, scheduled tasks.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-2">Elastic Beanstalk</h4>
                    <p>
                      Platform as a Service. Upload code, AWS handles deployment, scaling, monitoring. Best for quick deployments.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-2">Fargate</h4>
                    <p>Serverless containers. Run Docker without managing servers. Best for containerized apps without cluster management.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="networking" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Load Balancer Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-bold">Type</th>
                        <th className="text-left p-3 font-bold">Layer</th>
                        <th className="text-left p-3 font-bold">Use Case</th>
                        <th className="text-left p-3 font-bold">Key Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Application Load Balancer (ALB)</td>
                        <td className="p-3">Layer 7 (HTTP/HTTPS)</td>
                        <td className="p-3">Web applications, microservices</td>
                        <td className="p-3">Path/host-based routing, WebSocket support</td>
                      </tr>
                      <tr className="border-b hover:bg-secondary/50">
                        <td className="p-3 font-medium">Network Load Balancer (NLB)</td>
                        <td className="p-3">Layer 4 (TCP/UDP/TLS)</td>
                        <td className="p-3">High performance, static IPs needed</td>
                        <td className="p-3">Ultra-low latency, millions of requests/sec</td>
                      </tr>
                      <tr className="hover:bg-secondary/50">
                        <td className="p-3 font-medium">Gateway Load Balancer (GLB)</td>
                        <td className="p-3">Layer 3 (IP)</td>
                        <td className="p-3">Deploy virtual appliances (firewalls)</td>
                        <td className="p-3">Transparent network gateway + load balancing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Route 53 Routing Policies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Simple</h4>
                    <p className="text-muted-foreground">Single resource or multiple values returned randomly. No health checks.</p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Weighted</h4>
                    <p className="text-muted-foreground">
                      Distribute traffic based on assigned weights. Good for A/B testing, gradual rollouts.
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Latency-based</h4>
                    <p className="text-muted-foreground">Route to region with lowest latency for user. Best global user experience.</p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Failover</h4>
                    <p className="text-muted-foreground">
                      Active-passive setup. Routes to secondary if primary fails health check.
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Geolocation</h4>
                    <p className="text-muted-foreground">
                      Route based on user location (continent, country, state). Content localization, compliance.
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-bold mb-1">Geoproximity</h4>
                    <p className="text-muted-foreground">Route based on location + bias value to shift traffic toward/away from resources.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
