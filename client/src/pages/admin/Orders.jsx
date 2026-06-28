import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services";
import { formatCurrency } from "../../utils";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, X, Package, Clock } from "lucide-react";
import { Badge } from "../../components/ui/Badge";

export default function Orders() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["ADMIN_ORDERS"],
    queryFn: () => orderService.getAllOrders(),
  });

  const orders = data?.data || [];

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => orderService.updateStatus(id, { status }),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["ADMIN_ORDERS"]);
      if (variables.status === "Completed") {
        toast.success("Order marked as completed. Glow points awarded!");
      } else {
        toast.success(`Order marked as ${variables.status}`);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update order status");
    },
  });

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
          <p className="text-sm text-[var(--color-text-muted)]">Manage customer product reservations</p>
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
                        {order.product?.image && (
                          <img src={order.product.image} alt={order.product.name} className="w-10 h-10 rounded-lg object-cover bg-white" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-[var(--color-text-primary)]">{order.product?.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">Qty: {order.quantity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Cancelled' ? 'danger' : 'warning'}>
                        {order.status === 'Pending' && <Clock className="w-3 h-3 mr-1 inline" />}
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {order.status === "Pending" && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => updateStatusMutation.mutate({ id: order._id, status: "Completed" })}
                            disabled={updateStatusMutation.isPending}
                            title="Complete Order & Award Points"
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
    </div>
  );
}
