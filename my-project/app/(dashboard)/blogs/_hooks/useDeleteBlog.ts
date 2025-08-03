import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/admin-utils";
import { useState } from "react";
import { deleteBlog } from "../_api/deleteBlog";
import { BlogsResponse } from "../_api/getAllBlogs";

export const useDeleteBlog = () => {
  const { mutate: globalMutate } = useSWRConfig();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
    "delete-blog",
    async (_, { arg }: { arg: { id: string } }) => {
      return await deleteBlog(arg.id);
    },
    {
      onSuccess: () => showSuccess("Blog deleted successfully!"),
      onError: (error) => {
        globalMutate("blogs");
        showError({ message: error.message });
      }
    }
  );

  const deleteBlogById = async (id: string) => {
    setDeletingIds(prev => [...prev, id]);
    try {
      await trigger({ id });
      await globalMutate(
        "blogs",
        (currentData: BlogsResponse | undefined) => {
          if (!currentData) return currentData;
          return currentData.filter(blog => String(blog.id) !== String(id));
        },
        false
      );
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const isItemDeleting = (id: string) => deletingIds.includes(id);

  return {
    deleteBlogById,
    isDeleting: isMutating,
    isItemDeleting
  };
};
