import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Parolă', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!res.ok) return null

          const user = await res.json()
          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            phone: user.phone,
            isAdmin: user.is_admin,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only upsert for OAuth providers (not credentials — those are handled by register/login)
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              avatar_url: user.image,
              provider: account.provider,
              provider_id: account.providerAccountId,
            }),
          })
          if (res.ok) {
            const data = await res.json()
            user.isAdmin = data.is_admin
            user.dbId = String(data.id)
          }
        } catch (error) {
          console.error('Error saving user:', error)
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin || false
        token.dbId = user.dbId || user.id
        token.phone = user.phone || null
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.dbId || token.sub
      session.user.isAdmin = token.isAdmin || false
      session.user.phone = token.phone || null
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
