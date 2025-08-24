"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { DatePicker } from "@/components/admin/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { UsersIcon, } from "lucide-react"
import { Badge } from "@/components/admin/ui/badge"
import { Input } from "@/components/admin/ui/input"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/admin/ui/chart"
import { useMemberReport } from "@/app/admin/(dashboard)/reports/_hooks/useMemberReport";
import Preloader from "@/components/shared/Preloader";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/admin/ui/button";

const ROLE_COLORS = {
  ADMIN: "#82ca9d",
  CLIENT: "#8884d8",
  MODERATOR: "#ffc658",
};

const STATUS_COLORS = {
  active: "#4ade80",
  inactive: "#facc15",
  deleted: "#f87171",
};
export default function ReportPage() {

  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    status: searchParams.get('status') || '',
    role: searchParams.get('role') || '',
  });

  const { memberReport, memberReportLoading, refetch } = useMemberReport({
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status,
    role: filters.role,
  });

  // Transform API data for charts
  const memberRoleData = memberReport?.data?.rolesWithNames?.map(item => ({
    name: item.role,
    value: item.count,
    color: ROLE_COLORS[item.role as keyof typeof ROLE_COLORS] || "#8884d8",
    label: item.role,
  })) || [];

  const memberStatusData = memberReport?.data?.statusBreakdown ? [
    { name: "active", value: memberReport.data.statusBreakdown.active, color: STATUS_COLORS.active, label: "Active" },
    { name: "inactive", value: memberReport.data.statusBreakdown.inactive, color: STATUS_COLORS.inactive, label: "Inactive" },
    { name: "deleted", value: memberReport.data.statusBreakdown.deleted, color: STATUS_COLORS.deleted, label: "Deleted" },
  ] : [];

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.status) params.append('status', filters.status);
    if (filters.role) params.append('role', filters.role);

    refetch().finally();
  };

  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{t("Member Report")}</h1>
        </div>
        <p className="text-muted-foreground">{t("Track member information, status, and demographics")}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <DatePicker
            onDateChange={(date) => {
              handleFilterChange("startDate", date || "")
            }}
          />
          <Select
            value={filters.role || undefined}
            onValueChange={(value) => handleFilterChange('role', value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("Role")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Roles")}</SelectItem>
              <SelectItem value="ADMIN">{t("Admin")}</SelectItem>
              <SelectItem value="CLIENT">{t("Client")}</SelectItem>
              <SelectItem value="MODERATOR">{t("Moderator")}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.status || undefined}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("Status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Statuses")}</SelectItem>
              <SelectItem value="active">{t("Active")}</SelectItem>
              <SelectItem value="inactive">{t("Inactive")}</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={applyFilters}>{t("Apply Filters")}</Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Total Members")}</CardTitle>
            <UsersIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberReport?.data?.totalMembers || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{memberReport?.data?.membersThisMonth || 0} {t("members this month")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Active Members")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberReport?.data.activeMembers ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{memberReport?.data?.growthRate || '0%'}</span> {t("from last month")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Member Last Month")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberReport?.data.membersLastMonth ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{memberReport?.data?.growthRate || '0%'}</span> {t("from last month")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">{t("Member This Month")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberReport?.data.membersLastMonth ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{memberReport?.data?.growthRate || '0%'}</span> {t("from last month")}
            </p>
          </CardContent>
        </Card>
      </div>

      {memberReportLoading ? (
        <div className="flex justify-center h-64"><Preloader /></div>
      ) : (
        <>
          <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("Members by Role")}</CardTitle>
                <CardDescription>{t("Distribution of members by their roles")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer className="h-[300px] w-full max-w-full" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberRoleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {memberRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Member Status Distribution")}</CardTitle>
                <CardDescription>{t("Current status of all members")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer className="h-[300px] w-full max-w-full" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {memberStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <CardTitle>{t("Recent Members")}</CardTitle>
                  <CardDescription>{t("New members who joined recently")}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Name")}</TableHead>
                    <TableHead>{t("Email")}</TableHead>
                    <TableHead>{t("Role")}</TableHead>
                    <TableHead>{t("Status")}</TableHead>
                    <TableHead>{t("Join Date")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberReport?.data?.lastTenMembers?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.firstName || t('Unknown')} {member.lastName || ''}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Badge variant={
                          member.isDeleted ? 'destructive' :
                            member.isActive ? 'success' : 'warning'
                        }>
                          {member.isDeleted ? t('Deleted') : member.isActive ? t('Active') : t('Inactive')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}