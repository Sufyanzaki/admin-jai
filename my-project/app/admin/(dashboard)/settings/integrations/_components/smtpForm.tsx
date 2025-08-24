"use client"

import {Alert, AlertDescription, AlertTitle} from "@/components/admin/ui/alert";
import {Button} from "@/components/admin/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {Input} from "@/components/admin/ui/input";
import {Label} from "@/components/admin/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/admin/ui/select";
import {Separator} from "@/components/admin/ui/separator";
import {AlertCircle, Building} from "lucide-react";
import {Controller} from "react-hook-form";
import useSmtpForm from "../_hooks/useSmtpForm";
import { useTranslation } from "react-i18next";
import Preloader from "@/components/shared/Preloader";

export default function SMTPForm({canEdit}: { canEdit: boolean}) {
  const { t } = useTranslation();
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
          <p className="text-sm">{t("Loading SMTP settings")}</p>
        </div>
    )
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              {t("SMTP Settings")}
            </CardTitle>
            <CardDescription>{t("Configure your email server settings")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* SMTP Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("SMTP Configuration")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
          <Label htmlFor="mail-host">{t("MAIL HOST")}</Label>
          <Input
            id="mail-host"
            placeholder={t("smtp.example.com")}
            {...register('host')}
            disabled={!canEdit}
          />
                  {errors.host && <p className="text-sm text-red-500">{errors.host.message}</p>}
                </div>
                <div className="grid gap-2">
          <Label htmlFor="mail-port">{t("MAIL PORT")}</Label>
          <Input
            id="mail-port"
            placeholder={t("587")}
            type="number"
            {...register('port', { valueAsNumber: true })}
            disabled={!canEdit}
          />
                  {errors.port && <p className="text-sm text-red-500">{errors.port.message}</p>}
                </div>
                <div className="grid gap-2">
          <Label htmlFor="mail-username">{t("MAIL USERNAME")}</Label>
          <Input
            id="mail-username"
            placeholder={t("your@email.com")}
            {...register('username')}
            disabled={!canEdit}
          />
                  {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </div>
                <div className="grid gap-2">
          <Label htmlFor="mail-password">{t("MAIL PASSWORD")}</Label>
          <Input
            id="mail-password"
            type="password"
            placeholder={t("••••••••")}
            {...register('password')}
            disabled={!canEdit}
          />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mail-encryption">{t("MAIL ENCRYPTION")}</Label>
                  <Controller
                      name="encryption"
                      control={control}
                      render={({ field }) => (
                          <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={!canEdit}
                          >
                              <SelectTrigger>
                                <SelectValue placeholder={t("Select encryption")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tls">{t("TLS")}</SelectItem>
                                <SelectItem value="ssl">{t("SSL")}</SelectItem>
                                <SelectItem value="none">{t("None")}</SelectItem>
                              </SelectContent>
                          </Select>
                      )}
                  />
                  {errors.encryption && <p className="text-sm text-red-500">{errors.encryption.message}</p>}
                </div>
                <div className="grid gap-2">
          <Label htmlFor="mail-from-address">{t("MAIL FROM ADDRESS")}</Label>
          <Input
            id="mail-from-address"
            placeholder={t("noreply@example.com")}
            {...register('fromAddress')}
            disabled={!canEdit}
          />
                  {errors.fromAddress && <p className="text-sm text-red-500">{errors.fromAddress.message}</p>}
                </div>
                <div className="grid gap-2">
          <Label htmlFor="mail-from-name">{t("MAIL FROM NAME")}</Label>
          <Input
            id="mail-from-name"
            placeholder={t("Your Company Name")}
            {...register('fromName')}
            disabled={!canEdit}
          />
                  {errors.fromName && <p className="text-sm text-red-500">{errors.fromName.message}</p>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Test Email */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("Test Email Configuration")}</h3>
              <div className="flex items-end gap-2">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="test-email">{t("Test Email Address")}</Label>
                  <Input id="test-email" type="email" placeholder={t("test@example.com")} disabled={!canEdit} />
                </div>
                {canEdit && (
                    <Button variant="outline" type="button">
                      {t("Send Test Email")}
                    </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("Configuration Instructions")}</h3>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("Important Notice")}</AlertTitle>
                <AlertDescription>
                  {t("Incorrect SMTP settings may cause errors during order placement, user registration, and newsletters.")}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">{t("Non-SSL Configuration")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>{t("• Use sendmail if SMTP causes issues")}</p>
                    <p>{t("• Set Mail Host per your server settings")}</p>
                    <p>{t("• Recommended port: 587")}</p>
                    <p>{t("• Try ssl if tls fails")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">{t("SSL Configuration")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>{t("• Use sendmail if SMTP causes issues")}</p>
                    <p>{t("• Set Mail Host per your server settings")}</p>
                    <p>{t("• Recommended port: 465")}</p>
                    <p>{t("• Encryption must be ssl")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>

          {canEdit && (
              <CardFooter className="flex justify-end gap-2 flex-wrap">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t("Saving...") : t("Save Settings")}
                </Button>
              </CardFooter>
          )}
        </Card>
      </form>
  );
}
