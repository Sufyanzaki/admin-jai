"use client";
import React, { Suspense } from "react";
import { Label } from "@/components/client/ux/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { Button } from "@/components/client/ux/button";
import { Slider } from "@/components/client/ux/slider";
import { RangeSlider } from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";
import {
  ExpectationsFormValues,
  useClientExpectationsForm
} from "@/app/(client)/dashboard/settings/expectation/_hooks/useClientExpectationsForm";
import { MemberLocation } from "@/app/shared-types/member";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { cn } from "@/lib/utils";

type SelectField = {
  name: keyof ExpectationsFormValues;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
};

type BooleanField = {
  name: 'smoke' | 'drinking' | 'goingOut';
  label: string;
};

export default function ExpectationPage() {
  const {
    control,
    handleSubmit,
    watch,
    onSubmit,
    isLoading,
    isDirty,
    errors,
    isFetching,
    setValue,
    ageRange,
    setAgeRange,
  } = useClientExpectationsForm();

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    setValue("city", location.city, { shouldDirty: true });
    location.country && setValue("country", location.country, { shouldDirty: true });
    location.state && setValue("state", location.state, { shouldDirty: true });
  };

  if (isFetching) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading...</p>
        </div>
    );
  }

  const selectFields: SelectField[] = [
    {
      name: "origin",
      label: "Ethnicity",
      placeholder: "Select",
      options: [
        { value: "indian", label: "Indian" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "lookingFor",
      label: "I'm looking for *",
      placeholder: "Man",
      options: [
        { value: "man", label: "Man" },
        { value: "woman", label: "Woman" },
      ],
    },
    {
      name: "religion",
      label: "Religion",
      placeholder: "Muslim",
      options: [
        { value: "muslim", label: "Muslim" },
        { value: "hindu", label: "Hindu" },
        { value: "christian", label: "Christian" },
      ],
    },
    {
      name: "relationshipStatus",
      label: "Relationship Status",
      placeholder: "Single",
      options: [
        { value: "single", label: "Single" },
        { value: "divorced", label: "Divorced" },
      ],
    },
    {
      name: "education",
      label: "Education",
      placeholder: "Vocational",
      options: [
        { value: "vocational", label: "Vocational" },
        { value: "college", label: "College" },
        { value: "university", label: "University" },
      ],
    },
  ];

  const booleanFields: BooleanField[] = [
    { name: "smoke", label: "Smoke" },
    { name: "drinking", label: "Drink" },
    { name: "goingOut", label: "Goes Out" },
  ];

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <form
            onSubmit={handleSubmit((v) => onSubmit(v))}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {selectFields.map(({ name, label, placeholder, options }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value as string}
                            onValueChange={(value) =>
                                setValue(name, value, {
                                  shouldDirty: true,
                                })
                            }
                        >
                          <SelectTrigger className={cn(errors[name] && "border-red-500")}>
                            <SelectValue placeholder={placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    )}
                />
                {errors[name] && (
                    <p className="text-sm text-red-400">{errors[name]?.message as string}</p>
                )}
              </div>
          ))}

          <div className="relative">
            <Label>Age Range *</Label>
            <RangeSlider min={18} max={100} value={ageRange} onChange={setAgeRange} unit="y/o" />
            {(errors.ageFrom || errors.ageTo) && (
                <p className="text-sm text-red-400">
                  {errors.ageFrom?.message || errors.ageTo?.message}
                </p>
            )}
          </div>

          <div className="relative">
            <Label>Height</Label>
            <Slider
                value={parseInt(watch("length") || "0")}
                onValueChange={(value) => setValue("length", value.toString(), { shouldDirty: true })}
                min={0}
                max={300}
                step={1}
                unit="cm"
                className="mt-9 mb-2"
            />
            {errors.length && (
                <p className="text-sm text-red-400">{errors.length.message}</p>
            )}
          </div>

          <div className="relative">
            <Label>Weight</Label>
            <Slider
                value={parseInt(watch("weight") || "0")}
                onValueChange={(value) => setValue("weight", value.toString(), { shouldDirty: true })}
                min={0}
                max={300}
                step={1}
                unit="kg"
                className="mt-9 mb-2"
            />
            {errors.weight && (
                <p className="text-sm text-red-400">{errors.weight.message}</p>
            )}
          </div>

          {booleanFields.map(({ name, label }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            key={field.value}
                            onValueChange={val => field.onChange(val)}
                        >
                          <SelectTrigger className={cn(errors[name] && "border-red-500")}>
                            <SelectValue placeholder="No" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                    )}
                />
                {errors[name] && (
                    <p className="text-sm text-red-400">{errors[name]?.message as string}</p>
                )}
              </div>
          ))}

          <div>
            <Label>Location</Label>
            <div className="border border-app-border rounded-[5px] !h-13 py-1">
              <LocationSearchInput onSelect={handleLocationSelect} />
              {(errors.state || errors.country) && (
                  <div className="space-y-1">
                    {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                    {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                  </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" size="lg" variant="theme" disabled={!isDirty || isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Suspense>
  );
}