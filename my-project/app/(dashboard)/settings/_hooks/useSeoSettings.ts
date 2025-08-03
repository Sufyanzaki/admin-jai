import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import {getSeoSettings, PostSeoSettingsPayload} from "@/app/(dashboard)/settings/_api/seoSettings";

export function useSeoSettings() {
    const { data, error, loading, mutate } = useSWRFix<PostSeoSettingsPayload>({
        key: "getSeoSettings",
        fetcher: getSeoSettings,
    });

    return {
        data,
        error,
        loading,
        mutate,
    };
}
