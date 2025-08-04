import { useSWRFix } from "@/shared-lib";
import { getCurrencyById, Currency } from "../_api/currencies";

export function useCurrencyDetails(id: string | undefined) {
    const { data, loading, error, mutate } = useSWRFix<Currency>({
        key: id ? `currency-${id}` : "",
        fetcher: () => getCurrencyById(id!),
        enabled: !!id,
    });

    return {
        currency: data,
        loading,
        error,
        mutate,
    };
}
