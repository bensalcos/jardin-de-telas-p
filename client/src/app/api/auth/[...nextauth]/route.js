import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Token JWT API Login",
      credentials: {
        correo: { label: "correo", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: credentials.correo,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.access) {
          return { token: data.access, refresh: data.refresh };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;

        try {
          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/perfil/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (profileRes.ok) {
            const profileData = await profileRes.json();
            token.user = profileData;
          } else {
            console.error("Error fetching profile:", await profileRes.text());
            token.user = null;
          }
        } catch (error) {
          console.error("JWT Callback Error:", error);
          token.user = null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user || null;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };
