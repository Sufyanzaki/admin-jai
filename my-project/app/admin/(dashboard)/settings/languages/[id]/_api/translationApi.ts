import {getRequest, patchRequest, postRequest} from "@/shared-lib";
import {
    LanguageTranslationsDto,
} from "@/app/admin/(dashboard)/settings/languages/[id]/_types/translation";

type Payload = Record<string, string>;
type Response = {message: string};
type PostResponse = {
    id: string;
    key: string;
    languageId: number;
    text: string;
    createdAt: string;
    updatedAt: string;
};

export async function getTranslationDetails(id: string, page: number = 1, search?: string): Promise<LanguageTranslationsDto> {
    const params = new URLSearchParams();
    params.append('limit', '50');
    params.append('page', page.toString());
    
    if (search) {
        params.append('search', search);
    }

    return await getRequest({
        url: `setting/translation/${id}?${params.toString()}`,
        useAuth: true
    })
}

export async function updateTranslation(id: string, props: Payload): Promise<Response | undefined> {
    const r = await patchRequest<Payload>({
        url: `setting/translation/${id}`,
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function postTranslation(props: Payload): Promise<PostResponse | undefined> {
    const r = await postRequest<Payload>({
        url: `setting/translation`,
        data: props,
        useAuth: true
    });
    return r.response;
}