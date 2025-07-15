"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useFaqForm from "../_hooks/useFaqForm";
import { Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import useEditFaq from "../_hooks/useEditFaq";
import useFaq from "../_hooks/useFaq";
import useFaqCategories from "../../faq/category/_hooks/useFaqCategories";

export function FAQModal({ isOpen, onClose }: { isOpen: boolean; onClose: (value: boolean) => void }) {
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const { data: faqs } = useFaq();
    const { data: categories, isLoading: categoriesLoading } = useFaqCategories();
    const faqToEdit = editId && faqs ? faqs.find((faq) => String(faq.id) === String(editId)) : null;
    const isEdit = Boolean(editId && faqToEdit);

    const editHook = useEditFaq(faqToEdit, categories || []);
    const createHook = useFaqForm();
    const { handleSubmit, onSubmit, register, control, errors, isLoading } = isEdit ? editHook : createHook;

    const submitHandler = handleSubmit(async (data) => {
        await onSubmit(data, (result) => {
            if (result === false) {
                onClose(false);
            }
        });
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="px-1">
                    <DialogTitle>{isEdit ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
                    <DialogDescription>Frequently Asked Questions</DialogDescription>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <div className="space-y-2">
                            <Label htmlFor="question">Question</Label>
                            <Input
                                id="question"
                                placeholder="Brief description of the issue"
                                {...register("question")}
                                disabled={isLoading}
                                required
                            />
                            {errors.question && (
                                <p className="text-sm text-red-500 mt-1">{errors.question.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">Category</Label>
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(val) => field.onChange(Number(val))}
                                        value={field.value ? String(field.value) : ""}
                                        disabled={isLoading || categoriesLoading}
                                        required
                                    >
                                        <SelectTrigger id="categoryId">
                                            <SelectValue placeholder={categoriesLoading ? "Loading..." : "Select category"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories && categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="" disabled>No categories</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.categoryId && (
                                <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="answer">Answer</Label>
                            <Textarea
                                id="answer"
                                placeholder="Please provide detailed information about your issue"
                                rows={5}
                                {...register("answer")}
                                disabled={isLoading}
                                required
                            />
                            {errors.answer && (
                                <p className="text-sm text-red-500 mt-1">{errors.answer.message}</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" type="button" onClick={() => onClose(false)} disabled={isLoading}>Cancel</Button>
                            <Button type="submit" disabled={isLoading}>{isLoading ? (isEdit ? "Saving..." : "Submitting...") : (isEdit ? "Save" : "Submit")}</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}