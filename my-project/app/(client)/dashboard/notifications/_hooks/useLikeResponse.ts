import { showError, showSuccess } from '@/shared-lib';
import { useState } from "react";
import { LikeStatus, useLikesReceived } from './useLikesReceived';
import { postLikeResponse } from '../_api/likes';
import { useTranslation } from 'react-i18next';

export const useLikeResponse = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { mutate } = useLikesReceived(LikeStatus.PENDING);

    const trigger = async (action: string, userId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postLikeResponse({ status: action }, userId);
            if (res) {
                showSuccess(t('Response sent successfully!'));
                mutate().finally();
            }
            return res;
        } catch (err) {
            showError({
                message: error instanceof Error
                    ? error.message
                    : t('An error occurred while liking this profile')
            });
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
