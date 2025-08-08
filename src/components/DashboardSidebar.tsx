import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  History, 
  User, 
  Settings,
  Wallet,
  PlusCircle
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole?: string;
  onRoleChange?: () => void;
}

export const DashboardSidebar = ({ activeSection, onSectionChange, userRole, onRoleChange }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'invoices', label: 'My Invoices', icon: FileText },
    { id: 'offers', label: 'Investor Offers', icon: TrendingUp },
    { id: 'transactions', label: 'Transactions', icon: History },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile & KYC', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          InvoiceFlow
        </h1>
        <p className="text-sm text-muted-foreground mt-1">SME Dashboard</p>
      </div>
      
      <div className="p-4">
        <Button 
          variant="gradient" 
          className="w-full justify-start gap-2 mb-6"
          onClick={() => onSectionChange('upload')}
        >
          <PlusCircle className="h-4 w-4" />
          Upload Invoice
        </Button>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  activeSection === item.id && "bg-primary/10 text-primary border-primary/20"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
      
      {onRoleChange && (
        <div className="p-4 mt-auto border-t border-border">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={onRoleChange}
          >
            <Settings className="h-4 w-4" />
            Switch Role
          </Button>
        </div>
      )}
    </div>
  );
};