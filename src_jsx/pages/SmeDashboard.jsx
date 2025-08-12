import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '../components/DashboardSidebar'
import { DashboardOverview } from '@/components/DashboardOverview'
import { InvoiceManagement } from '@/components/InvoiceManagement'
import { InvestorOffers } from '@/components/InvestorOffers'
import { TransactionHistory } from '@/components/TransactionHistory'
import { WalletDashboard } from '@/components/WalletDashboard'
import { ProfileKYC } from '@/components/ProfileKYC'

const SmeDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview')

  const renderSMEContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />
      case 'invoices':
        return <InvoiceManagement />
      case 'offers':
        return <InvestorOffers />
      case 'transactions':
        return <TransactionHistory />
      case 'wallet':
        return <WalletDashboard />
      case 'profile':
        return <ProfileKYC />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userRole={'sme'}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-4 rounded-md border border-dashed border-primary p-3 text-xs">
          JSX VERSION: SME Dashboard
        </div>
        {renderSMEContent()}
      </main>
    </div>
  )
}

export default SmeDashboard