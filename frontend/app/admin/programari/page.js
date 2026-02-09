'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { ClipboardList, Calendar, Clock, User, Phone, Mail, Loader2, CreditCard } from 'lucide-react'

const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
}

const PAYMENT_COLORS = {
  unpaid: 'bg-gray-50 text-gray-500',
  deposit_paid: 'bg-beauty-gold/10 text-beauty-gold',
  paid: 'bg-green-50 text-green-600',
}

export default function AdminProgramariPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/`)
      .then((res) => setBookings(res.data))
      .catch(() => toast.error('Eroare la încărcarea programărilor'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-beauty-charcoal">Programări</h1>
        <p className="text-gray-500 text-sm mt-1">
          {bookings.length} programări totale
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-beauty-rose animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-16 h-16 text-beauty-cream-dark mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Nicio programare</h3>
          <p className="text-gray-500 text-sm">Programările noi vor apărea aici.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-beauty-cream-dark/50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-beauty-charcoal">
                      {booking.client_name}
                    </h3>
                    <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium border', STATUS_COLORS[booking.status] || 'bg-gray-50 text-gray-500')}>
                      {booking.status}
                    </span>
                    <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium', PAYMENT_COLORS[booking.payment_status] || 'bg-gray-50 text-gray-500')}>
                      <CreditCard className="w-3 h-3 inline mr-1" />
                      {booking.payment_status === 'deposit_paid' ? 'Avans plătit' : booking.payment_status === 'paid' ? 'Plătit' : 'Neplătit'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {booking.client_phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> {booking.client_phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {booking.booking_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {booking.booking_time}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400">
                  #{booking.id} — {new Date(booking.created_at).toLocaleDateString('ro-RO')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
