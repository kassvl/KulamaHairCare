import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { adminConfigured, isAuthenticated } from '@/lib/auth'
import { bookableDates } from '@/lib/appointments'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Studio desk · KULAMA',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <AdminLogin configured={adminConfigured()} />
  }
  return <AdminDashboard dates={bookableDates()} />
}
