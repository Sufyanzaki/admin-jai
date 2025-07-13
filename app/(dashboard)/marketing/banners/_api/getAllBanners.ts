import {getRequest} from "@/admin-utils";

export type Banner = {
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

export type BannersResponse = Banner[];

export async function getAllBanners(): Promise<BannersResponse | undefined> {
    try {
        return await getRequest<BannersResponse>({
            url: 'banner',
            useAuth: true
        });
    } catch (error) {
        console.error('getAllBanners API error:', error);
        throw error;
    }
} 