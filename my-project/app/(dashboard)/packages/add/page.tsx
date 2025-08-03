"use client"

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft, Plus, Save, Trash2, Upload} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Controller } from "react-hook-form";
import usePackageForm from "../_hooks/usePackageForm";
import { CustomImageUpload } from "@/components/frontend-settings/CustomImageInput";

export default function AddPackagesPage() {
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        control,
        features,
        addFeature,
        removeFeature,
    } = usePackageForm();

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/packages">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div className="space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Add Package</h1>
                    <p className="text-muted-foreground">Update package details and pricing</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader className="pb-4 border-b">
                    <CardTitle>Package Details</CardTitle>
                    <CardDescription>Update your package information</CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. Premium Plan"
                                className="bg-background"
                                {...register("name")}
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                            <p className="text-xs text-muted-foreground">
                                This will be displayed to customers
                            </p>
                        </div>

                        {/* Price Field */}
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Price <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                    €
                                </div>
                                <Input
                                    id="price"
                                    placeholder="0.00"
                                    className="pl-8 bg-background"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...register("price", { valueAsNumber: true })}
                                />
                            </div>
                            {errors.price && <div className="text-red-500 text-sm">{errors.price.message}</div>}
                            <p className="text-xs text-muted-foreground">
                                Set 0 for free packages
                            </p>
                        </div>

                        {/* Validity Field */}
                        <div className="space-y-2">
                            <Label htmlFor="validity">
                                Validity <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="validity"
                                    placeholder="0 Days"
                                    className="bg-background"
                                    type="number"
                                    step="1"
                                    min="0"
                                    {...register("validity", { valueAsNumber: true })}
                                />
                            </div>
                            {errors.validity && <div className="text-red-500 text-sm">{errors.validity.message}</div>}
                            <p className="text-xs text-muted-foreground">
                                Set 0 for free packages
                            </p>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <Label htmlFor="package-image">Package Image</Label>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <CustomImageUpload
                                    label=""
                                    file={field.value instanceof File ? field.value : null}
                                    onFileChange={file => field.onChange(file)}
                                />
                            )}
                        />
                        {errors.image && <div className="text-red-500 text-sm">{errors.image.message}</div>}
                                <p className="text-sm text-muted-foreground">
                                    Recommended size: 600x600px. Max 2MB.
                                </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-3">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <Input
                                        placeholder={`Feature ${idx + 1}`}
                                        className="bg-background"
                                        {...register(`features.${idx}`)}
                                    />
                                    <Button variant="ghost" size="icon" type="button" onClick={() => removeFeature(idx)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" type="button" onClick={addFeature}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Feature
                            </Button>
                            {errors.features && <div className="text-red-500 text-sm">{errors.features.message as string}</div>}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end pt-6">
                    <Button type="submit" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        Add Package
                    </Button>
                </CardFooter>
            </Card>
            </form>
        </div>
    )
}