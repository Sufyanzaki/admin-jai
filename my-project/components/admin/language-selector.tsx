"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu";
import { Button } from "@/components/admin/ui/button";
import { useLanguages } from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";
import { useTranslation } from "react-i18next";
import useActiveLanguage from "@/app/(client)/dashboard/settings/account/_hooks/useActiveLanguage";
import Preloader from "../shared/Preloader";
import { Controller } from "react-hook-form";
import Image from "next/image";

export function LanguageSelector() {
  const { t } = useTranslation();
  const { languages, languagesLoading } = useLanguages();

  const {
    handleSubmit,
    onSubmit,
    control,
    errors,
    isLoading,
    isFetching,
    activeLanguage, // { id, code, name }
  } = useActiveLanguage();

  if (languagesLoading || isFetching) {
    return (
      <div className="flex items-center gap-2">
        <Preloader />
        <p className="text-sm">{t("Loading...")}</p>
      </div>
    );
  }

  return (
    <>
      <Controller
        name="activeLanguageId"
        control={control}
        render={({ field }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-md"
                disabled={isLoading}
              >
                {activeLanguage ? (
                  <>
                    <Image
                      src={`https://flagcdn.com/${activeLanguage.code}.svg`}
                      width={20}
                      height={20}
                      alt={activeLanguage.name}
                      className="rounded-sm"
                    />
                    <span>{activeLanguage.name}</span>
                  </>
                ) : (
                  <span>{t("Select Language")}</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages?.map((lang) => (
                <DropdownMenuItem
                  key={lang.id}
                  onClick={() => {
                    field.onChange(Number(lang.id))
                    handleSubmit(onSubmit)();
                  }}

                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    src={`https://flagcdn.com/${lang.code}.svg`}
                    width={20}
                    height={20}
                    alt={lang.name}
                    className="rounded-sm"
                  />
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
      {errors?.activeLanguageId && (
        <p className="text-red-500 text-sm mt-1">
          {t("Error")}: {errors.activeLanguageId.message}
        </p>
      )}
    </>
  );
}
