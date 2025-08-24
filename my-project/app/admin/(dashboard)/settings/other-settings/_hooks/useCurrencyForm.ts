import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { Currency, postCurrency } from "@/app/admin/(dashboard)/settings/other-settings/_api/currencies";
import { useSWRConfig } from "swr";
import { useTranslation } from "react-i18next";


type CreateCurrencyProps = CurrencyFormValues;

export default function useCurrencyForm() {
    const { t } = useTranslation();
    const currencySchema = z.object({
        currencyName: z.string().min(2, t("Currency name is required")),
        currencyCode: z.string().min(2, t("Currency code is required")),
        symbol: z.string().min(1, t("Currency symbol is required")),
        textDirection: z.string().min(1, t("Text direction is required")),
    });

     type CurrencyFormValues = z.infer<typeof currencySchema>;

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

    const { trigger, isMutating } = useSWRMutation(
        "createCurrency",
        async (_, { arg }: { arg: CreateCurrencyProps }) => {
            return await postCurrency(arg);
        },
        {
            onError: (error: Error) => {
                showError({ message: error.message });
                console.error("Currency creation error:", error);
            },
            revalidate: false,
            populateCache: false,
        }
    );

    const onSubmit = async (
        values: CurrencyFormValues,
        callback?: (data: Currency | undefined) => void
    ) => {
        const result = await trigger(values);

        if (result) {
            globalMutate("currencies", (prev?: Currency[]) => {
                if (!prev) return [result];
                return [result, ...prev];
            }, false);

            showSuccess(t("Currency created successfully!"));
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
    };
}
