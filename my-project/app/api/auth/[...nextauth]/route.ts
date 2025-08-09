import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import {z} from "zod";
import {postOtp} from "@/app/shared-api/auth";

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
        otp: { label: "Otp", type: "text" }
      },
      async authorize(credentials) {
        const parsedCredentials = otpSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(JSON.stringify(parsedCredentials.error.flatten().fieldErrors));
        }

        const { email, otp } = parsedCredentials.data;
        const response = await postOtp({ email, otp });
        console.log(response);
        if(!response) return null;

        return {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          token: response.tokens.access.token,
          role: "ADMIN",
        }
      }
    }),

    CredentialsProvider({
      id: "user-login",
      name: "User Login",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Otp", type: "text" }
      },
      async authorize(credentials) {
        const parsedCredentials = otpSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(JSON.stringify(parsedCredentials.error.flatten().fieldErrors));
        }

        const { email, otp } = parsedCredentials.data;
        const response = await postOtp({ email, otp });
        console.log(response);
        if(!response) return null;

        return {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          token: response.tokens.access.token,
          role: "CLIENT",
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
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
      session.token = (token.user as { token: string }).token;
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