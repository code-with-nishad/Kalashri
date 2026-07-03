import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ProtectedRoute, AdminRoute, PublicOnlyRoute } from "./ProtectedRoute";
import GlobalError from "../components/ui/GlobalError";

// Layouts
const MobileLayout = lazy(() => import("../components/layout/MobileLayout"));
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));

// Public Pages
const Home = lazy(() => import("../pages/public/Home"));
const Splash = lazy(() => import("../pages/public/Splash"));
const Onboarding = lazy(() => import("../pages/public/Onboarding"));
const CategoryScreen = lazy(() => import("../pages/public/CategoryScreen"));
const Fashion = lazy(() => import("../pages/public/Fashion"));
const NauvariSarees = lazy(() => import("../pages/public/NauvariSarees"));
const BlouseStitching = lazy(() => import("../pages/public/BlouseStitching"));
const Dresses = lazy(() => import("../pages/public/Dresses"));
const AariWork = lazy(() => import("../pages/public/AariWork"));
const Beauty = lazy(() => import("../pages/public/Beauty"));
const BeautyServiceDetails = lazy(() => import("../pages/public/BeautyServiceDetails"));
const Services = lazy(() => import("../pages/public/Services"));
const Gallery = lazy(() => import("../pages/public/Gallery"));
const About = lazy(() => import("../pages/public/About"));
const Contact = lazy(() => import("../pages/public/Contact"));
const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Offers = lazy(() => import("../pages/public/Offers"));

