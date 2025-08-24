"use client"

import React, {useState, useRef, ChangeEvent} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { Camera, X } from "lucide-react";
import useProfileForm from "@/app/admin/(dashboard)/profile/_hooks/useProfileForm";
import { useTranslation } from "react-i18next";

export default function ProfileEditForm({ onFinish }: { onFinish: () => void }) {
  const { t } = useTranslation();
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
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
      <div className="space-y-4">
  <Label>{t('Profile Picture')}</Label>
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
                {t('Click the camera icon to upload a new profile picture')}
              </p>
              {imagePreview && (
                <p className="text-xs text-green-600">
                  ✓ {t('Image selected and ready to upload')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit((data) => onSubmit(data, onFinish))} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('First Name')}</Label>
            <Input 
              id="firstName" 
              {...register("firstName")}
              placeholder={t('Enter your first name')}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message || ""}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('Last Name')}</Label>
            <Input 
              id="lastName" 
              {...register("lastName")}
              placeholder={t('Enter your last name')}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message || ""}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('Email')}</Label>
          <Input 
            id="email" 
            type="email" 
            {...register("email")}
            placeholder={t('Enter your email address')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message || ""}</p>
          )}
        </div>


        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? t('Saving...') : t('Save Changes')}
        </Button>
      </form>
    </div>
  );
}