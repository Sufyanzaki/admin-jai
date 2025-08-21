"use client"

import {Button} from "@/components/admin/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/admin/ui/card";
import {BarChartIcon as ChartBarIcon, CalendarIcon, LineChartIcon, TrendingUpIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import {useSession} from "next-auth/react";

const reportCards = [
	{
		module: "financial_report",
		type: "Financial",
		icon: <TrendingUpIcon className="h-5 w-5" />,
		title: "Financial Reports",
		description: "Track revenue, expenses, and financial performance",
		stats: [
			{ label: "Total Revenue", value: "$00" },
			{ label: "Net Profit", value: "$00" },
			{ label: "Growth", value: "+00%" },
		],
		link: "/admin/reports/financial",
		buttonVariant: "default",
	},
	{
		module: "income_report",
		type: "Income",
		icon: <CalendarIcon className="h-5 w-5" />,
		title: "Income Reports",
		description: "Track income metrics, trends, and patient attendance",
		stats: [
			{ label: "Total Income", value: "1,248" },
			{ label: "Completion Rate", value: "70.2%" },
			{ label: "No-Show Rate", value: "6.8%" },
		],
		link: "/admin/reports/income",
		buttonVariant: "default",
	},
	{
		module: "detail_report",
		type: "Detail",
		icon: <UsersIcon className="h-5 w-5" />,
		title: "Detailed Reports",
		description: "Track income metrics, trends, and patient attendance",
		stats: [
			{ label: "Total Visits", value: "3,842" },
			{ label: "New Patients", value: "428" },
			{ label: "Avg. Duration", value: "32 min" },
		],
		link: "/admin/reports/detailed",
		buttonVariant: "default",
	},
	{
		module: "member_report",
		type: "Members",
		icon: <ChartBarIcon className="h-5 w-5" />,
		title: "Member Performance",
		description: "Evaluate members productivity, attendance, and performance",
		stats: [
			{ label: "Count", value: "48" },
			{ label: "Avg. Attendance", value: "92.5%" },
			{ label: "Productivity", value: "87.3%" },
		],
		link: "/admin/reports/member",
	},
	{
		module: "analytic",
		type: "Analytic",
		icon: <LineChartIcon className="h-5 w-5" />,
		title: "Analytics",
		description: "Create customized reports with specific metrics and filters",
		stats: [
			{ label: "Saved Reports", value: "5" },
			{ label: "Templates", value: "12" },
			{ label: "Export Options", value: "PDF, CSV, Excel" },
		],
		link: "/admin/reports/analytics",
	},
];

export default function ReportsPage() {

	const {data:session} = useSession();

	const permissionsArr = session?.user?.permissions || [];
	const isAdmin = session?.user?.role === "admin";

	const permissionsMap = permissionsArr.reduce((acc, perm) => {
		acc[perm.module] = {
			canCreate: perm.canCreate ?? true,
			canEdit: perm.canEdit ?? true,
			canDelete: perm.canDelete ?? true,
			canView: perm.canView ?? true,
		};
		return acc;
	}, {} as Record<string, { canCreate: boolean; canEdit: boolean; canDelete: boolean; canView: boolean }>);

	function canView(module: string) {
		if (isAdmin) return true;
		return permissionsMap[module]?.canView ?? false;
	}

	const visibleCards = reportCards.filter(card => canView(card.module));

	return (
		<div className="flex flex-col gap-6 p-4 xl:p-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Reports</h1>
				<p className="text-muted-foreground">
					Access and generate detailed reports on user activity, memberships, and match performance.
				</p>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{visibleCards.map((card, index) => (
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
