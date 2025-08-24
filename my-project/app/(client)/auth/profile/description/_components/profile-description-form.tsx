"use client";

import { Button } from "@/components/client/ux/button";
import { Textarea } from "@/components/client/ux/textarea";
import { Label } from "@/components/client/ux/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useHobbiesInterestsForm, { HobbiesInterestsForm } from "../_hooks/useHobbiesInterestForm";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { AttributeMultiSelect } from "@/app/(client)/dashboard/_components/attribute-select";
import { useRegistration } from "@/app/shared-hooks/useRegistration";
import { useAbusiveWords } from "@/app/shared-hooks/useAbusiveWords";
import { useTranslation } from "react-i18next";

export function ProfileDescriptionForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { registrationSettings } = useRegistration();

  const { words, wordLoading } = useAbusiveWords();

  const {
    errors,
    onSubmit,
    handleSubmit,
    control,
    setValue,
    watch,
    isSubmitting,
    isFetching,
    setError,
    clearErrors,
  } = useHobbiesInterestsForm();

  if (isFetching || wordLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading Profile")}</p>
        </div>
    );
  }

  const abusiveWords = (words?.word || "")
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);

  const shortDescription = watch("shortDescription") || "";

  const handleDescriptionChange = (value: string) => {
    setValue("shortDescription", value);
    const found = abusiveWords.find((word) => value.toLowerCase().includes(word));
    if (found) {
      setError("shortDescription", {
        type: "manual",
        message: t('The word "{{word}}" is not allowed.', { word: found }),
      });
    } else {
      clearErrors("shortDescription");
    }
  };

  const handleFormSubmit = (data: HobbiesInterestsForm) => {
    const found = abusiveWords.find((word) =>
        (data.shortDescription || "").toLowerCase().includes(word)
    );
    if (found) {
      setError("shortDescription", {
        type: "manual",
        message: t('The word "{{word}}" is not allowed.', { word: found }),
      });
      return;
    }
    onSubmit(data).finally();
  };

  const handleBack = () => {
    router.push("/auth/profile/details");
  };

  return (
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="text-start space-y-4">
          <div className="flex items-center justify-start space-x-3">
            <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
              03
            </div>
            <p className="text-[22px] lg:text-3xl font-semibold">
              {t(registrationSettings?.step3Title || "Profile Description")}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">
                {t(registrationSettings?.myDescriptionTitle || "Short Description")}
              </Label>
              <p className="text-sm mb-1">
                <span className="font-bold">{shortDescription.length} </span>
                {t("(Minimum 100 required)")}
              </p>
            </div>
            <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                    <Textarea
                        id="shortDescription"
                        value={field.value || ""}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder={t(registrationSettings?.myDescriptionPlaceholder || "Describe yourself...")}
                        className="min-h-[120px] border-gray-300 resize-none"
                        required
                    />
                )}
            />
            {errors.shortDescription && (
                <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-row gap-4 w-full items-center">
              <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
                {t("What do I like?")}
              </h4>
              <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <Controller
                    name="sports"
                    control={control}
                    render={({ field }) => (
                        <AttributeMultiSelect
                            label={t("sports")}
                            attributeKey="sports"
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={t("Select Sports")}
                        />
                    )}
                />
                {errors.sports && (
                    <p className="text-sm text-red-500">{errors.sports?.message}</p>
                )}
              </div>

              <div>
                <Controller
                    name="music"
                    control={control}
                    render={({ field }) => (
                        <AttributeMultiSelect
                            label={t("music")}
                            attributeKey="music"
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={t("Select Music")}
                        />
                    )}
                />
                {errors.music && (
                    <p className="text-sm text-red-500">{errors.music?.message}</p>
                )}
              </div>

              <div>
                <Controller
                    name="kitchen"
                    control={control}
                    render={({ field }) => (
                        <AttributeMultiSelect
                            label={t("kitchen")}
                            attributeKey="kitchen"
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={t("Select Kitchen")}
                        />
                    )}
                />
                {errors.kitchen && (
                    <p className="text-sm text-red-500">{errors.kitchen?.message}</p>
                )}
              </div>

              <div>
                <Controller
                    name="reading"
                    control={control}
                    render={({ field }) => (
                        <AttributeMultiSelect
                            label={t("reading")}
                            attributeKey="reading"
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={t("Select Reading")}
                        />
                    )}
                />
                {errors.reading && (
                    <p className="text-sm text-red-500">{errors.reading?.message}</p>
                )}
              </div>

              <div>
                <Controller
                    name="tvShows"
                    control={control}
                    render={({ field }) => (
                        <AttributeMultiSelect
                            label={t("tvShows")}
                            attributeKey="tvShows"
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={t("Select TV Shows")}
                        />
                    )}
                />
                {errors.tvShows && (
                    <p className="text-sm text-red-500">{errors.tvShows?.message}</p>
                )}
              </div>

            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 my-16 lg:my-26">
          <Button variant="outline" onClick={handleBack} size="lg" type="button">
            <ArrowLeft className="mr-1" />
            {t("Back")}
          </Button>
          <Button variant="theme" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("Processing..") : t("Next")}
            <ArrowRight className="ml-1" />
          </Button>
        </div>
      </form>
  );
}
