import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {BlogDto} from "@/app/shared-types/blog";

type BlogsResponse = BlogDto[];
type Payload = Partial<BlogDto>;

export async function getAllBlogs(): Promise<BlogsResponse> {
    return await getRequest<BlogsResponse>({
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

export async function createBlog(props: Payload): Promise<BlogsResponse | undefined> {
    const r = await postRequest<Payload>({
        url: 'blog',
        data: props,
        useAuth: true
    });
    return r.response;
}