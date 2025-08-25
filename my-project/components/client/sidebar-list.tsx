"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import Image from "next/image";
import { useLanguages } from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export function SidebarList() {
  const { i18n } = useTranslation();
  const { languages, languagesLoading } = useLanguages();

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Sync with i18n.language once languages are loaded
  useEffect(() => {
    if (languages?.length) {
      const current = languages.find((lang) => lang.code === i18n.language);
      setSelectedLanguage(current?.code ?? languages[0].code);
    }
  }, [languages, i18n.language]);

  return (
    <div className="h-full flex px-8">
      <div className="w-full py-8 bg-white relative">
        <nav className="mt-12">
          <ul className="space-y-6">
            {[
              ["HOME", "/"],
              ["CONCEPT", "/how-it-works"],
              ["NEWS", "/blog"],
              ["CONTACT", "/contact"],
              ["Terms and Services", "/privacy-policy"],
            ].map(([label, link]) => (
              <li key={label}>
                <Link
                  href={link}
                  className="text-lg font-medium text-black hover:text-app-pink transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}

            <div className="relative">
              <Select
                value={selectedLanguage}
                onValueChange={(value) => {
                  setSelectedLanguage(value);
                  i18n.changeLanguage(value); // update i18n as well
                }}
              >
                <SelectTrigger className="bg-white border-app-border text-black h-12 text-sm rounded-[5px] hover:bg-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languagesLoading ? (
                    <>Loading...</>
                  ) : (
                    languages?.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
