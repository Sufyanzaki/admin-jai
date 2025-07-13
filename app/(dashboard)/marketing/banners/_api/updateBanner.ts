import {patchRequest} from "@/admin-utils";

type UpdateBannerProps = {
    name: string;
    link: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    cpm: number;
    page: string;
    isActive: boolean;
}

export async function updateBanner(id: string, props: UpdateBannerProps): Promise<{status: number} | undefined> {
    const r = await patchRequest<UpdateBannerProps>({
        url: `banner/${id}`,
        data: props,
        useAuth: true
    });
    return { status: r.status }
} 