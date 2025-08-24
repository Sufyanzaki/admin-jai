"use client";

import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu";
import { Input } from "@/components/admin/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/admin/ui/dialog";
import { Textarea } from "@/components/admin/ui/textarea";
import { useTranslation } from "react-i18next";

const reports = [
  {
    id: 1,
    reportedBy: "Ayesha Khan",
    reportedUser: "Talha Khalid",
    reason: "sss",
    status: "Unblocked",
  },
  {
    id: 2,
    reportedBy: "Ali Raza",
    reportedUser: "Usman Tariq",
    reason: "Spam content",
    status: "Blocked",
  }]
export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openComplain, setOpenComplain] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 p-4 xl:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">{t("Complaints")}</h1>
          <p className="text-muted-foreground">{t("Manage Complains and tickets.")}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>{t("Complain List")}</CardTitle>
            <CardDescription>{t("View and manage all complains.")}</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder={t("Search prescriptions...")} className="pl-8 w-full md:w-[250px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>{t("Reported By")}</TableHead>
                <TableHead>{t("Reported User")}</TableHead>
                <TableHead>{t("Reason")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead className="text-right">{t("Action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>{report.reportedUser}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={report.status === "Unblocked" ? "secondary" : "destructive"}
                    >
                      {t(report.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t("Actions")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setOpenComplain(true)}>{t("View Complaint")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("Block User")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("Dismiss Report")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={openComplain} onOpenChange={setOpenComplain}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {t("Complaint #4567 - Delayed Service")}
            </DialogTitle>
            <DialogDescription>{t("Submitted on June 10, 2025")}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <p className="text-sm font-medium">{t("Status")}</p>
              <p className="text-sm font-semibold text-green-600">{t("Resolved")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{t("Priority")}</p>
              <p className="text-sm font-semibold text-yellow-600">{t("Medium")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{t("Category")}</p>
              <p className="text-sm capitalize">{t("Service Issue")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{t("Last Updated")}</p>
              <p className="text-sm">{t("June 12, 2025")}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">{t("Complaint Details")}</p>
            <p className="text-sm">
              {t("I experienced a delay in receiving the service I booked on the platform. The technician arrived two hours late without prior notice. I would like an explanation and assurance that this won’t happen again.")}
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">{t("Responses")}</p>
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">{t("Support Team")}</p>
                  <p className="text-xs text-muted-foreground">{t("June 11, 2025")}</p>
                </div>
                <p className="text-sm">
                  {t("Thank you for bringing this to our attention. We apologize for the inconvenience caused and will ensure better service in the future.")}
                </p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">{t("Customer")}</p>
                  <p className="text-xs text-muted-foreground">{t("June 11, 2025")}</p>
                </div>
                <p className="text-sm">
                  {t("I appreciate the quick response. Please make sure this doesn’t happen again.")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">{t("Reply")}</p>
            <Textarea
              placeholder={t("Type your reply here...")}
              value=""
              onChange={() => { }}
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-4">
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => { }}>{t("Block User")}</Button>
              <Button variant="secondary" onClick={() => { }}>{t("Dismiss Report")}</Button>
            </div>
            <DialogFooter className="flex gap-2 sm:justify-end sm:flex-row">
              <Button variant="outline" onClick={() => { }}>{t("Close")}</Button>
              <Button disabled>{t("Send Reply")}</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
