"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Label } from "@/components/admin/ui/label";
import { Building } from "lucide-react";

import { useDashboardFooterForm } from "../_hooks/useDashboardFooterForm";
import Preloader from "@/components/shared/Preloader";
import { useBasicPages } from "@/app/admin/(dashboard)/frontend-settings/_hooks/useBasicPages";
import {MultiOptionSelect} from "@/components/admin/ui/combo-box";

export default function UserDashboardFooterForm({canEdit}: { canEdit: boolean}) {
  const { basicPages, isLoading:basicLoading } = useBasicPages();

  const {
    handleSubmit,
    isLoading,
    onSubmit,
    setValue,
    watch,
    errors,
    isLoadingDashboardFooterData,
  } = useDashboardFooterForm();

  const selectedPage = watch("sectionPage") || [];

  const handlePageChange = (newSelection: { title: string; url: string }[]) => {
    setValue("sectionPage", newSelection);
  };

  if (isLoadingDashboardFooterData || basicLoading) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader />
          <p className="text-sm">Loading Dashboard Settings</p>
        </div>
    )
  }

  if(!basicPages) return;

  const customPages = basicPages
      .filter(page => page.type === "custom")
      .map(page => ({
        title: page.Title,
        url: page.Url,
      }));

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

              <MultiOptionSelect
                  options={customPages}
                  selected={selectedPage}
                  onChange={handlePageChange}
                  getLabel={(p) => p.title}
                  getKey={(p) => p.url || p.title}
              />

              {errors.sectionPage && (
                  <p className="text-xs text-red-500">{errors.sectionPage.message}</p>
              )}
            </div>
            {canEdit && <div className="flex justify-end pt-6">
              <Button type="submit" className="px-8" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Configuration"}
              </Button>
            </div>}
          </CardContent>
        </Card>
      </form>
  );
}
