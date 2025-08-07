import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {BasicLanguageDto} from "@/app/shared-types/basic-languages";

type Payload = Partial<BasicLanguageDto>

export async function patchLanguageStatus({ id, isActive }: Payload): Promise<BasicLanguageDto> {
    const r = await patchRequest<Payload>({
        url: `setting/language/${id}`,
        data: { isActive },
        useAuth: true,
    });
    return r.response;
}

export async function getLanguages(): Promise<BasicLanguageDto[]> {
    return getRequest({
        url: "setting/language",
        useAuth: true,
    });
}

export async function addLanguage(payload: Payload): Promise<BasicLanguageDto> {
    const r = await postRequest<Payload>({
        url: "setting/language",
        data: payload,
        useAuth: true,
    });
    return r.response;
} 