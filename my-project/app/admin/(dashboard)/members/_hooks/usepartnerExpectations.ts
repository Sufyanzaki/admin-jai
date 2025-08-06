'use client';

import { useSWRFix } from "@/shared-lib";
import { getUser } from "../../../../shared-api/createUser";
import { getUserTrackingId } from "@/lib/access-token";
import { useParams } from "next/navigation";
import {getPartnerExpectations} from "@/app/shared-api/partnerExpectationApi";

export const usePartnerExpectations = () => {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0];

    const tracker = getUserTrackingId();
    const userId = tracker?.id ?? id;

    const { data, loading, error, mutate } = useSWRFix({
        key: userId ? `user-${userId}-expectations` : '',
        fetcher: async () => {
            if (!userId) return null;
            return await getPartnerExpectations(userId);
        },
    });

    return {
        expectations: data,
        expectationLoading: loading,
        error,
        mutate,
    };
};
