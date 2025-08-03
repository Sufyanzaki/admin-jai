import useFaqCategoryForm from "../_hooks/useFaqCategoryForm";
import useEditFaqCategory from "../_hooks/useEditFaqCategory";
import useFaqCategories from "../_hooks/useFaqCategories";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type CategoryModalProps = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const { data: categories } = useFaqCategories();
    const initialName = editId && categories ? (categories.find((cat) => String(cat.id) === String(editId))?.name || "") : "";
    const isEdit = Boolean(editId);

    const editHook = useEditFaqCategory(editId ? Number(editId) : null, initialName);
    const createHook = useFaqCategoryForm();
    const { handleSubmit, onSubmit, register, errors, isLoading } = isEdit ? editHook : createHook;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="px-1">
                    <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <form className="space-y-4" onSubmit={handleSubmit((data: any) => onSubmit(data, onClose))}>
                        <div className="space-y-2">
                            <Label htmlFor="categoryName">Category Name</Label>
                            <Input
                                id="categoryName"
                                placeholder="Category Name"
                                {...register("name")}
                                disabled={isLoading}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" type="button" onClick={() => onClose(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (isEdit ? "Saving..." : "Submitting...") : (isEdit ? "Save" : "Submit")}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}