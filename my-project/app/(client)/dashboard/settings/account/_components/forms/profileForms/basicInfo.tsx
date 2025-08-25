"use client";

import {Label} from "@/components/client/ux/label";
import {Input} from "@/components/client/ux/input";
import {Button} from "@/components/client/ux/button";
import {Controller} from "react-hook-form";
import useClientAccInfo from "@/app/(client)/dashboard/settings/account/_hooks/useClientAccInfo";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";
import { useTranslation } from "react-i18next";

export function BasicInfo() {
    const { t } = useTranslation();
    const {
        onSubmit,
        isLoading,
        isFetching,
        handleSubmit,
        register,
        control,
        errors,
    } = useClientAccInfo();

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
                {t("Basic Information")}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <Label>{t("Origin")} *</Label>
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
                        <p className="text-red-500 text-sm">{errors.origin.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Gender")} *</Label>
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
                        <p className="text-red-500 text-sm">{errors.gender.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Date of Birth")} *</Label>
                    <Input
                        type="date"
                        {...register("dob")}
                        placeholder={t("Select date")}
                    />
                    {errors.dob && (
                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Age")}</Label>
                    <Input
                        type="number"
                        {...register("age", { valueAsNumber: true })}
                        placeholder={t("Enter age")}
                    />
                    {errors.age && (
                        <p className="text-red-500 text-sm">{errors.age.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Relationship Status")}</Label>
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
                        <p className="text-red-500 text-sm">{errors.relationshipStatus.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Looking For")} *</Label>
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
                        <p className="text-red-500 text-sm">{errors.lookingFor.message}</p>
                    )}
                </div>

                <div>
                    <Label>{t("Children")} *</Label>
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
                        <p className="text-red-500 text-sm">{errors.children.message}</p>
                    )}
                </div>

            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit" size="lg" variant="theme" disabled={isLoading || isFetching}>
                    {isLoading ? t("Updating...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}