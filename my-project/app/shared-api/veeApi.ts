import {getRequest, patchRequest} from "@/shared-lib";
import {VeeDto} from "@/app/admin/(dashboard)/frontend-settings/_types/vee";

type Payload = Partial<VeeDto>

export async function getVeeSettings(): Promise<VeeDto | undefined> {
    return await getRequest<VeeDto>({ url: 'setting/vee-page' });
}

export async function patchVeeSettings(data: Payload): Promise<VeeDto> {
    const r = await patchRequest<Payload>({ url: 'setting/vee-page', data });
    return r.response;
}