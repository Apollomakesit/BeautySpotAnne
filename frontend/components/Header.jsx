'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Menu, X, Sparkles, User, LogOut, ChevronDown, Settings, Crown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [])

  const navLinks = [
    { href: '/', label: 'Acasa' },
    { href: '/servicii', label: 'Servicii' },
    { href: '/recenzii', label: 'Recenzii' },
    { href: '/booking', label: 'Programare' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-beauty py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-beauty flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-beauty-rose via-beauty-fuchsia to-beauty-rosegold flex items-center justify-center shadow-beauty group-hover:shadow-beauty-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-display font-bold text-beauty-charcoal tracking-tight">
                Beauty<span className="gradient-text">Spot</span>
              </span>
              <span className="block text-[10px] font-medium text-beauty-rosegold tracking-[0.2em] uppercase -mt-1">
                by Anne
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2.5 text-sm font-medium text-beauty-charcoal/80 hover:text-beauty-rose transition-colors duration-300 rounded-full hover:bg-beauty-rose/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-beauty-rose to-beauty-fuchsia rounded-full group-hover:w-6 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-full hover:bg-beauty-rose/5 transition-all duration-300"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={34}
                      height={34}
                      className="rounded-full ring-2 ring-beauty-rose/30"
                    />
                  ) : (
                    <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-beauty-rose/20 to-beauty-fuchsia/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-beauty-rose" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-beauty-charcoal">
                    {session.user.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-beauty-mauve transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-beauty-lg border border-beauty-blush-soft p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-beauty-blush-soft mb-1">
                        <p className="text-sm font-semibold text-beauty-charcoal">{session.user.name}</p>
                        <p className="text-xs text-beauty-mauve truncate">{session.user.email}</p>
                      </div>
                      {session.user.isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-beauty-warm hover:text-beauty-rose hover:bg-beauty-rose/5 rounded-xl transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          Panou Admin
                        </Link>
                      )}
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-beauty-warm hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Deconectare
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-secondary !py-2.5 !px-5 text-sm flex items-center gap-2 !border-beauty-rose/30"
              >
                <User className="w-4 h-4" />
                Autentificare
              </Link>
            )}

            <Link href="/booking" className="btn-primary !py-2.5 !px-6 text-sm flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Programeaza-te
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-2xl hover:bg-beauty-rose/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-beauty-charcoal" />
            ) : (
              <Menu className="w-6 h-6 text-beauty-charcoal" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-beauty-charcoal/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-beauty-blush-soft">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-beauty-rose to-beauty-fuchsia flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-display font-bold text-beauty-charcoal">
                      Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl hover:bg-beauty-rose/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-beauty-charcoal" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 py-6 px-4 space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3.5 text-lg font-medium text-beauty-charcoal hover:text-beauty-rose hover:bg-beauty-rose/5 rounded-2xl transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-beauty-blush-soft space-y-3 bg-beauty-cream/50">
                  {session ? (
                    <div className="flex items-center gap-3 mb-3">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-beauty-rose/20"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-sm">{session.user.name}</p>
                        <button
                          onClick={() => signOut()}
                          className="text-xs text-beauty-mauve hover:text-red-500"
                        >
                          Deconectare
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-secondary w-full text-center block"
                    >
                      Autentificare
                    </Link>
                  )}
                  <Link
                    href="/booking"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center block"
                  >
                    Programeaza-te Acum
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
