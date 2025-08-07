import { useSWRFix } from "@/shared-lib";
import { getAllBlogs } from "@/app/shared-api/blogsApi";
import {BlogDto} from "@/app/shared-types/blog";

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