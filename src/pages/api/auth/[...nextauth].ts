import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials"

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session: ({ session, token }) => {
      console.log(token)
      if (session.user && token.sub) session.user.id = token.sub
      return session
    }
  },
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credensials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        console.log(env.CREDENTIALS_USERNAME, env.CREDENTIALS_PASSWORD)
        if (credentials?.username === env.CREDENTIALS_USERNAME && credentials.password === env.CREDENTIALS_PASSWORD) {
          return {
            username: credentials.username,
            email: 'sheludeshev.artyom@mail.ru',
          }
        }

        return null
      }
    })
  ],
};

export default NextAuth(authOptions);
