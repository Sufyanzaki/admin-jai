"use client";

import type {ReactNode} from "react";
import {Button} from "@/components/client/ux/button";
import {Facebook, Heart, Instagram, Twitter} from "lucide-react";
import type {JSX} from "react/jsx-runtime"; // Import JSX to fix the undeclared variable error
import {Container} from "@/components/client/ux/container";
import {useMobile} from "@/hooks/use-mobile";

// Type definitions
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ReactNode;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[] | SocialLink[];
}

interface BottomLink {
  label: string;
  href: string;
}

// Footer sections data
const footerLinks: FooterSection[] = [
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Consumer Health Data", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Intellectual Property", href: "#" },
    ] as FooterLink[],
  },
  {
    title: "Careers",
    links: [
      { label: "Careers portal", href: "#" },
      { label: "Tech Blog", href: "#" },
    ] as FooterLink[],
  },
  {
    title: "Social",
    links: [
      {
        icon: <Instagram className="h-5 w-5" />,
        href: "#",
      },
      {
        icon: (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        ),
        href: "#",
      },
      { icon: <Twitter className="h-5 w-5" />, href: "#" },
      { icon: <Facebook className="h-5 w-5" />, href: "#" },
    ] as SocialLink[],
  },
  {
    title: "FAQ",
    links: [
      { label: "Destinations", href: "#" },
      { label: "Press room", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Promo code", href: "#" },
    ] as FooterLink[],
  },
];

//this has socials at last
const mobileFooterLinks: FooterSection[] = [
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Consumer Health Data", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Intellectual Property", href: "#" },
    ] as FooterLink[],
  },
  {
    title: "Careers",
    links: [
      { label: "Careers portal", href: "#" },
      { label: "Tech Blog", href: "#" },
    ] as FooterLink[],
  },
  {
    title: "FAQ",
    links: [
      { label: "Destinations", href: "#" },
      { label: "Press room", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Promo code", href: "#" },
    ] as FooterLink[],
  },
  {
    title: "Social",
    links: [
      {
        icon: <Instagram className="h-5 w-5" />,
        href: "#",
      },
      {
        icon: (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        ),
        href: "#",
      },
      { icon: <Twitter className="h-5 w-5" />, href: "#" },
      { icon: <Facebook className="h-5 w-5" />, href: "#" },
    ] as SocialLink[],
  },
];

// Bottom section links
const bottomLinks: BottomLink[] = [
  { label: "Safety tips", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Privacy settings", href: "#" },
];

// Type guard functions
const isFooterLink = (link: FooterLink | SocialLink): link is FooterLink => {
  return "label" in link;
};

const isSocialLink = (link: FooterLink | SocialLink): link is SocialLink => {
  return "icon" in link;
};

export function Footer(): JSX.Element {
  const isMobile = useMobile();

  const links = isMobile ? mobileFooterLinks : footerLinks;
  return (
    <>
      <footer className="bg-footer py-[40px] font-mon">
        <Container className="px-4 md:px-6">
          <div className="border-b border-gray-200 pb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 space-y-2 md:gap-8 mb-8">
            {links.map((section: FooterSection, index: number) => {
              return (
                <div key={index}>
                  <h3 className="font-semibold leading-[24px] text-[#111827] mb-4 text-base">
                    {section.title}
                  </h3>
                  {section.title === "Social" ? (
                    <div className="flex flex-col justify-between h-full space-x-3">
                      <div className="flex flex-row gap-3">
                        {section.links.map(
                          (link: FooterLink | SocialLink, idx: number) => {
                            if (isSocialLink(link)) {
                              return (
                                <a
                                  key={idx}
                                  href={link.href}
                                  className="text-app-gray hover:text-[#374151] font-[400] text-sm"
                                >
                                  {link.icon}
                                </a>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                      {isMobile && (
                        <div className="mb-12 mr-16">
                          <Button size={"sm"} className="w-fit text-[11px]">
                            <Heart fill="white" className="w-[10px] h-[10px]" /> Start Swiping Now
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <ul className="space-y-3 text-sm text-[#374151]">
                      {section.links.map(
                        (link: FooterLink | SocialLink, idx: number) => {
                          if (isFooterLink(link)) {
                            return (
                              <li key={idx}>
                                <a
                                  href={link.href}
                                  className="hover:text-gray-900"
                                >
                                  {link.label}
                                </a>
                              </li>
                            );
                          }
                          return null;
                        }
                      )}
                    </ul>
                  )}
                </div>
              );
            })}

            <div className="hidden lg:flex justify-end">
              <Button className="w-[230px]">
                <Heart fill="white" /> Start Swiping Now
              </Button>
            </div>
          </div>

          <div className="text-center lg:text-start text-[15px] text-[#4B5563] leading-relaxed mb-6 font-[400]">
            <p>
              All you singles, listen up! If you&apos;re looking to fall in
              love, want to start dating, ready to start a relationship, or want
              to keep it casual, you need to be on Humsafar. With over 55
              billion matches made, it&apos;s the best place to find your next
              best match. You&apos;ve probably noticed, the dating landscape
              looks very different today, with most of us choosing to meet
              people online. With humsafar, the world&apos;s most popular free
              dating app, you have millions of other singles at your fingertips,
              and they&apos;re all ready to meet someone like you. Whether
              you&apos;re straight or a part of the experience, Humsafar got you
              covered. The right swipe gets flying.
            </p>
            <p className="mt-[1px]">
              There really is something for everyone on Humsafar. Looking for a
              relationship? You&apos;ve got it. Want to make friends online? Say
              no more. Just started uni and want to make the most of your
              experience? Humsafar got you covered. Humsafar isn&apos;t your
              average dating site - it&apos;s the most diverse dating app, where
              adults of all backgrounds and experiences are invited to make
              connections, memories and everything in between.
            </p>
          </div>

          <div className="pt-2">
            <div className="flex flex-wrap justify-center gap-3 text-xs text-[#6B7280] mb-4">
              {bottomLinks.map((link: BottomLink, index: number) => (
                <span key={index} className="flex items-center gap-2">
                  <a href={link.href} className="hover:text-gray-700">
                    {link.label}
                  </a>
                  {index < bottomLinks.length - 1 && <span>|</span>}
                </span>
              ))}
            </div>
            <div className="text-center text-sm text-[#9CA3AF] mb-4">
              © 2025 Humsafar L.L.C. All Rights Reserved
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
