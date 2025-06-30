import {ArrowUpRight, Ban, Star, User, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {NewMembers} from "@/components/members/new-members";
import {BestSelling} from "@/components/members/best-selling";
import {MemberStats} from "@/components/members/member-stats";
import Link from "next/link";

const cardData = [
  {
    id: 1,
    title: "Total Members",
    count: 115,
    description: "All registered members",
    status: "",
    icon: Users,
    buttonText: "View All Members",
    borderColor: "border-blue-100 dark:border-blue-900/60",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    statusColor: "text-blue-500",
    buttonColor: "text-blue-600 dark:text-blue-400"
  },
  {
    id: 2,
    title: "Premium Members",
    count: 5,
    description: "Members with premium subscriptions",
    status: "",
    icon: Star,
    buttonText: "Manage Premium",
    borderColor: "border-emerald-100 dark:border-emerald-900/60",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    statusColor: "text-emerald-500",
    buttonColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    id: 3,
    title: "Free Members",
    count: 110,
    description: "Members with free accounts",
    status: "",
    icon: User,
    buttonText: "View Free Members",
    borderColor: "border-amber-100 dark:border-amber-900/60",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    statusColor: "text-amber-500",
    buttonColor: "text-amber-600 dark:text-amber-400"
  },
  {
    id: 4,
    title: "Blocked Members",
    count: 0,
    description: "Suspended or blocked accounts",
    status: "",
    icon: Ban,
    buttonText: "Manage Restrictions",
    borderColor: "border-rose-100 dark:border-rose-900/60",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    statusColor: "text-rose-500",
    buttonColor: "text-rose-600 dark:text-rose-400"
  }
];

export default function DashboardPage() {
  return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1 space-y-6 p-4 xl:p-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Here's what's happening today.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card) => (
                <div key={card.id} className={`bg-card rounded-lg overflow-hidden border shadow-md`}>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`${card.iconBg} p-2 rounded-lg`}>
                          <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                        </div>
                        <span className="font-medium text-slate-600 dark:text-slate-300">{card.title}</span>
                      </div>
                      <span className={`text-sm ${card.statusColor} font-medium`}>{card.status}</span>
                    </div>

                    <div className="mt-4">
                      <div className="text-3xl font-bold text-slate-800 dark:text-white">{card.count}</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{card.description}</p>
                    </div>

                    <div className="mt-6">
                      <Link href="/members" className={`flex items-center justify-between w-full text-sm ${card.buttonColor} font-medium hover:underline`}>
                        <span>{card.buttonText}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <Tabs defaultValue="stats" className="space-y-4">
            <TabsList className="grid grid-cols-3 md:w-[340px]">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="new-users">New Users</TabsTrigger>
              <TabsTrigger value="best-selling">Best Selling</TabsTrigger>
            </TabsList>

            <TabsContent value="new-users" className="space-y-4">
              <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-2">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>You have 13 new users added</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NewMembers />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="best-selling" className="space-y-4">
              <div className="md:grid max-md:space-y-4 gap-4 md:grid-cols-1">
                <Card className="">
                  <CardHeader>
                    <CardTitle>Best Selling</CardTitle>
                    <CardDescription>Top packages of this year</CardDescription>
                  </CardHeader>
                  <CardContent className="!pt-0">
                    <BestSelling />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your platform's matching success and user engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <MemberStats />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
}
