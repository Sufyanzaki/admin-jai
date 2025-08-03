"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import {Currency, patchCurrency} from "@/app/(dashboard)/settings/other-settings/_api/currencies";
import {useSWRConfig} from "swr";
import {useEffect} from "react";
import {useCurrencyDetails} from "@/app/(dashboard)/settings/other-settings/_hooks/useCurrencyDetails";

const currencySchema = z.object({
    currencyName: z.string().min(2, "Currency name is required"),
    currencyCode: z.string().min(2, "Currency code is required"),
    symbol: z.string().min(1, "Currency symbol is required"),
    textDirection: z.string().min(1, "Text direction is required"),
});

export type CurrencyFormValues = z.infer<typeof currencySchema>;

export default function useCurrencyEditForm(editId: string) {

    const { currency: editCurrency, loading:currencyLoading } = useCurrencyDetails(editId);
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
                showError({ message: error.message });
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

            showSuccess("Currency updated successfully!");
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
