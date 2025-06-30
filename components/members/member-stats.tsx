"use client"

import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useState} from "react";

type ChartData = {
  month: string;
  profit: number;
  expense: number;
  value: number;
};

type TooltipState = {
  show: boolean;
  x: number;
  y: number;
  data: ChartData | null;
};

export function MemberStats() {
  const satisfactionData = [
    { month: "Jan", score: 4.2 },
    { month: "Feb", score: 4.3 },
    { month: "Mar", score: 4.1 },
    { month: "Apr", score: 4.4 },
    { month: "May", score: 4.5 },
    { month: "Jun", score: 4.6 },
    { month: "Jul", score: 4.7 },
    { month: "Aug", score: 4.6 },
    { month: "Sep", score: 4.8 },
    { month: "Oct", score: 4.7 },
    { month: "Nov", score: 4.9 },
    { month: "Dec", score: 4.8 },
  ]

  const earningsData = [
    {
      id: 1,
      title: "Total Earnings",
      amount: "Є216",
      description: "All-time platform earnings",
      change: "",
    },
    {
      id: 2,
      title: "Last 12 Months Earnings",
      amount: "Є216",
      description: "Earnings from past year",
      change: "",
    },
    {
      id: 3,
      title: "Last 6 Months Earnings",
      amount: "Є0",
      description: "Earnings from past 6 months",
      change: "",
    }
  ];

  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, x: 0, y: 0, data: null });

  const chartData = [
    { month: "Jan", profit: 70, expense: 100, value: 7000 },
    { month: "Feb", profit: 55, expense: 100, value: 5500 },
    { month: "Mar", profit: 45, expense: 100, value: 4500 },
    { month: "Apr", profit: 50, expense: 100, value: 5000 },
    { month: "May", profit: 70, expense: 100, value: 7000 },
    { month: "Jun", profit: 85, expense: 100, value: 8500 },
    { month: "Jul", profit: 55, expense: 100, value: 5500 },
    { month: "Aug", profit: 72, expense: 100, value: 7200 },
    { month: "Sep", profit: 43, expense: 100, value: 4300 },
    { month: "Oct", profit: 53, expense: 100, value: 5300 },
    { month: "Nov", profit: 75, expense: 100, value: 7500 },
    { month: "Dec", profit: 80, expense: 100, value: 8000 },
  ];

  const yAxisLabels = [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0];

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, data: ChartData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      data
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  return (
    <Tabs defaultValue="visits">
      <TabsList>
        <TabsTrigger value="visits">Users Visits</TabsTrigger>
        <TabsTrigger value="satisfaction">Matching Satisfaction</TabsTrigger>
      </TabsList>
      <TabsContent value="visits" className="space-y-4">
        <div className="w-full min-w-0 py-12">
          <div className="w-full overflow-x-auto py-2">
            <div className="relative min-w-[600px] sm:min-w-0">
              <div className="absolute left-0 -top-5 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                {yAxisLabels.map((label, index) => (
                    <div key={index} className="text-right">
                      {label}
                    </div>
                ))}
              </div>

              <div className="ml-12">
                <div className="relative" style={{ height: "300px" }}>
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((top) => (
                      <div
                          key={top}
                          className="absolute w-full border-t border-dashed border-gray-300 dark:border-gray-700"
                          style={{ top: `${top}%` }}
                      />
                  ))}

                  <div className="flex items-end justify-around h-full px-2 sm:px-4">
                    {chartData.map((data, index) => (
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
                                style={{ height: `${data.profit}%` }}
                            />

                            <div className="absolute left-1/2 top-0 w-px h-full border-l border-dashed border-gray-300 -translate-x-1/2 -z-10" />
                          </div>

                          <span className="text-xs text-gray-500">{data.month}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                <div>Value: {tooltip.data.value.toLocaleString()}</div>
                <div>Progress: {tooltip.data.profit}%</div>
              </div>
          )}

          <div className="flex items-center justify-center space-x-6 translate-y-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-[#3a98db]" />
              <span className="text-gray-700">Profit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-gray-400" />
              <span className="text-gray-700">Expense</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Daily</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4</div>
              <p className="text-xs text-muted-foreground">+2.1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">+42 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Yearly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+8.3%</div>
              <p className="text-xs text-muted-foreground">Year over year growth</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="satisfaction" className="space-y-4">
        <div className="w-full h-[300px] min-w-0 py-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={satisfactionData}>
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {earningsData.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.amount}</div>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                    {item.change && ` (${item.change})`}
                  </p>
                </CardContent>
              </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
