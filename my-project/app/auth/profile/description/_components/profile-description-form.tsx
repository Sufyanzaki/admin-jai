"use client";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Textarea } from "@/components/client/ux/textarea";
import { Label } from "@/components/client/ux/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MultiSelectCombobox } from "@/components/client/ux/combo-box";

export function ProfileDescriptionForm() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [hobbySport, setHobbySport] = useState(["Autospel", "Boksen"]);
  const [hobbyMuziek, setHobbyMuziek] = useState(["R&B", "Rock"]);
  const [hobbyKeuken, setHobbyKeuken] = useState(["Italiaans"]);
  const [hobbyLezen, setHobbyLezen] = useState(["Psychologie"]);
  const [hobbyTv, setHobbyTv] = useState(["Drama"]);

  const maxCharacters = 100;

  const handleDescriptionChange = (value: string) => {
    if (value.length <= maxCharacters) {
      setDescription(value);
    }
  };

 
  const handleNext = () => {
    router.push("/auth/profile/personality");
    console.log("Description:", description);
    // Navigate to next step
  };

  const handleBack = () => {
    router.push("/auth/profile/details");
    console.log("Going back...");
    // Navigate to previous step
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            03
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            Describe yourself in a few words
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* About Me Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">About Me</Label>
            <p className="text-sm mb-1">
              <span className="font-bold">{description.length} </span>
              (Minimum 100 required)
            </p>
          </div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Tell us about yourself..."
            className="min-h-[120px] border-gray-300 resize-none"
            required
          />
        </div>

        {/* What do I look like Section */}
        <div className="space-y-4">
          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              What do I like?
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Sports *</Label>
              <MultiSelectCombobox
                selected={hobbySport}
                options={["Car racing", "Boxing", "Football"]}
                onChange={setHobbySport}
              />
            </div>

            <div>
              <Label>Music *</Label>
              <MultiSelectCombobox
                selected={hobbyMuziek}
                options={["R&B", "Rock", "Jazz", "House"]}
                onChange={setHobbyMuziek}
              />
            </div>

            <div>
              <Label>Cooking *</Label>
              <MultiSelectCombobox
                selected={hobbyKeuken}
                options={["Italian", "Greek", "Indian"]}
                onChange={setHobbyKeuken}
              />
            </div>

            <div>
              <Label>Reading *</Label>
              <MultiSelectCombobox
                selected={hobbyLezen}
                options={["Psychology", "Romance"]}
                onChange={setHobbyLezen}
              />
            </div>

            <div>
              <Label>TV Shows *</Label>
              <MultiSelectCombobox
                selected={hobbyTv}
                options={["Drama", "Documentary"]}
                onChange={setHobbyTv}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} size={"lg"}>
          <span className="mr-1">
            <ArrowLeft />{" "}
          </span>{" "}
          Back
        </Button>
        <Button variant={"theme"} size={"lg"} onClick={handleNext}>
          Next{" "}
          <span className="ml-1">
            <ArrowRight />{" "}
          </span>
        </Button>
      </div>
    </div>
  );
}
