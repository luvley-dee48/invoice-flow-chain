import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, DollarSign, Shield } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "sme",
      title: "SME / Freelancer",
      description: "Upload invoices, tokenize as NFTs, and access immediate funding",
      icon: Users,
      features: [
        "Upload and manage invoices",
        "Tokenize invoices as NFTs",
        "Receive instant funding",
        "Track payment status",
        "KYC verification"
      ],
      color: "from-primary/20 to-accent/20 border-primary/30"
    },
    {
      id: "investor",
      title: "Investor",
      description: "Browse and invest in tokenized invoice NFTs for returns",
      icon: TrendingUp,
      features: [
        "Browse invoice NFT marketplace",
        "Purchase investment opportunities",
        "Track portfolio performance",
        "Secondary market trading",
        "Automated returns via smart contracts"
      ],
      color: "from-success/20 to-primary/20 border-success/30"
    },
    {
      id: "client",
      title: "Client / Payer",
      description: "Manage and pay outstanding invoices efficiently",
      icon: DollarSign,
      features: [
        "View outstanding invoices",
        "Track payment schedules",
        "Make secure payments",
        "Handle tokenized invoices",
        "Payment history tracking"
      ],
      color: "from-accent/20 to-secondary/20 border-accent/30"
    },
    {
      id: "admin",
      title: "Platform Admin",
      description: "Oversee platform operations and user management",
      icon: Shield,
      features: [
        "User management and verification",
        "Transaction monitoring",
        "Dispute resolution",
        "Security and compliance",
        "Platform analytics"
      ],
      color: "from-warning/20 to-destructive/20 border-warning/30"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Twinvest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing invoice financing through blockchain technology and NFT tokenization
          </p>
          <p className="text-muted-foreground">
            Select your role to access the appropriate dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 bg-gradient-to-br ${role.color}`}
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-background/80 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Enter Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Built on Internet Computer (ICP) blockchain • Secure • Transparent • Decentralized
          </p>
        </div>
      </div>
    </div>
  );
};