import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. The Real Provider (For Production & Local Testing)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 2. The Dev Provider (ONLY shows when running locally)
    ...(process.env.NODE_ENV === "development"
      ? [
          CredentialsProvider({
            name: "Dev Login (Mock)",
            credentials: {},
            async authorize() {
              // Return a fake user instantly
              return {
                id: "mock-user-1",
                name: "Dev Admin",
                email: "admin@example.com",
                image: "https://github.com/shadcn.png", // Placeholder image
              };
            },
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
