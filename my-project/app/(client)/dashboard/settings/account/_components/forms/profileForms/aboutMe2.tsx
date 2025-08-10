"use client";

import { Label } from "@/components/client/ux/label";
import { Slider } from "@/components/client/ux/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/client/ux/select";
import { Button } from "@/components/client/ux/button";
import { Controller } from "react-hook-form";
import useAboutMe2Form from "@/app/(client)/dashboard/settings/account/_hooks/useAboutMe2Form";
import Preloader from "@/components/shared/Preloader";

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
                            <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select eye color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="brown">Brown</SelectItem>
                                    <SelectItem value="green">Green</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select hair color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="black">Black</SelectItem>
                                    <SelectItem value="brown">Brown</SelectItem>
                                    <SelectItem value="blonde">Blonde</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select body type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="slim">Slim</SelectItem>
                                    <SelectItem value="athletic">Athletic</SelectItem>
                                    <SelectItem value="average">Average</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select appearance" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="confident">Confident</SelectItem>
                                    <SelectItem value="attractive">Attractive</SelectItem>
                                    <SelectItem value="friendly">Friendly</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select clothing style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="casual">Casual</SelectItem>
                                    <SelectItem value="formal">Formal</SelectItem>
                                    <SelectItem value="sporty">Sporty</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select intelligence level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="top-priority">Top priority</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="average">Average</SelectItem>
                                </SelectContent>
                            </Select>
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
