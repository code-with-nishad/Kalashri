import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle,
  Heart,
  MessageCircle,
  Palette,
  Ruler,
  Scissors,
  Sparkles,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { cmsService, serviceService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { SALON_NAME, SALON_TAGLINE, SALON_WHATSAPP } from "../../constants";

const focusAreas = [
  {
    icon: Scissors,
    title: "Fashion",
    text: "Blouse stitching, traditional wear support, custom alterations, Aari work, and fashion orders handled with clear measurements.",
    items: ["Stitching services", "Fashion orders", "Measurements", "Aari work"],
  },
  {
    icon: Sparkles,
    title: "Beauty Parlour",
    text: "Salon services, appointment booking, staff coordination, customer history, reminders, and follow-up communication.",
    items: ["Services", "Appointments", "Staff calendar", "Customer history"],
  },
  {
    icon: Heart,
    title: "Customer Care",
    text: "A simple customer experience for booking, viewing updates, browsing gallery work, checking offers, and contacting the team.",
    items: ["Gallery", "Offers", "Reviews", "WhatsApp contact"],
  },
];

const process = [
  { icon: Calendar, title: "Book", text: "Customers choose the right service slot or contact the studio directly." },
  { icon: Ruler, title: "Prepare", text: "The team records measurements, order notes, staff assignment, and visit history." },
  { icon: CheckCircle, title: "Complete", text: "Appointments and fashion orders move through clear statuses until delivery." },
];

export default function About() {
  const { data: settingsRes } = useQuery({ queryKey: QUERY_KEYS.SETTINGS, queryFn: cmsService.getSettings });
  const { data: servicesRes } = useQuery({ queryKey: QUERY_KEYS.SERVICES, queryFn: serviceService.getAll });
  const { data: galleryRes } = useQuery({ queryKey: QUERY_KEYS.GALLERY, queryFn: cmsService.getGallery });
  const { data: offersRes } = useQuery({ queryKey: QUERY_KEYS.OFFERS, queryFn: cmsService.getOffers });
  const { data: testimonialsRes } = useQuery({ queryKey: QUERY_KEYS.TESTIMONIALS, queryFn: cmsService.getTestimonials });

  const settings = settingsRes?.data || {};
  const services = servicesRes?.data || [];
  const gallery = galleryRes?.data || [];
  const offers = offersRes?.data || [];
  const testimonials = testimonialsRes?.data || [];

  const featuredServices = services.slice(0, 6);
  const featuredGallery = gallery.slice(0, 6);
  const featuredOffers = offers.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const bookLink = "/register";
  const whatsappUrl = `https://wa.me/${SALON_WHATSAPP}`;

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      <section className="relative min-h-[88vh] flex items-center">
        <img
          src={settings?.hero?.image || "/images/bharti-hero.jpg"}
          alt={`${SALON_NAME} fashion and beauty studio`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-white"
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-rose-100 mb-5">
              <Sparkles className="w-4 h-4" />
              Fashion and beauty studio
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              {SALON_NAME}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">
              {settings?.hero?.subtitle || SALON_TAGLINE}. A client-focused app for stitching, measurements, salon appointments, gallery work, offers, and customer care.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={bookLink}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-rose-500)] text-white font-bold hover:bg-[var(--color-rose-600)] transition-colors"
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 text-white font-bold border border-white/25 hover:bg-white/25 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-rose-500)] mb-3">What Kalashri manages</p>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-950">Built around the studio's actual work.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {focusAreas.map(({ icon: Icon, title, text, items }) => (
            <article key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <Icon className="w-8 h-8 text-[var(--color-rose-500)] mb-5" />
              <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{text}</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-200 mb-3">Workflow</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black mb-4">Simple operations for bookings and orders.</h2>
            <p className="text-white/70 leading-relaxed">
              The client version keeps the operational surface focused: customers, appointments, measurements, fashion orders, calendar views, notifications, reports, analytics, gallery, reviews, contact, and settings.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {process.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Icon className="w-7 h-7 text-rose-200 mb-4" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-rose-500)] mb-3">Services</p>
              <h2 className="font-display text-3xl sm:text-4xl font-black">Fashion and beauty services</h2>
            </div>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[var(--color-rose-600)]">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.map((service) => (
              <article key={service._id || service.name} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-5 h-5 text-[var(--color-rose-500)]" />
                  <h3 className="font-bold text-gray-950">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{service.description || "Available for booking at the studio."}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {featuredGallery.length > 0 && (
        <section className="bg-rose-50/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-rose-500)] mb-3">Gallery</p>
                <h2 className="font-display text-3xl sm:text-4xl font-black">Recent work</h2>
              </div>
              <Link to="/gallery" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[var(--color-rose-600)]">
                Open gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {featuredGallery.map((item) => (
                <article key={item._id || item.image} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                  <img src={item.image || item.url} alt={item.title || "Kalashri gallery work"} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <p className="text-sm font-bold flex items-center gap-2">
                      <Camera className="w-4 h-4" /> {item.title || item.category || "Gallery"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(featuredOffers.length > 0 || featuredTestimonials.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-rose-500)] mb-3">Offers</p>
            <h2 className="font-display text-3xl font-black mb-6">Current customer offers</h2>
            <div className="space-y-4">
              {featuredOffers.length === 0 && <p className="text-gray-600">Offers will appear here when published by the team.</p>}
              {featuredOffers.map((offer) => (
                <article key={offer._id || offer.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-rose-600)] mb-2">
                    <Tag className="w-4 h-4" /> Offer
                  </p>
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{offer.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-rose-500)] mb-3">Reviews</p>
            <h2 className="font-display text-3xl font-black mb-6">Customer feedback</h2>
            <div className="space-y-4">
              {featuredTestimonials.length === 0 && <p className="text-gray-600">Customer reviews will appear here when published.</p>}
              {featuredTestimonials.map((review) => (
                <article key={review._id || review.name} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{review.review || review.message || review.comment}"</p>
                  <p className="font-bold text-gray-950 mt-4">{review.customerName || review.name || "Customer"}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl bg-gray-950 text-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-rose-200 mb-3">
              <Users className="w-4 h-4" /> Ready to visit
            </p>
            <h2 className="font-display text-3xl font-black">Book a fashion or beauty appointment.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={bookLink} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-rose-500)] text-white font-bold hover:bg-[var(--color-rose-600)] transition-colors">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/15 text-white font-bold hover:bg-white/20 transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
