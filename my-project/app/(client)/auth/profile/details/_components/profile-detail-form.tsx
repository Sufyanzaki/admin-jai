"use client";

import {Button} from "@/components/client/ux/button";
import {Label} from "@/components/client/ux/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/client/ux/select";
import {Input} from "@/components/client/ux/input";
import {useRouter} from "next/navigation";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Slider} from "@/components/client/ux/slider";
import useAppearanceAndCareerForm from "../_hooks/useAppearanceAndCareerForm";
import {Controller} from "react-hook-form";
import {MultiSelectCombobox} from "@/components/client/ux/combo-box";
import Preloader from "@/components/shared/Preloader";

export function ProfileDetailsForm() {

  const router = useRouter();

  const {
    errors,
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    register,
    isSubmitting
  } = useAppearanceAndCareerForm();

  const handleBack = () => {
    router.push("/auth/profile/create");
  };

  if(isLoading){
      return (
          <div className="flex items-center flex-col justify-center h-64 my-28">
              <Preloader/>
              <p className="text-sm">Loading...</p>
          </div>
      )
  }

  return (
      <form className="space-y-6" onSubmit={handleSubmit(data => onSubmit(data))}>
        <div className="space-y-8 py-3">
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

          <div className="space-y-8">
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
                  <Controller
                      name="hairColor"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Chestnut Brown" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="brown">Brown</SelectItem>
                              <SelectItem value="black">Black</SelectItem>
                              <SelectItem value="blonde">Blonde</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                              <SelectItem value="White">White</SelectItem>
                              <SelectItem value="Chestnut Brown">
                                Chestnut Brown
                              </SelectItem>
                              <SelectItem value="Dark Blond">Dark Blond</SelectItem>
                              <SelectItem value="Dark Brown">Dark Brown</SelectItem>
                              <SelectItem value="Light Brown">Light Brown</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.hairColor && (
                      <p className="text-sm text-red-500">
                        {errors.hairColor.message}
                      </p>
                  )}
                </div>
                <div>
                  <Label>Eye Color *</Label>
                  <Controller
                      name="eyeColor"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Hazel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="brown">Brown</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="hazel">Hazel</SelectItem>
                              <SelectItem value="Light Brown">Light Brown</SelectItem>
                              <SelectItem value="Dark Brown">Dark Brown</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.eyeColor && (
                      <p className="text-sm text-red-500">
                        {errors.eyeColor.message}
                      </p>
                  )}
                </div>

                <div>
                  <Label>Body Type *</Label>
                  <Controller
                      name="bodyType"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Athletic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Chubby">Chubby</SelectItem>
                              <SelectItem value="Firm">Firm</SelectItem>
                              <SelectItem value="slim">Slim</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="athletic">Athletic</SelectItem>
                              <SelectItem value="curvy">Curvy</SelectItem>
                              <SelectItem value="Muscular">Muscular</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.bodyType && (
                      <p className="text-sm text-red-500">
                        {errors.bodyType.message}
                      </p>
                  )}
                </div>
                <div>
                  <Label>Appearance *</Label>
                  <Controller
                      name="appearance"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Stylish" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confident">Confident</SelectItem>
                              <SelectItem value="Attractive">Attractive</SelectItem>
                              <SelectItem value="stylish">Stylish</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.appearance && (
                      <p className="text-sm text-red-500">
                        {errors.appearance.message}
                      </p>
                  )}
                </div>
                <div>
                  <Label>Intelligence *</Label>
                  <Controller
                      name="intelligence"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. High" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="highest-priority">High</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.intelligence && (
                      <p className="text-sm text-red-500">
                        {errors.intelligence.message}
                      </p>
                  )}
                </div>
                <div>
                  <Label>Clothing Style(s) *</Label>
                  <Controller
                      name="clothing"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Casual" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Casual">Casual</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="sporty">Sporty</SelectItem>
                              <SelectItem value="Timeless">Timeless</SelectItem>
                              <SelectItem value="Trends">Trends</SelectItem>
                              <SelectItem value="Nonchalant">Nonchalant</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.clothing && (
                      <p className="text-sm text-red-500">
                        {errors.clothing.message}
                      </p>
                  )}
                </div>

                <div>
                  <Label>Mother Tongue *</Label>
                  <Input
                      {...register("motherTongue")}
                      className="h-12 border-gray-300"
                      placeholder="e.g. Dutch"
                      required
                  />
                  {errors.motherTongue && (
                      <p className="text-sm text-red-500">
                        {errors.motherTongue.message}
                      </p>
                  )}
                </div>
                <div>
                  <Label>Known Languages *</Label>
                  <Controller
                      name="knownLanguages"
                      control={control}
                      render={({ field }) => (
                          <MultiSelectCombobox
                              selected={field.value}
                              options={["Dutch", "French", "English", "German"]}
                              onChange={field.onChange}
                          />
                      )}
                  />
                  {errors.knownLanguages && (
                      <p className="text-sm text-red-500">
                        {errors.knownLanguages.message}
                      </p>
                  )}
                </div>

                <div className="relative">
                  <Label>Weight *</Label>
                  <Controller
                      name="weight"
                      control={control}
                      render={({ field }) => (
                          <Slider
                              value={Number(field.value)}
                              onValueChange={v=>field.onChange(String(v))}
                              max={100}
                              step={1}
                              unit="kg"
                              className="mt-8 mb-2"
                          />
                      )}
                  />
                  {errors.weight && (
                      <p className="text-sm text-red-500">{errors.weight.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Label>Height *</Label>
                  <Controller
                      name="height"
                      control={control}
                      render={({ field }) => (
                          <Slider
                              value={Number(field.value)}
                              onValueChange={v=>field.onChange(String(v))}
                              min={0}
                              max={300}
                              step={1}
                              unit="cm"
                              className="mt-8 mb-2"
                          />
                      )}
                  />
                  {errors.height && (
                      <p className="text-sm text-red-500">{errors.height.message}</p>
                  )}
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
                  <Controller
                      name="education"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. University degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="universitair">Universitair</SelectItem>
                              <SelectItem value="college">College</SelectItem>
                              <SelectItem value="highschool">High School</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.education && (
                      <p className="text-sm text-red-500">
                        {errors.education.message}
                      </p>
                  )}
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
                  <Label>Department</Label>
                  <Controller
                      name="department"
                      control={control}
                      render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} key={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g. Technology" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dienstverlening">
                                In de dienstverlening
                              </SelectItem>
                              <SelectItem value="onderwijs">Onderwijs</SelectItem>
                              <SelectItem value="gezondheidszorg">
                                Gezondheidszorg
                              </SelectItem>
                              <SelectItem value="technologie">Technologie</SelectItem>
                              <SelectItem value="overig">Overig</SelectItem>
                            </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.department && (
                      <p className="text-sm text-red-500">
                        {errors.department.message}
                      </p>
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
                  variant={"theme"}
                  size={"lg"}
                  type="submit"
                  disabled={isSubmitting}
              >
                  {isSubmitting ? "Processing..." : "Next"}
                <span className="ml-1">
              <ArrowRight />
            </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
  );
}