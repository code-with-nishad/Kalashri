import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Package, Filter, X } from "lucide-react";
import { inventoryService } from "../../services";
import ProductCard from "../../components/products/ProductCard";
import ProductModal from "../../components/products/ProductModal";

const CATEGORIES = ["All", "Hair Care", "Skin Care", "Makeup", "Body Care", "Facial", "Bridal"];
const SORTS = [
  { id: "default", label: "Most Popular" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Use the API with generic fetch. We'll filter/sort on client for now for instant UX 
  // since we only have ~40-60 products, or we can rely on server.
  // We'll rely on client-side for ultra-fast filtering since it's a small catalog.
  const { data, isLoading } = useQuery({
    queryKey: ["PRODUCTS_FULL"],
    queryFn: () => inventoryService.getProducts(),
  });

  const products = data?.data || [];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (selectedSort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (selectedSort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (selectedSort === "newest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (selectedSort === "rating") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    // default/popular can just use featured first or rating
    else result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

    return result;
  }, [products, searchQuery, selectedCategory, selectedSort]);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center p-3 rounded-full bg-[var(--color-rose-500)]/10 text-[var(--color-rose-500)] mb-2">
            <Package className="w-8 h-8" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
            Premium <span className="text-gradient-rose">Beauty Shop</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--color-text-muted)] text-lg">
            Discover our curated collection of professional salon products.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="sticky top-[72px] z-30 bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)] transition-all outline-none"
            />
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            {/* Desktop Categories Dropdown (simplified as a select for space) */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:w-40 py-3 px-4 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:border-[var(--color-rose-500)] outline-none cursor-pointer appearance-none"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Sort Dropdown */}
            <select 
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="flex-1 sm:w-48 py-3 px-4 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:border-[var(--color-rose-500)] outline-none cursor-pointer appearance-none"
            >
              {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Category Pills (Desktop) */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-[var(--color-rose-500)] text-white shadow-md' : 'bg-[var(--color-surface-card)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-rose-400)] hover:text-[var(--color-text-primary)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} onViewDetails={setSelectedProduct} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-3xl mt-8">
            <Package className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">No products found</h3>
            <p className="text-[var(--color-text-muted)] mt-2">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-6 px-6 py-2.5 bg-[var(--color-rose-500)] text-white rounded-xl font-medium hover:bg-[var(--color-rose-600)] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      <ProductModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
