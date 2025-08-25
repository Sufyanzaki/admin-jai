"use client";

import {Button} from "@/components/client/ux/button";
import {Controller} from "react-hook-form";
import useHobbiesForm from "@/app/(client)/dashboard/settings/account/_hooks/useHobbiesForm";
import {AttributeMultiSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";
import { useTranslation } from "react-i18next";

export function HobbyInterest() {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        onSubmit,
        isLoading,
        errors,
    } = useHobbiesForm();

    return (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                {t("Hobbies and Interests")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="sports"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("Sports")} *`}
                                attributeKey="sports"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select Sports")}
                            />
                        )}
                    />
                    {errors.sports && (
                        <p className="text-sm text-red-500">{errors.sports.message}</p>
                    )}
                </div>
                <div>
                    <Controller
                        name="music"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("Music")} *`}
                                attributeKey="music"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select Music")}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="kitchen"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("Cooking")} *`}
                                attributeKey="kitchen"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select Kitchen")}
                            />
                        )}
                    />
                    {errors.kitchen && (
                        <p className="text-sm text-red-500">{errors.kitchen.message}</p>
                    )}
                </div>
                <div>
                    <Controller
                        name="reading"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("Reading")} *`}
                                attributeKey="reading"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select")}
                            />
                        )}
                    />
                    {errors.reading && (
                        <p className="text-sm text-red-500">{errors.reading.message}</p>
                    )}
                </div>
                <div>
                    <Controller
                        name="tvShows"
                        control={control}
                        render={({ field }) => (
                            <AttributeMultiSelect
                                label={`${t("TV Shows")} *`}
                                attributeKey="tvShows"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={t("Select")}
                            />
                        )}
                    />
                    {errors.tvShows && (
                        <p className="text-sm text-red-500">{errors.tvShows.message}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? t("Updating...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}