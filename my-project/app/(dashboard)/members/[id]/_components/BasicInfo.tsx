"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Calendar, Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBasicInfo } from "../../_hooks/useBasicInfo";

export default function BasicInfo() {
  const { user: basicInfo, userLoading: loading, error } = useBasicInfo();

  if (loading) {
    return (
      <Card className="md:col-span-1 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center p-6 space-y-4">
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">Loading...</CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (error || !basicInfo) {
    return (
      <Card className="md:col-span-1 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center text-center p-6 space-y-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">No data available</CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const typedBasicInfo = basicInfo as any;

  const getExperienceYears = () => {
    if (!typedBasicInfo.createdAt) return "N/A";
    const createdDate = new Date(typedBasicInfo.createdAt);
    const currentDate = new Date();
    const years = currentDate.getFullYear() - createdDate.getFullYear();
    return `${years} years experience`;
  };

  const getInitials = () => {
    const firstName = typedBasicInfo.firstName || "";
    const lastName = typedBasicInfo.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="md:col-span-1 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-col items-center text-center p-6 space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-md">
            <AvatarImage src={typedBasicInfo.image || "/user-2.png"} alt={`${typedBasicInfo.firstName} ${typedBasicInfo.lastName}`} />
            <AvatarFallback className="text-lg font-semibold">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            {typedBasicInfo.firstName} {typedBasicInfo.lastName}
          </CardTitle>
          <Badge
            variant="default"
            className={`py-0.5 font-normal text-xs rounded-md ${
              typedBasicInfo.isActive 
                ? "bg-green-600 text-white" 
                : "bg-red-600 text-white"
            }`}
          >
            {typedBasicInfo.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground px-6 pb-6">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{typedBasicInfo.email || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{typedBasicInfo.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>
            {typedBasicInfo.location || "N/A"}
            {typedBasicInfo.origin && `, ${typedBasicInfo.origin}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            Joined {typedBasicInfo.createdAt 
              ? new Date(typedBasicInfo.createdAt).toLocaleDateString() 
              : "N/A"
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{getExperienceYears()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4" />
          <span>{typedBasicInfo.department || "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  );
}