import {useSWRFix} from "@/shared-lib";
import {useTranslation} from "react-i18next";
import {getVisits} from "@/app/(client)/dashboard/visits/_api/visitsApi";
import {VisitResponseDto} from "@/app/(client)/dashboard/visits/_type/visit";

export const useVisits = () => {
    const { t } = useTranslation();

    const { data, loading, error, mutate } = useSWRFix<VisitResponseDto>({
        key: 'my-visits',
        fetcher: async () => {
            const response = await getVisits();
            if (!response) {
                throw new Error(t('Failed to fetch banner details'));
            }
            return response;
        }
    });

    return {
        visits: data?.data ?? [],
        visitLoading: loading,
        error,
        mutate
    };
};