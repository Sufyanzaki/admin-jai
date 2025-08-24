"use client"
import {Button} from "@/components/admin/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/admin/ui/card"
import {Input} from "@/components/admin/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table"
import {ArrowLeft, Mail, PencilIcon,} from "lucide-react"
import Link from "next/link"
import {Badge} from "@/components/admin/ui/badge"
import {useEmailTemplates} from "./_hooks/useEmailTemplates";
import {useState} from "react";
import Preloader from "@/components/shared/Preloader"
import { useSession } from "next-auth/react"
import { useTranslation } from "react-i18next";

export default function NotificationsPage() {
  const { t } = useTranslation();

  const {data: session} = useSession();

  const { emailTemplates, loading, error } = useEmailTemplates();
  const [search, setSearch] = useState("");

  const filteredTemplates = (emailTemplates?.templates ?? []).filter(template => {
    const subject = template.translations[0]?.subject || "";
    return (
      template.key.toLowerCase().includes(search.toLowerCase()) ||
      subject.toLowerCase().includes(search.toLowerCase())
    );
  });

  let permissions;
  if (session?.user.permissions) {
    permissions = session.user.permissions.find(permission => permission.module === "email_templates");
  }

  const canEdit = permissions?.canEdit ?? true;

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/admin/settings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t("Back")}</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t("Notification Settings")}</h1>
          <p className="text-sm text-muted-foreground">{t("Configure email, SMS, and in-app notifications")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Welcome Email")}</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">{emailTemplates?.stats?.welcomeEmail ?? 0}</h2>
            <p className="text-xs text-muted-foreground">
              {t("Sent this month")}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Password Reset")}</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">{emailTemplates?.stats?.passwordReset ?? 0}</h2>
            <p className="text-xs text-muted-foreground">
              {t("Sent this month")}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Order Confirmation")}</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">{emailTemplates?.stats?.orderConfirmation ?? 0}</h2>
            <p className="text-xs text-muted-foreground">
              {t("Sent this month")}
            </p>
          </CardContent>
        </Card>
      </div>

  <h1 className="text-2xl font-bold">{t("Email Templates")}</h1>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Input type="search" placeholder={t("Search templates...")} className="w-[300px]" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center flex-col justify-center h-64">
              <Preloader/>
              <p className="text-sm">{t("Loading Templates")}</p>
            </div>
          ) : error ? (
            <div className="p-6 text-red-500">{t("Failed to load templates.")}</div>
          ) : (
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>{t("Template Name")}</TableHead>
                <TableHead>{t("Subject")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("Last Updated")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                {canEdit && <TableHead className="text-right">{t("Actions")}</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {filteredTemplates?.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.key}</TableCell>
                    <TableCell>{template.translations[0]?.subject || "-"}</TableCell>
                    <TableCell className="hidden md:table-cell">{template.updatedAt?.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Badge variant={template.isActive ? "default" : "secondary"}>
                        {template.isActive ? t("Active") : t("Inactive")}
                      </Badge>
                    </TableCell>
                    {canEdit &&  <TableCell className="text-right">
                      <Link href={`/admin/settings/notifications/${template.id}`} className="inline-flex items-center justify-center p-2 rounded hover:bg-muted transition">
                        <PencilIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">{t("Edit")}</span>
                      </Link>
                    </TableCell>}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
