import { useSWRFix } from "@/shared-lib";
import {BlogCategoryDto} from "@/app/shared-types/blog";
import {getAllBlogCategories} from "@/app/shared-api/blogCategoryApi";

export const useBlogCategories = () => {
    const { data, loading, error, mutate } = useSWRFix<BlogCategoryDto[]>({
        key: 'blog-categories',
        fetcher: getAllBlogCategories
    });

    return {
        categories: data,
        loading,
        error,
        mutate
    };
};
