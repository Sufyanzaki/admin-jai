"use client"

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {AlertCircle, Building} from "lucide-react";
import {Controller} from "react-hook-form";
import useSmtpForm from "../_hooks/useSmtpForm";
import Preloader from "@/components/ui/Preloader";

export default function SMTPForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    isLoadingData,
    control,
  } = useSmtpForm();

  if (isLoadingData) {
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <Preloader/>
          <p className="text-sm">Loading SMTP settings</p>
        </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            SMTP Settings
          </CardTitle>
          <CardDescription>Configure your email server settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SMTP Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">SMTP Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mail-host">MAIL HOST</Label>
                <Input
                  id="mail-host"
                  placeholder="smtp.example.com"
                  {...register('host')}
                />
                {errors.host && (
                  <p className="text-sm text-red-500">{errors.host.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-port">MAIL PORT</Label>
                <Input
                  id="mail-port"
                  placeholder="587"
                  type="number"
                  {...register('port', { valueAsNumber: true })}
                />
                {errors.port && (
                  <p className="text-sm text-red-500">{errors.port.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-username">MAIL USERNAME</Label>
                <Input
                  id="mail-username"
                  placeholder="your@email.com"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-password">MAIL PASSWORD</Label>
                <Input
                  id="mail-password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-encryption">MAIL ENCRYPTION</Label>
                <Controller
                  name="encryption"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select encryption" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.encryption && (
                  <p className="text-sm text-red-500">{errors.encryption.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-from-address">MAIL FROM ADDRESS</Label>
                <Input
                  id="mail-from-address"
                  placeholder="noreply@example.com"
                  {...register('fromAddress')}
                />
                {errors.fromAddress && (
                  <p className="text-sm text-red-500">{errors.fromAddress.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mail-from-name">MAIL FROM NAME</Label>
                <Input
                  id="mail-from-name"
                  placeholder="Your Company Name"
                  {...register('fromName')}
                />
                {errors.fromName && (
                  <p className="text-sm text-red-500">{errors.fromName.message}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Test Email */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Test Email Configuration</h3>
            <div className="flex items-end gap-2">
              <div className="flex-1 grid gap-2">
                <Label htmlFor="test-email">Test Email Address</Label>
                <Input id="test-email" type="email" placeholder="test@example.com" />
              </div>
              <Button variant="outline" type="button">
                Send Test Email
              </Button>
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuration Instructions</h3>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                Incorrect SMTP settings may cause errors during order placement, user registration, and newsletters.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Non-SSL Configuration</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Use <strong>sendmail</strong> if SMTP causes issues</p>
                  <p>• Set <strong>Mail Host</strong> per your server settings</p>
                  <p>• Recommended port: <code>587</code></p>
                  <p>• Try <code>ssl</code> if <code>tls</code> fails</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">SSL Configuration</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Use <strong>sendmail</strong> if SMTP causes issues</p>
                  <p>• Set <strong>Mail Host</strong> per your server settings</p>
                  <p>• Recommended port: <code>465</code></p>
                  <p>• Encryption must be <code>ssl</code></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 flex-wrap">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}