"use client"

import React, { useState, useEffect } from 'react';
import {ArrowLeft, Plus, Save, Trash2, Upload, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Controller} from 'react-hook-form';
import {CustomImageUpload} from '@/components/frontend-settings/CustomImageInput';
import Preloader from "@/components/ui/Preloader";
import useEditPackage from "@/app/(dashboard)/packages/_hooks/useEditPackage";

export default function PackageEditPage() {
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        control,
        watch,
        features,
        addFeature,
        removeFeature,
        loading,
        setValue,
        packageData
    } = useEditPackage();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (packageData?.image && typeof packageData.image === "string") {
            setImagePreview(packageData.image);
        }
    }, [packageData]);

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            setValue("image", file, { shouldValidate: true });
        }
    };

    const handleRemoveImage = () => {
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setValue("image", null, { shouldValidate: true });
    };

    if (loading) return (
        <div className="flex items-center flex-col justify-center h-64">
            <Preloader/>
            <p className="text-sm">Package Loading</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-5 p-4 xl:p-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <a href="/packages">
                        <ArrowLeft className="h-4 w-4"/>
                    </a>
                </Button>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Edit Package</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Package Information</CardTitle>
                            <CardDescription>Update the basic information for this package</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Package Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Premium Plan"
                                    {...register('name')}
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                            </div>

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
                                        className="pl-8"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...register('price')}
                                    />
                                </div>
                                {errors.price && <div className="text-red-500 text-sm">{errors.price.message}</div>}
                                <p className="text-xs text-muted-foreground">
                                    Set 0 for free packages
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="validity">
                                    Validity <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="validity"
                                    placeholder="0 Days"
                                    type="number"
                                    min="0"
                                    {...register('validity')}
                                />
                                {errors.validity && <div className="text-red-500 text-sm">{errors.validity.message}</div>}
                            </div>

                            <div className="flex items-center justify-between space-y-0">
                                <div className="flex flex-col space-y-1">
                                    <Label htmlFor="isActive">Package Status</Label>
                                    <span className="text-sm text-muted-foreground">
                                        {watch('isActive') ? 'Package is currently active' : 'Package is currently inactive'}
                                    </span>
                                </div>
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({field}) => (
                                        <Switch
                                            id="isActive"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package Details</CardTitle>
                            <CardDescription>Additional information about the package</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Package Image</Label>
                                <div className="relative">
                                    <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed">
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center space-y-2 cursor-pointer"
                                        >
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    width={128}
                                                    height={128}
                                                    className="h-full w-full object-cover rounded-md"
                                                    onError={() => setImagePreview(null)}
                                                />
                                            ) : (
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                            )}
                                            <input
                                                type="file"
                                                id="image-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                Upload image
                                            </span>
                                        </label>
                                    </div>
                                    {imagePreview && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                            onClick={handleRemoveImage}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 600x600px, Max 2MB
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                <Save className="mr-2 h-4 w-4"/>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Features Section - Full Width */}
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Package Features</CardTitle>
                        <CardDescription>Define what's included in this package</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Input
                                        placeholder={`Feature ${index + 1}`}
                                        {...register(`features.${index}`)}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        disabled={features.length === 1}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500"/>
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" type="button" onClick={addFeature}>
                                <Plus className="mr-2 h-4 w-4"/>
                                Add Feature
                            </Button>
                            {errors.features && (
                                <div className="text-red-500 text-sm">{errors.features.message}</div>
                            )}
                            {errors.features?.root && (
                                <div className="text-red-500 text-sm">{errors.features.root.message}</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}