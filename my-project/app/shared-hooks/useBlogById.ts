import { useSWRFix } from "@/shared-lib";
import {getBlogById} from "@/app/shared-api/blogsApi";
import {BlogDto} from "@/app/shared-types/blog";

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