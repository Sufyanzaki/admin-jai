import { showError, showSuccess } from '@/shared-lib';
import { useState } from "react";
import { mutate } from 'swr';
import { unblockProfiles } from '../_api/getUnblockUser';

export const useUnblockUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const trigger = async (blockedUserId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await unblockProfiles({ blockedUserId });
            if (res) {
                showSuccess('User Unblocked successfully!');
            }
            mutate("blocked-profiles").finally();
            return res;
        } catch (err: unknown) {
            let message = 'An error occurred while Unblocking this profile';

            if (err instanceof Error) {
                message = err.message;
            }

            showError({ message });
            setError(new Error(message));
            throw err;
        }
        finally {
            setLoading(false);
        }
    };

    return { trigger, loading, error };
};
