"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const categories = ["All", "Synthetic Hair", "Natural Hair", "Beads", "Care Products", "Accessories"];

const products = [
  { id: 1, name: "X-Pression Ultra Braid", price: 150, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Afro Kinky Bulk", price: 220, category: "Natural Hair", image: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Colorful Bead Set", price: 85, category: "Beads", image: "https://images.unsplash.com/photo-1617391654459-12a6843d5b82?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Argan Care Oil", price: 350, category: "Care Products", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Ombre Jumbo Braid", price: 180, category: "Synthetic Hair", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Gold Hair Cuffs", price: 60, category: "Accessories", image: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="bg-[#fff0f5] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Shop</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Best quality braiding hair and care products. Choice of professionals.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar / Filters */}
        <aside className="lg:w-1/4 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#ff69b4]">
              <Filter size={20} />
              <h3 className="font-semibold text-lg">Categories</h3>
            </div>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                      selectedCategory === cat 
                        ? "bg-[#ff69b4] text-white font-medium shadow-md shadow-pink-100" 
                        : "text-gray-600 hover:bg-pink-50 hover:text-[#ff69b4]"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <span className="text-gray-500">{filteredProducts.length} products listed</span>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] w-64 text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-pink-50 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-50 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <button className="absolute inset-x-4 bottom-4 bg-[#ff69b4] text-white font-medium py-3 rounded-xl translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    Add to Cart
                  </button>
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#ff69b4] mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 className="font-medium text-lg text-gray-900 mb-2">{product.name}</h3>
                  <div className="font-bold text-gray-600">PLN {product.price.toFixed(2)}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
