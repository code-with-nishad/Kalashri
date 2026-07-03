import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, Trash2, Calendar, Tag } from "lucide-react";
import { notificationService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { timeAgo } from "../../utils";
import { toast } from "sonner";

const iconMap = {
  Appointment: Calendar,
  Offer: Tag,
  Birthday: Bell,
  System: Bell,
};

export default function Notifications() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.NOTIFICATIONS, queryFn: notificationService.getAll });
  const notifications = data?.data || [];

  const { mutate: markRead } = useMutation({ mutationFn: notificationService.markAsRead, onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS }) });
  const { mutate: markAll } = useMutation({ mutationFn: notificationService.markAllAsRead, onSuccess: () => { qc.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS }); toast.success("All marked as read"); } });
  const { mutate: del } = useMutation({ mutationFn: notificationService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS }) });

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Notifications</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">{notifications.filter(n => !n.isRead).length} unread</p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button onClick={() => markAll()} className="flex items-center gap-2 text-sm text-[var(--color-rose-400)] hover:underline">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>
      <div className="space-y-2">
        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-muted)]"><Bell className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>No notifications</p></div>
        )}
        {notifications.map((n, i) => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <motion.div key={n._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className={`flex gap-3 p-4 rounded-2xl border transition-all ${n.isRead ? "bg-[var(--color-surface-card)] border-[var(--color-border)]" : "bg-[var(--color-rose-500)]/5 border-[var(--color-rose-500)]/20"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.isRead ? "bg-[var(--color-surface-3)]" : "bg-[var(--color-rose-500)]/10"}`}>
                <Icon className={`w-5 h-5 ${n.isRead ? "text-[var(--color-text-muted)]" : "text-[var(--color-rose-400)]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--color-text-primary)] text-sm">{n.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{timeAgo(n.createdAt)}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!n.isRead && <button onClick={() => markRead(n._id)} className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-[var(--color-text-muted)] hover:text-emerald-400 transition-colors"><Check className="w-3.5 h-3.5" /></button>}
                <button onClick={() => del(n._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
