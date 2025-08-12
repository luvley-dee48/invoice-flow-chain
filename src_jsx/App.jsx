import { HashRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index.jsx'
import NotFound from './pages/NotFound.jsx'
import SmeDashboard from './pages/SmeDashboard.jsx'
import InvestorDashboardPage from './pages/InvestorDashboard.jsx'
import ClientDashboardPage from './pages/ClientDashboard.jsx'
import AdminDashboardPage from './pages/AdminDashboard.jsx'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/sme" element={<SmeDashboard />} />
          <Route path="/dashboard/investor" element={<InvestorDashboardPage />} />
          <Route path="/dashboard/client" element={<ClientDashboardPage />} />
          <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App