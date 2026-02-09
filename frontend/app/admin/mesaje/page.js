'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { MessageSquare, Mail, Phone, Clock, Check, Loader2 } from 'lucide-react'

export default function AdminMesajePage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`)
      .then((res) => setMessages(res.data))
      .catch(() => toast.error('Eroare la încărcarea mesajelor'))
      .finally(() => setLoading(false))
  }

  const markRead = async (id) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}/read`)
      fetchMessages()
    } catch {
      toast.error('Eroare')
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-beauty-charcoal">Mesaje Contact</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} mesaje noi necitite` : 'Toate mesajele sunt citite'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-beauty-rose animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-16 h-16 text-beauty-cream-dark mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Niciun mesaj</h3>
          <p className="text-gray-500 text-sm">Mesajele de pe pagina de contact vor apărea aici.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                'bg-white rounded-2xl shadow-sm border overflow-hidden transition-all',
                msg.read ? 'border-beauty-cream-dark/50' : 'border-beauty-rose/30 bg-beauty-rose/[0.02]'
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-beauty-charcoal">{msg.name}</h3>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full bg-beauty-rose/10 text-beauty-rose text-xs font-medium">
                          Nou
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> {msg.email}
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" /> {msg.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(msg.created_at).toLocaleDateString('ro-RO', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-beauty-sage bg-beauty-sage/10 hover:bg-beauty-sage/20 transition-colors"
                    >
                      <Check className="w-3 h-3" /> Marchează citit
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 bg-beauty-cream/50 rounded-xl p-4 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
