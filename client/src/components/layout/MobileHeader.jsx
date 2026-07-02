import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Search } from "lucide-react";
import { cn } from "../../utils";

export default function MobileHeader({ title, showBack = false, showNotification = false, showSearch = false, className }) {
  const navigate = useNavigate();

  return (
    <header className={cn("sticky top-0 z-40 bg-[var(--color-primary-dark)] text-white h-14 flex items-center px-4 shadow-md", className)}>
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-8" /> /* Spacer */
      )}

      <h1 className="flex-1 text-center font-display font-semibold text-lg tracking-wide">
        {title}
      </h1>

      <div className="flex items-center justify-end gap-1 w-16">
        {showSearch && (
          <button className="p-2 text-white hover:bg-white/10 rounded-full">
            <Search className="w-5 h-5" />
          </button>
        )}
        {showNotification && (
          <button className="p-2 text-white hover:bg-white/10 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border border-[var(--color-primary-dark)]" />
          </button>
        )}
        {!showSearch && !showNotification && <div className="w-8" />}
      </div>
    </header>
  );
}
