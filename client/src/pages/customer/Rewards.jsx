import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";

const offers = [
  {
    title: "Bridal Makeup Offer",
    desc: "Get 20% OFF on Bridal Makeup Package",
    valid: "31 May 2024",
    discount: "20%\nOFF"
  },
  {
    title: "Aari Work Special",
    desc: "Flat 15% OFF on All Aari Work Orders",
    valid: "31 May 2024",
    discount: "15%\nOFF"
  },
  {
    title: "Nauvari Saree Offer",
    desc: "Special Discount on Nauvari Saree Stitching",
    valid: "31 May 2024",
    discount: "10%\nOFF"
  }
];

export default function Rewards() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <MobileHeader title="Offers & Discounts" showBack />
      
      <div className="p-6 space-y-4">
        {offers.map((offer, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 flex justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">{offer.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{offer.desc}</p>
                <p className="text-[10px] text-gray-400">Valid till {offer.valid}</p>
              </div>
              <div className="w-16 h-16 rounded-xl bg-[var(--color-gold)]/20 border border-[var(--color-gold)] flex items-center justify-center text-center flex-shrink-0">
                <span className="text-[10px] font-bold text-[var(--color-gold-900)] whitespace-pre-line">{offer.discount}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button className="w-1/2 py-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-lg hover:bg-[var(--color-accent-light)] transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
