"use client"

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Input} from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import {Textarea} from "@/components/admin/ui/textarea"
import {Checkbox} from "@/components/admin/ui/checkbox"
import {ArrowLeft, Loader2} from "lucide-react"
import Link from "next/link";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import useTOSForm from "@/app/admin/(dashboard)/frontend-settings/_hooks/useTOSForm";
import {SimpleEditor} from "@/components/admin/tiptap-templates/simple/simple-editor";
import {CustomImageUpload} from "@/components/admin/frontend-settings/CustomImageInput";

export default function TOSForm(){
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        isUploading,
        onSubmit,
        tosLoading
    } = useTOSForm();

    if(tosLoading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Loading...</p>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 p-4 xl:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/frontend-settings">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Terms and Conditions</h2>
                        <p className="text-muted-foreground">Fill the form to add new page.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Page Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title*</Label>
                            <Input
                                id="title"
                                {...register("Title")}
                                disabled={isLoading}
                            />
                            {errors.Title && (
                                <p className="text-sm font-medium text-destructive">{errors.Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link*</Label>
                            <Input
                                id="link"
                                {...register("link")}
                                disabled={isLoading}
                            />
                            {errors.link && (
                                <p className="text-sm font-medium text-destructive">{errors.link.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageSectiontitle">Section Title*</Label>
                            <Input
                                id="pageSectiontitle"
                                {...register("pageSectiontitle")}
                                disabled={isLoading}
                            />
                            {errors.pageSectiontitle && (
                                <p className="text-sm font-medium text-destructive">{errors.pageSectiontitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content*</Label>
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
                                <p className="text-sm font-medium text-destructive">{errors.content.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO Fields</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meta-title">Meta Title*</Label>
                            <Input
                                id="meta-title"
                                {...register("metaTitle")}
                                disabled={isLoading}
                            />
                            {errors.metaTitle && (
                                <p className="text-sm font-medium text-destructive">{errors.metaTitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meta-description">Meta Description*</Label>
                            <Input
                                id="meta-description"
                                {...register("metaDescription")}
                                disabled={isLoading}
                            />
                            {errors.metaDescription && (
                                <p className="text-sm font-medium text-destructive">{errors.metaDescription.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords*</Label>
                            <Textarea
                                id="keywords"
                                {...register("keywords")}
                                className="min-h-[100px]"
                                disabled={isLoading}
                            />
                            <p className="text-sm text-muted-foreground">Separate with comma</p>
                            {errors.keywords && (
                                <p className="text-sm font-medium text-destructive">{errors.keywords.message}</p>
                            )}
                        </div>

                        <Controller
                            name="metaImage"
                            control={control}
                            render={({ field }) => (
                                <CustomImageUpload
                                    label="Meta Image (200x200+)"
                                    file={field.value instanceof File ? field.value : null}
                                    existingImage={typeof field.value === 'string' ? field.value : undefined}
                                    onFileChange={field.onChange}
                                    type="meta-image"
                                />
                            )}
                        />

                        <div className="flex items-center space-x-2">
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="show-header"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                )}
                            />
                            <Label htmlFor="show-header">Show on Header</Label>
                        </div>
                        {errors.showOnHeader && (
                            <p className="text-sm font-medium text-destructive">{errors.showOnHeader.message}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isUploading ? "Uploading..." : "Updating..."}
                            </>
                        ) : "Update"}
                    </Button>
                </div>
            </div>
        </form>
    )
}