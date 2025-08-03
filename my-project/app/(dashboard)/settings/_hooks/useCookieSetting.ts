import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import {getCookieSettings} from "@/app/(dashboard)/settings/_api/cookieSettings";

export function useCookieSettings() {
    const { data, error, loading, mutate } = useSWRFix({
        key: "getCookieSettings",
        fetcher: getCookieSettings,
    });

    return { data, error, loading, mutate };
}
