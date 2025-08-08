import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Activity,
  BarChart3,
  Settings,
  FileText,
  Gavel,
  Eye,
  UserX
} from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Platform management and oversight</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="gradient" className="gap-2">
            <Activity className="h-4 w-4" />
            System Health
          </Button>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.7M</div>
            <p className="text-xs text-muted-foreground">Total transactions processed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active NFTs</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">Invoice NFTs in circulation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-destructive/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">Active disputes requiring review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Real-time system metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Transaction Success Rate</span>
                    <span className="text-sm font-medium">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="text-sm font-medium">96.4%</span>
                  </div>
                  <Progress value={96.4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "New user registration", user: "TechCorp Ltd", time: "2 minutes ago", type: "user" },
                    { action: "Invoice NFT minted", user: "DesignPro", time: "5 minutes ago", type: "transaction" },
                    { action: "Payment completed", user: "Invoice #INV-001", time: "12 minutes ago", type: "payment" },
                    { action: "Dispute raised", user: "Invoice #INV-028", time: "1 hour ago", type: "dispute" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-primary' :
                        activity.type === 'transaction' ? 'bg-success' :
                        activity.type === 'payment' ? 'bg-accent' : 'bg-warning'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Management</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export Users</Button>
              <Button variant="gradient" size="sm">Add Admin</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  SMEs/Freelancers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,547</div>
                <p className="text-sm text-muted-foreground">Active invoice issuers</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,892</div>
                <p className="text-sm text-muted-foreground">Active NFT investors</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">408</div>
                <p className="text-sm text-muted-foreground">Invoice payers</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Manage
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent User Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { user: "TechFlow Solutions", action: "KYC Verification Required", status: "pending", type: "verification" },
                  { user: "Investment Group A", action: "Suspicious Activity Detected", status: "review", type: "security" },
                  { user: "DesignCorp Ltd", action: "Account Suspension Appeal", status: "urgent", type: "appeal" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.user}</p>
                      <p className="text-sm text-muted-foreground">{item.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        item.status === 'urgent' ? 'destructive' :
                        item.status === 'review' ? 'warning' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <h3 className="text-lg font-semibold">Transaction Monitoring</h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Daily Volume</span>
                </div>
                <div className="text-2xl font-bold">$847K</div>
                <p className="text-xs text-success">+12% vs yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">NFTs Minted</span>
                </div>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Investments</span>
                </div>
                <div className="text-2xl font-bold">$1.2M</div>
                <p className="text-xs text-success">Active investments</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium">Avg. Fee</span>
                </div>
                <div className="text-2xl font-bold">2.8%</div>
                <p className="text-xs text-muted-foreground">Platform commission</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dispute Resolution</h3>
            <Button variant="gradient" size="sm">
              <Gavel className="h-4 w-4 mr-2" />
              Resolve All
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { 
                id: "DIS-001", 
                invoice: "INV-2024-047", 
                issue: "Payment delay dispute", 
                parties: ["TechCorp", "Investor Group B"], 
                priority: "high",
                age: "3 days"
              },
              { 
                id: "DIS-002", 
                invoice: "INV-2024-052", 
                issue: "Invoice authenticity questioned", 
                parties: ["DesignPro", "Investment DAO"], 
                priority: "medium",
                age: "1 day"
              },
            ].map((dispute) => (
              <Card key={dispute.id} className="border-warning/20 bg-warning/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{dispute.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        {dispute.invoice} • {dispute.parties.join(" vs ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={dispute.priority === 'high' ? 'destructive' : 'warning'}>
                        {dispute.priority} priority
                      </Badge>
                      <span className="text-sm text-muted-foreground">{dispute.age} old</span>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">{dispute.issue}</p>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="gradient" size="sm">
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <h3 className="text-lg font-semibold">Security & Compliance</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { alert: "Multiple failed login attempts", user: "investor@example.com", severity: "medium" },
                  { alert: "Unusual transaction pattern", user: "TechCorp Account", severity: "low" },
                  { alert: "KYC document verification failed", user: "NewUser#1234", severity: "high" },
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{alert.alert}</p>
                      <p className="text-xs text-muted-foreground">{alert.user}</p>
                    </div>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'warning' : 'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">KYC Completion Rate</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">AML Screening</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Audit Compliance</span>
                    <span className="text-sm font-medium">97.8%</span>
                  </div>
                  <Progress value={97.8} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <h3 className="text-lg font-semibold">Analytics & Reports</h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Monthly Revenue Report", description: "Platform earnings and fee breakdown", status: "Ready" },
              { title: "User Activity Analysis", description: "User engagement and retention metrics", status: "Generating" },
              { title: "Risk Assessment Report", description: "Platform risk factors and mitigation", status: "Ready" },
              { title: "Compliance Report", description: "Regulatory compliance status", status: "Scheduled" },
              { title: "Transaction Volume Report", description: "Detailed transaction analytics", status: "Ready" },
              { title: "NFT Performance Report", description: "Invoice NFT success rates", status: "Ready" },
            ].map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      report.status === 'Ready' ? 'success' :
                      report.status === 'Generating' ? 'warning' : 'secondary'
                    }>
                      {report.status}
                    </Badge>
                    <Button variant="outline" size="sm" disabled={report.status !== 'Ready'}>
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};