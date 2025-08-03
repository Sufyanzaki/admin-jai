"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBasicInfo } from "../../_hooks/useBasicInfo";

interface BasicInformationProps {
  memberId: string | number;
}

export default function BasicInformation({ memberId }: BasicInformationProps) {
  const { user: basicInfo, userLoading: loading, error } = useBasicInfo();

  const typedBasicInfo = basicInfo as any;

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading basic information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !basicInfo) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No basic information available</p>
        </div>
      </CardContent>
    );
  }

  const data = {
    "First Name": typedBasicInfo.firstName || "-",
    "Last Name": typedBasicInfo.lastName || "-",
    "Username": typedBasicInfo.username || "-",
    "Email": typedBasicInfo.email || "-",
    "Phone": typedBasicInfo.phone || "-",
    "Date of Birth": typedBasicInfo.dob ? new Date(typedBasicInfo.dob).toLocaleDateString() : "-",
    "Gender": typedBasicInfo.gender || "-",
    "Age": typedBasicInfo.age?.toString() || "-",
    "Religion": typedBasicInfo.religion || "-",
    "Relationship Status": typedBasicInfo.relationshipStatus || "-",
    "Looking For": typedBasicInfo.lookingFor || "-",
    "Children": typedBasicInfo.children ? "Yes" : "No",
    "Department": typedBasicInfo.department || "-",
    "Location": typedBasicInfo.location || "-",
    "Origin": typedBasicInfo.origin || "-",
    "Short Description": typedBasicInfo.shortDescription || "-",
    "Is Premium": typedBasicInfo.isPremium ? "Yes" : "No",
    "Is Active": typedBasicInfo.isActive ? "Active" : "Inactive",
    "Created At": typedBasicInfo.createdAt ? new Date(typedBasicInfo.createdAt).toLocaleDateString() : "-",
    "Updated At": typedBasicInfo.updatedAt ? new Date(typedBasicInfo.updatedAt).toLocaleDateString() : "-",
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
          
          {/* Special handling for Short Description */}
          {data["Short Description"] && data["Short Description"] !== "-" && (
            <div className="mt-4">
              <div className="py-1">
                <span className="font-medium text-muted-foreground">Short Description</span>
              </div>
              <Separator className="my-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {data["Short Description"]}
              </p>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
} 