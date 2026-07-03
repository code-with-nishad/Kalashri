import api from "./api";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  googleLogin: (token) => api.post("/auth/google", { token }),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  updateMe: (data) => api.put("/auth/me", data),
};

export const serviceService = {
  getAll: () => api.get("/services"),
  getOne: (id) => api.get(`/services/${id}`),
  create: (data) => api.post("/services", data),
  createBulkServices: (data) => api.post("/services/bulk", { services: data }),
  parseBulkAI: (data) => api.post("/services/bulk-ai", data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

export const appointmentService = {
  book: (data) => api.post("/appointments", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
  getAll: () => api.get("/appointments"),
  getOne: (id) => api.get(`/appointments/${id}`),
  updateStatus: (id, data) => api.patch(`/appointments/${id}/status`, data),
  cancel: (id) => api.delete(`/appointments/${id}`),
};

export const notificationService = {
  getAll: () => api.get("/notifications"),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch("/notifications/read-all"),
  delete: (id) => api.delete(`/notifications/${id}`),
  broadcast: (data) => api.post("/notifications/broadcast", data),
};

export const cmsService = {
  getSettings: () => api.get("/cms/settings"),
  updateSettings: (data) => api.put("/cms/settings", data),
  getGallery: () => api.get("/cms/gallery"),
  createGallery: (data) => api.post("/cms/gallery", data),
  updateGallery: (id, data) => api.put(`/cms/gallery/${id}`, data),
  deleteGallery: (id) => api.delete(`/cms/gallery/${id}`),
  getOffers: () => api.get("/cms/offers"),
  createOffer: (data) => api.post("/cms/offers", data),
  updateOffer: (id, data) => api.put(`/cms/offers/${id}`, data),
  deleteOffer: (id) => api.delete(`/cms/offers/${id}`),
  getFAQs: () => api.get("/cms/faqs"),
  createFAQ: (data) => api.post("/cms/faqs", data),
  updateFAQ: (id, data) => api.put(`/cms/faqs/${id}`, data),
  deleteFAQ: (id) => api.delete(`/cms/faqs/${id}`),
  getTestimonials: () => api.get("/cms/testimonials"),
  createTestimonial: (data) => api.post("/cms/testimonials", data),
  updateTestimonial: (id, data) => api.put(`/cms/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/cms/testimonials/${id}`),
};

export const adminService = {
  register: (data) => api.post("/admin/register", data),
  getDashboard: () => api.get("/admin/dashboard"),
  getWidgets: () => api.get("/admin/dashboard/widgets"),
  getAnalytics: () => api.get("/admin/analytics"),
  getCustomers: (params) => api.get("/admin/customers", { params }),
  getCustomer: (id) => api.get(`/admin/customers/${id}`),
  updateNotes: (id, data) => api.patch(`/admin/customers/${id}/notes`, data),
};

export const paymentService = {
  createCheckout: (appointmentId) =>
    api.post(`/payments/create-checkout-session/${appointmentId}`),
};

export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
  },
};

export const reviewService = {
  create: (data) => api.post("/reviews", data),
  getPublicReviews: () => api.get("/reviews/public"),
  getMyReviews: () => api.get("/reviews/my-reviews"),
};

export const fashionOrderService = {
  create: (data) => api.post("/fashion-orders", data),
  getAll: () => api.get("/fashion-orders"),
  getById: (id) => api.get(`/fashion-orders/${id}`),
  update: (id, data) => api.put(`/fashion-orders/${id}`, data),
  delete: (id) => api.delete(`/fashion-orders/${id}`),
};

export const measurementService = {
  create: (data) => api.post("/measurements", data),
  getAll: () => api.get("/measurements"),
  getByCustomer: (customerId) => api.get(`/measurements/customer/${customerId}`),
  update: (id, data) => api.put(`/measurements/${id}`, data),
  delete: (id) => api.delete(`/measurements/${id}`),
};
