export const QUERY_KEYS = {
  // Auth
  ME: ["auth", "me"],

  // Public CMS
  SETTINGS: ["cms", "settings"],
  GALLERY: ["cms", "gallery"],
  OFFERS: ["cms", "offers"],
  FAQS: ["cms", "faqs"],
  TESTIMONIALS: ["cms", "testimonials"],

  // Services
  SERVICES: ["services"],
  SERVICE: (id) => ["services", id],

  // Appointments
  MY_APPOINTMENTS: ["appointments", "my"],
  ALL_APPOINTMENTS: ["appointments", "all"],
  APPOINTMENT: (id) => ["appointments", id],

  // Reviews
  PUBLIC_REVIEWS: ["reviews", "public"],
  MY_REVIEWS: ["reviews", "my"],

  // Notifications
  NOTIFICATIONS: ["notifications"],

  // Admin
  DASHBOARD_STATS: ["admin", "dashboard"],
  DASHBOARD_WIDGETS: ["admin", "widgets"],
  ANALYTICS: ["admin", "analytics"],
  CUSTOMERS: ["admin", "customers"],
  CUSTOMER: (id) => ["admin", "customers", id],

  // Admin CMS management
  ADMIN_GALLERY: ["admin", "cms", "gallery"],
  ADMIN_TESTIMONIALS: ["admin", "cms", "testimonials"],
};
