import {useSWRConfig} from "swr";
import useSWRMutation from "swr/mutation";
import {showError, showSuccess} from "@/shared-lib";
import {useState} from "react";
import {editBlog} from "@/app/shared-api/blogsApi";
import {BlogApiResponse} from "@/app/shared-types/blog";

export const useBlogStatus = () => {
    const { mutate: globalMutate } = useSWRConfig();
    const [updatingIds, setUpdatingIds] = useState<string[]>([]);

    const { trigger, isMutating } = useSWRMutation(
        "update-blog-status",
        async (_, { arg }: { arg: { id: string, isActive: boolean } }) => {
            return await editBlog(arg.id, {isActive: arg.isActive});
        },
        {
            onSuccess: () => showSuccess("Member status updated successfully!"),
            onError: (error) => {
                globalMutate("all-members").finally();
                showError({ message: error.message });
            }
        }
    );

    const updateBlogStatus = async (id: string, isActive: boolean) => {
        setUpdatingIds(prev => [...prev, id]);
        try {
            await trigger({ id, isActive });
            await globalMutate(
                (key) => typeof key === "string" && key.startsWith("blogs"),
                (currentData: BlogApiResponse | undefined) => {
                    if (!currentData?.categories?.categories) return currentData;

                    let activeBlogs = 0;
                    let inactiveBlogs = 0;
                    const updatedCategories = currentData.categories.categories.map((category) => {
                        const updatedBlogs = category.blogs.map((blog) =>
                            blog.id === id ? { ...blog, isActive } : blog
                        );
                        updatedBlogs.forEach((blog) => {
                            if (blog.isActive) activeBlogs++;
                            else inactiveBlogs++;
                        });
                        return { ...category, blogs: updatedBlogs };
                    });
                    return {
                        ...currentData,
                        categories: {
                            ...currentData.categories,
                            stats: {
                                ...currentData.categories.stats,
                                totalBlogs: activeBlogs + inactiveBlogs,
                                activeBlogs,
                                inactiveBlogs,
                            },
                            categories: updatedCategories,
                        },
                    };
                },
                false
            );
        } finally {
            setUpdatingIds(prev => prev.filter(itemId => itemId !== id));
        }
    };

    const isItemUpdating = (id: string) => updatingIds.includes(id);

    return {
        updateBlogStatus,
        isUpdating: isMutating,
        isItemUpdating
    };
};