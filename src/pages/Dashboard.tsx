import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const roleFromUrl = searchParams.get("role");
    if (roleFromUrl) {
      setUserRole(roleFromUrl);
    }
  }, [searchParams]);

  const renderSMEContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "invoices":
        return <InvoiceManagement />;
      case "upload":
        return <InvoiceManagement />;
      case "offers":
        return <InvestorOffers />;
      case "transactions":
        return <TransactionHistory />;
      case "wallet":
        return <WalletDashboard />;
      case "profile":
        return <ProfileKYC />;
      default:
        return <DashboardOverview />;
    }
  };

  const renderRoleBasedDashboard = () => {
    switch (userRole) {
      case "sme":
        return renderSMEContent();
      case "investor":
        return <InvestorDashboard />;
      case "client":
        return <ClientDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleRoleSelect = (role: string) => {
    setUserRole(role);
    setActiveSection("overview");
    setSearchParams({ role });
  };

  const handleRoleChange = () => {
    setUserRole(null);
    setActiveSection("overview");
    setSearchParams({});
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!userRole) {
    return (
      <div className="min-h-screen">
        <RoleSelector onRoleSelect={handleRoleSelect} />
        <div className="fixed top-4 right-4">
          <Button variant="outline" onClick={handleBackToHome}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (userRole === "sme") {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={userRole}
          onRoleChange={handleRoleChange}
        />
        <main className="flex-1 p-6 overflow-auto">{renderSMEContent()}</main>
      </div>
    );
  }

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRoleChange}>
            Switch Role
          </Button>
          <Button variant="outline" onClick={handleBackToHome}>
            Back to Home
          </Button>
        </div>
      </div>
      {renderRoleBasedDashboard()}
    </div>
  );
};

export default Dashboard;