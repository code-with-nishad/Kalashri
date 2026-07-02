import React from "react";
import { ShieldAlert, Plus } from "lucide-react";

export default function InsuranceLeads() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Insurance Leads</h1>
            <p className="text-sm text-[var(--color-text-muted)]">Manage and follow up on insurance consultation requests</p>
          </div>
        </div>
        <button className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Lead
        </button>
      </div>

      <div className="bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm p-8 text-center">
        <p className="text-[var(--color-text-muted)]">Insurance CRM Interface initialized.</p>
      </div>
    </div>
  );
}
