"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useHobbiesInterestsInfo } from "../../_hooks/useHobbiesInterestsInfo";

interface HobbiesAndInterestProps {
  memberId: string | number;
}

export default function HobbiesAndInterest({ memberId }: HobbiesAndInterestProps) {
  const { hobbiesInterests, hobbiesInterestsLoading: loading, error } = useHobbiesInterestsInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading hobbies & interests information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !hobbiesInterests) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No hobbies & interests information available</p>
        </div>
      </CardContent>
    );
  }

  const typedHobbiesInterests = hobbiesInterests as any;

  const data = {
    "Sports": typedHobbiesInterests.sports || "-",
    "Music": typedHobbiesInterests.music || "-",
    "Movies": typedHobbiesInterests.movies || "-",
    "TV Shows": typedHobbiesInterests.tvShows || "-",
    "Books": typedHobbiesInterests.books || "-",
    "Reading": typedHobbiesInterests.reading || "-",
    "Cooking": typedHobbiesInterests.cooking || "-",
    "Kitchen": typedHobbiesInterests.kitchen || "-",
    "Travel": typedHobbiesInterests.travel || "-",
    "Photography": typedHobbiesInterests.photography || "-",
    "Art": typedHobbiesInterests.art || "-",
    "Dancing": typedHobbiesInterests.dancing || "-",
    "Singing": typedHobbiesInterests.singing || "-",
    "Gaming": typedHobbiesInterests.gaming || "-",
    "Technology": typedHobbiesInterests.technology || "-",
    "Fitness": typedHobbiesInterests.fitness || "-",
    "Yoga": typedHobbiesInterests.yoga || "-",
    "Meditation": typedHobbiesInterests.meditation || "-",
    "Gardening": typedHobbiesInterests.gardening || "-",
    "Pets": typedHobbiesInterests.pets || "-",
    "Volunteering": typedHobbiesInterests.volunteering || "-",
    "Social Causes": typedHobbiesInterests.socialCauses || "-",
    "Collecting": typedHobbiesInterests.collecting || "-",
    "DIY Projects": typedHobbiesInterests.diyProjects || "-",
    "Outdoor Activities": typedHobbiesInterests.outdoorActivities || "-",
    "Indoor Activities": typedHobbiesInterests.indoorActivities || "-",
    "Creative Hobbies": typedHobbiesInterests.creativeHobbies || "-",
    "Intellectual Hobbies": typedHobbiesInterests.intellectualHobbies || "-",
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