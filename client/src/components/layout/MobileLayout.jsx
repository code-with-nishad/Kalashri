import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Calendar, Tag, User } from "lucide-react";
import { cn } from "../../utils";

export default function MobileLayout() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: Home, to: "/" },
    { label: "Bookings", icon: Calendar, to: "/appointments" },
    { label: "Offers", icon: Tag, to: "/offers" },
    { label: "Profile", icon: User, to: "/profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)] pb-16">
      {/* Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-[#1a0e11]/80 backdrop-blur-[24px] border border-[rgba(212,175,55,0.12)] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] z-50 overflow-hidden">
        <div className="max-w-md mx-auto flex items-center justify-between px-6 py-2 h-[72px]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 w-16 h-full transition-all duration-300",
                  isActive ? "text-[#d4af37]" : "text-white hover:text-white/80"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110")} strokeWidth={2.2} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
