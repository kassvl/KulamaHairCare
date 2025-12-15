"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowDown, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#c9a962]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#b76e79]/10 rounded-full blur-[80px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(201, 169, 98, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 169, 98, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
          <span className="text-sm font-medium tracking-widest uppercase text-[#c9a962]">
            {t('hero_badge')}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          <span>{t('hero_title_1')}</span>
          <br />
          <span className="font-[family-name:var(--font-playfair)] italic text-gradient-gold">
            {t('hero_title_2')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
        >
          {t('hero_desc')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/magaza">
            <Button size="lg" className="min-w-[200px]">
              {t('hero_cta_shop')} →
            </Button>
          </Link>
          <Link href="/galeri">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              {t('hero_cta_gallery')}
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "100%", label: "Satisfaction" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5 text-[#c9a962] animate-bounce" />
      </motion.div>

      {/* Side Decorations - simplified */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/30 to-transparent" />
        <span className="text-xs text-white/30 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
          Est. 2020
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/30 to-transparent" />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/30 to-transparent" />
        <span className="text-xs text-white/30 uppercase tracking-widest [writing-mode:vertical-lr]">
          Wroclaw
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/30 to-transparent" />
      </div>
    </section>
  );
};
