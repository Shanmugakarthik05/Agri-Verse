import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, Sparkles, Leaf, Droplets, Sprout } from "lucide-react";

export function RegistrationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti-like celebration effect
    const timer = setTimeout(() => {
      // Auto-redirect after celebration
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float opacity-30">
          <Droplets className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed opacity-30">
          <Sprout className="w-20 h-20 text-green-600" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float opacity-30">
          <Leaf className="w-14 h-14 text-green-600" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float-delayed opacity-30">
          <Sparkles className="w-12 h-12 text-yellow-500" />
        </div>
      </div>

      <Card className="w-full max-w-lg shadow-2xl border-green-200 relative z-10">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          {/* Success icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>

          {/* Success message */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">
              Welcome to AgriVerse! 🎉
            </h1>
            <p className="text-lg text-gray-700">
              Your account has been successfully created
            </p>
          </div>

          {/* Features preview */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3 text-left">
            <h3 className="font-semibold text-green-800 text-center mb-4">
              What you can do now:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Connect IoT Devices</p>
                  <p className="text-sm text-gray-600">Pair your sensors and smart devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Monitor Farm Conditions</p>
                  <p className="text-sm text-gray-600">Real-time soil, water, and nutrient data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Automate Irrigation</p>
                  <p className="text-sm text-gray-600">Set smart thresholds for your crops</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate("/app")}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-medium shadow-lg"
            size="lg"
          >
            Get Started
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>

          {/* Optional: Setup devices later */}
          <Button
            onClick={() => navigate("/app")}
            variant="link"
            className="text-green-600 hover:text-green-700"
          >
            I'll set up my devices later
          </Button>
        </CardContent>
      </Card>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
