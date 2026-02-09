import './globals.css'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SessionWrapper from '../components/SessionWrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata = {
  title: 'BeautySpot Anne | Extensii Gene Premium - București',
  description: 'Salon premium de extensii gene, lash lift și tratamente beauty personalizate. Programează-te online și descoperă frumusețea naturală.',
  keywords: 'extensii gene, lash lift, beauty salon, București, tratamente beauty',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={inter.className}>
        <SessionWrapper>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#2C2426',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                boxShadow: '0 12px 48px rgba(232, 160, 184, 0.22)',
                border: '1px solid rgba(232, 160, 184, 0.25)',
              },
              success: {
                iconTheme: { primary: '#E8A0B8', secondary: '#fff' },
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
          <BackToTop />
        </SessionWrapper>
      </body>
    </html>
  )
}
