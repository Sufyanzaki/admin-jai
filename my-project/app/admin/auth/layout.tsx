"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAdmin = session?.user?.role !== "ADMIN";

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [status, isAdmin, router]);

  if (status === "loading") {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="h-16 w-16 border-b-2 border-white rounded-full animate-spin" />
        </div>
    );
  }

  if (status === "authenticated" && isAdmin) {
    return null;
  }

  return <div className="min-h-screen bg-gray-950">{children}</div>;
}
