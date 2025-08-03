"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {ArrowLeft, Upload} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import Link from "next/link"
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor"
import {Controller} from "react-hook-form"
import useBasicEditForm from "@/app/(dashboard)/frontend-settings/_hooks/useBasicEditForm";
import Preloader from "@/components/ui/Preloader"

export default function EditPage() {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        onSubmit,
        setValue,
        watch,
        pageLoading
    } = useBasicEditForm();

    const metaImage = watch("metaImage");

    const handleImageUpload = (file: File | null) => {
        setValue("metaImage", file);
    }

    if(pageLoading) return(
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
                        <Link href="/frontend-settings">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Edit Page</h2>
                        <p className="text-muted-foreground">Fill the form to edit this page.</p>
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
                            <Label htmlFor="Url">URL*</Label>
                            <Input
                                id="Url"
                                {...register("Url")}
                            />
                            {errors.Url && (
                                <p className="text-sm font-medium text-destructive">{errors.Url.message}</p>
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

                        <div className="space-y-2">
                            <Label>Meta Image (200x200+)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="meta-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("meta-image")?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Choose File
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    {metaImage instanceof File ? metaImage.name :
                                        metaImage ? "Image uploaded" : "No file chosen"}
                                </span>
                            </div>
                        </div>

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
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Update Page"}
                    </Button>
                </div>
            </div>
        </form>
    )
}