"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

type MonthlyData = {
  month: string;
  count: number;
};

type TooltipState = {
  show: boolean;
  x: number;
  y: number;
  data: MonthlyData | null;
};

type MemberStatsProps = {
  monthlyData?: MonthlyData[];
}

export default function MemberStats({ monthlyData = [] }: MemberStatsProps) {
  // Transform month names to short format (Jan, Feb, etc.)
  const transformData = (data: MonthlyData[]): MonthlyData[] => {
    return data.map(item => ({
      month: item.month.substring(0, 3),
      count: item.count
    }))
  }

  const chartData = transformData(monthlyData)

  // Calculate Y-axis labels based on the data
  const maxCount = Math.max(...chartData.map(item => item.count), 40)
  const yAxisStep = Math.ceil(maxCount / 5)
  const yAxisLabels = Array.from(
      { length: Math.ceil(maxCount / yAxisStep) + 1 },
      (_, i) => i * yAxisStep
  ).reverse()

  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, x: 0, y: 0, data: null })

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, data: MonthlyData) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      data
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null })
  }

  // Calculate statistics
  const totalUsers = monthlyData.reduce((sum, item) => sum + item.count, 0)
  const lastMonthCount = monthlyData[monthlyData.length - 1]?.count || 0
  const prevMonthCount = monthlyData[monthlyData.length - 2]?.count || 0
  const monthlyChange = lastMonthCount - prevMonthCount
  const monthlyChangePercent = prevMonthCount > 0
      ? ((monthlyChange / prevMonthCount) * 100).toFixed(1)
      : '0.0'

  return (
      <Tabs defaultValue="visits">
        <TabsList>
          <TabsTrigger value="visits">Monthly Users</TabsTrigger>
          <TabsTrigger value="growth">Growth Trend</TabsTrigger>
        </TabsList>

        <TabsContent value="visits" className="space-y-4">
          <div className="w-full min-w-0 py-12">
            <div className="w-full overflow-x-auto py-2">
              <div className="relative min-w-[600px] sm:min-w-0">
                {/* Dynamic Y-axis labels */}
                <div className="absolute left-0 -top-5 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                  {yAxisLabels.map((label, index) => (
                      <div key={index} className="text-right">
                        {label}
                      </div>
                  ))}
                </div>

                <div className="ml-12">
                  <div className="relative" style={{ height: "300px" }}>
                    {/* Horizontal grid lines */}
                    {yAxisLabels.map((_, index) => (
                        <div
                            key={index}
                            className="absolute w-full border-t border-dashed border-gray-300 dark:border-gray-700"
                            style={{
                              top: `${(index / (yAxisLabels.length - 1)) * 100}%`
                            }}
                        />
                    ))}

                    {/* Chart bars */}
                    <div className="flex items-end justify-around h-full px-2 sm:px-4">
                      {chartData.map((data, index) => {
                        const heightPercent = (data.count / maxCount) * 100
                        return (
                            <div key={index} className="flex flex-col items-center">
                              <div
                                  className="relative cursor-pointer flex flex-col justify-end mb-2 sm:mb-3"
                                  style={{ height: "260px" }}
                                  onMouseEnter={(e) => handleMouseEnter(e, data)}
                                  onMouseLeave={handleMouseLeave}
                              >
                                <div
                                    className="w-6 sm:w-8 bg-gray-300 rounded-t-sm"
                                    style={{ height: "100%" }}
                                />

                                <div
                                    className="absolute bottom-0 w-6 sm:w-8 bg-[#3a98db] rounded-t-sm transition-all duration-300 hover:bg-[#3a98db]/90"
                                    style={{ height: `${heightPercent}%` }}
                                />

                                <div className="absolute left-1/2 top-0 w-px h-full border-l border-dashed border-gray-300 -translate-x-1/2 -z-10" />
                              </div>

                              <span className="text-xs text-gray-500">{data.month}</span>
                            </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tooltip showing just the count */}
            {tooltip.show && tooltip.data && (
                <div
                    className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none"
                    style={{
                      left: `${tooltip.x}px`,
                      top: `${tooltip.y}px`,
                      transform: 'translate(-50%, -100%)'
                    }}
                >
                  <div className="font-semibold">{tooltip.data.month}</div>
                  <div>New Users: {tooltip.data.count}</div>
                </div>
            )}

            <div className="flex items-center justify-center translate-y-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-[#3a98db]" />
                <span className="text-gray-700">New Users</span>
              </div>
            </div>
          </div>

          {/* Statistics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">All registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Last Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lastMonthCount}</div>
                <p className="text-xs text-muted-foreground">
                  {monthlyChange >= 0 ? '+' : ''}{monthlyChange} from previous
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monthlyChangePercent}%
                </div>
                <p className="text-xs text-muted-foreground">Month over month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="w-full h-[300px] min-w-0 py-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis domain={[0, maxCount]} />
                <Tooltip
                    formatter={(value) => [value, "New Users"]}
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Peak Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {chartData.reduce((max, item) =>
                          item.count > max.count ? item : max,
                      chartData[0]).month
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Highest registration month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Peak Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(...chartData.map(item => item.count), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Most registrations in one month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(totalUsers / monthlyData.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average new users per month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
  )
}