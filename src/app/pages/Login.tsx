import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Sprout } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-green-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sprout className="w-12 h-12 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl text-green-800">AgriVerse</CardTitle>
            <CardDescription className="text-green-600">
              Smart Agriculture Platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showOtp ? (
            <>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border-green-200 focus:ring-green-500"
                />
              </div>
              <Button
                onClick={handleSendOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm text-gray-700">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="bg-white border-green-200 focus:ring-green-500 text-center text-2xl tracking-widest"
                />
              </div>
              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Verify & Login
              </Button>
              <Button
                onClick={() => setShowOtp(false)}
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                Change Number
              </Button>
            </>
          )}
          <div className="text-center text-xs text-gray-500 pt-4">
            By logging in, you agree to our Terms & Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}