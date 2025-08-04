import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {z} from "zod";
import {postLoginForm} from "@/app/auth/login/_api/postLoginForm";

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const parsedCredentials = loginSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    throw new Error(JSON.stringify(parsedCredentials.error.flatten().fieldErrors));
                }

                const { email, password } = parsedCredentials.data;

                try {
                    const response = await postLoginForm({ email, password });

                    if (response) {
                        return {
                            ...response.user,
                            token: response.token,
                        };
                    }

                    return null;
                } catch (error: any) {
                    console.error('Login error:', error.message);
                    throw new Error(error.message || "Invalid login");
                }
            }
        })
    ],
    pages: {
        signIn: "/admin/auth/login",
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
            session.token = (token.user as any)?.token;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};