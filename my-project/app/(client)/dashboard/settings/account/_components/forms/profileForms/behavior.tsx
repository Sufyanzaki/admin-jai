"use client";

import {Checkbox} from "@/components/client/ux/checkbox";
import {Label} from "@/components/client/ux/label";
import {Button} from "@/components/client/ux/button";
import {Controller} from "react-hook-form";
import useBehaviorForm from "@/app/(client)/dashboard/settings/account/_hooks/useBehaviorForm";
import { useTranslation } from "react-i18next";

type PersonalityTraitKey = keyof ReturnType<typeof useBehaviorForm>['control']['_defaultValues'];

interface PersonalityTrait {
    key: PersonalityTraitKey;
    label: string;
}

const personalityTraits: PersonalityTrait[] = [
    { key: "simple", label: "Simple" },
    { key: "musical", label: "Musical" },
    { key: "conservative", label: "Conservative" },
    { key: "calm", label: "Calm" },
    { key: "pragmatic", label: "Pragmatic" },
    { key: "streetSmart", label: "Street smart" },
    { key: "subdued", label: "Subdued" },
    { key: "demanding", label: "Demanding" },
    { key: "narcissistic", label: "Narcissistic" },
    { key: "eccentric", label: "Eccentric" },
    { key: "spiritual", label: "Spiritual" },
    { key: "talkative", label: "Talkative" },
    { key: "prettySmart", label: "Pretty smart" },
    { key: "undemanding", label: "Undemanding" },
    { key: "altruistic", label: "Altruistic" },
    { key: "stubborn", label: "Stubborn" },
    { key: "selfish", label: "Selfish" },
    { key: "sporty", label: "Sporty" },
    { key: "modest", label: "Modest" },
    { key: "humorous", label: "Humorous" },
    { key: "romantic", label: "Romantic" },
    { key: "serious", label: "Serious" },
    { key: "sharp", label: "Sharp" },
    { key: "caring", label: "Caring" },
    { key: "spontaneously", label: "Spontaneous" },
    { key: "freethinking", label: "Freethinking" },
    { key: "adventurous", label: "Adventurous" },
    { key: "sensual", label: "Sensual" },
    { key: "straightForward", label: "Straightforward" },
    { key: "intellectual", label: "Intellectual" },
    { key: "embarrassed", label: "Embarrassed" },
    { key: "exuberant", label: "Exuberant" },
    { key: "worldly", label: "Worldly" },
    { key: "artistic", label: "Artistic" },
    { key: "sluggish", label: "Sluggish" },
    { key: "compulsive", label: "Compulsive" },
    { key: "relaxed", label: "Relaxed" }
];

export function Behavior() {
    const { t } = useTranslation();
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
                {t("Behavior")}
            </h3>

            {personalityBehaviorLoading ? (
                <p>{t("Loading traits...")}</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {personalityTraits.map((trait) => (
                        <Controller
                            key={trait.key}
                            name={trait.key}
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
                                        {t(trait.label)}
                                    </Label>
                                </div>
                            )}
                        />
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button size="lg" variant="theme" type="submit" disabled={isLoading}>
                    {isLoading ? t("Updating...") : t("Update")}
                </Button>
            </div>
        </form>
    );
}