import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, DollarSign, Package, Gift, Activity } from "lucide-react";
import { adminService, activityService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { StatCard } from "../../components/ui/Card";
import { formatCurrency, timeAgo } from "../../utils";
import { SkeletonCard } from "../../components/ui/Skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const CHART_COLORS = ["#ff2d6b", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function AdminDashboard() {
  const { data: dashData, isLoading } = useQuery({ queryKey: QUERY_KEYS.DASHBOARD_STATS, queryFn: adminService.getDashboard });
  const { data: activityData } = useQuery({ queryKey: QUERY_KEYS.ACTIVITIES, queryFn: activityService.getAll });

  const stats = dashData?.data;
  const activities = activityData?.data?.slice(0, 8) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Admin Dashboard</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Real-time insights for Gayatri Beauty Studio</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) : [
          { icon: DollarSign, label: "Today's Revenue", value: formatCurrency(stats?.todayRevenue || 0), color: "rose" },
          { icon: TrendingUp, label: "Monthly Revenue", value: formatCurrency(stats?.monthlyRevenue || 0), color: "gold" },
          { icon: Calendar, label: "Total Appointments", value: stats?.totalAppointments || 0, color: "blue" },
          { icon: Users, label: "Total Customers", value: stats?.totalCustomers || 0, color: "emerald" },
        ].map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats?.revenueChart || []}>
              <defs>
                <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff2d6b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff2d6b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="_id" tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
              <Tooltip contentStyle={{ background: "#1e1930", border: "1px solid #2d2547", borderRadius: 12, color: "#f8f4ff" }} formatter={v => formatCurrency(v)} />
              <Area type="monotone" dataKey="totalRevenue" stroke="#ff2d6b" strokeWidth={2} fill="url(#roseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status Pie */}
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Appointments</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={stats?.appointmentsByStatus || []} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                {(stats?.appointmentsByStatus || []).map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e1930", border: "1px solid #2d2547", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {(stats?.appointmentsByStatus || []).map((item, i) => (
              <div key={item._id} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                {item._id}: {item.count}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Services */}
      {stats?.popularServices?.length > 0 && (
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Popular Services</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.popularServices} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="serviceName" type="category" tick={{ fill: "#a89bc2", fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip contentStyle={{ background: "#1e1930", border: "1px solid #2d2547", borderRadius: 12, color: "#f8f4ff" }} />
              <Bar dataKey="count" fill="#ff2d6b" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Activity Feed */}
      {activities.length > 0 && (
        <div>
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Recent Activity</h2>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-4 space-y-3">
            {activities.map((a, i) => (
              <div key={a._id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-rose-500)] flex-shrink-0 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text-primary)]">{a.description}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{timeAgo(a.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
