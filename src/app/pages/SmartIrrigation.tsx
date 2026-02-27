import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Droplets, Thermometer, Power, Settings, FileText } from "lucide-react";
import { Cell, PieChart, Pie, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function SmartIrrigation() {
  const navigate = useNavigate();
  const [pumpOn, setPumpOn] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [minThreshold, setMinThreshold] = useState([30]);
  const [maxThreshold, setMaxThreshold] = useState([70]);

  const currentMoisture = 45;
  const currentTemperature = 24;

  // Mock historical data
  const moistureHistory = [
    { time: "00:00", value: 42 },
    { time: "04:00", value: 38 },
    { time: "08:00", value: 35 },
    { time: "12:00", value: 45 },
    { time: "16:00", value: 48 },
    { time: "20:00", value: 45 },
  ];

  const pieData = [
    { name: "Current", value: currentMoisture },
    { name: "Remaining", value: 100 - currentMoisture },
  ];

  const getMoistureColor = () => {
    if (currentMoisture < 30) return "#ef4444"; // Red
    if (currentMoisture < 50) return "#f59e0b"; // Yellow
    return "#22c55e"; // Green
  };

  const getMoistureStatus = () => {
    if (currentMoisture < 30) return "Low - Irrigation Needed";
    if (currentMoisture < 50) return "Moderate";
    return "Optimal";
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Smart Irrigation</h1>
        <p className="text-gray-600">Monitor and control your irrigation system</p>
      </div>

      {/* Main Controls */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Moisture Gauge */}
        <Card className="border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Soil Moisture</span>
              <Badge 
                variant={currentMoisture >= 50 ? "default" : "destructive"}
                className={currentMoisture >= 50 ? "bg-green-600" : ""}
              >
                {getMoistureStatus()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill={getMoistureColor()} />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-32 mb-24">
                <div className="text-5xl font-bold" style={{ color: getMoistureColor() }}>
                  {currentMoisture}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Moisture Level</div>
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-orange-50 rounded-lg w-full">
                <Thermometer className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Soil Temperature</p>
                  <p className="text-xl font-bold text-gray-800">{currentTemperature}°C</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pump Control */}
        <Card className="border-blue-200 shadow-md">
          <CardHeader>
            <CardTitle>Pump Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Manual Pump Toggle */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    pumpOn ? "bg-blue-600" : "bg-gray-400"
                  }`}>
                    <Power className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Water Pump</h3>
                    <p className="text-sm text-gray-600">
                      Status: {pumpOn ? "ON" : "OFF"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pumpOn}
                  onCheckedChange={setPumpOn}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              {pumpOn && (
                <div className="text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-lg">
                  🚿 Irrigation in progress...
                </div>
              )}
            </div>

            {/* Auto Mode */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold">Auto Irrigation</h4>
                    <p className="text-xs text-gray-600">Automatic based on thresholds</p>
                  </div>
                </div>
                <Switch
                  checked={autoMode}
                  onCheckedChange={setAutoMode}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>

              {autoMode && (
                <div className="space-y-4 p-4 border-2 border-green-200 rounded-lg bg-white">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Minimum Moisture: {minThreshold[0]}%
                    </label>
                    <div className="flex items-center gap-3">
                      <Droplets className="w-4 h-4 text-red-500" />
                      <Slider
                        value={minThreshold}
                        onValueChange={setMinThreshold}
                        min={0}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Turn ON pump when moisture drops below this level
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Maximum Moisture: {maxThreshold[0]}%
                    </label>
                    <div className="flex items-center gap-3">
                      <Droplets className="w-4 h-4 text-green-500" />
                      <Slider
                        value={maxThreshold}
                        onValueChange={setMaxThreshold}
                        min={0}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Turn OFF pump when moisture reaches this level
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moisture History Chart */}
      <Card className="border-blue-200 shadow-md">
        <CardHeader>
          <CardTitle>Moisture Trend (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moistureHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Report Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/app/water-report")}
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Water Usage Report
        </Button>
      </div>
    </div>
  );
}