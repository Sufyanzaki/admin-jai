import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {CategoryDto} from "@/app/shared-types/blog";

type Payload = Partial<CategoryDto>;
type BlogCategoryList = CategoryDto[];

export async function createBlogCategory(props: Payload): Promise<CategoryDto> {
    const r = await postRequest<Payload>({
        url: 'blog/categories',
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function deleteBlogCategory(id: string): Promise<{ message: string }> {
    const r = await deleteRequest({
        url: `blog/categories/${id}`,
        useAuth: true
    });
    return r.response;
}

export async function editBlogCategory(id: string, props: Payload): Promise<CategoryDto> {
    const r = await patchRequest<Payload>({
        url: `blog/categories/${id}`,
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function getAllBlogCategories(): Promise<BlogCategoryList> {
    return await getRequest<BlogCategoryList>({
        url: 'blog/categories',
        useAuth: true
    });
}
