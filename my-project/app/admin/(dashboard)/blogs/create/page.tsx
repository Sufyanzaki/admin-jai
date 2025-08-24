"use client"

import { Button } from "@/components/admin/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import {Label} from "@/components/admin/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Textarea } from "@/components/admin/ui/textarea";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import { useBlogCategories } from "../../../../shared-hooks/useBlogCategories";
import useCreateBlog from "../_hooks/useCreateBlog";
import { Controller } from "react-hook-form";
import {SimpleEditor} from "@/components/admin/tiptap-templates/simple/simple-editor";
import { useTranslation } from "react-i18next";

export default function AddBlogPage() {
    const { t } = useTranslation();

    const { categories = [], loading: categoriesLoading } = useBlogCategories();

    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        control,
    } = useCreateBlog();

    return (
        <div className="flex flex-col gap-4 p-4 xl:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/blogs/list">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">{t("Back")}</span>
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">{t("Add Blog")}</h1>
                        <p className="text-muted-foreground">{t("Create and publish new blog content")}</p>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("Blogs Details")}</CardTitle>
                    <CardDescription>{t("View and manage all blog in your fleet")}</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        className="grid grid-cols-2 gap-6"
                        onSubmit={handleSubmit(values => onSubmit(values))}
                    >
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="title">{t("Blog Title")} *</Label>
                            <Input id="title" placeholder={t("Blog Title")}
                                required {...register('title')} />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title.message || ""}</div>}
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="category">{t("Category")} *</Label>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field }) => (
                                    <Select
                                        required
                                        disabled={categoriesLoading || categories.length === 0}
                                        value={field.value ? String(field.value) : ''}
                                        onValueChange={val => field.onChange(Number(val))}
                                    >
                                <SelectTrigger>
                                            <SelectValue placeholder={categoriesLoading ? t("Loading...") : t("Select")}/>
                                </SelectTrigger>
                                <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                            ))}
                                </SelectContent>
                            </Select>
                                )}
                            />
                            {errors.categoryId && <div className="text-red-500 text-sm">{errors.categoryId.message || ""}</div>}
                        </div>

                        {/* Slug */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="slug">{t("Slug")} *</Label>
                            <Input id="slug" placeholder={t("Slug")}
                                required {...register('slug')} />
                            {errors.slug && <div className="text-red-500 text-sm">{errors.slug.message || ""}</div>}
                        </div>

                        {/* Banner */}
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="banner">{t("Banner (1300x650)")}</Label>
                            <Controller
                                control={control}
                                name="bannerImage"
                                render={({ field }) => (
                            <Input
                                id="banner"
                                type="file"
                                accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="short-description">{t("Short Description")} *</Label>
                            <Textarea id="short-description" placeholder={t("Short Description")}
                                rows={4} required {...register('shortDescription')} />
                            {errors.shortDescription && <div className="text-red-500 text-sm">{errors.shortDescription.message || ""}</div>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="description">{t("Description")}</Label>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <SimpleEditor
                                        existingValue={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.description && <div className="text-red-500 text-sm">{errors.description.message || ""}</div>}
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="meta-title">{t("Meta Title")}</Label>
                            <Input id="meta-title" placeholder={t("Meta Title")}
                                {...register('metaTitle')} />
                            {errors.metaTitle && <div className="text-red-500 text-sm">{errors.metaTitle.message || ""}</div>}
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="meta-image">{t("Meta Image")}</Label>
                            <Controller
                                control={control}
                                name="metaImage"
                                render={({ field }) => (
                            <Input
                                id="meta-image"
                                type="file"
                                accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="meta-description">{t("Meta Description")}</Label>
                            <Textarea id="meta-description" placeholder={t("Meta Description")}
                                rows={4} {...register('metaDescription')} />
                            {errors.metaDescription && <div className="text-red-500 text-sm">{errors.metaDescription.message || ""}</div>}
                        </div>

                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="meta-keywords">{t("Meta Keywords")}</Label>
                            <Input id="meta-keywords" placeholder={t("Meta Keywords")}
                                {...register('metaKeywords')} />
                            {errors.metaKeywords && <div className="text-red-500 text-sm">{errors.metaKeywords.message || ""}</div>}
                        </div>

                        <div className="col-span-2 flex justify-end space-x-4 pt-4">
                            <Button type="submit" disabled={isLoading}>{isLoading ? t('Saving...') : t('Save')}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}