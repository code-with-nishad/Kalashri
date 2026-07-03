import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Calendar, Package,
  BarChart3, Globe, Bell, Settings,
  Sparkles, ChevronLeft, ChevronRight, LogOut, Wrench,
  Menu, X, Plus, Grid, Scissors
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../utils";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../../hooks/useAuth";
import { getInitials } from "../../utils";
import { SALON_NAME } from "../../constants";

import { useNotifications } from "../../hooks/useNotifications";

const navGroups = [  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
      { icon: BarChart3, label: "Analytics", to: "/admin/analytics" },
    ],
  },
  {
    label: "Operations",
    items: [
      { icon: Users, label: "Customers", to: "/admin/customers" },
      { icon: Calendar, label: "Appointments", to: "/admin/appointments" },
      { icon: Package, label: "Fashion Orders", to: "/admin/fashion-orders" },
      { icon: Scissors, label: "Measurements", to: "/admin/measurements" },
      { icon: Wrench, label: "Services", to: "/admin/services" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Globe, label: "CMS", to: "/admin/cms" },
      { icon: Bell, label: "Notifications", to: "/admin/notifications" },
      { icon: Settings, label: "Settings", to: "/admin/settings" },
    ],
  },
];



export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();

  // Mount notification listener so toasts and cache invalidations run globally
  useNotifications();

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      
      {/* 📱 MOBILE HEADER (Sticky) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-surface-2)]/90 backdrop-blur-md z-40 flex items-center justify-between px-4 max-w-md mx-auto border-b border-[var(--color-border)]">
        {/* Left: Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-accent)] hover:bg-white/10 transition-colors border border-[var(--color-border)]"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Center: Logo */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <div className="w-6 h-6 rounded bg-[var(--color-accent)] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#12080a]" />
          </div>
          <span className="font-display font-black text-white tracking-tight text-lg leading-none">
            Kalashri
          </span>
        </div>

        {/* Right: Notifications */}
        <Link to="/admin/notifications" className="w-10 h-10 rounded-full bg-white/5 border border-[var(--color-border)] flex items-center justify-center text-white relative hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-accent)] text-[#12080a] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#1a0e11]">
            12
          </span>
        </Link>
      </div>

      {/* 📱 MOBILE SIDEBAR DRAWER (Slide in from left) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-[var(--color-surface-2)] z-50 shadow-2xl flex flex-col border-r border-[var(--color-border)]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[#12080a] font-bold">
                     {getInitials(user?.firstName, user?.lastName)}
                   </div>
                   <div>
                     <p className="font-bold text-white">{user?.firstName}</p>
                     <p className="text-xs text-[var(--color-accent)]">Administrator</p>
                   </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-white/50 border border-[var(--color-border)] hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Nav */}
              <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                {navGroups.map((group) => (
                  <div key={group.label} className="mb-4">
                    <p className="px-6 mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      {group.label}
                    </p>
                    {group.items.map((item) => {
                      const active = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 mx-4 mb-1 px-4 py-3 rounded-xl transition-all",
                            active
                              ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold"
                              : "text-white/60 font-medium hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <item.icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-[var(--color-accent)]" : "text-white/40")} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-3)]">
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 📱 MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-[#1a0e11]/80 backdrop-blur-[24px] border border-[rgba(212,175,55,0.12)] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] z-40 px-6 py-2 flex items-center justify-between max-w-md mx-auto h-[72px]">
        <Link to="/admin" className="flex flex-col items-center gap-1.5 transition-all w-12">
          <LayoutDashboard className={cn("w-5 h-5 transition-transform", location.pathname === "/admin" && "scale-110 text-[#d4af37]")} strokeWidth={2.2} color={location.pathname === "/admin" ? undefined : "#ffffff"} opacity={location.pathname === "/admin" ? 1 : 0.4} />
          <span className={cn("text-[9px] font-bold", location.pathname === "/admin" ? "text-[#d4af37]" : "text-white/40")}>Dashboard</span>
        </Link>
        <Link to="/admin/appointments" className="flex flex-col items-center gap-1.5 transition-all w-12">
          <Calendar className={cn("w-5 h-5 transition-transform", location.pathname.includes("/admin/appointments") && "scale-110 text-[#d4af37]")} strokeWidth={2.2} color={location.pathname.includes("/admin/appointments") ? undefined : "#ffffff"} opacity={location.pathname.includes("/admin/appointments") ? 1 : 0.4} />
          <span className={cn("text-[9px] font-bold", location.pathname.includes("/admin/appointments") ? "text-[#d4af37]" : "text-white/40")}>Booking</span>
        </Link>
        
        {/* Floating Center Action Button */}
        <div className="relative -top-5">
           <button 
             className="w-14 h-14 rounded-full bg-[var(--color-gradient-gold)] text-[#12080a] flex items-center justify-center shadow-lg shadow-[#d4af37]/40 border-4 border-[#12080a] active:scale-95 transition-transform"
           >
              <Plus className="w-6 h-6" strokeWidth={2.2} />
           </button>
        </div>

        <Link to="/admin/customers" className="flex flex-col items-center gap-1.5 transition-all w-12">
          <Users className={cn("w-5 h-5 transition-transform", location.pathname.includes("/admin/customers") && "scale-110 text-[#d4af37]")} strokeWidth={2.2} color={location.pathname.includes("/admin/customers") ? undefined : "#ffffff"} opacity={location.pathname.includes("/admin/customers") ? 1 : 0.4} />
          <span className={cn("text-[9px] font-bold", location.pathname.includes("/admin/customers") ? "text-[#d4af37]" : "text-white/40")}>Clients</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center gap-1.5 transition-all w-12">
          <Grid className="w-5 h-5 transition-transform text-white/40" strokeWidth={2.2} />
          <span className="text-[9px] font-bold text-white/40">Menu</span>
        </button>
      </div>

      {/* 💻 DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden md:flex fixed left-0 top-0 h-full z-30 flex-col bg-[var(--color-surface-2)] border-r border-[var(--color-border)] overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--color-border)] flex-shrink-0 bg-[var(--color-surface-3)]">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 border border-white/10">
            <Sparkles className="w-4 h-4 text-[#12080a]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-display font-bold text-sm text-[var(--color-text-primary)] whitespace-nowrap">Admin Panel</p>
                <p className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">{SALON_NAME}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Nav */}
        <nav className="flex-1 py-4 overflow-y-auto space-y-4 scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.label}>
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-5 mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              {group.items.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 mx-2 mb-0.5 px-3 py-2.5 rounded-xl transition-all",
                      active
                        ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30 font-bold"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={active ? 2.5 : 2.2} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-[var(--color-border)] p-3 flex-shrink-0 bg-[var(--color-surface-3)]">
          <div className={cn("flex items-center gap-3 rounded-xl p-2", collapsed && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-[#12080a] flex-shrink-0">
              {getInitials(user?.firstName, user?.lastName)}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-[var(--color-accent)] truncate">Administrator</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={logout}
            title={collapsed ? "Logout" : undefined}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 mt-1 rounded-xl text-white/50 hover:text-red-500 hover:bg-red-500/10 transition-all text-sm",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={2.2} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Logout</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-10 shadow-sm"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      <main
        className={cn(
          "flex-1 transition-all duration-300 overflow-x-hidden w-full md:w-auto mt-16 md:mt-0 mb-[90px] md:mb-0 max-w-md mx-auto md:max-w-none bg-[var(--color-surface)] min-h-screen",
          collapsed ? "md:ml-[72px]" : "md:ml-[260px]"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
