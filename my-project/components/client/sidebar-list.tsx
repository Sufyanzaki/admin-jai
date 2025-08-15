"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import Image from "next/image";

export function SidebarList() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

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
                <a
                  href={link}
                  className="text-lg font-medium text-black hover:text-app-pink transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}

            <div className="relative">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="bg-white border-app-border text-black h-12 text-sm rounded-[5px] hover:bg-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nl">
                    {" "}
                    <Image
                      src="https://flagcdn.com/nl.svg"
                      width="30"
                      height="30"
                      alt="dutch"
                    />
                    Dutch
                  </SelectItem>
                  <SelectItem value="en">
                    <Image
                      src="https://flagcdn.com/gb.svg"
                      width="30"
                      height="30"
                      alt="english"
                      className=""
                    />
                    English
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
