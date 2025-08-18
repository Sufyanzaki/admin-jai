"use client";

import {Button} from "@/components/admin/ui/button";
import {Calendar} from "@/components/admin/ui/calendar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Input} from "@/components/admin/ui/input";
import {Label} from "@/components/admin/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/admin/ui/popover";
import {TabsContent} from "@/components/admin/ui/tabs";
import {Textarea} from "@/components/admin/ui/textarea";
import {Mail, Upload} from "lucide-react";
import useCreateUserForm from "../add/_hooks/useCreateUser";
import {Controller} from "react-hook-form";
import React, {useEffect, useRef} from "react";
import {getUserTrackingId} from "@/lib/access-token";
import {useParams} from "next/navigation";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";

type PersonalInfoTabProps = {
  fetchFinishCallback: (val:boolean)=>void;
  callback: ()=>void;
}

export default function PersonalInfoTab({ callback, fetchFinishCallback } : PersonalInfoTabProps) {

  const params = useParams();
  const {id} = params;

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    control,
    setValue,
    onSubmit,
    userLoading,
      watch
  } = useCreateUserForm();

  useEffect(() => fetchFinishCallback(userLoading), [userLoading])

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageValue = watch("image");

  // Helper to get preview URL from image value (file or url)
  const getImagePreview = (image: File | string | undefined) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (userLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading basic info, hang tight...</p>
      </div>
    );
  }

  return (
    <TabsContent value="personal" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your personal details.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed relative">
                {getImagePreview(imageValue) ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={getImagePreview(imageValue)}
                      alt="Preview"
                      className="object-cover w-32 h-32 rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full shadow p-1 text-xs"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label htmlFor="profile-photo" className="flex flex-col items-center space-y-2 cursor-pointer w-full h-full justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <input
                      type="file"
                      id="profile-photo"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <span className="text-xs text-muted-foreground">Upload photo</span>
                  </label>
                )}
              </div>
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter username" {...register("username")} />
                  {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" {...register("firstName")} />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" {...register("lastName")} />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-of-birth">Date of Birth</Label>
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <span>{field.value ? new Date(field.value).toDateString() : "Pick a date"}</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={date => field.onChange(date ? date.toISOString().slice(0, 10) : "")}/>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
                </div>
              </div>
            </div>
            {/* Contact Information */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="Enter email" className="pl-8" {...register("email")} />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                {!(getUserTrackingId() || id) && <><Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter Password" type="password" {...register("password")} />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}</>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" placeholder="Enter origin" {...register("origin")} />
                {errors.origin && <p className="text-sm text-red-500">{errors.origin.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="origin" placeholder="Enter phone" {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>
            {/* Personal Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="iAmA"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select gender"
                        />
                    )}
                />
                {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="Enter age" type="number" {...register("age")} />
                {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="relation">Relation Status</Label>
                <Controller
                    name="relationshipStatus"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="relationStatus"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select status"
                        />
                    )}
                />
                {errors.relationshipStatus && <p className="text-sm text-red-500">{errors.relationshipStatus.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="children">Children</Label>
                <Controller
                    name="children"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="children"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select status"
                        />
                    )}
                />
                {errors.children && <p className="text-sm text-red-500">{errors.children.message}</p>}
              </div>
            </div>
            {/* Additional Information */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Controller
                  control={control}
                  name="religion"
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="religion"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select religion"
                      />
                  )}
                />
                {errors.religion && <p className="text-sm text-red-500">{errors.religion.message}</p>}
              </div>
            
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Introduce yourself briefly. Minimum 100 characters."
                  className="min-h-[100px]"
                  {...register("shortDescription")}
                />
                {errors.shortDescription && <p className="text-sm text-red-500">{errors.shortDescription.message}</p>}
              </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </TabsContent>
  );
}