import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Clock,
  Bell,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Funded",
      value: "$156,500",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Active Invoices",
      value: "8",
      change: "3 pending",
      icon: FileText,
      trend: "neutral"
    },
    {
      title: "Wallet Balance",
      value: "$23,750",
      change: "+5.2%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Avg. Funding Time",
      value: "3.2 days",
      change: "-0.8 days",
      icon: Clock,
      trend: "up"
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "offer",
      title: "New investor offer received",
      description: "85% advance on Invoice #INV-2024-001",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      type: "funded",
      title: "Invoice successfully funded",
      description: "Invoice #INV-2024-003 has been funded",
      time: "1 day ago",
      priority: "medium"
    },
    {
      id: 3,
      type: "verification",
      title: "KYC verification pending",
      description: "Please complete your business verification",
      time: "2 days ago",
      priority: "high"
    }
  ];

  const recentInvoices = [
    {
      id: "INV-2024-001",
      client: "Tech Solutions Ltd",
      amount: "$12,500",
      status: "pending_offers",
      offers: 3,
      created: "2024-01-15"
    },
    {
      id: "INV-2024-002",
      client: "Digital Marketing Co",
      amount: "$8,750",
      status: "funded",
      offers: 1,
      created: "2024-01-12"
    },
    {
      id: "INV-2024-003",
      client: "E-commerce Startup",
      amount: "$15,200",
      status: "under_review",
      offers: 0,
      created: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "funded": return "success";
      case "pending_offers": return "warning";
      case "under_review": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className="relative h-48 rounded-lg overflow-hidden bg-gradient-primary"
        style={{
          backgroundImage: `url(${dashboardHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
        <div className="relative p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-lg opacity-90">Your business financing dashboard</p>
          <div className="mt-4">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <FileText className="h-4 w-4 mr-2" />
              Upload New Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-card">
                <div className={`p-1 rounded-full ${
                  notification.priority === 'high' ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  {notification.type === 'offer' ? (
                    <TrendingUp className={`h-4 w-4 ${
                      notification.priority === 'high' ? 'text-destructive' : 'text-primary'
                    }`} />
                  ) : notification.type === 'funded' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{invoice.id}</p>
                    <Badge variant={getStatusColor(invoice.status) as any}>
                      {invoice.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
                    {invoice.offers > 0 && (
                      <span className="text-xs text-accent">{invoice.offers} offers</span>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};