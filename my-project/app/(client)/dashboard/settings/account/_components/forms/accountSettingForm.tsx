"use client";

import ImageWrapper from "@/components/client/image-wrapper";
import {CloudUpload, Upload} from "lucide-react";
import {Button} from "@/components/client/ux/button";
import {Label} from "@/components/client/ux/label";
import {Input} from "@/components/client/ux/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/client/ux/select";
import {Controller} from "react-hook-form";
import {useState} from "react";
import useClientAccount from "@/app/(client)/dashboard/settings/account/_hooks/useAccountForm";

export default function AccountSettingForm() {

    const [preview, setPreview] = useState<string>();

    const { errors, onSubmit, handleSubmit, register, setValue, isLoading, control, watch} = useClientAccount();

    const handleFileChange = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setValue("image", file, { shouldValidate: true });
            setPreview(URL.createObjectURL(file));
        }
    };

    const imageStr = watch("image") as string;

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v))} className="flex lg:flex-row flex-col gap-8">
            <div className="flex flex-col items-center">
                <div className="w-56 h-56 rounded-[5px] overflow-hidden mb-4">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <ImageWrapper
                            src={imageStr ?? "https://via.placeholder.com/150" }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div
                    className="border-2 border-dashed rounded-[5px] border-muted-foreground/25 w-full p-4 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) handleFileChange(file);
                    }}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <CloudUpload strokeWidth={1.25} className="w-12 h-12 text-app-theme" />
                        <p className="text-xs text-muted-foreground">Drag a photo here</p>
                        <div className="flex items-center space-x-2 w-full">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="text-xs text-gray-300 px-2">OR</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>
                        <div className="w-full">
                            <input
                                type="file"
                                accept="image/*"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileChange(file);
                                }}
                            />
                            <label htmlFor="file-upload" className="w-full">
                                <Button className="w-full" asChild size="sm" variant="theme">
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form fields */}
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="firstName">First name</Label>
                            <Input placeholder="Enter your first name" {...register("firstName")} />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="username">User name</Label>
                            <Input placeholder="Enter your username" {...register("username")} />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="dob">Date of birth</Label>
                            <Input placeholder="YYYY-MM-DD" {...register("dob")} />
                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input placeholder="Enter your last name" {...register("lastName")} />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <Select {...field} onValueChange={field.onChange} key={field.value}>
                                        <SelectTrigger id="gender" className="mt-1" size="sm">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input placeholder="Enter your email" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <Button variant="theme" size="lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
