import { useSWRFix } from "@/shared-lib";
import { getBlockedProfiles } from "../_api/getBlockedProfiles";
import { MemberProfile } from "@/app/shared-types/member";
import { useTranslation } from "react-i18next";

export const useBlockedProfiles = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<MemberProfile[]>({
        key: "blocked-profiles",
        fetcher: async () => {
            const response = await getBlockedProfiles();
            if (!response) {
                throw new Error(t("Failed to fetch blocked profiles"));
            }
            return response;
        },
    });

    return {
        blockedProfiles: data,
        blockedLoading: loading,
        error,
        mutate,
    };
};
