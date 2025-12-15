"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Instagram, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1624805940907-9d3c3173014b?q=80&w=1200&auto=format&fit=crop", title: "Box Braids", desc: "Long lasting and chic style for every occasion.", category: "Classic" },
  { id: 2, src: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=1200&auto=format&fit=crop", title: "Cornrows", desc: "Classic and modern lines that make a statement.", category: "Traditional" },
  { id: 3, src: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=1200&auto=format&fit=crop", title: "Afro Kinky", desc: "For natural look lovers who embrace their roots.", category: "Natural" },
  { id: 4, src: "https://images.unsplash.com/photo-1632298360850-73e549839168?q=80&w=1200&auto=format&fit=crop", title: "Twist Braids", desc: "Light and voluminous for everyday elegance.", category: "Modern" },
  { id: 5, src: "https://images.unsplash.com/photo-1582095133179-bfd08d2fc6a8?q=80&w=1200&auto=format&fit=crop", title: "Goddess Braids", desc: "Elegant and impressive for special moments.", category: "Luxury" },
  { id: 6, src: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=1200&auto=format&fit=crop", title: "Colorful Designs", desc: "Bold color options for the adventurous.", category: "Creative" },
  { id: 7, src: "https://images.unsplash.com/photo-1572465512732-b4a21450610e?q=80&w=1200&auto=format&fit=crop", title: "Knotless Braids", desc: "Painless and natural roots for comfort.", category: "Modern" },
  { id: 8, src: "https://images.unsplash.com/photo-1534143046248-35e487f03525?q=80&w=1200&auto=format&fit=crop", title: "Kids Braids", desc: "Fun and safe styles for little ones.", category: "Kids" },
  { id: 9, src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop", title: "Custom Design", desc: "Custom models designed just for you.", category: "Custom" },
];

const GalleryImage = ({ item, index, onClick }: { item: typeof galleryItems[0]; index: number; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="relative group break-inside-avoid mb-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5">
        <img 
          src={item.src} 
          alt={item.title} 
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0a0a0a]/60 backdrop-blur-sm text-xs font-medium text-[#c9a962] uppercase tracking-wider">
          {item.category}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {item.title}
          </motion.h3>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="text-white/70 text-sm"
          >
            {item.desc}
          </motion.p>
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-5 h-5 text-[#c9a962]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Lightbox = ({ 
  item, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  item: typeof galleryItems[0]; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl p-4"
    onClick={onClose}
  >
    {/* Close Button */}
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
    >
      <X size={24} />
    </button>

    {/* Navigation Buttons */}
    <button 
      onClick={(e) => { e.stopPropagation(); onPrev(); }}
      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
    >
      <ChevronLeft size={24} />
    </button>
    <button 
      onClick={(e) => { e.stopPropagation(); onNext(); }}
      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
    >
      <ChevronRight size={24} />
    </button>

    {/* Image */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-5xl max-h-[85vh] w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img 
        src={item.src} 
        alt={item.title}
        className="w-full h-full object-contain rounded-2xl"
      />
      
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0a0a0a] to-transparent">
        <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-2 block">{item.category}</span>
        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-white/60">{item.desc}</p>
      </div>
    </motion.div>
  </motion.div>
);

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))];
  
  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handlePrev = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
      const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
      setSelectedImage(filteredItems[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
      const nextIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(filteredItems[nextIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#c9a962]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block"
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-lg"
          >
            Explore our collection of artistry. Every braid tells a story of style, culture, and craftsmanship.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  filter === category
                    ? "bg-[#c9a962] text-[#0a0a0a]"
                    : "glass text-white/60 hover:text-white hover:glass-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <GalleryImage 
                  key={item.id} 
                  item={item} 
                  index={idx}
                  onClick={() => setSelectedImage(item.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-gold rounded-3xl p-12"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center mx-auto mb-6">
              <Instagram size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              See more of our work and get daily inspiration. Join our community of hair art enthusiasts.
            </p>
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              @kulama_braids
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox 
            item={galleryItems.find(i => i.id === selectedImage)!}
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
