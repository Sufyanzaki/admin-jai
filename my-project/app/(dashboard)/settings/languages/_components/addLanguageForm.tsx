import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useLanguageForm, { LanguageFormValues } from "../_hooks/useLanguageForm";
import { Controller } from "react-hook-form";

export default function AddLanguageForm() {
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
                <CardTitle>Create Language</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit((values: LanguageFormValues) => onSubmit(values))}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="e.g. English" {...register("name")}/>
                        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="code">Code</Label>
                        <Input id="code" placeholder="e.g. en" {...register("code")}/>
                        {errors.code && <div className="text-red-500 text-sm">{errors.code.message}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={val => field.onChange(val)}
                                >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                            )}
                        />
                        {errors.status && <div className="text-red-500 text-sm">{errors.status.message}</div>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => reset()}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Create Language"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}