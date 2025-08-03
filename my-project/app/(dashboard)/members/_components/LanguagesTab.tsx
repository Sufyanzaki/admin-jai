"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MultiSelectCombobox } from "@/components/ui/combo-box";
import { Button } from "@/components/ui/button";
import useLanguageInfoForm from "../add/_hooks/useLanguageInfoForm";
import type { LanguageInfoFormValues } from "../add/_hooks/useLanguageInfoForm";
import type { FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import { AlertTriangle } from "lucide-react";
import Preloader from "@/components/ui/Preloader";

export default function LanguagesTab({ callback }: { callback: () => void}) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    languageInfoLoading
  } = useLanguageInfoForm();

  const languageOptions = [
    "Engels", "Nederlands", "Duits", "Frans", "Spaans", "Italiaans", "Portugees", "Russisch", "Chinees", "Japans", "Arabisch", "Hindi", "Urdu", "Turks", "Grieks", "Pools", "Zweeds", "Noors", "Fins", "Deens"
  ];
  const motherTongueOptions = [
    "Hindostaans", "Nederlands", "Engels", "Duits", "Frans", "Spaans", "Italiaans", "Portugees", "Russisch", "Chinees", "Japans", "Arabisch", "Hindi", "Urdu", "Turks"
  ];

  return (
    <TabsContent value="languages" className="space-y-4 mt-4">
      {languageInfoLoading ? <div className="flex items-center flex-col justify-center h-64">
                            <Preloader/>
                            <p className="text-sm">Loading Languages</p>
                        </div> :
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Select your interests in different languages</CardDescription>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mother-tongue" className="text-base font-medium">
                  Mother Tongue *
                </Label>
                <Controller
                  control={control}
                  name="motherTongue"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                      <SelectTrigger id="mother-tongue" className="w-full">
                        <SelectValue placeholder="Select your mother tongue" />
                      </SelectTrigger>
                      <SelectContent>
                        {motherTongueOptions.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {(errors as FieldErrors<LanguageInfoFormValues>)["motherTongue"] && (
                  <p className="text-sm text-red-500">{(errors as FieldErrors<LanguageInfoFormValues>)["motherTongue"]?.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="known-languages" className="text-base font-medium">
                  Known Languages *
                </Label>
                <Controller
                  control={control}
                  name="knownLanguages"
                  render={({ field }) => (
                    <MultiSelectCombobox
                      options={languageOptions.filter((lang) => lang !== field.value)}
                      selected={field.value ? field.value.split(", ") : []}
                      onChange={(selected) => field.onChange(selected.join(", "))}
                    />
                  )}
                />
                {(errors as FieldErrors<LanguageInfoFormValues>)["knownLanguages"] && (
                  <p className="text-sm text-red-500">{(errors as FieldErrors<LanguageInfoFormValues>)["knownLanguages"]?.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Languages"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>}
    </TabsContent>
  );
} 