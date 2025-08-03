"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBasicInfo } from "../../_hooks/useBasicInfo";
import {usePartnerExpectations} from "@/app/(dashboard)/members/_hooks/usepartnerExpectations";

interface PartnerExpectationProps {
  memberId: string | number;
}

export default function PartnerExpectation({ memberId }: PartnerExpectationProps) {
  const { expectations, expectationLoading, error } = usePartnerExpectations();

  if (expectationLoading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading partner expectation information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !expectations) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No partner expectation information available</p>
        </div>
      </CardContent>
    );
  }

  const typedBasicInfo = expectations as any;

  const data = {
    "Looking For": typedBasicInfo.lookingFor || "-",
    "Age Range": typedBasicInfo.ageRange || "-",
    "From Age": typedBasicInfo.fromAge || "-",
    "To Age": typedBasicInfo.toAge || "-",
    "Height": typedBasicInfo.height || "-",
    "Body Type": typedBasicInfo.bodyType || "-",
    "Religion": typedBasicInfo.religion || "-",
    "Education Level": typedBasicInfo.educationLevel || "-",
    "Relationship Status": typedBasicInfo.relationshipStatus || "-",
    "Children": typedBasicInfo.children ? "Yes" : "No",
    "Smoking": typedBasicInfo.smoking || "-",
    "Drinking": typedBasicInfo.drinking || "-",
    "Location": typedBasicInfo.location || "-",
    "Country": typedBasicInfo.origin || "-",
    "State": typedBasicInfo.state || "-",
    "City": typedBasicInfo.city || "-",
    "Ethnicity": typedBasicInfo.ethnicity || "-",
    "Language": typedBasicInfo.language || "-",
    "Occupation": typedBasicInfo.occupation || "-",
    "Income Level": typedBasicInfo.incomeLevel || "-",
    "Personality Traits": typedBasicInfo.personalityTraits || "-",
    "Hobbies": typedBasicInfo.hobbies || "-",
    "Values": typedBasicInfo.values || "-",
    "Life Goals": typedBasicInfo.lifeGoals || "-",
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