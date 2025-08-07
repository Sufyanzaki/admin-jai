import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { showError, showSuccess } from "@/shared-lib";
import { useState } from "react";
import {BlogDto} from "@/app/shared-types/blog";
import { deleteBlog } from "@/app/shared-api/blogsApi";

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
        globalMutate("blogs").finally();
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
        (currentData: BlogDto[] | undefined) => {
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
