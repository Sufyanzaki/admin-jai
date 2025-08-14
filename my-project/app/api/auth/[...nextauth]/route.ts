import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth/next";
import { z } from "zod";
import { postOtp } from "@/app/shared-api/auth";

const otpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  otp: z.string().min(5, { message: "otp must be at least 5 characters" }),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-otp",
      name: "Admin OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Otp", type: "text" },
      },
      async authorize(credentials) {
        const parsedCredentials = otpSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(
              JSON.stringify(parsedCredentials.error.flatten().fieldErrors)
          );
        }

        const { email, otp } = parsedCredentials.data;
        const response = await postOtp({ email, otp });
        if (!response) return null;

        return {
          username: response.user.username,
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          token: response.tokens.access.token,
          role: "ADMIN",
        };
      },
    }),

    // User OTP
    CredentialsProvider({
      id: "user-login",
      name: "User Login",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Otp", type: "text" },
      },
      async authorize(credentials) {
        const parsedCredentials = otpSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(
              JSON.stringify(parsedCredentials.error.flatten().fieldErrors)
          );
        }

        const { email, otp } = parsedCredentials.data;
        const response = await postOtp({ email, otp });
        if (!response) return null;

        return {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          token: response.tokens.access.token,
          role: "CLIENT",
          route: response.user.route,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        if (account?.provider === "google" || account?.provider === "facebook") {
          console.log(profile)
          // token.user = {
          //   id: profile?.sub || profile?.id,
          //   username: profile?.name,
          //   email: profile?.email,
          //   firstName: profile?.given_name || "",
          //   lastName: profile?.family_name || "",
          //   role: "CLIENT",
          //   provider: account.provider,
          // };
        } else {
          token.user = user;
        }
      }

      if (trigger === "update" && session) {
        token.user = {
          ...(token.user as Record<string, unknown>),
          ...session.user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      session.token = (token.user as { token?: string }).token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
