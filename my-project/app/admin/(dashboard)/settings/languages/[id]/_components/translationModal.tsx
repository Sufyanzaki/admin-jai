import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/admin/ui/dialog";
import {Label} from "@/components/admin/ui/label";
import {Input} from "@/components/admin/ui/input";
import {Button} from "@/components/admin/ui/button";
import useTranslationForm from "@/app/admin/(dashboard)/settings/languages/[id]/_hooks/useTranslationForm";

export default function TranslationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        register,
    } = useTranslationForm();

    return (
        <>
            <Button variant="default" size="sm" onClick={() => setIsOpen(true)}>
                Add New
            </Button>

            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
            }}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader className="px-1">
                        <DialogTitle>Add New</DialogTitle>
                    </DialogHeader>

                    <form
                        className="space-y-4 px-1"
                        onSubmit={handleSubmit(v=>onSubmit(v, () => setIsOpen(false)))}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="key">Key</Label>
                            <Input
                                id="key"
                                placeholder="Enter key"
                                {...register("key")}
                            />
                            {errors.key && (
                                <p className="text-sm text-red-500">{errors.key.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="text">Value</Label>
                            <Input
                                id="text"
                                placeholder="Enter value"
                                {...register("text")}
                            />
                            {errors.text && (
                                <p className="text-sm text-red-500">{errors.text.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}