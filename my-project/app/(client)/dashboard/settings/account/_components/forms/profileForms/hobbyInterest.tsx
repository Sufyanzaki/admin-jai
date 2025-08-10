import { Label } from "@/components/client/ux/label";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";
import { Button } from "@/components/client/ux/button";
import { Controller } from "react-hook-form";
import useHobbiesForm from "@/app/(client)/dashboard/settings/account/_hooks/useHobbiesForm";

export function HobbyInterest() {
    const {
        control,
        handleSubmit,
        onSubmit,
        isLoading,
    } = useHobbiesForm();

    return (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Hobbies and Interests
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label>Sports *</Label>
                    <Controller
                        name="sports"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value ? field.value.split(",") : []}
                                options={["Car Racing", "Boxing", "Football"]}
                                onChange={(val) => field.onChange(val.join(","))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Label>Music *</Label>
                    <Controller
                        name="music"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value ? field.value.split(",") : []}
                                options={["R&B", "Rock", "Jazz", "House"]}
                                onChange={(val) => field.onChange(val.join(","))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Label>Cuisine *</Label>
                    <Controller
                        name="kitchen"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value ? field.value.split(",") : []}
                                options={["Italian", "Greek", "Indian"]}
                                onChange={(val) => field.onChange(val.join(","))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Label>Reading *</Label>
                    <Controller
                        name="reading"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value ? field.value.split(",") : []}
                                options={["Psychology", "Novels"]}
                                onChange={(val) => field.onChange(val.join(","))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Label>TV Shows *</Label>
                    <Controller
                        name="tvShows"
                        control={control}
                        render={({ field }) => (
                            <MultiSelectCombobox
                                selected={field.value ? field.value.split(",") : []}
                                options={["Drama", "Documentary"]}
                                onChange={(val) => field.onChange(val.join(","))}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}
