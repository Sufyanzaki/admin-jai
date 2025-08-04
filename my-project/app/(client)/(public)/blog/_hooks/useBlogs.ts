import { useSWRFix } from "@/client-utils/lib/useSwrFix";
import { getAllBlogs, BlogsResponse } from "../_api/getAllBlogs";

export const useBlogs = () => {
    const { data, loading, error, mutate } = useSWRFix<BlogsResponse>({
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