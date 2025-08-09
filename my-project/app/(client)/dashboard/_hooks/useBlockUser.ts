import { showError, showSuccess } from '@/shared-lib';
import { postLike, sendLike } from './../_api/postLike';
import { useState } from "react";
import { blockUser } from '../_api/postBlockUser';

export const useBlockUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const trigger = async (blockedUserId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await blockUser({ blockedUserId });
            if (res) {
                showSuccess('User Blocked successfully!');
            }
            return res;
        } catch (err) {
            showError({
                message: error instanceof Error
                    ? error.message
                    : 'An error occurred while blocking this profile'
            });
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
