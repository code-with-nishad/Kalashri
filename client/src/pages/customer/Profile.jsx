import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { ChevronRight, Calendar, ShoppingBag, MessageSquare, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { label: "My Bookings", icon: Calendar },
    { label: "My Orders", icon: ShoppingBag },
    { label: "My Enquiries", icon: MessageSquare },
    { label: "Address Book", icon: MapPin },
    { label: "Payment Methods", icon: CreditCard },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <MobileHeader title="My Profile" showBack />
      
      {/* Profile Header */}
      <div className="p-6 flex items-center gap-4 bg-[var(--color-primary-dark)] text-white pb-10 rounded-b-3xl">
        <div className="w-16 h-16 rounded-full bg-[var(--color-surface-card)]/10 flex items-center justify-center overflow-hidden border-2 border-white/20">
          <span className="text-2xl font-bold">{user?.firstName?.[0] || 'P'}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold font-display">{user?.firstName || 'Priya'} {user?.lastName || 'Sharma'}</h2>
          <p className="text-xs text-white/70">{user?.phone || '+91 98765 43210'}</p>
          <p className="text-xs text-white/70">{user?.email || 'priya@gmail.com'}</p>
        </div>
      </div>

      <div className="px-6 py-6 -mt-6 relative z-10">
        <div className="card-luxury overflow-hidden p-0">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <button key={i} className="w-full flex items-center justify-between p-4 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-3)] transition-colors">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                  <span className="text-sm font-medium text-white">{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
              </button>
            );
          })}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium text-red-500">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>
        
        <p className="text-center text-[10px] text-[var(--color-text-muted)] mt-6">App Version 1.0.0</p>
      </div>
    </div>
  );
}
