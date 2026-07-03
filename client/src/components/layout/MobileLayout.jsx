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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111111]/95 backdrop-blur-xl border-t border-[#2A2A2A] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-50">
        <div className="max-w-md mx-auto flex items-center justify-between px-6 h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors",
                  isActive ? "text-[var(--color-gold)]" : "text-white/40 hover:text-white/80"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "text-[var(--color-gold)]")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
