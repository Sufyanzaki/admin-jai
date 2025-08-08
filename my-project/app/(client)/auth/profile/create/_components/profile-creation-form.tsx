"use client";

import type React from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Label} from "@/components/client/ux/label";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useRouter} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/client/ux/select";
import LocationSearchInput from "@/components/client/location-search";
import useProfileCreateForm from "../_hooks/useProfileCreate";
import {MemberLocation} from "@/app/shared-types/member";
import {Controller} from "react-hook-form";
import Preloader from "@/components/shared/Preloader";

export function ProfileCreationForm() {
  const router = useRouter();

  const {
    errors,
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    isFetching
  } = useProfileCreateForm();

  const handleBack = () => {
    router.push("/auth/profile/photos");
  };

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

  if (isFetching) return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading your profile information...</p>
      </div>
  );

  return (
      <form
          className="space-y-6"
          onSubmit={handleSubmit(data => onSubmit(data))}
      >
        <div className="text-start space-y-4">
          <div className="flex items-center justify-start space-x-3">
            <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
              01
            </div>
            <p className="text-[22px] lg:text-3xl font-semibold">
              Create a new profile
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
                    <Select value={field.value || undefined} key={field.value || "empty"} onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Man</SelectItem>
                        <SelectItem value="Female">Woman</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value || undefined} key={field.value || "empty"} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ethnic origin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Turks">Turks</SelectItem>
                        <SelectItem value="Hindustans">Hindustans</SelectItem>
                        <SelectItem value="Dutch">Dutch</SelectItem>
                        <SelectItem value="Creols">Creols</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Mix">Mix</SelectItem>
                        <SelectItem value="Indians">Indians</SelectItem>
                        <SelectItem value="Kamla">Kamla</SelectItem>
                        <SelectItem value="Moroccan">Moroccan</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select partner's gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Man">Man</SelectItem>
                        <SelectItem value="Woman">Woman</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value || undefined} key={field.value || "empty"} onValueChange={field.onChange}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select relationship status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single - never married</SelectItem>
                        <SelectItem value="Married">Married - free marriage</SelectItem>
                        <SelectItem value="Divorced">Single - Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed - free marriage</SelectItem>
                        <SelectItem value="Other">free one</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select
                        value={field.value ? "true" : "false"}
                        onValueChange={(val) => field.onChange(val === "true")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Do you have children?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={field.value || undefined} key={field.value || "empty"} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buddhist">Buddhist</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Roman">Roman Catholic</SelectItem>
                        <SelectItem value="Jew">Jew</SelectItem>
                        <SelectItem value="Protestant">Protestant</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="New-age">New-age</SelectItem>
                        <SelectItem value="Kamla">Kamla</SelectItem>
                        <SelectItem value="Marokkanns">Marokkanns</SelectItem>
                      </SelectContent>
                    </Select>
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
                <div className="space-y-1">
                  {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                  {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6 my-16 lg:my-26">
          <Button
              variant="outline"
              type="button"
              onClick={handleBack}
              className="p-6"
          >
          <span className="mr-1">
            <ArrowLeft />
          </span>
            Back to photos
          </Button>
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