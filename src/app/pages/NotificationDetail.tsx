import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Droplets,
  Leaf,
  AlertTriangle,
  Clock,
  MapPin,
  TrendingDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface NotificationData {
  id: string;
  type: "moisture" | "nutrient" | "device" | "weather";
  priority: "critical" | "warning" | "info" | "resolved";
  title: string;
  message: string;
  timestamp: string;
  location: string;
  details: {
    description: string;
    currentValue?: number;
    optimalValue?: number;
    unit?: string;
    impact?: string;
    history?: Array<{ time: string; value: number }>;
  };
  actions: Array<{
    label: string;
    type: "primary" | "secondary";
    icon?: any;
  }>;
}

const notificationDatabase: Record<string, NotificationData> = {
  "1": {
    id: "1",
    type: "moisture",
    priority: "critical",
    title: "Critical: Low Soil Moisture",
    message: "Soil moisture at Field A has dropped to 25%. Immediate irrigation recommended.",
    timestamp: "5 minutes ago",
    location: "Field A - Tomato",
    details: {
      description:
        "Soil moisture levels have fallen below the critical threshold for tomato crops. This can lead to wilting, reduced fruit quality, and potential crop loss if not addressed immediately. The sensor detected a rapid decline over the past 6 hours.",
      currentValue: 25,
      optimalValue: 65,
      unit: "%",
      impact: "High risk of crop stress and yield reduction. Plants may show wilting signs within 2-4 hours.",
      history: [
        { time: "00:00", value: 68 },
        { time: "04:00", value: 62 },
        { time: "08:00", value: 54 },
        { time: "12:00", value: 45 },
        { time: "16:00", value: 35 },
        { time: "20:00", value: 25 },
      ],
    },
    actions: [
      { label: "Start Irrigation", type: "primary", icon: Droplets },
      { label: "View Field Details", type: "secondary" },
      { label: "Mark as Resolved", type: "secondary", icon: CheckCircle },
    ],
  },
  "2": {
    id: "2",
    type: "nutrient",
    priority: "warning",
    title: "Warning: Nitrogen Level Low",
    message: "Nitrogen levels in Field B are at 45%. Consider fertilizer application.",
    timestamp: "1 hour ago",
    location: "Field B - Wheat",
    details: {
      description:
        "Nitrogen levels have gradually decreased and are now in the warning zone. While not immediately critical, continued decline could affect crop growth and yield. This is common during the vegetative growth stage when plants consume nitrogen rapidly.",
      currentValue: 45,
      optimalValue: 75,
      unit: "%",
      impact: "Moderate risk of reduced growth rate and yellowing of lower leaves. Yield may be affected if not addressed within 3-5 days.",
      history: [
        { time: "Day 1", value: 78 },
        { time: "Day 5", value: 72 },
        { time: "Day 10", value: 65 },
        { time: "Day 15", value: 58 },
        { time: "Day 20", value: 52 },
        { time: "Day 25", value: 45 },
      ],
    },
    actions: [
      { label: "Apply Fertilizer", type: "primary", icon: Leaf },
      { label: "View NPK Report", type: "secondary" },
      { label: "Schedule Application", type: "secondary" },
    ],
  },
};

export function NotificationDetail() {
  const navigate = useNavigate();
  const { notificationId } = useParams();

  const notification = notificationDatabase[notificationId || "1"] || notificationDatabase["1"];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "critical":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600",
          badge: "bg-red-600",
          text: "text-red-800",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          badge: "bg-yellow-600",
          text: "text-yellow-800",
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          badge: "bg-blue-600",
          text: "text-blue-800",
        };
    }
  };

  const getTypeIcon = (type: string, priority: string) => {
    const style = getPriorityStyle(priority);
    switch (type) {
      case "moisture":
        return <Droplets className={`w-8 h-8 ${style.icon}`} />;
      case "nutrient":
        return <Leaf className={`w-8 h-8 ${style.icon}`} />;
      case "device":
        return <AlertTriangle className={`w-8 h-8 ${style.icon}`} />;
      default:
        return <Clock className={`w-8 h-8 ${style.icon}`} />;
    }
  };

  const style = getPriorityStyle(notification.priority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/notifications")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notifications
          </Button>
        </div>

        {/* Alert Header */}
        <Card className={`border-2 ${style.border} shadow-xl mb-6`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {getTypeIcon(notification.type, notification.priority)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h1 className={`text-2xl font-bold ${style.text}`}>{notification.title}</h1>
                  <Badge className={`${style.badge} text-white border-0 capitalize`}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-4">{notification.message}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {notification.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {notification.location}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        {notification.details.currentValue && (
          <Card className="border-green-200 shadow-md mb-6">
            <CardHeader>
              <CardTitle className="text-green-800">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-4 ${style.bg} rounded-lg text-center`}>
                  <p className="text-sm text-gray-600 mb-1">Current Level</p>
                  <p className={`text-3xl font-bold ${style.text}`}>
                    {notification.details.currentValue}
                    {notification.details.unit}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingDown className={`w-4 h-4 ${style.icon}`} />
                    <span className={`text-xs ${style.text}`}>Below optimal</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Optimal Level</p>
                  <p className="text-3xl font-bold text-green-700">
                    {notification.details.optimalValue}
                    {notification.details.unit}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700">Target range</span>
                  </div>
                </div>
                <div className={`p-4 ${style.bg} rounded-lg text-center`}>
                  <p className="text-sm text-gray-600 mb-1">Difference</p>
                  <p className={`text-3xl font-bold ${style.text}`}>
                    {Math.abs((notification.details.currentValue || 0) - (notification.details.optimalValue || 0))}
                    {notification.details.unit}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <XCircle className={`w-4 h-4 ${style.icon}`} />
                    <span className={`text-xs ${style.text}`}>Action required</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 24-Hour Trend */}
        {notification.details.history && (
          <Card className="border-green-200 shadow-md mb-6">
            <CardHeader>
              <CardTitle className="text-green-800">Historical Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={notification.details.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                    }}
                  />
                  {notification.details.optimalValue && (
                    <ReferenceLine
                      y={notification.details.optimalValue}
                      stroke="#10b981"
                      strokeDasharray="3 3"
                      label={{ value: "Optimal", position: "right", fill: "#10b981" }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      notification.priority === "critical"
                        ? "#dc2626"
                        : notification.priority === "warning"
                        ? "#f59e0b"
                        : "#3b82f6"
                    }
                    strokeWidth={3}
                    dot={{ fill: "#fff", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Detailed Description */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Issue Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-sm text-gray-700">{notification.details.description}</p>
            </div>
            {notification.details.impact && (
              <div className={`p-4 ${style.bg} rounded-lg border-l-4 ${style.border}`}>
                <h4 className={`font-semibold ${style.text} mb-2 flex items-center gap-2`}>
                  <AlertTriangle className="w-4 h-4" />
                  Potential Impact
                </h4>
                <p className="text-sm text-gray-700">{notification.details.impact}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.type === "primary" ? "default" : "outline"}
                  className={
                    action.type === "primary"
                      ? "bg-green-600 hover:bg-green-700 text-white flex-1"
                      : "border-green-300 text-green-700 hover:bg-green-50 flex-1"
                  }
                  onClick={() => {
                    if (action.label === "Start Irrigation") {
                      navigate("/app/irrigation");
                    } else if (action.label === "View NPK Report") {
                      navigate("/app/nutrients");
                    } else if (action.label === "Mark as Resolved") {
                      navigate("/app/notifications");
                    }
                  }}
                >
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
