import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {PhotoDto} from "@/app/(client)/dashboard/settings/photo/_types/photo";

type Payload = Partial<PhotoDto>;

export async function uploadPhoto(props: Payload): Promise<PhotoDto | undefined> {
    const r = await postRequest<Payload>({
        url: 'photo-setting',
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function getPhotoDetails(): Promise<PhotoDto> {
    return await getRequest({
        url: `photo-setting`,
        useAuth: true
    });
}

export async function updatePhoto(props: Payload): Promise<PhotoDto> {
    const r = await patchRequest<Payload>({
        url: `photo-setting`,
        data: props,
        useAuth: true
    });
    return r.response;
}