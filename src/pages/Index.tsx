import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Landing page imports
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

// Dashboard imports
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { InvoiceManagement } from "@/components/InvoiceManagement";
import { InvestorOffers } from "@/components/InvestorOffers";
import { TransactionHistory } from "@/components/TransactionHistory";
import { WalletDashboard } from "@/components/WalletDashboard";
import { ProfileKYC } from "@/components/ProfileKYC";
import { InvestorDashboard } from "@/components/InvestorDashboard";
import { ClientDashboard } from "@/components/ClientDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { RoleSelector } from "@/components/RoleSelector";

const Index = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can replace with real auth
  const navigate = useNavigate();

  // ----- SME Dashboard Renderer -----
  const renderSMEContent = () => {
    switch (activeSection) {
      case "overview": return <DashboardOverview />;
      case "invoices": return <InvoiceManagement />;
      case "offers": return <InvestorOffers />;
      case "transactions": return <TransactionHistory />;
      case "wallet": return <WalletDashboard />;
      case "profile": return <ProfileKYC />;
      default: return <DashboardOverview />;
    }
  };

  // ----- Role-Based Dashboard Renderer -----
  const renderRoleBasedDashboard = () => {
    switch (userRole) {
      case "sme": return renderSMEContent();
      case "investor": return <InvestorDashboard />;
      case "client": return <ClientDashboard />;
      case "admin": return <AdminDashboard />;
      default: return <DashboardOverview />;
    }
  };

  // ----- Decide Landing vs Dashboard -----
  if (!isLoggedIn) {
    // Landing Page
    return (
      <div className="min-h-screen">
        <NavBar />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  // ----- Role Selection -----
  if (!userRole) {
    return <RoleSelector onRoleSelect={setUserRole} />;
  }

  // ----- SME Layout -----
  if (userRole === "sme") {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={userRole}
          onRoleChange={() => setUserRole(null)}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderSMEContent()}
        </main>
      </div>
    );
  }

  // ----- Other Roles -----
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Twinvest
          </h1>
          <span className="text-sm text-muted-foreground">
            {userRole === "investor"
              ? "Investor Portal"
              : userRole === "client"
              ? "Client Portal"
              : userRole === "admin"
              ? "Admin Portal"
              : ""}
          </span>
        </div>
        <Button variant="outline" onClick={() => setUserRole(null)}>
          Switch Role
        </Button>
      </div>
      {renderRoleBasedDashboard()}
    </div>
  );
};

export default Index;
