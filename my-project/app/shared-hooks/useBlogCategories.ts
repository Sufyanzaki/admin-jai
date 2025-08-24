import { CategoryDto } from '@/app/shared-types/blog';
import { useSWRFix } from "@/shared-lib";
import {getAllBlogCategories} from "@/app/shared-api/blogCategoryApi";

export const useBlogCategories = () => {
    const { data, loading, error, mutate } = useSWRFix<CategoryDto[]>({
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
