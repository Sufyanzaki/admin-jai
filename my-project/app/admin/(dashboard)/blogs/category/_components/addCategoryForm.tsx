import useCreateBlogCategory from "../_hooks/useCreateBlogCategory";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit(values => onSubmit(values, onSuccess))}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="category-name">
          {t("Category Name")} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="category-name"
          placeholder={t("e.g. Food, Lifestyle")}
          {...register("name")}
          required
          disabled={isLoading}
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors?.name?.message}</div>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        <Plus className="mr-2 h-4 w-4" />
        {isLoading ? t("Adding...") : t("Add Category")}
      </Button>
    </form>
  );
} 