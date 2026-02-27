import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { CheckCircle2, Sprout } from "lucide-react";

export function DeviceSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const device = location.state?.device;
  const method = location.state?.method;

  const [deviceName, setDeviceName] = useState(device?.name || "My AgriVerse Hub");
  const [selectedCrop, setSelectedCrop] = useState("");

  const cropProfiles = [
    { id: "tomato", name: "Tomato", emoji: "🍅", color: "from-red-500 to-red-600" },
    { id: "wheat", name: "Wheat", emoji: "🌾", color: "from-yellow-500 to-amber-600" },
    { id: "rice", name: "Rice", emoji: "🌾", color: "from-green-400 to-green-600" },
    { id: "corn", name: "Corn", emoji: "🌽", color: "from-yellow-400 to-yellow-600" },
    { id: "potato", name: "Potato", emoji: "🥔", color: "from-amber-600 to-amber-700" },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", color: "from-green-500 to-green-600" },
  ];

  const handleComplete = () => {
    // In a real app, save the configuration
    navigate("/app", { 
      state: { 
        message: `${deviceName} successfully configured for ${cropProfiles.find(c => c.id === selectedCrop)?.name || "your crop"}!` 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Device Connected!</h1>
          <p className="text-gray-600">
            Successfully paired via {method === "bluetooth" ? "Bluetooth" : method === "wifi" ? "Wi-Fi" : "QR Code"}
          </p>
        </div>

        {/* Device Information */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Device Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Device ID:</span>
                <p className="font-semibold text-gray-800">{device?.id || "AS-001"}</p>
              </div>
              <div>
                <span className="text-gray-600">Device Type:</span>
                <p className="font-semibold text-gray-800">{device?.type || "ESP32"}</p>
              </div>
              <div>
                <span className="text-gray-600">Signal Strength:</span>
                <p className="font-semibold text-gray-800">{device?.signalStrength || 95}%</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-semibold text-green-600">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Form */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Configure Your Device</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Device Name */}
            <div>
              <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 mb-2">
                Device Name
              </label>
              <Input
                id="deviceName"
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="e.g., Field A Sensor"
                className="bg-white border-green-200"
              />
              <p className="text-xs text-gray-500 mt-1">Give your device a memorable name</p>
            </div>

            {/* Crop Profile Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Assign Crop Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cropProfiles.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCrop(crop.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedCrop === crop.id
                        ? "border-green-600 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 hover:bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-2">{crop.emoji}</div>
                    <div className="text-sm font-medium text-gray-800">{crop.name}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Select the crop you're monitoring to get optimized thresholds
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
            onClick={() => navigate("/app")}
          >
            Skip for Now
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleComplete}
            disabled={!selectedCrop}
          >
            Complete Setup
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="border-green-200 bg-green-50 shadow-md mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sprout className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-green-900 mb-1">Next Steps</h4>
                <p className="text-xs text-green-800">
                  Your device will start collecting data immediately. Visit the Dashboard to see real-time 
                  sensor readings and configure automation rules.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}