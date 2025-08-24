"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Save,
  Upload,
  X,
} from "lucide-react";
import { useEditStaffForm } from "../../_hooks/useEditStaffForm";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";
import { useEffect, useState } from "react";
import useRoles from "@/app/admin/(dashboard)/staff/roles/_hook/useRoles";
import Image from "next/image";

export default function EditStaffPage() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    staffLoading,
    onSubmit,
    setValue,
    control,
    staffMember,
  } = useEditStaffForm();

  const { roles, loading: rolesLoading } = useRoles();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (staffMember?.image) {
      setImagePreview(staffMember.image);
    } else {
      setImagePreview(null);
    }
  }, [staffMember]);

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
      setValue("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined);
    setImagePreview(null);
  };

  if (staffLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">{t("Loading Member")}</p>
        </div>
    );
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex items-center flex-wrap gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/staff">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{t("Back")}</span>
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              {t("Edit Staff")}
            </h1>
            <p className="text-muted-foreground">
              {t("Edit a staff member profile")}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>{t("Personal Information")}</CardTitle>
              <CardDescription>
                {t("Enter the staff member's basic information")}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed">
                    <label
                        htmlFor="photo"
                        className="flex flex-col items-center space-y-2 cursor-pointer"
                    >
                      {imagePreview ? (
                          <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="h-full w-full object-cover rounded-md"
                              onError={() => setImagePreview(null)}
                          />
                      ) : (
                          <Upload className="h-8 w-8 text-muted-foreground" />
                      )}
                      <input
                          type="file"
                          id="photo"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                      />
                      <span className="text-xs text-muted-foreground">
                      {t("Upload photo")}
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

                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
          <Label htmlFor="firstName">{t("First Name")}</Label>
          <Input
            id="firstName"
            placeholder={t("Enter first name")}
            {...register("firstName")}
          />
                    {errors.firstName && (
                        <p className="text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                    )}
                  </div>

                  <div className="space-y-2">
          <Label htmlFor="lastName">{t("Last Name")}</Label>
          <Input
            id="lastName"
            placeholder={t("Enter last name")}
            {...register("lastName")}
          />
                    {errors.lastName && (
                        <p className="text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("Email Address")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder={t("Enter email address")}
            className="pl-8"
            {...register("email")}
          />
                    {errors.email && (
                        <p className="text-sm text-red-600">
                          {errors.email.message}
                        </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("Phone Number")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder={t("Enter phone number")}
            className="pl-8"
            {...register("phone")}
          />
                    {errors.phone && (
                        <p className="text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roleId">{t("User Role")}</Label>
                  <Controller
                      name="roleId"
                      control={control}
                      render={({ field }) => (
                          <Select
                              onValueChange={field.onChange}
                              value={String(field.value)}
                              disabled={rolesLoading}
                              key={field.value}
                          >
                            <SelectTrigger id="roleId">
                              <SelectValue placeholder={rolesLoading ? t("Loading roles...") : t("Select role")} />
                            </SelectTrigger>
                            <SelectContent>
                              {roles &&
                                  roles.map((role) => (
                                      <SelectItem key={role.id} value={String(role.id)}>
                                        {role.name}
                                      </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                      )}
                  />
          {errors.roleId && (
              <p className="text-xs text-red-500">{errors.roleId.message}</p>
            )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? t("Saving...") : t("Save Staff")}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
  );
}
