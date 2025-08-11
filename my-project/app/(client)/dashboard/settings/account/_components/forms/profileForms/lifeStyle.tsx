"use client";

import { Label } from "@/components/client/ux/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/client/ux/select";
import { Button } from "@/components/client/ux/button";
import { Controller } from "react-hook-form";
import useLifeStyleForm from "@/app/(client)/dashboard/settings/account/_hooks/useLifeStyleForm";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";

export function LifeStyle() {
    const {
        control,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        isFetching
    } = useLifeStyleForm();

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Lifestyle
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label>Smoke *</Label>
                    <Controller
                        name="smoke"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="smoke"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="Select smoking preference"
                            />
                        )}
                    />
                    {errors.smoke && (
                        <p className="text-red-500 text-xs mt-1">{errors.smoke.message}</p>
                    )}
                </div>

                <div>
                    <Label>Drink *</Label>
                    <Controller
                        name="drinking"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="drinking"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="Select drinking preference"
                            />
                        )}
                    />
                    {errors.drinking && (
                        <p className="text-red-500 text-xs mt-1">{errors.drinking.message}</p>
                    )}
                </div>

                <div>
                    <Label>Go out *</Label>
                    <Controller
                        name="goingOut"
                        control={control}
                        render={({ field }) => (
                            <AttributeSelect
                                attributeKey="goingOut"
                                value={field.value || undefined}
                                onChange={field.onChange}
                                placeholder="Select goingOut preference"
                            />
                        )}
                    />
                    {errors.goingOut && (
                        <p className="text-red-500 text-xs mt-1">{errors.goingOut.message}</p>
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
                    {isLoading || isFetching ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}