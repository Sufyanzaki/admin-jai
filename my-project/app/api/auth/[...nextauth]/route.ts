import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import {z} from "zod";
import { postOtp } from "@/app/auth/_api/postOtp";


const otpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  otp: z.string().min(5, { message: "otp must be at least 5 characters" }),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Otp", type: "text" }
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = otpSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            throw new Error(JSON.stringify(parsedCredentials.error.flatten().fieldErrors));
          }

          const { email, otp } = parsedCredentials.data;
          const response = await postOtp({ email, otp });

          console.log(response);

          if(!response) return null;

          return {
            ...response.user,
            token: response.tokens.access.token,
          };
        } catch (error: any) {
          console.error('Authorization error:', error.message);
          throw new Error(error.message || "Invalid OTP");
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/otp",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      session.token = (token.user as any).token;
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