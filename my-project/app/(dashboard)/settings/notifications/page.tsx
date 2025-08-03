"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Mail,
  MoreHorizontal, PencilIcon,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEmailTemplates } from "./_hooks/useEmailTemplates";
import { useState } from "react";
import Preloader from "@/components/ui/Preloader"

export default function NotificationsPage() {
  const { emailTemplates, loading, error } = useEmailTemplates();
  const [search, setSearch] = useState("");

  // Filter templates by search (key or subject)
  const filteredTemplates = (emailTemplates ?? []).filter(template => {
    const subject = template.translations[0]?.subject || "";
    return (
      template.key.toLowerCase().includes(search.toLowerCase()) ||
      subject.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/settings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-sm text-muted-foreground">Configure email, SMS, and in-app notifications</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Welcome Email</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">1,248</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Password Reset</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">876</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Order Confirmation</CardTitle>
            <Mail className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">2,415</h2>
            <p className="text-xs text-muted-foreground">
              Sent this month
            </p>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">Email Templates</h1>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Input type="search" placeholder="Search templates..." className="w-[300px]" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center flex-col justify-center h-64">
              <Preloader/>
              <p className="text-sm">Loading Templates</p>
            </div>
          ) : error ? (
            <div className="p-6 text-red-500">Failed to load templates.</div>
          ) : (
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                        {template.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/settings/notifications/${template.id}`} className="inline-flex items-center justify-center p-2 rounded hover:bg-muted transition">
                        <PencilIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </TableCell>
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
