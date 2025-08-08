import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, DollarSign, AlertCircle, CheckCircle, Clock, CreditCard, Download } from "lucide-react";

export const ClientDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Client Portal
          </h1>
          <p className="text-muted-foreground">Manage your outstanding invoices and payments</p>
        </div>
        <Button variant="gradient" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Make Payment
        </Button>
      </div>

      {/* Payment Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-destructive/10 to-warning/10 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$425,600</div>
            <p className="text-xs text-muted-foreground">
              Across 23 invoices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning/10 to-accent/10 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">$158,400 total value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">$185,200 total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">$342,750 total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outstanding" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Outstanding Invoices</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient" size="sm">Pay Selected</Button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: "INV-2024-001", vendor: "TechFlow Solutions", amount: 25000, due: "2024-02-15", status: "current", tokenized: true },
              { id: "INV-2024-002", vendor: "DesignCorp Ltd", amount: 18500, due: "2024-02-20", status: "current", tokenized: false },
              { id: "INV-2024-003", vendor: "DevStudio Pro", amount: 32000, due: "2024-02-25", status: "current", tokenized: true },
              { id: "INV-2024-004", vendor: "CloudSys Inc", amount: 42500, due: "2024-03-01", status: "upcoming", tokenized: true },
            ].map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold">{invoice.id}</h4>
                        <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
                      </div>
                      {invoice.tokenized && (
                        <Badge variant="secondary" className="gap-1">
                          <FileText className="h-3 w-3" />
                          NFT Tokenized
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Due {invoice.due}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(invoice.due) > new Date() 
                          ? `${Math.ceil((new Date(invoice.due).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`
                          : 'Payment overdue'
                        }
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="gradient" size="sm">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                  
                  {invoice.tokenized && (
                    <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-accent">NFT Notice:</span> This invoice has been tokenized. 
                        Payment will be automatically distributed to current NFT holders.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-destructive">Overdue Invoices</h3>
            <Button variant="gradient" size="sm">Pay All Overdue</Button>
          </div>

          <div className="space-y-4">
            {[
              { id: "INV-2024-005", vendor: "MarketingPro", amount: 15000, overdue: 15, penalty: 750 },
              { id: "INV-2024-006", vendor: "ContentCraft", amount: 22000, overdue: 8, penalty: 440 },
              { id: "INV-2024-007", vendor: "BrandWorks", amount: 35000, overdue: 22, penalty: 1750 },
            ].map((invoice) => (
              <Card key={invoice.id} className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{invoice.id}</h4>
                      <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
                    </div>
                    <Badge variant="destructive">
                      {invoice.overdue} days overdue
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Original Amount</span>
                      <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Late Penalty</span>
                      <p className="font-semibold text-destructive">${invoice.penalty}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Total Due</span>
                      <p className="font-bold text-lg">${(invoice.amount + invoice.penalty).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Request Extension
                    </Button>
                    <Button variant="destructive" size="sm">
                      Pay Immediately
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <h3 className="text-lg font-semibold">Scheduled Payments</h3>
          
          <div className="space-y-4">
            {[
              { id: "INV-2024-008", vendor: "TechFlow Solutions", amount: 28000, date: "2024-03-15", status: "scheduled" },
              { id: "INV-2024-009", vendor: "DesignStudio", amount: 19500, date: "2024-03-20", status: "scheduled" },
            ].map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{payment.id}</h4>
                      <p className="text-sm text-muted-foreground">{payment.vendor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Scheduled for {payment.date}</p>
                      <Badge variant="secondary" className="mt-1">Auto-pay enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <h3 className="text-lg font-semibold">Payment History</h3>
          
          <div className="space-y-4">
            {[
              { id: "INV-2024-010", vendor: "DevCorp", amount: 45000, date: "2024-01-28", method: "Bank Transfer" },
              { id: "INV-2024-011", vendor: "PixelStudio", amount: 32000, date: "2024-01-25", method: "Crypto Payment" },
              { id: "INV-2024-012", vendor: "CodeCraft", amount: 27500, date: "2024-01-20", method: "Bank Transfer" },
            ].map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <h4 className="font-semibold">{payment.id}</h4>
                        <p className="text-sm text-muted-foreground">{payment.vendor} • {payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                    </div>
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