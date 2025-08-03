"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useEducationCareerForm from "../add/_hooks/useEducationCareerForm";
import { Controller } from "react-hook-form";
import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { getUserTrackingId } from "@/lib/access-token";
import Preloader from "@/components/ui/Preloader";

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
            Enter the member's occupation, education, and other professional background details.
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
                <Label htmlFor="primaryExpertise">Primary Expertise</Label>
                <Controller
                  name="primarySpecialization"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                      <SelectTrigger id="primarySpecialization">
                        <SelectValue placeholder="Select your main expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical/Engineering</SelectItem>
                        <SelectItem value="creative">Creative/Design</SelectItem>
                        <SelectItem value="business">Business Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="finance">Finance/Accounting</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="product">Product Management</SelectItem>
                        <SelectItem value="research">Research & Development</SelectItem>
                        <SelectItem value="education">Education/Training</SelectItem>
                        <SelectItem value="legal">Legal/Compliance</SelectItem>
                        <SelectItem value="healthcare">Healthcare Services</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.primarySpecialization && (
                  <p className="text-sm font-medium text-destructive">{errors.primarySpecialization.message}</p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="secondarySpecialization">Secondary Expertise (Optional)</Label>
                <Controller
                  name="secondarySpecialization"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                      <SelectTrigger id="secondarySpecialization">
                        <SelectValue placeholder="Select additional expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical/Engineering</SelectItem>
                        <SelectItem value="creative">Creative/Design</SelectItem>
                        <SelectItem value="business">Business Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="finance">Finance/Accounting</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="product">Product Management</SelectItem>
                        <SelectItem value="research">Research & Development</SelectItem>
                        <SelectItem value="education">Education/Training</SelectItem>
                        <SelectItem value="legal">Legal/Compliance</SelectItem>
                        <SelectItem value="healthcare">Healthcare Services</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="business">Business Administration</SelectItem>
                          <SelectItem value="economics">Economics</SelectItem>
                          <SelectItem value="psychology">Psychology</SelectItem>
                          <SelectItem value="literature">Literature</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="art">Art & Design</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="law">Law</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                        <SelectTrigger id="position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner/Founder</SelectItem>
                          <SelectItem value="ceo">CEO/Executive Director</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="team-lead">Team Lead</SelectItem>
                          <SelectItem value="senior">Senior Employee</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="junior">Junior Employee</SelectItem>
                          <SelectItem value="intern">Intern</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
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