"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBasicSettingsForm } from "../other-settings/_hooks/useBasicSettingsForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Upload, X } from "lucide-react";
import Preloader from "@/components/ui/Preloader";

export default function BasicSettingsForm() {
  const { 
    handleSubmit, 
    control, 
    register, 
    errors, 
    isLoading, 
    onSubmit, 
    loading, 
    systemLogoPreview,
    loginImagePreview,
    handleSystemLogoChange,
    removeSystemLogo,
    handleLoginImageChange,
    removeLoginImage,
  } = useBasicSettingsForm();

  if (loading) return (
    <div className="flex items-center flex-col justify-center h-64">
        <Preloader/>
        <p className="text-sm">Loading settings</p>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Configuration
        </CardTitle>
        <CardDescription>Manage your system settings and appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">System Identity</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" placeholder="Your System Name" {...register("systemName")} />
                    {errors.systemName && <p className="text-sm text-red-500">{errors.systemName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>System Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-lg border flex items-center justify-center bg-muted/50 overflow-hidden">
                          {systemLogoPreview ? (
                            <img
                              src={systemLogoPreview}
                              alt="Logo"
                              className="h-20 w-20 object-contain"
                            />
                          ) : (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        {systemLogoPreview && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removeSystemLogo}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => document.getElementById('system-logo')?.click()}
                          >
                            Upload Logo
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recommended: 300×300px PNG with transparent background
                        </p>
                        <Controller
                          name="systemLogo"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="file"
                              id="system-logo"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleSystemLogoChange(file);
                                }
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Date & Admin Settings */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Format Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Controller
                      name="dateFormat"
                      control={control}
                      render={({ field }) => (
                        <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                            <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.dateFormat && <p className="text-sm text-red-500">{errors.dateFormat.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-page-title">Admin Panel Title</Label>
                    <Input id="admin-page-title" placeholder="Admin Dashboard" {...register("adminPanelTitle")} />
                    {errors.adminPanelTitle && <p className="text-sm text-red-500">{errors.adminPanelTitle.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Member Settings */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Member Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-code-prefix">Member ID Prefix</Label>
                    <Input id="member-code-prefix" placeholder="MEM-" {...register("memberPrefix")} />
                    {errors.memberPrefix && <p className="text-sm text-red-500">{errors.memberPrefix.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-minimum-age">Minimum Age Requirement</Label>
                    <div className="flex items-center gap-2">
                      <Input id="member-minimum-age" type="number" min="18" max="100" className="w-24" {...register("minimumAge", { valueAsNumber: true })} />
                      <span className="text-sm text-muted-foreground">years</span>
                    </div>
                    {errors.minimumAge && <p className="text-sm text-red-500">{errors.minimumAge.message}</p>}
                  </div>
                </div>
              </div>
              {/* Admin Appearance */}
              <div className="space-y-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">Admin Appearance</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Login Background</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-24 w-32 rounded-lg border flex items-center justify-center bg-muted/50 overflow-hidden">
                          {loginImagePreview ? (
                            <img
                              src={loginImagePreview}
                              alt="Login Background"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        {loginImagePreview && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removeLoginImage}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => document.getElementById('admin-bg')?.click()}
                          >
                            Upload Background
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recommended: 1920×1080px JPG/PNG
                        </p>
                        <Controller
                          name="loginImage"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="file"
                              id="admin-bg"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleLoginImageChange(file);
                                }
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-page-paragraph">Welcome Message</Label>
                    <Textarea id="admin-page-paragraph" placeholder="Welcome to the admin panel..." rows={3} {...register("loginMessage")} />
                    {errors.loginMessage && <p className="text-sm text-red-500">{errors.loginMessage.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}