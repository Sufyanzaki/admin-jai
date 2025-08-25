"use client";

import LocationSearchInput from "@/components/client/location-search";
import { Button } from "@/components/client/ux/button";
import usePlaceForm from "@/app/(client)/dashboard/settings/account/_hooks/usePlaceForm";
import Preloader from "@/components/shared/Preloader";
import { MemberLocation } from "@/app/shared-types/member";
import { useTranslation } from "react-i18next";
import type React from "react";

export function Place() {
    const { t } = useTranslation();

    const {
        errors,
        handleSubmit,
        onSubmit,
        isLoading,
        isFetching,
        watch,
        setValue
    } = usePlaceForm();

    const city = watch("city");
    const state = watch("state");
    const country = watch("country");

    const currentLocation =
        city || state || country ? { city, state, country } : null;

    const handleLocationSelect = (location: Partial<MemberLocation>) => {
        setValue("city", location.city);
        location.state && setValue("state", location.state);
        location.country && setValue("country", location.country);
    };

    if (isFetching) {
        return (
            <div className="flex items-center flex-col justify-center h-64 my-28">
                <Preloader />
                <p className="text-sm">{t("Loading")}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(v => onSubmit(v))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                {t("Place")}
            </h3>
            <div className="grid md:grid-cols-1 gap-4">
                <div className="border border-app-border rounded-[5px]">
                    <LocationSearchInput
                        value={currentLocation}
                        onSelect={handleLocationSelect}
                        placeholder={t("Search for your city, state, or country")}
                    />
                    {(errors.state || errors.country) && (
                        <p className="text-sm text-red-500">{t("Invalid Address")}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? t("Processing...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}
