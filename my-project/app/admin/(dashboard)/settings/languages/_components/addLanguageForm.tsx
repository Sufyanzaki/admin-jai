import { Button } from "@/components/admin/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import useLanguageForm, { LanguageFormValues } from "../_hooks/useLanguageForm";
import { Controller } from "react-hook-form";

export default function AddLanguageForm() {
    const { t } = useTranslation();
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
        reset,
        control,
    } = useLanguageForm();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("Create Language")}</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit((values: LanguageFormValues) => onSubmit(values))}>
                    <div className="space-y-2">
                        <Label htmlFor="name">{t("Name")}</Label>
                        <Input id="name" placeholder={t("e.g. English")} {...register("name")}/>
                        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="code">{t("Code")}</Label>
                        <Input id="code" placeholder={t("e.g. en")} {...register("code")}/>
                        {errors.code && <div className="text-red-500 text-sm">{errors.code.message}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">{t("Status")}</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={val => field.onChange(val)}
                                >
                            <SelectTrigger>
                                <SelectValue placeholder={t("Select status")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">{t("Active")}</SelectItem>
                                <SelectItem value="inactive">{t("Inactive")}</SelectItem>
                            </SelectContent>
                        </Select>
                            )}
                        />
                        {errors.status && <div className="text-red-500 text-sm">{errors.status.message}</div>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => reset()}>{t("Cancel")}</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? t("Adding...") : t("Create Language")}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}