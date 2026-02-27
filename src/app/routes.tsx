import { createBrowserRouter } from "react-router";
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { OTPVerification } from "./pages/OTPVerification";
import { Register } from "./pages/Register";
import { RegistrationSuccess } from "./pages/RegistrationSuccess";
import { Dashboard } from "./pages/Dashboard";
import { SmartIrrigation } from "./pages/SmartIrrigation";
import { NutrientManagement } from "./pages/NutrientManagement";
import { DiseaseManagement } from "./pages/DiseaseManagement";
import { UserManual } from "./pages/UserManual";
import { DeviceSetup } from "./pages/DeviceSetup";
import { DeviceSearch } from "./pages/DeviceSearch";
import { DeviceSuccess } from "./pages/DeviceSuccess";
import { CropProfile } from "./pages/CropProfile";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { NotificationDetail } from "./pages/NotificationDetail";
import { NPKCalibration } from "./pages/NPKCalibration";
import { WaterUsageReport } from "./pages/WaterUsageReport";
import { NutrientReport } from "./pages/NutrientReport";
import { NPKHistory } from "./pages/NPKHistory";
import { AddVideo } from "./pages/AddVideo";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/otp-verification",
    Component: OTPVerification,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/registration-success",
    Component: RegistrationSuccess,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "irrigation",
        Component: SmartIrrigation,
      },
      {
        path: "nutrients",
        Component: NutrientManagement,
      },
      {
        path: "disease",
        Component: DiseaseManagement,
      },
      {
        path: "manual",
        Component: UserManual,
      },
    ],
  },
  {
    path: "/app/device-setup",
    Component: DeviceSetup,
  },
  {
    path: "/app/device-search",
    Component: DeviceSearch,
  },
  {
    path: "/app/device-success",
    Component: DeviceSuccess,
  },
  {
    path: "/app/crop-profile/:cropId",
    Component: CropProfile,
  },
  {
    path: "/app/settings",
    Component: Settings,
  },
  {
    path: "/app/notifications",
    Component: Notifications,
  },
  {
    path: "/app/notification/:notificationId",
    Component: NotificationDetail,
  },
  {
    path: "/app/npk-calibration",
    Component: NPKCalibration,
  },
  {
    path: "/app/water-report",
    Component: WaterUsageReport,
  },
  {
    path: "/app/nutrient-report",
    Component: NutrientReport,
  },
  {
    path: "/app/npk-history",
    Component: NPKHistory,
  },
  {
    path: "/app/add-video",
    Component: AddVideo,
  },
]);