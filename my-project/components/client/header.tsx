"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/client/ux/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ImageWrapper from "@/components/client/image-wrapper";
import { Container } from "@/components/client/ux/container";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/client/ux/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SidebarList } from "@/components/client/sidebar-list";

const navLinks = [
  { label: "Hoe werkt niet", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "register", href: "/auth/profile/create" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {pathname === "/" ? (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "backdrop-blur-lg bg-black/30 py-6 shadow-sm" : "py-8"
          }`}
        >
          <Container className="px-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="text-white text-xl">
                <ImageWrapper
                  width={230}
                  height={230}
                  src="https://ticketprijs.nl/admin/logoImages/1730182765_logo (1).png"
                  alt="Logo"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="flex flex-row items-center space-x-10">
                <Link href={"/app/client/auth/login"}>
                  <button className="hidden md:flex text-xl text-white hover:text-app-pink transition-colors">
                    Inloggen
                  </button>
                </Link>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <ImageWrapper
                        src={"/assets/Menu.png"}
                        className="h-6 w-8"
                        alt="Menu"
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full p-0">
                    <VisuallyHidden>
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                    </VisuallyHidden>
                    <SidebarList />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </Container>
        </header>
      ) : (
        <header
          className={`fixed top-0 left-0 right-0  bg-white z-50 transition-all duration-300 ${
            scrolled ? "backdrop-blur-lg bg-white/30 py-6 shadow-sm" : "py-7"
          }`}
        >
          <Container className="px-4 md:px-6">
            <div className="w-full flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="hidden lg:block">
                <ImageWrapper
                  src={"/logo-black.png"}
                  alt="logo"
                  width={177}
                  height={20}
                />
              </Link>
              <Link href="/" className="block lg:hidden">
                <ImageWrapper
                  src={"/logo-black.png"}
                  alt="logo"
                  width={152}
                  height={24}
                />
              </Link>

              {/* Navigation Menu */}
              <nav className="hidden lg:flex items-center space-x-5 ">
                {navLinks.map(({ label, href }) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={label}
                      href={href}
                      className={`capitalize relative text-md font-bold text-black hover:text-app-pink transition-colors pb-1
          ${isActive ? "after:scale-100" : "after:scale-0"}
          after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-app-pink after:transition-transform after:duration-300 after:origin-left
        `}
                    >
                      {label.toUpperCase()}
                    </Link>
                  );
                })}
                {/* Login Button */}
                <Link href="/client/auth/login">
                  <Button variant={"theme"} className="py-5 mb-2 rounded-lg">
                    LOGIN
                  </Button>{" "}
                </Link>
              </nav>

              {/* Mobile Menu Button (hidden in this design but good to have) */}
              <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-black">
                      <ImageWrapper
                        src={"/assets/Menu.svg"}
                        className="h-6 w-8 "
                        alt="Menu"
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full p-0">
                    <VisuallyHidden>
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                    </VisuallyHidden>
                    <SidebarList />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </Container>
        </header>
      )}
    </>
  );
}
