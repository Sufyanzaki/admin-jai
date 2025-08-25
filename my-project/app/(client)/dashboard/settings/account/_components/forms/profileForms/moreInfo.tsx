"use client";

import {Label} from "@/components/client/ux/label";
import {Button} from "@/components/client/ux/button";
import useMoreInfoForm from "@/app/(client)/dashboard/settings/account/_hooks/useMoreInfoForm";
import {Controller} from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import {AttributeMultiSelect, AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";
import { useTranslation } from "react-i18next";

export function MoreInfo() {
    const { t } = useTranslation();
    const {
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading,
        isFetching
    } = useMoreInfoForm();

    if(isFetching){
        return (
            <div className="flex items-center flex-col justify-center h-64 my-28">
                <Preloader/>
                <p className="text-sm">{t("Loading")}</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                {t("More Information")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label>{t("Education")} *</Label>
                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="education"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder={t("e.g. University degree")}
                            />
                        )}
                    />
                    {errors.education && (
                        <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>
                    )}
                </div>
                <div>
                    <Label>{t("Department")} *</Label>
                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="department"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder={t("Select Department")}
                            />
                        )}
                    />
                    {errors.department && (
                        <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
                    )}
                </div>
                <div>
                    <Label>{t("Primary Specialization")} *</Label>
                    <Controller
                        name="primarySpecialization"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="primarySpecialization"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder={t("Select Specialization")}
                            />
                        )}
                    />
                    {errors.primarySpecialization && (
                        <p className="text-red-500 text-xs mt-1">{errors.primarySpecialization.message}</p>
                    )}
                </div>
                <div>
                    <Label>{t("Mother Tongue")} *</Label>
                    <Controller
                        name="motherTongue"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="motherTongue"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder={t("Select Language")}
                            />
                        )}
                    />
                    {errors.motherTongue && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.motherTongue.message}
                        </p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <Controller
                        name="knownLanguages"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("Known Languages")} *`}
                                attributeKey="knownLanguages"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select languages")}
                            />
                        )}
                    />
                    {errors.knownLanguages && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.knownLanguages.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    type="submit"
                    size="lg"
                    variant="theme"
                    disabled={isLoading || isFetching}
                >
                    {(isLoading || isFetching) ? t("Updating...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}