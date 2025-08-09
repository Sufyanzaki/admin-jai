"use client";

import { Label } from "@/components/client/ux/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import { Input } from "@/components/client/ux/input";
import { Button } from "@/components/client/ux/button";
import { Controller } from "react-hook-form";
import useClientAccInfo from "@/app/(client)/dashboard/settings/account/_hooks/useClientAccInfo";
import Preloader from "@/components/shared/Preloader";

export function BasicInfo() {
    const {
        onSubmit,
        isLoading,
        isFetching,
        handleSubmit,
        register,
        control,
        errors,
    } = useClientAccInfo();

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
                Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <Label>Origin *</Label>
                    <Controller
                        name="origin"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value || "empty"}
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select origin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="turkish">Turkish</SelectItem>
                                    <SelectItem value="dutch">Dutch</SelectItem>
                                    <SelectItem value="Moroccan">Moroccan</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.origin && (
                        <p className="text-red-500 text-sm">{errors.origin.message}</p>
                    )}
                </div>

                <div>
                    <Label>Gender *</Label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value || "empty"}
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.gender && (
                        <p className="text-red-500 text-sm">{errors.gender.message}</p>
                    )}
                </div>

                <div>
                    <Label>Date of Birth *</Label>
                    <Input
                        type="date"
                        {...register("dob")}
                        placeholder="Select date"
                    />
                    {errors.dob && (
                        <p className="text-red-500 text-sm">{errors.dob.message}</p>
                    )}
                </div>

                <div>
                    <Label>Age</Label>
                    <Input
                        type="number"
                        {...register("age", { valueAsNumber: true })}
                        placeholder="Enter age"
                    />
                    {errors.age && (
                        <p className="text-red-500 text-sm">{errors.age.message}</p>
                    )}
                </div>

                <div>
                    <Label>Relationship Status</Label>
                    <Controller
                        name="relationshipStatus"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value || "empty"}
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select relationship status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Single">Single</SelectItem>
                                    <SelectItem value="Married">Married</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.relationshipStatus && (
                        <p className="text-red-500 text-sm">{errors.relationshipStatus.message}</p>
                    )}
                </div>

                <div>
                    <Label>Looking For *</Label>
                    <Controller
                        name="lookingFor"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value || "empty"}
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Man">Man</SelectItem>
                                    <SelectItem value="Woman">Woman</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.lookingFor && (
                        <p className="text-red-500 text-sm">{errors.lookingFor.message}</p>
                    )}
                </div>

                <div>
                    <Label>Children *</Label>
                    <Controller
                        name="children"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value || "empty"}
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select number of children" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.children && (
                        <p className="text-red-500 text-sm">{errors.children.message}</p>
                    )}
                </div>

            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit" size="lg" variant="theme" disabled={isLoading || isFetching}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}
