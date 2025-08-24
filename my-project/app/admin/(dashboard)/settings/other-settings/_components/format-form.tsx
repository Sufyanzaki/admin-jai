"use client";

import {Controller} from "react-hook-form";
import {Label} from "@/components/admin/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/admin/ui/select";
import {Input} from "@/components/admin/ui/input";
import {Button} from "@/components/admin/ui/button";
import useFormatForm from "@/app/admin/(dashboard)/settings/other-settings/_hooks/useFormatForm";
import Preloader from "@/components/shared/Preloader";
import {Save} from "lucide-react";
import {DialogFooter} from "@/components/admin/ui/dialog";
import { useTranslation } from "react-i18next";
import {CurrencyDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Props = {
    currencies?: CurrencyDto[];
    setOpenFormatDialog: (open: boolean) => void;
};

export default function FormatForm({ currencies, setOpenFormatDialog }: Props) {
    const { t } = useTranslation();
    const {
        handleSubmit,
        onSubmit,
        control,
        isLoading,
        errors,
        register,
        formatLoading
    } = useFormatForm();

    if(formatLoading){
        return (
            <div className="flex items-center flex-col justify-center h-64">
                <Preloader/>
                <p className="text-sm">{t("Loading Format")}</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v, ()=>setOpenFormatDialog(false)))} className="grid gap-6">
            <div className="space-y-2">
                <Label htmlFor="default">{t("Default Currency *")}</Label>
                <Controller
                    control={control}
                    name="defaultCurrencyId"
                    render={({ field }) => (
                        <Select {...field} key={field.value} onValueChange={v=>field.onChange(Number(v))} value={String(field.value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("Select default currency")} />
                            </SelectTrigger>
                            <SelectContent>
                                {(currencies ?? []).map((currency) => (
                                    <SelectItem key={currency.id} value={String(currency.id)}>
                                        {currency.currencyName} ({currency.currencyCode})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.defaultCurrencyId && (
                    <p className="text-sm text-red-500">{errors.defaultCurrencyId.message}</p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="symbol-format">{t("Symbol Format")}</Label>
                    <Controller
                        control={control}
                        name="symbolFormat"
                        render={({ field }) => (
                            <Select {...field} key={field.value} onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("Select format")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="prefix">{t("Prefix ($100)")}</SelectItem>
                                    <SelectItem value="suffix">{t("Suffix (100$)")}</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.symbolFormat && (
                        <p className="text-sm text-red-500">{errors.symbolFormat.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="decimal-separator">{t("Decimal Separator")}</Label>
                    <Controller
                        control={control}
                        name="decimalSeparator"
                        render={({ field }) => (
                            <Select {...field} key={field.value} onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("Select separator")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=".">{t("Period (.)")}</SelectItem>
                                    <SelectItem value=",">{t("Comma (,)")}</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.decimalSeparator && (
                        <p className="text-sm text-red-500">{errors.decimalSeparator.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="decimals">{t("Decimal Places")}</Label>
                    <Input
                        id="decimals"
                        type="number"
                        min="0"
                        max="4"
                        placeholder={t("Decimal Places")}
                        {...register("decimalPlaces", {
                            valueAsNumber: true,
                            validate: (value) => {
                                if (isNaN(value)) return t("Please enter a valid number");
                                if (value < 0) return t("Value must be 0 or greater");
                                if (value > 4) return t("Value must be 4 or less");
                                return true;
                            }
                        })}
                    />
                    {errors.decimalPlaces && (
                        <p className="text-sm text-red-500">{errors.decimalPlaces.message}</p>
                    )}
                </div>

            </div>

            <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setOpenFormatDialog(false)}>
                    {t("Cancel")}
                </Button>
                <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? t("Saving...") : t("Save Format")}
                </Button>
            </DialogFooter>
        </form>
    );
}
