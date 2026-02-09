'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', toggleVisible)
    toggleVisible()
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          aria-label="Înapoi sus"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-beauty-rose hover:bg-beauty-rose-dark text-white shadow-beauty-lg hover:shadow-beauty-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ring-2 ring-white/30"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
