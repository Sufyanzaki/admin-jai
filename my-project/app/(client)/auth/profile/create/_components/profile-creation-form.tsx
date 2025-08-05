"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/client/ux/button";
import { Input } from "@/components/client/ux/input";
import { Label } from "@/components/client/ux/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import LocationSearchInput from "@/components/client/location-search";

export function ProfileCreationForm() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("John Doe");
  const [firstName, setFirstName] = useState("Johan");
  const [lastName, setLastName] = useState("Liebert");

  const handleNext = () => {

  };

  const handleBack = () => {
    router.push("/auth/profile/photos");
    console.log("Going back...");
  };

  return (
    <div className="space-y-6">
      <div className="text-start space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="min-w-8 w-8 min-h-8 h-8 lg:w-10 lg:h-10 bg-black text-white rounded-[5px] flex items-center justify-center font-bold text-base lg:text-xl">
            01
          </div>
          <p className="text-[22px] lg:text-3xl font-semibold">
            Create a new profile
          </p>
        </div>
      </div>

      <div className="space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Label>I&apos;m a *</Label>
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
          <Label htmlFor="displayName" required>
            Create a display name for your profile.
          </Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-12 border-gray-300"
            placeholder="Enter your display name"
            required
          />
        </div>
        <div>
          <Label htmlFor="firstName" required>
            First Name
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12 border-gray-300"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName" required>
            Last Name
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-12 border-gray-300"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <Label>Date of Birth *</Label>
          <div className="flex gap-2">
            <Select defaultValue="26">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="26">26</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="september">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="september">September</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="1993">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1993">1993</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Age</Label>
          <Input defaultValue="31" />
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
      </div>

      <div className="flex flex-row gap-4 w-full items-center">
        <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
          Where do you live
        </h4>
        <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
      </div>
      <div className="grid md:grid-cols-1 gap-4">
        <div className="border-b border-b-app-border">
          <LocationSearchInput
            onSelect={(location) => {
              console.log("Selected location:", location);
            }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-6 my-16 lg:my-26">
        <Button variant="outline" onClick={handleBack} className="p-6">
          <span className="mr-1">
            <ArrowLeft />
          </span>
          Back
        </Button>
        <Button
          variant={"theme"}
          onClick={handleNext}
          className="p-6"
          disabled={!displayName.trim()}
        >
          Next
          <span className="ml-1">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}
