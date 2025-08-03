import { getRequest, patchRequest } from "@/admin-utils";
import { TermsSettingsDto } from "../_types/tosTypes";
import {VeeDto} from "@/app/(dashboard)/frontend-settings/_types/vee";

export async function getVeeSettings(): Promise<VeeDto | undefined> {
    return await getRequest<VeeDto>({ url: 'setting/vee-page' });
}

export async function patchVeeSettings(data: Partial<VeeDto>): Promise<any> {
    const r = await patchRequest<Partial<VeeDto>>({ url: 'setting/vee-page', data });
    return r.response;
}