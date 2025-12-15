"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1624805940907-9d3c3173014b?w=600&q=75", title: "Box Braids", category: "Classic" },
  { id: 2, src: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&q=75", title: "Cornrows", category: "Traditional" },
  { id: 3, src: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?w=600&q=75", title: "Afro Kinky", category: "Natural" },
  { id: 4, src: "https://images.unsplash.com/photo-1632298360850-73e549839168?w=600&q=75", title: "Twist Braids", category: "Modern" },
  { id: 5, src: "https://images.unsplash.com/photo-1582095133179-bfd08d2fc6a8?w=600&q=75", title: "Goddess Braids", category: "Luxury" },
  { id: 6, src: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?w=600&q=75", title: "Colorful Designs", category: "Creative" },
  { id: 7, src: "https://images.unsplash.com/photo-1572465512732-b4a21450610e?w=600&q=75", title: "Knotless Braids", category: "Modern" },
  { id: 8, src: "https://images.unsplash.com/photo-1534143046248-35e487f03525?w=600&q=75", title: "Kids Braids", category: "Kids" },
  { id: 9, src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=75", title: "Custom Design", category: "Custom" },
];

export default function GalleryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];
  const filtered = filter === "All" ? galleryItems : galleryItems.filter(i => i.category === filter);
  const selectedItem = galleryItems.find(i => i.id === selectedId);

  const navigate = (dir: 1 | -1) => {
    if (!selectedId) return;
    const idx = filtered.findIndex(i => i.id === selectedId);
    const next = (idx + dir + filtered.length) % filtered.length;
    setSelectedId(filtered[next].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-24 pb-20">
      {/* Header */}
      <div className="text-center px-6 mb-12">
        <span className="text-pink-500 text-sm uppercase tracking-widest mb-2 block">Portfolio</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
        <p className="text-gray-500 max-w-md mx-auto">Explore our collection of artistry.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 px-6 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === cat 
                ? "bg-pink-500 text-white shadow-md shadow-pink-200" 
                : "bg-white border border-pink-200 text-gray-600 hover:border-pink-300 hover:text-pink-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedId(item.id)}
              className="mb-4 break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <img 
                src={item.src} 
                alt={item.title}
                loading="lazy"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <span className="text-pink-300 text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instagram CTA */}
      <div className="text-center mt-20 px-6">
        <a 
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full font-medium shadow-lg"
        >
          <Instagram size={20} />
          @kulama_braids
        </a>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 text-white/60 hover:text-white">
              <X size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="absolute left-6 text-white/60 hover:text-white">
              <ChevronLeft size={32} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(1); }} className="absolute right-6 text-white/60 hover:text-white">
              <ChevronRight size={32} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedItem.src.replace('w=600', 'w=1200')}
              alt={selectedItem.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
