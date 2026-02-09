'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import {
  Sparkles, Plus, Trash2, Edit3, Check, X, Loader2,
  Image as ImageIcon, DollarSign, Clock, Save, Eye
} from 'lucide-react'

export default function AdminServiciiPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const emptyForm = {
    name: '',
    description: '',
    duration_minutes: 60,
    price: 0,
    deposit_amount: 0,
    image_url: '',
  }
  const [form, setForm] = useState(emptyForm)
  const [editForm, setEditForm] = useState(emptyForm)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
      .then((res) => setServices(res.data))
      .catch(() => toast.error('Eroare la încărcarea serviciilor'))
      .finally(() => setLoading(false))
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/services/`, form)
      fetchServices()
      setShowAddForm(false)
      setForm(emptyForm)
      toast.success('Serviciu adăugat cu succes!')
    } catch (err) {
      toast.error('Eroare la adăugarea serviciului')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = async (id) => {
    setSubmitting(true)
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, editForm)
      fetchServices()
      setEditingId(null)
      toast.success('Serviciu actualizat!')
    } catch (err) {
      toast.error('Eroare la actualizarea serviciului')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Ești sigură că vrei să ștergi acest serviciu?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`)
      fetchServices()
      toast.success('Serviciu șters')
    } catch (err) {
      toast.error('Eroare la ștergerea serviciului')
    }
  }

  const startEdit = (service) => {
    setEditingId(service.id)
    setEditForm({
      name: service.name,
      description: service.description || '',
      duration_minutes: service.duration_minutes,
      price: service.price,
      deposit_amount: service.deposit_amount || 0,
      image_url: service.image_url || '',
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-beauty-charcoal">Servicii</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestionează serviciile, prețurile și fotografiile
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={clsx(
            'flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-300',
            showAddForm
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'bg-beauty-rose text-white hover:bg-beauty-rose-dark shadow-beauty'
          )}
        >
          {showAddForm ? 'Anulează' : (
            <>
              <Plus className="w-4 h-4" />
              Adaugă Serviciu
            </>
          )}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-3xl shadow-beauty border border-beauty-cream-dark/50 p-8">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-beauty-rose" />
                Serviciu Nou
              </h2>
              <form onSubmit={handleAdd} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Numele Serviciului</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="ex. Extensii Gene Classic"
                      className="input-beauty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Durată (minute)</label>
                    <input
                      type="number"
                      required
                      min="15"
                      value={form.duration_minutes}
                      onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) })}
                      className="input-beauty"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Descriere</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Descrie serviciul..."
                    rows="3"
                    className="textarea-beauty"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Preț (RON)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                      className="input-beauty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Avans Online (RON)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={form.deposit_amount}
                      onChange={(e) => setForm({ ...form, deposit_amount: parseFloat(e.target.value) })}
                      className="input-beauty"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                    URL Imagine (link către fotografie)
                  </label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="input-beauty"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Poți folosi un link de pe Instagram, Google Photos, Imgur, sau orice URL de imagine.
                  </p>
                  {form.image_url && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-beauty-cream-dark/50 h-40 bg-beauty-cream">
                      <img
                        src={form.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {submitting ? 'Se salvează...' : 'Salvează Serviciul'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-white animate-pulse h-28" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 text-beauty-cream-dark mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Nu ai niciun serviciu</h3>
          <p className="text-gray-500 text-sm mb-6">Adaugă primul tău serviciu pentru a primi programări.</p>
          <button onClick={() => setShowAddForm(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Adaugă Serviciu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-beauty-cream-dark/50 overflow-hidden"
            >
              {editingId === service.id ? (
                /* ─── Edit Mode ─── */
                <div className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Nume</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="input-beauty !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Durată (min)</label>
                      <input
                        type="number"
                        value={editForm.duration_minutes}
                        onChange={(e) => setEditForm({ ...editForm, duration_minutes: parseInt(e.target.value) })}
                        className="input-beauty !py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Descriere</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows="2"
                      className="textarea-beauty text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Preț (RON)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="input-beauty !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Avans (RON)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.deposit_amount}
                        onChange={(e) => setEditForm({ ...editForm, deposit_amount: parseFloat(e.target.value) })}
                        className="input-beauty !py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL Imagine</label>
                    <input
                      type="url"
                      value={editForm.image_url}
                      onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                      className="input-beauty !py-2 text-sm"
                    />
                    {editForm.image_url && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-beauty-cream-dark/50 h-32 bg-beauty-cream">
                        <img
                          src={editForm.image_url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleEdit(service.id)}
                      disabled={submitting}
                      className="btn-primary flex items-center gap-2 text-sm !py-2.5 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Salvează
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              ) : (
                /* ─── View Mode ─── */
                <div className="flex items-center gap-5 p-5">
                  {/* Image Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-beauty-rose/10 to-beauty-gold/10 flex-shrink-0 overflow-hidden">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-beauty-rose/30"><path d="M21 15V19a2 2 0 01-2 2H5a2 2 0 01-2-2V15"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-beauty-rose/30" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-beauty-charcoal">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-gray-400 truncate">{service.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-1.5 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" /> {service.duration_minutes} min
                      </span>
                      <span className="font-display font-bold text-beauty-rose">{service.price} RON</span>
                      <span className="text-xs text-beauty-gold">Avans: {service.deposit_amount} RON</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2.5 rounded-xl hover:bg-beauty-rose/5 text-gray-400 hover:text-beauty-rose transition-all"
                      title="Editează"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                      title="Șterge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
