"use client";
import {useMobile} from "@/hooks/use-mobile";
import {Menu} from "lucide-react";

export function MainNav({ onMenuClick }: { onMenuClick: () => void }) {
  const isMobile = useMobile();

  return (
    <div className="flex items-center gap-3 md:gap-10">
      {isMobile && (
        <button onClick={onMenuClick}>
          <Menu size={28} />
          <span className="sr-only">Toggle menu</span>
        </button>
      )}
    </div>
  );
}
