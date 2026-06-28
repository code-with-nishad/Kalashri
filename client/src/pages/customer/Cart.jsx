import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle } from "lucide-react";
import { orderService } from "../../services";
import { Badge } from "../../components/ui/Badge";
import { formatDate, formatPriceOrTbd, isPriceSet } from "../../utils";

export default function Cart() {
  const { data, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: orderService.getMyOrders });
  const orders = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">My Cart</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Products you have reserved for pickup at the salon.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-[var(--color-text-muted)]">Loading reservations...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border)]">
            <ShoppingBag className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
            <p className="text-[var(--color-text-secondary)]">You haven't reserved any products yet.</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border)] p-5">
              <div className="flex justify-between items-start mb-4 border-b border-[var(--color-border)] pb-4">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] mt-0.5">{formatDate(order.createdAt)}</p>
                </div>
                <Badge variant={order.status === "completed" ? "success" : order.status === "cancelled" ? "error" : "warning"}>
                  {order.status === "pending" && <Clock className="w-3 h-3 mr-1 inline" />}
                  {order.status === "completed" && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {item.product?.imageUrl ? (
                         <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                         <div className="w-12 h-12 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center">
                           <ShoppingBag className="w-5 h-5 text-[var(--color-text-muted)]" />
                         </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.product?.name || "Deleted Product"}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    {isPriceSet(item.price) && (
                      <p className="text-sm font-bold text-[var(--color-text-primary)]">{formatPriceOrTbd(item.price * item.quantity)}</p>
                    )}
                  </div>
                ))}
              </div>
              {isPriceSet(order.totalAmount) && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                  <p className="text-sm text-[var(--color-text-muted)] font-medium">Total Amount</p>
                  <p className="text-lg font-bold text-gradient-rose">{formatPriceOrTbd(order.totalAmount)}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
