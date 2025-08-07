import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {BannerDto} from "@/app/admin/(dashboard)/marketing/banners/_types/bannerTypes";

type Payload = Partial<BannerDto>;

export async function createBanner(props: Payload): Promise<{status: number} | undefined> {
    const r = await postRequest<Payload>({
        url: 'banner',
        data: props,
        useAuth: true
    });
    return { status: r.status }
}

export async function deleteBanner(id: string): Promise<{message: string}> {
    const r = await deleteRequest({
        url: `banner/${id}`,
        useAuth: true
    });
    return r.response
}

export async function getAllBanners(): Promise<BannerDto[] | undefined> {
    return await getRequest({
        url: 'banner',
        useAuth: true
    });
}

export async function getBannerDetails(id: string): Promise<BannerDto> {
    return await getRequest({
        url: `banner/${id}`,
        useAuth: true
    })
}

export async function updateBanner(id: string, props: Payload): Promise<BannerDto | undefined> {
    const r = await patchRequest<Payload>({
        url: `banner/${id}`,
        data: props,
        useAuth: true
    });
    return r.response;
}