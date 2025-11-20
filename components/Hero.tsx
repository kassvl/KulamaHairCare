"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-[#fff0f5]">
      {/* Background Video/Image Placeholder with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519699047748-a86dd009a682?q=80&w=2664&auto=format&fit=crop" 
          alt="Braids Background" 
          className="w-full h-full object-cover opacity-80 scale-105"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-sm font-medium tracking-widest uppercase mb-6 border border-pink-200">
            {t('hero_badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 mb-6 leading-tight"
        >
          {t('hero_title_1')} <br />
          <span className="text-gradient-pink italic">{t('hero_title_2')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero_desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/magaza">
            <Button size="lg" className="min-w-[180px] bg-[#ff69b4] hover:bg-[#ff1493] text-white shadow-lg shadow-pink-200">
              {t('hero_cta_shop')}
            </Button>
          </Link>
          <Link href="/galeri">
            <Button variant="outline" size="lg" className="min-w-[180px] border-pink-200 text-pink-600 hover:bg-pink-50">
              {t('hero_cta_gallery')}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Abstract Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
    </section>
  );
};
