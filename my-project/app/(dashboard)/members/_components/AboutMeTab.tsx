"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MultiSelectCombobox } from "@/components/ui/combo-box";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import usePhysicalAppearanceForm from "../add/_hooks/usePhysicalAppearanceForm";
import type { PhysicalAppearanceFormValues } from "../add/_hooks/usePhysicalAppearanceForm";
import type { FieldErrors } from "react-hook-form";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import { AlertTriangle } from "lucide-react";
import Preloader from "@/components/ui/Preloader";

export default function AboutMeTab() {

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
    physicalAppearanceLoading
  } = usePhysicalAppearanceForm();

  const lengthOptions = [
    "1.50", "1.55", "1.60", "1.65", "1.70", "1.75", "1.80", "1.85", "1.90", "1.95", "2.00", "2.05", "2.10", "5'10\""
  ];
  const eyeColorOptions = ["Groen", "Blauw", "Bruin", "Grijs", "Hazelnoot", "Amber", "Zwart", "Brown"];
  const hairColorOptions = ["Grijs", "Blond", "Bruin", "Zwart", "Rood", "Auburn", "Zilver", "Wit", "Kaal", "Black"];
  const bodyTypeOptions = ["Tenger", "Slank", "Atletisch", "Gemiddeld", "Mollig", "Groot", "Gespierd", "Athletic"];
  const appearanceOptions = ["Sprankelend", "Aantrekkelijk", "Gemiddeld", "Knap", "Mooi", "Charmant", "Elegant", "Attractive"];
  const clothingStyleOptions = [
    "Casual", "Formeel", "Sportief", "Trendy", "Klassiek", "Bohemian", "Vintage", "Minimalistisch"
  ];
  const intelligenceOptions = [
    "Geen prioriteit", "Zeer belangrijk", "Belangrijk", "Gemiddeld belangrijk", "Niet belangrijk", "High"
  ];
  const languageOptions = [
    "Engels", "Nederlands", "Duits", "Frans", "Spaans", "Italiaans", "Portugees", "Russisch", "Chinees", "Japans", "Arabisch", "Hindi", "Urdu", "Turks", "Grieks", "Pools", "Zweeds", "Noors", "Fins", "Deens", "Fluent English"
  ];

  return (
    <TabsContent value="about_me" className="space-y-4 mt-4">
      {physicalAppearanceLoading ? <div className="flex items-center flex-col justify-center h-64">
                            <Preloader/>
                            <p className="text-sm">Loading Appearence</p>
                        </div> : 
      <Card>
        <CardHeader className="">
          <CardTitle>Physical Characteristics</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Tell us about your physical attributes and preferences
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((values) => onSubmit({
          ...values,
          height: values.height,
          eyeColor: values.eyeColor,
          hairColor: values.hairColor,
          bodyType: values.bodyType,
          weight: values.weight,
          appearance: values.appearance,
          clothing: values.clothing,
          intelligence: values.intelligence,
          language: values.language,
        }))}>
          {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-amber-700 text-sm">
                  You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member
                </div>
            </div>
          </div>}
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-base font-medium">
                    Length *
                  </Label>
                  <Controller
                    control={control}
                    name="height"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="length">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {lengthOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["height"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["height"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hair-color" className="text-base font-medium">
                    Hair Color *
                  </Label>
                  <Controller
                    control={control}
                    name="hairColor"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="hair-color">
                          <SelectValue placeholder="Select hair color" />
                        </SelectTrigger>
                        <SelectContent>
                          {hairColorOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["hairColor"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["hairColor"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base font-medium">
                    Weight *
                  </Label>
                  <Controller
                    control={control}
                    name="weight"
                    render={({ field }) => (
                      <Input
                        id="weight"
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter weight"
                      />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["weight"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["weight"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clothing-styles" className="text-base font-medium">
                    Clothing Styles *
                  </Label>
                  <Controller
                    control={control}
                    name="clothing"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="clothing-styles">
                          <SelectValue placeholder="Select clothing style" />
                        </SelectTrigger>
                        <SelectContent>
                          {clothingStyleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["clothing"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["clothing"]?.message}</p>
                  )}
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eye-color" className="text-base font-medium">
                    Eye Color *
                  </Label>
                  <Controller
                    control={control}
                    name="eyeColor"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="eye-color">
                          <SelectValue placeholder="Select eye color" />
                        </SelectTrigger>
                        <SelectContent>
                          {eyeColorOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["eyeColor"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["eyeColor"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-type" className="text-base font-medium">
                    Body Type *
                  </Label>
                  <Controller
                    control={control}
                    name="bodyType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="body-type">
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bodyTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["bodyType"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["bodyType"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appearance" className="text-base font-medium">
                    Appearance *
                  </Label>
                  <Controller
                    control={control}
                    name="appearance"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="appearance">
                          <SelectValue placeholder="Select appearance" />
                        </SelectTrigger>
                        <SelectContent>
                          {appearanceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["appearance"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["appearance"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intelligence" className="text-base font-medium">
                    Intelligence *
                  </Label>
                  <Controller
                    control={control}
                    name="intelligence"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                        <SelectTrigger id="intelligence">
                          <SelectValue placeholder="Select intelligence preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {intelligenceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["intelligence"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["intelligence"]?.message}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Full Width Languages Field */}
            <div className="space-y-2">
              <Label htmlFor="languages" className="text-base font-medium">
                Languages *
              </Label>
              <Controller
                control={control}
                name="language"
                render={({ field }) => (
                  <MultiSelectCombobox
                    options={languageOptions}
                    selected={field.value ? field.value.split(", ") : []}
                    onChange={(selected) => field.onChange(selected.join(", "))}
                  />
                )}
              />
              {(errors as FieldErrors<PhysicalAppearanceFormValues>)["language"] && (
                <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["language"]?.message}</p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Physical Appearance"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>}
    </TabsContent>
  );
} 