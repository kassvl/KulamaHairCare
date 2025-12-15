"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowDown, Sparkles } from 'lucide-react';

const FloatingOrb = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: 'radial-gradient(circle, rgba(201, 169, 98, 0.3) 0%, transparent 70%)',
      filter: 'blur(40px)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  );
};

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#c9a962]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b76e79]/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a962]/5 rounded-full blur-[150px]" />
        </div>

        {/* Floating Orbs */}
        <FloatingOrb delay={0} size={200} x="10%" y="20%" />
        <FloatingOrb delay={2} size={150} x="80%" y="60%" />
        <FloatingOrb delay={4} size={100} x="60%" y="10%" />
        <FloatingOrb delay={1} size={180} x="20%" y="70%" />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 169, 98, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 169, 98, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 noise" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
          <span className="text-sm font-medium tracking-widest uppercase text-[#c9a962]">
            {t('hero_badge')}
          </span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-8">
          <div className="overflow-hidden">
            <AnimatedText text={t('hero_title_1')} delay={0.4} />
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="font-[family-name:var(--font-playfair)] italic text-gradient-gold glow-text inline-block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {t('hero_title_2')}
            </motion.span>
          </div>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero_desc')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/magaza">
            <Button size="lg" className="min-w-[200px] group">
              <span>{t('hero_cta_shop')}</span>
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-[#c9a962]" />
        </motion.div>
      </motion.div>

      {/* Side Decorations */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/50 to-transparent" />
        <span className="text-xs text-white/30 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
          Est. 2020
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/50 to-transparent" />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/50 to-transparent" />
        <span className="text-xs text-white/30 uppercase tracking-widest [writing-mode:vertical-lr]">
          Wroclaw
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c9a962]/50 to-transparent" />
      </div>
    </section>
  );
};
