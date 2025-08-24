"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";

import { patchCurrencyFormat } from "@/app/admin/(dashboard)/settings/other-settings/_api/currencies";
import { useTranslation } from "react-i18next";
import { useFormat } from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFormat";


export default function useFormatForm() {
    const { t } = useTranslation();

    const formatSchema = z.object({
        defaultCurrencyId: z.number().min(1, t("Default currency is required")),
        symbolFormat: z.string().min(1, t("Symbol format is required")),
        decimalSeparator: z.string().min(1, t("Decimal separator is required")),
        decimalPlaces: z.number().min(1, t("Decimal places are required")),
    });

    type FormatFormValues = z.infer<typeof formatSchema>;

    const {
        handleSubmit,
        setValue,
        watch,
        control,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormatFormValues>({
        resolver: zodResolver(formatSchema),
        defaultValues: {
            defaultCurrencyId: 0,
            symbolFormat: "",
            decimalSeparator: "",
            decimalPlaces: 0,
        },
        mode: "onBlur",
    });

    const { data: formatData, loading } = useFormat();

    useEffect(() => {
        if (formatData) {
            reset({
                defaultCurrencyId: formatData.defaultCurrencyId || 0,
                symbolFormat: formatData.symbolFormat || "",
                decimalSeparator: formatData.decimalSeparator || "",
                decimalPlaces: formatData.decimalPlaces || 0,
            });
        }
    }, [formatData, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "currencyFormatSettings",
        async (_: string, { arg }: { arg: FormatFormValues }) => {
            return await patchCurrencyFormat(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error("Currency format error:", error);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (values: FormatFormValues, callback: () => void) => {
        const result = await trigger(values);
        if (result) {
            showSuccess(t("Currency format saved successfully!"));
            reset(values);
            callback();
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating || loading,
        setValue,
        watch,
        reset,
        control,
        register,
        formatLoading: loading,
    };
}
