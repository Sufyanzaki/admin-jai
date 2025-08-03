"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CalendarDateRangePicker as DateRangePicker} from "@/components/date-range-picker"
import {CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon,} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend, Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"

const patientAdmissionsData = [
  { month: "Jan", admissions: 120 },
  { month: "Feb", admissions: 135 },
  { month: "Mar", admissions: 150 },
  { month: "Apr", admissions: 165 },
  { month: "May", admissions: 180 },
  { month: "Jun", admissions: 195 },
  { month: "Jul", admissions: 210 },
  { month: "Aug", admissions: 225 },
  { month: "Sep", admissions: 240 },
  { month: "Oct", admissions: 255 },
  { month: "Nov", admissions: 270 },
  { month: "Dec", admissions: 285 },
];

const stockStatusData = [
  { name: "In Stock", value: 1121, color: "#4ade80" },
  { name: "Low Stock", value: 86, color: "#facc15" },
  { name: "Out of Stock", value: 38, color: "#f87171" },
]

export default function DetailedReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Detailed Reports</h1>
        <p className="text-muted-foreground">Analyze appointment data, track trends, and generate detailed reports</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <DateRangePicker />
          <Select defaultValue="all-services">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Relationship Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-services">Relationship Status</SelectItem>
              <SelectItem value="all-single">Single</SelectItem>
              <SelectItem value="consultations">Married</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-service">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-service">Status</SelectItem>
              <SelectItem value="all-active">Active</SelectItem>
              <SelectItem value="consultations">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-departments">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">Country</SelectItem>
              <SelectItem value="cardiology">Germany</SelectItem>
              <SelectItem value="neurology">India</SelectItem>
              <SelectItem value="orthopedics">Spain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Daily Login</CardTitle>
            <CalendarIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl lg:text-4xl mb-2 font-bold">1,248</h2>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[75%] rounded-md bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Completed Profile</CardTitle>
            <CheckCircleIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl lg:text-4xl mb-2 font-bold">876</h2>
            <p className="text-xs text-muted-foreground">70.2% completion rate</p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[70%] rounded-md bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Delete Accounts</CardTitle>
            <XCircleIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl lg:text-4xl mb-2 font-bold">187</h2>
            <p className="text-xs text-muted-foreground">15% cancellation rate</p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[15%] rounded-md bg-red-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm xl:text-lg font-medium">Never Logins</CardTitle>
            <ClockIcon className="size-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl lg:text-4xl mb-2 font-bold">85</h2>
            <p className="text-xs text-muted-foreground">6.8% no-show rate</p>
            <div className="mt-4 h-1 w-full rounded-md bg-secondary">
              <div className="h-1 w-[7%] rounded-md bg-amber-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Relation Status</CardTitle>
            <CardDescription>Breakdown of appointments by their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} appointments`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Origin</CardTitle>
            <CardDescription>Distribution of appointments across different departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={departmentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#8884d8" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Religion</CardTitle>
            <CardDescription>Monthly trend for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={patientAdmissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admissions" fill="#8884d8" barSize={20} />
                <Line type="monotone" dataKey="admissions" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Gender</CardTitle>
            <CardDescription>Distribution of appointments across different departments</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
                config={{
                  inStock: {
                    label: "In Stock",
                    color: "#4ade80",
                  },
                  lowStock: {
                    label: "Low Stock",
                    color: "#facc15",
                  },
                  outOfStock: {
                    label: "Out of Stock",
                    color: "#f87171",
                  },
                }}
                className="h-[300px] w-full max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                  >
                    {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "12px"
                      }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Career</CardTitle>
            <CardDescription>Breakdown of appointments by their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} appointments`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Distribution of appointments across different departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={departmentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#8884d8" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Cast</CardTitle>
            <CardDescription>Breakdown of appointments by their current status</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={patientAdmissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="admissions" fill="#8884d8" barSize={20} />
                <Line type="monotone" dataKey="admissions" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sub Cast</CardTitle>
            <CardDescription>Distribution of appointments across different departments</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
                config={{
                  inStock: {
                    label: "In Stock",
                    color: "#4ade80",
                  },
                  lowStock: {
                    label: "Low Stock",
                    color: "#facc15",
                  },
                  outOfStock: {
                    label: "Out of Stock",
                    color: "#f87171",
                  },
                }}
                className="h-[300px] w-full max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                  >
                    {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "12px"
                      }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Detailed view of the last 10 entries</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search appointments..." className="h-8 w-[150px] lg:w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {appointmentData.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.dateTime}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>
                      <Badge
                          variant="outline"
                          className={
                            appointment.status === "Completed"
                                ? "border-green-500 bg-green-500/10 text-green-500"
                                : appointment.status === "Scheduled"
                                    ? "border-blue-500 bg-blue-500/10 text-blue-500"
                                    : appointment.status === "Canceled"
                                        ? "border-red-500 bg-red-500/10 text-red-500"
                                        : "border-amber-500 bg-amber-500/10 text-amber-500"
                          }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Sample data for the charts
const statusDistributionData = [
  { name: "Completed", value: 876 },
  { name: "Scheduled", value: 100 },
  { name: "Canceled", value: 187 },
  { name: "No-Show", value: 85 },
]

const departmentData = [
  { name: "Cardiology", appointments: 245 },
  { name: "Neurology", appointments: 187 },
  { name: "Orthopedics", appointments: 201 },
  { name: "Pediatrics", appointments: 224 },
  { name: "Dermatology", appointments: 163 },
  { name: "General Medicine", appointments: 228 },
]

// Sample data for the tables
const appointmentData = [
  {
    id: 1,
    patient: "Emma Thompson",
    doctor: "Dr. Smith",
    dateTime: "Today, 9:30 AM",
    service: "General Checkup",
    status: "Completed",
  },
  {
    id: 2,
    patient: "James Wilson",
    doctor: "Dr. Johnson",
    dateTime: "Today, 10:15 AM",
    service: "Cardiology Consultation",
    status: "Completed",
  },
  {
    id: 3,
    patient: "Sophia Martinez",
    doctor: "Dr. Williams",
    dateTime: "Today, 11:00 AM",
    service: "Dermatology Screening",
    status: "Canceled",
  },
  {
    id: 4,
    patient: "Liam Anderson",
    doctor: "Dr. Brown",
    dateTime: "Today, 1:30 PM",
    service: "Orthopedic Evaluation",
    status: "Scheduled",
  },
  {
    id: 5,
    patient: "Olivia Taylor",
    doctor: "Dr. Jones",
    dateTime: "Today, 2:45 PM",
    service: "Pediatric Checkup",
    status: "Scheduled",
  },
  {
    id: 6,
    patient: "Noah Garcia",
    doctor: "Dr. Smith",
    dateTime: "Today, 3:30 PM",
    service: "Neurology Consultation",
    status: "Scheduled",
  },
  {
    id: 7,
    patient: "Ava Rodriguez",
    doctor: "Dr. Johnson",
    dateTime: "Yesterday, 9:00 AM",
    service: "General Checkup",
    status: "Completed",
  },
  {
    id: 8,
    patient: "William Lee",
    doctor: "Dr. Williams",
    dateTime: "Yesterday, 10:30 AM",
    service: "Cardiology Consultation",
    status: "No-Show",
  },
  {
    id: 9,
    patient: "Isabella Hernandez",
    doctor: "Dr. Brown",
    dateTime: "Yesterday, 1:15 PM",
    service: "Dermatology Screening",
    status: "Completed",
  },
  {
    id: 10,
    patient: "Mason Lopez",
    doctor: "Dr. Jones",
    dateTime: "Yesterday, 3:00 PM",
    service: "Orthopedic Evaluation",
    status: "Canceled",
  },
]