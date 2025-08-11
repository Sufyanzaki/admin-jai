import {showError, showSuccess} from '@/shared-lib';
import {useState} from "react";
import { postLikeResponse } from '../_api/postLikeRespond';

export const useLikeResponse = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const trigger = async (action: string,userId : number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postLikeResponse({action}, userId);
            if (res) {
                showSuccess('Response sent successfully!');
            }
            return res;
        } catch (err) {
            showError({
                message: error instanceof Error
                    ? error.message
                    : 'An error occurred while liking this profile'
            });
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { trigger, loading , error };
};
