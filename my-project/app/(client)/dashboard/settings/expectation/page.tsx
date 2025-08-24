"use client";

import React, { Suspense } from "react";
import { Label } from "@/components/client/ux/label";
import { Button } from "@/components/client/ux/button";
import { Slider } from "@/components/client/ux/slider";
import { RangeSlider } from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";
import {
  useClientExpectationsForm,
} from "@/app/(client)/dashboard/settings/expectation/_hooks/useClientExpectationsForm";
import { MemberLocation } from "@/app/shared-types/member";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { AttributeSelect } from "@/app/(client)/dashboard/_components/attribute-select";
import { useTranslation } from "react-i18next";

// A pure TypeScript type, no Zod involved
export type ExpectationsFormValues = {
  origin: string;
  lookingFor: string;
  ageFrom: number;
  ageTo: number;
  country: string;
  city?: string;
  state: string;
  relationshipStatus: string;
  education: string;
  religion: string;
  smoke: string;
  drinking: string;
  weight: string;
  goingOut: string;
  length: string;
};


type SelectField = {
  name: keyof ExpectationsFormValues;
  label: string;
  placeholder: string;
  key: string;
};

export default function ExpectationPage() {
  const { t } = useTranslation();

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

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation = city || state || country ? { city, state, country } : null;

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    setValue("city", location.city, { shouldDirty: true });
    location.country && setValue("country", location.country, { shouldDirty: true });
    location.state && setValue("state", location.state, { shouldDirty: true });
  };

  if (isFetching) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">{t("Loading...")}</p>
      </div>
    );
  }

  const selectFields: SelectField[] = [
    { name: "origin", label: t("Ethnicity"), placeholder: t("Select"), key: "origin" },
    { name: "lookingFor", label: t("I'm looking for *"), placeholder: t("Man"), key: "amLookingFor" },
    { name: "religion", label: t("Religion"), placeholder: t("Muslim"), key: "religion" },
    { name: "relationshipStatus", label: t("Relationship Status"), placeholder: t("Single"), key: "relationStatus" },
    { name: "education", label: t("Education"), placeholder: t("Vocational"), key: "education" },
    { name: "smoke", label: t("Smoke"), placeholder: t("Vocational"), key: "smoke" },
    { name: "drinking", label: t("Drinking"), placeholder: t("Vocational"), key: "drinking" },
    { name: "goingOut", label: t("Going Out"), placeholder: t("Vocational"), key: "goingOut" },
  ];

  return (
    <Suspense fallback={<div>{t("Loading...")}</div>}>
      <form
        onSubmit={handleSubmit((v) => onSubmit(v))}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {selectFields?.map(({ name, label, placeholder, key }) => (
          <div key={name}>
            <Label>{label}</Label>
            <Controller
              name={(name)}
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
          <Label>{t("Age Range *")}</Label>
          <RangeSlider min={18} max={100} value={ageRange} onChange={setAgeRange} unit={t("y/o")} />
          {(errors.ageFrom || errors.ageTo) && (
            <p className="text-sm text-red-400">
              {errors.ageFrom?.message || errors.ageTo?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Label>{t("Height")}</Label>
          <Slider
            value={parseInt(watch("length") || "0")}
            onValueChange={(value) => setValue("length", value.toString(), { shouldDirty: true })}
            min={0}
            max={300}
            step={1}
            unit={t("cm")}
            className="mt-9 mb-2"
          />
          {errors.length && (
            <p className="text-sm text-red-400">{errors.length.message}</p>
          )}
        </div>

        <div className="relative">
          <Label>{t("Weight")}</Label>
          <Slider
            value={parseInt(watch("weight") || "0")}
            onValueChange={(value) => setValue("weight", value.toString(), { shouldDirty: true })}
            min={0}
            max={300}
            step={1}
            unit={t("kg")}
            className="mt-9 mb-2"
          />
          {errors.weight && (
            <p className="text-sm text-red-400">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <Label>{t("Location")}</Label>
          <div className="border border-app-border rounded-[5px] !h-13 py-1">
            <LocationSearchInput
              value={currentLocation}
              onSelect={handleLocationSelect}
              placeholder={t("Start typing your city or address")}
            />
            {(errors.state || errors.country) && <p className="text-sm text-red-500">{t("Invalid Address")}</p>}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" size="lg" variant="theme" disabled={!isDirty || isLoading}>
            {isLoading ? t("Updating...") : t("Update")}
          </Button>
        </div>
      </form>
    </Suspense>
  );
}
