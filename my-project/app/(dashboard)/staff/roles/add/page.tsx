"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowLeft, BarChart2,
  CreditCard,
  HelpCircle,
  Info,
  LayoutDashboard, Megaphone, NotebookText, Package,
  Save, Settings,
  Sliders,
  Undo,
  UserCog,
  Users, Video
} from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Controller } from "react-hook-form";
import useRoleForm from "../_hook/useRoleForm";
import React from "react";

export const roleMenuItems = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "members", title: "Members", icon: Users },
  { id: "profile_attributes", title: "Profile Attributes", icon: UserCog },
  { id: "payments", title: "Payments", icon: CreditCard },
  { id: "frontend_settings", title: "Frontend Settings", icon: Sliders },
  { id: "faqs", title: "FAQs", icon: HelpCircle },
  { id: "blogs", title: "BLOGS", icon: NotebookText },
  { id: "packages", title: "Packages", icon: Package },
  { id: "complaints", title: "Complaints", icon: AlertCircle },
  { id: "report", title: "Report", icon: BarChart2 },
  { id: "marketing", title: "Marketing", icon: Megaphone },
  { id: "app_setting", title: "App Setting", icon: Settings },
  { id: "chat_video_setting", title: "Chat & Video Setting", icon: Video },
];

const permissionTypes = [
  { key: "canView" as const, label: "view" },
  { key: "canCreate" as const, label: "create" },
  { key: "canEdit" as const, label: "edit" },
  { key: "canDelete" as const, label: "delete" },
];

export default function AddRolePage() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    setValue,
    control,
    fields,
  } = useRoleForm();

  // Ensure permissions array matches staffMenuItems
  React.useEffect(() => {
    roleMenuItems.forEach((mod, idx) => {
      if (!fields[idx] || fields[idx].module !== mod.id) {
        setValue(`permissions.${idx}.module`, mod.id);
        setValue(`permissions.${idx}.canView`, false);
        setValue(`permissions.${idx}.canCreate`, false);
        setValue(`permissions.${idx}.canEdit`, false);
        setValue(`permissions.${idx}.canDelete`, false);
      }
    });
  }, [fields, setValue]);

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href={`/staff/roles`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Role</h1>
          <p className="text-sm text-muted-foreground">Modify role details and permissions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>Basic information about the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input id="name" placeholder="Enter role name" {...field} />
                  )}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea id="description" placeholder="Role Description" {...field} />
                )}
              />
              {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="isDefault"
                control={control}
                render={({ field }) => (
                  <Switch id="isDefault" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
              <Label htmlFor="isDefault">Set as default role</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background mt-6">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Configure access permissions for this role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {roleMenuItems.map((module, modIdx) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{module.title}</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {module.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {permissionTypes.map((type) => (
                    <Controller
                      key={type.key}
                      name={`permissions.${modIdx}.${type.key}`}
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-${type.label}`}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor={`${module.id}-${type.label}`} className="capitalize">
                            {type.label}
                          </Label>
                        </div>
                      )}
                    />
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end flex-wrap gap-2">
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
