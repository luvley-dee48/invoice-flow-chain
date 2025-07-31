import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle,
  X,
  Eye,
  Star,
  Shield,
  Calendar
} from "lucide-react";

export const InvestorOffers = () => {
  const offers = [
    {
      id: "OFF-001",
      invoiceId: "INV-2024-001",
      investor: {
        name: "FinTech Capital",
        avatar: "/api/placeholder/40/40",
        rating: 4.8,
        verified: true,
        totalFunded: "$2.5M"
      },
      advanceRate: 85,
      amount: 10625,
      interestRate: 12,
      terms: "30 days",
      fees: 250,
      received: "2 hours ago",
      expires: "2 days",
      status: "active"
    },
    {
      id: "OFF-002", 
      invoiceId: "INV-2024-001",
      investor: {
        name: "Digital Assets Fund",
        avatar: "/api/placeholder/40/40", 
        rating: 4.6,
        verified: true,
        totalFunded: "$1.8M"
      },
      advanceRate: 82,
      amount: 10250,
      interestRate: 11.5,
      terms: "28 days",
      fees: 200,
      received: "4 hours ago",
      expires: "1 day",
      status: "active"
    },
    {
      id: "OFF-003",
      invoiceId: "INV-2024-001",
      investor: {
        name: "Blockchain Ventures",
        avatar: "/api/placeholder/40/40",
        rating: 4.9,
        verified: true,
        totalFunded: "$3.2M"
      },
      advanceRate: 88,
      amount: 11000,
      interestRate: 13,
      terms: "35 days", 
      fees: 300,
      received: "6 hours ago",
      expires: "3 days",
      status: "active"
    },
    {
      id: "OFF-004",
      invoiceId: "INV-2024-004",
      investor: {
        name: "Invoice Capital LLC",
        avatar: "/api/placeholder/40/40",
        rating: 4.5,
        verified: false,
        totalFunded: "$950K"
      },
      advanceRate: 80,
      amount: 17600,
      interestRate: 14,
      terms: "42 days",
      fees: 400,
      received: "1 day ago",
      expires: "4 days", 
      status: "active"
    },
    {
      id: "OFF-005",
      invoiceId: "INV-2024-002",
      investor: {
        name: "FinTech Capital",
        avatar: "/api/placeholder/40/40",
        rating: 4.8,
        verified: true,
        totalFunded: "$2.5M"
      },
      advanceRate: 90,
      amount: 7875,
      interestRate: 10,
      terms: "25 days",
      fees: 150,
      received: "3 days ago",
      expires: "Accepted",
      status: "accepted"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "success";
      case "active": return "warning";
      case "expired": return "destructive";
      default: return "secondary";
    }
  };

  const groupedOffers = offers.reduce((acc, offer) => {
    if (!acc[offer.invoiceId]) {
      acc[offer.invoiceId] = [];
    }
    acc[offer.invoiceId].push(offer);
    return acc;
  }, {} as Record<string, typeof offers>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investor Offers</h1>
          <p className="text-muted-foreground">Review and manage funding offers</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            {offers.filter(o => o.status === 'active').length} Active Offers
          </Badge>
        </div>
      </div>

      {/* Offers by Invoice */}
      {Object.entries(groupedOffers).map(([invoiceId, invoiceOffers]) => (
        <Card key={invoiceId} className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Offers for {invoiceId}
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="h-3 w-3" />
                View Invoice
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoiceOffers.map((offer) => (
              <div key={offer.id} className="border border-border rounded-lg p-4 bg-gradient-card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Investor Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={offer.investor.avatar} />
                      <AvatarFallback>{offer.investor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{offer.investor.name}</h3>
                        {offer.investor.verified && (
                          <Shield className="h-4 w-4 text-success" />
                        )}
                        <Badge variant={getStatusColor(offer.status) as any}>
                          {offer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {offer.investor.rating}
                        </div>
                        <span>Total funded: {offer.investor.totalFunded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Advance Rate</div>
                      <div className="text-lg font-bold text-primary">{offer.advanceRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Amount</div>
                      <div className="text-lg font-bold text-foreground">${offer.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Interest Rate</div>
                      <div className="text-lg font-bold text-foreground">{offer.interestRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Terms</div>
                      <div className="text-lg font-bold text-foreground">{offer.terms}</div>
                    </div>
                  </div>
                </div>

                {/* Offer Meta Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Received {offer.received}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Expires in {offer.expires}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Fees: ${offer.fees}
                    </div>
                  </div>

                  {/* Actions */}
                  {offer.status === 'active' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        Details
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1">
                        <X className="h-3 w-3" />
                        Decline
                      </Button>
                      <Button variant="success" size="sm" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Accept
                      </Button>
                    </div>
                  )}
                  
                  {offer.status === 'accepted' && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Offer Accepted
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{offers.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Best Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.max(...offers.map(o => o.advanceRate))}%
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Avg Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {(offers.reduce((sum, o) => sum + o.interestRate, 0) / offers.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Potential Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${offers.filter(o => o.status === 'active').reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};