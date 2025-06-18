"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DateRangePicker} from "@/components/date-range-picker";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
  DownloadIcon,
  LaptopIcon,
  MinusIcon,
  RefreshCwIcon,
  SearchIcon,
  SmartphoneIcon,
  TabletIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UserIcon,
  UsersIcon
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

// Sample data for charts
const visitTypesData = [
  { name: "Follow-up", value: 45 },
  { name: "New Patient", value: 25 },
  { name: "Consultation", value: 20 },
  { name: "Emergency", value: 10 },
];

const visitOutcomesData = [
  { name: "Resolved", value: 40 },
  { name: "Follow-up Required", value: 35 },
  { name: "Referred to Specialist", value: 15 },
  { name: "Hospitalized", value: 10 },
];

const ageDistributionData = [
  { name: "0-18", value: 15 },
  { name: "19-35", value: 25 },
  { name: "36-50", value: 30 },
  { name: "51-65", value: 20 },
  { name: "65+", value: 10 },
];

const genderDistributionData = [
  { name: "Female", value: 52 },
  { name: "Male", value: 47 },
  { name: "Other", value: 1 },
];

const monthlyVisitTrendsData = [
  { name: "Jan", visits: 320, newPatients: 45 },
  { name: "Feb", visits: 340, newPatients: 50 },
  { name: "Mar", visits: 360, newPatients: 55 },
  { name: "Apr", visits: 400, newPatients: 60 },
  { name: "May", visits: 420, newPatients: 65 },
  { name: "Jun", visits: 450, newPatients: 70 },
  { name: "Jul", visits: 480, newPatients: 75 },
  { name: "Aug", visits: 460, newPatients: 70 },
  { name: "Sep", visits: 440, newPatients: 65 },
  { name: "Oct", visits: 420, newPatients: 60 },
  { name: "Nov", visits: 400, newPatients: 55 },
  { name: "Dec", visits: 380, newPatients: 50 },
];

const visitsByDayData = [
  { name: "Monday", visits: 180 },
  { name: "Tuesday", visits: 200 },
  { name: "Wednesday", visits: 210 },
  { name: "Thursday", visits: 190 },
  { name: "Friday", visits: 170 },
  { name: "Saturday", visits: 120 },
  { name: "Sunday", visits: 80 },
];

const topConditionsData = [
  { name: "Hypertension", value: 25 },
  { name: "Diabetes", value: 18 },
  { name: "Respiratory Infections", value: 15 },
  { name: "Arthritis", value: 12 },
  { name: "Anxiety/Depression", value: 10 },
  { name: "Other", value: 20 },
];

const conditionTrendsData = [
  { name: "Jan", hypertension: 120, diabetes: 80, respiratory: 60 },
  { name: "Feb", hypertension: 125, diabetes: 85, respiratory: 55 },
  { name: "Mar", hypertension: 130, diabetes: 90, respiratory: 65 },
  { name: "Apr", hypertension: 135, diabetes: 95, respiratory: 75 },
  { name: "May", hypertension: 140, diabetes: 100, respiratory: 85 },
  { name: "Jun", hypertension: 145, diabetes: 105, respiratory: 95 },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function PatientVisitReportPage() {
  const [date, setDate] = useState<{ from: Date; to?: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Patient Visit Report</h1>
        </div>
        <p className="text-muted-foreground">Track patient visits, demographics, and health trends</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <DateRangePicker />
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Relationship Status</SelectItem>
              <SelectItem value="cardiology">Single</SelectItem>
              <SelectItem value="neurology">Married</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <UsersIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">3,842</h2>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <UserIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl xl:text-4xl mb-2 font-bold">428</h2>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Visit Duration</CardTitle>
            <Badge variant="outline" className="px-1.5 py-0.5 text-xs">
              32 min
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-2.5 min</span> from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">No-Show Rate</CardTitle>
            <Badge variant="outline" className="px-1.5 py-0.5 text-xs">
              6.8%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">-0.5%</span> from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="md:grid max-md:space-y-6 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Visit Trends</CardTitle>
            <CardDescription>Patient visits over time</CardDescription>
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
                <LineChart
                    data={monthlyVisitTrendsData}
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
                  <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="hsl(var(--chart-1))"
                      name="Total Visits"
                      strokeWidth={2}
                  />
                  <Line
                      type="monotone"
                      dataKey="newPatients"
                      stroke="hsl(var(--chart-2))"
                      name="New Patients"
                      strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visit Distribution by Day</CardTitle>
            <CardDescription>Patient visits by day of week</CardDescription>
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
                    data={visitsByDayData}
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
                      dataKey="visits"
                      fill="hsl(var(--chart-1))"
                      name="Visits"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Tabs defaultValue="links">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="browsers">Browsers</TabsTrigger>
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
                      <TableHead>Type</TableHead>
                      <TableHead>Last Visited</TableHead>
                      <TableHead>Visits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">https://tradeeptip.ub/contact</TableCell>
                      <TableCell>Contact Page</TableCell>
                      <TableCell>2025-06-15</TableCell>
                      <TableCell>24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">https://tradeeptip.ul</TableCell>
                      <TableCell>Homepage</TableCell>
                      <TableCell>2025-06-17</TableCell>
                      <TableCell>156</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">https://tradeeptip.ul/gentile-crane</TableCell>
                      <TableCell>Landing Page</TableCell>
                      <TableCell>2025-06-10</TableCell>
                      <TableCell>42</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">https://tradeeptip.ul/page/user-dealboard-page</TableCell>
                      <TableCell>Dashboard</TableCell>
                      <TableCell>2025-06-16</TableCell>
                      <TableCell>78</TableCell>
                    </TableRow>
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
                    <TableRow>
                      <TableCell className="font-medium">Pakistan</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>5.96%</TableCell>
                      <TableCell>
                        <TrendingUpIcon className="h-4 w-4 text-green-500" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nederland</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>3.13%</TableCell>
                      <TableCell>
                        <TrendingDownIcon className="h-4 w-4 text-red-500" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Surbanen</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>0.85%</TableCell>
                      <TableCell>
                        <MinusIcon className="h-4 w-4 text-gray-500" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">United States</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>27.35%</TableCell>
                      <TableCell>
                        <TrendingUpIcon className="h-4 w-4 text-green-500" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browsers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle>Browsers</CardTitle>
                    <CardDescription>Visitor distribution by browser</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Search browsers..." className="h-8 w-[150px] lg:w-[250px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Browser</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Chrome</TableCell>
                      <TableCell>84</TableCell>
                      <TableCell>71.79%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <SmartphoneIcon className="h-4 w-4" />
                          <span>Mobile</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Safari</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>15.38%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <LaptopIcon className="h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Firefox</TableCell>
                      <TableCell>9</TableCell>
                      <TableCell>7.69%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TabletIcon className="h-4 w-4" />
                          <span>Tablet</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Edge</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>5.13%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <LaptopIcon className="h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
