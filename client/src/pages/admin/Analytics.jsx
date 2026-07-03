import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatCurrency, getInitials } from "../../utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const CHART_STYLE = { background: "#1e1930", border: "1px solid #2d2547", borderRadius: 12, color: "#f8f4ff" };

export default function Analytics() {
  const { data } = useQuery({ queryKey: QUERY_KEYS.ANALYTICS, queryFn: adminService.getAnalytics });
  const stats = data?.data;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Analytics</h1><p className="text-[var(--color-text-muted)] text-sm">Deep insights into your salon performance</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats?.monthlyStats || []}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ff2d6b" stopOpacity={0.3} /><stop offset="95%" stopColor="#ff2d6b" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="_id" tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
              <Tooltip contentStyle={CHART_STYLE} formatter={v => formatCurrency(v)} />
              <Area type="monotone" dataKey="totalRevenue" stroke="#ff2d6b" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings */}
        <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats?.monthlyStats || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="_id" tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CHART_STYLE} />
              <Bar dataKey="totalAppointments" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Services */}
        {stats?.popularServices?.length > 0 && (
          <div className="lg:col-span-2 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Popular Services (All Time)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.popularServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#6b5f82", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="serviceName" type="category" tick={{ fill: "#a89bc2", fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                <Tooltip contentStyle={CHART_STYLE} />
                <Bar dataKey="count" fill="#ff2d6b" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Customers */}
        {stats?.topCustomers?.length > 0 && (
          <div className="lg:col-span-2 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
            <h2 className="font-semibold text-[var(--color-text-primary)] mb-4">Top Customers by Revenue</h2>
            <div className="space-y-2">
              {stats.topCustomers.slice(0, 5).map((c, i) => (
                <div key={c._id} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-surface-2)]">
                  <span className="w-7 text-center font-bold text-[var(--color-text-muted)] text-sm">#{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-rose-600)] to-purple-700 flex items-center justify-center text-[var(--color-text-primary)] text-xs font-bold">{getInitials(c.firstName, c.lastName)}</div>
                  <div className="flex-1"><p className="text-[var(--color-text-primary)] text-sm font-medium">{c.firstName} {c.lastName}</p><p className="text-xs text-[var(--color-text-muted)]">{c.appointmentsCount} appointments</p></div>
                  <p className="text-[var(--color-rose-400)] font-bold text-sm">{formatCurrency(c.totalRevenue)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
