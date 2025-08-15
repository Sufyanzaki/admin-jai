"use client"

import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Input} from "@/components/admin/ui/input"
import {Label} from "@/components/admin/ui/label"
import {Textarea} from "@/components/admin/ui/textarea"
import {Checkbox} from "@/components/admin/ui/checkbox"
import {Separator} from "@/components/admin/ui/separator"
import {
  AlertCircle,
  ArrowLeft,
  BarChart2,
  Bell,
  Coins,
  Cookie,
  CreditCard,
  DollarSign,
  FileText,
  Filter,
  HelpCircle,
  Languages,
  Layout,
  LayoutDashboard,
  List,
  Mail,
  NotebookText,
  Package,
  Save,
  Search,
  Server,
  Settings,
  Share2,
  Sliders,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  Video
} from "lucide-react"
import Link from "next/link"
import {Switch} from "@/components/admin/ui/switch"
import {Controller} from "react-hook-form";
import useRoleForm from "../_hook/useRoleForm";
import React from "react";

export const roleMenuItems = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, permissions: ["canView"] },
  { id: "members", title: "Members", icon: Users, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "profile_attributes", title: "Profile Attributes", icon: UserCog, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "payments", title: "Payments", icon: CreditCard, permissions: ["canView", "canCreate", "canEdit"] },
  { id: "frontend_settings", title: "Frontend Settings", icon: Sliders, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "faqs", title: "FAQs", icon: HelpCircle, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "faqs_category", title: "FAQs Category", icon: List, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "blogs", title: "Blogs", icon: NotebookText, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "blogs_category", title: "Blogs Category", icon: List, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "packages", title: "Packages", icon: Package, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "complaints", title: "Complaints", icon: AlertCircle, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "financial", title: "Financial", icon: DollarSign, permissions: ["canView"] },
  { id: "income", title: "Income", icon: TrendingUp, permissions: ["canView"] },
  { id: "member_report", title: "Member Report", icon: FileText, permissions: ["canView"] },
  { id: "newsletter", title: "Newsletter", icon: Mail, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "banners", title: "Banners", icon: Image, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "general_settings", title: "General Settings", icon: Settings, permissions: ["canEdit"] },
  { id: "preferences", title: "Preferences", icon: Sliders, permissions: ["canEdit"] },
  { id: "analytic", title: "Analytic", icon: BarChart2, permissions: ["canView"] },
  { id: "seo_settings", title: "SEO Settings", icon: Search, permissions: ["canEdit"] },
  { id: "language", title: "Language", icon: Languages, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "currency", title: "Currency", icon: Coins, permissions: ["canView", "canEdit"] },
  { id: "payment_methods", title: "Payment Methods", icon: CreditCard, permissions: ["canEdit"] },
  { id: "smtp_settings", title: "SMTP Settings", icon: Mail, permissions: ["canEdit"] },
  { id: "email_templates", title: "Email Templates", icon: Mail, permissions: ["canEdit"] },
  { id: "third_party_settings", title: "Third Party Settings", icon: Settings, permissions: ["canEdit"] },
  { id: "cookie", title: "Cookie", icon: Cookie, permissions: ["canEdit"] },
  { id: "social_media_login", title: "Social Media Login", icon: Share2, permissions: ["canEdit"] },
  { id: "abuse_word_filtering", title: "Abuse Word Filtering", icon: Filter, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "push_notification", title: "Push Notification", icon: Bell, permissions: ["canEdit"] },
  { id: "staffs", title: "Staffs", icon: UserCheck, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "system", title: "System", icon: Server, permissions: ["canView"] },
  { id: "footer", title: "Footer", icon: Layout, permissions: ["canView"] },
  { id: "footer_section", title: "Footer Section", icon: Layout, permissions: ["canView", "canCreate", "canEdit", "canDelete"] },
  { id: "chat_video_setting", title: "Chat & Video Setting", icon: Video, permissions: ["canEdit"] }
] as const;

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
          <Link href={`/admin/staff/roles`}>
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
                    <div className="flex gap-8 justify-start items-center">
                      {module.permissions.map((permKey) => {
                        const permConfig = permissionTypes.find((p) => p.key === permKey);
                        if (!permConfig) return null;
                        return (
                            <Controller
                                key={permConfig.key}
                                name={`permissions.${modIdx}.${permConfig.key}`}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                          id={`${module.id}-${permConfig.label}`}
                                          checked={!!field.value}
                                          onCheckedChange={field.onChange}
                                      />
                                      <Label htmlFor={`${module.id}-${permConfig.label}`} className="capitalize">
                                        {permConfig.label}
                                      </Label>
                                    </div>
                                )}
                            />
                        );
                      })}
                    </div>
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
