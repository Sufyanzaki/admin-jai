"use client";

import type React from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import { ArrowRight } from "lucide-react";
import LocationSearchInput from "@/components/client/location-search";
import useProfileCreateForm from "../_hooks/useProfileCreate";
import { MemberLocation } from "@/app/shared-types/member";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { AttributeSelect } from "@/app/(client)/dashboard/_components/attribute-select";
import { useRegistration } from "@/app/shared-hooks/useRegistration";

export function ProfileCreationForm() {
  const {registrationSettings} = useRegistration();
  const {
    errors,
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    isFetching,
  } = useProfileCreateForm();

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const currentLocation =
    city || state || country ? { city, state, country } : null;

  const handleLocationSelect = (location: Partial<MemberLocation>) => {
    const city = location.city ?? "";
    const state = location.state ?? "";
    const country = location.country ?? "";

    setValue("city", city);
    setValue("state", state);
    setValue("country", country);
  };

  if (isFetching)
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader />
        <p className="text-sm">Loading your profile information...</p>
      </div>
    );

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            01
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            {registrationSettings?.step1Title}
          </p>
        </div>
      </div>

      <div className="space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Label>I&#39;m a *</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <AttributeSelect
                attributeKey="iAmA"
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Select gender"
              />
            )}
          />
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
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
          {errors.origin && (
            <p className="text-sm text-red-500">{errors.origin.message}</p>
          )}
        </div>

        <div>
          <Label>I&#39;m looking for a *</Label>
          <Controller
            name="lookingFor"
            control={control}
            render={({ field }) => (
              <AttributeSelect
                attributeKey="amLookingFor"
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Select Partner's Gender"
              />
            )}
          />
          {errors.lookingFor && (
            <p className="text-sm text-red-500">{errors.lookingFor.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="username" required>
            Create a display name for your profile.
          </Label>
          <Input
            id="username"
            {...register("username")}
            className="h-12 border-gray-300"
            placeholder="e.g. Sunshine22 or RomanticSoul"
            required
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="firstName" required>
            First Name
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="h-12 border-gray-300"
            placeholder="Your given name"
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" required>
            Last Name
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="h-12 border-gray-300"
            placeholder="Your family name"
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <Label>Date of Birth *</Label>
          <Input
            type="date"
            {...register("dob")}
            className="h-12 border-gray-300"
            placeholder="Select your birth date"
            required
          />
          {errors.dob && (
            <p className="text-sm text-red-500">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <Label>Age</Label>
          <Input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="h-12 border-gray-300"
            placeholder="Enter your current age"
            required
          />
          {errors.age && (
            <p className="text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>

        <div>
          <Label>Relationship</Label>
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
          {errors.relationshipStatus && (
            <p className="text-sm text-red-500">
              {errors.relationshipStatus.message}
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
                placeholder="Do you have children?"
              />
            )}
          />
          {errors.children && (
            <p className="text-sm text-red-500">{errors.children.message}</p>
          )}
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
                placeholder="Select your religion"
              />
            )}
          />
          {errors.religion && (
            <p className="text-sm text-red-500">{errors.religion.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full items-center">
        <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
          Where do you live
        </h4>
        <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
      </div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="border-b border-b-app-border">
          <LocationSearchInput
            value={currentLocation}
            onSelect={handleLocationSelect}
            placeholder="Start typing your city or address"
          />
          {(errors.state || errors.country) && (
            <p className="text-sm text-red-500">Invalid Address</p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-6 my-16 lg:my-26">
        <Button
          variant={"theme"}
          type="submit"
          className="p-6"
          disabled={isLoading}
        >
          {isLoading ? "Saving your details..." : "Continue to next step"}
          <span className="ml-1">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </form>
  );
}
