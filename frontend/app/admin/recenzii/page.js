'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { Star, Check, X, Trash2, Loader2, MessageCircle } from 'lucide-react'

export default function AdminRecenziiPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = () => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/?approved_only=false`)
      .then((res) => setReviews(res.data))
      .catch(() => toast.error('Eroare la încărcarea recenziilor'))
      .finally(() => setLoading(false))
  }

  const approveReview = async (id) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}/approve`)
      fetchReviews()
      toast.success('Recenzie aprobată!')
    } catch {
      toast.error('Eroare')
    }
  }

  const rejectReview = async (id) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}/reject`)
      fetchReviews()
      toast.success('Recenzie respinsă')
    } catch {
      toast.error('Eroare')
    }
  }

  const deleteReview = async (id) => {
    if (!confirm('Ești sigură că vrei să ștergi această recenzie?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`)
      fetchReviews()
      toast.success('Recenzie ștearsă')
    } catch {
      toast.error('Eroare')
    }
  }

  const pendingCount = reviews.filter((r) => !r.approved).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-beauty-charcoal">Recenzii</h1>
        <p className="text-gray-500 text-sm mt-1">
          {pendingCount > 0 ? `${pendingCount} recenzii în așteptare` : 'Toate recenziile sunt gestionate'}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-beauty-rose animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <Star className="w-16 h-16 text-beauty-cream-dark mx-auto mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Nicio recenzie</h3>
          <p className="text-gray-500 text-sm">Recenziile clienților vor apărea aici.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                'bg-white rounded-2xl shadow-sm border overflow-hidden',
                review.approved ? 'border-beauty-cream-dark/50' : 'border-beauty-gold/30 bg-beauty-gold/[0.02]'
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-beauty-charcoal">{review.client_name}</h3>
                      {review.approved ? (
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                          Aprobată
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium">
                          În așteptare
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={clsx(
                            'w-4 h-4',
                            i < review.rating
                              ? 'text-beauty-gold fill-beauty-gold'
                              : 'text-gray-200'
                          )}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(review.created_at).toLocaleDateString('ro-RO')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!review.approved && (
                      <button
                        onClick={() => approveReview(review.id)}
                        className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Aprobă"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {review.approved && (
                      <button
                        onClick={() => rejectReview(review.id)}
                        className="p-2 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                        title="Retrage aprobarea"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Șterge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {review.text && (
                  <p className="text-sm text-gray-600 bg-beauty-cream/50 rounded-xl p-4 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
