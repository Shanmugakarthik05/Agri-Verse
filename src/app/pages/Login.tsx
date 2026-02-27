import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Leaf, Phone, ArrowRight, Sparkles } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      navigate("/otp-verification", { state: { phone } });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 10);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-green-200 relative z-10">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl relative">
            <Leaf className="w-14 h-14 text-white" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div>
            <CardTitle className="text-4xl text-green-800 mb-2">{t('auth.phone_title')}</CardTitle>
            <CardDescription className="text-green-600 text-base">
              {t('auth.phone_subtitle')}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Phone input */}
          <div className="space-y-3">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" />
              {t('auth.phone_label')}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder={t('auth.phone_placeholder')}
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                className="bg-white border-green-300 focus:ring-green-500 focus:border-green-500 pl-14 text-lg h-14"
              />
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              We'll send you a one-time password (OTP) to verify
            </p>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleSendOtp}
            disabled={phone.length < 10}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            {t('auth.send_otp')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to AgriVerse?</span>
            </div>
          </div>

          {/* Register button */}
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50 h-12 text-base font-medium"
          >
            Create New Account
          </Button>

          {/* Terms */}
          <div className="text-center text-xs text-gray-500 pt-2">
            By continuing, you agree to our{" "}
            <a href="#" className="text-green-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}