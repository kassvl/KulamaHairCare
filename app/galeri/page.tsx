"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ZoomIn } from 'lucide-react';

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1624805940907-9d3c3173014b?q=80&w=800&auto=format&fit=crop", title: "Box Braids", desc: "Long lasting and chic." },
  { id: 2, src: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=800&auto=format&fit=crop", title: "Cornrows", desc: "Classic and modern lines." },
  { id: 3, src: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=800&auto=format&fit=crop", title: "Afro Kinky", desc: "For natural look lovers." },
  { id: 4, src: "https://images.unsplash.com/photo-1632298360850-73e549839168?q=80&w=800&auto=format&fit=crop", title: "Twist Braids", desc: "Light and voluminous." },
  { id: 5, src: "https://images.unsplash.com/photo-1582095133179-bfd08d2fc6a8?q=80&w=800&auto=format&fit=crop", title: "Goddess Braids", desc: "Elegant and impressive." },
  { id: 6, src: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=800&auto=format&fit=crop", title: "Colorful Designs", desc: "Bold color options." },
  { id: 7, src: "https://images.unsplash.com/photo-1572465512732-b4a21487e30e?q=80&w=800&auto=format&fit=crop", title: "Knotless Braids", desc: "Painless and natural roots." },
  { id: 8, src: "https://images.unsplash.com/photo-1534143046248-35e487f03525?q=80&w=800&auto=format&fit=crop", title: "Kids Braids", desc: "Fun and safe." },
  { id: 9, src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop", title: "Custom Design", desc: "Custom models for you." },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <div className="bg-[#fff0f5] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Gallery</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Selections from our work. Take a look for inspiration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={item.id}
              className="relative group rounded-2xl overflow-hidden bg-gray-100 break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                <p className="text-pink-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.desc}</p>
                <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hover:bg-white/30">
                  <ZoomIn className="text-white w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-6">Follow us on Instagram to see more models.</p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full hover:opacity-90 transition-opacity font-medium shadow-lg shadow-pink-200"
          >
            <Instagram size={20} />
            @kulama_braids
          </a>
        </div>
      </div>
    </div>
  );
}
