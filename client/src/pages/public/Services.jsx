import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { SkeletonCard } from "../../components/ui/Skeleton";
import MobileHeader from "../../components/layout/MobileHeader";
import { formatCurrency } from "../../utils";

export default function Services() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: serviceService.getAll,
  });
  
  const allServices = data?.data || [];

  // Group services by category
  const categories = allServices.reduce((acc, svc) => {
    const cat = svc.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});

  const categoryOrder = ["Nauvari Saree", "Blouse Stitching", "Dress Stitching", "Aari Work", "Beauty", "Other"];
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    let indexA = categoryOrder.indexOf(a);
    let indexB = categoryOrder.indexOf(b);
    if (indexA === -1) indexA = 99;
    if (indexB === -1) indexB = 99;
    return indexA - indexB;
  });

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 font-sans">
      <MobileHeader title="Pricing & Services" showBack />
      
      <div className="max-w-7xl mx-auto px-5 pt-8">
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase mb-2">Pricing Menu</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold text-white mb-4">Our Services</motion.h1>
          <p className="text-[var(--color-text-secondary)] text-sm max-w-xl mx-auto">Explore our premium beauty and fashion services tailored for your unique style.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="space-y-12">
            {sortedCategories.map(categoryName => {
              const categoryServices = categories[categoryName];
              if (!categoryServices || categoryServices.length === 0) return null;
              
              return (
                <div key={categoryName}>
                  <h2 className="text-xl font-display font-bold text-white mb-6 border-b border-[var(--color-border)] pb-2">{categoryName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categoryServices.map((svc, i) => (
                      <motion.div key={svc._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.04 }}
                        className="card-luxury p-0 flex flex-col group overflow-hidden border border-[var(--color-border)]"
                      >
                        <div className="relative h-40 overflow-hidden">
                          {svc.image ? (
                            <img src={svc.image} alt={svc.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=500&auto=format&fit=crop"; }} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full bg-[var(--color-surface-2)] flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-[var(--color-accent)]/30" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-[var(--color-surface-card)]/90 backdrop-blur px-3 py-1 rounded-full border border-[var(--color-border)]">
                            <span className="text-[var(--color-accent)] font-bold text-sm">{svc.displayPrice || formatCurrency(svc.price)}</span>
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-white text-lg mb-1">{svc.name}</h3>
                          <p className="text-xs text-[var(--color-text-secondary)] mb-4 flex-1 line-clamp-2">{svc.description || "Premium styling service."}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 font-medium bg-[var(--color-surface-2)] px-2 py-1 rounded-md">
                              <Clock className="w-3 h-3" />{svc.duration} min
                            </span>
                            <Link to={`/book`} className="text-xs font-semibold uppercase tracking-wider text-white hover:text-[var(--color-accent)] transition-colors">
                              Book Now &rarr;
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
