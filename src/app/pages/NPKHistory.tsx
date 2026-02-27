import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  ArrowLeft,
  Leaf,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
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
  ReferenceLine,
} from "recharts";

// Historical data for the past 90 days
const historicalData = [
  { date: "Dec 1", nitrogen: 68, phosphorus: 52, potassium: 78 },
  { date: "Dec 6", nitrogen: 70, phosphorus: 54, potassium: 80 },
  { date: "Dec 11", nitrogen: 72, phosphorus: 56, potassium: 82 },
  { date: "Dec 16", nitrogen: 75, phosphorus: 58, potassium: 85 },
  { date: "Dec 21", nitrogen: 73, phosphorus: 55, potassium: 83 },
  { date: "Dec 26", nitrogen: 71, phosphorus: 53, potassium: 81 },
  { date: "Dec 31", nitrogen: 74, phosphorus: 56, potassium: 84 },
  { date: "Jan 5", nitrogen: 76, phosphorus: 58, potassium: 86 },
  { date: "Jan 10", nitrogen: 78, phosphorus: 60, potassium: 88 },
  { date: "Jan 15", nitrogen: 80, phosphorus: 62, potassium: 85 },
  { date: "Jan 20", nitrogen: 77, phosphorus: 59, potassium: 83 },
  { date: "Jan 25", nitrogen: 75, phosphorus: 57, potassium: 82 },
  { date: "Jan 30", nitrogen: 73, phosphorus: 55, potassium: 80 },
  { date: "Feb 4", nitrogen: 70, phosphorus: 52, potassium: 84 },
  { date: "Feb 9", nitrogen: 72, phosphorus: 50, potassium: 86 },
  { date: "Feb 14", nitrogen: 74, phosphorus: 48, potassium: 87 },
  { date: "Feb 19", nitrogen: 75, phosphorus: 46, potassium: 88 },
  { date: "Feb 24", nitrogen: 76, phosphorus: 45, potassium: 89 },
  { date: "Feb 27", nitrogen: 75, phosphorus: 45, potassium: 88 },
];

const cropProfiles = {
  tomato: {
    name: "Tomato",
    optimalN: 80,
    optimalP: 70,
    optimalK: 85,
  },
  wheat: {
    name: "Wheat",
    optimalN: 75,
    optimalP: 65,
    optimalK: 70,
  },
  rice: {
    name: "Rice",
    optimalN: 85,
    optimalP: 55,
    optimalK: 65,
  },
};

