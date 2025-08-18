"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Label} from "@/components/admin/ui/label";
import {TabsContent} from "@/components/admin/ui/tabs";
import {Input} from "@/components/admin/ui/input";
import {Button} from "@/components/admin/ui/button";
import type {FieldErrors} from "react-hook-form";
import {Controller} from "react-hook-form";
import type {PhysicalAppearanceFormValues} from "../add/_hooks/usePhysicalAppearanceForm";
import usePhysicalAppearanceForm from "../add/_hooks/usePhysicalAppearanceForm";
import {useParams} from "next/navigation";
import {getUserTrackingId} from "@/lib/access-token";
import {AlertTriangle} from "lucide-react";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import { AttributeSelect } from "@/components/admin/ui/attribute-select";

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
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-amber-700 text-sm">
                  You need to initialize a new member profile before you can add other details. Go back to basic Information to initialize a member
                </div>
            </div>
          </div>}
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="length">
                    Length *
                  </Label>
                  <Controller
                    control={control}
                    name="height"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="height"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select height"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["height"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["height"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hair-color">
                    Hair Color *
                  </Label>
                  <Controller
                    control={control}
                    name="hairColor"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="hairColor"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select hairColor"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["hairColor"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["hairColor"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">
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
                  <Label htmlFor="clothing-styles">
                    Clothing Styles *
                  </Label>
                  <Controller
                    control={control}
                    name="clothing"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="clothingStyles"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select clothingStyles"
                        />
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
                  <Label htmlFor="eye-color">
                    Eye Color *
                  </Label>
                  <Controller
                    control={control}
                    name="eyeColor"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="eyeColor"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select eyeColor"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["eyeColor"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["eyeColor"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-type">
                    Body Type *
                  </Label>
                  <Controller
                    control={control}
                    name="bodyType"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="bodyType"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select bodyType"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["bodyType"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["bodyType"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appearance">
                    Appearance *
                  </Label>
                  <Controller
                    control={control}
                    name="appearance"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="appearance"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select appearance"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["appearance"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["appearance"]?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intelligence">
                    Intelligence *
                  </Label>
                  <Controller
                    control={control}
                    name="intelligence"
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="intelligence"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select intelligence"
                        />
                    )}
                  />
                  {(errors as FieldErrors<PhysicalAppearanceFormValues>)["intelligence"] && (
                    <p className="text-sm text-red-500">{(errors as FieldErrors<PhysicalAppearanceFormValues>)["intelligence"]?.message}</p>
                  )}
                </div>
              </div>
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