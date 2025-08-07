import { useSWRFix } from "@/shared-lib";
import {BlogDto} from "@/app/shared-types/blog";
import {getBlogById} from "@/app/shared-api/blogsApi";

const useBlogById = (id: string) => {
    const { data, loading, error, mutate } = useSWRFix<BlogDto>({
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