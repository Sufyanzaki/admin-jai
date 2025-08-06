import {useSWRFix} from "@/shared-lib";
import {getUserTrackingId} from "@/lib/access-token";
import {useParams} from "next/navigation";
import {getLiving} from "@/app/admin/(dashboard)/members/_api/getLiving";

export const useLiving = () => {

    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const tracker = getUserTrackingId();
    const allowThisTab = tracker?.living;
    const userId = allowThisTab ? (tracker?.id ?? id) : null;

    const { data, loading, error, mutate } = useSWRFix({
        key: userId ? `living-${userId}` : '',
        fetcher: async () => {
            if (!userId) return null;
            return await getLiving(userId);
        }
    });

    return {
        living: data,
        livingLoading: loading,
        error,
        mutate
    };
};