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
            if (res) throw new Error('Image Request sent successfully!');
            showSuccess('Image Request sent successfully!');
            return res;
        } catch (err : unknown) {
            // @ts-expect-error err is unknown
            showError({ message: err.message});
            setRequestError(err as Error);
            throw err;
        } finally {
            setRequestLoading(false);
        }
    };

    return { requestTrigger, requestLoading, requestError };
};
