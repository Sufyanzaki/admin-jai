import {BasicPageDto} from "@/app/(dashboard)/frontend-settings/_types/basicPage";
import {deleteRequest, getRequest, patchRequest, postRequest} from "@/admin-utils";

type BasicPagePropsDto = {
    id?: string;
    Title: string;
    Url: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaImage?: string;
    pageType: string;
    isActive: boolean;
}

export async function postBasicPage(data: Partial<BasicPagePropsDto>): Promise<BasicPageDto> {
    const r = await postRequest<Partial<BasicPagePropsDto>>({
        url: 'setting/basic-pages',
        data,
        useAuth: true,
    });
    return r.response;
}


export async function patchBasicPage(data: Partial<BasicPagePropsDto>): Promise<BasicPageDto> {
    const {id, ...otherInfo} = data;
    const r = await patchRequest<Partial<BasicPagePropsDto>>({
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