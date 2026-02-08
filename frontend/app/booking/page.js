'use client'
import { Suspense } from 'react'
import BookingContent from './BookingContent'
import { Loader2 } from 'lucide-react'

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-beauty-rose animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Se încarcă formularul...</p>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}
