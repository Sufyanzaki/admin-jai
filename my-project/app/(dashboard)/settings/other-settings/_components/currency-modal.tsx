"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Controller } from "react-hook-form";
import useCurrencyForm from "../_hooks/useCurrencyForm";

type CurrencyModalProps = {
    setOpenAddDialog: (open: boolean) => void;
};

export default function CurrencyModal({ setOpenAddDialog }: CurrencyModalProps) {

    const {
        register,
        control,
        handleSubmit,
        onSubmit,
        isLoading,
        errors,
    } = useCurrencyForm();

    return (
        <form onSubmit={handleSubmit(v=>onSubmit(v, ()=>{setOpenAddDialog(false);}))}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="currencyName">Currency Name *</Label>
                        <Input
                            id="currencyName"
                            {...register("currencyName")}
                            placeholder="e.g. US Dollar"
                        />
                        {errors.currencyName && (
                            <p className="text-sm text-red-500">{errors.currencyName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currencyCode">Currency Code *</Label>
                        <Input
                            id="currencyCode"
                            {...register("currencyCode")}
                            placeholder="e.g. USD"
                        />
                        {errors.currencyCode && (
                            <p className="text-sm text-red-500">{errors.currencyCode.message}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="symbol">Symbol</Label>
                        <Input
                            id="symbol"
                            {...register("symbol")}
                            placeholder="e.g. $"
                        />
                        {errors.symbol && (
                            <p className="text-sm text-red-500">{errors.symbol.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="textDirection">Text Direction</Label>
                        <Controller
                            control={control}
                            name="textDirection"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select direction" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ltr">Left-to-Right (LTR)</SelectItem>
                                        <SelectItem value="rtl">Right-to-Left (RTL)</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.textDirection && (
                            <p className="text-sm text-red-500">{errors.textDirection.message}</p>
                        )}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenAddDialog(false)}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Currency"}
                </Button>
            </DialogFooter>
        </form>
    );
}
