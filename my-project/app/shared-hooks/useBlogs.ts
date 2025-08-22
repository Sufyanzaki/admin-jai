import { useSWRFix } from "@/shared-lib";
import {getAllBlogs} from "@/app/shared-api/blogsApi";
import { BlogApiResponse } from "../shared-types/blog";

export const useBlogs = () => {
    const { data, loading, error } = useSWRFix<BlogApiResponse>({
        key: 'blogs',
        fetcher: getAllBlogs
    });

    const blogPosts = data?.categories?.categories?.flatMap((cat) => cat.blogs) ?? [];

    return {
        blogs: blogPosts,
        loading,
        error,
        categories: data?.categories?.categories ?? [],
        categoryNames: data?.categories?.categoryNames ?? [],
        stats: data?.categories?.stats,
    };
}; 