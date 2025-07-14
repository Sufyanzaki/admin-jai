import useCreateBlogCategory from "../_hooks/useCreateBlogCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddCategoryFormProps {
  onSuccess?: () => void;
}

export default function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
  } = useCreateBlogCategory();

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values, onSuccess);
      })}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="category-name">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="category-name"
          placeholder="e.g. Food, Lifestyle"
          {...register("name")}
          required
          disabled={isLoading}
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        <Plus className="mr-2 h-4 w-4" />
        {isLoading ? "Adding..." : "Add Category"}
      </Button>
    </form>
  );
} 