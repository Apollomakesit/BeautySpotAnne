'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession()

  // Aici ar trebui să verifici dacă user-ul e admin în database
  if (status === 'loading') return <div>Loading...</div>
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-beauty-rose">Admin Panel</h2>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-beauty-cream">
            📊 Dashboard
          </Link>
          <Link href="/admin/servicii" className="block px-4 py-3 rounded-lg hover:bg-beauty-cream">
            💅 Servicii
          </Link>
          <Link href="/admin/disponibilitate" className="block px-4 py-3 rounded-lg hover:bg-beauty-cream">
            📅 Disponibilitate
          </Link>
          <Link href="/admin/programari" className="block px-4 py-3 rounded-lg hover:bg-beauty-cream">
            📋 Programări
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
