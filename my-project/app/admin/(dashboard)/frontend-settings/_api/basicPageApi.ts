import {BasicPageDto} from "@/app/admin/(dashboard)/frontend-settings/_types/basicPage";
import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";

type Payload = Partial<BasicPageDto>;

export async function postBasicPage(data: Payload): Promise<BasicPageDto> {
    const r = await postRequest<Payload>({
        url: 'setting/basic-pages',
        data,
        useAuth: true,
    });
    return r.response;
}


export async function patchBasicPage(data: Payload): Promise<BasicPageDto> {
    const {id, ...otherInfo} = data;
    const r = await patchRequest<Payload>({
        url: `setting/basic-pages/${id}`,
        data: otherInfo,
        useAuth: true,
    });
    return r.response;
}

export async function getBasicPages(): Promise<BasicPageDto[]> {
    return await getRequest<BasicPageDto[]>({ url: 'setting/all-pages', useAuth: true });
}

export async function getBasicPagesById(id: string): Promise<BasicPageDto> {
    return await getRequest<BasicPageDto>({ url: `setting/basic-pages/${id}`, useAuth: true });
}

export async function deleteBasicPage(id: string): Promise<{ id: string, status: string }> {
    const r = await deleteRequest({
        url: `setting/basic-pages/${id}`,
        useAuth: true,
    });
    return { ...r.response ,id };
}