import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-2 text-2xl font-bold">Page not found</h1>
      <p className="mb-4 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link className="text-primary underline" to="/">Go home</Link>
    </div>
  )
}

export default NotFound