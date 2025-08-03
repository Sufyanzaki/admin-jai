"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLifeStyleInfo } from "../../_hooks/useLifeStyleInfo";

interface LifeStyleProps {
  memberId: string | number;
}

export default function LifeStyle({ memberId }: LifeStyleProps) {
  const { lifeStyle, lifeStyleLoading: loading, error } = useLifeStyleInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading lifestyle information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !lifeStyle) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No lifestyle information available</p>
        </div>
      </CardContent>
    );
  }

  const typedLifeStyle = lifeStyle as any;

  const data = {
    "Smoking": typedLifeStyle.smoking || "-",
    "Drinking": typedLifeStyle.drinking || "-",
    "Going Out": typedLifeStyle.goingOut || "-",
    "Exercise": typedLifeStyle.exercise || "-",
    "Diet": typedLifeStyle.diet || "-",
    "Sleep Schedule": typedLifeStyle.sleepSchedule || "-",
    "Work Schedule": typedLifeStyle.workSchedule || "-",
    "Social Life": typedLifeStyle.socialLife || "-",
    "Travel Frequency": typedLifeStyle.travelFrequency || "-",
    "Housing": typedLifeStyle.housing || "-",
    "Transportation": typedLifeStyle.transportation || "-",
    "Financial Habits": typedLifeStyle.financialHabits || "-",
    "Technology Usage": typedLifeStyle.technologyUsage || "-",
    "Reading Habits": typedLifeStyle.readingHabits || "-",
    "Music Preferences": typedLifeStyle.musicPreferences || "-",
    "Movie Preferences": typedLifeStyle.moviePreferences || "-",
    "Cooking": typedLifeStyle.cooking || "-",
    "Cleaning": typedLifeStyle.cleaning || "-",
    "Pet Ownership": typedLifeStyle.petOwnership || "-",
    "Gardening": typedLifeStyle.gardening || "-",
    "Outdoor Activities": typedLifeStyle.outdoorActivities || "-",
    "Indoor Activities": typedLifeStyle.indoorActivities || "-",
    "Weekend Activities": typedLifeStyle.weekendActivities || "-",
    "Vacation Preferences": typedLifeStyle.vacationPreferences || "-",
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