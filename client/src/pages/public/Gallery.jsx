import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MobileHeader from "../../components/layout/MobileHeader";
import { cmsService } from "../../services";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");

  const { data: galleryData, isLoading } = useQuery({
    queryKey: ["GALLERY"],
    queryFn: cmsService.getGallery
  });

  const images = galleryData?.data || [];

  const categories = ["All", "Fashion", "Beauty", "Aari Work", "Bridal", "Traditional Wear", "Before & After"];

  const filteredImages = activeTab === "All" 
    ? images 
    : images.filter(img => img.category === activeTab);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <MobileHeader title="Gallery" showBack />
      
      {/* Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100 bg-[var(--color-primary-dark)]">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${activeTab === cat ? "bg-white text-[var(--color-primary-dark)]" : "bg-transparent text-white/70 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading gallery...</div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No images found for {activeTab}</div>
      ) : (
        <div className="p-1 grid grid-cols-3 gap-1">
          {filteredImages.map((img) => (
            <div key={img._id} className="aspect-square bg-gray-100 group relative overflow-hidden">
              <img src={img.image} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
