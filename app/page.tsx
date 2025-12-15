"use client";

import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 }
};

export default function Home() {
  const features = [
    { icon: <Star className="w-6 h-6 text-[#c9a962]" />, title: "Premium Quality", desc: "Top quality synthetic and natural hair products." },
    { icon: <ShieldCheck className="w-6 h-6 text-[#c9a962]" />, title: "Secure Payment", desc: "Payments protected by 256-bit SSL." },
    { icon: <Truck className="w-6 h-6 text-[#c9a962]" />, title: "Fast Delivery", desc: "Shipping to Poland in 1-3 days." },
  ];

  const products = [
    { name: "X-Pression Braid", price: 150, image: "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?w=400&q=75" },
    { name: "Afro Kinky Bulk", price: 220, image: "https://images.unsplash.com/photo-1519699047748-a86dd009a682?w=400&q=75" },
    { name: "Ombre Jumbo Braid", price: 180, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=75" },
    { name: "Gold Hair Cuffs", price: 60, image: "https://images.unsplash.com/photo-1623601019319-30a21450610d?w=400&q=75" },
  ];

  return (
    <div className="bg-[#0a0a0a]">
      <Hero />

      {/* Marquee Section */}
      <section className="py-6 border-y border-white/5 overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {["Premium Braids", "Hair Care", "Accessories", "Natural Hair", "Synthetic Hair"].map((item, idx) => (
                <span key={idx} className="flex items-center gap-3 text-white/20 text-sm uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#c9a962]/50" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Excellence in Every Detail</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-2 block">Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Popular Products</h2>
            </div>
            <Link href="/magaza" className="hidden md:flex items-center gap-2 text-white/60 hover:text-[#c9a962] transition-colors text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5 relative mb-3">
                  <img 
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 text-[10px] text-[#c9a962] uppercase tracking-wider">
                    New
                  </div>
                  <button className="absolute bottom-3 left-3 right-3 bg-white text-black font-medium py-2.5 rounded-lg text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Quick Add
                  </button>
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-[#c9a962] transition-colors">{product.name}</h3>
                <p className="text-[#c9a962] text-sm font-semibold">{product.price} PLN</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/magaza">
              <Button variant="outline" className="w-full">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#c9a962]/20 to-transparent p-8 md:p-16"
          >
            <div className="max-w-xl">
              <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block">Book Now</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Time to Get Your{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-gradient-gold">Dream Hair.</span>
              </h2>
              <p className="text-white/50 mb-8">
                Meet our expert team in Wroclaw and create your appointment immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/iletisim">
                  <Button size="lg">Get Appointment <ArrowRight size={18} /></Button>
                </Link>
                <Link href="/galeri">
                  <Button variant="outline" size="lg">View Our Work</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <motion.div {...fadeIn} className="max-w-7xl mx-auto text-center">
          <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-2 block">Follow Us</span>
          <h2 className="text-2xl font-bold text-white mb-6">@kulama_braids</h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white/5 transition-colors text-white/60 hover:text-[#c9a962]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow on Instagram
          </a>
        </motion.div>
      </section>
    </div>
  );
}
