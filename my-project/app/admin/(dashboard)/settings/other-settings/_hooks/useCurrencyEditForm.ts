"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { Currency, patchCurrency } from "@/app/admin/(dashboard)/settings/other-settings/_api/currencies";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import { useCurrencyDetails } from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useCurrencyDetails";
import { useTranslation } from "react-i18next";


export default function useCurrencyEditForm(editId: string) {
    const { t } = useTranslation();

    const currencySchema = z.object({
        currencyName: z.string().min(2, t("Currency name is required")),
        currencyCode: z.string().min(2, t("Currency code is required")),
        symbol: z.string().min(1, t("Currency symbol is required")),
        textDirection: z.string().min(1, t("Text direction is required")),
    });

    type CurrencyFormValues = z.infer<typeof currencySchema>;

    const { currency: editCurrency, loading: currencyLoading } = useCurrencyDetails(editId);
    const { mutate: globalMutate } = useSWRConfig();

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        reset,
        watch,
        control,
    } = useForm<CurrencyFormValues>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            currencyName: "",
            currencyCode: "",
            symbol: "",
            textDirection: "ltr",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        if (editCurrency) {
            reset({
                currencyName: editCurrency.currencyName,
                currencyCode: editCurrency.currencyCode,
                symbol: editCurrency.symbol,
                textDirection: editCurrency.textDirection || "ltr",
            });
        }
    }, [editCurrency, reset]);

    const { trigger, isMutating } = useSWRMutation(
        "updateCurrency",
        async () => {
            if (!editId) throw new Error("Missing currency ID for update.");
            return await patchCurrency(editId, watch());
        },
        {
            onError: (error: Error) => {
                showError({ message: t(error.message) });
                console.error("Currency update error:", error);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (
        _values: CurrencyFormValues,
        callback?: (data: Currency | undefined) => void
    ) => {
        const result = await trigger();

        if (result) {
            globalMutate(
                "currencies",
                (prev: Currency[] = []) =>
                    prev.map((c) => (c.id === result.id ? result : c)),
                false
            );

            showSuccess(t("Currency updated successfully!"));
            reset();
            callback?.(result);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSubmitting || isMutating,
        register,
        setValue,
        watch,
        control,
        editId,
        currencyLoading
    };
}
