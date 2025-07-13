"use client"

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import useProfileForm from "@/app/(dashboard)/profile/_hooks/useProfileForm";

export default function ProfileEditForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isLoading
  } = useProfileForm()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
      
      // Set the file in form
      setValue("image", file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="space-y-4">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage 
                src={imagePreview || "/avatars/admin.png"} 
                alt="Profile" 
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Camera className="h-3 w-3" />
            </button>
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Click the camera icon to upload a new profile picture
              </p>
              {imagePreview && (
                <p className="text-xs text-green-600">
                  ✓ Image selected and ready to upload
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit((data: any) => onSubmit(data, ()=>console.log("Update Called")))} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              {...register("firstName")}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{String(errors.firstName.message)}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              {...register("lastName")}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{String(errors.lastName.message)}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            {...register("email")}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{String(errors.email.message)}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            {...register("phone")}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{String(errors.phone.message)}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            {...register("location")}
            placeholder="Enter your location"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{String(errors.location.message)}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}