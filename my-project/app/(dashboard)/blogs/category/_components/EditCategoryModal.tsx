import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useEditBlogCategory from "../_hooks/useEditBlogCategory";
import { useBlogCategories } from "../_hooks/useBlogCategories";
import { useMemo } from "react";
import React from "react";
import { useSWRConfig } from "swr";

export default function EditCategoryModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { categories } = useBlogCategories();
  const { mutate: globalMutate } = useSWRConfig();

  // Find the category to edit
  const category = useMemo(() => {
    if (!editId || !categories) return null;
    return categories.find(cat => String(cat.id) === editId);
  }, [editId, categories]);

  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
    reset,
  } = useEditBlogCategory(category?.id ?? 0, category?.name ?? "");

  // Reset form when category changes
  React.useEffect(() => {
    if (category) {
      reset({ name: category.name });
    }
  }, [category, reset]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");
    router.replace(`?${params.toString()}`);
  };

  const handleEditSubmit = async (values: { name: string }) => {
    await onSubmit(values, () => {
      // Update the cache for blog-categories using editId
      if (editId) {
        globalMutate('blog-categories', (current: any[] = []) =>
          current.map(cat => String(cat.id) === editId ? { ...cat, name: values.name } : cat), false
        );
      }
      handleClose();
    });
  };

  return (
    <Dialog open={!!editId} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update the name of this blog category</DialogDescription>
        </DialogHeader>
        {category ? (
          <form
            onSubmit={handleSubmit(handleEditSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-6 items-center">
              <label htmlFor="edit-category-name" className="text-right">
                Name
              </label>
              <Input
                id="edit-category-name"
                className="col-span-3"
                {...register("name")}
                required
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <div className="col-span-4 text-red-500 text-sm">{errors.name.message}</div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8 text-center text-muted-foreground">Category not found.</div>
        )}
      </DialogContent>
    </Dialog>
  );
} 