export function NPKHistory() {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<keyof typeof cropProfiles>("tomato");
  const [timeRange, setTimeRange] = useState("90");

  const crop = cropProfiles[selectedCrop];
  const latestData = historicalData[historicalData.length - 1];

  // Calculate trends
  const calculateTrend = (nutrient: "nitrogen" | "phosphorus" | "potassium") => {
    const recent = historicalData.slice(-5);
    const older = historicalData.slice(-10, -5);
    const recentAvg = recent.reduce((sum, d) => sum + d[nutrient], 0) / recent.length;
    const olderAvg = older.reduce((sum, d) => sum + d[nutrient], 0) / older.length;
    const change = recentAvg - olderAvg;
    return {
      direction: change > 1 ? "up" : change < -1 ? "down" : "stable",
      value: Math.abs(change).toFixed(1),
    };
  };

  const nitrogenTrend = calculateTrend("nitrogen");
  const phosphorusTrend = calculateTrend("phosphorus");
  const potassiumTrend = calculateTrend("potassium");

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (current: number, optimal: number) => {
    const diff = Math.abs(current - optimal);
    if (diff <= optimal * 0.15) {
      return <Badge className="bg-green-100 text-green-700 border-0">Optimal</Badge>;
    } else if (diff <= optimal * 0.3) {
      return <Badge className="bg-yellow-100 text-yellow-700 border-0">Warning</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 border-0">Critical</Badge>;
    }
  };

  // Health insights
  const insights = [
    {
      icon: latestData.nitrogen >= crop.optimalN * 0.85 ? CheckCircle : AlertCircle,
      color: latestData.nitrogen >= crop.optimalN * 0.85 ? "text-green-600" : "text-yellow-600",
      title: "Nitrogen Levels",
      message:
        latestData.nitrogen >= crop.optimalN * 0.85
          ? "Nitrogen levels are healthy and support optimal growth"
          : "Nitrogen is trending low. Consider fertilizer application within 5 days",
    },
    {
      icon: latestData.phosphorus >= crop.optimalP * 0.85 ? CheckCircle : AlertCircle,
      color: latestData.phosphorus >= crop.optimalP * 0.85 ? "text-green-600" : "text-red-600",
      title: "Phosphorus Levels",
      message:
        latestData.phosphorus >= crop.optimalP * 0.85
          ? "Phosphorus is within acceptable range"
          : "Phosphorus is critically low. Immediate action recommended",
    },
    {
      icon: CheckCircle,
      color: "text-green-600",
      title: "Potassium Levels",
      message: "Potassium levels are excellent and above optimal range",
    },
  ];

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
              <h1 className="text-3xl font-bold text-green-800 mb-2">NPK Nutrient History</h1>
              <p className="text-gray-600">Track soil chemistry trends over time</p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedCrop} onValueChange={(value) => setSelectedCrop(value as keyof typeof cropProfiles)}>
                <SelectTrigger className="w-40 border-green-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cropProfiles).map(([key, profile]) => (
                    <SelectItem key={key} value={key}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 border-green-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Current Status Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="border-green-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <h3 className="font-semibold text-gray-800">Nitrogen</h3>
                </div>
                {getStatusBadge(latestData.nitrogen, crop.optimalN)}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold text-gray-900">{latestData.nitrogen}%</p>
                <span className="text-sm text-gray-600">/ {crop.optimalN}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {getTrendIcon(nitrogenTrend.direction)}
                <span className="text-gray-600">
                  {nitrogenTrend.value}% {nitrogenTrend.direction === "stable" ? "stable" : "change"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  <h3 className="font-semibold text-gray-800">Phosphorus</h3>
                </div>
                {getStatusBadge(latestData.phosphorus, crop.optimalP)}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold text-gray-900">{latestData.phosphorus}%</p>
                <span className="text-sm text-gray-600">/ {crop.optimalP}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {getTrendIcon(phosphorusTrend.direction)}
                <span className="text-gray-600">
                  {phosphorusTrend.value}% {phosphorusTrend.direction === "stable" ? "stable" : "change"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍃</span>
                  <h3 className="font-semibold text-gray-800">Potassium</h3>
                </div>
                {getStatusBadge(latestData.potassium, crop.optimalK)}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold text-gray-900">{latestData.potassium}%</p>
                <span className="text-sm text-gray-600">/ {crop.optimalK}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {getTrendIcon(potassiumTrend.direction)}
                <span className="text-gray-600">
                  {potassiumTrend.value}% {potassiumTrend.direction === "stable" ? "stable" : "change"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Trend Chart */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Calendar className="w-5 h-5" />
              Historical Trend ({timeRange} Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorNitrogen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPhosphorus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPotassium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "11px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                
                {/* Optimal Zone Reference */}
                <ReferenceLine
                  y={crop.optimalN}
                  stroke="#10b981"
                  strokeDasharray="5 5"
                  strokeOpacity={0.3}
                  label={{ value: `N: ${crop.optimalN}%`, position: "right", fill: "#10b981", fontSize: 11 }}
                />
                <ReferenceLine
                  y={crop.optimalP}
                  stroke="#3b82f6"
                  strokeDasharray="5 5"
                  strokeOpacity={0.3}
                  label={{ value: `P: ${crop.optimalP}%`, position: "right", fill: "#3b82f6", fontSize: 11 }}
                />
                <ReferenceLine
                  y={crop.optimalK}
                  stroke="#8b5cf6"
                  strokeDasharray="5 5"
                  strokeOpacity={0.3}
                  label={{ value: `K: ${crop.optimalK}%`, position: "right", fill: "#8b5cf6", fontSize: 11 }}
                />

                <Area
                  type="monotone"
                  dataKey="nitrogen"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNitrogen)"
                  name="Nitrogen"
                />
                <Area
                  type="monotone"
                  dataKey="phosphorus"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPhosphorus)"
                  name="Phosphorus"
                />
                <Area
                  type="monotone"
                  dataKey="potassium"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPotassium)"
                  name="Potassium"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-gray-700">
                <strong>Shaded area:</strong> Optimal nutrient zone for {crop.name}. Keep values within 15% of target
                lines for best results.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Health Insights */}
        <Card className="border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Leaf className="w-5 h-5" />
              Automated Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <insight.icon className={`w-6 h-6 ${insight.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-700">{insight.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
