import './globals.css'
import { Inter } from 'next/font/google'
import SessionWrapper from '../components/SessionWrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BeautySpot Anne - Extensii Gene București',
  description: 'Salon profesional de extensii gene, lash lift și beauty treatments',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <SessionWrapper>
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
