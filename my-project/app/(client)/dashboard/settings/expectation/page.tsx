"use client";
import { useState } from "react";
import { Suspense } from "react";
import * as React from "react";
import { Label } from "@/components/client/ux/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/client/ux/select";
import { Button } from "@/components/client/ux/button";
import { Slider } from "@/components/client/ux/slider";
import { RangeSlider } from "@/components/client/ux/range-slider";
import LocationSearchInput from "@/components/client/location-search";

export default function ExpectationPage() {
  const [ageRange, setAgeRange] = useState<[number, number]>([20, 30]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Afkomst</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Kamla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kamla">Kamla</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Ik zoek een *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Man" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="man">Man</SelectItem>
              <SelectItem value="vrouw">Vrouw</SelectItem>
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
        <div className="relative">
          <Label>Height </Label>
          <Slider
            value={168}
            onValueChange={() => {}}
            min={0}
            max={300}
            step={1}
            unit={"cm"}
            className="mt-9 mb-2"
          />{" "}
        </div>
        <div className="relative">
          <Label>Weight </Label>
          <Slider
            value={50}
            onValueChange={() => {}}
            min={0}
            max={300}
            step={1}
            unit={"cm"}
            className="mt-8 mb-2"
          />{" "}
        </div>

        <div>
          <Label>Religie</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Moslim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moslim">Moslim</SelectItem>
              <SelectItem value="hindu">Hindu</SelectItem>
              <SelectItem value="christen">Christen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Relatie Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Geen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="geen">Geen</SelectItem>
              <SelectItem value="gescheiden">Gescheiden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Onderwijs</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="MBO" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mbo">MBO</SelectItem>
              <SelectItem value="hbo">HBO</SelectItem>
              <SelectItem value="universiteit">Universiteit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Rook</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ja">Ja</SelectItem>
              <SelectItem value="nee">Nee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Drinken</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nee">Nee</SelectItem>
              <SelectItem value="ja">Ja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Uitgaan</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nee">Nee</SelectItem>
              <SelectItem value="ja">Ja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Kinderen</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-app-border rounded-[5px] !h-13 py-1 ">
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
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" size="lg" variant="theme">
            Update
          </Button>
        </div>
      </form>
    </Suspense>
  );
}
