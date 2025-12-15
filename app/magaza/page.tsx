"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Filter, Search, ShoppingBag, Star, X, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const categories = ["All", "Synthetic Hair", "Natural Hair", "Beads", "Care Products", "Accessories"];

const products = [
  { id: 1, name: "X-Pression Ultra Braid", price: 150, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: 128, bestseller: true },
  { id: 2, name: "Afro Kinky Bulk", price: 220, category: "Natural Hair", image: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=800&auto=format&fit=crop", rating: 4.8, reviews: 89, bestseller: false },
  { id: 3, name: "Colorful Bead Set", price: 85, category: "Beads", image: "https://images.unsplash.com/photo-1617391654459-12a6843d5b82?q=80&w=800&auto=format&fit=crop", rating: 4.7, reviews: 56, bestseller: false },
  { id: 4, name: "Argan Care Oil", price: 350, category: "Care Products", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=800&auto=format&fit=crop", rating: 5.0, reviews: 203, bestseller: true },
  { id: 5, name: "Ombre Jumbo Braid", price: 180, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop", rating: 4.6, reviews: 67, bestseller: false },
  { id: 6, name: "Gold Hair Cuffs", price: 60, category: "Accessories", image: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop", rating: 4.9, reviews: 145, bestseller: true },
];

const ProductCard = ({ product, index, onQuickView }: { product: typeof products[0]; index: number; onQuickView: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-[#c9a962]/30 transition-all duration-500">
        {/* Image */}
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badges */}
          {product.bestseller && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#c9a962] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider">
              Bestseller
            </div>
          )}
          
          {/* Like Button */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart 
              size={18} 
              className={isLiked ? "fill-red-500 text-red-500" : "text-white/60"} 
            />
          </button>
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={onQuickView}
              className="flex-1 glass py-3 rounded-xl text-white text-sm font-medium hover:glass-gold transition-all"
            >
              Quick View
            </button>
            <button className="w-12 h-12 rounded-xl bg-[#c9a962] flex items-center justify-center hover:bg-[#e8d5a3] transition-colors">
              <ShoppingBag size={18} className="text-[#0a0a0a]" />
            </button>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-[#c9a962] fill-[#c9a962]" />
              <span className="text-sm text-white/80">{product.rating}</span>
            </div>
            <span className="text-white/30 text-sm">({product.reviews})</span>
          </div>
          <span className="text-xs text-[#c9a962] uppercase tracking-wider">{product.category}</span>
          <h3 className="text-lg font-medium text-white mt-1 group-hover:text-[#c9a962] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-white">{product.price} PLN</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QuickViewModal = ({ product, onClose }: { product: typeof products[0]; onClose: () => void }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl w-full glass rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col">
            <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-2">{product.category}</span>
            <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "text-[#c9a962] fill-[#c9a962]" : "text-white/20"} 
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm">{product.reviews} reviews</span>
            </div>

            <p className="text-white/50 leading-relaxed mb-8">
              Premium quality hair product perfect for creating stunning braided styles. 
              Our products are sourced from the finest suppliers to ensure the best results.
            </p>

            {/* Price */}
            <div className="text-3xl font-bold text-white mb-8">
              {product.price} PLN
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/60 text-sm uppercase tracking-wider">Quantity</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mt-auto">
              <Button size="lg" className="flex-1">
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
              <button className="w-14 h-14 rounded-full glass flex items-center justify-center text-white/60 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#c9a962]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block"
          >
            Premium Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-lg"
          >
            Discover our curated collection of premium braiding hair and care products.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 sticky top-28"
            >
              {/* Search */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors text-sm"
                />
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-[#c9a962]">
                  <Filter size={16} />
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Categories</h3>
                </div>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left py-2.5 px-4 rounded-xl text-sm transition-all duration-300 ${
                          selectedCategory === cat 
                            ? "bg-[#c9a962] text-[#0a0a0a] font-medium" 
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <span className="text-white/40 text-sm">
                {filteredProducts.length} products
              </span>
            </motion.div>

            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={idx}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-white/40 text-lg">No products found</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
