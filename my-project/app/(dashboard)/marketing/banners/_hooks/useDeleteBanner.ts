import { deleteBanner } from "@/app/(dashboard)/marketing/banners/_api/deleteBanner";
import { showError } from "@/admin-utils/lib/formErrors";
import { showSuccess } from "@/admin-utils/lib/formSuccess";
import useSWRMutation from "swr/mutation";
import { useBanners } from "./useBanners";

export const useDeleteBanner = () => {
    const { mutate } = useBanners();

    const { trigger, isMutating, error } = useSWRMutation(
        "deleteBanner",
        async (_: string, { arg: id }: { arg: string }) => {
            return await deleteBanner(id);
        },
        {
            onSuccess: async () => {
                showSuccess("Banner deleted successfully!");
                await mutate(); // Revalidate banners list
            },
            onError: (error: any) => {
                showError({ message: error.message });
            },
        }
    );

    // deleteBannerById returns a promise so UI can await it
    const deleteBannerById = async (id: string) => {
        await trigger(id);
    };

    return {
        deleteBannerById,
        isDeleting: isMutating,
        error,
    };
};