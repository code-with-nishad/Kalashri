import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User } from "lucide-react";
import { reviewService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";

export default function FloatingReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useQuery({
    queryKey: QUERY_KEYS.PUBLIC_REVIEWS,
    queryFn: reviewService.getPublicReviews,
  });

  const reviews = data?.data || [];

  // Cycle through reviews every 5 seconds
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto my-8 h-40 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReview._id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full px-6 py-5 rounded-3xl bg-[var(--color-surface-card)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden flex-shrink-0">
              {currentReview.customer?.avatar ? (
                <img
                  src={currentReview.customer.avatar}
                  alt={currentReview.customer.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-[var(--color-text-muted)]" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm text-[var(--color-text-primary)] leading-tight">
                {currentReview.customer?.firstName} {currentReview.customer?.lastName}
              </p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < currentReview.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm italic line-clamp-2">
            "{currentReview.reviewText}"
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
