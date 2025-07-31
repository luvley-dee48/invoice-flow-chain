import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  History, 
  Download, 
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter
} from "lucide-react";

export const TransactionHistory = () => {
  const transactions = [
    {
      id: "TXN-001",
      type: "funding_received",
      amount: 7875,
      description: "Invoice INV-2024-002 funded by FinTech Capital",
      date: "2024-01-18",
      status: "completed",
      blockchain: "Ethereum",
      txHash: "0x742d35cc6aa88532b09393b6c2c7f3f4f2a8e4d9...",
      fees: 150,
      netAmount: 7725
    },
    {
      id: "TXN-002", 
      type: "repayment_made",
      amount: 8750,
      description: "Repayment for Invoice INV-2024-002 to FinTech Capital",
      date: "2024-01-16",
      status: "completed",
      blockchain: "Ethereum", 
      txHash: "0x8f3a9c2d5e7b1a4f8c6d9e2a5b8c1f4e7a0d3b6...",
      fees: 25,
      netAmount: 8725
    },
    {
      id: "TXN-003",
      type: "funding_received", 
      amount: 19800,
      description: "Invoice INV-2024-003 funded by Blockchain Ventures",
      date: "2024-01-14",
      status: "completed",
      blockchain: "Polygon",
      txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0...",
      fees: 300,
      netAmount: 19500
    },
    {
      id: "TXN-004",
      type: "tokenization",
      amount: 0,
      description: "Invoice INV-2024-001 tokenized as NFT",
      date: "2024-01-12",
      status: "completed", 
      blockchain: "Ethereum",
      txHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0...",
      fees: 50,
      netAmount: -50
    },
    {
      id: "TXN-005",
      type: "funding_received",
      amount: 11400,
      description: "Invoice INV-2024-001 funded by Digital Assets Fund", 
      date: "2024-01-10",
      status: "pending",
      blockchain: "Ethereum",
      txHash: "0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6...",
      fees: 200,
      netAmount: 11200
    },
    {
      id: "TXN-006",
      type: "wallet_deposit",
      amount: 5000,
      description: "Initial wallet funding",
      date: "2024-01-08",
      status: "completed",
      blockchain: "Ethereum", 
      txHash: "0x6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7...",
      fees: 15,
      netAmount: 4985
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "funding_received":
        return ArrowDownLeft;
      case "repayment_made":
        return ArrowUpRight;
      case "tokenization":
        return ExternalLink;
      case "wallet_deposit":
        return ArrowDownLeft;
      default:
        return History;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "funding_received":
        return "text-success";
      case "repayment_made":
        return "text-warning";
      case "tokenization":
        return "text-accent";
      case "wallet_deposit":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const totalReceived = transactions
    .filter(t => t.type === "funding_received" && t.status === "completed")
    .reduce((sum, t) => sum + t.netAmount, 0);

  const totalRepaid = transactions
    .filter(t => t.type === "repayment_made" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactions
    .reduce((sum, t) => sum + t.fees, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground">Complete record of all financial transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalReceived.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Repaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${totalRepaid.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Net Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${(totalReceived - totalRepaid).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Transaction List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            All Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.map((transaction) => {
            const IconComponent = getTransactionIcon(transaction.type);
            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-primary/10`}>
                    <IconComponent className={`h-5 w-5 ${getTransactionColor(transaction.type)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{transaction.id}</h3>
                      <Badge variant={getStatusColor(transaction.status) as any}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        {transaction.blockchain}
                      </span>
                      <span className="font-mono">
                        {transaction.txHash.slice(0, 10)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === "funding_received" || transaction.type === "wallet_deposit" 
                      ? "text-success" 
                      : transaction.type === "repayment_made"
                      ? "text-warning"
                      : "text-foreground"
                  }`}>
                    {transaction.type === "repayment_made" ? "-" : "+"}
                    ${transaction.netAmount.toLocaleString()}
                  </div>
                  {transaction.fees > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Fee: ${transaction.fees}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="mt-1">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};