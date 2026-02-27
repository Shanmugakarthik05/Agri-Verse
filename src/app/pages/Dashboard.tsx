import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Cloud, Droplets, Leaf, ScanLine, Wifi, WifiOff, ThermometerSun, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function Dashboard() {
  const navigate = useNavigate();

  const deviceStatus = {
    online: true,
    lastUpdate: "2 minutes ago",
    moisture: 45,
    temperature: 24,
    nitrogen: 75,
  };

  const weather = {
    condition: "Partly Cloudy",
    temp: 28,
    humidity: 65,
  };

  const modules = [
    {
      title: "Smart Irrigation",
      icon: Droplets,
      color: "from-blue-500 to-cyan-500",
      value: `${deviceStatus.moisture}%`,
      label: "Soil Moisture",
      path: "/app/irrigation",
    },
    {
      title: "Nutrient Management",
      icon: Leaf,
      color: "from-green-500 to-emerald-500",
      value: `${deviceStatus.nitrogen}%`,
      label: "Nitrogen Level",
      path: "/app/nutrients",
    },
    {
      title: "Disease AI",
      icon: ScanLine,
      color: "from-purple-500 to-pink-500",
      value: "Coming Soon",
      label: "AI Detection",
      path: "/app/disease",
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your farm overview.</p>
        </div>
        <Button
          onClick={() => navigate("/app/device-setup")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Device Status & Weather */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Device Status */}
        <Card className="border-green-200 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Device Status</CardTitle>
              <div className="flex items-center gap-2">
                {deviceStatus.online ? (
                  <>
                    <Wifi className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">Offline</span>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ESP32 Module</span>
                <span className="font-medium">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Update</span>
                <span className="font-medium">{deviceStatus.lastUpdate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sensors Active</span>
                <span className="font-medium">3/3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather */}
        <Card className="border-green-200 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold text-gray-800">{weather.temp}°C</span>
                </div>
                <p className="text-gray-600 mb-1">{weather.condition}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ThermometerSun className="w-4 h-4" />
                  <span>Humidity: {weather.humidity}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-4">Quick Access</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Card
              key={module.title}
              className="cursor-pointer hover:shadow-xl transition-shadow border-green-200"
              onClick={() => navigate(module.path)}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{module.title}</h3>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-2xl font-bold text-gray-800">{module.value}</div>
                  <div className="text-sm text-gray-600">{module.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-green-200 shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">Irrigation completed</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">Moisture level normal</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">NPK sensor calibrated</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}