import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {
    LanguageTranslationsDto,
    TranslationDto
} from "@/app/admin/(dashboard)/settings/languages/[id]/_types/translation";

type Payload = Partial<TranslationDto>;

export async function getTranslationDetails(id: string): Promise<LanguageTranslationsDto> {
    return await getRequest({
        url: `setting/translation/${id}`,
        useAuth: true
    })
}

export async function updateTranslation(id: string, props: Payload): Promise<TranslationDto | undefined> {
    const r = await patchRequest<Payload>({
        url: `setting/translation/${id}`,
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function postTranslation(props: Payload): Promise<TranslationDto | undefined> {
    const r = await postRequest<Payload>({
        url: `setting/translation`,
        data: props,
        useAuth: true
    });
    return r.response;
}