// Customer Pages
const BookAppointment = lazy(() => import("../pages/customer/BookAppointment"));
const MyAppointments = lazy(() => import("../pages/customer/MyAppointments"));
const AppointmentDetails = lazy(() => import("../pages/customer/AppointmentDetails"));
const NotificationsPage = lazy(() => import("../pages/customer/Notifications"));
const CustomerProfile = lazy(() => import("../pages/customer/Profile"));
const MyFashionOrders = lazy(() => import("../pages/customer/MyFashionOrders"));
const MyMeasurements = lazy(() => import("../pages/customer/MyMeasurements"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminCustomers = lazy(() => import("../pages/admin/Customers"));
const AdminCustomerDetails = lazy(() => import("../pages/admin/CustomerDetails"));
const AdminAppointments = lazy(() => import("../pages/admin/Appointments"));
const AdminServices = lazy(() => import("../pages/admin/Services"));
const AdminAnalytics = lazy(() => import("../pages/admin/Analytics"));
const AdminCMS = lazy(() => import("../pages/admin/CMS"));
const AdminNotifications = lazy(() => import("../pages/admin/Notifications"));
const AdminSettings = lazy(() => import("../pages/admin/Settings"));
const AdminFashionOrders = lazy(() => import("../pages/admin/FashionOrders"));
const AdminFashionOrderDetails = lazy(() => import("../pages/admin/FashionOrderDetails"));
const AdminMeasurements = lazy(() => import("../pages/admin/Measurements"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
    <div className="w-10 h-10 rounded-full border-2 border-[var(--color-rose-500)] border-t-transparent animate-spin" />
  </div>
);

const router = createBrowserRouter([
  // Public Routes
  {
    element: <Suspense fallback={<PageLoader />}><MobileLayout /></Suspense>,
    errorElement: <GlobalError />,
    children: [
      { path: "/", element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: "/categories", element: <Suspense fallback={<PageLoader />}><CategoryScreen /></Suspense> },
      { path: "/fashion", element: <Suspense fallback={<PageLoader />}><Fashion /></Suspense> },
      { path: "/fashion/nauvari", element: <Suspense fallback={<PageLoader />}><NauvariSarees /></Suspense> },
      { path: "/fashion/blouse", element: <Suspense fallback={<PageLoader />}><BlouseStitching /></Suspense> },
      { path: "/fashion/dresses", element: <Suspense fallback={<PageLoader />}><Dresses /></Suspense> },
      { path: "/fashion/aari", element: <Suspense fallback={<PageLoader />}><AariWork /></Suspense> },
      { path: "/beauty", element: <Suspense fallback={<PageLoader />}><Beauty /></Suspense> },
      { path: "/beauty/details", element: <Suspense fallback={<PageLoader />}><BeautyServiceDetails /></Suspense> },
      { path: "/services", element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: "/offers", element: <Suspense fallback={<PageLoader />}><Offers /></Suspense> },
      { path: "/gallery", element: <Suspense fallback={<PageLoader />}><Gallery /></Suspense> },
      { path: "/about", element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: "/contact", element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
    ],
  },
  // Public Only (redirect to dashboard if logged in)
  {
    element: <Suspense fallback={<PageLoader />}><PublicOnlyRoute /></Suspense>,
    errorElement: <GlobalError />,
    children: [
      { path: "/splash", element: <Suspense fallback={<PageLoader />}><Splash /></Suspense> },
      { path: "/onboarding", element: <Suspense fallback={<PageLoader />}><Onboarding /></Suspense> },
      { path: "/login", element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: "/register", element: <Suspense fallback={<PageLoader />}><Register /></Suspense> },
    ],
  },
  // Customer Protected
  {
    element: <Suspense fallback={<PageLoader />}><ProtectedRoute /></Suspense>,
    errorElement: <GlobalError />,
    children: [
      {
        element: <Suspense fallback={<PageLoader />}><MobileLayout /></Suspense>,
        children: [
          { path: "/dashboard", element: <Navigate to="/" replace /> },
          { path: "/book", element: <Suspense fallback={<PageLoader />}><BookAppointment /></Suspense> },
          { path: "/appointments", element: <Suspense fallback={<PageLoader />}><MyAppointments /></Suspense> },
          { path: "/appointments/:id", element: <Suspense fallback={<PageLoader />}><AppointmentDetails /></Suspense> },
          { path: "/notifications", element: <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense> },
          { path: "/profile", element: <Suspense fallback={<PageLoader />}><CustomerProfile /></Suspense> },
          { path: "/my-fashion-orders", element: <Suspense fallback={<PageLoader />}><MyFashionOrders /></Suspense> },
          { path: "/my-measurements", element: <Suspense fallback={<PageLoader />}><MyMeasurements /></Suspense> },
        ],
      },
    ],
  },
  // Admin Protected
  {
    element: <Suspense fallback={<PageLoader />}><AdminRoute /></Suspense>,
    errorElement: <GlobalError />,
    children: [
      {
        element: <Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>,
        children: [
          { path: "/admin", element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> },
          { path: "/admin/customers", element: <Suspense fallback={<PageLoader />}><AdminCustomers /></Suspense> },
          { path: "/admin/customers/:id", element: <Suspense fallback={<PageLoader />}><AdminCustomerDetails /></Suspense> },
          { path: "/admin/appointments", element: <Suspense fallback={<PageLoader />}><AdminAppointments /></Suspense> },
          { path: "/admin/services", element: <Suspense fallback={<PageLoader />}><AdminServices /></Suspense> },
          { path: "/admin/analytics", element: <Suspense fallback={<PageLoader />}><AdminAnalytics /></Suspense> },
          { path: "/admin/cms", element: <Suspense fallback={<PageLoader />}><AdminCMS /></Suspense> },
          { path: "/admin/notifications", element: <Suspense fallback={<PageLoader />}><AdminNotifications /></Suspense> },
          { path: "/admin/settings", element: <Suspense fallback={<PageLoader />}><AdminSettings /></Suspense> },
          { path: "/admin/fashion-orders", element: <Suspense fallback={<PageLoader />}><AdminFashionOrders /></Suspense> },
          { path: "/admin/fashion-orders/:id", element: <Suspense fallback={<PageLoader />}><AdminFashionOrderDetails /></Suspense> },
          { path: "/admin/measurements", element: <Suspense fallback={<PageLoader />}><AdminMeasurements /></Suspense> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
