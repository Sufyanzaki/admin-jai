"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {ArrowLeft, Upload, X, Loader2} from "lucide-react";
import {DateRangePicker} from "@/components/date-range-picker";
import Link from "next/link";
import useEditBannerForm from "../../_hooks/useEditBannerForm";
import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export default function BannerEditPage() {
    const params = useParams();
    const id = params.id as string;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        control,
        setValue,
        watch,
        banner,
    } = useEditBannerForm(id);

    // Set preview and form value when editing existing banner
    useEffect(() => {
        if (banner && typeof banner.bannerImage === 'string') {
            setImagePreview(banner.bannerImage);
        }
    }, [banner]);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("bannerImage", file, { shouldValidate: true });
        }
        if (event.target) {
            event.target.value = '';
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview("");
        setValue("bannerImage", "", { shouldValidate: true });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (isLoading && !banner) {
        return (
            <div className="flex flex-col gap-6 p-4 xl:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Loading banner details...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 xl:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/marketing/banners">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">Edit Banner</h2>
                    <p className="text-muted-foreground">Upload banner and define scheduling details</p>
                </div>
            </div>
            <form onSubmit={handleSubmit((data) => onSubmit(data, selectedFile, () => console.log("Banner updated successfully!")))}>
                <Card>
                    <CardHeader>
                        <CardTitle>Banner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Name + Link */}
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
                        {/* Date Range Picker + CPM */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label>Start / End Date</Label>
                                <Controller
                                    name="dateRange"
                                    control={control}
                                    render={({ field }) => (
                                        <DateRangePicker
                                            className="w-full [&>button]:w-full"
                                            value={field.value as any}
                                            onDateRangeChange={(startDate, endDate) => {
                                                setValue('startDate', new Date(startDate));
                                                setValue('endDate', new Date(endDate));
                                                field.onChange({ from: new Date(startDate), to: new Date(endDate) });
                                            }}
                                        />
                                    )}
                                />
                                {(errors.startDate || errors.endDate) && (
                                    <div className="space-y-1">
                                        {errors.startDate && (
                                            <p className="text-sm text-red-400">{errors.startDate.message}</p>
                                        )}
                                        {errors.endDate && (
                                            <p className="text-sm text-red-400">{errors.endDate.message}</p>
                                        )}
                                    </div>
                                )}
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
                        {/* Page Selection */}
                        <div className="grid gap-2">
                            <Label htmlFor="page">Select Page</Label>
                            <Controller
                                name="page"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Page" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="homepage">Homepage</SelectItem>
                                            <SelectItem value="agenda">Agenda</SelectItem>
                                            <SelectItem value="blog">Blog</SelectItem>
                                            <SelectItem value="blog-details">Blog Details</SelectItem>
                                            <SelectItem value="how-work">How Work</SelectItem>
                                            <SelectItem value="registration">Registration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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
                                                onClick={handleRemoveImage}
                                                type="button"
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
                        <div className="pt-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Updating Banner..." : "Update Banner"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
