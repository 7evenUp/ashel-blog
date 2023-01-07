import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credensials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (
          credentials?.username === env.CREDENTIALS_USERNAME &&
          credentials.password === env.CREDENTIALS_PASSWORD
        ) {
          return {
            name: 'Artyom Shel',
            username: credentials.username,
            email: "sheludeshev.artyom@mail.ru",
            image: null
          };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
