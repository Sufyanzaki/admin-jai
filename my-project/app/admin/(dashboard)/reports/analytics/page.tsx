"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {DatePicker} from "@/components/admin/date-range-picker";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/admin/ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/admin/ui/table";
import {HeartIcon, MessageCircleIcon, TrendingUpIcon, UserPlusIcon, UsersIcon} from "lucide-react";
import {Input} from "@/components/admin/ui/input";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/admin/ui/chart";
import {Progress} from "@/components/admin/ui/progress";
import {useAnalytics} from "@/app/admin/(dashboard)/reports/_hooks/useAnalytics";
import Preloader from "@/components/shared/Preloader";
import type React from "react";
import {useState} from "react";
import {useSearchParams} from "next/navigation";
import {AttributeSelect} from "@/components/admin/ui/attribute-select";
import {Button} from "@/components/admin/ui/button";

const DEPARTMENT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export default function ReportPage() {

  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    relationStatus: searchParams.get('relationStatus') || ''
  });

  const { analyticLoading, analytics, refetch } = useAnalytics({
    startDate: filters.startDate,
    endDate: filters.endDate,
    relationStatus: filters.relationStatus
  });

  if(!analytics?.data){
    return (
        <div className="flex items-center flex-col justify-center h-64">
          <p className="text-sm">No data available</p>
        </div>
    )
  }

  const analyticDetails = analytics?.data;

  const handleRelationStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      relationStatus: value
    }));
  };

  const genderDistributionData = analyticDetails.genderDistribution?.map(item => ({
    name: item.gender,
    value: item.count,
    percentage: item.percentage
  })) || [];

  const ageDistributionData = analyticDetails.ageDistribution?.map(item => ({
    name: `${item.age}`,
    value: item.count,
    percentage: item.percentage
  })) || [];

  const countryDistributionData = analyticDetails.countryDistribution?.map(item => ({
    name: item.country,
    value: item.count,
    percentage: item.percentage
  })) || [];

  const topCitiesData = analyticDetails.topCities?.map(item => ({
    city: item.city,
    percent: (item._count.city / analytics.data.totalUsers * 100).toFixed(0)
  })) || [];

  const analyticsCards = [
    {
      title: "Total Users",
      value: analyticDetails.totalUsers || "0",
      icon: <UsersIcon className="size-8 text-muted-foreground" />,
      change: analyticDetails.userGrowthRate || "0.00%",
      changeColor: analyticDetails.userGrowthRate?.startsWith("-") ? "text-red-500" : "text-green-500",
      subtitle: "since last month",
    },
    {
      title: "New Signups",
      value: analyticDetails.newSignups || "0",
      icon: <UserPlusIcon className="size-8 text-muted-foreground" />,
      change: "+0.00%",
      changeColor: "text-green-500",
      subtitle: "in the past week",
    },
    {
      title: "Matches Made",
      value: analyticDetails.totalMatches || "0",
      icon: <HeartIcon className="size-8 text-muted-foreground" />,
      change: "+0.00%",
      changeColor: "text-green-500",
      subtitle: "in the last 30 days",
    },
    {
      title: "Messages Sent",
      value: analyticDetails.totalMessages || "0",
      icon: <MessageCircleIcon className="size-8 text-muted-foreground" />,
      change: "+0.00%",
      changeColor: "text-green-500",
      subtitle: "compared to previous period",
    },
  ];

  const handleFilterChange = (key: string, value?: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ?? "",
    }))
  }

  return (
      <div className="flex flex-col gap-6 p-4 xl:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Analytics Reports</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form className="flex flex-col gap-4 md:flex-row md:items-center" onSubmit={() => refetch()}>
            <DatePicker
                onDateChange={(date) => {
                  handleFilterChange("startDate", date || "")
                }}
            />

            <AttributeSelect
                attributeKey="relationStatus"
                value={filters.relationStatus || undefined}
                onChange={handleRelationStatusChange}
                placeholder="Select relationship status"
            />

            <Button type="submit" size="sm">
              Apply
            </Button>
          </form>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsCards.map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="mb-2 tracking-tight text-sm xl:text-lg font-medium">{item.title}</CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <h2 className="text-2xl xl:text-4xl mb-2 font-bold">{item.value}</h2>
                  <p className="text-xs text-muted-foreground">
                    <span className={item.changeColor}>{item.change}</span> {item.subtitle}
                  </p>
                </CardContent>
              </Card>
          ))}
        </div>

        {analyticLoading ? <div className="h-64"><Preloader /></div> : <>
          <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                    config={{
                      visits: {
                        label: "Total Visits",
                        color: "hsl(var(--chart-1))",
                      },
                      newPatients: {
                        label: "New Patients",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                          data={genderDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                      >
                        {genderDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                          content={<ChartTooltipContent />}
                          wrapperStyle={{
                            backgroundColor: 'white',
                            padding: '8px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                    config={{
                      visits: {
                        label: "Visits",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={ageDistributionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          interval="preserveStartEnd"
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar
                          dataKey="value"
                          fill="hsl(var(--chart-1))"
                          name="Users"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Country Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer
                      config={{
                        value: {
                          label: "Users",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                            data={countryDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={2}
                        >
                          {countryDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                            content={<ChartTooltipContent />}
                            wrapperStyle={{
                              backgroundColor: 'white',
                              padding: '8px',
                              borderRadius: '4px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Cities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCitiesData.length > 0 ? (
                    topCitiesData.map(({ city, percent }, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">{city}</div>
                            <div className="text-sm text-muted-foreground">{percent}%</div>
                          </div>
                          <Progress value={Number(percent)} className="h-2 [&>*]:bg-green-500" />
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No city data available
                    </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Tabs defaultValue="links">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="links">Links</TabsTrigger>
                <TabsTrigger value="countries">Countries</TabsTrigger>
              </TabsList>

              <TabsContent value="links">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle>Links</CardTitle>
                        <CardDescription>Website URLs and their visit statistics</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search URLs..." className="h-8 w-[150px] lg:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table className="whitespace-nowrap">
                      <TableHeader>
                        <TableRow>
                          <TableHead>URL</TableHead>
                          <TableHead>Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analyticDetails.pagesViews?.length > 0 ? (
                            analytics.data.pagesViews.map((page, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{page.pageLink}</TableCell>
                                  <TableCell>{page.count}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                No page view data available
                              </TableCell>
                            </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="countries">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle>Countries</CardTitle>
                        <CardDescription>Visitor distribution by country</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search countries..." className="h-8 w-[150px] lg:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table className="whitespace-nowrap">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Sessions</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {countryDistributionData.map((country, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{country.name}</TableCell>
                              <TableCell>{country.value}</TableCell>
                              <TableCell>{country.percentage}%</TableCell>
                              <TableCell>
                                <TrendingUpIcon className="h-4 w-4 text-green-500" />
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>}
      </div>
  );
}