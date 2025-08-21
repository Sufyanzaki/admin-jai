import {showError, showSuccess} from '@/shared-lib';
import {useState} from "react";
import {postImageRequest} from '../_api/imageRequestApi';

export const useImageRequest = () => {
    const [requestLoading, setRequestLoading] = useState(false);
    const [requestError, setRequestError] = useState<Error | null>(null);

    const requestTrigger = async (targetId: string) => {
        setRequestLoading(true);
        setRequestError(null);

        try {
            const res = await postImageRequest({targetId});
            if (res) {
                showSuccess('Image Request sent successfully!');
            }
            return res;
        } catch (err) {
            showError({
                message: requestError instanceof Error
                    ? requestError.message
                    : 'An error occurred while liking this profile'
            });
            setRequestError(err as Error);
            throw err;
        } finally {
            setRequestLoading(false);
        }
    };

    return { requestTrigger, requestLoading, requestError };
};
