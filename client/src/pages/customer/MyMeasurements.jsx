import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Scissors, Edit2, Save, Ruler } from "lucide-react";
import { measurementService } from "../../services";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

export default function MyMeasurements() {
  const user = useAuthStore(s => s.user);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const { data: measurementData, isLoading } = useQuery({
    queryKey: ["MY_MEASUREMENTS"],
    queryFn: () => measurementService.getByCustomer(user._id),
    enabled: !!user?._id
  });

  const measurement = measurementData?.data || null;

  const updateMeasurement = useMutation({
    mutationFn: (data) => measurement ? measurementService.update(measurement._id, data) : measurementService.create({ ...data, customer: user._id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MY_MEASUREMENTS"] });
      toast.success("Measurements saved successfully!");
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to save measurements");
    }
  });

  const handleEditClick = () => {
    setEditForm(measurement || {
      bust: "", waist: "", hip: "", shoulder: "", sleeve: "", length: "", neck: "", armhole: "", customNotes: ""
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMeasurement.mutate(editForm);
  };

  if (isLoading) return <div className="p-6">Loading measurements...</div>;

  const fields = [
    { key: "bust", label: "Bust" },
    { key: "waist", label: "Waist" },
    { key: "hip", label: "Hip" },
    { key: "shoulder", label: "Shoulder" },
    { key: "sleeve", label: "Sleeve Length" },
    { key: "length", label: "Total Length" },
    { key: "neck", label: "Neck" },
    { key: "armhole", label: "Armhole" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">My Measurements</h1>
          <p className="text-sm text-gray-500">Your custom tailoring profile</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={handleEditClick}
            className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={handleSave}
            disabled={updateMeasurement.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <Save className="w-4 h-4" />
            {updateMeasurement.isPending ? "Saving..." : "Save Profile"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
            <Ruler className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Standard Profile</h2>
            <p className="text-sm text-gray-500">Used for dresses and custom stitching</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {fields.map(field => (
            <div key={field.key} className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{field.label}</label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="number"
                    value={editForm[field.key] || ""}
                    onChange={(e) => setEditForm({...editForm, [field.key]: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-gray-900 font-medium transition-all"
                    placeholder="0.0"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">in</span>
                </div>
              ) : (
                <div className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-gray-900 font-bold text-lg">
                  {measurement && measurement[field.key] ? `${measurement[field.key]}"` : "-"}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Custom Notes</label>
          {isEditing ? (
            <textarea
              value={editForm.customNotes || ""}
              onChange={(e) => setEditForm({...editForm, customNotes: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-gray-900 text-sm transition-all min-h-[100px]"
              placeholder="Any specific fitting preferences or instructions..."
            />
          ) : (
            <div className="w-full bg-gray-50 rounded-xl px-4 py-4 text-gray-700 text-sm min-h-[100px]">
              {measurement?.customNotes || <span className="text-gray-400 italic">No custom notes added.</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
