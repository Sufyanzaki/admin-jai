import { showError, showSuccess } from '@/shared-lib';
import { postLike } from './../_api/postLike';
import { useState } from "react";

export const useSendLike = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const trigger = async (receiverId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postLike({ receiverId });
            if (res) {
                showSuccess('Like sent successfully!');
            }
            return res;
        } catch (err: any) {
            const apiMessage = err?.message;

            showError({
                message: apiMessage || (err instanceof Error ? err.message : 'An error occurred while liking this profile')
            });

            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
