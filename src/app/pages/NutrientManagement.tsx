import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Leaf, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Activity } from "lucide-react";

// Crop profiles with ideal NPK values
const cropProfiles = {
  tomato: {
    name: "Tomato",
    ideal_N: 80,
    ideal_P: 70,
    ideal_K: 85,
  },
  corn: {
    name: "Corn",
    ideal_N: 90,
    ideal_P: 60,
    ideal_K: 75,
  },
  wheat: {
    name: "Wheat",
    ideal_N: 75,
    ideal_P: 65,
    ideal_K: 70,
  },
  potato: {
    name: "Potato",
    ideal_N: 70,
    ideal_P: 80,
    ideal_K: 90,
  },
  rice: {
    name: "Rice",
    ideal_N: 85,
    ideal_P: 55,
    ideal_K: 65,
  },
};

// Mock current sensor values
const currentLevels = {
  nitrogen: 75,
  phosphorus: 45,
  potassium: 88,
};

export function NutrientManagement() {
  const [selectedCrop, setSelectedCrop] = useState<keyof typeof cropProfiles>("tomato");
  const navigate = useNavigate();

  const crop = cropProfiles[selectedCrop];

  const getNutrientStatus = (current: number, ideal: number) => {
    const difference = ((current - ideal) / ideal) * 100;
    
    if (Math.abs(difference) <= 15) {
      return { status: "optimal", color: "text-green-600", bgColor: "bg-green-50", label: "Optimal" };
    } else if (difference < -15) {
      return { status: "deficient", color: "text-red-600", bgColor: "bg-red-50", label: "Deficient" };
    } else {
      return { status: "excess", color: "text-yellow-600", bgColor: "bg-yellow-50", label: "Excess" };
    }
  };

  const getProgressColor = (current: number, ideal: number) => {
    const status = getNutrientStatus(current, ideal);
    if (status.status === "optimal") return "bg-green-500";
    if (status.status === "deficient") return "bg-red-500";
    return "bg-yellow-500";
  };

  const getRecommendation = (nutrient: string, current: number, ideal: number) => {
    const difference = ideal - current;
    
    if (Math.abs(difference) <= ideal * 0.15) {
      return `${nutrient} levels are optimal. No action needed.`;
    } else if (difference > 0) {
      return `Add ${Math.abs(difference).toFixed(0)}% more ${nutrient}. Consider using ${getNutrientFertilizer(nutrient)}.`;
    } else {
      return `${nutrient} is excessive. Reduce fertilizer application and monitor closely.`;
    }
  };

  const getNutrientFertilizer = (nutrient: string) => {
    if (nutrient === "Nitrogen") return "Urea or Ammonium Nitrate";
    if (nutrient === "Phosphorus") return "Superphosphate";
    return "Potassium Chloride";
  };

  const nutrients = [
    {
      name: "Nitrogen",
      symbol: "N",
      current: currentLevels.nitrogen,
      ideal: crop.ideal_N,
      icon: "🌱",
      role: "Promotes leaf growth and green color",
    },
    {
      name: "Phosphorus",
      symbol: "P",
      current: currentLevels.phosphorus,
      ideal: crop.ideal_P,
      icon: "🌿",
      role: "Supports root development and flowering",
    },
    {
      name: "Potassium",
      symbol: "K",
      current: currentLevels.potassium,
      ideal: crop.ideal_K,
      icon: "🍃",
      role: "Improves disease resistance and fruit quality",
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Nutrient Management</h1>
          <p className="text-gray-600">Monitor NPK levels and get crop-specific recommendations</p>
        </div>

        {/* Crop Selection */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Card className="md:w-72 border-green-200">
            <CardContent className="pt-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Your Crop
              </label>
              <Select value={selectedCrop} onValueChange={(value) => setSelectedCrop(value as keyof typeof cropProfiles)}>
                <SelectTrigger className="border-green-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cropProfiles).map(([key, profile]) => (
                    <SelectItem key={key} value={key}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Button
            onClick={() => navigate(`/app/crop-profile/${selectedCrop}`)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50 self-end mb-6"
          >
            View {crop.name} Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* NPK Levels */}
      <div className="grid md:grid-cols-3 gap-6">
        {nutrients.map((nutrient) => {
          const status = getNutrientStatus(nutrient.current, nutrient.ideal);
          const percentage = (nutrient.current / 100) * 100;

          return (
            <Card key={nutrient.symbol} className="border-green-200 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{nutrient.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{nutrient.name}</CardTitle>
                      <p className="text-xs text-gray-500">({nutrient.symbol})</p>
                    </div>
                  </div>
                  <Badge className={`${status.bgColor} ${status.color} border-0`}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current vs Ideal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Level</span>
                    <span className="font-bold text-lg">{nutrient.current}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-3"
                    indicatorClassName={getProgressColor(nutrient.current, nutrient.ideal)}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ideal Level</span>
                    <span className="font-semibold text-green-700">{nutrient.ideal}%</span>
                  </div>
                </div>

                {/* Difference Indicator */}
                <div className={`p-3 ${status.bgColor} rounded-lg`}>
                  <div className="flex items-center gap-2">
                    {nutrient.current < nutrient.ideal ? (
                      <TrendingDown className={`w-4 h-4 ${status.color}`} />
                    ) : nutrient.current > nutrient.ideal ? (
                      <TrendingUp className={`w-4 h-4 ${status.color}`} />
                    ) : (
                      <Leaf className={`w-4 h-4 ${status.color}`} />
                    )}
                    <span className={`text-sm font-medium ${status.color}`}>
                      {Math.abs(nutrient.current - nutrient.ideal).toFixed(0)}% 
                      {nutrient.current < nutrient.ideal ? " below" : nutrient.current > nutrient.ideal ? " above" : " at"} ideal
                    </span>
                  </div>
                </div>

                {/* Role */}
                <p className="text-xs text-gray-600 italic">{nutrient.role}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recommendations */}
      <Card className="border-green-200 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Recommendations for {crop.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nutrients.map((nutrient) => {
            const status = getNutrientStatus(nutrient.current, nutrient.ideal);
            return (
              <div key={nutrient.symbol} className={`p-4 ${status.bgColor} rounded-lg border-l-4 ${
                status.status === "optimal" ? "border-green-500" :
                status.status === "deficient" ? "border-red-500" : "border-yellow-500"
              }`}>
                <h4 className="font-semibold mb-1 flex items-center gap-2">
                  <span>{nutrient.icon}</span>
                  {nutrient.name} ({nutrient.symbol})
                </h4>
                <p className="text-sm text-gray-700">
                  {getRecommendation(nutrient.name, nutrient.current, nutrient.ideal)}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* NPK Comparison Chart */}
      <Card className="border-green-200 shadow-md">
        <CardHeader>
          <CardTitle>NPK Comparison: Current vs Ideal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {nutrients.map((nutrient) => (
              <div key={nutrient.symbol}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{nutrient.name} ({nutrient.symbol})</span>
                  <span className="text-xs text-gray-500">
                    {nutrient.current}% / {nutrient.ideal}%
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={getProgressColor(nutrient.current, nutrient.ideal)}
                      style={{ width: `${nutrient.current}%`, height: "100%" }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden opacity-50">
                    <div
                      className="bg-green-600"
                      style={{ width: `${nutrient.ideal}%`, height: "100%" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Current</span>
                  <span>Ideal</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
          onClick={() => navigate("/app/npk-history")}
        >
          <Activity className="w-4 h-4 mr-2" />
          View NPK History
        </Button>
        <Button 
          variant="outline"
          className="border-purple-300 text-purple-700 hover:bg-purple-50"
          onClick={() => navigate("/app/nutrient-report")}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Monthly Report
        </Button>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          Apply Recommendations <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}