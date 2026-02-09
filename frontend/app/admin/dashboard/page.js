'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {
  Sparkles, Calendar, ClipboardList, MessageSquare, Star,
  ArrowRight, Users, TrendingUp
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    messages: 0,
    reviews: 0,
  })

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return

    Promise.allSettled([
      axios.get(`${apiUrl}/api/services`),
      axios.get(`${apiUrl}/api/bookings/`),
      axios.get(`${apiUrl}/api/contact/`),
      axios.get(`${apiUrl}/api/reviews/?approved_only=false`),
    ]).then(([services, bookings, messages, reviews]) => {
      setStats({
        services: services.status === 'fulfilled' ? services.value.data.length : 0,
        bookings: bookings.status === 'fulfilled' ? bookings.value.data.length : 0,
        messages: messages.status === 'fulfilled' ? messages.value.data.length : 0,
        reviews: reviews.status === 'fulfilled' ? reviews.value.data.length : 0,
      })
    })
  }, [])

  const cards = [
    {
      title: 'Servicii Active',
      value: stats.services,
      icon: Sparkles,
      color: 'bg-beauty-rose/10 text-beauty-rose',
      href: '/admin/servicii',
    },
    {
      title: 'Total Programări',
      value: stats.bookings,
      icon: ClipboardList,
      color: 'bg-beauty-gold/10 text-beauty-gold',
      href: '/admin/programari',
    },
    {
      title: 'Mesaje Contact',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-beauty-sage/10 text-beauty-sage',
      href: '/admin/mesaje',
    },
    {
      title: 'Recenzii',
      value: stats.reviews,
      icon: Star,
      color: 'bg-beauty-blush/30 text-beauty-warm',
      href: '/admin/recenzii',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-beauty-charcoal">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bine ai venit în panoul de administrare</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-2xl shadow-sm border border-beauty-cream-dark/50 p-6 hover:shadow-beauty transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-beauty-rose group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-3xl font-display font-bold text-beauty-charcoal">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.title}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-beauty-cream-dark/50 p-8">
        <h2 className="text-xl font-display font-bold mb-6">Acțiuni Rapide</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/servicii"
            className="flex items-center gap-3 p-4 rounded-2xl border border-beauty-cream-dark/50 hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all"
          >
            <Sparkles className="w-5 h-5 text-beauty-rose" />
            <span className="text-sm font-medium">Gestionează Servicii</span>
          </Link>
          <Link
            href="/admin/disponibilitate"
            className="flex items-center gap-3 p-4 rounded-2xl border border-beauty-cream-dark/50 hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all"
          >
            <Calendar className="w-5 h-5 text-beauty-gold" />
            <span className="text-sm font-medium">Setează Disponibilitatea</span>
          </Link>
          <Link
            href="/admin/recenzii"
            className="flex items-center gap-3 p-4 rounded-2xl border border-beauty-cream-dark/50 hover:border-beauty-rose/40 hover:bg-beauty-rose/[0.02] transition-all"
          >
            <Star className="w-5 h-5 text-beauty-warm" />
            <span className="text-sm font-medium">Aprobă Recenzii</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
