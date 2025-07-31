import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  Eye, 
  Download,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react";

export const InvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const invoices = [
    {
      id: "INV-2024-001",
      client: "Tech Solutions Ltd",
      amount: 12500,
      status: "pending_offers",
      offers: 3,
      bestOffer: 85,
      created: "2024-01-15",
      dueDate: "2024-02-15",
      nftId: "NFT-001-2024",
      blockchain: "Ethereum"
    },
    {
      id: "INV-2024-002", 
      client: "Digital Marketing Co",
      amount: 8750,
      status: "funded",
      offers: 1,
      bestOffer: 90,
      created: "2024-01-12",
      dueDate: "2024-02-12",
      nftId: "NFT-002-2024",
      blockchain: "Polygon"
    },
    {
      id: "INV-2024-003",
      client: "E-commerce Startup", 
      amount: 15200,
      status: "under_review",
      offers: 0,
      bestOffer: null,
      created: "2024-01-10",
      dueDate: "2024-02-10",
      nftId: "Pending",
      blockchain: "Pending"
    },
    {
      id: "INV-2024-004",
      client: "Software Development LLC",
      amount: 22000,
      status: "tokenized",
      offers: 5,
      bestOffer: 88,
      created: "2024-01-08",
      dueDate: "2024-02-08", 
      nftId: "NFT-004-2024",
      blockchain: "Ethereum"
    },
    {
      id: "INV-2024-005",
      client: "Consulting Firm Inc",
      amount: 9800,
      status: "declined",
      offers: 2,
      bestOffer: 75,
      created: "2024-01-05",
      dueDate: "2024-02-05",
      nftId: "N/A",
      blockchain: "N/A"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "funded": return "success";
      case "pending_offers": return "warning";
      case "under_review": return "secondary";
      case "tokenized": return "accent";
      case "declined": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "funded": return CheckCircle;
      case "pending_offers": return TrendingUp;
      case "under_review": return Clock;
      case "tokenized": return LinkIcon;
      case "declined": return AlertCircle;
      default: return FileText;
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoice Management</h1>
          <p className="text-muted-foreground">Track and manage your invoice financing</p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Upload className="h-4 w-4" />
          Upload New Invoice
        </Button>
      </div>

      {/* Upload Zone */}
      <Card className="shadow-card border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Invoice</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your unpaid invoices or click to browse
          </p>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Choose Files
          </Button>
          <div className="mt-4 text-xs text-muted-foreground">
            Supported formats: PDF, PNG, JPG (Max 10MB)
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => {
          const StatusIcon = getStatusIcon(invoice.status);
          return (
            <Card key={invoice.id} className="shadow-card hover:shadow-elevated transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <StatusIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                        <Badge variant={getStatusColor(invoice.status) as any}>
                          {invoice.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{invoice.client}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <span className="text-foreground font-medium">
                          ${invoice.amount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          Due: {invoice.dueDate}
                        </span>
                        {invoice.offers > 0 && (
                          <span className="text-accent">
                            {invoice.offers} offer{invoice.offers > 1 ? 's' : ''}
                          </span>
                        )}
                        {invoice.bestOffer && (
                          <span className="text-success">
                            Best: {invoice.bestOffer}% advance
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    {/* NFT/Blockchain Info */}
                    {invoice.nftId !== "Pending" && invoice.nftId !== "N/A" && (
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">NFT ID</div>
                        <div className="text-sm font-mono text-foreground">{invoice.nftId}</div>
                        <div className="text-xs text-accent">{invoice.blockchain}</div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      {invoice.offers > 0 && (
                        <Button variant="accent" size="sm" className="gap-1">
                          <TrendingUp className="h-3 w-3" />
                          View Offers
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{invoices.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Active Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {invoices.reduce((sum, inv) => sum + inv.offers, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};