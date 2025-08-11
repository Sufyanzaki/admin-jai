"use client";

import React, {Suspense} from "react";
import {Label} from "@/components/client/ux/label";
import {Select,} from "@/components/client/ux/select";
import {Button} from "@/components/client/ux/button";
import {Slider} from "@/components/client/ux/slider";
import {RangeSlider} from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";
import {
  ExpectationsFormValues,
  useClientExpectationsForm
} from "@/app/(client)/dashboard/settings/expectation/_hooks/useClientExpectationsForm";
import {MemberLocation} from "@/app/shared-types/member";
import {Controller} from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";

type SelectField = {
  name: keyof ExpectationsFormValues;
  label: string;
  placeholder: string;
  key: string;
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
      key: "origin"
    },
    {
      name: "lookingFor",
      label: "I'm looking for *",
      placeholder: "Man",
      key:"amLookingFor"
    },
    {
      name: "religion",
      label: "Religion",
      placeholder: "Muslim",
      key:"religion"
    },
    {
      name: "relationshipStatus",
      label: "Relationship Status",
      placeholder: "Single",
      key:"relationStatus"
    },
    {
      name: "education",
      label: "Education",
      placeholder: "Vocational",
      key:"education"
    },
    {
      name: "smoke",
      label: "Smoke",
      placeholder: "Vocational",
      key:"smoke"
    },
    {
      name: "drinking",
      label: "Drinking",
      placeholder: "Vocational",
      key:"drinking"
    },
    {
      name: "goingOut",
      label: "Going Out",
      placeholder: "Vocational",
      key:"goingOut"
    },
  ];

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <form
            onSubmit={handleSubmit((v) => onSubmit(v))}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {selectFields.map(({ name, label, placeholder, key }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey={key}
                            value={field.value as string || undefined}
                            onChange={(value) => setValue(name, value, { shouldDirty: true })}
                            placeholder={placeholder}
                        />
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

          <div>
            <Label>Location</Label>
            <div className="border border-app-border rounded-[5px] !h-13 py-1">
              <LocationSearchInput onSelect={handleLocationSelect} />
              {(errors.state || errors.country) && <p className="text-sm text-red-500">Invalid Address</p>}

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