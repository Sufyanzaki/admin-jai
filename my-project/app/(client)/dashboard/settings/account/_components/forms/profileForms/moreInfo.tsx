"use client";

import { Label } from "@/components/client/ux/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/client/ux/select";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";
import { Button } from "@/components/client/ux/button";
import useMoreInfoForm from "@/app/(client)/dashboard/settings/account/_hooks/useMoreInfoForm";
import { Controller } from "react-hook-form";
import Preloader from "@/components/shared/Preloader";

export function MoreInfo() {
    const {
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isLoading,
        isFetching
    } = useMoreInfoForm();

    if(isFetching){
        return (
            <div className="flex items-center flex-col justify-center h-64 my-28">
                <Preloader/>
                <p className="text-sm">Loading</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                More Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label>Education *</Label>
                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                key={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select education" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="middelbaar">Secondary School</SelectItem>
                                    <SelectItem value="hoger">Higher Education</SelectItem>
                                    <SelectItem value="universitair">University</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.education && (
                        <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>
                    )}
                </div>
                <div>
                    <Label>Department *</Label>
                    <input
                        {...register("department")}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your department"
                    />
                    {errors.department && (
                        <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
                    )}
                </div>
                <div>
                    <Label>Primary Specialization *</Label>
                    <input
                        {...register("primarySpecialization")}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your specialization"
                    />
                    {errors.primarySpecialization && (
                        <p className="text-red-500 text-xs mt-1">{errors.primarySpecialization.message}</p>
                    )}
                </div>
                <div>
                    <Label>Mother Tongue *</Label>
                    <Controller
                        name="motherTongue"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                key={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                    <SelectItem value="german">German</SelectItem>
                                    <SelectItem value="dutch">Dutch</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.motherTongue && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.motherTongue.message}
                        </p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <Label>Known Languages *</Label>
                    <Controller
                        name="knownLanguages"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value || []}
                                options={["English", "Spanish", "French", "German", "Dutch"]}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.knownLanguages && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.knownLanguages.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    type="submit"
                    size="lg"
                    variant="theme"
                    disabled={isLoading || isFetching}
                >
                    {(isLoading || isFetching) ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}