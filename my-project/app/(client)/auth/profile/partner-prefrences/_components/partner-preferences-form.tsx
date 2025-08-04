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
import { Slider } from "@/components/client/ux/slider";
import { RangeSlider } from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";

export default function PartnerPreferencesForm() {
  const router = useRouter();
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");
  const [goingOut, setGoingOut] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 30]);
  const [height, setHeight] = useState<number>(168);
  const [weight, setWeight] = useState<number>(50);

  const handleNext = () => {
    router.push("/auth/profile/account");
    // Navigate to next step
  };

  const handleBack = () => {
    router.push("/auth/profile/photos");
    console.log("Going back...");
    // Navigate to previous step
  };


  return (
    <div className="space-y-8 py-3">
      {/* Header */}
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            05
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            What are you looking for?
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>I&apos;m looking for a *</Label>
          <Select defaultValue="man">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="man">Man</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Origin *</Label>
          <Select defaultValue="turks">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="turks">Turks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Relationship</Label>
          <Select defaultValue="single">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Religion *</Label>
          <Select defaultValue="jews">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jews">Jewish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Label>Age Range *</Label>
          <RangeSlider
            min={18}
            max={100}
            value={ageRange}
            onChange={setAgeRange}
            unit="y/o"
          />
        </div>
        <div className="relative w-full">
          <Label>Height *</Label>
          <Slider
            value={height}
            onValueChange={setHeight}
            min={0}
            max={300}
            step={1}
            unit={"cm"}
            className="mt-[38px] mb-2"
          />{" "}
        </div>
        <div className="relative w-full">
          <Label>Weight *</Label>
          <Slider
            value={weight}
            onValueChange={setWeight}
            max={100}
            step={1}
            unit={"kg"}
            className="mt-10 mb-2"
          />{" "}
        </div>
        <div>
          <Label>Education</Label>
          <Select defaultValue="University">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="University">University</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Children *</Label>
          <Select defaultValue="1">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
      <div className="flex flex-row gap-4 w-full items-center">
        <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
          Where do you live
        </h4>
        <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
      </div>
      <div className="space-y-2 grid lg:grid-cols-2 gap-5 items-end ">
        <div className="border border-app-border rounded-[5px]">
          <LocationSearchInput
            onSelect={(location) => {
              console.log("Selected location:", location);
            }}
          />
        </div>

        <div className="relative w-full">
          <Label>Search within *</Label>
          <Slider
            value={40}
            onValueChange={() => {}}
            max={100}
            step={1}
            unit={"km"}
            className="mt-7 mb-2"
          />{" "}
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
        <Button variant={"theme"} onClick={handleNext} size={"lg"}>
          Next{" "}
          <span className="ml-1">
            <ArrowRight />{" "}
          </span>
        </Button>
      </div>
    </div>
  );
}
