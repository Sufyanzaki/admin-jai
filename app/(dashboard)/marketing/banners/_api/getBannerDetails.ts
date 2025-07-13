import {getRequest} from "@/admin-utils";

export type BannerDetails = {
    id: number;
    name: string;
    link: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    cpm: number;
    page: string;
    isActive: boolean;
    createdAt: string;
}

export async function getBannerDetails(id: string): Promise<BannerDetails | undefined> {
    return await getRequest<BannerDetails>({
        url: `banner/${id}`,
        useAuth: true
    })
} 