"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useSeoSettingsForm from "../_hooks/useSeoSettingsForm";
import Preloader from "@/components/ui/Preloader";
import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export default function SEOForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
    isFetchingSeo,
    watch,
    setValue,
  } = useSeoSettingsForm();

  const metaImageValue = watch("metaImage");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (metaImageValue) {
      if (typeof metaImageValue === "string") {
        setImagePreview(metaImageValue);
      } else if (metaImageValue instanceof File) {
        const previewUrl = URL.createObjectURL(metaImageValue);
        setImagePreview(previewUrl);
      }
    } else {
      setImagePreview(null);
    }
  }, [metaImageValue]);

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
      setValue("metaImage", file, { shouldValidate: true });
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setValue("metaImage", null, { shouldValidate: true });
  };

  if (isFetchingSeo) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading SEO</p>
        </div>
    );
  }

  return (
      <CardContent className="space-y-6 pt-6">
        <form className="grid gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
                id="metaTitle"
                placeholder="Humsafar - Home"
                {...register("metaTitle")}
            />
            {errors.metaTitle && (
                <div className="text-red-500 text-sm">
                  {errors.metaTitle.message}
                </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
                id="metaDescription"
                placeholder="Humsafar - Home"
                {...register("metaDescription")}
            />
            {errors.metaDescription && (
                <div className="text-red-500 text-sm">
                  {errors.metaDescription.message}
                </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="keywords">Meta Keywords</Label>
            <Textarea
                id="keywords"
                placeholder="Humsafar, travel, guide"
                className="resize-none"
                {...register("metaKeywords")}
            />
            <p className="text-xs text-muted-foreground">
              Separate with commas
            </p>
            {errors.metaKeywords && (
                <div className="text-red-500 text-sm">
                  {errors.metaKeywords.message}
                </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Meta Image</h3>
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed">
                <label
                    htmlFor="meta-image-upload"
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                >
                  {imagePreview ? (
                      <Image
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
                      id="meta-image-upload"
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
            {errors.metaImage && (
                <div className="text-red-500 text-sm">
                  {errors.metaImage.message}
                </div>
            )}
            <p className="text-xs text-muted-foreground">
              Recommended: 1200x630px, Max 2MB
            </p>
          </div>

          <div className="flex justify-end pt-6">
            <Button className="px-8" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      </CardContent>
  );
}