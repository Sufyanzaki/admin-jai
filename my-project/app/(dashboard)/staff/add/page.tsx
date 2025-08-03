"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {ArrowLeft, Mail, Phone, Save, Upload, X} from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useCreateStaffForm } from "../_hooks/useCreateStaff";
import useRoles from "../roles/_hook/useRoles";
import {useState} from "react";

export default function AddStaffPage() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    control,
    setValue,
    watch,
  } = useCreateStaffForm();

  const { roles, loading: rolesLoading } = useRoles();

  const image = watch("image");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center flex-wrap gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/staff">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add New Staff</h1>
          <p className="text-muted-foreground">Create a new staff member profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(v => onSubmit(v, () => {}))}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter the staff member's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed">
                  <label htmlFor="photo" className="flex flex-col items-center space-y-2 cursor-pointer">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-md" />
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
                    <span className="text-xs text-muted-foreground">Upload photo</span>
                  </label>
                </div>
                {(imagePreview || image) && (
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => {
                          setValue("image", undefined);
                          setImagePreview(null);
                        }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                )}
              </div>
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="pl-8"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="pl-8"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleId">User Role</Label>
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={rolesLoading}
                    >
                      <SelectTrigger id="roleId">
                        <SelectValue placeholder={rolesLoading ? "Loading roles..." : "Select role"} />
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
              {isLoading ? "Saving..." : "Save Staff"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
