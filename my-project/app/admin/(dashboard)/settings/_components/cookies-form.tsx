"use client";

import { Controller } from "react-hook-form";
import { Button } from "@/components/admin/ui/button";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";

import useCookieSettingsForm from "../_hooks/useCookieSettingsForm";
import Preloader from "@/components/shared/Preloader";
import { SimpleEditor } from "@/components/admin/tiptap-templates/simple/simple-editor";

export default function CookiesForm({canEdit} : {canEdit: boolean}) {
    const {
        handleSubmit,
        onSubmit,
        isLoading,
        setValue,
        control,
        watch,
        cookieLoading
    } = useCookieSettingsForm();

    const showAgreement = watch("showAgreement");

    if(cookieLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader />
                <p className="text-sm">Loading...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="showAgreement">Show cookie agreement</Label>
                <Switch
                    id="showAgreement"
                    checked={showAgreement}
                    onCheckedChange={(checked) => setValue("showAgreement", checked)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cookieText">Cookie Agreement Text</Label>
                <Controller
                    name="cookieText"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <SimpleEditor
                                existingValue={field.value}
                                onChange={field.onChange}
                            />
                            {fieldState.error && (
                                <p className="text-sm text-red-500">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </>
                    )}
                />
            </div>

            {canEdit && <div className="flex justify-end pt-6">
                <Button type="submit" className="px-8" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Settings"}
                </Button>
            </div>}
        </form>
    );
}
