import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { appointmentService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatDate, formatPriceOrTbd, isPriceSet } from "../../utils";
import { Badge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";

export default function AppointmentDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.APPOINTMENT(id), queryFn: () => appointmentService.getOne(id) });
  const appointment = data?.data;

  if (isLoading) return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
  if (!appointment) return <div className="text-center py-20 text-[var(--color-text-muted)]">Appointment not found</div>;

  const isConfirmed = appointment.status === "Confirmed";
  const isCancelled = appointment.status === "Cancelled";
  const isCompleted = appointment.status === "Completed";
  const isPending = appointment.status === "Pending";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/appointments" className="p-2 rounded-xl hover:bg-[var(--color-rose-500)]/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Appointment Details</h1>
      </div>

      {/* Status Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 border text-center ${
          isConfirmed ? "bg-emerald-500/5 border-emerald-500/20" :
          isCancelled ? "bg-red-500/5 border-red-500/20" :
          isCompleted ? "bg-blue-500/5 border-blue-500/20" :
          "bg-yellow-500/5 border-yellow-500/20"
        }`}
      >
        {isConfirmed && <><CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" /><h2 className="font-display text-2xl font-bold text-emerald-400">Appointment Confirmed!</h2><p className="text-[var(--color-text-muted)] mt-1">See you on {formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}</p></>}
        {isCancelled && <><XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" /><h2 className="font-display text-2xl font-bold text-red-400">Appointment Rejected</h2>{appointment.suggestedTimeFrame && <p className="text-yellow-400 mt-2 text-sm">💡 Suggested time: {appointment.suggestedTimeFrame}</p>}<Link to="/book" className="mt-4 inline-block px-6 py-2.5 -white rounded-xl text-sm font-medium">Reschedule</Link></>}
        {isCompleted && isPriceSet(appointment.totalAmount) && <><CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" /><h2 className="font-display text-2xl font-bold text-blue-400">Visit Complete!</h2><p className="text-[var(--color-text-muted)] mt-1">Thank you for visiting us.</p></>}
        {isCompleted && !isPriceSet(appointment.totalAmount) && <><CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" /><h2 className="font-display text-2xl font-bold text-blue-400">Visit Complete!</h2></>}
        {isPending && <><AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" /><h2 className="font-display text-2xl font-bold text-yellow-400">Pending Approval</h2><p className="text-[var(--color-text-muted)] mt-1">Your request is being reviewed</p></>}
      </motion.div>

      {/* Details */}
      <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-6 space-y-5">
        <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}</span>
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">Services</p>
          {appointment.services?.map(s => (
            <div key={s.serviceName} className="flex justify-between py-2 border-b border-[var(--color-border)] last:border-0">
              <span className="text-[var(--color-text-primary)]">{s.serviceName}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration}min</span>
                {(isConfirmed || isCompleted) && isPriceSet(s.price) && (
                  <span className="font-medium text-[var(--color-rose-400)]">{formatPriceOrTbd(s.price)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {(isConfirmed || isCompleted) && isPriceSet(appointment.totalAmount) && (
          <div className="flex justify-between pt-2 font-semibold">
            <span className="text-[var(--color-text-primary)]">Total</span>
            <span className="text-[var(--color-rose-400)] text-lg">{formatPriceOrTbd(appointment.totalAmount)}</span>
          </div>
        )}
        {isPending && (
          <p className="text-sm text-[var(--color-text-muted)]">Pricing will be confirmed after your request is accepted.</p>
        )}
        {appointment.notes && <div><p className="text-xs text-[var(--color-text-muted)] mb-1">Notes</p><p className="text-sm text-[var(--color-text-secondary)]">{appointment.notes}</p></div>}
        <div className="flex items-center gap-2">
          <p className="text-xs text-[var(--color-text-muted)]">Payment:</p>
          <Badge variant={appointment.paymentStatus === "Paid" ? "success" : "warning"}>{appointment.paymentStatus}</Badge>
          {appointment.paymentMethod && <span className="text-xs text-[var(--color-text-muted)]">via {appointment.paymentMethod}</span>}
        </div>
      </div>
    </div>
  );
}
