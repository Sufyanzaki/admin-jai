"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowLeft, Loader2} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CustomImageUpload} from "@/components/frontend-settings/CustomImageInput";
import Link from "next/link";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor"
import { Controller } from "react-hook-form"
import useAgendaForm from "@/app/(dashboard)/frontend-settings/_hooks/useAgendaForm";

export default function AgendaForm() {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        onSubmit,
        isUploading
    } = useAgendaForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 p-4 xl:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/frontend-settings">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Agenda</h2>
                        <p className="text-muted-foreground">Here's what's happening today.</p>
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
                            />
                            {errors.Title && (
                                <p className="text-sm font-medium text-destructive">{errors.Title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageTitle">Page Title*</Label>
                            <Input
                                id="pageTitle"
                                {...register("pageTitle")}
                            />
                            {errors.pageTitle && (
                                <p className="text-sm font-medium text-destructive">{errors.pageTitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageSubtitle">Page Subtitle*</Label>
                            <Input
                                id="pageSubtitle"
                                {...register("pageSubtitle")}
                            />
                            {errors.pageSubtitle && (
                                <p className="text-sm font-medium text-destructive">{errors.pageSubtitle.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="titleContentSection">Content Section Title*</Label>
                            <Input
                                id="titleContentSection"
                                {...register("titleContentSection")}
                            />
                            {errors.titleContentSection && (
                                <p className="text-sm font-medium text-destructive">{errors.titleContentSection.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link*</Label>
                            <Input
                                id="link"
                                {...register("link")}
                            />
                            {errors.link && (
                                <p className="text-sm font-medium text-destructive">{errors.link.message}</p>
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

                        <div className="space-y-2">
                            <Label htmlFor="page-type">Page type*</Label>
                            <Controller
                                name="pageType"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select page type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Public">Public</SelectItem>
                                            <SelectItem value="Private">Private</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.pageType && (
                                <p className="text-sm font-medium text-destructive">{errors.pageType.message}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Controller
                                name="showOnHeader"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="show-header"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
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
                                {isUploading ? "Uploading Image..." : "Updating..."}
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}