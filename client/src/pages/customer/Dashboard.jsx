import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, ArrowRight, Bell, Gift, Trophy } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { appointmentService, notificationService, rewardService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatDate, formatCurrency, getMembershipColor } from "../../utils";
import { StatCard } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { APPOINTMENT_STATUSES } from "../../constants";

export default function CustomerDashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: apptData } = useQuery({ queryKey: QUERY_KEYS.MY_APPOINTMENTS, queryFn: appointmentService.getMyAppointments });
  const { data: notifData } = useQuery({ queryKey: QUERY_KEYS.NOTIFICATIONS, queryFn: notificationService.getAll });
  const { data: rewardsData } = useQuery({ queryKey: QUERY_KEYS.REWARDS, queryFn: rewardService.getAll });

  const appointments = apptData?.data || [];
  const notifications = notifData?.data || [];
  const rewards = rewardsData?.data || [];

  const upcoming = appointments.find(a => a.status === "Confirmed" || a.status === "Pending");
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
              Hello, {user?.firstName}! 👋
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">Welcome back to your beauty dashboard</p>
          </div>
          <Link to="/book" className="inline-flex items-center gap-2 px-6 py-3 -white font-medium rounded-xl transition-all hover:shadow-[var(--shadow-glow-rose)] hover:-translate-y-0.5">
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="Glow Points" value={user?.glowPoints || 0} sub="Current Balance" color="rose" />
        <StatCard icon={Calendar} label="Total Appointments" value={appointments.length} sub="All time" color="blue" />
        <StatCard icon={Bell} label="Notifications" value={unreadCount} sub="Unread" color="purple" />
        <StatCard icon={Gift} label="Rewards Available" value={rewards.length} sub="Eligible to redeem" color="gold" />
      </div>

      {/* Membership Card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden relative p-6 border border-[var(--color-border)]"
        style={{ background: `linear-gradient(135deg, var(--color-surface-card) 0%, rgba(${user?.membership === 'Gold' ? '251,191,36' : user?.membership === 'Platinum' ? '229,228,226' : user?.membership === 'Silver' ? '168,169,173' : '205,127,50'},0.08) 100%)` }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Membership Status</p>
            <h2 className="font-display text-3xl font-bold mt-1" style={{ color: getMembershipColor(user?.membership) }}>
              {user?.membership} Member
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Lifetime Points: <span className="text-[var(--color-text-primary)] font-semibold">{user?.lifetimeGlowPoints || 0}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-muted)]">Current Glow Points</p>
            <p className="font-display text-5xl font-bold text-gradient-rose">{user?.glowPoints || 0}</p>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Appointment */}
      {upcoming && (
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-4">Upcoming Appointment</h2>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {upcoming.services?.map((s) => (
                    <Badge key={s.serviceName} variant="ghost">{s.serviceName}</Badge>
                  ))}
                </div>
                <p className="text-[var(--color-text-muted)] text-sm">{formatDate(upcoming.appointmentDate)} at {upcoming.appointmentTime}</p>
                <p className="text-[var(--color-rose-400)] font-semibold mt-1">{formatCurrency(upcoming.totalAmount)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={upcoming.status === "Confirmed" ? "success" : "warning"}>{upcoming.status}</Badge>
                <Link to={`/appointments/${upcoming._id}`} className="text-sm text-[var(--color-rose-400)] hover:underline flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">Recent Notifications</h2>
            <Link to="/notifications" className="text-sm text-[var(--color-rose-400)] hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 3).map((n) => (
              <div key={n._id} className={`flex gap-3 p-4 rounded-xl border transition-all ${n.isRead ? "bg-[var(--color-surface-card)] border-[var(--color-border)]" : "bg-[var(--color-rose-500)]/5 border-[var(--color-rose-500)]/20"}`}>
                <Bell className="w-4 h-4 text-[var(--color-rose-400)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{n.title}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Appointments */}
      {appointments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">Recent Appointments</h2>
            <Link to="/appointments" className="text-sm text-[var(--color-rose-400)] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {appointments.slice(0, 3).map((a) => {
              const s = APPOINTMENT_STATUSES[a.status] || APPOINTMENT_STATUSES.Pending;
              return (
                <Link key={a._id} to={`/appointments/${a._id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-[var(--color-rose-500)]/30 transition-all"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{a.services?.map(s => s.serviceName).join(", ")}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{formatDate(a.appointmentDate)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--color-rose-400)]">{formatCurrency(a.totalAmount)}</span>
                    <Badge variant={a.status === "Completed" ? "info" : a.status === "Confirmed" ? "success" : a.status === "Cancelled" ? "error" : "warning"}>
                      {a.status}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
