import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {FaqCategoryDto, FaqDto} from "@/app/shared-types/faq";

type Payload = Partial<FaqDto>;
type CategoryPayload = Partial<FaqCategoryDto>;

export async function deleteFaq(id: string): Promise<{ status: number } | undefined> {
    const r = await deleteRequest({
        url: `faq/${id}`,
        useAuth: true,
    });
    return r.response;
}

export async function getAllFaq(): Promise<FaqDto[]> {
    return await getRequest({
        url: "faq",
        useAuth: true,
    });
}

export async function patchFaq(id: string, data: Payload): Promise<FaqDto> {
    const r = await patchRequest<Payload>({
        url: `faq/${id}`,
        data,
        useAuth: true,
    });
    return r.response;
}

export async function postFaq(data: Payload): Promise<FaqDto> {
    const r = await postRequest<Payload>({
        url: "faq",
        data,
        useAuth: true,
    });
    return r.response;
}

export async function deleteFaqCategory(id: string): Promise<{ status: number } | undefined> {
    const r = await deleteRequest({
        url: `faq/categories/${id}`,
        useAuth: true,
    });
    return r.response;
}

export async function getFaqCategories(): Promise<FaqCategoryDto[]> {
    return await getRequest<FaqCategoryDto[]>({
        url: "faq/categories",
        useAuth: true,
    });
}
export async function patchFaqCategory(id: string, data: CategoryPayload): Promise<FaqCategoryDto> {
    const r = await patchRequest<CategoryPayload>({
        url: `faq/categories/${id}`,
        data,
        useAuth: true,
    });
    return r.response;

}

export async function postFaqCategory(props: CategoryPayload): Promise<FaqCategoryDto> {
    const r = await postRequest<CategoryPayload>({
        url: "faq/categories",
        data: props,
        useAuth: true,
    });
    return r.response;
}