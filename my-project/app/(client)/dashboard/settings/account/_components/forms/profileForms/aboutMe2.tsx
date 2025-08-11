"use client";

import {Label} from "@/components/client/ux/label";
import {Slider} from "@/components/client/ux/slider";
import {Button} from "@/components/client/ux/button";
import {Controller} from "react-hook-form";
import useAboutMe2Form from "@/app/(client)/dashboard/settings/account/_hooks/useAboutMe2Form";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";

export function AboutMe2() {
    const {
        control,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        isFetching
    } = useAboutMe2Form();

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
                About Me
            </h3>
            <div className="grid md:grid-cols-2 gap-4">

                <div className="relative">
                    <Label>Height *</Label>
                    <Controller
                        name="height"
                        control={control}
                        render={({ field }) => (
                            <Slider
                                value={Number(field.value) || 0}
                                onValueChange={(val) => field.onChange(String(val))}
                                min={0}
                                max={300}
                                step={1}
                                unit={"cm"}
                                className="mt-8 mb-2"
                            />
                        )}
                    />
                    {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
                </div>

                <div className="relative">
                    <Label>Weight *</Label>
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <Slider
                                value={Number(field.value) || 0}
                                onValueChange={(val) => field.onChange(String(val))}
                                min={0}
                                max={300}
                                step={1}
                                unit={"kg"}
                                className="mt-8 mb-2"
                            />
                        )}
                    />
                    {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                </div>

                <div>
                    <Label>Eye Color *</Label>
                    <Controller
                        name="eyeColor"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="eyeColor"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. Chestnut Brown"
                            />
                        )}
                    />
                    {errors.eyeColor && <p className="text-red-500 text-sm">{errors.eyeColor.message}</p>}
                </div>

                <div>
                    <Label>Hair Color *</Label>
                    <Controller
                        name="hairColor"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="hairColor"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. Chestnut Brown"
                            />
                        )}
                    />
                    {errors.hairColor && <p className="text-red-500 text-sm">{errors.hairColor.message}</p>}
                </div>

                <div>
                    <Label>Body Type *</Label>
                    <Controller
                        name="bodyType"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="bodyType"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. Chestnut Brown"
                            />
                        )}
                    />
                    {errors.bodyType && <p className="text-red-500 text-sm">{errors.bodyType.message}</p>}
                </div>

                <div>
                    <Label>Appearance *</Label>
                    <Controller
                        name="appearance"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="appearance"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. Chestnut Brown"
                            />
                        )}
                    />
                    {errors.appearance && <p className="text-red-500 text-sm">{errors.appearance.message}</p>}
                </div>

                <div>
                    <Label>Clothing Style(s) *</Label>
                    <Controller
                        name="clothing"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="clothingStyles"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. Casual"
                            />
                        )}
                    />
                    {errors.clothing && <p className="text-red-500 text-sm">{errors.clothing.message}</p>}
                </div>

                <div>
                    <Label>Intelligence *</Label>
                    <Controller
                        name="intelligence"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="intelligence"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="e.g. High"
                            />
                        )}
                    />
                    {errors.intelligence && <p className="text-red-500 text-sm">{errors.intelligence.message}</p>}
                </div>

            </div>

            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}
