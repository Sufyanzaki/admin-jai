"use client";

import {Card, CardContent, CardHeader, CardTitle,} from "@/components/admin/ui/card";
import {Input} from "@/components/admin/ui/input";
import {Button} from "@/components/admin/ui/button";
import {Label} from "@/components/admin/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/admin/ui/select";
import {ArrowLeft, Upload, X} from "lucide-react";
import {DatePicker} from "@/components/admin/date-range-picker";
import Link from "next/link";
import useBannerForm from "../_hooks/useBannerForm";
import {useRef} from "react";
import {Controller} from "react-hook-form";
import {useBasicPages} from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import Preloader from "@/components/shared/Preloader";

export default function BannerAddPage() {

    const { basicPages, isLoading:basicLoading } = useBasicPages();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        watch,
        setValue,
        control,
        imagePreview,
        handleFileChange,
    } = useBannerForm();

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        handleFileChange(file);
    };

    if(basicLoading) return <div className="h-[60vh] flex justify-center items-center"><Preloader /></div>

    if(!basicPages) return (
        <div className="flex items-center flex-col justify-center h-64">
            <p className="text-sm">No pages found. Please create a page first.</p>
        </div>
    )

    const customPages = basicPages
        .map(page => ({
            title: page.Title,
            url: page.Url,
        }));

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/marketing/banners">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>

                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Create New Banner</h2>
                    <p className="text-muted-foreground">Upload banner and define scheduling details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit((data) => onSubmit(data, () => console.log("Banner created successfully!")))}>
                <Card>
                    <CardHeader>
                        <CardTitle>Banner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="Enter banner name" 
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-400">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="link">Link</Label>
                                <Input 
                                    id="link" 
                                    placeholder="https://example.com" 
                                    {...register('link')}
                                />
                                {errors.link && (
                                    <p className="text-sm text-red-400">{errors.link.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label>Start Date</Label>
                                        <Controller
                                            name="startDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className="w-full [&>button]:w-full"
                                                    value={field.value}
                                                    onDateChange={(date) => {
                                                        console.log(date)
                                                        if (!date) return;
                                                        const parsedDate = new Date(date);
                                                        field.onChange(parsedDate);
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.startDate && (
                                            <p className="text-sm text-red-400">{errors.startDate.message}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>End Date</Label>
                                        <Controller
                                            name="endDate"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className="w-full [&>button]:w-full"
                                                    value={field.value}
                                                    onDateChange={(date) => {
                                                        if (!date) return;
                                                        const parsedDate = new Date(date);
                                                        field.onChange(parsedDate);
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.endDate && (
                                            <p className="text-sm text-red-400">{errors.endDate.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cpm">CPM</Label>
                            <Input
                                id="cpm"
                                type="number"
                                placeholder="Enter CPM"
                                {...register('cpm', { valueAsNumber: true })}
                            />
                            {errors.cpm && (
                                <p className="text-sm text-red-400">{errors.cpm.message}</p>
                            )}
                        </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="page">Select Page</Label>
                            <Select value={watch('page')} onValueChange={(value) => setValue('page', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Page" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customPages.map(page => (
                                        <SelectItem key={page.url} value={page.url}>
                                            {page.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.page && (
                                <p className="text-sm text-red-400">{errors.page.message}</p>
                            )}
                        </div>

                        {/* Banner Image Upload */}
                        <div className="space-y-4">
                            <Label>Banner Image</Label>
                            <div className="flex items-center gap-4">
                                <div className="h-24 w-24 shrink-0 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <div className="relative w-full h-full">
                                            <img 
                                                src={imagePreview} 
                                                alt="Banner preview" 
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-1 right-1 h-6 w-6 p-0"
                                                onClick={() => handleFileChange(null)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        id="banner-image" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Upload Photo
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a banner image. JPG, PNG or GIF. Max 2MB.
                                    </p>
                                    {errors.bannerImage && (
                                        <p className="text-sm text-red-400">{errors.bannerImage.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating Banner..." : "Save Banner"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
