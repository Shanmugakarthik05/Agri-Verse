import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Leaf, User, MapPin, Sprout, ArrowRight, CheckCircle2, Languages } from "lucide-react";
import { Badge } from "../components/ui/badge";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const PRIMARY_CROPS = [
  { value: "rice", label: "Rice", icon: "🌾" },
  { value: "wheat", label: "Wheat", icon: "🌾" },
  { value: "corn", label: "Corn/Maize", icon: "🌽" },
  { value: "cotton", label: "Cotton", icon: "☁️" },
  { value: "sugarcane", label: "Sugarcane", icon: "🎋" },
  { value: "soybean", label: "Soybean", icon: "🫘" },
  { value: "potato", label: "Potato", icon: "🥔" },
  { value: "tomato", label: "Tomato", icon: "🍅" },
  { value: "onion", label: "Onion", icon: "🧅" },
  { value: "vegetables", label: "Mixed Vegetables", icon: "🥬" },
  { value: "fruits", label: "Fruits", icon: "🍎" },
  { value: "other", label: "Other", icon: "🌱" },
];

const FARM_SIZES = [
  { value: "small", label: "Small (< 2 acres)", description: "Home garden or small plot" },
  { value: "medium", label: "Medium (2-10 acres)", description: "Family farm" },
  { value: "large", label: "Large (> 10 acres)", description: "Commercial farming" },
];

const LANGUAGES = [
  { value: "english", label: "English", nativeName: "English" },
  { value: "hindi", label: "Hindi", nativeName: "हिंदी" },
  { value: "bengali", label: "Bengali", nativeName: "বাংলা" },
  { value: "telugu", label: "Telugu", nativeName: "తెలుగు" },
  { value: "marathi", label: "Marathi", nativeName: "मराठी" },
  { value: "tamil", label: "Tamil", nativeName: "தமிழ்" },
  { value: "gujarati", label: "Gujarati", nativeName: "ગુજરાતી" },
  { value: "kannada", label: "Kannada", nativeName: "ಕನ್ನ" },
  { value: "malayalam", label: "Malayalam", nativeName: "മലയാളം" },
  { value: "punjabi", label: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { value: "odia", label: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { value: "assamese", label: "Assamese", nativeName: "অসমীয়া" },
];

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  const verified = location.state?.verified || false;
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    district: "",
    primaryCrops: [] as string[],
    farmSize: "",
    language: "english",
  });

  const [step, setStep] = useState(1);

  const handleLanguageChange = (lang: string) => {
    setFormData({ ...formData, language: lang });
    // Change the app language immediately
    i18n.changeLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store user data and language preference
    const userData = {
      ...formData,
      phone,
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem("agriverse_user", JSON.stringify(userData));
    localStorage.setItem("agriverse_language", formData.language);
    
    // Navigate to success/onboarding
    navigate("/registration-success");
  };

  const toggleCrop = (cropValue: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(cropValue)
        ? prev.primaryCrops.filter((c) => c !== cropValue)
        : [...prev.primaryCrops, cropValue],
    }));
  };

  const isStep1Complete = formData.fullName && formData.state && formData.district;
  const isStep2Complete = formData.primaryCrops.length > 0 && formData.farmSize;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-green-200 relative z-10">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Leaf className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <div>
            <CardTitle className="text-3xl text-green-800 mb-2">{t('auth.register_title')}</CardTitle>
            <CardDescription className="text-green-600 text-base">
              {t('auth.register_subtitle')}
            </CardDescription>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === 1 ? "bg-green-100" : "bg-gray-100"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 1 ? "bg-green-600 text-white" : "bg-green-500 text-white"}`}>
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-sm font-medium ${step === 1 ? "text-green-800" : "text-gray-600"}`}>
                {t('auth.step_personal')}
              </span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === 2 ? "bg-green-100" : "bg-gray-100"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 2 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                2
              </div>
              <span className={`text-sm font-medium ${step === 2 ? "text-green-800" : "text-gray-600"}`}>
                {t('auth.step_farm')}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    {t('auth.full_name')} <span className="text-red-500">{t('auth.required')}</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t('auth.full_name_placeholder')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="border-green-300 focus:ring-green-500 h-12"
                    required
                  />
                </div>

                {/* Phone (read-only) */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {t('auth.phone_verified')}
                  </Label>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center justify-between">
                    <span className="text-green-800 font-medium">+91 {phone}</span>
                    <Badge className="bg-green-600 text-white">{t('auth.verified')}</Badge>
                  </div>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="state" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    {t('auth.state')} <span className="text-red-500">{t('auth.required')}</span>
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger className="border-green-300 h-12">
                      <SelectValue placeholder={t('auth.state_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state.toLowerCase()}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <Label htmlFor="district">
                    {t('auth.district')} <span className="text-red-500">{t('auth.required')}</span>
                  </Label>
                  <Input
                    id="district"
                    type="text"
                    placeholder={t('auth.district_placeholder')}
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="border-green-300 focus:ring-green-500 h-12"
                    required
                  />
                </div>

                {/* Language Preference */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-green-600" />
                    {t('auth.language')} <span className="text-red-500">{t('auth.required')}</span>
                  </Label>
                  <Select value={formData.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="border-green-300 h-12">
                      <SelectValue placeholder={t('auth.language_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.label}</span>
                            <span className="text-gray-500">({lang.nativeName})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600">
                    {t('auth.language_helper')}
                  </p>
                </div>

                {/* Next button */}
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Complete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium"
                >
                  {t('auth.next_farm_details')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Farm Details */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Primary Crop */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 justify-between">
                    <span className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-green-600" />
                      {t('auth.crops')} <span className="text-red-500">{t('auth.required')}</span>
                    </span>
                    {formData.primaryCrops.length > 0 && (
                      <Badge className="bg-green-100 text-green-700 border border-green-300">
                        {formData.primaryCrops.length} {t('auth.crops_selected')}
                      </Badge>
                    )}
                  </Label>
                  <p className="text-sm text-gray-600">{t('auth.crops_helper')}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRIMARY_CROPS.map((crop) => {
                      const isSelected = formData.primaryCrops.includes(crop.value);
                      return (
                        <button
                          key={crop.value}
                          type="button"
                          onClick={() => toggleCrop(crop.value)}
                          className={`p-4 border-2 rounded-lg text-center transition-all relative ${
                            isSelected
                              ? "border-green-600 bg-green-50 shadow-md"
                              : "border-gray-300 hover:border-green-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="text-3xl mb-1">{crop.icon}</div>
                          <div className="text-sm font-medium text-gray-800">{t(`crops.${crop.value}`)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Farm Size */}
                <div className="space-y-3">
                  <Label>
                    {t('auth.farm_size')} <span className="text-red-500">{t('auth.required')}</span>
                  </Label>
                  <div className="space-y-2">
                    {FARM_SIZES.map((size) => (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, farmSize: size.value })}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                          formData.farmSize === size.value
                            ? "border-green-600 bg-green-50 shadow-md"
                            : "border-gray-300 hover:border-green-300 bg-white"
                        }`}
                      >
                        <div className="font-semibold text-gray-800">{t(`auth.farm_${size.value}`)}</div>
                        <div className="text-sm text-gray-600">{t(`auth.farm_${size.value}_desc`)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50 h-12"
                  >
                    {t('common.back')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isStep2Complete}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium"
                  >
                    {t('auth.complete_registration')}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}