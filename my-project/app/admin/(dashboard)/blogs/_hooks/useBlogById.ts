import { useSWRFix } from "@/admin-utils/lib/useSwrFix";
import { getBlogById } from "../_api/getBlogById";
import { Blog } from "../_api/getAllBlogs";

const useBlogById = (id: number | string) => {
    const { data, loading, error, mutate } = useSWRFix<Blog>({
        key: id ? `blog-${id}` : '',
        fetcher: () => getBlogById(id)
    });

    return {
        blog: data,
        loading,
        error,
        mutate
    };
};

export default useBlogById; 