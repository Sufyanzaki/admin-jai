"use client"

import {showSuccess} from '@/shared-lib';
import {useState} from "react";
import {postLike} from '../notifications/_api/likes';
import Swal from "sweetalert2";
import {useTranslation} from 'react-i18next';

export const useSendLike = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { t } = useTranslation();

    const trigger = async (receiverId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postLike({ receiverId });
            if (res) {
                showSuccess(t('Like sent successfully!'));
            }
            return res;
        } catch (err: unknown) {
            // @ts-expect-error err is unknown
            Swal.fire({ html: `<p style="font-weight: 500; font-size: 1.5rem; margin: 0;">${err.message}</p>` }).finally();
            // @ts-expect-error err is unknown
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
