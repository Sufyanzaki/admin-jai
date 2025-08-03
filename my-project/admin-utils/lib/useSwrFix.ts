"use client"

import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { useEffect, useState } from 'react';

export type UseSWRFixProps<T, U> = {
    key: string | string[] | (() => string | string[] | null);
    fetcher: () => Promise<T>;
    transform?: (data: T) => U;
    config?: SWRConfiguration<T>;
    enabled?: boolean;
};

export function useSWRFix<T, U = T>({
                                        key,
                                        fetcher,
                                        transform = (data: T) => data as unknown as U,
                                        config = {},
                                        enabled = true,
                                    }: UseSWRFixProps<T, U>) {
    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR<T>(enabled ? key : null, fetcher, {
        revalidateOnFocus: false,
        ...config,
    });

    const [localData, setLocalData] = useState<U | undefined>(undefined);
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setLocalData(transform(data));
            setLocalLoading(false);
        } else if (error) {
            setLocalLoading(false);
        } else if (enabled) {
            setLocalLoading(isLoading || isValidating);
        }
    }, [data, error, isLoading, isValidating, enabled]);

    return {
        data: localData,
        loading: localLoading,
        error,
        mutate,
        refetch: () => mutate(),
    };
}