import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Calendar, Star, Gift,
  ShoppingBag, Tag, Users, Crown,
  ArrowRight, Video, MessageCircle, Heart, ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { SALON_WHATSAPP, SALON_INSTAGRAM } from "../../constants";
import { serviceService, inventoryService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import ServicesSection from "../../components/home/ServicesSection";
import FeaturedProductsSection from "../../components/home/FeaturedProductsSection";
import AIConsultant from "../../components/ai/AIConsultant";

/* ─── Custom hook: fire once when element enters viewport ─── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Floating badge that sits on the hero image ─── */
const HeroBadge = ({ children, className = "", delay = 0 }) => (
  <div
    className={`absolute z-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 px-3 py-2 animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

/* ─── Quick-link card ─── */
const QuickLink = ({ icon: Icon, label, subtext, to, bg, fg }) => (
  <Link
    to={to}
    className="flex flex-col items-center p-3 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] active:scale-95 transition-transform snap-start min-w-[80px] shrink-0 select-none"
  >
    <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-2`}>
      <Icon className={`w-5 h-5 ${fg}`} />
    </div>
    <span className="text-[11px] font-bold text-[var(--color-text-primary)] leading-tight text-center">{label}</span>
    <span className="text-[9px] text-[var(--color-text-muted)] leading-tight text-center mt-0.5">{subtext}</span>
  </Link>
);

/* ─── Animated marquee strip ─── */
const MARQUEE_ITEMS = [
  "✨ 5-Star Rated Salon",
  "💄 Happy Clients",
  "🌸 Premium Beauty",
  "⭐ Book Today",
  "💅 Expert Stylists",
  "🎁 Loyalty Rewards",
];
const MarqueeStrip = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden bg-[var(--color-rose-500)] py-2 -mx-4">
      <div className="home-marquee flex gap-10 w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-white text-xs font-semibold shrink-0">{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ─── Section header with optional "See all" link ─── */
const SectionHeader = ({ title, accent, to, linkText = "See all" }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-display font-bold text-[var(--color-text-primary)]">
      {title} <span className="text-[var(--color-rose-500)]">{accent}</span>
    </h2>
    {to && (
      <Link to={to} className="text-xs font-semibold text-[var(--color-rose-500)] flex items-center gap-0.5 active:opacity-70">
        {linkText} <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    )}
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  /* mount flag drives hero entrance animation */
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  /* scroll-reveal refs for each section below the hero */
  const [quickRef, quickVis] = useScrollReveal();
  const [feedRef, feedVis] = useScrollReveal();
  const [promoRef, promoVis] = useScrollReveal();

  const bookLink = isAuthenticated
    ? (user?.role === "admin" ? "/admin" : "/customer")
    : "/register";

  const { data: servicesData } = useQuery({ queryKey: QUERY_KEYS.SERVICES, queryFn: serviceService.getAll });
  const { data: inventoryData } = useQuery({ queryKey: QUERY_KEYS.INVENTORY, queryFn: inventoryService.getAll });

  const quickLinks = [
    { icon: Calendar, label: "Book", subtext: "Appointment", to: bookLink, bg: "bg-rose-50", fg: "text-[var(--color-rose-500)]" },
    { icon: Sparkles, label: "Journey", subtext: "Progress", to: isAuthenticated ? "/customer/journey" : "/register", bg: "bg-purple-50", fg: "text-purple-500" },
    { icon: Video, label: "GlowFeed", subtext: "Community", to: "/feed", bg: "bg-pink-50", fg: "text-pink-500" },
    { icon: Crown, label: "Rewards", subtext: "Earn & Redeem", to: isAuthenticated ? "/customer/rewards" : "/register", bg: "bg-amber-50", fg: "text-amber-500" },
    { icon: ShoppingBag, label: "Shop", subtext: "Products", to: "/shop", bg: "bg-sky-50", fg: "text-sky-500" },
    { icon: Tag, label: "Offers", subtext: "Best Deals", to: "/offers", bg: "bg-emerald-50", fg: "text-emerald-500" },
    { icon: Gift, label: "Gift", subtext: "Cards", to: "/shop", bg: "bg-rose-50", fg: "text-[var(--color-rose-500)]" },
    { icon: Users, label: "Refer", subtext: "Invite Friends", to: isAuthenticated ? "/customer/rewards" : "/register", bg: "bg-violet-50", fg: "text-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-28 relative overflow-x-hidden">

      {/* ── ambient background blobs ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="home-blob-1" />
        <div className="home-blob-2" />
      </div>

      <main className="max-w-6xl mx-auto px-4 space-y-8 pt-4">

        {/* ════════════════════════════════════════════════════
            HERO
            mobile:  image on top  →  text below  (flex-col-reverse)
            desktop: text on left  ←  image right (md:flex-row)
        ════════════════════════════════════════════════════ */}
        <section
          className={`flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16
                      home-hero-enter ${mounted ? "home-hero-visible" : ""}`}
        >

          {/* ── Hero text ── */}
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Now accepting bookings
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-[var(--color-text-primary)]">
              Look Beautiful.<br />
              <span className="relative inline-block">
                <span className="text-[var(--color-rose-500)]">Feel Confident.</span>
                {/* underline accent */}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-rose-400 via-pink-300 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-[var(--color-text-muted)] text-sm md:text-base max-w-sm mx-auto md:mx-0 leading-relaxed">
              Your premium beauty destination. Book, earn rewards and shine every day.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 justify-center md:justify-start">
              <Link
                to="/register"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5
                           bg-[var(--color-rose-500)] text-white font-bold rounded-2xl
                           shadow-lg shadow-rose-500/30 active:scale-95 transition-transform text-sm"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="flex-1 md:flex-none flex items-center justify-center px-6 py-3.5
                           bg-white text-[var(--color-rose-600)] border border-[var(--color-rose-200)]
                           font-bold rounded-2xl active:scale-95 transition-transform text-sm"
              >
                Services
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-3 border-t border-[var(--color-border)]">
              <a
                href={SALON_INSTAGRAM} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-rose-50 rounded-xl border border-rose-100 active:scale-95 transition-transform"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-500 text-white flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-rose-900">Instagram</span>
              </a>
              <a
                href={`https://wa.me/${SALON_WHATSAPP}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 rounded-xl border border-emerald-100 active:scale-95 transition-transform"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-emerald-900">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ── Hero image (appears FIRST on mobile via flex-col-reverse) ── */}
          <div className="flex-1 relative w-full max-w-[320px] md:max-w-lg mx-auto">
            {/* soft glow halo behind the image */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-rose-200/70 to-pink-200/50 blur-3xl scale-110" aria-hidden />

            {/* image frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white/80 shadow-2xl aspect-[3/4] z-10">
              <img src="/hero-girl.png" alt="Gayatri Beauty Studio" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* rating badge */}
            <HeroBadge className="-left-3 top-1/4" delay={0}>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">4.9 / 5</div>
                  <div className="text-[9px] text-[var(--color-text-muted)]">Rating</div>
                </div>
              </div>
            </HeroBadge>

            {/* clients badge */}
            <HeroBadge className="-right-3 bottom-1/3" delay={1.2}>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">😊</div>
                  <div className="text-[9px] text-[var(--color-text-muted)]">Happy Clients</div>
                </div>
              </div>
            </HeroBadge>

            {/* bottom social-proof pill */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-lg border border-rose-100">
                <div className="flex -space-x-1.5">
                  {["from-rose-300 to-pink-400", "from-purple-300 to-indigo-400", "from-amber-300 to-orange-400"].map((g, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full bg-gradient-to-br ${g} border-[1.5px] border-white`} />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-[var(--color-text-primary)]">Loved by all</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              </div>
            </div>

            {/* floating sparkles */}
            <Sparkles className="absolute top-3 right-6 z-20 w-5 h-5 text-yellow-400 drop-shadow animate-float" style={{ animationDelay: "0.4s" }} aria-hidden />
            <Sparkles className="absolute top-16 -left-1 z-20 w-3.5 h-3.5 text-rose-400 drop-shadow animate-float" style={{ animationDelay: "1.7s" }} aria-hidden />
          </div>
        </section>

        {/* ── marquee ── */}
        <MarqueeStrip />

        {/* ════════════════════════════════════════════════════
            QUICK LINKS
        ════════════════════════════════════════════════════ */}
        <section
          ref={quickRef}
          className={`home-reveal ${quickVis ? "home-reveal-visible" : ""}`}
        >
          <SectionHeader title="Quick" accent="Access" />
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 -mx-1 px-1">
            {quickLinks.map((link) => (
              <QuickLink key={link.label} {...link} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            GLOWFEED BANNER
        ════════════════════════════════════════════════════ */}
        <section
          ref={feedRef}
          className={`home-reveal ${feedVis ? "home-reveal-visible" : ""}`}
        >
          <div className="home-glowfeed-card relative rounded-3xl p-5 flex flex-col md:flex-row items-center gap-4 overflow-hidden">
            {/* background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50" aria-hidden />
            <div className="absolute top-0 right-0 w-44 h-44 bg-pink-200/30 rounded-full blur-3xl" aria-hidden />

            <div className="relative z-10 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-200 rotate-3 shadow-inner">
                  <Video className="w-7 h-7" />
                </div>
                {/* yellow sparkle dot */}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-[var(--color-text-primary)] mb-0.5">Join the GlowFeed!</h3>
                <p className="text-xs text-[var(--color-text-muted)]">Discover trends & share your looks</p>
              </div>
            </div>

            <Link
              to="/feed"
              className="relative z-10 w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3
                         bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded-2xl
                         shadow-lg shadow-purple-500/25 active:scale-95 transition-transform"
            >
              Explore <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            SERVICES & PRODUCTS  (these sections have their own reveal)
        ════════════════════════════════════════════════════ */}
        <ServicesSection
          services={servicesData?.data || []}
          bookLink={bookLink}
          isAuthenticated={isAuthenticated}
        />
        <FeaturedProductsSection products={inventoryData?.data || []} />

        {/* ════════════════════════════════════════════════════
            PROMO BANNERS
        ════════════════════════════════════════════════════ */}
        <section
          ref={promoRef}
          className={`grid grid-cols-2 gap-3 home-reveal ${promoVis ? "home-reveal-visible" : ""}`}
        >
          {/* Loyalty */}
          <div className="bg-[#FFF4E6] border border-[#FFE8CC] rounded-2xl p-4 relative overflow-hidden min-h-[130px]">
            <h3 className="text-[#D97706] font-display font-bold text-sm mb-1">Loyalty Rewards</h3>
            <p className="text-[9px] text-[#92400E] mb-3 leading-snug">Earn points on every booking!</p>
            <Link
              to={isAuthenticated ? "/customer/rewards" : "/register"}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#D97706] text-[10px] font-bold rounded-xl shadow-sm active:scale-95 transition-transform"
            >
              Explore <ArrowRight className="w-2.5 h-2.5" />
            </Link>
            
          </div>

          {/* Beauty Journal */}
          <div className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-2xl p-4 relative overflow-hidden min-h-[130px]">
            <h3 className="text-[#7E22CE] font-display font-bold text-sm mb-1">Beauty Journal</h3>
            <p className="text-[9px] text-[#581C87] mb-3 leading-snug">Expert tips & beauty guides</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#7E22CE] text-[10px] font-bold rounded-xl shadow-sm active:scale-95 transition-transform"
            >
              Read Now <ArrowRight className="w-2.5 h-2.5" />
            </Link>
            
          </div>
        </section>

      </main>

      {/* Floating AI chat */}
      <AIConsultant />
    </div>
  );
}