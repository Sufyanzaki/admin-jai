"use client";

import {Button} from "@/components/client/ux/button";
import {Label} from "@/components/client/ux/label";
import {useRouter} from "next/navigation";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Slider} from "@/components/client/ux/slider";
import {RangeSlider} from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";
import {Controller} from "react-hook-form";
import usePartnerForm from "@/app/(client)/auth/profile/partner-preferences/_hooks/usePartnerForm";
import {MemberLocation} from "@/app/shared-types/member";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";
import { useRegistration } from "@/app/shared-hooks/useRegistration";

export default function PartnerPreferencesForm() {
    const router = useRouter();
      const {registrationSettings, registrationLoading} = useRegistration();
    
    const {
        control,
        handleSubmit,
        errors,
        isLoading,
        setValue,
        onSubmit,
        watch
    } = usePartnerForm();


    const ageFrom = watch("ageFrom");
    const ageTo = watch("ageTo");
    const length = watch("length");
    const weight = watch("weight");
    const searchWithIn = watch("searchWithIn");

    const city = watch("city");
    const state = watch("state");
    const country = watch("country");

    const currentLocation = city || state || country ? { city, state, country } : null;

    const handleLocationSelect = (location: Partial<MemberLocation>) => {
        setValue("city", location.city);
        location.state && setValue("state", location.state);
        location.country && setValue("country", location.country);
    };

    const handleBack = () => {
        router.push("/auth/profile/photos");
    };
  return (
      <div className="space-y-8 py-3">
        <div className="text-start space-y-4">
          <div className="flex items-center justify-start space-x-3">
            <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
              05
            </div>
            <p className="text-[22px] lg:text-3xl font-semibold">
            {registrationSettings?.step5Title}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(v=>onSubmit(v))} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>I&apos;m looking for a *</Label>
                <Controller
                    name="lookingFor"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="amLookingFor"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select gender"
                        />
                    )}
                />
              {errors.lookingFor && <p className="text-sm text-red-500">{errors.lookingFor.message}</p>}
            </div>

            <div>
              <Label>Origin *</Label>
                <Controller
                    name="origin"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="origin"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select Origin"
                        />
                    )}
                />
              {errors.origin && <p className="text-sm text-red-500">{errors.origin.message}</p>}
            </div>

            <div>
              <Label>Relationship *</Label>
                <Controller
                    name="relationshipStatus"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="relationStatus"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select relationship status"
                        />
                    )}
                />
              {errors.relationshipStatus && <p className="text-sm text-red-500">{errors.relationshipStatus.message}</p>}
            </div>

            <div>
              <Label>Religion *</Label>
                <Controller
                    name="religion"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="religion"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select religion"
                        />
                    )}
                />
              {errors.religion && <p className="text-sm text-red-500">{errors.religion.message}</p>}
            </div>

            <div className="relative">
              <Label>Age Range *</Label>
              <RangeSlider
                  min={18}
                  max={100}
                  value={[ageFrom, ageTo]}
                  onChange={([min, max]) => {
                    setValue("ageFrom", min);
                    setValue("ageTo", max);
                  }}
                  unit="y/o"
              />
              {errors.ageFrom && <p className="text-sm text-red-500">{errors.ageFrom.message}</p>}
              {errors.ageTo && <p className="text-sm text-red-500">{errors.ageTo.message}</p>}
            </div>

            <div className="relative w-full">
              <Label>Height *</Label>
                <Slider
                    value={Number(length)}
                    onValueChange={(val) => setValue("length", String(val))}
                    min={0}
                    max={250}
                    step={1}
                    unit="cm"
                    className="mt-[38px] mb-2"
                />
              {errors.length && <p className="text-sm text-red-500">{errors.length.message}</p>}
            </div>

            <div className="relative w-full">
              <Label>Weight *</Label>
                <Slider
                    value={Number(weight)}
                    onValueChange={(val) => setValue("weight", val.toString())}
                    min={0}
                    max={150}
                    step={1}
                    unit="kg"
                    className="mt-10 mb-2"
                />
              {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
            </div>

            <div>
                <Label>Education</Label>
                <Controller
                    name="education"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="education"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="e.g. University degree"
                        />
                    )}
                />
                {errors.education && (
                    <p className="text-sm text-red-500">
                        {errors.education.message}
                    </p>
                )}
            </div>

            <div>
              <Label>Children *</Label>
                <Controller
                    name="children"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="children"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select number of children"
                        />
                    )}
                />
              {errors.children && <p className="text-sm text-red-500">{errors.children.message}</p>}
            </div>

              <div>
                  <Label>Smoke *</Label>
                  <Controller
                      name="smoke"
                      control={control}
                      render={({ field }) => (
                          <AttributeSelect
                              attributeKey="smoke"
                              value={field.value || undefined}
                              onChange={field.onChange}
                              placeholder="Select smoking preference"
                          />
                      )}
                  />
                  {errors.smoke && (
                      <p className="text-sm text-red-500">{errors.smoke.message}</p>
                  )}
              </div>

              <div>
                  <Label>Drinking *</Label>
                  <Controller
                      name="drinking"
                      control={control}
                      render={({ field }) => (
                          <AttributeSelect
                              attributeKey="drinking"
                              value={field.value || undefined}
                              onChange={field.onChange}
                              placeholder="Select drinking preference"
                          />
                      )}
                  />
                  {errors.drinking && (
                      <p className="text-sm text-red-500">{errors.drinking.message}</p>
                  )}
              </div>

              <div>
                  <Label>Going Out *</Label>
                  <Controller
                      name="goingOut"
                      control={control}
                      render={({ field }) => (
                          <AttributeSelect
                              attributeKey="goingOut"
                              value={field.value || undefined}
                              onChange={field.onChange}
                              placeholder="Select goingOut preference"
                          />
                      )}
                  />
                  {errors.goingOut && (
                      <p className="text-sm text-red-500">{errors.goingOut.message}</p>
                  )}
              </div>

          </div>

          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              Partner Location
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>

          <div className="space-y-2 grid lg:grid-cols-2 gap-5 items-center">
            <div>
                <Label>Location *</Label>
                <div className="border border-app-border rounded-[5px]">
                    <LocationSearchInput
                        value={currentLocation}
                        onSelect={handleLocationSelect}
                        placeholder="Search for your city, state, or country"
                    />
                </div>
                {(errors.state || errors.country) && <p className="text-sm text-red-500">Invalid Address</p>}
            </div>

            <div className="relative w-full">
              <Label>Search within *</Label>
                <Slider
                    value={searchWithIn || 0}
                    onValueChange={(val) => setValue("searchWithIn", val)}
                    max={100}
                    step={1}
                    unit="km"
                    className="mt-7 mb-2"
                />
              {errors.searchWithIn && <p className="text-sm text-red-500">{errors.searchWithIn.message}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-6 my-16 lg:my-26">
            <Button variant="outline" onClick={handleBack} size={"lg"} type="button">
            <span className="mr-1">
              <ArrowLeft />
            </span>
              Back
            </Button>
            <Button variant="theme" type="submit" size={"lg"} disabled={isLoading}>
              {isLoading ? "Saving..." : "Next"}
              <span className="ml-1">
              <ArrowRight />
            </span>
            </Button>
          </div>
        </form>
      </div>
  );
}