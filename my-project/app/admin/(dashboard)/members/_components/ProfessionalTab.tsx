"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Label} from "@/components/admin/ui/label";
import {Input} from "@/components/admin/ui/input";
import {Separator} from "@/components/admin/ui/separator";
import {Textarea} from "@/components/admin/ui/textarea";
import {TabsContent} from "@/components/admin/ui/tabs";
import {Button} from "@/components/admin/ui/button";
import useEducationCareerForm from "../add/_hooks/useEducationCareerForm";
import {Controller} from "react-hook-form";
import React from "react";
import {AlertTriangle} from "lucide-react";
import {useParams} from "next/navigation";
import {getUserTrackingId} from "@/lib/access-token";
import Preloader from "@/components/shared/Preloader";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";

export default function ProfessionalTab({ callback }: { callback: () => void }) {

  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const tracker = getUserTrackingId();
  const userId = tracker?.id ?? id;

  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    control,
    onSubmit,
    educationCareerLoading
  } = useEducationCareerForm();

  if (educationCareerLoading) {
      return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading Education, hang tight...</p>
        </div>
      );
    }

  return (
    <TabsContent value="professional" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
          <CardDescription>
            Enter the member&#39;s occupation, education, and other professional background details.
          </CardDescription>
        </CardHeader>
        {!userId && <div className="border border-amber-200 bg-amber-50 rounded-sm p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="text-amber-700 text-sm">
                  You need to initialize a new member profile before you can add other details. Go back to basic Information to initialze a member
                </div>
            </div>
          </div>}
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(v => onSubmit(v, callback))} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="primaryExpertise">Primary Specialization</Label>
                <Controller
                  name="primarySpecialization"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="primarySpecialization"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select"
                      />
                  )}
                />
                {errors.primarySpecialization && (
                  <p className="text-sm font-medium text-destructive">{errors.primarySpecialization.message}</p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="secondarySpecialization">Secondary Specialization (Optional)</Label>
                <Controller
                  name="secondarySpecialization"
                  control={control}
                  render={({ field }) => (
                      <AttributeSelect
                          attributeKey="primarySpecialization"
                          value={field.value || undefined}
                          onChange={field.onChange}
                          placeholder="Select"
                      />
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                placeholder="Enter qualifications (MD, PhD, etc.)"
                {...register("qualifications")}
              />
              {errors.qualifications && (
                <p className="text-sm font-medium text-destructive">{errors.qualifications.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm font-medium text-destructive">{errors.experience.message}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education & Training</h3>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Textarea
                  id="education"
                  placeholder="Enter education details"
                  {...register("education")}
                />
                {errors.education && (
                  <p className="text-sm font-medium text-destructive">{errors.education.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea
                  id="certifications"
                  placeholder="Enter certifications"
                  {...register("certifications")}
                />
                {errors.certifications && (
                  <p className="text-sm font-medium text-destructive">{errors.certifications.message}</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Department & Position</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="department"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select"
                        />
                    )}
                  />
                  {errors.department && (
                    <p className="text-sm font-medium text-destructive">{errors.department.message}</p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                        <AttributeSelect
                            attributeKey="position"
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder="Select"
                        />
                    )}
                  />
                  {errors.position && (
                    <p className="text-sm font-medium text-destructive">{errors.position.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Professional Details"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}