import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Package, Calendar, Clock, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { fashionOrderService } from "../../services";
import { format } from "date-fns";
import { formatCurrency } from "../../utils";

export default function MyFashionOrders() {
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["MY_FASHION_ORDERS"],
    queryFn: fashionOrderService.getAll // Since backend filters by user when not admin
  });

  const orders = ordersData?.data || [];

  if (isLoading) return <div className="p-6">Loading your orders...</div>;

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "text-yellow-500 bg-yellow-50";
      case "In Progress": return "text-blue-500 bg-blue-50";
      case "Ready": return "text-green-500 bg-green-50";
      case "Delivered": return "text-purple-500 bg-purple-50";
      case "Cancelled": return "text-red-500 bg-red-50";
      default: return "text-[var(--color-text-secondary)] bg-[var(--color-surface-2)]";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "In Progress": return <Package className="w-4 h-4" />;
      case "Ready": return <CheckCircle2 className="w-4 h-4" />;
      case "Delivered": return <CheckCircle2 className="w-4 h-4" />;
      case "Cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">My Fashion Orders</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Track your custom tailoring orders</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-[var(--color-surface-card)] rounded-3xl p-8 text-center border border-[var(--color-border)] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Active Orders</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
              You don't have any custom tailoring or fashion orders in progress right now.
            </p>
            <Link to="/fashion" className="inline-flex px-6 py-3 bg-[var(--color-primary)] text-white font-bold rounded-full hover:bg-[var(--color-primary-dark)] transition-colors">
              Explore Fashion Services
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-[var(--color-surface-card)] rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{order.dressType}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Ordered on {format(new Date(order.orderDate), "MMM dd, yyyy")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{formatCurrency(order.advancePaid + order.remainingAmount)}</p>
                  <p className="text-xs text-red-500">{order.remainingAmount > 0 ? `Due: ${formatCurrency(order.remainingAmount)}` : 'Paid in full'}</p>
                </div>
              </div>
              
              <div className="p-5 bg-[var(--color-surface-2)]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">Expected Delivery: <span className="font-bold text-white">{format(new Date(order.deliveryDate), "MMM dd, yyyy")}</span></span>
                </div>
                
                <div className="w-full sm:w-1/2">
                  {order.timeline?.length > 0 && (
                    <div className="text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
                      <span className="font-medium text-white">Latest update:</span>
                      <span className="truncate">{order.timeline[order.timeline.length - 1].status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
