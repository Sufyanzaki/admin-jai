import {useSWRFix} from "@/shared-lib";
import {getUserTrackingId} from "@/lib/access-token";
import {useParams} from "next/navigation";
import {getUserLocation} from "@/app/shared-api/livingApi";

export const useLiving = (userIdProp?:string) => {

    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const tracker = getUserTrackingId();
    const allowThisTab = tracker?.living;
    const userId = userIdProp ?? (allowThisTab ? (tracker?.id ?? id) : null);

    const { data, loading, error, mutate } = useSWRFix({
        key: userId ? `living-${userId}` : '',
        fetcher: async () => {
            if (!userId) return null;
            return await getUserLocation(userId);
        }
    });

    return {
        living: data,
        livingLoading: loading,
        error,
        mutate
    };
};