"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Label} from "@/components/admin/ui/label";
import {TabsContent} from "@/components/admin/ui/tabs";
import {Button} from "@/components/admin/ui/button";
import type {HobbiesInterestsFormValues} from "../add/_hooks/useHobbiesInterestsForm";
import useHobbiesInterestsForm from "../add/_hooks/useHobbiesInterestsForm";
import type {FieldErrors} from "react-hook-form";
import {Controller} from "react-hook-form";
import {AlertTriangle} from "lucide-react";
import {useParams} from "next/navigation";
import {getUserTrackingId} from "@/lib/access-token";
import Preloader from "@/components/shared/Preloader";
import {AttributeMultiSelect} from "@/components/admin/ui/attribute-select";
import type React from "react";

const interestMap: { id: keyof HobbiesInterestsFormValues; label: string }[] = [
  { id: "sports", label: "Sports"},
  { id: "music", label: "Music"},
  { id: "kitchen", label: "Kitchen"},
  { id: "reading", label: "Reading"},
  { id: "tvShows", label: "TV Shows"},
];

export default function HobbiesTab({ callback }: { callback: () => void}) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;


  const {
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    control,
    hobbiesInterestsLoading
  } = useHobbiesInterestsForm();

  return (
    <TabsContent value="hobbies" className="space-y-4 mt-4">
      {hobbiesInterestsLoading ? <div className="flex items-center flex-col justify-center h-64">
                            <Preloader/>
                            <p className="text-sm">Loading Hobbies and Interests</p>
                        </div> :
      <Card>
        <CardHeader>
          <CardTitle>Interests & Preferences</CardTitle>
          <CardDescription>Select your interests in different categories</CardDescription>
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
            {interestMap.map((section) => (
              <div key={section.id} className="space-y-3">
                <Label>{section.label}*</Label>
                <Controller
                  control={control}
                  name={section.id}
                  render={({ field }) => (
                      <AttributeMultiSelect
                          attributeKey={section.id}
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Select"
                      />
                  )}
                />
                {(errors as FieldErrors<HobbiesInterestsFormValues>)[section.id as keyof FieldErrors<HobbiesInterestsFormValues>] && (
                  <p className="text-sm text-red-500">{(errors as FieldErrors<HobbiesInterestsFormValues>)[section.id as keyof FieldErrors<HobbiesInterestsFormValues>]?.message}</p>
                )}
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Hobbies & Interests"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>}
    </TabsContent>
  );
} 