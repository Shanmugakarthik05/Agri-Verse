import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Droplets, Thermometer, Power, Settings, FileText, Clock, Plus, Trash2, Calendar, Bell, PlayCircle, StopCircle, Cloud, CloudRain, Sun, Wind, Pause, SkipForward, AlertCircle } from "lucide-react";
import { Cell, PieChart, Pie, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function SmartIrrigation() {
  const navigate = useNavigate();
  const [pumpOn, setPumpOn] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [minThreshold, setMinThreshold] = useState([30]);
  const [maxThreshold, setMaxThreshold] = useState([70]);
  
  // Timer/Schedule State
  const [schedules, setSchedules] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    startTime: "",
    endTime: "",
    duration: 30,
    repeatDays: [] as string[],
    action: "ON" as "ON" | "OFF",
    enabled: true,
  });

  // Weather & Smart Cancellation State
  const [weatherCondition, setWeatherCondition] = useState<"sunny" | "cloudy" | "rainy">("sunny");
  const [rainProbability, setRainProbability] = useState(20);
  const [autoCancelOnRain, setAutoCancelOnRain] = useState(true);
  const [autoCancelOnHighMoisture, setAutoCancelOnHighMoisture] = useState(true);
  const [pausedSchedules, setPausedSchedules] = useState<string[]>([]);
  const [skippedSchedules, setSkippedSchedules] = useState<string[]>([]);

  // Load schedules from localStorage on mount
  useEffect(() => {
    const savedSchedules = localStorage.getItem("irrigationSchedules");
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  // Save schedules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("irrigationSchedules", JSON.stringify(schedules));
  }, [schedules]);

  // Helper functions for schedules
  const addSchedule = () => {
    if (!newSchedule.name || !newSchedule.startTime) {
      alert("Please fill in required fields");
      return;
    }

    const schedule = {
      id: Date.now().toString(),
      ...newSchedule,
      createdAt: new Date().toISOString(),
    };

    setSchedules([...schedules, schedule]);
    setShowScheduleModal(false);
    setNewSchedule({
      name: "",
      startTime: "",
      endTime: "",
      duration: 30,
      repeatDays: [],
      action: "ON",
      enabled: true,
    });
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const toggleSchedule = (id: string) => {
    setSchedules(
      schedules.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  const toggleRepeatDay = (day: string) => {
    if (newSchedule.repeatDays.includes(day)) {
      setNewSchedule({
        ...newSchedule,
        repeatDays: newSchedule.repeatDays.filter((d) => d !== day),
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        repeatDays: [...newSchedule.repeatDays, day],
      });
    }
  };

  const getTimeUntil = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const scheduled = new Date(now);
    scheduled.setHours(hours, minutes, 0, 0);
    
    if (scheduled < now) {
      scheduled.setDate(scheduled.getDate() + 1);
    }
    
    const diff = scheduled.getTime() - now.getTime();
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntil > 0) {
      return `in ${hoursUntil}h ${minutesUntil}m`;
    }
    return `in ${minutesUntil}m`;
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

      {/* Weather & Smart Cancellation Section */}
      <Card className="border-sky-200 shadow-md bg-gradient-to-br from-sky-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {weatherCondition === "sunny" && <Sun className="w-5 h-5 text-yellow-500" />}
            {weatherCondition === "cloudy" && <Cloud className="w-5 h-5 text-gray-500" />}
            {weatherCondition === "rainy" && <CloudRain className="w-5 h-5 text-blue-500" />}
            Weather & Smart Cancellation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Weather Condition Simulator */}
          <div>
            <Label className="mb-2 block">Current Weather (Test Mode)</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant={weatherCondition === "sunny" ? "default" : "outline"}
                className={
                  weatherCondition === "sunny"
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "border-yellow-300"
                }
                onClick={() => {
                  setWeatherCondition("sunny");
                }}
              >
                <Sun className="w-4 h-4 mr-2" />
                Sunny
              </Button>
              <Button
                type="button"
                variant={weatherCondition === "cloudy" ? "default" : "outline"}
                className={
                  weatherCondition === "cloudy"
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "border-gray-300"
                }
                onClick={() => {
                  setWeatherCondition("cloudy");
                }}
              >
                <Cloud className="w-4 h-4 mr-2" />
                Cloudy
              </Button>
              <Button
                type="button"
                variant={weatherCondition === "rainy" ? "default" : "outline"}
                className={
                  weatherCondition === "rainy"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-300"
                }
                onClick={() => {
                  setWeatherCondition("rainy");
                }}
              >
                <CloudRain className="w-4 h-4 mr-2" />
                Rainy
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Rain Probability: {rainProbability}%  •  Temp: 26°C  •  Humidity: 65%
            </p>
          </div>

          {/* Rain Probability Slider */}
          <div className="bg-white rounded-lg p-4 border border-sky-200">
            <Label className="mb-3 block">Rain Probability: {rainProbability}%</Label>
            <div className="flex items-center gap-4">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <Slider
                value={[rainProbability]}
                onValueChange={(value) => setRainProbability(value[0])}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-sm font-semibold text-blue-600 min-w-[45px]">
                {rainProbability}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0% - No Rain</span>
              <span>50% - Possible</span>
              <span>100% - Heavy Rain</span>
            </div>
          </div>

          {/* Auto-Cancel Rules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-sky-200">
              <div className="flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Auto-Cancel on Rain</h4>
                  <p className="text-xs text-gray-600">Skip irrigation when rain probability &gt; 60%</p>
                </div>
              </div>
              <Switch
                checked={autoCancelOnRain}
                onCheckedChange={setAutoCancelOnRain}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-sky-200">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-semibold">Auto-Cancel on High Moisture</h4>
                  <p className="text-xs text-gray-600">Skip when soil moisture &gt; 70%</p>
                </div>
              </div>
              <Switch
                checked={autoCancelOnHighMoisture}
                onCheckedChange={setAutoCancelOnHighMoisture}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </div>

          {/* Active Alerts */}
          {((autoCancelOnRain && rainProbability > 60) || (autoCancelOnHighMoisture && currentMoisture > 70)) && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-800 mb-2">Smart Cancellation Active</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {autoCancelOnRain && rainProbability > 60 && (
                      <li>🌧️ High rain probability ({rainProbability}%) - Irrigation may be skipped</li>
                    )}
                    {autoCancelOnHighMoisture && currentMoisture > 70 && (
                      <li>💧 Soil moisture optimal ({currentMoisture}%) - No irrigation needed</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-4 border border-sky-200">
            <h4 className="font-semibold mb-3">Manual Overrides</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => {
                  const nextSchedule = schedules.find((s) => s.enabled);
                  if (nextSchedule) {
                    setSkippedSchedules([...skippedSchedules, nextSchedule.id]);
                    alert(`Next watering "${nextSchedule.name}" will be skipped once`);
                  } else {
                    alert("No active schedules to skip");
                  }
                }}
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Next Watering
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => {
                  if (schedules.some((s) => s.enabled)) {
                    const enabledIds = schedules.filter((s) => s.enabled).map((s) => s.id);
                    if (pausedSchedules.length > 0) {
                      setPausedSchedules([]);
                      alert("All schedules resumed");
                    } else {
                      setPausedSchedules(enabledIds);
                      alert("All schedules paused for 24 hours");
                    }
                  } else {
                    alert("No active schedules to pause");
                  }
                }}
              >
                <Pause className="w-4 h-4 mr-2" />
                {pausedSchedules.length > 0 ? "Resume All" : "Pause All (24h)"}
              </Button>
            </div>
          </div>

          {/* Paused/Skipped Notice */}
          {(pausedSchedules.length > 0 || skippedSchedules.length > 0) && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-purple-800">
                <Pause className="w-4 h-4" />
                <span className="font-medium">
                  {pausedSchedules.length > 0 && `${pausedSchedules.length} schedule(s) paused`}
                  {pausedSchedules.length > 0 && skippedSchedules.length > 0 && " • "}
                  {skippedSchedules.length > 0 && `${skippedSchedules.length} watering(s) will be skipped`}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timer Schedule Section */}
      <Card className="border-purple-200 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Irrigation Schedule
            </CardTitle>
            <Button
              onClick={() => setShowScheduleModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No schedules yet</h3>
              <p className="text-gray-500 mb-4">
                Set up automatic irrigation timers to water your crops at the perfect time
              </p>
              <Button
                onClick={() => setShowScheduleModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Schedule
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    schedule.enabled
                      ? "border-purple-300 bg-purple-50"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-800">{schedule.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            schedule.action === "ON"
                              ? "border-green-500 text-green-700 bg-green-50"
                              : "border-red-500 text-red-700 bg-red-50"
                          }
                        >
                          {schedule.action === "ON" ? (
                            <PlayCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <StopCircle className="w-3 h-3 mr-1" />
                          )}
                          Turn {schedule.action}
                        </Badge>
                        {schedule.enabled && (
                          <Badge className="bg-purple-600 text-white">
                            <Bell className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={schedule.enabled}
                        onCheckedChange={() => toggleSchedule(schedule.id)}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSchedule(schedule.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">
                        {schedule.startTime}
                        {schedule.endTime && ` - ${schedule.endTime}`}
                        {!schedule.endTime && ` (${schedule.duration} min)`}
                      </span>
                      {schedule.enabled && (
                        <span className="text-purple-600 font-semibold">
                          {getTimeUntil(schedule.startTime)}
                        </span>
                      )}
                    </div>

                    {schedule.repeatDays.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <div className="flex gap-1 flex-wrap">
                          {schedule.repeatDays.map((day: string) => (
                            <Badge
                              key={day}
                              variant="outline"
                              className="text-xs border-purple-300 text-purple-700"
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {schedule.repeatDays.length === 0 && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>One-time schedule</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-gray-200 bg-purple-50">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Create Irrigation Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Schedule Name */}
              <div className="space-y-2">
                <Label htmlFor="scheduleName">
                  Schedule Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="scheduleName"
                  placeholder="e.g., Morning Watering, Evening Irrigation"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  className="border-purple-300"
                />
              </div>

              {/* Action */}
              <div className="space-y-2">
                <Label>Action <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={newSchedule.action === "ON" ? "default" : "outline"}
                    className={
                      newSchedule.action === "ON"
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-300"
                    }
                    onClick={() => setNewSchedule({ ...newSchedule, action: "ON" })}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Turn ON Pump
                  </Button>
                  <Button
                    type="button"
                    variant={newSchedule.action === "OFF" ? "default" : "outline"}
                    className={
                      newSchedule.action === "OFF"
                        ? "bg-red-600 hover:bg-red-700"
                        : "border-red-300"
                    }
                    onClick={() => setNewSchedule({ ...newSchedule, action: "OFF" })}
                  >
                    <StopCircle className="w-4 h-4 mr-2" />
                    Turn OFF Pump
                  </Button>
                </div>
              </div>

              {/* Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    className="border-purple-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="480"
                    value={newSchedule.duration}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, duration: parseInt(e.target.value) || 30 })
                    }
                    className="border-purple-300"
                  />
                </div>
              </div>

              {/* Repeat Days */}
              <div className="space-y-2">
                <Label>Repeat On</Label>
                <div className="flex gap-2 flex-wrap">
                  {weekDays.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={newSchedule.repeatDays.includes(day) ? "default" : "outline"}
                      className={
                        newSchedule.repeatDays.includes(day)
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "border-purple-300"
                      }
                      size="sm"
                      onClick={() => toggleRepeatDay(day)}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Leave unselected for a one-time schedule
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowScheduleModal(false);
                    setNewSchedule({
                      name: "",
                      startTime: "",
                      endTime: "",
                      duration: 30,
                      repeatDays: [],
                      action: "ON",
                      enabled: true,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={addSchedule}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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