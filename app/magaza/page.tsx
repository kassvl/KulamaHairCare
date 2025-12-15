"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Star, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const categories = ["All", "Synthetic Hair", "Natural Hair", "Beads", "Care Products", "Accessories"];

const products = [
  { id: 1, name: "X-Pression Ultra Braid", price: 150, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?w=400&q=75", rating: 4.9, bestseller: true },
  { id: 2, name: "Afro Kinky Bulk", price: 220, category: "Natural Hair", image: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?w=400&q=75", rating: 4.8 },
  { id: 3, name: "Colorful Bead Set", price: 85, category: "Beads", image: "https://images.unsplash.com/photo-1617391654459-12a6843d5b82?w=400&q=75", rating: 4.7 },
  { id: 4, name: "Argan Care Oil", price: 350, category: "Care Products", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=400&q=75", rating: 5.0, bestseller: true },
  { id: 5, name: "Ombre Jumbo Braid", price: 180, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=75", rating: 4.6 },
  { id: 6, name: "Gold Hair Cuffs", price: 60, category: "Accessories", image: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?w=400&q=75", rating: 4.9, bestseller: true },
];

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quickView, setQuickView] = useState<typeof products[0] | null>(null);

  const filtered = products
    .filter(p => category === "All" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-24 pb-20">
      {/* Header */}
      <div className="text-center px-6 mb-12">
        <span className="text-pink-500 text-sm uppercase tracking-widest mb-2 block">Premium Collection</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop</h1>
        <p className="text-gray-500 max-w-md mx-auto">Discover premium braiding products.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm sticky top-24">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-pink-50 border border-pink-100 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-300"
                />
              </div>

              {/* Categories */}
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat 
                        ? "bg-pink-500 text-white font-medium shadow-sm" 
                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-6">{filtered.length} products</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-pink-50 mb-3 shadow-sm">
                    <div className="aspect-square">
                      <img 
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {product.bestseller && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-pink-500 text-[10px] text-white font-semibold uppercase shadow-sm">
                        Bestseller
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      <button 
                        onClick={() => setQuickView(product)}
                        className="flex-1 bg-white text-pink-500 text-xs font-medium py-2 rounded-lg hover:bg-pink-50 transition-colors shadow-md"
                      >
                        Quick View
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center bg-pink-500 rounded-lg shadow-md">
                        <ShoppingBag size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="text-pink-400 fill-pink-400" />
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-pink-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-pink-500 text-sm font-semibold">{product.price} PLN</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            >
              <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="aspect-square bg-pink-50">
                  <img src={quickView.image.replace('w=400', 'w=600')} alt={quickView.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col">
                  <span className="text-pink-500 text-xs uppercase tracking-wider mb-1">{quickView.category}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{quickView.name}</h2>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(quickView.rating) ? "text-pink-400 fill-pink-400" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{quickView.rating}</span>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 flex-1">
                    Premium quality product perfect for creating stunning braided styles.
                  </p>

                  <div className="text-2xl font-bold text-gray-900 mb-6">{quickView.price} PLN</div>

                  <div className="flex gap-3">
                    <Button size="lg" className="flex-1">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </Button>
                    <button className="w-12 h-12 rounded-full border-2 border-pink-200 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-300 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
