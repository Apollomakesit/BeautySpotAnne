import './globals.css'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import SessionWrapper from '../components/SessionWrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'BeautySpot Anne | Extensii Gene Premium - București',
  description: 'Salon premium de extensii gene, lash lift și tratamente beauty personalizate. Programează-te online și descoperă frumusețea naturală.',
  keywords: 'extensii gene, lash lift, beauty salon, București, tratamente beauty',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className={inter.className}>
        <SessionWrapper>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#2D2028',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                boxShadow: '0 8px 40px rgba(232, 120, 138, 0.15)',
                border: '1px solid rgba(232, 120, 138, 0.15)',
              },
              success: {
                iconTheme: { primary: '#E8788A', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#e74c3c', secondary: '#fff' },
              },
            }}
          />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}
