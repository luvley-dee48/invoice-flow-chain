import { ClientDashboard as ClientDashboardInner } from '@/components/ClientDashboard'

const ClientDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-4 rounded-md border border-dashed border-primary p-3 text-xs">
        JSX VERSION: Client Dashboard
      </div>
      <ClientDashboardInner />
    </div>
  )
}

export default ClientDashboardPage