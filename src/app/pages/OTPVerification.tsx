import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Leaf, Shield, ArrowLeft, RefreshCw } from "lucide-react";

export function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 3);
    inputRefs[lastIndex].current?.focus();
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      // Check if this is a new user (demo logic - in real app, check with backend)
      const isNewUser = localStorage.getItem("agriverse_user") === null;
      
      if (isNewUser) {
        navigate("/register", { state: { phone, verified: true } });
      } else {
        navigate("/app");
      }
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
    // In real app, make API call to resend OTP
  };

  const isComplete = otp.every((digit) => digit !== "");

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
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
            <Shield className="w-14 h-14 text-white" />
          </div>

          {/* Title */}
          <div>
            <CardTitle className="text-3xl text-green-800 mb-2">Verify OTP</CardTitle>
            <CardDescription className="text-green-600 text-base">
              Enter the 4-digit code sent to
            </CardDescription>
            <p className="text-green-800 font-semibold text-lg mt-1">
              +91 {phone}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OTP Input boxes */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 text-center block">
              One-Time Password
            </label>
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-3xl font-bold border-2 border-green-300 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all bg-white"
                />
              ))}
            </div>
          </div>

          {/* Timer / Resend */}
          <div className="text-center">
            {canResend ? (
              <Button
                onClick={handleResend}
                variant="link"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend OTP
              </Button>
            ) : (
              <p className="text-sm text-gray-600">
                Resend OTP in <span className="font-semibold text-green-600">{timer}s</span>
              </p>
            )}
          </div>

          {/* Verify button */}
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            size="lg"
          >
            Verify & Continue
          </Button>

          {/* Back button */}
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50 h-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Change Phone Number
          </Button>

          {/* Help text */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the code?{" "}
              <a href="#" className="text-green-600 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
