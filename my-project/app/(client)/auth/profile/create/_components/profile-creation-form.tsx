"use client";

import type React from "react";
import {useEffect} from "react";
import {Button} from "@/components/client/ux/button";
import {Input} from "@/components/client/ux/input";
import {Label} from "@/components/client/ux/label";
import {ArrowRight} from "lucide-react";
import LocationSearchInput from "@/components/client/location-search";
import useProfileCreateForm from "../_hooks/useProfileCreate";
import {MemberLocation} from "@/app/shared-types/member";
import {Controller} from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import {useRegistration} from "@/app/shared-hooks/useRegistration";
import {useTranslation} from "react-i18next";

export function ProfileCreationForm() {
  const { t } = useTranslation();
  const { registrationSettings } = useRegistration();

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

  console.log(errors)

  const city = watch("city");
  const state = watch("state");
  const country = watch("country");

  const dob = watch("dob");

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

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age);
    } else {
      setValue("age", 0);
    }
  }, [dob, setValue]);

  if (isFetching)
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading your profile information...")}</p>
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
              {t(registrationSettings?.step1Title ?? "")}
            </p>
          </div>
        </div>

        <div className="space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <Label>{t("I'm a *")}</Label>
            <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="iAmA"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Select gender")}
                    />
                )}
            />
            {errors.gender && (
                <p className="text-sm text-red-500">{t(errors.gender.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("Origin *")}</Label>
            <Controller
                name="origin"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="origin"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Select Origin")}
                    />
                )}
            />
            {errors.origin && (
                <p className="text-sm text-red-500">{t(errors.origin.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("I'm looking for a *")}</Label>
            <Controller
                name="lookingFor"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="amLookingFor"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Select Partner's Gender")}
                    />
                )}
            />
            {errors.lookingFor && (
                <p className="text-sm text-red-500">{t(errors.lookingFor.message!)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="username" required>
              {t("Create a display name for your profile.")}
            </Label>
            <Input
                id="username"
                {...register("username")}
                className="h-12 border-gray-300"
                placeholder={t("e.g. Sunshine22 or RomanticSoul")}
                required
            />
            {errors.username && (
                <p className="text-sm text-red-500">{t(errors.username.message!)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="firstName" required>{t("First Name")}</Label>
            <Input
                id="firstName"
                {...register("firstName")}
                className="h-12 border-gray-300"
                placeholder={t("Your given name")}
                required
            />
            {errors.firstName && (
                <p className="text-sm text-red-500">{t(errors.firstName.message!)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" required>{t("Last Name")}</Label>
            <Input
                id="lastName"
                {...register("lastName")}
                className="h-12 border-gray-300"
                placeholder={t("Your family name")}
                required
            />
            {errors.lastName && (
                <p className="text-sm text-red-500">{t(errors.lastName.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("Date of Birth *")}</Label>
            <Input
                type="date"
                {...register("dob")}
                className="h-12 border-gray-300"
                placeholder={t("Select your birth date")}
                required
            />
            {errors.dob && (
                <p className="text-sm text-red-500">{t(errors.dob.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("Age")}</Label>
            <Input
                type="number"
                {...register("age", { valueAsNumber: true })}
                className="h-12 border-gray-300"
                placeholder={t("Enter your current age")}
                required
            />
            {errors.age && (
                <p className="text-sm text-red-500">{t(errors.age.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("Relationship")}</Label>
            <Controller
                name="relationshipStatus"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="relationStatus"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Select relationship status")}
                    />
                )}
            />
            {errors.relationshipStatus && (
                <p className="text-sm text-red-500">
                  {t(errors.relationshipStatus.message!)}
                </p>
            )}
          </div>

          <div>
            <Label>{t("Children *")}</Label>
            <Controller
                name="children"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="children"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Do you have children?")}
                    />
                )}
            />
            {errors.children && (
                <p className="text-sm text-red-500">{t(errors.children.message!)}</p>
            )}
          </div>

          <div>
            <Label>{t("Religion *")}</Label>
            <Controller
                name="religion"
                control={control}
                render={({ field }) => (
                    <AttributeSelect
                        attributeKey="religion"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t("Select your religion")}
                    />
                )}
            />
            {errors.religion && (
                <p className="text-sm text-red-500">{t(errors.religion.message!)}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full items-center">
          <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
            {t("Where do you live")}
          </h4>
          <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
        </div>
        <div className="grid md:grid-cols-1 gap-4">
          <div className="border-b border-b-app-border">
            <LocationSearchInput
                value={currentLocation}
                onSelect={handleLocationSelect}
                placeholder={t("Start typing your city or address")}
            />
            {(errors.state || errors.country) && (
                <p className="text-sm text-red-500">{t("Invalid Address")}</p>
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
            {isLoading
                ? t("Saving your details...")
                : t("Continue to next step")}
            <span className="ml-1">
            <ArrowRight />
          </span>
          </Button>
        </div>
      </form>
  );
}
