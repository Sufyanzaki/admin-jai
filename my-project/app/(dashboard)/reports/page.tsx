import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BarChartIcon as ChartBarIcon, LineChartIcon, PackageIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

const reportCards = [
  {
    type: "Financial",
    icon: <TrendingUpIcon className="h-5 w-5" />,
    title: "Financial Reports",
    description: "Track revenue, expenses, and financial performance",
    stats: [
      { label: "Total Revenue", value: "$00" },
      { label: "Net Profit", value: "$00" },
      { label: "Growth", value: "+00%" },
    ],
    link: "/reports/financial",
    buttonVariant: "default",
  },
  {
    type: "Income",
    icon: <CalendarIcon className="h-5 w-5" />,
    title: "Income Reports",
    description: "Track income metrics, trends, and patient attendance",
    stats: [
      { label: "Total Income", value: "1,248" },
      { label: "Completion Rate", value: "70.2%" },
      { label: "No-Show Rate", value: "6.8%" },
    ],
    link: "/reports/income",
    buttonVariant: "default",
  },
  {
    type: "Detail",
    icon: <UsersIcon className="h-5 w-5" />,
    title: "Detailed Reports",
    description: "Track income metrics, trends, and patient attendance",
    stats: [
      { label: "Total Visits", value: "3,842" },
      { label: "New Patients", value: "428" },
      { label: "Avg. Duration", value: "32 min" },
    ],
    link: "/reports/detailed",
    buttonVariant: "default",
  },
  {
    type: "Members",
    icon: <ChartBarIcon className="h-5 w-5" />,
    title: "Member Performance",
    description: "Evaluate members productivity, attendance, and performance",
    stats: [
      { label: "Count", value: "48" },
      { label: "Avg. Attendance", value: "92.5%" },
      { label: "Productivity", value: "87.3%" },
    ],
    link: "/reports/member",
  },
  {
    type: "Analytic",
    icon: <LineChartIcon className="h-5 w-5" />,
    title: "Analytics",
    description: "Create customized reports with specific metrics and filters",
    stats: [
      { label: "Saved Reports", value: "5" },
      { label: "Templates", value: "12" },
      { label: "Export Options", value: "PDF, CSV, Excel" },
    ],
    link: "/reports/analytics",
  },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 xl:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Reports</h1>
        <p className="text-muted-foreground">
          Access and generate detailed reports on user activity, memberships, and match performance.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {card.icon}
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <div className="space-y-2">
                  {card.stats.map((stat, statIndex) => (
                      <div
                          key={statIndex}
                          className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                  ))}
                </div>
                <Button asChild variant="default">
                  <Link href={card.link}>View Report</Link>
                </Button>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
