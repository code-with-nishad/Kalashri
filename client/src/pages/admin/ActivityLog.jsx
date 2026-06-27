import { useQuery } from "@tanstack/react-query";
import { activityService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { timeAgo } from "../../utils";
import { Activity } from "lucide-react";

export default function ActivityLog() {
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.ACTIVITIES, queryFn: activityService.getAll });
  const activities = data?.data || [];

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Activity Log</h1><p className="text-[var(--color-text-muted)] text-sm">Full audit trail of system events</p></div>
      <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5">
        {isLoading ? <div className="text-center py-10 text-[var(--color-text-muted)]">Loading...</div> : (
          <div className="relative border-l border-[var(--color-border)] ml-4 space-y-5">
            {activities.map((a, i) => (
              <div key={a._id} className="relative pl-6">
                <div className="absolute -left-2 top-1 w-4 h-4 rounded-full border-2 border-[var(--color-rose-600)] bg-[var(--color-surface)]" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text-primary)]">{a.description}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{a.performedBy?.firstName} {a.performedBy?.lastName}</p>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0 ml-4">{timeAgo(a.createdAt)}</span>
                </div>
              </div>
            ))}
            {activities.length === 0 && <div className="pl-6 text-[var(--color-text-muted)] text-sm">No activity yet</div>}
          </div>
        )}
      </div>
    </div>
  );
}
