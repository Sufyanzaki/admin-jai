import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { Currency, postCurrency } from "@/app/(dashboard)/settings/other-settings/_api/currencies";
import {useSWRConfig} from "swr";

const currencySchema = z.object({
    currencyName: z.string().min(2, "Currency name is required"),
    currencyCode: z.string().min(2, "Currency code is required"),
    symbol: z.string().min(1, "Currency symbol is required"),
    textDirection: z.string().min(1, "Text direction is required"),
});

export type CurrencyFormValues = z.infer<typeof currencySchema>;

type CreateCurrencyProps = CurrencyFormValues;

export default function useCurrencyForm() {

    const { mutate:globalMutate } = useSWRConfig();

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

            showSuccess("Currency created successfully!");
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
