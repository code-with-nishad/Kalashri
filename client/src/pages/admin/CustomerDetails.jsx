import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Package, Scissors } from "lucide-react";
import { adminService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatDate, formatCurrency, getInitials } from "../../utils";
import { Badge } from "../../components/ui/Badge";

export default function CustomerDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.CUSTOMER(id), queryFn: () => adminService.getCustomer(id) });
  const details = data?.data;

  if (isLoading) return <div className="text-center py-20 text-[var(--color-text-muted)]">Loading...</div>;
  if (!details) return <div className="text-center py-20 text-[var(--color-text-muted)]">Customer not found</div>;

  const u = details.customer;
  const appointments = details.appointments || [];
  const fashionOrders = details.fashionOrders || [];
  const measurements = details.measurements || [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/customers" className="p-2 rounded-xl hover:bg-[var(--color-rose-500)]/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Customer Details</h1>
      </div>

      <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-rose-600)] to-purple-700 flex items-center justify-center text-[var(--color-text-primary)] text-xl font-bold">
            {getInitials(u.firstName, u.lastName)}
          </div>
          <div>
            <h2 className="font-display font-bold text-[var(--color-text-primary)] text-lg">{u.firstName} {u.lastName}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{u.email}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{u.phone || "--"}</p>
          </div>
        </div>
      </div>

      <HistorySection icon={Calendar} title="Appointment History" emptyText="No appointments">
        {appointments.slice(0, 8).map(a => (
          <div key={a._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
            <div>
              <p className="text-sm text-[var(--color-text-primary)]">{a.services?.map(s => s.serviceName).join(" + ")}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatDate(a.appointmentDate)} - {a.appointmentTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--color-rose-400)]">{formatCurrency(a.totalAmount)}</span>
              <Badge variant={a.status === "Completed" ? "info" : a.status === "Confirmed" ? "success" : a.status === "Cancelled" ? "error" : "warning"}>{a.status}</Badge>
            </div>
          </div>
        ))}
      </HistorySection>

      <HistorySection icon={Package} title="Fashion Orders" emptyText="No fashion orders">
        {fashionOrders.slice(0, 8).map(order => (
          <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
            <div>
              <p className="text-sm text-[var(--color-text-primary)]">{order.orderType || "Fashion Order"}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatDate(order.createdAt)}</p>
            </div>
            <span className="text-sm font-semibold text-[var(--color-rose-400)]">{formatCurrency(order.totalAmount)}</span>
          </div>
        ))}
      </HistorySection>

      <HistorySection icon={Scissors} title="Measurements" emptyText="No measurements">
        {measurements.slice(0, 8).map(profile => (
          <div key={profile._id} className="px-4 py-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-primary)]">{profile.profileName || "Measurement Profile"}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Updated {formatDate(profile.updatedAt)}</p>
          </div>
        ))}
      </HistorySection>
    </div>
  );
}

function HistorySection({ icon: Icon, title, emptyText, children }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div>
      <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 text-[var(--color-rose-400)]" /> {title}
      </h3>
      <div className="space-y-2">
        {hasItems ? children : <p className="text-[var(--color-text-muted)] text-sm">{emptyText}</p>}
      </div>
    </div>
  );
}
