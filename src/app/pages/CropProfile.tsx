import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft, Droplets, Sun, ThermometerSun, Leaf, Activity, AlertCircle } from "lucide-react";

export function CropProfile() {
  const navigate = useNavigate();
  const { cropId } = useParams();

  const cropData: Record<string, any> = {
    tomato: {
      name: "Tomato",
      scientificName: "Solanum lycopersicum",
      emoji: "🍅",
      image: "https://images.unsplash.com/photo-1760562796048-099c8d914490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXBlJTIwcmVkJTIwdG9tYXRvZXMlMjB2aW5lfGVufDF8fHx8MTc3MjE5MDI4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A versatile fruit commonly used as a vegetable in cooking. Requires consistent moisture and warm temperatures.",
      growthStages: [
        { name: "Seedling", days: "0-14", status: "completed" },
        { name: "Vegetative", days: "15-35", status: "completed" },
        { name: "Flowering", days: "36-55", status: "current" },
        { name: "Fruiting", days: "56-80", status: "upcoming" },
      ],
      requirements: {
        temperature: { min: 18, max: 30, unit: "°C" },
        moisture: { min: 60, max: 80, unit: "%" },
        sunlight: { hours: "6-8", description: "Full sun" },
        soilPH: { min: 6.0, max: 6.8 },
      },
      nutrients: {
        nitrogen: { min: 50, max: 70, current: 65, status: "optimal" },
        phosphorus: { min: 60, max: 80, current: 72, status: "optimal" },
        potassium: { min: 70, max: 90, current: 85, status: "optimal" },
      },
      tips: [
        "Water consistently to prevent blossom end rot",
        "Provide support structures for vining varieties",
        "Remove suckers for better fruit production",
        "Monitor for early blight and hornworms",
      ],
    },
    wheat: {
      name: "Wheat",
      scientificName: "Triticum aestivum",
      emoji: "🌾",
      image: "https://images.unsplash.com/photo-1627842822558-c1f15aef9838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZpZWxkJTIwZ29sZGVufGVufDF8fHx8MTc3MjIxNTU2MXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A cereal grain that is a staple food worldwide. Grows best in temperate climates with moderate rainfall.",
      growthStages: [
        { name: "Germination", days: "0-10", status: "completed" },
        { name: "Tillering", days: "11-30", status: "completed" },
        { name: "Stem Extension", days: "31-60", status: "completed" },
        { name: "Heading", days: "61-90", status: "current" },
      ],
      requirements: {
        temperature: { min: 15, max: 25, unit: "°C" },
        moisture: { min: 40, max: 60, unit: "%" },
        sunlight: { hours: "8-10", description: "Full sun" },
        soilPH: { min: 6.0, max: 7.0 },
      },
      nutrients: {
        nitrogen: { min: 60, max: 80, current: 70, status: "optimal" },
        phosphorus: { min: 40, max: 60, current: 52, status: "optimal" },
        potassium: { min: 50, max: 70, current: 58, status: "optimal" },
      },
      tips: [
        "Plant in well-drained soil with good fertility",
        "Monitor for rust and powdery mildew",
        "Ensure adequate spacing for air circulation",
        "Harvest when grains are hard and dry",
      ],
    },
    rice: {
      name: "Rice",
      scientificName: "Oryza sativa",
      emoji: "🌾",
      image: "https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZHxlbnwxfHx8fDE3NzIxNTA4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A vital grain crop grown in flooded fields. Requires high water availability and warm growing conditions.",
      growthStages: [
        { name: "Germination", days: "0-12", status: "completed" },
        { name: "Vegetative", days: "13-50", status: "completed" },
        { name: "Reproductive", days: "51-85", status: "current" },
        { name: "Ripening", days: "86-120", status: "upcoming" },
      ],
      requirements: {
        temperature: { min: 20, max: 35, unit: "°C" },
        moisture: { min: 80, max: 100, unit: "%" },
        sunlight: { hours: "6-8", description: "Full sun" },
        soilPH: { min: 5.5, max: 6.5 },
      },
      nutrients: {
        nitrogen: { min: 70, max: 90, current: 78, status: "optimal" },
        phosphorus: { min: 50, max: 70, current: 62, status: "optimal" },
        potassium: { min: 60, max: 80, current: 68, status: "optimal" },
      },
      tips: [
        "Maintain consistent water levels in paddy",
        "Monitor for blast disease and stem borers",
        "Apply nitrogen in split doses",
        "Drain fields before harvest",
      ],
    },
  };

  const crop = cropData[cropId || "tomato"] || cropData.tomato;

  const getStageStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "current":
        return "bg-blue-500 ring-4 ring-blue-200";
      case "upcoming":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getNutrientStatus = (status: string) => {
    switch (status) {
      case "optimal":
        return { color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
      case "warning":
        return { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
      case "critical":
        return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
            onClick={() => navigate("/app/nutrients")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Nutrient Management
          </Button>
        </div>

        {/* Hero Section */}
        <Card className="border-green-200 shadow-xl overflow-hidden mb-6">
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              src={crop.image}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-5xl">{crop.emoji}</span>
                <div>
                  <h1 className="text-4xl font-bold">{crop.name}</h1>
                  <p className="text-sm italic opacity-90">{crop.scientificName}</p>
                </div>
              </div>
              <p className="text-sm opacity-90 max-w-2xl">{crop.description}</p>
            </div>
          </div>
        </Card>

        {/* Growth Stages */}
        <Card className="border-green-200 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Activity className="w-5 h-5" />
              Growth Stages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" />
              <div className="absolute top-5 left-0 h-1 bg-green-500" style={{ width: "50%" }} />

              {/* Stages */}
              <div className="relative grid grid-cols-4 gap-4">
                {crop.growthStages.map((stage: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 rounded-full ${getStageStatus(stage.status)} mx-auto mb-2 transition-all`} />
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">{stage.name}</h4>
                    <p className="text-xs text-gray-600">{stage.days} days</p>
                    {stage.status === "current" && (
                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Nutrients */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Care Requirements */}
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Care Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Temperature */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ThermometerSun className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Temperature</h4>
                  <p className="text-sm text-gray-600">
                    {crop.requirements.temperature.min}-{crop.requirements.temperature.max}
                    {crop.requirements.temperature.unit}
                  </p>
                </div>
              </div>

              {/* Moisture */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Soil Moisture</h4>
                  <p className="text-sm text-gray-600">
                    {crop.requirements.moisture.min}-{crop.requirements.moisture.max}
                    {crop.requirements.moisture.unit}
                  </p>
                </div>
              </div>

              {/* Sunlight */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sun className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Sunlight</h4>
                  <p className="text-sm text-gray-600">
                    {crop.requirements.sunlight.hours} hours/day • {crop.requirements.sunlight.description}
                  </p>
                </div>
              </div>

              {/* Soil pH */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Soil pH</h4>
                  <p className="text-sm text-gray-600">
                    {crop.requirements.soilPH.min} - {crop.requirements.soilPH.max}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrient Levels */}
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Current Nutrient Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nitrogen */}
              {Object.entries(crop.nutrients).map(([key, nutrient]: [string, any]) => {
                const statusStyle = getNutrientStatus(nutrient.status);
                const percentage = ((nutrient.current - nutrient.min) / (nutrient.max - nutrient.min)) * 100;

                return (
                  <div key={key} className={`p-4 rounded-lg border ${statusStyle.border} ${statusStyle.bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 capitalize">{key}</h4>
                      <span className={`text-sm font-medium ${statusStyle.color}`}>
                        {nutrient.current}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      Optimal range: {nutrient.min}-{nutrient.max}%
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Growing Tips */}
        <Card className="border-green-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <AlertCircle className="w-5 h-5" />
              Growing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {crop.tips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 pt-0.5">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
