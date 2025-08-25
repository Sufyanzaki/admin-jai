"use client"

import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Separator } from "@/components/admin/ui/separator";
import { Textarea } from "@/components/admin/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/admin/ui/tooltip";
import { Button } from "@/components/admin/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/admin/ui/checkbox";
import { Controller } from "react-hook-form";
import useRoleForm from "../_hook/useRoleForm";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { roleMenuItems } from "../../const/permissions";

const permissionTypes = [
  { key: "canView" as const, label: "view" },
  { key: "canCreate" as const, label: "create" },
  { key: "canEdit" as const, label: "edit" },
  { key: "canDelete" as const, label: "delete" },
];

export default function RoleForm() {
  const { t } = useTranslation();
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
  useEffect(() => {
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
        <Label htmlFor="name">{t("Role Name")}</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" placeholder={t("Enter role name")} {...field} />
          )}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">{t("Role Description")}</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea id="description" placeholder={t("Role Description")} {...field} />
          )}
        />
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      <Separator />
      <div className="space-y-4">
        <Label className="text-base">{t("Basic Permissions")}</Label>
        {roleMenuItems.slice(0, 4).map((module, modIdx) => (
          <div key={module.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-medium">{t(module.title)}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t(module.title)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-4 gap-4">
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
                          {t(permConfig.label)}
                        </Label>
                      </div>
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div className="pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/staff/roles/add">
              {t("Show All Modules")}
            </Link>
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="mt-4">
        {isLoading ? t("Saving...") : t("Save Role")}
      </Button>
    </form>
  );
}