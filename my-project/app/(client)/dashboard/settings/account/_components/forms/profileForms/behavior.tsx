"use client";

import {Checkbox} from "@/components/client/ux/checkbox";
import {Label} from "@/components/client/ux/label";
import {Button} from "@/components/client/ux/button";
import {Controller} from "react-hook-form";
import useBehaviorForm from "@/app/(client)/dashboard/settings/account/_hooks/useBehaviorForm";

const personalityTraits = [
    { key: "simple", label: "simpel" },
    { key: "calm", label: "rustig" },
    { key: "subdued", label: "ingetogen" },
    { key: "eccentric", label: "excentriek" },
    { key: "prettySmart", label: "redelijk slim" },
    { key: "stubborn", label: "koppig" },
    { key: "modest", label: "bescheiden" },
    { key: "serious", label: "serieus" },
    { key: "spontaneously", label: "spontaan" },
    { key: "sensual", label: "sensueel" },
    { key: "embarrassed", label: "verlegen" },
    { key: "artistic", label: "artistiek" },
    { key: "relaxed", label: "relaxed" },
    { key: "musical", label: "muzikaal" },
    { key: "pragmatic", label: "pragmatisch" },
    { key: "demanding", label: "veel eisend" },
    { key: "spiritual", label: "spiritueel" },
    { key: "undemanding", label: "niet-veel eisend" },
    { key: "selfish", label: "egoïstisch" },
    { key: "humorous", label: "humoristisch" },
    { key: "sharp", label: "scherp" },
    { key: "freethinking", label: "vrijdenkend" },
    { key: "straightForward", label: "recht-door-zee" },
    { key: "exuberant", label: "uitbundig" },
    { key: "sluggish", label: "sloom" },
    { key: "conservative", label: "conservatief" },
    { key: "streetSmart", label: "street smart" },
    { key: "narcissistic", label: "narcistisch" },
    { key: "talkative", label: "praatgraag" },
    { key: "altruistic", label: "altruïstisch" },
    { key: "sporty", label: "sportief" },
    { key: "romantic", label: "romantisch" },
    { key: "caring", label: "verzorgend" },
    { key: "adventurous", label: "avontuurlijk" },
    { key: "intellectual", label: "intellectueel" },
    { key: "worldly", label: "werelds" },
    { key: "compulsive", label: "dwangmatig" },
];

export function Behavior() {
    const {
        control,
        handleSubmit,
        onSubmit,
        isLoading,
        personalityBehaviorLoading,
    } = useBehaviorForm();

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-b-black">
                Behavior
            </h3>

            {personalityBehaviorLoading ? (
                <p>Loading traits...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {personalityTraits.map((trait) => (
                        <Controller
                            key={trait.key}
                            name={trait.key as keyof typeof personalityTraits}
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-start gap-2">
                                    <Checkbox
                                        checked={field.value || false}
                                        onCheckedChange={(checked) =>
                                            field.onChange(Boolean(checked))
                                        }
                                    />
                                    <Label className="capitalize text-sm mb-0">
                                        {trait.label}
                                    </Label>
                                </div>
                            )}
                        />
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
}
