import {postRequest} from "@/shared-lib";

type CreateBannerProps = {
    name: string;
    link: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    cpm: number;
    page: string;
    isActive: boolean;
}

export async function createBanner(props: CreateBannerProps): Promise<{status: number} | undefined> {
    const r = await postRequest<CreateBannerProps>({
        url: 'banner',
        data: props,
        useAuth: true
    });
    return { status: r.status }
} 