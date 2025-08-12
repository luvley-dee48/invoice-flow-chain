import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Index = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-6 rounded-md border border-dashed border-primary p-4 text-sm">
        <strong>JSX VERSION</strong>: This is the JSX-based app copy. Your original TypeScript app remains unchanged at the default index.html.
      </div>
      <h1 className="mb-4 text-2xl font-bold">Choose a Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/dashboard/sme">
          <Button variant="secondary" className="w-full justify-start">SME Dashboard</Button>
        </Link>
        <Link to="/dashboard/investor">
          <Button variant="secondary" className="w-full justify-start">Investor Dashboard</Button>
        </Link>
        <Link to="/dashboard/client">
          <Button variant="secondary" className="w-full justify-start">Client Dashboard</Button>
        </Link>
        <Link to="/dashboard/admin">
          <Button variant="secondary" className="w-full justify-start">Admin Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

export default Index