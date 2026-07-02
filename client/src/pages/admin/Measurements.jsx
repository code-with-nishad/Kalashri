import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, Scissors, Plus, Edit } from "lucide-react";
import { measurementService } from "../../services";

export default function Measurements() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: measurementsData, isLoading } = useQuery({
    queryKey: ["MEASUREMENTS"],
    queryFn: measurementService.getAll
  });
  
  const measurements = measurementsData?.data || [];
  
  const filteredMeasurements = measurements.filter(m => 
    m.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Loading measurements...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Scissors className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Measurements</h1>
            <p className="text-sm text-gray-500">Manage saved tailoring profiles</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Profile</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bust</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waist</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hip</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Length</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMeasurements.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                    No measurement profiles found.
                  </td>
                </tr>
              ) : (
                filteredMeasurements.map((m) => (
                  <tr key={m._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{m.customer?.firstName} {m.customer?.lastName}</div>
                      <div className="text-xs text-gray-500">{m.customer?.phone || m.customer?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.bust ? `${m.bust}"` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.waist ? `${m.waist}"` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.hip ? `${m.hip}"` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.length ? `${m.length}"` : '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
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
