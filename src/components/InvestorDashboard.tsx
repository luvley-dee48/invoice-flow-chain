import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Clock, Star, Eye, ShoppingCart, BarChart3, Wallet } from "lucide-react";

export const InvestorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Investor Portal
          </h1>
          <p className="text-muted-foreground">Discover and invest in tokenized invoice NFTs</p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>

      {/* Investment Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$847,320</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">Invoice NFTs owned</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Returns</CardTitle>
            <BarChart3 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$92,450</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROI</CardTitle>
            <Star className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <p className="text-xs text-muted-foreground">Annual return rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Market</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Available Invoice NFTs</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Tech Services</Badge>
                    <Badge variant="outline" className="text-success">AAA Rated</Badge>
                  </div>
                  <CardTitle className="text-lg">Invoice #INV-{1000 + item}</CardTitle>
                  <CardDescription>TechCorp Solutions • Due in 45 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Invoice Value</span>
                    <span className="font-semibold">${(25000 + item * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Purchase Price</span>
                    <span className="font-semibold text-primary">${(22000 + item * 900).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected ROI</span>
                    <span className="font-semibold text-success">{(12 + item).toFixed(1)}%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye className="h-3 w-3" />
                      Details
                    </Button>
                    <Button size="sm" variant="gradient" className="flex-1 gap-1">
                      <ShoppingCart className="h-3 w-3" />
                      Invest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <h3 className="text-lg font-semibold">My Investment Portfolio</h3>
          
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">Invoice NFT #{5000 + item}</h4>
                      <p className="text-sm text-muted-foreground">DesignCorp Ltd • Purchased 15 days ago</p>
                    </div>
                    <Badge variant={item % 2 === 0 ? "success" : "secondary"}>
                      {item % 2 === 0 ? "Paid" : "Active"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Investment</span>
                      <p className="font-semibold">${(18000 + item * 500).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Value</span>
                      <p className="font-semibold">${(20000 + item * 600).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Return</span>
                      <p className="font-semibold text-success">${(2000 + item * 100).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Days to Maturity</span>
                      <p className="font-semibold">{30 - item * 5} days</p>
                    </div>
                  </div>
                  
                  <Progress value={((30 - (30 - item * 5)) / 30) * 100} className="mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="secondary" className="space-y-4">
          <h3 className="text-lg font-semibold">Secondary Market Trading</h3>
          <p className="text-muted-foreground">Trade invoice NFTs with other investors before maturity</p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">For Sale</Badge>
                    <Badge variant="secondary">{(15 - item * 2)} days left</Badge>
                  </div>
                  <CardTitle className="text-lg">Invoice NFT #{7000 + item}</CardTitle>
                  <CardDescription>Listed by Investor #{item}234</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Asking Price</span>
                    <span className="font-semibold">${(19000 + item * 800).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Face Value</span>
                    <span className="font-semibold">${(22000 + item * 1000).toLocaleString()}</span>
                  </div>
                  <Button variant="gradient" className="w-full">
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-lg font-semibold">Investment Analytics</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Invested</span>
                    <span className="font-semibold">$650,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Returns</span>
                    <span className="font-semibold text-success">$742,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit</span>
                    <span className="font-semibold text-success">$92,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-semibold">96.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Low Risk</span>
                      <span className="text-sm">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Medium Risk</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">High Risk</span>
                      <span className="text-sm">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};