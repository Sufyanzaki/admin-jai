"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import usePartnerExpectationForm from "../add/_hooks/usePartnerExpectationForm";
import { Controller } from "react-hook-form";
import React from "react";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import { AlertTriangle } from "lucide-react";
import LocationSearchInput, { LocationData } from "@/components/location-search";
import Preloader from "@/components/ui/Preloader";

export default function PartnerTab({ callback }: { callback: () => void }) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    setValue,
    control,
    onSubmit,
    watch,
      expectationLoading
  } = usePartnerExpectationForm();

  const handleLocationSelect = (location: LocationData) => {
    setValue("city", location.city);
    setValue("state", location.state);
    setValue("country", location.country);
  };

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation = city || state || country ? { city, state, country } : null;

  if(expectationLoading){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading Expectations</p>
        </div>
    )
  }

  return (
    <TabsContent value="partner" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Complete your partner expectations.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
          {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-amber-700 text-sm">
                  You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member
                </div>
            </div>
          </div>}
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Origin" {...register("origin")} />
                  {errors.origin && <p className="text-sm text-red-500">{errors.origin.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input id="length" placeholder="Length" {...register("length")} />
                  {errors.length && <p className="text-sm text-red-500">{errors.length.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationshipStatus">Relation Status</Label>
                  <Input id="relationshipStatus" placeholder="Relation Status" {...register("relationshipStatus")} />
                  {errors.relationshipStatus && <p className="text-sm text-red-500">{errors.relationshipStatus.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input id="weight" placeholder="Weight" {...register("weight")} />
                  {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drinking">Drinking</Label>
                  <Controller
                    control={control}
                    name="drinking"
                    render={({ field }) => (
                      <Select value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true") } key={field.value}>
                        <SelectTrigger id="drinking">
                          <SelectValue placeholder="Nee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Nee</SelectItem>
                          <SelectItem value="true">Ja</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.drinking && <p className="text-sm text-red-500">{errors.drinking.message}</p>}
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lookingFor">Looking For</Label>
                  <Input id="lookingFor" placeholder="Looking For" {...register("lookingFor")} />
                  {errors.lookingFor && <p className="text-sm text-red-500">{errors.lookingFor.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Input id="religion" placeholder="Religion" {...register("religion")} />
                  {errors.religion && <p className="text-sm text-red-500">{errors.religion.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" placeholder="Education" {...register("education")} />
                  {errors.education && <p className="text-sm text-red-500">{errors.education.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smoke">Smoke</Label>
                  <Controller
                    control={control}
                    name="smoke"
                    render={({ field }) => (
                      <Select value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true") } key={field.value}>
                        <SelectTrigger id="smoke">
                          <SelectValue placeholder="Nee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Nee</SelectItem>
                          <SelectItem value="true">Ja</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.smoke && <p className="text-sm text-red-500">{errors.smoke.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goingOut">Going Out</Label>
                  <Controller
                    control={control}
                    name="goingOut"
                    render={({ field }) => (
                      <Select value={field.value ? "true" : "false"} onValueChange={v => field.onChange(v === "true") } key={field.value}>
                        <SelectTrigger id="goingOut">
                          <SelectValue placeholder="Nee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Nee</SelectItem>
                          <SelectItem value="true">Ja</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.goingOut && <p className="text-sm text-red-500">{errors.goingOut.message}</p>}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Age Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageFrom">From Age</Label>
                  <Input id="ageFrom" type="number" placeholder="20" {...register("ageFrom")} />
                  {errors.ageFrom && <p className="text-sm text-red-500">{errors.ageFrom.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ageTo">To Age</Label>
                  <Input id="ageTo" type="number" placeholder="35" {...register("ageTo")} />
                  {errors.ageTo && <p className="text-sm text-red-500">{errors.ageTo.message}</p>}
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Location</h3>
              <LocationSearchInput
                  value={currentLocation}
                  onSelect={handleLocationSelect}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Partner Expectations"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </TabsContent>
  );
} 