export const SALON_NAME = "Gayatri Beauty Studio";
export const SALON_TAGLINE = "Your Beauty, Our Passion";
export const SALON_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || "918830383499";
export const SALON_INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/bharti_damale?igsh=YzljYTk1ODg3Zg==";
export const SALON_FACEBOOK = import.meta.env.VITE_FACEBOOK_URL || "#";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const GALLERY_CATEGORIES = [
  "Fashion", "Beauty", "Aari Work", "Bridal", "Traditional Wear",
  "Before & After", "Latest Work", "Facial", "Hair", "Hair Color",
  "Hair Spa", "Waxing", "Threading", "Skin", "Other",
];

export const APPOINTMENT_STATUSES = {
  Pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  Confirmed: { label: "Confirmed", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  Completed: { label: "Completed", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  Cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
};

export const NOTIFICATION_TYPES = {
  Appointment: { icon: "Calendar", color: "text-rose-400" },
  Offer: { icon: "Tag", color: "text-emerald-400" },
  Birthday: { icon: "Cake", color: "text-pink-400" },
  System: { icon: "Bell", color: "text-blue-400" },
};

export const CURRENCY = "Rs.";
