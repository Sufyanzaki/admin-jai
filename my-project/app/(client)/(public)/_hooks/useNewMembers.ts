import { useSWRFix } from "@/shared-lib";
import { newUsers } from "@/app/shared-api/userApi";
import { MemberProfile } from "@/app/shared-types/member";
import { useTranslation } from "react-i18next";

export const useNewMembers = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<{ ten: MemberProfile[] }>({
        key: "new-members",
        fetcher: async () => {
            const response = await newUsers();
            if (!response) {
                throw new Error(t("Failed to fetch new members"));
            }
            return response;
        },
    });

    return {
        users: data?.ten ?? [],
        userLoading: loading,
        error,
        mutate,
    };
};
