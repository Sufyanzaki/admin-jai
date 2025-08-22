"use client"

import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { BarChartIcon as ChartBarIcon, CalendarIcon, LineChartIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useReportSummary } from "@/app/admin/(dashboard)/reports/_hooks/useReportSummary";
import Preloader from "@/components/shared/Preloader";

export default function ReportsPage() {
	const { data: session } = useSession();
	const { summaryLoading, summary } = useReportSummary();

	const permissionsArr = session?.user.permissions ?? [];
	const isAdmin = permissionsArr.length === 0;

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

	if (summaryLoading) return (
		<div className="flex items-center justify-center h-32">
			<Preloader />
			<p className="text-muted-foreground">Loading...</p>
		</div>
	)

	const reportCards = [
		{
			module: "financial_report",
			type: "Financial",
			icon: <TrendingUpIcon className="h-5 w-5" />,
			title: "Financial Reports",
			description: "Track revenue, expenses, and financial performance",
			stats: [
				{ label: "Total Revenue", value: `$${summary?.packageReport.totalRevenue ?? 0}` },
				{ label: "This Month", value: `$${summary?.packageReport.thisMonthRevenue ?? 0}` },
				{ label: "This Year", value: `$${summary?.packageReport.thisYearRevenue ?? 0}` },
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
				{ label: "Active Packages", value: summary?.packageReport.activePackages ?? 0 },
				{ label: "Revenue (Women)", value: `$${summary?.packageReport.revenueByGender.Woman ?? 0}` },
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
				{ label: "Total Logins", value: summary?.userReport.dailyLogins ?? 0 },
				{ label: "Completed Profiles", value: summary?.userReport.completedProfiles ?? 0 },
				{ label: "Deleted Accounts", value: summary?.userReport.deletedAccounts ?? 0 },
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
				{ label: "Total Members", value: summary?.memberReport.totalMembers ?? 0 },
				{ label: "Active Members", value: summary?.memberReport.activeMembers ?? 0 },
				{ label: "This Month", value: summary?.memberReport.membersThisMonth ?? 0 },
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
				{ label: "Total Users", value: summary?.analyticsReport.totalUsers ?? 0 },
				{ label: "New Signups", value: summary?.analyticsReport.newSignups ?? 0 },
				{ label: "Total Matches", value: summary?.analyticsReport.totalMatches ?? 0 },
				{ label: "Total Messages", value: summary?.analyticsReport.totalMessages ?? 0 },
			],
			link: "/admin/reports/analytics",
		},
	];

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
