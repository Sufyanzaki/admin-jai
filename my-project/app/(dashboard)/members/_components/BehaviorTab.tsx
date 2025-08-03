"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import usePersonalityBehaviorForm from "../add/_hooks/usePersonalityBehaviorForm";
import React from "react";
import type { PersonalityBehaviorFormValues } from "../add/_hooks/usePersonalityBehaviorForm";
import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import Preloader from "@/components/ui/Preloader";

const traitMap: { key: keyof PersonalityBehaviorFormValues; label: string }[] = [
  { key: "simple", label: "simpel" },
  { key: "musical", label: "muzikaal" },
  { key: "conservative", label: "conservatief" },
  { key: "calm", label: "rustig" },
  { key: "pragmatic", label: "pragmatisch" },
  { key: "streetSmart", label: "street smart" },
  { key: "subdued", label: "ingetogen" },
  { key: "demanding", label: "veeleisend" },
  { key: "narcissistic", label: "narcistisch" },
  { key: "eccentric", label: "excentriek" },
  { key: "spiritual", label: "spiritueel" },
  { key: "talkative", label: "praatgraag" },
  { key: "prettySmart", label: "redelijk slim" },
  { key: "undemanding", label: "niet-veeleisend" },
  { key: "altruistic", label: "altruïstisch" },
  { key: "stubborn", label: "koppig" },
  { key: "selfish", label: "egoïstisch" },
  { key: "sporty", label: "sportief" },
  { key: "modest", label: "bescheiden" },
  { key: "humorous", label: "humoristisch" },
  { key: "romantic", label: "romantisch" },
  { key: "serious", label: "serieus" },
  { key: "sharp", label: "scherp" },
  { key: "caring", label: "verzorgend" },
  { key: "spontaneously", label: "spontaan" },
  { key: "freethinking", label: "vrijdenkend" },
  { key: "adventurous", label: "avontuurlijk" },
  { key: "sensual", label: "sensueel" },
  { key: "straightForward", label: "recht-door-zee" },
  { key: "intellectual", label: "intellectueel" },
  { key: "embarrassed", label: "verlegen" },
  { key: "exuberant", label: "uitbundig" },
  { key: "worldly", label: "werelds" },
  { key: "artistic", label: "artistiek" },
  { key: "sluggish", label: "sloom" },
  { key: "compulsive", label: "dwangmatig" },
  { key: "relaxed", label: "relaxed" },
];

export default function BehaviorTab({ callback }: { callback: () => void }) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    handleSubmit,
    isLoading,
    setValue,
    watch,
    personalityBehaviorLoading,
    onSubmit,
  } = usePersonalityBehaviorForm();

  if (personalityBehaviorLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading Personality & Behavior, Hang tight...</p>
      </div>
    );
  }

  return (
    <TabsContent value="behavior" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Personality Traits</CardTitle>
          <CardDescription>
            Select traits that best describe the member’s personality, lifestyle, and values.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit((values) => onSubmit(values, callback))}>
        {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-amber-700 text-sm">
                  You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member
                </div>
            </div>
          </div>}
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {traitMap.map((trait, index) => (
                <div key={trait.key} className="flex items-center gap-6">
                  <Switch
                    id={`trait-${index}`}
                    checked={Boolean(watch(trait.key as keyof PersonalityBehaviorFormValues))}
                    onCheckedChange={checked => setValue(trait.key as keyof PersonalityBehaviorFormValues, checked)}
                  />
                  <Label htmlFor={`trait-${index}`} className="capitalize">
                    {trait.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Personality Traits"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </TabsContent>
  );
} 