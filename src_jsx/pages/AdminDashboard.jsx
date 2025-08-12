import { AdminDashboard as AdminDashboardInner } from '@/components/AdminDashboard'

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-4 rounded-md border border-dashed border-primary p-3 text-xs">
        JSX VERSION: Admin Dashboard
      </div>
      <AdminDashboardInner />
    </div>
  )
}

export default AdminDashboardPage