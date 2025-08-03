"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBasicInfo } from "../../_hooks/useBasicInfo";

interface LivingProps {
  memberId: string | number;
}

export default function Living({ memberId }: LivingProps) {
  const { user: basicInfo, userLoading: loading, error } = useBasicInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading living information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !basicInfo) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No living information available</p>
        </div>
      </CardContent>
    );
  }

  const typedBasicInfo = basicInfo as any;

  const data = {
    "Country": typedBasicInfo.origin || "-",
    "State": typedBasicInfo.state || "-",
    "City": typedBasicInfo.location || "-",
    "Address": typedBasicInfo.address || "-",
    "Postal Code": typedBasicInfo.postalCode || "-",
    "Neighborhood": typedBasicInfo.neighborhood || "-",
    "Living Situation": typedBasicInfo.livingSituation || "-",
    "Housing Type": typedBasicInfo.housingType || "-",
    "Ownership": typedBasicInfo.ownership || "-",
    "Roommates": typedBasicInfo.roommates || "-",
    "Distance from City Center": typedBasicInfo.distanceFromCityCenter || "-",
    "Public Transportation": typedBasicInfo.publicTransportation || "-",
    "Parking": typedBasicInfo.parking || "-",
    "Garden": typedBasicInfo.garden || "-",
    "Balcony": typedBasicInfo.balcony || "-",
    "Pet Friendly": typedBasicInfo.petFriendly || "-",
    "Smoking Allowed": typedBasicInfo.smokingAllowed || "-",
    "Furnished": typedBasicInfo.furnished || "-",
    "Utilities Included": typedBasicInfo.utilitiesIncluded || "-",
    "Internet": typedBasicInfo.internet || "-",
    "Heating": typedBasicInfo.heating || "-",
    "Air Conditioning": typedBasicInfo.airConditioning || "-",
    "Washing Machine": typedBasicInfo.washingMachine || "-",
    "Dishwasher": typedBasicInfo.dishwasher || "-",
    "Security": typedBasicInfo.security || "-",
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