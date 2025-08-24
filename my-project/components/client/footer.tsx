"use client";

import type { ReactNode } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { Container } from "@/components/client/ux/container";
import { useMobile } from "@/hooks/use-mobile";
import { useFooterSettings } from "@/app/shared-hooks/useFooterSettings";
import {useTranslation} from "react-i18next";

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

const isFooterLink = (link: FooterLink | SocialLink): link is FooterLink =>
    "label" in link;

const isSocialLink = (link: FooterLink | SocialLink): link is SocialLink =>
    "icon" in link;

export function Footer(): JSX.Element {
  const { data, isLoading } = useFooterSettings();
  const {t} = useTranslation()
  const isMobile = useMobile();

  if (isLoading) {
    return (
        <footer className="bg-footer py-[40px] font-mon">
          <Container className="px-4 md:px-6">
            <div className="text-center text-[#4B5563]">
              {t("Loading footer...")}
            </div>
          </Container>
        </footer>
    );
  }

  if (!data) {
    return (
        <footer className="bg-footer py-[40px] font-mon">
          <Container className="px-4 md:px-6">
            <div className="text-center text-[#4B5563]">
              {t("Footer content not available")}
            </div>
          </Container>
        </footer>
    );
  }

  // Transform API data into footer sections
  const footerSections: FooterSection[] = data.sections.map((section) => {
    const pageNames = section.pageNames.split(",");
    const pagesLinks = section.pagesLinks.split(",");

    const links: FooterLink[] = pageNames.map((name, index) => ({
      label: name.trim(),
      href: pagesLinks[index]?.trim() || "#",
    }));

    return {
      title: section.sectionName,
      links,
    };
  });

  const hasSocialSection = footerSections.some(
      (section) => section.title.toLowerCase() === "social"
  );
  if (!hasSocialSection) {
    footerSections.push({
      title: t("Social"),
      links: [
        { icon: <Instagram className="h-[4svh] w-[4svh]" />, href: "#" },
        {
          icon: (
              <svg
                  className="h-[4svh] w-[4svh]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
          ),
          href: "#",
        },
        { icon: <Twitter className="h-[4svh] w-[4svh]" />, href: "#" },
        { icon: <Facebook className="h-[4svh] w-[4svh]" />, href: "#" },
      ] as SocialLink[],
    });
  }

  const mobileFooterSections = isMobile
      ? [
        ...footerSections.filter(
            (section) => section.title.toLowerCase() !== "social"
        ),
        ...footerSections.filter(
            (section) => section.title.toLowerCase() === "social"
        ),
      ]
      : footerSections;

  const links = isMobile ? mobileFooterSections : footerSections;

  return (
      <footer className="bg-footer py-[40px] font-mon">
        <Container className="px-4 md:px-6">
          <div className="border-b border-gray-200 pb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 space-y-2 md:gap-8 mb-8">
            {links.map((section: FooterSection, index: number) => {
              return (
                  <div key={index}>
                    <h3 className="font-semibold leading-[24px] text-[#111827] mb-4 text-base">
                      {t(section.title)}
                    </h3>
                    {section.title.toLowerCase() === "social" ? (
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
                                          {t(link.label)}
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
          </div>

          {data.footerDescription && (
              <div className="text-center lg:text-start text-[15px] text-[#4B5563] leading-relaxed mb-6 font-[400]">
                <p>{t(data.footerDescription)}</p>
              </div>
          )}

          <div className="pt-2">
            <div className="text-center text-sm text-[#9CA3AF] mb-4">
              {t(data.footerContent)}
            </div>
          </div>
        </Container>
      </footer>
  );
}
