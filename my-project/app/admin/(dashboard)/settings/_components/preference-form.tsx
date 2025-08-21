"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/admin/ui/card";
import { Building } from "lucide-react";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/admin/ui/select";
import { Button } from "@/components/admin/ui/button";
import usePreferenceSettingsForm from "@/app/admin/(dashboard)/settings/_hooks/usePreferenceSettingForm";
import {Controller} from "react-hook-form";
import {useLanguages} from "@/app/admin/(dashboard)/settings/_hooks/useLanguages";
import {useCurrencies} from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useCurrencies";

export default function PreferenceForm({canEdit}: {canEdit: boolean}) {

    const { languages } = useLanguages();
    const { currencies } = useCurrencies();

    const {
        handleSubmit,
        onSubmit,
        setValue,
        watch,
        errors,
        control,
        isLoading,
    } = usePreferenceSettingsForm();

    const maintenanceMode = watch("maintenanceMode");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Building className="mr-2 h-5 w-5" />
                        Preferences
                    </CardTitle>
                    <CardDescription>Update your Personal Preferences</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="maintenance-mode">Maintenance Mode Activation</Label>
                            <Switch
                                id="maintenance-mode"
                                checked={maintenanceMode}
                                onCheckedChange={checked =>
                                    setValue("maintenanceMode", checked, { shouldValidate: true })
                                }
                            />
                        </div>
                        {errors.maintenanceMode && (
                            <p className="text-sm text-red-500">{errors.maintenanceMode.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="default-currency">Default Currency</Label>
                            <Controller
                                control={control}
                                name="defaultCurrency"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        key={field.value}
                                        onValueChange={value =>
                                            field.onChange(value)
                                        }
                                    >
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(currencies ?? []).map((c) => (
                                                <SelectItem key={c.currencyCode} value={c.currencyCode}>
                                                    {c.currencyName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.defaultCurrency && (
                            <p className="text-sm text-red-500">{errors.defaultCurrency.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="default-language">Default Language</Label>
                            <Controller
                                control={control}
                                name="defaultLanguage"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        key={field.value}
                                        onValueChange={value =>
                                            field.onChange(value)
                                        }
                                    >
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(languages ?? []).map((lang) => (
                                                <SelectItem key={lang.code} value={lang.code}>
                                                    {lang.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.defaultLanguage && (
                            <p className="text-sm text-red-500">{errors.defaultLanguage.message}</p>
                        )}
                    </div>

                    {canEdit && <div className="flex justify-end pt-6">
                        <Button className="px-8" type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Configuration"}
                        </Button>
                    </div>}
                </CardContent>
            </Card>
        </form>
    );
}




