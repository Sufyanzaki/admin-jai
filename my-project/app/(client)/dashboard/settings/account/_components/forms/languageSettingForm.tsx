import {Label} from "@/components/client/ux/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import Image from "next/image";
import {Button} from "@/components/client/ux/button";
import {useState} from "react";

const languages = [
    { value: "english", label: "English", code: "gb" },
    { value: "dutch", label: "Dutch", code: "nl" },
    { value: "german", label: "German", code: "de" },
    { value: "french", label: "French", code: "fr" },
    { value: "spanish", label: "Spanish", code: "es" },
    { value: "italian", label: "Italian", code: "it" },
];


export default function LanguageSettingForm(){

    const [selectedLanguage, setSelectedLanguage] = useState("english");

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
                            {languages.map((language) => (
                                <SelectItem key={language.value} value={language.value}>
                                    <Image
                                        src={`https://flagcdn.com/${language.code}.svg`}
                                        width={28}
                                        height={28}
                                        className="rounded-[2px]"
                                        alt={language.code}
                                    />
                                    {language.label}
                                </SelectItem>
                            ))}
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