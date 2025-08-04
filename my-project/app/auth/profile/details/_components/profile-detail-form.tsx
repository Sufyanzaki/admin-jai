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


export function ProfileDetailsForm() {
  const router = useRouter();
  const [height, setHeight] = useState(168);
  const [weight, setWeight] = useState(50)

  const handleNext = () => {
    router.push("/auth/profile/description");
    // Navigate to next step
  };

  const handleBack = () => {
    router.push("/auth/profile/create");
    console.log("Going back...");
    // Navigate to previous step
  };

  return (
    <div className="space-y-8 py-3">
      {/* Header */}
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            02
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            Tell us something about yourself?
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* About Us Section */}
        <div className="space-y-6">
          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              What do I look like?
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Hair Color *</Label>
              <Select defaultValue="brown">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brown">Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Eye Color *</Label>
              <Select defaultValue="blue">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Body Type *</Label>
              <Select defaultValue="slim">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slim">Slim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Appearance *</Label>
              <Select defaultValue="confident">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confident">Confident</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Intelligence *</Label>
              <Select defaultValue="highest-priority">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest-priority">
                    Highest Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Clothing Style(s) *</Label>
              <Select defaultValue="casual">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Mother Tongue *</Label>
              <Select defaultValue="highest-priority">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest-priority">
                    Highest Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Known Languages *</Label>
              <Select defaultValue="highest-priority">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highest-priority">
                    Highest Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Label>Weight *</Label>
              <Slider value={weight} onValueChange={setWeight} max={100} step={1} unit={"kg"} className="mt-8 mb-2"/>{" "}
            </div>
            <div className="relative">
              <Label>Height *</Label>
              <Slider value={height} onValueChange={setHeight} min={0} max={300} step={1} unit={"cm"} className="mt-8 mb-2"/>{" "}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              Education
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>
          <div>
            <Label>Education</Label>
            <Select defaultValue="universitair">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="universitair">Universitair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              Career
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>
          <div>
            <Label>Werkende sector *</Label>
            <Select defaultValue="dienstverlening">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dienstverlening">
                  In de dienstverlening
                </SelectItem>
              </SelectContent>
            </Select>
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
