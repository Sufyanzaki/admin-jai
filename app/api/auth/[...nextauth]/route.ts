import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import {z} from "zod";
import {postLoginForm} from "@/app/auth/_api/postLoginForm";


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
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const response = await postLoginForm({
            email,
            password,
          });


          if (response) {
            console.log('Login success:', response);
            return {
              id: response.user?.id || "1",
              name: response.user?.name || "Admin User",
              email: response.user?.email || email,
              role: response.user?.role || "admin",
              token: response.token || "",
              phone: response.user?.phone,
              location: response.user?.location,
            };
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Basic authentication fields
        token.token = user.token;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        
        // Profile fields from login response
        token.phone = user.phone;
        token.location = user.location;
        
        // Set default values for profile fields that might not be in login response
        token.id = user.id;
        token.username = user.username || "";
        token.firstName = user.firstName || "";
        token.lastName = user.lastName || "";
        token.dob = user.dob || "";
        token.isActive = user.isActive || true;
        token.image = user.image || "";
        token.department = user.department || "";
        token.origin = user.origin || "";
        token.gender = user.gender || "";
        token.age = user.age || 0;
        token.relationshipStatus = user.relationshipStatus || "";
        token.children = user.children || false;
        token.religion = user.religion || "";
        token.shortDescription = user.shortDescription || "";
        token.createdAt = user.createdAt || "";
        token.updatedAt = user.updatedAt || "";
      }
      return token;
    },
    async session({ session, token }) {
      // Preserve all profile keys from useProfile updates
      // Only set basic fields from token if they don't exist in session
      // This ensures fresh profile data is not overridden by token data
      
      // Basic authentication fields (fallbacks from login)
      if (!session.user.role) {
        session.user.role = token.role as string;
      }
      if (!session.token) {
        session.token = token.token as string;
      }
      if (!session.user.name) {
        session.user.name = token.name as string;
      }
      if (!session.user.email) {
        session.user.email = token.email as string;
      }
      
      if (!session.user.phone) {
        session.user.phone = token.phone as string;
      }
      if (!session.user.location) {
        session.user.location = token.location as string;
      }
      
      // Ensure all profile fields exist with fallback values if not set by useProfile
      if (!session.user.id) {
        session.user.id = token.id as string | number;
      }
      if (!session.user.username) {
        session.user.username = token.username as string;
      }
      if (!session.user.firstName) {
        session.user.firstName = token.firstName as string;
      }
      if (!session.user.lastName) {
        session.user.lastName = token.lastName as string;
      }
      if (!session.user.dob) {
        session.user.dob = token.dob as string;
      }
      if (!session.user.isActive) {
        session.user.isActive = token.isActive as boolean;
      }
      if (!session.user.image) {
        session.user.image = token.image as string;
      }
      if (!session.user.department) {
        session.user.department = token.department as string;
      }
      if (!session.user.origin) {
        session.user.origin = token.origin as string;
      }
      if (!session.user.gender) {
        session.user.gender = token.gender as string;
      }
      if (!session.user.age) {
        session.user.age = token.age as number;
      }
      if (!session.user.relationshipStatus) {
        session.user.relationshipStatus = token.relationshipStatus as string;
      }
      if (!session.user.children) {
        session.user.children = token.children as boolean;
      }
      if (!session.user.religion) {
        session.user.religion = token.religion as string;
      }
      if (!session.user.shortDescription) {
        session.user.shortDescription = token.shortDescription as string;
      }
      if (!session.user.createdAt) {
        session.user.createdAt = token.createdAt as string;
      }
      if (!session.user.updatedAt) {
        session.user.updatedAt = token.updatedAt as string;
      }
      
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