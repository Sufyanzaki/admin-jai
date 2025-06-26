"use client";
import { useMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon.png"
import {useTheme} from "next-themes";
export function MainNav({ onMenuClick }: { onMenuClick: () => void }) {
  const isMobile = useMobile();
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3 md:gap-10">
      {isMobile && (
        <button onClick={onMenuClick}>
          <Menu size={28} />
          <span className="sr-only">Toggle menu</span>
        </button>
      )}
      <Link href="/" className="flex items-center space-x-2">
        <Image src={theme === "dark" ? "https://ticketprijs.nl/admin/logoImages/1730182765_logo%20(1).png" : "https://ticketprijs.nl/admin/Image/AppSettings/Logo/1730289473_1730098174_1727434463_logo-alt.png"} alt="Humsafar" width={127} height={36} />
      </Link>
    </div>
  );
}
