"use client";

import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Slider } from "@/components/client/ux/slider";
import useAppearanceAndCareerForm from "../_hooks/useAppearanceAndCareerForm";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { AttributeMultiSelect, AttributeSelect } from "@/app/(client)/dashboard/_components/attribute-select";
import { useRegistration } from "@/app/shared-hooks/useRegistration";
import { useTranslation } from "react-i18next";

export function ProfileDetailsForm() {
    const { t } = useTranslation();
    const { registrationSettings } = useRegistration();
    const router = useRouter();

    const { errors, isLoading, onSubmit, handleSubmit, control, isSubmitting } = useAppearanceAndCareerForm();

    const handleBack = () => {
        router.push("/auth/profile/create");
    };

    if (isLoading) {
        return (
            <div className="flex items-center flex-col justify-center h-64 my-28">
                <Preloader />
                <p className="text-sm">{t("Loading...")}</p>
            </div>
        );
    }

    if (!registrationSettings) {
        return (
            <div className="flex items-center flex-col justify-center h-64 gap-3 my-28">
                <h2 className="text-2xl font-bold text-gray-700">{t("No data found")}</h2>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="space-y-8 py-3">
                {/* Step Header */}
                <div className="text-start space-y-4">
                    <div className="flex items-center justify-start space-x-3">
                        <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
                            02
                        </div>
                        <p className="text-[22px] lg:text-3xl font-semibold">{t(registrationSettings.step2Title)}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Step Description */}
                    <div className="flex flex-row gap-4 w-full items-center">
                        <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">{t(registrationSettings.step2Description)}</h4>
                        <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>{t("Hair Color")} *</Label>
                            <Controller
                                name="hairColor"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="hairColor" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Chestnut Brown")} />}
                            />
                            {errors.hairColor && <p className="text-sm text-red-500">{errors.hairColor.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Eye Color")} *</Label>
                            <Controller
                                name="eyeColor"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="eyeColor" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Chestnut Brown")} />}
                            />
                            {errors.eyeColor && <p className="text-sm text-red-500">{errors.eyeColor.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Body Type")} *</Label>
                            <Controller
                                name="bodyType"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="bodyType" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Slim")} />}
                            />
                            {errors.bodyType && <p className="text-sm text-red-500">{errors.bodyType.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Appearance")} *</Label>
                            <Controller
                                name="appearance"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="appearance" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Attractive")} />}
                            />
                            {errors.appearance && <p className="text-sm text-red-500">{errors.appearance.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Intelligence")} *</Label>
                            <Controller
                                name="intelligence"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="intelligence" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. High")} />}
                            />
                            {errors.intelligence && <p className="text-sm text-red-500">{errors.intelligence.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Clothing Style(s)")} *</Label>
                            <Controller
                                name="clothing"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="clothingStyles" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Casual")} />}
                            />
                            {errors.clothing && <p className="text-sm text-red-500">{errors.clothing.message}</p>}
                        </div>

                        <div>
                            <Label>{t("Mother Tongue")} *</Label>
                            <Controller
                                name="motherTongue"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="motherTongue" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. Dutch")} />}
                            />
                            {errors.motherTongue && <p className="text-sm text-red-500">{errors.motherTongue.message}</p>}
                        </div>

                        <div>
                            <Controller
                                name="knownLanguages"
                                control={control}
                                render={({ field }) => <AttributeMultiSelect label={t("Known Languages")} attributeKey="knownLanguages" value={field.value || []} onChange={field.onChange} placeholder={t("Select languages")} />}
                            />
                            {errors.knownLanguages && <p className="text-sm text-red-500">{errors.knownLanguages.message}</p>}
                        </div>

                        <div className="relative">
                            <Label>{t("Weight")} *</Label>
                            <Controller
                                name="weight"
                                control={control}
                                render={({ field }) => <Slider value={Number(field.value)} onValueChange={(v) => field.onChange(String(v))} max={100} step={1} unit={t("kg")} className="mt-8 mb-2" />}
                            />
                            {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
                        </div>

                        <div className="relative">
                            <Label>{t("Height")} *</Label>
                            <Controller
                                name="height"
                                control={control}
                                render={({ field }) => <Slider value={Number(field.value)} onValueChange={(v) => field.onChange(String(v))} min={0} max={300} step={1} unit={t("cm")} className="mt-8 mb-2" />}
                            />
                            {errors.height && <p className="text-sm text-red-500">{errors.height.message}</p>}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="space-y-6">
                        <div className="flex flex-row gap-4 w-full items-center">
                            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">{t("Education")}</h4>
                            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
                        </div>
                        <div>
                            <Label>{t("Education")}</Label>
                            <Controller
                                name="education"
                                control={control}
                                render={({ field }) => <AttributeSelect attributeKey="education" value={field.value || undefined} onChange={field.onChange} placeholder={t("e.g. University degree")} />}
                            />
                            {errors.education && <p className="text-sm text-red-500">{errors.education.message}</p>}
                        </div>
                    </div>

                    {/* Career Section */}
                    <div className="space-y-6">
                        <div className="flex flex-row gap-4 w-full items-center">
                            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">{t("Career")}</h4>
                            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>{t("Primary Specialization")}</Label>
                                <Controller
                                    name="primarySpecialization"
                                    control={control}
                                    render={({ field }) => <AttributeSelect attributeKey="primarySpecialization" value={field.value || undefined} onChange={field.onChange} placeholder={t("Select Specialization")} />}
                                />
                                {errors.primarySpecialization && <p className="text-sm text-red-500">{errors.primarySpecialization.message}</p>}
                            </div>
                            <div>
                                <Label>{t("Department")}</Label>
                                <Controller
                                    name="department"
                                    control={control}
                                    render={({ field }) => <AttributeSelect attributeKey="department" value={field.value || undefined} onChange={field.onChange} placeholder={t("Select Department")} />}
                                />
                                {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6 my-16 lg:my-26">
                        <Button variant="outline" onClick={handleBack} size="lg" type="button">
              <span className="mr-1">
                <ArrowLeft />
              </span>
                            {t("Back")}
                        </Button>
                        <Button variant="theme" size="lg" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? t("Processing...") : t("Next")}
                            <span className="ml-1">
                <ArrowRight />
              </span>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
