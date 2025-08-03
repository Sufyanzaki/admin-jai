import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Controller} from "react-hook-form";
import useUpdateMemberStatusForm from "@/app/(dashboard)/members/_hooks/useUpdateMemberStatusForm";

export default function ManageStatus() {
    const { handleSubmit, onSubmit, errors, isLoading, control } = useUpdateMemberStatusForm();

    return (
        <Card>
            <CardHeader className="xxl:!pb-0">
                <CardTitle>Manage Status</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <Select 
                                value={field.value ? 'active' : 'inactive'} 
                                onValueChange={(value) => field.onChange(value === 'active')}
                                key={field.value}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">In Active</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.isActive && (
                        <p className="text-sm text-red-500">{errors.isActive.message}</p>
                    )}
                    <Button 
                        type="submit"
                        variant="outline" 
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Submit'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}