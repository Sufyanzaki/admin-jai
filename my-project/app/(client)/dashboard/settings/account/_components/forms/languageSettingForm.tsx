'use client'
import { Label } from "@/components/client/ux/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import Image from "next/image";
import { Button } from "@/components/client/ux/button";
import { useTranslation } from "react-i18next";
import { useLanguages } from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";
import useActiveLanguage from "../../_hooks/useActiveLanguage";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import i18n from "@/i18n";

export default function LanguageSettingForm() {
    const { t } = useTranslation();
    const { languages, languagesLoading } = useLanguages();
    const {
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading,
        isFetching,
        activeLanguage, // full object: { id, code, name }
    } = useActiveLanguage();

    if (languagesLoading || isFetching) {
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">{t("Loading...")}</p>
            </div>
        );
    }
console.log(languages)
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-end gap-4"
        >
            <div className="w-full sm:w-1/2 lg:w-2/5">
                <Label htmlFor="language">{t("Select Language")}</Label>
                <Controller
                    name="activeLanguageId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            disabled={isLoading}
                            value={String(field.value)}
                            onValueChange={(val) => {
                                field.onChange(Number(val));
                            }}
                        >
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder={t("Select language")} />
                            </SelectTrigger>
                            <SelectContent>
                                {languages?.map((lang) => (
                                    <SelectItem key={lang.id} value={String(lang.id)}>
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={`https://flagcdn.com/${lang.code}.svg`}
                                                width="20"
                                                height="20"
                                                alt={lang.name}
                                            />
                                            {lang.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors?.activeLanguageId && (
                    <p className="text-red-500 text-sm">
                        {t("Error")}: {errors.activeLanguageId.message}
                    </p>
                )}
            </div>

            <Button variant="theme" size="lg" disabled={isLoading}>
                {isLoading ? t("Saving...") : t("Save")}
            </Button>
        </form>
    );
}
