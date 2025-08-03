"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, X } from "lucide-react";
import { useFooterForm } from "../_hooks/useFooterForm";
import { useState } from "react";
import Preloader from "@/components/ui/Preloader";

export default function FooterForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    setValue,
    watch,
    footerData,
    isLoadingFooterData
  } = useFooterForm();

  const footerLogo = watch("footerLogo");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("footerLogo", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  if(isLoadingFooterData){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading Footer</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(v => onSubmit(v, () => {}))}>
      <Card>
        <CardHeader>
          <CardTitle>Footer Configuration</CardTitle>
          <CardDescription>Configure your footer settings and appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* First Row: Image Upload & Footer Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Footer Logo</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-24 w-24 shrink-0 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Footer Logo Preview" className="h-full w-full object-contain" />
                    ) : footerData?.footerLogo ? (
                      <img src={footerData.footerLogo} alt="Current Footer Logo" className="h-full w-full object-contain" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                    <input
                      type="file"
                      id="footer-logo"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  {(imagePreview || footerLogo || footerData?.footerLogo) && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => {
                        setValue("footerLogo", "");
                        setImagePreview(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => document.getElementById("footer-logo")?.click()}
                  >
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Upload a footer logo. JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Description */}
            <div className="space-y-2">
              <Label htmlFor="footer-description">Footer Description</Label>
              <Textarea 
                id="footer-description" 
                placeholder="Enter footer description" 
                {...register("footerDescription")}
              />
              {errors.footerDescription && (
                <p className="text-xs text-red-500">{errors.footerDescription.message}</p>
              )}
            </div>
          </div>

          {/* Second Row: Remaining Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="link-name">Link Name</Label>
              <Input 
                id="link-name" 
                placeholder="Enter link name" 
                {...register("linkName")}
              />
              {errors.linkName && (
                <p className="text-xs text-red-500">{errors.linkName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="search-name">Search Name</Label>
              <Input 
                id="search-name" 
                placeholder="Enter search name" 
                {...register("searchName")}
              />
              {errors.searchName && (
                <p className="text-xs text-red-500">{errors.searchName.message}</p>
              )}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="footer-content">Footer Content</Label>
              <Input 
                id="footer-content" 
                placeholder="Enter footer content" 
                {...register("footerContent")}
              />
              {errors.footerContent && (
                <p className="text-xs text-red-500">{errors.footerContent.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <div className="flex justify-end p-6">
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </Card>
    </form>
  );
}