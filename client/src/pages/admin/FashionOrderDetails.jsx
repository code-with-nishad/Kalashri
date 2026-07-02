import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, Package, Calendar, DollarSign, Scissors, FileText, Plus, Trash2 } from "lucide-react";
import { fashionOrderService } from "../../services";
import { toast } from "sonner";
import { format } from "date-fns";
import { formatCurrency } from "../../utils";

export default function FashionOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orderData, isLoading } = useQuery({
    queryKey: ["FASHION_ORDER", id],
    queryFn: () => fashionOrderService.getById(id)
  });

  const updateOrder = useMutation({
    mutationFn: (data) => fashionOrderService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FASHION_ORDER", id] });
      toast.success("Order updated successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update order");
    }
  });

  const order = orderData?.data;

  if (isLoading) return <div className="p-6">Loading order details...</div>;
  if (!order) return <div className="p-6">Order not found.</div>;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateOrder.mutate({ 
      status: newStatus,
      $push: { timeline: { status: newStatus, note: "Status updated manually" } }
    });
  };

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

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h1>
          <p className="text-sm text-gray-500">Placed on {format(new Date(order.orderDate), "MMM dd, yyyy")}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <select 
            value={order.status}
            onChange={handleStatusChange}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border-0 outline-none cursor-pointer ${getStatusColor(order.status)}`}
            disabled={updateOrder.isPending}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[var(--color-primary)]" />
              Order Information
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dress Type</p>
                <p className="text-sm font-medium text-gray-900">{order.dressType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Delivery Date</p>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {format(new Date(order.deliveryDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            {order.notes && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Notes
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-purple-500" />
              Measurements
            </h2>
            {order.measurements ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['bust', 'waist', 'hip', 'shoulder', 'sleeve', 'length', 'neck', 'armhole'].map(key => (
                  order.measurements[key] ? (
                    <div key={key} className="p-3 bg-purple-50 rounded-xl">
                      <p className="text-[10px] uppercase font-bold text-purple-400">{key}</p>
                      <p className="text-lg font-black text-purple-700">{order.measurements[key]}"</p>
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No measurement profile linked to this order.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {order.timeline?.length > 0 ? order.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${idx === order.timeline.length - 1 ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`} />
                    {idx < order.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-bold text-gray-900">{event.status}</p>
                    <p className="text-xs text-gray-500">{format(new Date(event.date), "MMM dd, yyyy 'at' hh:mm a")}</p>
                    {event.note && <p className="text-sm text-gray-600 mt-1">{event.note}</p>}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500">No timeline events recorded.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Payment */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Details</h2>
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900">{order.customer?.firstName} {order.customer?.lastName}</p>
              <p className="text-sm text-gray-500">{order.customer?.phone}</p>
              <p className="text-sm text-gray-500">{order.customer?.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Advance Paid</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(order.advancePaid)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Remaining</span>
                <span className="text-sm font-bold text-red-600">{formatCurrency(order.remainingAmount)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-gray-900">Total Price</span>
                <span className="text-base font-black text-emerald-600">{formatCurrency(order.advancePaid + order.remainingAmount)}</span>
              </div>
            </div>
            {order.remainingAmount > 0 && (
              <button 
                onClick={() => {
                  const paid = prompt("Enter amount paid:");
                  if(paid && !isNaN(paid)) {
                    updateOrder.mutate({
                      advancePaid: order.advancePaid + Number(paid),
                      remainingAmount: order.remainingAmount - Number(paid)
                    });
                  }
                }}
                className="w-full mt-4 py-2 bg-emerald-50 text-emerald-600 font-medium text-sm rounded-xl hover:bg-emerald-100 transition-colors"
              >
                Record Payment
              </button>
            )}
          </div>
          
          {order.referenceImages?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">References</h2>
              <div className="grid grid-cols-2 gap-2">
                {order.referenceImages.map((img, idx) => (
                  <img key={idx} src={img} alt="Reference" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
