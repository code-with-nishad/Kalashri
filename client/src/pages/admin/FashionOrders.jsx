import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Eye, Edit, Trash2, Package } from "lucide-react";
import { fashionOrderService } from "../../services";
import { toast } from "sonner";
import { format } from "date-fns";
import { formatCurrency } from "../../utils";

export default function FashionOrders() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["FASHION_ORDERS"],
    queryFn: fashionOrderService.getAll
  });
  
  const orders = ordersData?.data || [];
  
  const filteredOrders = orders.filter(order => 
    order.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.dressType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Ready": return "bg-green-100 text-green-700";
      case "Delivered": return "bg-purple-100 text-purple-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading fashion orders...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fashion Orders</h1>
            <p className="text-sm text-gray-500">Manage stitching and boutique orders</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Order</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or dress type..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dress Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount Due</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                    No fashion orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.customer?.firstName} {order.customer?.lastName}</div>
                      <div className="text-xs text-gray-500">{order.customer?.phone || order.customer?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.dressType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{format(new Date(order.deliveryDate), 'MMM dd, yyyy')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-red-600">
                        {order.remainingAmount > 0 ? formatCurrency(order.remainingAmount) : "Paid"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/fashion-orders/${order._id}`} className="p-1.5 text-gray-400 hover:text-[var(--color-primary)] hover:bg-rose-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
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
