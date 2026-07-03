import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import MobileHeader from "../../components/layout/MobileHeader";
import { Check, Calendar as CalendarIcon, Clock, Sparkles, Scissors, ChevronLeft } from "lucide-react";
import { serviceService, appointmentService } from "../../services";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import { formatCurrency } from "../../utils";

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(s => s.user);
  
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Beauty");
  const [subCategory, setSubCategory] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [time, setTime] = useState("10:00 AM");
  const [notes, setNotes] = useState("");

  const steps = ["Business", "Service", "Date & Time", "Confirm"];

  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["SERVICES"],
    queryFn: serviceService.getAll
  });

  const allServices = servicesData?.data || [];
  
  // Parse query params for direct links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catQuery = params.get("category");
    if (catQuery) {
      setCategory("Fashion");
      if (catQuery === "Nauvari") setSubCategory("Nauvari Saree");
      else if (catQuery === "Blouse") setSubCategory("Blouse Stitching");
      else if (catQuery === "Dress") setSubCategory("Dress Stitching");
      else if (catQuery === "Aari") setSubCategory("Aari Work");
      setStep(2);
    }
  }, [location]);

  const filteredServices = useMemo(() => {
    if(category === "Beauty") {
      return allServices.filter(s => s.category !== "Fashion" && s.category !== "Nauvari Saree" && s.category !== "Blouse Stitching" && s.category !== "Dress Stitching" && s.category !== "Aari Work" && s.category !== "Stitching");
    } else {
      if (subCategory) {
        return allServices.filter(s => s.category === subCategory);
      }
      return [];
    }
  }, [allServices, category, subCategory]);

  const selectedService = allServices.find(s => s._id === selectedServiceId);

  const createAppointment = useMutation({
    mutationFn: appointmentService.book,
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to book appointment");
    }
  });

  const handleNext = () => {
    if (step === 2 && !selectedServiceId) {
      toast.error("Please select a service");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    const payload = {
      serviceIds: selectedServiceId === "custom" ? [] : [selectedService._id],
      customServices: selectedServiceId === "custom" ? ["General Consultation"] : [],
      appointmentDate: date,
      appointmentTime: time,
      notes: notes
    };

    createAppointment.mutate(payload);
  };

  const availableTimes = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col pb-40 font-sans">
      <MobileHeader title="Book Appointment" showBack className="bg-[var(--color-primary-dark)]" />
      
      {/* Stepper */}
      <div className="bg-[var(--color-primary-dark)] px-6 pt-4 pb-12 relative -mt-1">
        <div className="flex justify-between relative z-10">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${i + 1 < step ? "bg-[var(--color-accent)] text-white" : i + 1 === step ? "bg-[var(--color-surface-card)] text-[var(--color-primary-dark)]" : "bg-[var(--color-surface-card)]/20 text-white"}`}>
                {i + 1 < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={`text-[10px] ${i + 1 <= step ? "text-white font-medium" : "text-white/50"}`}>{s}</span>
            </div>
          ))}
          {/* Connecting Line */}
          <div className="absolute top-3 left-[10%] right-[10%] h-0.5 bg-[var(--color-surface-card)]/20 -z-10" />
          <div 
            className="absolute top-3 left-[10%] h-0.5 bg-[var(--color-accent)] -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 80}%` }}
          />
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] rounded-t-3xl -mt-6 p-6 flex-1 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-20">
        
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-display font-bold text-white mb-6">What are you looking for today?</h2>
            
            <div 
              onClick={() => { setCategory("Beauty"); setSubCategory(""); setStep(2); setSelectedServiceId(""); }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${category === "Beauty" ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30 card-luxury"}`}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Beauty Salon</h3>
              <p className="text-sm text-white/60 mt-1">Bridal makeup, hair styling, facials, and beauty treatments.</p>
            </div>

            <div 
              onClick={() => { setCategory("Fashion"); setSubCategory(""); setStep(2); setSelectedServiceId(""); }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${category === "Fashion" ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30 card-luxury"}`}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center mb-4">
                <Scissors className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-bold text-white">Fashion Studio</h3>
              <p className="text-sm text-white/60 mt-1">Stitching consultations, Nauvari sarees, and custom dress fittings.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-display font-bold text-white mb-2">Select a Service</h2>
            
            {category === "Fashion" && !subCategory ? (
              <div>
                <p className="text-sm text-white/60 mb-6">Select a fashion category</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Nauvari Saree", "Blouse Stitching", "Dress Stitching", "Aari Work"].map(sub => (
                    <div 
                      key={sub}
                      onClick={() => setSubCategory(sub)}
                      className="p-4 rounded-xl border border-[var(--color-border)] cursor-pointer card-luxury hover:border-[var(--color-accent)]/50 text-center"
                    >
                      <h3 className="font-bold text-white text-sm">{sub}</h3>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-6 text-sm text-[var(--color-accent)] flex items-center gap-1"><ChevronLeft className="w-4 h-4"/> Back to main categories</button>
              </div>
            ) : (
              <div>
                {category === "Fashion" && (
                   <button onClick={() => setSubCategory("")} className="mb-4 text-sm text-[var(--color-accent)] flex items-center gap-1"><ChevronLeft className="w-4 h-4"/> Back to Fashion categories</button>
                )}
                
                {isLoading ? (
                  <div className="text-center py-8 text-white/60">Loading services...</div>
                ) : filteredServices.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/60 mb-4">No specific services found.</p>
                    <div 
                      onClick={() => setSelectedServiceId("custom")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedServiceId === "custom" ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border)] card-luxury"}`}
                    >
                      <h3 className="font-bold text-white">General Consultation</h3>
                      <p className="text-sm text-white/60">Book an open appointment to discuss your needs.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredServices.map(svc => (
                      <div 
                        key={svc._id}
                        onClick={() => setSelectedServiceId(svc._id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedServiceId === svc._id ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30 card-luxury"}`}
                      >
                        <div>
                          <h3 className="font-bold text-white">{svc.name}</h3>
                          <p className="text-xs text-white/50 flex items-center gap-1 mt-1"><Clock className="w-3 h-3"/> {svc.duration} mins</p>
                        </div>
                        <div className="text-[var(--color-accent)] font-bold text-sm bg-[var(--color-surface-2)] px-3 py-1 rounded-full border border-[var(--color-border)]">
                          {svc.displayPrice || formatCurrency(svc.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-display font-bold text-white mb-6">Choose Date & Time</h2>
            
            <div>
              <label className="block text-xs text-[var(--color-text-secondary)] font-medium mb-2 uppercase tracking-wider">Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] bg-[var(--color-surface-3)]/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[var(--color-text-secondary)] font-medium mb-3 uppercase tracking-wider">Available Slots</label>
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-2 px-1 rounded-xl text-sm font-semibold border transition-colors ${time === t ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-primary-dark)]" : "border-[var(--color-border)] text-white/80 hover:border-[var(--color-accent)]/50 card-luxury"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[var(--color-text-secondary)] font-medium mb-2 uppercase tracking-wider">Any specific requests?</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. I need a trial, or I'm bringing reference photos..."
                className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] bg-[var(--color-surface-3)]/50 backdrop-blur-sm min-h-[100px] text-sm"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-[var(--color-accent)]/20 border border-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[var(--color-accent)]/10">
              <Check className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white text-center">Ready to Confirm</h2>
            
            <div className="card-luxury p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
                <span className="text-sm text-[var(--color-text-secondary)]">Business</span>
                <span className="font-bold text-white">{category} {subCategory && `(${subCategory})`}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
                <span className="text-sm text-[var(--color-text-secondary)]">Service</span>
                <span className="font-bold text-white text-right max-w-[60%]">{selectedService?.name || "General Consultation"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
                <span className="text-sm text-[var(--color-text-secondary)]">Date</span>
                <span className="font-bold text-white">{format(new Date(date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-secondary)]">Time</span>
                <span className="font-bold text-[var(--color-accent)]">{time}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="fixed bottom-16 left-0 right-0 p-6 bg-[var(--color-surface)] max-w-md mx-auto z-40 flex gap-3 border-t border-[var(--color-border)] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            disabled={createAppointment.isPending}
            className="w-1/3 py-4 card-luxury text-white rounded-xl font-bold text-sm transition-colors border border-[var(--color-border)] hover:bg-[var(--color-surface-3)]"
          >
            Back
          </button>
        )}
        <button 
          onClick={handleNext}
          disabled={createAppointment.isPending || (step === 2 && category === "Fashion" && !subCategory)}
          className={`flex-1 py-4 btn-luxury-primary text-sm flex items-center justify-center gap-2 ${step === 2 && category === "Fashion" && !subCategory ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {createAppointment.isPending ? "Processing..." : step === 4 ? "Confirm Booking" : "Next Step"}
        </button>
      </div>
    </div>
  );
}
