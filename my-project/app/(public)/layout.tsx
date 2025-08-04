"use client";
import type React from "react";
import {Header} from "@/components/client/header";
import { Footer } from "@/components/client/footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative min-h-screenn">
      <Header />
      <div className="sticky">{children}</div>
      <Footer />
    </div>
  );
}
