import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services";
import { formatCurrency, formatPriceOrTbd, glowPointsFromAmount, isPriceSet } from "../../utils";
import { toast } from "sonner";
import { Check, X, Package, Clock, Sparkles } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";

export default function Orders() {
  const queryClient = useQueryClient();
  const [completeOrder, setCompleteOrder] = useState(null);
  const [orderPrice, setOrderPrice] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ADMIN_ORDERS"],
    queryFn: () => orderService.getAllOrders(),
  });

  const orders = data?.data || [];

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, totalAmount }) => orderService.updateStatus(id, { status, totalAmount }),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["ADMIN_ORDERS"]);
      setCompleteOrder(null);
      if (variables.status === "Completed") {
        toast.success("Order completed. Glow points awarded!");
      } else {
        toast.success(`Order marked as ${variables.status}`);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update order status");
    },
  });

  const openComplete = (order) => {
    setCompleteOrder(order);
    const suggested = order.product?.price ? order.product.price * order.quantity : "";
    setOrderPrice(order.totalAmount > 0 ? String(order.totalAmount) : suggested ? String(suggested) : "");
  };

  const submitComplete = () => {
    const totalAmount = Number(orderPrice) || 0;
    if (totalAmount <= 0) {
      toast.error("Please set the order price before completing");
      return;
    }
    updateStatusMutation.mutate({ id: completeOrder._id, status: "Completed", totalAmount });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Orders</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-rose-500)]/10 flex items-center justify-center">
          <Package className="w-5 h-5 text-[var(--color-rose-500)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Product Orders</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Set price on completion and award glow points</p>
        </div>
      </div>

      <div className="bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[var(--color-text-muted)]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-[var(--color-surface)]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[var(--color-text-primary)]">
                        {order.user?.firstName} {order.user?.lastName}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">{order.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(order.product?.imageUrl || order.product?.image) && (
                          <img
                            src={order.product.imageUrl || order.product.image}
                            alt={order.product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-white"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-[var(--color-text-primary)]">{order.product?.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">Qty: {order.quantity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-bold ${isPriceSet(order.totalAmount) ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}>
                        {formatPriceOrTbd(order.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={order.status === "Completed" ? "success" : order.status === "Cancelled" ? "danger" : "warning"}>
                        {order.status === "Pending" && <Clock className="w-3 h-3 mr-1 inline" />}
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {order.status === "Pending" && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openComplete(order)}
                            disabled={updateStatusMutation.isPending}
                            title="Set price & complete order"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatusMutation.mutate({ id: order._id, status: "Cancelled" })}
                            disabled={updateStatusMutation.isPending}
                            title="Cancel Order"
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!completeOrder} onClose={() => setCompleteOrder(null)} title="Complete Order">
        {completeOrder && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Set final price for <span className="text-[var(--color-text-primary)]">{completeOrder.product?.name}</span> (Qty: {completeOrder.quantity})
            </p>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Order Total (₹)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={orderPrice}
                onChange={(e) => setOrderPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-rose-500)] text-sm"
                placeholder="Enter final price"
              />
            </div>
            {Number(orderPrice) > 0 && (
              <p className="flex items-center gap-1.5 text-sm text-yellow-400 font-medium">
                <Sparkles className="w-4 h-4" />
                Customer will earn {glowPointsFromAmount(Number(orderPrice))} Glow Points
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setCompleteOrder(null)}
                className="flex-1 py-2.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={submitComplete}
                disabled={updateStatusMutation.isPending}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl disabled:opacity-50"
              >
                {updateStatusMutation.isPending ? "..." : "Complete Order"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
