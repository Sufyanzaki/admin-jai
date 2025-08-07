import { useSWRFix } from "@/shared-lib";
import {BlogDto} from "@/app/shared-types/blog";
import {getAllBlogs} from "@/app/shared-api/blogsApi";

export const useBlogs = () => {
    const { data, loading, error, mutate } = useSWRFix<BlogDto[]>({
        key: 'blogs',
        fetcher: getAllBlogs
    });

    return {
        blogs: data,
        loading,
        error,
        mutate
    };
}; 