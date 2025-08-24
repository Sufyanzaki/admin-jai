"use client";

import { Button } from "@/components/admin/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/admin/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Textarea } from "@/components/admin/ui/textarea";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import useFaqForm from "../_hooks/useFaqForm";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import useFaqCategories from "../category/_hooks/useFaqCategories";
import Preloader from "@/components/shared/Preloader";

export function FaqAddModal({ isOpen, onClose }: { isOpen: boolean; onClose: (value: boolean) => void }) {
    const { data: categories, isLoading: categoriesLoading } = useFaqCategories();
    const { handleSubmit, onSubmit, register, control, errors, isLoading } = useFaqForm();
    const { t } = useTranslation();

    const submitHandler = handleSubmit(async (data) => {
        await onSubmit(data, (result) => {
            if (!result) {
                onClose(false);
            }
        });
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="px-1">
                    <DialogTitle>{t("Add FAQ")}</DialogTitle>
                    <DialogDescription>{t("Create a new frequently asked question")}</DialogDescription>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto px-1">
                    <form className="space-y-4" onSubmit={submitHandler}>
                        <div className="space-y-2">
                            <Label htmlFor="question">{t("Question")}</Label>
                            <Input
                                id="question"
                                placeholder={t("Enter the question")}
                                {...register("question")}
                                disabled={isLoading}
                                required
                            />
                            {errors.question && (
                                <p className="text-sm text-red-500 mt-1">{errors.question.message || ""}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoryId">{t("Category")}</Label>
                            {categoriesLoading ? (
                                <div className="flex justify-center">
                                    <Preloader size="md" />
                                </div>
                            ) : (
                                <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={val => field.onChange(String(val))}
                                            value={field.value}
                                            key={field.value}
                                        >
                                            <SelectTrigger id="categoryId">
                                                <SelectValue placeholder={t("Select category")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories && categories.length > 0 ? (
                                                    categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <span className="px-2 text-sm text-gray-500">{t("No categories available")}</span>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            )}
                            {errors.categoryId && (
                                <p className="text-sm text-red-500 mt-1">{errors.categoryId.message || ""}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="answer">{t("Answer")}</Label>
                            <Textarea
                                id="answer"
                                placeholder={t("Enter the detailed answer")}
                                rows={5}
                                {...register("answer")}
                                disabled={isLoading}
                                required
                            />
                            {errors.answer && (
                                <p className="text-sm text-red-500 mt-1">{errors.answer.message || ""}</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => onClose(false)}
                                disabled={isLoading}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? t("Submitting...") : t("Submit")}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}