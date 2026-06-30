import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, CheckCircle, MessageSquareHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Modal } from "../ui/Modal";
import { reviewService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";

const QUICK_OPTIONS = [
  "Absolutely loved the service!",
  "Amazing experience, highly recommend!",
  "Best salon visit ever!",
];

export default function ReviewModal({ open, onClose, appointmentId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: (data) => reviewService.create(data),
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PUBLIC_REVIEWS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_REVIEWS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPOINTMENTS }); // Refetch appointments to update UI
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setRating(0);
        setReviewText("");
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review or select a quick option");
      return;
    }

    submitReview({
      appointmentId,
      rating,
      reviewText,
    });
  };

  return (
    <Modal open={open} onClose={() => !isPending && onClose()} title="Leave a Review">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Thank You!
            </h3>
            <p className="text-[var(--color-text-muted)] max-w-xs mx-auto">
              We appreciate you taking the time to share your experience with us.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Rating Stars */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-[var(--color-text-muted)]">How was your experience?</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? "fill-[var(--color-rose-500)] text-[var(--color-rose-500)]"
                          : "text-[var(--color-border)]"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Options */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                <MessageSquareHeart className="w-4 h-4 text-[var(--color-rose-500)]" />
                Quick Select
              </p>
              <div className="flex flex-col gap-2">
                {QUICK_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setReviewText(option)}
                    className={`text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                      reviewText === option
                        ? "border-[var(--color-rose-500)] bg-[var(--color-rose-500)]/10 text-[var(--color-rose-500)]"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-rose-500)]/50 hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text Area */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                Or write your own
              </p>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you loved..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)] resize-none h-24"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isPending || rating === 0 || !reviewText.trim()}
              className="w-full py-3 bg-[var(--color-rose-500)] text-white rounded-xl font-medium hover:bg-[var(--color-rose-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Review"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
