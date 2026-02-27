import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Wifi, WifiOff } from "lucide-react";

interface Device {
  id: string;
  name: string;
  signalStrength: number;
  type: string;
}

export function DeviceSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const method = location.state?.method || "bluetooth";
  const [isSearching, setIsSearching] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  // Simulate device discovery
  useEffect(() => {
    const timer = setTimeout(() => {
      setDevices([
        { id: "AS-001", name: "AgriVerse Hub 001", signalStrength: 95, type: "ESP32" },
        { id: "AS-002", name: "AgriVerse Hub 002", signalStrength: 78, type: "ESP32" },
        { id: "AS-003", name: "AgriVerse Hub 003", signalStrength: 62, type: "Raspberry Pi" },
      ]);
      setIsSearching(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDeviceSelect = (device: Device) => {
    navigate("/app/device-success", { state: { device, method } });
  };

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return <Wifi className="w-5 h-5 text-green-600" />;
    if (strength >= 50) return <Wifi className="w-5 h-5 text-yellow-600" />;
    return <WifiOff className="w-5 h-5 text-red-600" />;
  };

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil((strength / 100) * 4);
    return (
      <div className="flex gap-0.5 items-end">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1 rounded-sm transition-all ${
              bar <= bars ? "bg-green-600" : "bg-gray-300"
            }`}
            style={{ height: `${bar * 4}px` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/device-setup")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Searching for Devices</h1>
          <p className="text-gray-600">
            Looking for nearby AgriVerse sensor hubs via {method === "bluetooth" ? "Bluetooth" : method === "wifi" ? "Wi-Fi" : "QR Code"}
          </p>
        </div>

        {/* Scanning Animation */}
        {isSearching && (
          <Card className="border-green-200 shadow-md mb-6 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
                <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-30" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Wifi className="w-16 h-16 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Scanning...</h3>
              <p className="text-sm text-gray-600">Please wait while we search for devices nearby</p>
            </CardContent>
          </Card>
        )}

        {/* Device List */}
        {!isSearching && devices.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              Found {devices.length} Device{devices.length !== 1 ? "s" : ""}
            </h2>
            {devices.map((device) => (
              <Card
                key={device.id}
                className="cursor-pointer hover:shadow-xl transition-all border-green-200"
                onClick={() => handleDeviceSelect(device)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                        {getSignalIcon(device.signalStrength)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{device.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-600">{device.id}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{device.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getSignalBars(device.signalStrength)}
                      <span className="text-xs font-medium text-gray-600">{device.signalStrength}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Devices Found */}
        {!isSearching && devices.length === 0 && (
          <Card className="border-green-200 shadow-md">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <WifiOff className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">No Devices Found</h3>
              <p className="text-sm text-gray-600 mb-6">
                Make sure your device is powered on and in pairing mode
              </p>
              <Button
                onClick={() => setIsSearching(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Search Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Card */}
        {!isSearching && (
          <Card className="border-green-200 bg-blue-50 shadow-md mt-6">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">Troubleshooting</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Check if the device LED is blinking blue</li>
                <li>• Move closer to the device (within 5 meters)</li>
                <li>• Restart the device and try again</li>
                <li>• Make sure no other app is connected to the device</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}