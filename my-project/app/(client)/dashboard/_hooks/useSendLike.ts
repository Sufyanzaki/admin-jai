import { showError, showSuccess } from '@/shared-lib';
import { useState } from "react";
import { postLike } from '../notifications/_api/likes';
import { useTranslation } from 'react-i18next';

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
            if (err instanceof Error) {
                const apiMessage = err?.message;
                showError({ message: apiMessage });
                setError(err);
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
