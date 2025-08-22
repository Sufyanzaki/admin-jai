import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {BlogApiResponse, BlogDto} from "@/app/shared-types/blog";

type Payload = Partial<BlogDto>;

export async function getAllBlogs(): Promise<BlogApiResponse> {
    return await getRequest<BlogApiResponse>({
        url: 'blog',
        useAuth: true
    });
}

export async function getBlogById(id: string): Promise<BlogDto> {
    return await getRequest<BlogDto>({
        url: `blog/${id}`,
        useAuth: true
    });
}

export async function editBlog(id: string, props: Payload): Promise<{ status: number } | undefined> {
    const r = await patchRequest<Payload>({
        url: `blog/${id}`,
        data: props,
        useAuth: true
    });
    return r.response;
}

export async function deleteBlog(id: string): Promise<{ status: number } | undefined> {
    const r = await deleteRequest({
        url: `blog/${id}`,
        useAuth: true,
    });
    return r.response;
}

export async function createBlog(props: Payload): Promise<BlogDto | undefined> {
    const r = await postRequest<Payload>({
        url: 'blog',
        data: props,
        useAuth: true
    });
    return r.response;
}