"use client";

import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl glass border-animated overflow-hidden transition-all duration-500 hover:bg-white/5">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-[#c9a962]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-white/50 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ index }: { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const images = [
    "https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1623601019319-30a21450610d?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 relative">
        <img 
          src={images[index]}
          alt="Product"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#c9a962]/0 group-hover:bg-[#c9a962]/10 transition-colors duration-500" />
        
        {/* Quick Add Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-4 left-4 right-4 bg-white text-[#0a0a0a] font-semibold py-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          Quick Add
        </motion.button>
        
        {/* Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm text-xs text-[#c9a962] uppercase tracking-wider">
          New
        </div>
      </div>
      
      <div className="mt-5 space-y-1">
        <h3 className="text-lg font-medium text-white group-hover:text-[#c9a962] transition-colors">
          X-Pression Braid Hair
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-white/40">Synthetic Hair</p>
          <p className="text-[#c9a962] font-semibold">150 PLN</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const features = [
    { icon: <Star className="w-6 h-6 text-[#c9a962]" />, title: "Premium Quality", desc: "Top quality synthetic and natural hair products sourced from the finest suppliers." },
    { icon: <ShieldCheck className="w-6 h-6 text-[#c9a962]" />, title: "Secure Payment", desc: "Your payments are protected by 256-bit SSL encryption technology." },
    { icon: <Truck className="w-6 h-6 text-[#c9a962]" />, title: "Fast Delivery", desc: "Express shipping to all over Poland within 1-3 business days." },
  ];

  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  const ctaY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="bg-[#0a0a0a]">
      <Hero />

      {/* Marquee Section */}
      <section className="py-8 border-y border-white/5 overflow-hidden bg-[#0a0a0a]">
        <div className="marquee flex items-center gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {["Premium Braids", "Hair Care", "Accessories", "Natural Hair", "Synthetic Hair", "Custom Styles"].map((item, idx) => (
                <span key={idx} className="flex items-center gap-4 text-white/30 text-sm uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-[#c9a962]" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a962]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Excellence in Every Detail
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              We combine traditional craftsmanship with modern techniques to deliver exceptional results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block">Collection</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Popular Products
              </h2>
            </div>
            <Link 
              href="/magaza" 
              className="group flex items-center gap-3 text-white/60 hover:text-[#c9a962] transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">View All Products</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((idx) => (
              <ProductCard key={idx} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 px-6 relative overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: ctaY }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop" 
            alt="CTA Background" 
            className="w-full h-[120%] object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-6 block">Book Your Session</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Time to Get Your{' '}
                <span className="font-[family-name:var(--font-playfair)] italic text-gradient-gold">
                  Dream Hair.
                </span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-lg leading-relaxed">
                Meet our expert team in Wroclaw and let's determine the most suitable braid model for you together. 
                Create your appointment immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/iletisim">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Appointment
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/galeri">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="hidden md:block">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1595476108010-b4eb647f3bfa?q=80&w=800&auto=format&fit=crop"
                    alt="Braiding Art"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 glass-gold rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c9a962] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#0a0a0a]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">4.9</div>
                      <div className="text-sm text-white/50">Customer Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block">Follow Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              @kulama_braids
            </h2>
            <p className="text-white/50 mb-8">
              Follow us on Instagram for the latest styles and inspiration
            </p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:glass-gold transition-all duration-300 text-white/80 hover:text-[#c9a962]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Follow on Instagram</span>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
