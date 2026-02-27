import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, Gauge, Droplets, Leaf, CheckCircle, AlertCircle, Loader2, Wifi } from "lucide-react";

type CalibrationStep = "start" | "stabilizing" | "success";

export function NPKCalibration() {
  const navigate = useNavigate();
  const [step, setStep] = useState<CalibrationStep>("start");
  const [progress, setProgress] = useState(0);
  const [stabilityProgress, setStabilityProgress] = useState(0);
  const [countdown, setCountdown] = useState(30);

  // Mock current sensor readings
  const [sensorReadings, setSensorReadings] = useState({
    nitrogen: 72,
    phosphorus: 48,
    potassium: 85,
  });

  // Calibration offsets
  const [offsets, setOffsets] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  });

  useEffect(() => {
    if (step === "stabilizing") {
      // Simulate stabilization process
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Calculate offsets
              setOffsets({
                nitrogen: Math.floor(Math.random() * 5 - 2),
                phosphorus: Math.floor(Math.random() * 5 - 2),
                potassium: Math.floor(Math.random() * 5 - 2),
              });
              setStep("success");
            }, 500);
            return 100;
          }
          return prev + 2;
        });

        setStabilityProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 3;
        });

        setCountdown((prev) => {
          if (prev <= 0) return 0;
          return prev - 0.6;
        });

        // Simulate fluctuating readings
        setSensorReadings({
          nitrogen: 72 + Math.random() * 4 - 2,
          phosphorus: 48 + Math.random() * 4 - 2,
          potassium: 85 + Math.random() * 4 - 2,
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [step]);

  const startCalibration = () => {
    setStep("stabilizing");
    setProgress(0);
    setStabilityProgress(0);
    setCountdown(30);
  };

  const saveCalibration = () => {
    // In a real app, this would save to the backend
    alert("Calibration saved successfully!");
    navigate("/app/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/settings")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">NPK Sensor Calibration</h1>
          <p className="text-gray-600">Ensure accurate nutrient readings for optimal farm management</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "start"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium text-gray-700">Prepare</span>
          </div>
          <div className={`w-16 h-1 ${step === "start" ? "bg-gray-300" : "bg-green-600"}`} />
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "stabilizing"
                  ? "bg-green-600 text-white"
                  : step === "start"
                  ? "bg-gray-300 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium text-gray-700">Stabilize</span>
          </div>
          <div className={`w-16 h-1 ${step === "success" ? "bg-green-600" : "bg-gray-300"}`} />
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "success"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </div>
            <span className="text-sm font-medium text-gray-700">Complete</span>
          </div>
        </div>

        {/* Step 1: Start */}
        {step === "start" && (
          <>
            {/* Instructions */}
            <Card className="border-green-200 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Gauge className="w-5 h-5" />
                  Calibration Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Before You Begin
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">1.</span>
                      <span>Clean all NPK sensor probes with distilled water and dry thoroughly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <span>Ensure sensors are properly inserted into calibration solution or test soil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">3.</span>
                      <span>Keep sensors stable and avoid movement during calibration (30 seconds)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">4.</span>
                      <span>Verify device connection is stable (Wi-Fi/Bluetooth signal should be strong)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Live Sensor Readings */}
            <Card className="border-green-200 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-green-800">
                  <span>Live Sensor Readings</span>
                  <div className="flex items-center gap-2 text-sm font-normal text-green-600">
                    <Wifi className="w-4 h-4" />
                    <span>Connected</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Nitrogen", key: "nitrogen", icon: "🌱", color: "green" },
                    { name: "Phosphorus", key: "phosphorus", icon: "🌿", color: "blue" },
                    { name: "Potassium", key: "potassium", icon: "🍃", color: "purple" },
                  ].map((nutrient) => (
                    <div
                      key={nutrient.key}
                      className={`p-4 bg-${nutrient.color}-50 rounded-lg border border-${nutrient.color}-200`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{nutrient.icon}</span>
                        <h4 className="font-semibold text-gray-800">{nutrient.name}</h4>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {sensorReadings[nutrient.key as keyof typeof sensorReadings].toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Current reading</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button onClick={startCalibration} className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Gauge className="w-4 h-4 mr-2" />
              Start Calibration
            </Button>
          </>
        )}

        {/* Step 2: Stabilizing */}
        {step === "stabilizing" && (
          <>
            <Card className="border-green-200 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Stabilizing Sensors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please keep sensors stable. Do not move or disturb them.</p>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {Math.ceil(countdown)}s
                  </div>
                  <p className="text-sm text-gray-500">Time remaining</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                      <span className="text-sm font-semibold text-green-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Signal Stability</span>
                      <span className="text-sm font-semibold text-blue-600">{Math.round(stabilityProgress)}%</span>
                    </div>
                    <Progress value={stabilityProgress} className="h-3" indicatorClassName="bg-blue-600" />
                  </div>
                </div>

                {/* Live readings during calibration */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "N", value: sensorReadings.nitrogen, color: "green" },
                    { name: "P", value: sensorReadings.phosphorus, color: "blue" },
                    { name: "K", value: sensorReadings.potassium, color: "purple" },
                  ].map((nutrient) => (
                    <div key={nutrient.name} className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">{nutrient.name}</p>
                      <p className="text-lg font-bold text-gray-900">{nutrient.value.toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <>
            <Card className="border-green-200 shadow-xl mb-6">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Calibration Complete!</h2>
                <p className="text-gray-600">Your NPK sensors have been successfully calibrated</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-green-800">Calibration Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Nitrogen", offset: offsets.nitrogen, icon: "🌱" },
                    { name: "Phosphorus", offset: offsets.phosphorus, icon: "🌿" },
                    { name: "Potassium", offset: offsets.potassium, icon: "🍃" },
                  ].map((nutrient) => (
                    <div
                      key={nutrient.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{nutrient.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{nutrient.name}</h4>
                          <p className="text-xs text-gray-600">Sensor offset applied</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {nutrient.offset > 0 ? "+" : ""}
                          {nutrient.offset}%
                        </p>
                        <p className="text-xs text-gray-500">Adjustment</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Next calibration recommended:</strong> 30 days from now (March 29, 2026)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={saveCalibration}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Calibration
              </Button>
              <Button
                onClick={() => setStep("start")}
                variant="outline"
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
              >
                Recalibrate
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
