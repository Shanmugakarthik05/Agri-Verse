import { Outlet, NavLink, useNavigate } from "react-router";
import { Droplets, Leaf, ScanLine, BookOpen, LayoutDashboard, Menu, Bell, Settings } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { VisuallyHidden } from "./ui/visually-hidden";

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard, end: true },
  { name: "Smart Irrigation", href: "/app/irrigation", icon: Droplets },
  { name: "Nutrients", href: "/app/nutrients", icon: Leaf },
  { name: "Disease AI", href: "/app/disease", icon: ScanLine },
  { name: "User Manual", href: "/app/manual", icon: BookOpen },
];

export function MainLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const NavItems = () => (
    <>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          end={item.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-green-50"
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-green-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-lg text-green-800">AgriVerse</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-green-300 relative"
              onClick={() => navigate("/app/notifications")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-green-300"
              onClick={() => navigate("/app/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-green-300">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-white">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Navigate to different sections of AgriVerse</SheetDescription>
                </VisuallyHidden>
                <div className="flex flex-col gap-2 pt-6">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen bg-white border-r border-green-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-xl text-green-800">AgriVerse</h1>
              <p className="text-xs text-green-600">Smart Agriculture</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2 mb-8">
            <NavItems />
          </nav>
          <div className="flex flex-col gap-2 pt-6 border-t border-green-200">
            <Button
              variant="outline"
              className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50 relative"
              onClick={() => navigate("/app/notifications")}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              <span className="absolute right-3 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50"
              onClick={() => navigate("/app/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}