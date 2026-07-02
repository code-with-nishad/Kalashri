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
      case "Pending": return "text-yellow-600 bg-yellow-50";
      case "Confirmed": return "text-blue-600 bg-blue-50";
      case "Completed": return "text-green-600 bg-green-50";
      case "Cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getCategoryIcon = (category) => {
    if (category === "Fashion") return <Scissors className="w-8 h-8 text-purple-500" />;
    return <Sparkles className="w-8 h-8 text-pink-500" />;
  };

  const getCategoryBg = (category) => {
    if (category === "Fashion") return "bg-purple-50";
    return "bg-pink-50";
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <MobileHeader title="My Bookings" showBack />
      
      {/* Tabs */}
      <div className="px-6 py-4 flex justify-between border-b border-gray-100 bg-[var(--color-primary-dark)] text-white">
        {["Upcoming", "Completed", "Cancelled"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-bold pb-1 transition-all ${activeTab === tab ? "border-b-2 border-white text-white" : "text-white/50 border-b-2 border-transparent"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading your bookings...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No {activeTab} Bookings</h3>
            <p className="text-sm text-gray-500 mb-6">You don't have any appointments in this category.</p>
            <Link to="/book" className="inline-flex px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-full hover:bg-[var(--color-primary-dark)] transition-colors">
              Book Appointment
            </Link>
          </div>
        ) : (
          filteredAppointments.map((appt) => (
            <div key={appt._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${getCategoryBg(appt.appointmentCategory)}`}>
                {getCategoryIcon(appt.appointmentCategory)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h3 className="font-bold text-gray-900 text-sm truncate">
                    {appt.services?.[0]?.serviceName || `${appt.appointmentCategory} Appointment`}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {format(new Date(appt.appointmentDate), "dd MMM yyyy")} • {appt.appointmentTime}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[10px] font-medium text-gray-400">ID: #{appt._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(appt.totalAmount)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
