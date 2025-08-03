import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getAllBlogCategories } from "../_api/getAllBlogCategories";
import { BlogCategoryList } from "../_types/category-types";

export const useBlogCategories = () => {
    const { data, loading, error, mutate } = useSWRFix<BlogCategoryList>({
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
