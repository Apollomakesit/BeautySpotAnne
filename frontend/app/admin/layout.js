'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Sparkles, Calendar, ClipboardList,
  Menu, X, ChevronRight, LogOut, Settings, MessageSquare, Star, Image
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/servicii', label: 'Servicii', icon: Sparkles },
  { href: '/admin/disponibilitate', label: 'Disponibilitate', icon: Calendar },
  { href: '/admin/programari', label: 'Programări', icon: ClipboardList },
  { href: '/admin/mesaje', label: 'Mesaje', icon: MessageSquare },
  { href: '/admin/recenzii', label: 'Recenzii', icon: Star },
]

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beauty-cream">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-beauty-rose border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!session) redirect('/login?callbackUrl=/admin/dashboard')

  // Check if user is admin
  if (!session.user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beauty-cream">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Acces Restricționat</h2>
          <p className="text-gray-500 text-sm mb-6">
            Nu ai permisiuni de administrator. Doar proprietara salonului poate accesa panoul de administrare.
          </p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            Înapoi la Site
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beauty-cream flex">
      {/* ─── Sidebar Overlay (mobile) ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-beauty-cream-dark/50 flex flex-col transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-beauty-cream-dark/50">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-beauty-rose to-beauty-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-beauty-charcoal text-sm">
                  Admin Panel
                </span>
                <span className="block text-[10px] text-gray-400">BeautySpot Anne</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-beauty-cream-dark/50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-beauty-rose/10 text-beauty-rose shadow-sm'
                    : 'text-gray-500 hover:bg-beauty-cream-dark/50 hover:text-beauty-charcoal'
                )}
              >
                <item.icon className={clsx('w-[18px] h-[18px]', isActive && 'text-beauty-rose')} />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-beauty-cream-dark/50">
          {session && (
            <div className="flex items-center gap-3 px-3 py-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-beauty-rose/10 flex items-center justify-center text-sm font-semibold text-beauty-rose">
                {session.user.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.user.name}</p>
                <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-2xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Deconectare
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-beauty-cream/80 backdrop-blur-xl border-b border-beauty-cream-dark/50">
          <div className="flex items-center gap-4 px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-beauty-cream-dark/50"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1" />
            <Link href="/" className="text-sm text-gray-400 hover:text-beauty-rose transition-colors flex items-center gap-1.5">
              Vezi Site-ul
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
