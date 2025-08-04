import { useSWRFix } from "@/client-utils/lib/useSwrFix";
import { getBlogCategories, BlogCategoryResponse } from "../_api/getBlogCategories";

export const useBlogCategories = () => {
    const { data, loading, error, mutate } = useSWRFix<BlogCategoryResponse>({
        key: 'blog/categories',
        fetcher: getBlogCategories
    });

    return {
        blogCats: data,
        loading,
        error,
        mutate
    };
}; 