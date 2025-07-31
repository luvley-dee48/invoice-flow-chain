import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Plus, 
  Minus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

export const WalletDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const walletData = {
    mainBalance: 23750.45,
    pendingReceivables: 15200.00,
    escrowBalance: 5500.00,
    totalAssets: 44450.45,
    walletAddress: "0x742d35Cc6aA88532B09393b6C2C7F3F4F2a8E4D9",
    network: "Ethereum Mainnet"
  };

  const recentActivity = [
    {
      id: 1,
      type: "received",
      amount: 7875,
      description: "Invoice funding from FinTech Capital",
      timestamp: "2024-01-18 14:30",
      txHash: "0x8f3a9c2d5e7b1a4f..."
    },
    {
      id: 2,
      type: "sent", 
      amount: 250,
      description: "Platform service fee",
      timestamp: "2024-01-18 14:25",
      txHash: "0x1a2b3c4d5e6f7a8b..."
    },
    {
      id: 3,
      type: "received",
      amount: 11200,
      description: "Invoice funding from Digital Assets Fund",
      timestamp: "2024-01-16 09:15",
      txHash: "0x9f8e7d6c5b4a3f2e..."
    }
  ];

  const assets = [
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 18750.45,
      value: 18750.45,
      change: "+0.02%"
    },
    {
      symbol: "USDT", 
      name: "Tether USD",
      balance: 5000.00,
      value: 5000.00,
      change: "+0.01%"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 0.0234,
      value: 62.15,
      change: "+2.45%"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Wallet Dashboard</h1>
          <p className="text-muted-foreground">Manage your digital assets and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Deposit
          </Button>
          <Button variant="gradient" className="gap-2">
            <Minus className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Wallet Overview */}
      <Card className="shadow-elevated bg-gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              <span className="text-lg font-semibold">Main Wallet</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="text-white hover:bg-white/10"
            >
              {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm opacity-80">Total Balance</div>
              <div className="text-3xl font-bold">
                {balanceVisible ? `$${walletData.mainBalance.toLocaleString()}` : "••••••"}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">{walletData.walletAddress.slice(0, 6)}...{walletData.walletAddress.slice(-4)}</span>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {walletData.network}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(walletData.walletAddress)}
                  className="text-white hover:bg-white/10"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ${walletData.mainBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready for withdrawal</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Pending Receivables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ${walletData.pendingReceivables.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting funding</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Escrow Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              ${walletData.escrowBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Secured funds</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Portfolio */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Asset Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${asset.value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{asset.balance} {asset.symbol}</div>
                  <div className="text-xs text-success">{asset.change}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'received' ? 'bg-success/10' : 'bg-warning/10'
                  }`}>
                    {activity.type === 'received' ? (
                      <ArrowDownLeft className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {activity.type === 'received' ? '+' : '-'}${activity.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};