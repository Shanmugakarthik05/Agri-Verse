import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Droplets,
  TrendingDown,
  TrendingUp,
  Calendar,
  DollarSign,
  Zap,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const dailyUsageData = [
  { date: "Feb 1", usage: 450, cost: 4.5 },
  { date: "Feb 3", usage: 520, cost: 5.2 },
  { date: "Feb 5", usage: 380, cost: 3.8 },
  { date: "Feb 7", usage: 610, cost: 6.1 },
  { date: "Feb 9", usage: 490, cost: 4.9 },
  { date: "Feb 11", usage: 550, cost: 5.5 },
  { date: "Feb 13", usage: 420, cost: 4.2 },
  { date: "Feb 15", usage: 580, cost: 5.8 },
  { date: "Feb 17", usage: 460, cost: 4.6 },
  { date: "Feb 19", usage: 530, cost: 5.3 },
  { date: "Feb 21", usage: 400, cost: 4.0 },
  { date: "Feb 23", usage: 570, cost: 5.7 },
  { date: "Feb 25", usage: 490, cost: 4.9 },
  { date: "Feb 27", usage: 510, cost: 5.1 },
];

const zoneBreakdown = [
  { zone: "Field A - Tomato", usage: 4200, percentage: 32, cost: 42.0, efficiency: 92 },
  { zone: "Field B - Wheat", usage: 3800, percentage: 29, cost: 38.0, efficiency: 88 },
  { zone: "Field C - Rice Paddy", usage: 3500, percentage: 27, cost: 35.0, efficiency: 85 },
  { zone: "Greenhouse", usage: 1600, percentage: 12, cost: 16.0, efficiency: 95 },
];

export function WaterUsageReport() {
  const navigate = useNavigate();

  const totalUsage = dailyUsageData.reduce((sum, day) => sum + day.usage, 0);
  const totalCost = dailyUsageData.reduce((sum, day) => sum + day.cost, 0);
  const averageDaily = totalUsage / dailyUsageData.length;
  const quota = 15000; // Monthly quota in gallons
  const quotaUsed = (totalUsage / quota) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/irrigation")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Smart Irrigation
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">Water Usage Report</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                February 2026 • Monthly Summary
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Droplets className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-700 border-0">Total</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {totalUsage.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Gallons used</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <TrendingDown className="w-3 h-3" />
                <span>8% less than last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-100 text-green-700 border-0">Daily Avg</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {Math.round(averageDaily)}
              </p>
              <p className="text-sm text-gray-600">Gallons/day</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-600">
                <span>Range: 380-610 gal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-700 border-0">Cost</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                ${totalCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Monthly total</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-600">
                <span>$0.01 per gallon</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-amber-600" />
                <Badge className="bg-amber-100 text-amber-700 border-0">Savings</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                $12.50
              </p>
              <p className="text-sm text-gray-600">Smart savings</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <TrendingDown className="w-3 h-3" />
                <span>vs manual irrigation</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quota Progress */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-green-800">
              <span>Monthly Quota Usage</span>
              <span className="text-lg font-normal">
                {totalUsage.toLocaleString()} / {quota.toLocaleString()} gallons
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-6 rounded-full transition-all ${
                    quotaUsed > 90
                      ? "bg-red-500"
                      : quotaUsed > 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${quotaUsed}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-gray-600">{quotaUsed.toFixed(1)}% used</span>
                <span className="text-green-600 font-semibold">
                  {(quota - totalUsage).toLocaleString()} gallons remaining
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Usage Trend */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Daily Water Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyUsageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} label={{ value: "Gallons", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Breakdown */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Water Usage by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {zoneBreakdown.map((zone, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{zone.zone}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                        <span>{zone.usage.toLocaleString()} gallons</span>
                        <span>•</span>
                        <span>${zone.cost.toFixed(2)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Efficiency: <strong className="text-green-600">{zone.efficiency}%</strong>
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-0 ml-4">
                      {zone.percentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${zone.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={zoneBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="zone" stroke="#6b7280" style={{ fontSize: "10px" }} angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="cost" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Efficiency Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Efficiency</span>
                    <span className="text-2xl font-bold text-green-600">90%</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Automated irrigation reduced water waste by 25% compared to manual methods
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm">Top Performers</h4>
                  {zoneBreakdown
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 3)
                    .map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{zone.zone}</p>
                          <p className="text-xs text-gray-600">{zone.usage.toLocaleString()} gal</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-green-600">{zone.efficiency}%</span>
                          <Zap className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
