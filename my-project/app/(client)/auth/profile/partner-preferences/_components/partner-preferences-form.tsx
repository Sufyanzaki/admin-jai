"use client";

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
import { Controller } from "react-hook-form";
import usePartnerForm from "@/app/(client)/auth/profile/partner-preferences/_hooks/usePartnerForm";

export default function PartnerPreferencesForm() {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        errors,
        isLoading,
        setValue,
        trigger,
        onSubmit,
        watch
    } = usePartnerForm();


    const ageFrom = watch("ageFrom");
    const ageTo = watch("ageTo");
    const length = watch("length");
    const weight = watch("weight");
    const searchWithIn = watch("searchWithIn");

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            await handleSubmit(onSubmit)();
            router.push("/auth/profile/account");
        }
    };

    const handleBack = () => {
        router.push("/auth/profile/photos");
    };

  return (
      <div className="space-y-8 py-3">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>I&apos;m looking for a *</Label>
              <Controller
                  name="lookingFor"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value || undefined} onValueChange={field.onChange} key={field.value || "empty"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Man">Man</SelectItem>
                          <SelectItem value="Woman">Woman</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.lookingFor && <p className="text-sm text-red-500">{errors.lookingFor.message}</p>}
            </div>

            <div>
              <Label>Origin *</Label>
              <Controller
                  name="origin"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value || undefined} onValueChange={field.onChange} key={field.value || "empty"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ethnic origin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Turks">Turks</SelectItem>
                          <SelectItem value="Hindustans">Hindustans</SelectItem>
                          <SelectItem value="Dutch">Dutch</SelectItem>
                          <SelectItem value="Creols">Creols</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.origin && <p className="text-sm text-red-500">{errors.origin.message}</p>}
            </div>

            <div>
              <Label>Relationship *</Label>
              <Controller
                  name="relationshipStatus"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value || undefined} onValueChange={field.onChange} key={field.value || "empty"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.relationshipStatus && <p className="text-sm text-red-500">{errors.relationshipStatus.message}</p>}
            </div>

            <div>
              <Label>Religion *</Label>
              <Controller
                  name="religion"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value || undefined} onValueChange={field.onChange} key={field.value || "empty"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Christian">Christian</SelectItem>
                          <SelectItem value="Muslim">Muslim</SelectItem>
                          <SelectItem value="Jewish">Jewish</SelectItem>
                          <SelectItem value="Hindu">Hindu</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.religion && <p className="text-sm text-red-500">{errors.religion.message}</p>}
            </div>

            <div className="relative">
              <Label>Age Range *</Label>
              <RangeSlider
                  min={18}
                  max={100}
                  value={[ageFrom, ageTo]}
                  onChange={([min, max]) => {
                    setValue("ageFrom", min);
                    setValue("ageTo", max);
                  }}
                  unit="y/o"
              />
              {errors.ageFrom && <p className="text-sm text-red-500">{errors.ageFrom.message}</p>}
              {errors.ageTo && <p className="text-sm text-red-500">{errors.ageTo.message}</p>}
            </div>

            <div className="relative w-full">
              <Label>Height *</Label>
                <Slider
                    value={Number(length)}
                    onValueChange={(val) => setValue("length", String(val))}
                    min={100}
                    max={250}
                    step={1}
                    unit="cm"
                    className="mt-[38px] mb-2"
                />
              {errors.length && <p className="text-sm text-red-500">{errors.length.message}</p>}
            </div>

            <div className="relative w-full">
              <Label>Weight *</Label>
                <Slider
                    value={Number(weight)}
                    onValueChange={(val) => setValue("weight", val.toString())}
                    min={30}
                    max={150}
                    step={1}
                    unit="kg"
                    className="mt-10 mb-2"
                />
              {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
            </div>

            <div>
              <Label>Education *</Label>
              <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bachelor's degree or higher">Bachelor&#39;s degree or higher</SelectItem>
                          <SelectItem value="Associate degree">Associate degree</SelectItem>
                          <SelectItem value="High school">High school</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.education && <p className="text-sm text-red-500">{errors.education.message}</p>}
            </div>

            <div>
              <Label>Children *</Label>
              <Controller
                  name="children"
                  control={control}
                  render={({ field }) => (
                      <Select value={field.value.toString()} onValueChange={(val) => field.onChange(Number(val))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of children" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  )}
              />
              {errors.children && <p className="text-sm text-red-500">{errors.children.message}</p>}
            </div>

              <div>
                  <Label>Smoke *</Label>
                  <Controller
                      name="smoke"
                      control={control}
                      render={({ field }) => (
                          <Select
                              value={field.value.toString()}
                              onValueChange={(val) => field.onChange(val === "true")}
                          >
                              <SelectTrigger>
                                  <SelectValue placeholder="Select smoking preference" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="true">Yes</SelectItem>
                                  <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                          </Select>
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
                          <Select
                              value={field.value.toString()}
                              onValueChange={(val) => field.onChange(val === "true")}
                          >
                              <SelectTrigger>
                                  <SelectValue placeholder="Select drinking preference" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="true">Yes</SelectItem>
                                  <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                          </Select>
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
                          <Select
                              value={field.value.toString()}
                              key={field.value.toString()}
                              onValueChange={(val) => field.onChange(val === "true")}
                          >
                              <SelectTrigger>
                                  <SelectValue placeholder="Select going out frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="true">Frequently</SelectItem>
                                  <SelectItem value="false">Rarely</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.goingOut && (
                      <p className="text-sm text-red-500">{errors.goingOut.message}</p>
                  )}
              </div>

          </div>

          <div className="flex flex-row gap-4 w-full items-center">
            <h4 className="text-xl font-semibold text-gray-900 w-fit text-nowrap">
              Partner Location
            </h4>
            <div className="w-full h-[0.7px] rounded-full bg-gray-200"></div>
          </div>

          <div className="space-y-2 grid lg:grid-cols-2 gap-5 items-end">
            <div className="border border-app-border rounded-[5px]">
              <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                      <LocationSearchInput
                          onSelect={(location) => {
                            field.onChange(location.city);
                            setValue("country", location.country);
                            setValue("state", location.state);
                          }}
                          placeholder="Search for city or address"
                      />
                  )}
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
              {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>

            <div className="relative w-full">
              <Label>Search within *</Label>
                <Slider
                    value={searchWithIn}
                    onValueChange={(val) => setValue("searchWithIn", val)}
                    max={100}
                    step={1}
                    unit="km"
                    className="mt-7 mb-2"
                />
              {errors.searchWithIn && <p className="text-sm text-red-500">{errors.searchWithIn.message}</p>}
            </div>
          </div>

          <div className="flex justify-center gap-6 my-16 lg:my-26">
            <Button variant="outline" onClick={handleBack} size={"lg"} type="button">
            <span className="mr-1">
              <ArrowLeft />
            </span>
              Back
            </Button>
            <Button variant="theme" type="submit" size={"lg"} disabled={isLoading} onClick={handleNext}>
              {isLoading ? "Saving..." : "Next"}
              <span className="ml-1">
              <ArrowRight />
            </span>
            </Button>
          </div>
        </form>
      </div>
  );
}