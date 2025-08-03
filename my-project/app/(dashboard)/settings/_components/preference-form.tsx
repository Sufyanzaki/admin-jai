"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Building } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import usePreferenceSettingsForm from "@/app/(dashboard)/settings/_hooks/usePreferenceSettingForm";
import {Controller} from "react-hook-form";

export default function PreferenceForm() {
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
                                            <SelectItem value="usd">USD – US Dollar</SelectItem>
                                            <SelectItem value="eur">EUR – Euro</SelectItem>
                                            <SelectItem value="gbp">GBP – British Pound</SelectItem>
                                            <SelectItem value="cad">CAD – Canadian Dollar</SelectItem>
                                            <SelectItem value="pkr">PKR – Pakistani Rupee</SelectItem>
                                            <SelectItem value="inr">INR – Indian Rupee</SelectItem>
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
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                            <SelectItem value="ur">Urdu</SelectItem>
                                            <SelectItem value="hi">Hindi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        {errors.defaultLanguage && (
                            <p className="text-sm text-red-500">{errors.defaultLanguage.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button className="px-8" type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Configuration"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}




