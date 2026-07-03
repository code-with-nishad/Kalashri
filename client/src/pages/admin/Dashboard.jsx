import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users, Calendar, DollarSign, Package, Scissors, Send, BarChart2, Phone,
} from "lucide-react";
import { adminService, appointmentService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatCurrency } from "../../utils";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import BroadcastAlertModal from "../../components/admin/BroadcastAlertModal";
import { useAuthStore } from "../../store/authStore";

export default function AdminDashboard() {
  const { data: dashData, isLoading } = useQuery({ queryKey: QUERY_KEYS.DASHBOARD_STATS, queryFn: adminService.getDashboard });
  const { data: apptData } = useQuery({ queryKey: ["ADMIN_APPOINTMENTS"], queryFn: appointmentService.getAll });
  const user = useAuthStore(s => s.user);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const stats = dashData?.data;
  const appointments = apptData?.data?.slice(0, 3) || [];

  const quickActions = [
    { icon: Calendar, label: "Appointments", color: "text-pink-500", bg: "bg-pink-50", to: "/admin/appointments" },
    { icon: Package, label: "Fashion Orders", color: "text-amber-500", bg: "bg-amber-50", to: "/admin/fashion-orders" },
    { icon: Scissors, label: "Measurements", color: "text-purple-500", bg: "bg-purple-50", to: "/admin/measurements" },
    { icon: Users, label: "Customers", color: "text-indigo-500", bg: "bg-indigo-50", to: "/admin/customers" },
    { icon: Send, label: "Notification", color: "text-[var(--color-text-primary)]", bg: "bg-[var(--color-surface-3)]", onClick: () => setIsBroadcastModalOpen(true) },
    { icon: BarChart2, label: "Reports", color: "text-emerald-500", bg: "bg-emerald-50", to: "/admin/analytics" },
  ];

  if (isLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 pb-6 max-w-md mx-auto md:max-w-none md:p-6 bg-[var(--color-surface)] min-h-screen">
      <div className="bg-[var(--color-surface-3)] rounded-3xl p-5 relative overflow-hidden shadow-sm border border-[var(--color-border)]">
        <div className="relative z-10 w-2/3">
          <h2 className="text-xl font-display font-black text-white leading-tight">
            Good Morning, {user?.firstName}
          </h2>
          <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 max-w-[160px]">
            Your fashion and beauty operations at a glance.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/4">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--color-surface-3)] md:hidden z-10" />
          <img src="/hero-girl.png" alt="" className="h-full w-full object-cover object-left opacity-60 mix-blend-lighten" />
        </div>
      </div>

      <BroadcastAlertModal isOpen={isBroadcastModalOpen} onClose={() => setIsBroadcastModalOpen(false)} />

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={DollarSign} label="Today's Revenue" value={formatCurrency(stats?.todayRevenue || 0)} />
        <StatCard icon={Calendar} label="Appointments" value={stats?.totalAppointments || 0} />
        <StatCard icon={Package} label="Fashion Orders" value={stats?.totalFashionOrders || 0} />
        <StatCard icon={Users} label="Customers" value={stats?.totalCustomers || 0} />
      </div>

      <div className="card-luxury p-4 pb-6 relative mt-4">
        <div className="inline-block bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[9px] font-bold px-2 py-0.5 rounded-full mb-3 absolute -top-2 left-4">
          Quick Actions
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-4 pt-2">
          {quickActions.map((action, i) => action.to ? (
            <Link key={i} to={action.to} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
              <QuickIcon action={action} />
            </Link>
          ) : (
            <button key={i} onClick={action.onClick} className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
              <QuickIcon action={action} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-display font-bold text-white text-sm">Business Insights</h3>
        </div>
        <div className="card-luxury h-[180px] flex flex-col relative overflow-hidden p-4">
          <h4 className="text-[10px] font-bold text-[var(--color-text-secondary)]">Monthly Revenue</h4>
          <p className="text-lg font-black text-white leading-tight">{formatCurrency(stats?.monthlyRevenue || 0)}</p>
          <div className="absolute -bottom-2 -left-4 -right-4 h-[110px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueChart?.length ? stats.revenueChart : [
                { _id: "Week 1", totalRevenue: 4000 },
                { _id: "Week 2", totalRevenue: 3000 },
                { _id: "Week 3", totalRevenue: 7000 },
                { _id: "Week 4", totalRevenue: 6000 },
              ]}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ fontSize: "10px", backgroundColor: "#241a18", borderColor: "#3d2b28", color: "#fff" }} />
                <Area type="monotone" dataKey="totalRevenue" stroke="#d4af37" strokeWidth={2} fill="url(#goldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-display font-bold text-white text-sm">Today's Appointments</h3>
          <Link to="/admin/appointments" className="text-[10px] font-bold text-[var(--color-accent)]">View All</Link>
        </div>
        <div className="space-y-3">
          {appointments.length > 0 ? appointments.map((appt, i) => (
            <AppointmentRow key={appt._id || i} appt={appt} />
          )) : (
            <div className="card-luxury text-center">
              <p className="text-[var(--color-text-secondary)] text-sm">No appointments scheduled for today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card-luxury flex flex-col items-start p-4">
      <div className="w-8 h-8 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-2">
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[10px] font-bold text-[var(--color-text-secondary)]">{label}</p>
      <h3 className="text-lg font-black text-white leading-tight my-0.5">{value}</h3>
    </div>
  );
}

function QuickIcon({ action }) {
  return (
    <>
      <div className={`w-10 h-10 rounded-2xl bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center shadow-sm`}>
        <action.icon className={`w-4 h-4 text-[var(--color-accent)]`} />
      </div>
      <span className="text-[8px] font-bold text-white text-center leading-tight px-0.5">{action.label}</span>
    </>
  );
}

function AppointmentRow({ appt }) {
  const timeString = appt.appointmentTime || "10:00 AM";
  const timeParts = timeString.split(" ");
  const serviceName = appt.services && appt.services.length > 0 ? appt.services[0].serviceName : "Service";

  return (
    <div className="card-luxury p-3 flex items-center gap-3">
      <div className="flex flex-col items-center justify-center min-w-[50px] border-r border-[var(--color-border)] pr-2">
        <span className="font-bold text-white text-xs">{timeParts[0] || timeString}</span>
        <span className="text-[9px] font-bold text-[var(--color-text-secondary)]">{timeParts[1] || ""}</span>
      </div>
      <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] overflow-hidden shrink-0">
        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${appt.customer?.firstName || "User"}`} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-white text-xs truncate">
          {appt.customer?.firstName} {appt.customer?.lastName}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-[var(--color-text-secondary)] truncate max-w-[100px] sm:max-w-none">{serviceName}</span>
          <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 border border-[var(--color-accent)]/20">
            {appt.status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-black text-white text-xs">{formatCurrency(appt.totalAmount || 0)}</span>
        <button className="w-8 h-8 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-accent)] flex items-center justify-center hover:bg-[var(--color-surface-card)] transition-colors">
          <Phone className="w-3 h-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
        </button>
      </div>
    </div>
  );
}
