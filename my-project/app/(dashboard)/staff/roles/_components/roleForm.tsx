import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CreditCard, Info, LayoutDashboard, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import useRoleForm from "../_hook/useRoleForm";
import React from "react";
import { roleMenuItems } from "../add/page";

interface Module {
  id: string;
  title: string;
  icon: React.ElementType;
}

const modules: Module[] = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "members", title: "Members", icon: Users },
  { id: "profile_attributes", title: "Profile Attributes", icon: UserCog },
  { id: "payments", title: "Payments", icon: CreditCard },
];


const permissionTypes = [
  { key: "canView" as const, label: "view" },
  { key: "canCreate" as const, label: "create" },
  { key: "canEdit" as const, label: "edit" },
  { key: "canDelete" as const, label: "delete" },
];

export default function RoleForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    setValue,
    control,
    fields,
  } = useRoleForm();

  // Ensure permissions array matches modules
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid gap-2">
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

      <div className="grid gap-2">
        <Label htmlFor="description">Role Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea id="description" placeholder="Role Description" {...field} />
          )}
        />
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      <Separator />
      <div className="space-y-4">
        <Label className="text-base">Basic Permissions</Label>
        {modules.map((module, modIdx) => (
          <div key={module.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">{module.title}</Label>
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
            <div className="grid grid-cols-4 gap-4">
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
                      <Label htmlFor={`${module.id}-${type.label}`} className="text-sm capitalize">
                        {type.label}
                      </Label>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/staff/roles/add">
              Show All Modules
            </Link>
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="mt-4">
        {isLoading ? "Saving..." : "Save Role"}
      </Button>
    </form>
  );
}