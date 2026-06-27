import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { timeAgo } from "../../utils";
import { Bell, Trash2, CheckCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminNotifications() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.NOTIFICATIONS, queryFn: notificationService.getAll });
  const notifications = data?.data || [];
  const { mutate: markAll } = useMutation({ mutationFn: notificationService.markAllAsRead, onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS }) });
  const { mutate: del } = useMutation({ mutationFn: notificationService.delete, onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS }) });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Notifications</h1></div>
        <button onClick={() => markAll()} className="flex items-center gap-2 text-sm text-[var(--color-rose-400)] hover:underline"><CheckCheck className="w-4 h-4" /> Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n._id} className={`flex gap-3 p-4 rounded-2xl border ${n.isRead ? "bg-[var(--color-surface-card)] border-[var(--color-border)]" : "bg-[var(--color-rose-500)]/5 border-[var(--color-rose-500)]/20"}`}>
            <Bell className={`w-5 h-5 flex-shrink-0 mt-0.5 ${n.isRead ? "text-[var(--color-text-muted)]" : "text-[var(--color-rose-400)]"}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{n.title}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{n.message}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{timeAgo(n.createdAt)}</p>
            </div>
            <button onClick={() => del(n._id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-[var(--color-text-muted)] hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        {!isLoading && notifications.length === 0 && <div className="text-center py-10 text-[var(--color-text-muted)]">No notifications</div>}
      </div>
    </div>
  );
}
