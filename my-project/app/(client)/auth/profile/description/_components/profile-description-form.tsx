"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Textarea } from "@/components/client/ux/textarea";
import { Label } from "@/components/client/ux/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";
import useHobbiesInterestsForm from "../_hooks/useHobbiesInterestForm";
import { useSession } from "next-auth/react";
import { Controller } from "react-hook-form";

export function ProfileDescriptionForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  if (status === "loading") return <div>Loading...</div>;
  const {
    errors,
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    register,
    setValue,
    currentStep,
    watch,
  } = useHobbiesInterestsForm(userId);
console.log(errors)
  const maxCharacters = 100;

  // Watch form fields for controlled components
  const description = watch("description") || "";


  const handleDescriptionChange = (value: string) => {
    if (value.length <= maxCharacters) {
      setValue("description", value);
    }
  };

  const handleNext = handleSubmit((data) => {
    onSubmit(data);
  });

  const handleBack = () => {
    router.push("/auth/profile/details");
  };

  return (
    <form className="space-y-8" onSubmit={handleNext}>
      {/* Header */}
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            03
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            Describe yourself in a few words
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* About Me Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">About Me</Label>
            <p className="text-sm mb-1">
              <span className="font-bold">{description.length} </span>
              (Minimum 100 required)
            </p>
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                value={field.value || ""}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[120px] border-gray-300 resize-none"
                required
              />
            )}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* What do I like Section */}
        <div className="space-y-4">
          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              What do I like?
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Sports *</Label>
              <Controller
                name="sports"
                control={control}
                render={({ field }) => (
                  <MultiSelectCombobox
                    selected={field.value || []}
                    options={["Car racing", "Boxing", "Football"]}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.sports && (
                <p className="text-sm text-red-500">{errors.sports.message}</p>
              )}
            </div>

            <div>
              <Label>Music *</Label>
              <Controller
                name="music"
                control={control}
                render={({ field }) => (
                  <MultiSelectCombobox
                    selected={field.value || []}
                    options={["R&B", "Rock", "Jazz", "House"]}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.music && (
                <p className="text-sm text-red-500">{errors.music.message}</p>
              )}
            </div>

            <div>
              <Label>Cooking *</Label>
              <Controller
                name="kitchen"
                control={control}
                render={({ field }) => (
                  <MultiSelectCombobox
                    selected={field.value || []}
                    options={["Italian", "Greek", "Indian"]}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.kitchen && (
                <p className="text-sm text-red-500">{errors.kitchen.message}</p>
              )}
            </div>

            <div>
              <Label>Reading *</Label>
              <Controller
                name="reading"
                control={control}
                render={({ field }) => (
                  <MultiSelectCombobox
                    selected={field.value || []}
                    options={["Psychology", "Romance"]}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.reading && (
                <p className="text-sm text-red-500">{errors.reading.message}</p>
              )}
            </div>

            <div>
              <Label>TV Shows *</Label>
              <Controller
                name="tvShows"
                control={control}
                render={({ field }) => (
                  <MultiSelectCombobox
                    selected={field.value || []}
                    options={["Drama", "Documentary"]}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.tvShows && (
                <p className="text-sm text-red-500">{errors.tvShows.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} size={"lg"} type="button">
          <span className="mr-1">
            <ArrowLeft />
          </span>
          Back
        </Button>
        <Button
          variant={"theme"}
          size={"lg"}
          type="submit"
          disabled={isLoading}
        >
          Next
          <span className="ml-1">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </form>
  );
}
