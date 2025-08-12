import { InvestorDashboard as InvestorDashboardInner } from '@/components/InvestorDashboard'

const InvestorDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-4 rounded-md border border-dashed border-primary p-3 text-xs">
        JSX VERSION: Investor Dashboard
      </div>
      <InvestorDashboardInner />
    </div>
  )
}

export default InvestorDashboardPage