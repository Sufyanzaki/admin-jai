"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Label} from "@/components/admin/ui/label";
import {Separator} from "@/components/admin/ui/separator";
import {TabsContent} from "@/components/admin/ui/tabs";
import {Button} from "@/components/admin/ui/button";
import useLifeStyleForm from "../add/_hooks/useLifeStyleForm";
import {Controller} from "react-hook-form";
import {useParams} from "next/navigation";
import {getUserTrackingId} from "@/lib/access-token";
import {AlertTriangle} from "lucide-react";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";

export default function LifeStyleTab({ callback }: { callback: () => void}) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    handleSubmit,
    errors,
    isLoading,
    control,
    onSubmit,
    lifeStyleLoading
  } = useLifeStyleForm();

  return (
    <TabsContent value="life_style" className="space-y-4 mt-4">
        {lifeStyleLoading ? <div className="flex items-center flex-col justify-center h-64">
                            <Preloader />
                            <p className="text-sm">Loading Life Style</p>
                        </div> : <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Complete your life style below.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
                {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div className="text-amber-700 text-sm">
                            You need to initialize a new member profile before you can add other details. Go back to basic Information to initialize a member
                        </div>
                    </div>
                </div>}
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="smoke">Smoke</Label>
                            <Controller
                                control={control}
                                name="smoke"
                                render={({ field }) => (
                                    <AttributeSelect
                                        attributeKey="smoke"
                                        value={field.value || undefined}
                                        onChange={field.onChange}
                                        placeholder="Select smoke"
                                    />
                                )}
                            />
                            {errors.smoke && <p className="text-sm text-red-500">{errors.smoke.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="drinking">Drinking</Label>
                            <Controller
                                control={control}
                                name="drinking"
                                render={({ field }) => (
                                    <AttributeSelect
                                        attributeKey="drinking"
                                        value={field.value || undefined}
                                        onChange={field.onChange}
                                        placeholder="Select drinking"
                                    />
                                )}
                            />
                            {errors.drinking && <p className="text-sm text-red-500">{errors.drinking.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goingOut">Going Out</Label>
                            <Controller
                                control={control}
                                name="goingOut"
                                render={({ field }) => (
                                    <AttributeSelect
                                        attributeKey="goingOut"
                                        value={field.value || undefined}
                                        onChange={field.onChange}
                                        placeholder="Select goingOut"
                                    />
                                )}
                            />
                            {errors.goingOut && <p className="text-sm text-red-500">{errors.goingOut.message}</p>}
                        </div>
                    </div>
                    <Separator />
                    {/* Additional Lifestyle */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Additional Lifestyle</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="exercise">Exercise</Label>
                                <Controller
                                    control={control}
                                    name="exercise"
                                    render={({ field }) => (
                                        <AttributeSelect
                                            attributeKey="exercise"
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select exercise"
                                        />
                                    )}
                                />
                                {errors.exercise && <p className="text-sm text-red-500">{errors.exercise.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diet">Diet</Label>
                                <Controller
                                    control={control}
                                    name="diet"
                                    render={({ field }) => (
                                        <AttributeSelect
                                            attributeKey="diet"
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select diet"
                                        />
                                    )}
                                />
                                {errors.diet && <p className="text-sm text-red-500">{errors.diet.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pets">Pets</Label>
                                <Controller
                                    control={control}
                                    name="pets"
                                    render={({ field }) => (
                                        <AttributeSelect
                                            attributeKey="pets"
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select pets"
                                        />
                                    )}
                                />
                                {errors.pets && <p className="text-sm text-red-500">{errors.pets.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="travel">Travel</Label>
                                <Controller
                                    control={control}
                                    name="travel"
                                    render={({ field }) => (
                                        <AttributeSelect
                                            attributeKey="travel"
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select travel"
                                        />
                                    )}
                                />
                                {errors.travel && <p className="text-sm text-red-500">{errors.travel.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nightLife">Night Life</Label>
                                <Controller
                                    control={control}
                                    name="nightLife"
                                    render={({ field }) => (
                                        <AttributeSelect
                                            attributeKey="nightLife"
                                            value={field.value || undefined}
                                            onChange={field.onChange}
                                            placeholder="Select nightLife"
                                        />
                                    )}
                                />
                                {errors.nightLife && <p className="text-sm text-red-500">{errors.nightLife.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Lifestyle"}
                        </Button>
                    </div>
                </CardContent>
            </form>
        </Card>}
    </TabsContent>
  );
} 