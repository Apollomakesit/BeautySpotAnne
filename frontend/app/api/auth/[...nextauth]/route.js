import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/upsert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            avatar_url: user.image,
            provider: account.provider,
            provider_id: account.providerAccountId
          })
        })
        return true
      } catch (error) {
        console.error('Error saving user:', error)
        return true
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
