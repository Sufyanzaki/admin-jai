"use client";

import {Button} from "@/components/client/ux/button";
import {Label} from "@/components/client/ux/label";
import {useRouter} from "next/navigation";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Checkbox} from "@/components/client/ux/checkbox";
import {Controller} from "react-hook-form";
import usePersonalityStyleForm from "@/app/(client)/auth/profile/personality/_hooks/usePersonalityStyleForm";
import {PersonalityBehaviorFormValues} from "@/app/admin/(dashboard)/members/add/_hooks/usePersonalityBehaviorForm";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/app/(client)/dashboard/_components/attribute-select";
import type React from "react";

interface PersonalityTrait {
  value: keyof PersonalityBehaviorFormValues;
  label: string;
}

const personalityTraits: PersonalityTrait[] = [
  { value: "simple", label: "Simple" },
  { value: "musical", label: "Musical" },
  { value: "conservative", label: "Conservative" },
  { value: "calm", label: "Calm" },
  { value: "pragmatic", label: "Pragmatic" },
  { value: "streetSmart", label: "Street Smart" },
  { value: "subdued", label: "Reserved" },
  { value: "serious", label: "Serious" },
  { value: "sharp", label: "Sharp" },
  { value: "caring", label: "Caring" },
  { value: "spontaneously", label: "Spontaneous" },
  { value: "freethinking", label: "Open-minded" },
  { value: "adventurous", label: "Adventurous" },
  { value: "sensual", label: "Sensual" },
  { value: "demanding", label: "Demanding" },
  { value: "narcissistic", label: "Narcissistic" },
  { value: "eccentric", label: "Eccentric" },
  { value: "spiritual", label: "Spiritual" },
  { value: "talkative", label: "Talkative" },
  { value: "prettySmart", label: "Reasonably Smart" },
  { value: "undemanding", label: "Undemanding" },
  { value: "straightForward", label: "Straightforward" },
  { value: "intellectual", label: "Intellectual" },
  { value: "embarrassed", label: "Shy" },
  { value: "exuberant", label: "Exuberant" },
  { value: "worldly", label: "Worldly" },
  { value: "artistic", label: "Artistic" },
  { value: "sluggish", label: "Slow" },
  { value: "altruistic", label: "Altruistic" },
  { value: "stubborn", label: "Stubborn" },
  { value: "selfish", label: "Egotistical" },
  { value: "sporty", label: "Sporty" },
  { value: "modest", label: "Modest" },
  { value: "humorous", label: "Humorous" },
  { value: "romantic", label: "Romantic" },
  { value: "compulsive", label: "Compulsive" },
  { value: "relaxed", label: "Relaxed" },
];

export function PersonalityForm() {
  const router = useRouter();
  const {
    handleSubmit,
    errors,
    isSubmitting,
    control,
    onSubmit,
    isFetching,
  } = usePersonalityStyleForm();

  const handleBack = () => {
    router.push("/auth/profile/description");
  };

  if(isFetching){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading...</p>
        </div>
    )
  }

  return (
      <div className="space-y-8 py-3">
        <div className="text-start space-y-4">
          <div className="flex items-center justify-start space-x-3">
            <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
              04
            </div>
            <p className="text-[22px] lg:text-3xl font-semibold">
              Tell us about your personality
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(v=>onSubmit(v))} className="space-y-6">
          <div className="space-y-6">
            <div className="flex flex-row gap-4 w-full items-center">
              <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
                Personal Attitude & Behavior
              </h4>
              <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {personalityTraits.map((trait) => (
                  <label key={trait.value} className="flex items-center gap-3 text-sm">
                    <Controller
                        name={trait.value}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-5 w-5"
                            />
                        )}
                    />
                    {trait.label}
                  </label>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-row gap-4 w-full items-center mt-8">
              <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
                Life Style
              </h4>
              <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Smoke *</Label>
                <Controller
                    name="smoke"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="smoke"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select smoking habit"
                        />
                    )}
                />
                {errors.smoke && (
                    <p className="text-sm text-red-500">{errors.smoke.message}</p>
                )}
              </div>

              <div>
                <Label>Drinking *</Label>
                <Controller
                    name="drinking"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="drinking"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select drinking habit"
                        />
                    )}
                />
                {errors.drinking && (
                    <p className="text-sm text-red-500">{errors.drinking.message}</p>
                )}
              </div>

              <div>
                <Label>Going Out *</Label>
                <Controller
                    name="goingOut"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="goingOut"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select goingOut habit"
                        />
                    )}
                />
                {errors.goingOut && (
                    <p className="text-sm text-red-500">{errors.goingOut.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 my-16 lg:my-26">
            <Button
                variant="outline"
                onClick={handleBack}
                size={"lg"}
                type="button"
            >
            <span className="mr-1">
              <ArrowLeft />
            </span>
              Back
            </Button>
            <Button
                variant="theme"
                size={"lg"}
                type="submit"
                disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Next"}
              <span className="ml-1">
              <ArrowRight />
            </span>
            </Button>
          </div>
        </form>
      </div>
  );
}