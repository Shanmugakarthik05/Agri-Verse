import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Camera, Sparkles, ScanLine, Microscope, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function DiseaseManagement() {
  const features = [
    {
      icon: Camera,
      title: "Camera Integration",
      description: "Take photos of plant leaves directly from your device",
    },
    {
      icon: ScanLine,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning to detect plant diseases",
    },
    {
      icon: Microscope,
      title: "Disease Identification",
      description: "Identify diseases, pests, and nutrient deficiencies",
    },
    {
      icon: CheckCircle,
      title: "Treatment Plans",
      description: "Get actionable recommendations and treatment solutions",
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative h-96">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1667579931780-41d610a63488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGxhbnQlMjBsZWFmJTIwZGlzZWFzZSUyMGRldGVjdGlvbnxlbnwxfHx8fDE3NzIyMTQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Plant leaf for disease detection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <Badge className="mb-4 bg-purple-600 hover:bg-purple-700 text-white border-0 px-6 py-2 text-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Coming Soon
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Plant Disease Detection
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mb-6">
              Harness the power of artificial intelligence to diagnose plant health issues instantly. 
              Simply take a photo, and get expert recommendations.
            </p>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Feature in development • Expected Q2 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          What to Expect
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Will Work */}
      <Card className="border-purple-200 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            How It Will Work
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Capture Image</h4>
                <p className="text-sm text-gray-700">
                  Take a clear photo of the affected plant leaf using your device's camera
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">AI Analysis</h4>
                <p className="text-sm text-gray-700">
                  Our advanced AI model analyzes the image for signs of disease, pests, or nutrient deficiencies
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Get Results</h4>
                <p className="text-sm text-gray-700">
                  Receive instant diagnosis with confidence scores and detailed information about the issue
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Treatment Recommendations</h4>
                <p className="text-sm text-gray-700">
                  Get step-by-step treatment plans, including organic and chemical solutions
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stay Updated */}
      <Card className="border-green-200 shadow-md">
        <CardContent className="p-8 text-center">
          <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-4">
            We're working hard to bring you this powerful feature. Follow our progress and be the first to know when it launches!
          </p>
          <div className="text-sm text-gray-500">
            Check back regularly for updates on development progress
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
