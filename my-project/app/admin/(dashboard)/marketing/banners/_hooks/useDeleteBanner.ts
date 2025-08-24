import { deleteBanner } from "@/app/admin/(dashboard)/marketing/banners/_api/bannerApi";
import { showError } from "@/shared-lib";
import { showSuccess } from "@/shared-lib";
import useSWRMutation from "swr/mutation";
import { useBanners } from "./useBanners";
import { useTranslation } from "react-i18next";

export const useDeleteBanner = () => {
    const { mutate } = useBanners();
    const { t } = useTranslation();


    const { trigger, isMutating, error } = useSWRMutation(
        "deleteBanner",
        async (_: string, { arg: id }: { arg: string }) => {
            return await deleteBanner(id);
        },
        {
            onSuccess: async () => {
                showSuccess(t("Banner deleted successfully!"));
                await mutate(); // Revalidate banners list
            },
            onError: (error: Error) => {
                showError({ message: error.message });
            },
        }
    );

    const deleteBannerById = async (id: string) => {
        await trigger(id);
    };

    return {
        deleteBannerById,
        isDeleting: isMutating,
        error,
    };
};