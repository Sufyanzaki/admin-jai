import {useSWRFix} from "@/shared-lib";
import {getPhotoDetails} from "../_api/photoSettingsApi";
import {PhotoDto} from "@/app/(client)/dashboard/settings/photo/_types/photo";

export const usePhotoSettings = () => {

    const { data, loading, error, mutate } = useSWRFix<PhotoDto>({
        key: "photo-settings",
        fetcher: async () => {
            const response = await getPhotoDetails();
            if (!response) {
                throw new Error('Failed to fetch photo settings');
            }
            return response;
        }
    });

    return {
        photoSettings:data,
        photoSettingsLoading: loading,
        error,
        mutate
    };
};