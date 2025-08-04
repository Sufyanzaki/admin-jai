"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Label } from "@/components/client/ux/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/client/ux/checkbox";

const personalityTraits = [
  "Simple",
  "Musical",
  "Conservative",
  "Calm",
  "Pragmatic",
  "Street Smart",
  "Reserved",
  "Serious",
  "Sharp",
  "Caring",
  "Spontaneous",
  "Open-minded",
  "Adventurous",
  "Sensual",
  "Demanding",
  "Narcissistic",
  "Eccentric",
  "Spiritual",
  "Talkative",
  "Reasonably Smart",
  "Undemanding",
  "Straightforward",
  "Intellectual",
  "Shy",
  "Exuberant",
  "Worldly",
  "Artistic",
  "Slow",
  "Altruistic",
  "Stubborn",
  "Egotistical",
  "Sporty",
  "Modest",
  "Humorous",
  "Romantic",
  "Compulsive",
  "Relaxed",
];

export function PersonalityForm() {
  const router = useRouter();
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");
  const [goingOut, setGoingOut] = useState("");

  const handleNext = () => {
    router.push("/auth/profile/photos");
  };

  const handleBack = () => {
    router.push("/auth/profile/description");
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  return (
    <div className="space-y-8 py-3">
      {/* Header */}
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

      {/* Personal Attitude & Behavior */}
      <div className="space-y-6">
        <div className="flex flex-row gap-4 w-full items-center">
          <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
            Personal Attitude & Behavior
          </h4>
          <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalityTraits.map((trait) => (
            <label key={trait} className="flex items-center gap-3 text-sm">
              <Checkbox
                checked={selectedTraits.includes(trait)}
                onCheckedChange={() => toggleTrait(trait)}
                className="h-5 w-5"
              />
              {trait}
            </label>
          ))}
        </div>
      </div>

      {/* Life Style */}
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
            <Select value={smoking} onValueChange={setSmoking}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Drinking *</Label>
            <Select value={drinking} onValueChange={setDrinking}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="socially">Socially</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Going Out *</Label>
            <Select value={goingOut} onValueChange={setGoingOut}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frequently">Frequently</SelectItem>
                <SelectItem value="sometimes">Sometimes</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} size={"lg"}>
          <span className="mr-1">
            <ArrowLeft />
          </span>{" "}
          Back
        </Button>
        <Button variant="theme" onClick={handleNext} size={"lg"}>
          Next{" "}
          <span className="ml-1">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}
