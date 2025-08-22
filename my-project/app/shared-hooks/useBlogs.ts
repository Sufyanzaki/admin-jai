import { useSWRFix } from "@/shared-lib";
import { BlogApiResponse } from "../shared-types/blog";
import {getAllBlogs} from "@/app/shared-api/blogsApi";

export const useBlogs = (category: string | null = null, page: number = 1) => {
    const key = category ? `blogs-${category}-page-${page}` : `blogs-page-${page}`;

    const { data, loading, error } = useSWRFix<BlogApiResponse>({
        key,
        fetcher: () => getAllBlogs(category, page)
    });

    const blogPosts = data?.categories?.categories?.flatMap((cat) => cat.blogs) ?? [];

    const paginationData = data?.categories?.categories?.[0]?.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    };

    return {
        blogs: blogPosts,
        loading,
        error,
        categories: data?.categories?.categories ?? [],
        categoryNames: data?.categories?.categoryNames ?? [],
        stats: data?.categories?.stats,
        pagination: paginationData
    };
};