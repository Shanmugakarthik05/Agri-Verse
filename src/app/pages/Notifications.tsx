import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Droplets, Leaf, AlertTriangle, CheckCircle, XCircle, Clock, Filter } from "lucide-react";

interface Notification {
  id: string;
  type: "moisture" | "nutrient" | "device" | "weather";
  priority: "critical" | "warning" | "info" | "resolved";
  title: string;
  message: string;
  timestamp: string;
  location?: string;
  read: boolean;
}

export function Notifications() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "moisture",
      priority: "critical",
      title: "Critical: Low Soil Moisture",
      message: "Soil moisture at Field A has dropped to 25%. Immediate irrigation recommended.",
      timestamp: "5 minutes ago",
      location: "Field A - Tomato",
      read: false,
    },
    {
      id: "2",
      type: "nutrient",
      priority: "warning",
      title: "Warning: Nitrogen Level Low",
      message: "Nitrogen levels in Field B are at 45%. Consider fertilizer application.",
      timestamp: "1 hour ago",
      location: "Field B - Wheat",
      read: false,
    },
    {
      id: "3",
      type: "moisture",
      priority: "resolved",
      title: "Irrigation Completed",
      message: "Automated irrigation cycle completed successfully. Soil moisture restored to 65%.",
      timestamp: "2 hours ago",
      location: "Field A - Tomato",
      read: true,
    },
    {
      id: "4",
      type: "nutrient",
      priority: "warning",
      title: "Warning: Phosphorus Level Low",
      message: "Phosphorus levels at 40% in Greenhouse. Monitor closely.",
      timestamp: "3 hours ago",
      location: "Greenhouse - Rice",
      read: true,
    },
    {
      id: "5",
      type: "device",
      priority: "critical",
      title: "Device Offline",
      message: "AgriVerse Hub AS-003 has gone offline. Check device connection.",
      timestamp: "4 hours ago",
      location: "Field C",
      read: true,
    },
    {
      id: "6",
      type: "nutrient",
      priority: "info",
      title: "NPK Levels Optimal",
      message: "All nutrient levels are within optimal range for current crop stage.",
      timestamp: "6 hours ago",
      location: "Field A - Tomato",
      read: true,
    },
    {
      id: "7",
      type: "moisture",
      priority: "warning",
      title: "Warning: High Moisture",
      message: "Soil moisture at 85%. Risk of overwatering. Reduce irrigation schedule.",
      timestamp: "12 hours ago",
      location: "Field D - Lettuce",
      read: true,
    },
    {
      id: "8",
      type: "weather",
      priority: "info",
      title: "Rain Forecast",
      message: "Heavy rain expected tomorrow. Auto-irrigation will be paused.",
      timestamp: "1 day ago",
      location: "All Fields",
      read: true,
    },
  ]);

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
      case "resolved":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600",
          badge: "bg-green-600",
          text: "text-green-800",
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
        return <Droplets className={`w-5 h-5 ${style.icon}`} />;
      case "nutrient":
        return <Leaf className={`w-5 h-5 ${style.icon}`} />;
      case "device":
        return <AlertTriangle className={`w-5 h-5 ${style.icon}`} />;
      default:
        return <Clock className={`w-5 h-5 ${style.icon}`} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    navigate(`/app/notification/${id}`);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.priority === filter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
              {[
                { id: "all", label: "All" },
                { id: "unread", label: "Unread" },
                { id: "critical", label: "Critical" },
                { id: "warning", label: "Warning" },
                { id: "resolved", label: "Resolved" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    filter === tab.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const style = getPriorityStyle(notification.priority);
              return (
                <Card
                  key={notification.id}
                  className={`border-2 ${style.border} ${notification.read ? "opacity-70" : ""} hover:shadow-lg transition-all cursor-pointer`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {getTypeIcon(notification.type, notification.priority)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-semibold ${style.text}`}>{notification.title}</h3>
                          {!notification.read && (
                            <div className={`w-2 h-2 rounded-full ${style.badge} flex-shrink-0 mt-2`} />
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.timestamp}
                          </span>
                          {notification.location && (
                            <>
                              <span>•</span>
                              <span>{notification.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} flex-shrink-0`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="border-green-200 shadow-md">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">No Notifications</h3>
                <p className="text-sm text-gray-600">
                  {filter === "unread"
                    ? "You're all caught up!"
                    : `No ${filter} notifications at the moment.`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Critical", count: notifications.filter((n) => n.priority === "critical").length, color: "red" },
            { label: "Warning", count: notifications.filter((n) => n.priority === "warning").length, color: "yellow" },
            { label: "Resolved", count: notifications.filter((n) => n.priority === "resolved").length, color: "green" },
            { label: "Unread", count: unreadCount, color: "blue" },
          ].map((stat) => (
            <Card key={stat.label} className="border-green-200 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.count}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}