'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import {
  Calendar, Clock, Plus, Trash2, AlertCircle, Check, Loader2
} from 'lucide-react'

const DAYS = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']
const DAY_COLORS = [
  'bg-beauty-rose/10 text-beauty-rose',
  'bg-beauty-gold/10 text-beauty-gold',
  'bg-beauty-sage/10 text-beauty-sage',
  'bg-beauty-rose/10 text-beauty-rose-dark',
  'bg-beauty-blush/30 text-beauty-warm',
  'bg-beauty-gold/10 text-beauty-gold',
  'bg-gray-100 text-gray-400',
]

export default function DisponibilitatePage() {
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ day_of_week: 0, start_time: '10:00', end_time: '18:00' })

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/availability`)
      .then((res) => setAvailability(res.data))
      .catch(() => toast.error('Eroare la încărcarea disponibilității'))
      .finally(() => setLoading(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/`, form)
      fetchAvailability()
      setShowForm(false)
      setForm({ day_of_week: 0, start_time: '10:00', end_time: '18:00' })
      toast.success('Interval adăugat cu succes!')
    } catch (error) {
      toast.error('Eroare la adăugarea intervalului')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/${id}`)
      fetchAvailability()
      toast.success('Interval șters')
    } catch (error) {
      toast.error('Eroare la ștergere')
    }
  }

  // Group availability by day
  const grouped = DAYS.reduce((acc, day, idx) => {
    acc[idx] = availability.filter((a) => a.day_of_week === idx)
    return acc
  }, {})

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-beauty-charcoal">
            Disponibilitate
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestionează intervalele orare disponibile pentru programări
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={clsx(
            'flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-300',
            showForm
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'bg-beauty-rose text-white hover:bg-beauty-rose-dark shadow-beauty'
          )}
        >
          {showForm ? (
            <>Anulează</>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Adaugă Interval
            </>
          )}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-3xl shadow-beauty border border-beauty-cream-dark/50 p-8">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-beauty-rose" />
                Interval Nou
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Zi</label>
                  <select
                    value={form.day_of_week}
                    onChange={(e) => setForm({ ...form, day_of_week: parseInt(e.target.value) })}
                    className="select-beauty"
                  >
                    {DAYS.map((day, idx) => (
                      <option key={idx} value={idx}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      <Clock className="w-3.5 h-3.5 inline mr-1" /> Ora Start
                    </label>
                    <input
                      type="time"
                      value={form.start_time}
                      onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                      className="input-beauty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      <Clock className="w-3.5 h-3.5 inline mr-1" /> Ora Sfârșit
                    </label>
                    <input
                      type="time"
                      value={form.end_time}
                      onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                      className="input-beauty"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {submitting ? 'Se salvează...' : 'Salvează Intervalul'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Grid */}
      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-white animate-pulse h-20" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {DAYS.map((day, dayIdx) => {
            const daySlots = grouped[dayIdx] || []
            return (
              <motion.div
                key={dayIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-beauty-cream-dark/50 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold', DAY_COLORS[dayIdx])}>
                      {day.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-beauty-charcoal">{day}</p>
                      <p className="text-xs text-gray-400">
                        {daySlots.length === 0 ? 'Indisponibil' : `${daySlots.length} interval${daySlots.length > 1 ? 'e' : ''}`}
                      </p>
                    </div>
                  </div>

                  {daySlots.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center gap-2 bg-beauty-cream rounded-xl px-3 py-2 group"
                        >
                          <Clock className="w-3.5 h-3.5 text-beauty-rose" />
                          <span className="text-sm font-medium">
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <button
                            onClick={() => handleDelete(slot.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                            title="Șterge interval"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {daySlots.length === 0 && (
                    <span className="text-xs text-gray-300 bg-gray-50 px-3 py-1.5 rounded-lg">
                      Închis
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && availability.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-16 h-16 text-beauty-cream-dark mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">
            Nu ai setat nicio disponibilitate
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Adaugă intervalele orare în care ești disponibilă pentru programări.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adaugă Primul Interval
          </button>
        </div>
      )}
    </div>
  )
}
