"use client"

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Input} from "@/components/admin/ui/input"
import {Label} from "@/components/admin/ui/label"
import {Textarea} from "@/components/admin/ui/textarea"
import {ArrowLeft, Upload, Loader2} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/admin/ui/select"
import Link from "next/link"
import {Controller} from "react-hook-form"
import useBasicForm from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicForm";
import { useTranslation } from "react-i18next";
import {SimpleEditor} from "@/components/admin/tiptap-templates/simple/simple-editor";

const base = "https://admin-jai.vercel.app/"

export default function CreatePage() {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        isUploading,
        onSubmit,
        setValue,
        watch,
    } = useBasicForm();
    const { t } = useTranslation();
    const metaImage = watch("metaImage");
    const handleImageUpload = (file: File | null) => {
        setValue("metaImage", file);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 p-4 xl:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/frontend-settings">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">{t("Back")}</span>
                        </Link>
                    </Button>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{t("Add New Page")}</h2>
                        <p className="text-muted-foreground">{t("Fill the form to add new page.")}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t("Page Content")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">{t("Title*")}</Label>
                            <Input
                                id="title"
                                {...register("Title")}
                                placeholder={t("Page title")}
                                disabled={isLoading}
                            />
                            {errors.Title && (
                                <p className="text-sm font-medium text-destructive">{errors.Title.message || ""}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="Url">{t("URL*")}</Label>
                            <div className="flex rounded-md items-center">
                                                                <span className="block whitespace-nowrap px-3 rounded-l-md text-sm text-muted-foreground">
                                                                    {base}/page/
                                                                </span>
                                <Input
                                    id="Url"
                                    {...register("Url")}
                                    placeholder={t("relative-path")}
                                    disabled={isLoading}
                                    className="rounded-l-none"
                                />
                            </div>
                            {errors.Url && (
                                <p className="text-sm font-medium text-destructive">
                                    {errors.Url.message || ""}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">{t("Content*")}</Label>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <SimpleEditor
                                        existingValue={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.content && (
                                <p className="text-sm font-medium text-destructive">{errors.content.message || ""}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t("SEO Fields")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meta-title">{t("Meta Title*")}</Label>
                            <Input
                                id="meta-title"
                                {...register("metaTitle")}
                                placeholder={t("Meta Title")}
                                disabled={isLoading}
                            />
                            {errors.metaTitle && (
                                <p className="text-sm font-medium text-destructive">{errors.metaTitle.message || ""}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meta-description">{t("Meta Description*")}</Label>
                            <Input
                                id="meta-description"
                                {...register("metaDescription")}
                                placeholder={t("Meta Description")}
                                disabled={isLoading}
                            />
                            {errors.metaDescription && (
                                <p className="text-sm font-medium text-destructive">{errors.metaDescription.message || ""}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keywords">{t("Keywords*")}</Label>
                            <Textarea
                                id="keywords"
                                {...register("keywords")}
                                className="min-h-[100px]"
                                placeholder={t("Comma separated keywords")}
                                disabled={isLoading}
                            />
                            <p className="text-sm text-muted-foreground">{t("Separate with comma")}</p>
                            {errors.keywords && (
                                <p className="text-sm font-medium text-destructive">{errors.keywords.message || ""}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>{t("Meta Image (200x200+)")}</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="meta-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("meta-image")?.click()}
                                    className="flex items-center gap-2"
                                    disabled={isLoading}
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="h-4 w-4" />
                                    )}
                                    {isUploading ? t("Uploading...") : t("Choose File")}
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    {metaImage instanceof File ? metaImage.name :
                                        metaImage ? t("Image uploaded") : t("No file chosen")}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="page-type">{t("Page type*")}</Label>
                            <Controller
                                name="pageType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("Select page type")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Public">{t("Public")}</SelectItem>
                                            <SelectItem value="Private">{t("Private")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.pageType && (
                                <p className="text-sm font-medium text-destructive">{errors.pageType.message || ""}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isUploading ? t("Uploading Image...") : t("Creating Page...")}
                            </>
                        ) : t("Create Page")}
                    </Button>
                </div>
            </div>
        </form>
    )
}