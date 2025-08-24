'use client'
import { Label } from "@/components/client/ux/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import Image from "next/image";
import { Button } from "@/components/client/ux/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguages } from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";

const languages = [
    { value: "english", label: "English", code: "gb" },
    { value: "dutch", label: "Dutch", code: "nl" },
    { value: "german", label: "German", code: "de" },
    { value: "french", label: "French", code: "fr" },
    { value: "spanish", label: "Spanish", code: "es" },
    { value: "italian", label: "Italian", code: "it" },
];


export default function LanguageSettingForm() {
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
        <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-end gap-4">
            <div className="space-y-4 w-full sm:w-1/2 lg:w-2/5">
                <div>
                    <Label htmlFor="language" className="">
                        Select Language
                    </Label>
                    <Select
                        value={selectedLanguage}
                        onValueChange={setSelectedLanguage}
                    >
                        <SelectTrigger className="mt-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {languagesLoading ? (
                                <>Loading...</>
                            ) : (
                                languages?.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        <Image
                                            src={`https://flagcdn.com/${lang.code}.svg`}
                                            width="20"
                                            height="20"
                                            alt={lang.name}
                                            className="mr-2 inline-block"
                                        />
                                        {lang.name}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button variant="theme" size="lg">
                Save
            </Button>
        </div>
    )
}