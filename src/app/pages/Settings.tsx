import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  ArrowLeft,
  User,
  MapPin,
  Bell,
  Smartphone,
  Gauge,
  Lock,
  LogOut,
  ChevronRight,
  Save,
  Mail,
  Phone,
} from "lucide-react";

export function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Farm Profile State
  const [farmProfile, setFarmProfile] = useState({
    name: "Green Valley Farm",
    owner: "John Farmer",
    email: "john@greenvalley.com",
    phone: "+1 234 567 8900",
    location: "California, USA",
    farmSize: "50 acres",
    cropTypes: "Tomatoes, Wheat, Rice",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    moistureAlerts: true,
    nutrientAlerts: true,
    deviceStatus: true,
    weatherUpdates: false,
    dailyReports: true,
  });

  // Calibration Settings
  const [calibration, setCalibration] = useState({
    moistureSensor: 95,
    npkSensor: 92,
    temperatureSensor: 98,
    lastCalibration: "2024-02-20",
  });

  const menuSections = [
    {
      id: "profile",
      title: "Farm Profile",
      icon: MapPin,
      description: "Manage farm details and location",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "account",
      title: "Account Settings",
      icon: User,
      description: "Update your personal information",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Configure alert preferences",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "devices",
      title: "IoT Devices",
      icon: Smartphone,
      description: "Manage connected hardware",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "calibration",
      title: "Sensor Calibration",
      icon: Gauge,
      description: "Calibrate sensor readings",
      color: "from-teal-500 to-green-600",
    },
    {
      id: "security",
      title: "Security",
      icon: Lock,
      description: "Password and privacy settings",
      color: "from-gray-600 to-gray-700",
    },
  ];

  const handleSave = () => {
    // In a real app, save to backend
    alert("Settings saved successfully!");
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
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
          <h1 className="text-3xl font-bold text-green-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your farm profile and app preferences</p>
        </div>

        {!activeSection ? (
          <>
            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {menuSections.map((section) => (
                <Card
                  key={section.id}
                  className="cursor-pointer hover:shadow-xl transition-all border-green-200"
                  onClick={() => setActiveSection(section.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="border-green-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => navigate("/app/device-setup")}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Add New Device
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => navigate("/")}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
              onClick={() => setActiveSection(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>

            {/* Farm Profile Section */}
            {activeSection === "profile" && (
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <MapPin className="w-5 h-5" />
                    Farm Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmName">Farm Name</Label>
                      <Input
                        id="farmName"
                        value={farmProfile.name}
                        onChange={(e) => setFarmProfile({ ...farmProfile, name: e.target.value })}
                        className="mt-1 border-green-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="owner">Owner Name</Label>
                      <Input
                        id="owner"
                        value={farmProfile.owner}
                        onChange={(e) => setFarmProfile({ ...farmProfile, owner: e.target.value })}
                        className="mt-1 border-green-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={farmProfile.location}
                        onChange={(e) => setFarmProfile({ ...farmProfile, location: e.target.value })}
                        className="mt-1 border-green-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmSize">Farm Size</Label>
                      <Input
                        id="farmSize"
                        value={farmProfile.farmSize}
                        onChange={(e) => setFarmProfile({ ...farmProfile, farmSize: e.target.value })}
                        className="mt-1 border-green-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cropTypes">Crop Types</Label>
                      <Input
                        id="cropTypes"
                        value={farmProfile.cropTypes}
                        onChange={(e) => setFarmProfile({ ...farmProfile, cropTypes: e.target.value })}
                        className="mt-1 border-green-200"
                        placeholder="e.g., Tomatoes, Wheat, Rice"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Account Settings Section */}
            {activeSection === "account" && (
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <User className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={farmProfile.email}
                          onChange={(e) => setFarmProfile({ ...farmProfile, email: e.target.value })}
                          className="pl-10 border-green-200"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={farmProfile.phone}
                          onChange={(e) => setFarmProfile({ ...farmProfile, phone: e.target.value })}
                          className="pl-10 border-green-200"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {key === "moistureAlerts" && "Get notified when soil moisture is low"}
                          {key === "nutrientAlerts" && "Alerts for nutrient level changes"}
                          {key === "deviceStatus" && "Device connection status updates"}
                          {key === "weatherUpdates" && "Daily weather forecasts"}
                          {key === "dailyReports" && "Daily summary of farm conditions"}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          value ? "bg-green-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            value ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* IoT Devices Section */}
            {activeSection === "devices" && (
              <div className="space-y-4">
                <Card className="border-green-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Smartphone className="w-5 h-5" />
                      Connected Devices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { id: "AS-001", name: "Field A Sensor", status: "online", battery: 85 },
                      { id: "AS-002", name: "Field B Sensor", status: "online", battery: 92 },
                      { id: "AS-003", name: "Greenhouse Sensor", status: "offline", battery: 45 },
                    ].map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{device.name}</h4>
                          <p className="text-xs text-gray-600">ID: {device.id}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Battery: {device.battery}%</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              device.status === "online"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {device.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Button
                  onClick={() => navigate("/app/device-setup")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Add New Device
                </Button>
              </div>
            )}

            {/* Calibration Section */}
            {activeSection === "calibration" && (
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Gauge className="w-5 h-5" />
                    Sensor Calibration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      Last calibration: {calibration.lastCalibration}
                    </p>
                  </div>
                  {Object.entries(calibration).map(
                    ([key, value]) =>
                      key !== "lastCalibration" && (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                            <span className="text-sm font-semibold text-green-600">{value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      )
                  )}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => navigate("/app/npk-calibration")}
                  >
                    <Gauge className="w-4 h-4 mr-2" />
                    Run Calibration
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Lock className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-green-300 text-green-700">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-green-300 text-green-700">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-green-300 text-green-700">
                    Privacy Settings
                  </Button>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}