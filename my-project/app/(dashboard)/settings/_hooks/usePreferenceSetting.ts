import {useSWRFix} from "@/admin-utils/lib/useSwrFix";
import {getPreferenceSettings, SystemSettingsDto} from "@/app/(dashboard)/settings/_api/preferences";

export function usePreferenceSettings() {
    const { data, error, loading, mutate } = useSWRFix<SystemSettingsDto>({
        key: "preference-setting",
        fetcher: getPreferenceSettings,
    });

    return {
        data,
        error,
        loading,
        mutate,
    };
}
