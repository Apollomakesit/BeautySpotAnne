'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-beauty-rose">
          BeautySpot Anne
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-beauty-rose transition">Acasă</Link>
          <Link href="/servicii" className="hover:text-beauty-rose transition">Servicii</Link>
          <Link href="/booking" className="hover:text-beauty-rose transition">Programare</Link>
          <Link href="/contact" className="hover:text-beauty-rose transition">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-3">
              {session.user.image && (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name} 
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="hidden md:inline">{session.user.name}</span>
              <button onClick={() => signOut()} className="text-sm hover:text-beauty-rose">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => signIn()} className="btn-primary">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
