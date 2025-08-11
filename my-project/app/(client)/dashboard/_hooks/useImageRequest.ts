import {showError, showSuccess} from '@/shared-lib';
import {postLike} from './../_api/postLike';
import {useState} from "react";
import { postImageRequestRespond } from '../_api/postImageRequestResponsd';
import { postImageRequest } from '../_api/postImageRequest';

export const useImageRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const trigger = async (targetId: number) => {
        setLoading(true);
        setError(null);

        try {
            const res = await postImageRequest({targetId});
            if (res) {
                showSuccess('Image Request sent successfully!');
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
