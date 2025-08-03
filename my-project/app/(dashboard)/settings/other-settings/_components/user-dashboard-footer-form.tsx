"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

import { MultiSelectCombobox } from "@/components/ui/combo-box";
import { useDashboardFooterForm } from "../_hooks/useDashboardFooterForm";
import Preloader from "@/components/ui/Preloader";


const pageOptions = [
  'Home', 'About', 'Contact Us'
]

export default function UserDashboardFooterForm() {
  const {
    handleSubmit,
    isLoading,
    onSubmit,
    setValue,
    watch,
    errors,
      isLoadingDashboardFooterData
  } = useDashboardFooterForm();

  const selectedPage = watch("sectionPage") || [];

  const handlePageChange = (newSelection: string[]) => {
    setValue("sectionPage", newSelection);
  };

  if(isLoadingDashboardFooterData){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading Dashboard Settings</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(v => onSubmit(v, () => {}))}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            User Dashboard Footer Section
          </CardTitle>
          <CardDescription>
            Customize the footer content shown on the user dashboard, including links, contact info, and disclaimers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="section-page" className="text-base font-medium">
              Section Page
            </Label>
            <MultiSelectCombobox
              options={pageOptions}
              selected={selectedPage}
              onChange={handlePageChange}
            />
            {errors.sectionPage && (
              <p className="text-xs text-red-500">{errors.sectionPage.message}</p>
            )}
          </div>
          <div className="flex justify-end pt-6">
            <Button type="submit" className="px-8" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}