import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Leaf, Droplets, Sprout, Sun } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Droplets className="w-16 h-16 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Sprout className="w-20 h-20 text-white/20" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float">
          <Sun className="w-14 h-14 text-white/20" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float-delayed">
          <Leaf className="w-12 h-12 text-white/20" />
        </div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="mx-auto w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-slow">
          <Leaf className="w-20 h-20 text-green-600" />
        </div>

        {/* Brand name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            {t('common.agriverse')}
          </h1>
          <p className="text-xl text-green-100 font-medium">
            {t('auth.splash_subtitle')}
          </p>
        </div>

        {/* Tagline */}
        <div className="max-w-md mx-auto">
          <p className="text-white/90 text-lg">
            {t('auth.splash_description')}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      <style>{`
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}