import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Leaf,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  Download,
  Activity,
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const dailyApplicationData = [
  { date: "Feb 1", nitrogen: 12, phosphorus: 8, potassium: 10 },
  { date: "Feb 4", nitrogen: 15, phosphorus: 10, potassium: 12 },
  { date: "Feb 7", nitrogen: 10, phosphorus: 7, potassium: 9 },
  { date: "Feb 10", nitrogen: 18, phosphorus: 12, potassium: 15 },
  { date: "Feb 13", nitrogen: 14, phosphorus: 9, potassium: 11 },
  { date: "Feb 16", nitrogen: 16, phosphorus: 11, potassium: 13 },
  { date: "Feb 19", nitrogen: 11, phosphorus: 8, potassium: 10 },
  { date: "Feb 22", nitrogen: 13, phosphorus: 9, potassium: 11 },
  { date: "Feb 25", nitrogen: 17, phosphorus: 11, potassium: 14 },
];

const npkRatioData = [
  { name: "Nitrogen", value: 45, color: "#10b981" },
  { name: "Phosphorus", value: 28, color: "#3b82f6" },
  { name: "Potassium", value: 27, color: "#8b5cf6" },
];

const zoneBreakdown = [
  { zone: "Field A - Tomato", nitrogen: 48, phosphorus: 32, potassium: 40, cost: 85.0, efficiency: 92 },
  { zone: "Field B - Wheat", nitrogen: 42, phosphorus: 28, potassium: 36, cost: 75.0, efficiency: 88 },
  { zone: "Field C - Rice", nitrogen: 38, phosphorus: 24, potassium: 30, cost: 68.0, efficiency: 90 },
  { zone: "Greenhouse", nitrogen: 18, phosphorus: 12, potassium: 15, cost: 32.0, efficiency: 95 },
];

export function NutrientReport() {
  const navigate = useNavigate();

  const totalNitrogen = dailyApplicationData.reduce((sum, day) => sum + day.nitrogen, 0);
  const totalPhosphorus = dailyApplicationData.reduce((sum, day) => sum + day.phosphorus, 0);
  const totalPotassium = dailyApplicationData.reduce((sum, day) => sum + day.potassium, 0);
  const totalCost = zoneBreakdown.reduce((sum, zone) => sum + zone.cost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/nutrients")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Nutrient Management
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">Nutrient Application Report</h1>
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
          <Card className="border-green-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🌱</span>
                <Badge className="bg-green-100 text-green-700 border-0">Nitrogen</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {totalNitrogen} kg
              </p>
              <p className="text-sm text-gray-600">Applied this month</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <Target className="w-3 h-3" />
                <span>95% of planned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🌿</span>
                <Badge className="bg-blue-100 text-blue-700 border-0">Phosphorus</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {totalPhosphorus} kg
              </p>
              <p className="text-sm text-gray-600">Applied this month</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <Target className="w-3 h-3" />
                <span>92% of planned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🍃</span>
                <Badge className="bg-purple-100 text-purple-700 border-0">Potassium</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {totalPotassium} kg
              </p>
              <p className="text-sm text-gray-600">Applied this month</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <Target className="w-3 h-3" />
                <span>98% of planned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-amber-600" />
                <Badge className="bg-amber-100 text-amber-700 border-0">Total Cost</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                ${totalCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Fertilizer expenses</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>Under budget by 5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NPK Ratio and Efficiency */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* NPK Ratio Pie Chart */}
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">NPK Application Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={npkRatioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {npkRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {npkRatioData.map((nutrient, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div
                      className="w-4 h-4 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: nutrient.color }}
                    />
                    <p className="text-xs text-gray-600 mb-1">{nutrient.name}</p>
                    <p className="text-lg font-bold text-gray-900">{nutrient.value}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Efficiency Score */}
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Nutrient Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#10b981"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.91)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-green-600">91%</span>
                    <span className="text-sm text-gray-600">Efficiency</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 mb-1">Excellent Performance</p>
                  <p className="text-xs text-gray-600">
                    Your nutrient application efficiency is above the industry average of 85%
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Application Accuracy", value: 94 },
                    { label: "Soil Retention", value: 89 },
                    { label: "Plant Uptake", value: 90 },
                  ].map((metric, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{metric.label}</span>
                        <span className="font-semibold text-gray-900">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Trend */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Daily Application Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyApplicationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} label={{ value: "kg", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="nitrogen"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="Nitrogen"
                />
                <Line
                  type="monotone"
                  dataKey="phosphorus"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Phosphorus"
                />
                <Line
                  type="monotone"
                  dataKey="potassium"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                  name="Potassium"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Breakdown */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Application by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {zoneBreakdown.map((zone, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{zone.zone}</h4>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-700 border-0">
                        {zone.efficiency}% efficient
                      </Badge>
                      <span className="text-sm font-semibold text-gray-700">${zone.cost.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 mb-1">🌱 Nitrogen</p>
                      <p className="text-lg font-bold text-gray-900">{zone.nitrogen} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">🌿 Phosphorus</p>
                      <p className="text-lg font-bold text-gray-900">{zone.phosphorus} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-200">
                      <p className="text-xs text-gray-600 mb-1">🍃 Potassium</p>
                      <p className="text-lg font-bold text-gray-900">{zone.potassium} kg</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-green-800">Cost Analysis by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="zone" stroke="#6b7280" style={{ fontSize: "10px" }} angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} label={{ value: "$", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
