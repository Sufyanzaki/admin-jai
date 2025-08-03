"use client";

import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEducationCareerInfo } from "../../_hooks/useEducationCareerInfo";

interface EducationAndCareerProps {
  memberId: string | number;
}

export default function EducationAndCareer({ memberId }: EducationAndCareerProps) {
  const { educationCareer, educationCareerLoading: loading, error } = useEducationCareerInfo();

  if (loading) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading education & career information...</span>
        </div>
      </CardContent>
    );
  }

  if (error || !educationCareer) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No education & career information available</p>
        </div>
      </CardContent>
    );
  }

  const typedEducationCareer = educationCareer as any;

  const data = {
    "Education Level": typedEducationCareer.educationLevel || "-",
    "Field of Study": typedEducationCareer.fieldOfStudy || "-",
    "Institution": typedEducationCareer.institution || "-",
    "Graduation Year": typedEducationCareer.graduationYear || "-",
    "Career": typedEducationCareer.career || "-",
    "Job Title": typedEducationCareer.jobTitle || "-",
    "Company": typedEducationCareer.company || "-",
    "Industry": typedEducationCareer.industry || "-",
    "Work Experience": typedEducationCareer.workExperience || "-",
    "Salary Range": typedEducationCareer.salaryRange || "-",
    "Employment Status": typedEducationCareer.employmentStatus || "-",
    "Skills": typedEducationCareer.skills || "-",
    "Certifications": typedEducationCareer.certifications || "-",
    "Languages Spoken": typedEducationCareer.languagesSpoken || "-",
    "Professional Goals": typedEducationCareer.professionalGoals || "-",
  };

  const validData = Object.entries(data).filter(
    ([key, value]) => value && value !== "-" && value !== ""
  );

  return (
    <CardContent>
      <div className="space-y-3 text-sm">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            {validData.map(([key, value]) => {
              if (
                ["Short Description", "Email", "Phone"].includes(key) ||
                value === "-" ||
                value === ""
              )
                return null;

              return (
                <div key={key}>
                  <div className="grid grid-cols-2 py-1">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span className="text-right font-semibold text-primary">
                      {value}
                    </span>
                  </div>
                  <Separator className="my-2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CardContent>
  );
} 