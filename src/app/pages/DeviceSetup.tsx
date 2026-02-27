import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bluetooth, Wifi, QrCode, ArrowLeft } from "lucide-react";

export function DeviceSetup() {
  const navigate = useNavigate();

  const connectionMethods = [
    {
      id: "bluetooth",
      title: "Bluetooth",
      description: "Connect directly via Bluetooth",
      icon: Bluetooth,
      color: "from-blue-500 to-cyan-500",
      recommended: true,
    },
    {
      id: "wifi",
      title: "Wi-Fi",
      description: "Connect through your Wi-Fi network",
      icon: Wifi,
      color: "from-green-500 to-emerald-500",
      recommended: false,
    },
    {
      id: "qr",
      title: "QR Code",
      description: "Scan QR code on device",
      icon: QrCode,
      color: "from-purple-500 to-pink-500",
      recommended: false,
    },
  ];

  const handleMethodSelect = (methodId: string) => {
    navigate("/app/device-search", { state: { method: methodId } });
  };

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
          <h1 className="text-3xl font-bold text-green-800 mb-2">Add New Device</h1>
          <p className="text-gray-600">Choose how you'd like to connect your AgriVerse sensor hub</p>
        </div>

        {/* Connection Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {connectionMethods.map((method) => (
            <Card
              key={method.id}
              className="relative cursor-pointer hover:shadow-xl transition-all border-green-200 overflow-hidden"
              onClick={() => handleMethodSelect(method.id)}
            >
              {method.recommended && (
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Card */}
        <Card className="border-green-200 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Before You Start</CardTitle>
            <CardDescription>Make sure your device is ready for pairing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Power on your AgriVerse device</p>
                <p className="text-xs text-gray-600">The LED should blink blue indicating pairing mode</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Keep your phone nearby</p>
                <p className="text-xs text-gray-600">Stay within 5 meters for best connection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Enable Bluetooth/Wi-Fi</p>
                <p className="text-xs text-gray-600">Make sure your connection is turned on</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}