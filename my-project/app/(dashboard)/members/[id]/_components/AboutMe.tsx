"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePhysicalAppearanceInfo } from "../../_hooks/usePhysicalAppearanceInfo";
import { useBasicInfo } from "../../_hooks/useBasicInfo";

interface AboutMeProps {
  memberId: string | number;
}

export default function AboutMe({ memberId }: AboutMeProps) {
  const { physicalAppearance, physicalAppearanceLoading: loading, error } = usePhysicalAppearanceInfo();
  const { user: basicInfo } = useBasicInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading about me information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !physicalAppearance) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No about me information available</p>
        </div>
      </CardContent>
    );
  }

  const typedPhysicalAppearance = physicalAppearance as any;
  const typedBasicInfo = basicInfo as any;

  const data = {
    "Height": typedPhysicalAppearance.height || "-",
    "Weight": typedPhysicalAppearance.weight || "-",
    "Body Type": typedPhysicalAppearance.bodyType || "-",
    "Eye Color": typedPhysicalAppearance.eyeColor || "-",
    "Hair Color": typedPhysicalAppearance.hairColor || "-",
    "Hair Length": typedPhysicalAppearance.hairLength || "-",
    "Hair Style": typedPhysicalAppearance.hairStyle || "-",
    "Skin Tone": typedPhysicalAppearance.skinTone || "-",
    "Facial Features": typedPhysicalAppearance.facialFeatures || "-",
    "Build": typedPhysicalAppearance.build || "-",
    "Appearance": typedPhysicalAppearance.appearance || "-",
    "Clothing Style": typedPhysicalAppearance.clothingStyle || "-",
    "Fashion Preferences": typedPhysicalAppearance.fashionPreferences || "-",
    "Accessories": typedPhysicalAppearance.accessories || "-",
    "Tattoos": typedPhysicalAppearance.tattoos || "-",
    "Piercings": typedPhysicalAppearance.piercings || "-",
    "Glasses": typedPhysicalAppearance.glasses || "-",
    "Contact Lenses": typedPhysicalAppearance.contactLenses || "-",
    "Beard": typedPhysicalAppearance.beard || "-",
    "Mustache": typedPhysicalAppearance.mustache || "-",
    "Complexion": typedPhysicalAppearance.complexion || "-",
    "Distinguishing Features": typedPhysicalAppearance.distinguishingFeatures || "-",
    "Physical Disabilities": typedPhysicalAppearance.physicalDisabilities || "-",
    "Health Status": typedPhysicalAppearance.healthStatus || "-",
    "Fitness Level": typedPhysicalAppearance.fitnessLevel || "-",
    "Athletic Ability": typedPhysicalAppearance.athleticAbility || "-",
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
          
          {/* Special handling for Short Description from basic info */}
          {typedBasicInfo?.shortDescription && typedBasicInfo.shortDescription !== "-" && (
            <div className="mt-4">
              <div className="py-1">
                <span className="font-medium text-muted-foreground">Short Description</span>
              </div>
              <Separator className="my-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {typedBasicInfo.shortDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
} 