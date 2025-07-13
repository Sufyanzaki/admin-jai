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
        console.log('Calling getAllBanners API...');
        const response = await getRequest<BannersResponse>({
            url: 'banner',
            useAuth: true
        });
        console.log('getAllBanners API response:', response);
        return response;
    } catch (error) {
        console.error('getAllBanners API error:', error);
        throw error;
    }
} 