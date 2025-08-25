"use client";

import { Textarea } from "@/components/client/ux/textarea";
import { Button } from "@/components/client/ux/button";
import useAboutMeForm from "@/app/(client)/dashboard/settings/account/_hooks/useAboutMeForm";
import Preloader from "@/components/shared/Preloader";
import {useTranslation} from "react-i18next";

export function AboutMe() {
    const { t } = useTranslation();
    const {
        errors,
        handleSubmit,
        onSubmit,
        isLoading,
        register,
        isFetching
    } = useAboutMeForm();

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
                {t("About me")}
            </h3>

            <Textarea
                placeholder={t("Vertel iets over jezelf...")}
                className="min-h-[100px]"
                {...register("shortDescription")}
            />
            {errors.shortDescription && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.shortDescription.message as string}
                </p>
            )}

            <div className="flex justify-end mt-2">
                <Button
                    size="lg"
                    variant="theme"
                    type="submit"
                    disabled={isLoading || isFetching}
                >
                    {isLoading || isFetching ? t("Updating...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}