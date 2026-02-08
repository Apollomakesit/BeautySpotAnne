'use client'
import { Suspense } from 'react'
import BookingContent from './BookingContent'

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
