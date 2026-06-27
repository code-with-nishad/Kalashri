import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, MessageCircle, Star, CheckCircle,
  ChevronDown, Clock, Award, Users, Shield, Play,
  ChevronLeft, ChevronRight, Plus, Minus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cmsService, serviceService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { SALON_NAME, SALON_TAGLINE, SALON_WHATSAPP, CURRENCY, GALLERY_CATEGORIES } from "../../constants";
import { formatCurrency } from "../../utils";

// ==================== HERO ====================
function HeroSection({ settings }) {
  const hero = settings?.hero || {};
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hero.image ? (
          <img src={hero.image} alt="Hero" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface-2)] to-purple-950/50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-[var(--color-surface)]" />
      </div>

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-rose-600)]/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--color-rose-500)]/30 text-[var(--color-rose-300)] text-sm font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Premium Beauty Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight"
        >
          {hero.title || (
            <>
              Beauty That{" "}
              <span className="text-gradient-rose">Glows</span>
              <br />From Within
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--color-text-secondary)] text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
        >
          {hero.subtitle || SALON_TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 -white font-semibold rounded-2xl text-base transition-all hover:shadow-[var(--shadow-glow-rose)] hover:-translate-y-0.5"
          >
            {hero.primaryButtonText || "Book Appointment"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={`https://wa.me/${SALON_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass border border-[var(--color-rose-500)]/20 text-[var(--color-text-primary)] font-semibold rounded-2xl text-base transition-all hover:border-[var(--color-rose-500)]/50 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
            WhatsApp Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-[var(--color-text-muted)] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ==================== STATS ====================
function StatsSection() {
  const stats = [
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Award, value: "10+", label: "Years Experience" },
    { icon: CheckCircle, value: "50+", label: "Services Offered" },
    { icon: Star, value: "4.9★", label: "Average Rating" },
  ];
  return (
    <section className="py-16 bg-[var(--color-surface-2)] border-y border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-rose-500)]/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-[var(--color-rose-400)]" />
              </div>
              <p className="font-display text-3xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== SERVICES ====================
function ServicesSection({ services = [] }) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3"
        >Our Services</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold text-[var(--color-text-primary)]"
        >
          Premium Beauty <span className="text-gradient-rose">Treatments</span>
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {(services.length ? services.slice(0, 8) : Array.from({ length: 4 })).map((svc, i) => (
          <motion.div
            key={svc?._id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="group rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5 hover:border-[var(--color-rose-500)]/40 hover:shadow-[var(--shadow-card-hover)] transition-all hover:-translate-y-1 cursor-pointer"
          >
            {svc?.image ? (
              <img src={svc.image} alt={svc.name} className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform" />
            ) : (
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[var(--color-rose-900)]/50 to-purple-900/30 mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[var(--color-rose-400)]/50" />
              </div>
            )}
            <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base mb-1">{svc?.name || "Loading..."}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-3 line-clamp-2">{svc?.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-rose-400)] font-bold">{svc ? formatCurrency(svc.price) : "—"}</span>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Clock className="w-3 h-3" /> {svc?.duration} min
              </span>
            </div>
            <Link
              to="/register"
              className="mt-3 w-full py-2 -white text-sm font-medium rounded-xl transition-all text-center block"
            >
              Book Now
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-[var(--color-rose-400)] hover:text-[var(--color-rose-300)] font-medium text-sm transition-colors">
          View All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ==================== WHY CHOOSE US ====================
function WhyUsSection() {
  const reasons = [
    { icon: Award, title: "Certified Professionals", desc: "All our staff are trained and certified beauty experts." },
    { icon: Shield, title: "Premium Products Only", desc: "We use only top-quality, skin-safe beauty products." },
    { icon: Users, title: "1000+ Happy Clients", desc: "A trusted name in beauty for over a decade." },
    { icon: Star, title: "Loyalty Rewards", desc: "Earn Glow Points on every visit and redeem for free services." },
  ];
  return (
    <section className="py-20 bg-[var(--color-surface-2)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">Why Us</p>
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">Why Choose <span className="text-gradient-rose">{SALON_NAME}?</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 p-5 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-rose-500)]/10 flex items-center justify-center flex-shrink-0">
                <r.icon className="w-6 h-6 text-[var(--color-rose-400)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{r.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== GALLERY PREVIEW ====================
function GallerySection({ gallery = [] }) {
  const items = gallery.length ? gallery.slice(0, 9) : [];
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">Our Work</p>
        <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">Beauty <span className="text-gradient-rose">Gallery</span></h2>
      </div>
      {items.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl skeleton" />
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-[var(--color-rose-400)] hover:text-[var(--color-rose-300)] font-medium text-sm transition-colors">
          View Full Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ==================== OFFERS ====================
function OffersSection({ offers = [] }) {
  if (!offers.length) return null;
  return (
    <section className="py-20 bg-[var(--color-surface-2)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">Special Deals</p>
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">Current <span className="text-gradient-gold">Offers</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer, i) => {
            const daysLeft = Math.max(0, Math.ceil((new Date(offer.endDate) - new Date()) / (1000 * 60 * 60 * 24)));
            return (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-[var(--color-surface-card)] border border-[var(--color-border)] hover:border-yellow-500/40 transition-all hover:-translate-y-1 group"
              >
                {offer.bannerImage && (
                  <img src={offer.bannerImage} alt={offer.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-bold">
                      {offer.discountText}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">{daysLeft}d left</span>
                  </div>
                  <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-lg mb-1">{offer.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{offer.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link to="/offers" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors">
            View All Offers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== TESTIMONIALS ====================
function TestimonialsSection({ testimonials = [] }) {
  const [idx, setIdx] = useState(0);
  const items = testimonials.length ? testimonials : [];
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  const t = items[idx];
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">Reviews</p>
        <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">What Clients <span className="text-gradient-rose">Say</span></h2>
      </div>
      <div className="relative">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed mb-6 italic">
            "{t.review}"
          </p>
          <div className="flex items-center justify-center gap-3">
            {t.customerImage ? (
              <img src={t.customerImage} alt={t.customerName} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-rose-500)]/30" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-rose-600)] to-purple-600 flex items-center justify-center text-[var(--color-text-primary)] font-bold">
                {t.customerName[0]}
              </div>
            )}
            <span className="font-semibold text-[var(--color-text-primary)]">{t.customerName}</span>
          </div>
        </motion.div>
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[var(--color-rose-500)]" : "bg-[var(--color-border)]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== FAQ ====================
function FAQSection({ faqs = [] }) {
  const [open, setOpen] = useState(null);
  if (!faqs.length) return null;
  return (
    <section className="py-20 bg-[var(--color-surface-2)]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">FAQs</p>
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">Frequently Asked <span className="text-gradient-rose">Questions</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === faq._id ? null : faq._id)}
                className="flex items-center justify-between w-full px-5 py-4 text-left"
              >
                <span className="font-medium text-[var(--color-text-primary)]">{faq.question}</span>
                {open === faq._id ? (
                  <Minus className="w-4 h-4 text-[var(--color-rose-400)] flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                )}
              </button>
              <motion.div
                animate={{ height: open === faq._id ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CONTACT ====================
function ContactSection({ settings }) {
  const contact = settings?.contact || {};
  const hours = settings?.businessHours || {};
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-[var(--color-rose-400)] text-sm font-semibold tracking-widest uppercase mb-3">Find Us</p>
        <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">Get In <span className="text-gradient-rose">Touch</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-6">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Contact Details</h3>
            <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
              {contact.phone && <p>📞 {contact.phone}</p>}
              {contact.email && <p>✉️ {contact.email}</p>}
              {contact.whatsapp && <p>💬 {contact.whatsapp}</p>}
              {contact.address && <p>📍 {contact.address}</p>}
            </div>
          </div>
          <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-6">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Business Hours</h3>
            <div className="space-y-2">
              {days.map((day) => {
                const h = hours[day];
                return h ? (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize text-[var(--color-text-secondary)]">{day}</span>
                    <span className={h.isOpen ? "text-emerald-400" : "text-red-400"}>
                      {h.isOpen ? `${h.openTime} – ${h.closeTime}` : "Closed"}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] h-80 lg:h-auto bg-[var(--color-surface-card)]">
          {contact.mapLink ? (
            <iframe
              src={contact.mapLink}
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Map"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
              <p>Map will appear here</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==================== MAIN HOME ====================
export default function Home() {
  const { data: settingsRes } = useQuery({
    queryKey: QUERY_KEYS.SETTINGS,
    queryFn: cmsService.getSettings,
  });
  const { data: servicesRes } = useQuery({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: serviceService.getAll,
  });
  const { data: galleryRes } = useQuery({
    queryKey: QUERY_KEYS.GALLERY,
    queryFn: cmsService.getGallery,
  });
  const { data: offersRes } = useQuery({
    queryKey: QUERY_KEYS.OFFERS,
    queryFn: cmsService.getOffers,
  });
  const { data: testimonialRes } = useQuery({
    queryKey: QUERY_KEYS.TESTIMONIALS,
    queryFn: cmsService.getTestimonials,
  });
  const { data: faqRes } = useQuery({
    queryKey: QUERY_KEYS.FAQS,
    queryFn: cmsService.getFAQs,
  });

  const settings = settingsRes?.data;
  const services = servicesRes?.data || [];
  const gallery = galleryRes?.data || [];
  const offers = offersRes?.data || [];
  const testimonials = testimonialRes?.data || [];
  const faqs = faqRes?.data || [];

  return (
    <div>
      <HeroSection settings={settings} />
      <StatsSection />
      <ServicesSection services={services} />
      <WhyUsSection />
      <GallerySection gallery={gallery} />
      <OffersSection offers={offers} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <ContactSection settings={settings} />

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${SALON_WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/30 transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-[var(--color-text-primary)]" />
      </a>
    </div>
  );
}
