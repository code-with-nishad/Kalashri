import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MobileHeader from "../../components/layout/MobileHeader";
import { appointmentService } from "../../services";
import { format } from "date-fns";
import { Sparkles, Scissors, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";

export default function MyAppointments() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  
  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["MY_APPOINTMENTS"],
    queryFn: appointmentService.getMyAppointments
  });

  const appointments = appointmentsData?.data || [];

  const filteredAppointments = appointments.filter(a => {
    if (activeTab === "Upcoming") return ["Pending", "Confirmed"].includes(a.status);
    if (activeTab === "Completed") return a.status === "Completed";
    if (activeTab === "Cancelled") return a.status === "Cancelled" || a.status === "Payment Failed";
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20";
      case "Confirmed": return "text-blue-400 bg-blue-500/10 border border-blue-500/20";
      case "Completed": return "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20";
      case "Cancelled": return "text-red-400 bg-red-500/10 border border-red-500/20";
      default: return "text-[var(--color-text-secondary)] bg-[var(--color-surface-3)] border border-[var(--color-border)]";
    }
  };

  const getCategoryIcon = (category) => {
    if (category === "Fashion") return <Scissors className="w-8 h-8 text-[var(--color-accent)]" />;
    return <Sparkles className="w-8 h-8 text-[var(--color-accent)]" />;
  };

  const getCategoryBg = (category) => {
    return "bg-[var(--color-surface-3)] border border-[var(--color-border)]";
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <MobileHeader title="My Bookings" showBack />
      
      {/* Tabs */}
      <div className="px-6 py-4 flex justify-between border-b border-[var(--color-border)] bg-[var(--color-primary-dark)] text-white">
        {["Upcoming", "Completed", "Cancelled"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-bold pb-1 transition-all ${activeTab === tab ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]" : "text-white/50 border-b-2 border-transparent hover:text-white/80"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-[var(--color-text-secondary)]">Loading your bookings...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="card-luxury p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-[var(--color-text-secondary)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No {activeTab} Bookings</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">You don't have any appointments in this category.</p>
            <Link to="/book" className="inline-flex px-6 py-3 btn-luxury-primary text-sm font-bold rounded-full">
              Book Appointment
            </Link>
          </div>
        ) : (
          filteredAppointments.map((appt) => (
            <div key={appt._id} className="card-luxury p-4 flex gap-4 items-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${getCategoryBg(appt.appointmentCategory)}`}>
                {getCategoryIcon(appt.appointmentCategory)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-bold text-white text-sm truncate">
                    {appt.services?.[0]?.serviceName || `${appt.appointmentCategory} Appointment`}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                  {format(new Date(appt.appointmentDate), "dd MMM yyyy")} • {appt.appointmentTime}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] font-medium text-[var(--color-text-muted)]">ID: #{appt._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm font-bold text-white">{formatCurrency(appt.totalAmount)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
