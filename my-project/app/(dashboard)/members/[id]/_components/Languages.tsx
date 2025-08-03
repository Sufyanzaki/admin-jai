"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguageInfoInfo } from "../../_hooks/useLanguageInfoInfo";

interface LanguagesProps {
  memberId: string | number;
}

export default function Languages({ memberId }: LanguagesProps) {
  const { languageInfo, languageInfoLoading: loading, error } = useLanguageInfoInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading language information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !languageInfo) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No language information available</p>
        </div>
      </CardContent>
    );
  }

  const typedLanguageInfo = languageInfo as any;

  const data = {
    "Mother Tongue": typedLanguageInfo.motherTongue || "-",
    "Known Languages": typedLanguageInfo.knownLanguages || "-",
    "Primary Language": typedLanguageInfo.primaryLanguage || "-",
    "Secondary Language": typedLanguageInfo.secondaryLanguage || "-",
    "Third Language": typedLanguageInfo.thirdLanguage || "-",
    "Language Proficiency": typedLanguageInfo.languageProficiency || "-",
    "English Level": typedLanguageInfo.englishLevel || "-",
    "Dutch Level": typedLanguageInfo.dutchLevel || "-",
    "German Level": typedLanguageInfo.germanLevel || "-",
    "French Level": typedLanguageInfo.frenchLevel || "-",
    "Spanish Level": typedLanguageInfo.spanishLevel || "-",
    "Arabic Level": typedLanguageInfo.arabicLevel || "-",
    "Turkish Level": typedLanguageInfo.turkishLevel || "-",
    "Urdu Level": typedLanguageInfo.urduLevel || "-",
    "Hindi Level": typedLanguageInfo.hindiLevel || "-",
    "Punjabi Level": typedLanguageInfo.punjabiLevel || "-",
    "Learning Languages": typedLanguageInfo.learningLanguages || "-",
    "Language Goals": typedLanguageInfo.languageGoals || "-",
    "Language Certificates": typedLanguageInfo.languageCertificates || "-",
    "Translation Skills": typedLanguageInfo.translationSkills || "-",
    "Interpretation Skills": typedLanguageInfo.interpretationSkills || "-",
    "Language Teaching": typedLanguageInfo.languageTeaching || "-",
    "Cultural Languages": typedLanguageInfo.culturalLanguages || "-",
    "Business Languages": typedLanguageInfo.businessLanguages || "-",
    "Technical Languages": typedLanguageInfo.technicalLanguages || "-",
  };

  const validData = Object.entries(data).filter(
    ([key, value]) => value && value !== "-" && value !== ""
  );

  return (
    <CardContent>
      <div className="space-y-3 text-sm">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            {validData.map(([key, value]) => {
              if (
                ["Short Description", "Email", "Phone"].includes(key) ||
                value === "-" ||
                value === ""
              )
                return null;

              return (
                <div key={key}>
                  <div className="grid grid-cols-2 py-1">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="text-right font-semibold text-primary">
                      {value}
                    </span>
                  </div>
                  <Separator className="my-2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CardContent>
  );
} 