"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('shop'), href: '/magaza' },
    { name: t('gallery'), href: '/galeri' },
    { name: t('contact'), href: '/iletisim' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
          scrolled 
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <MagneticButton>
            <Link href="/" className="flex flex-col group relative">
              <div className="text-2xl font-bold tracking-[0.2em] text-white">
                KULAMA<span className="text-[#c9a962]">.</span>
              </div>
              <span className="text-[9px] font-medium tracking-[0.3em] text-white/40 uppercase group-hover:text-[#c9a962] transition-colors duration-300">
                {t('wroclaw')}
              </span>
              {/* Glow effect on hover */}
              <div className="absolute -inset-4 bg-[#c9a962]/0 group-hover:bg-[#c9a962]/5 rounded-lg transition-colors duration-300 -z-10" />
            </Link>
          </MagneticButton>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <MagneticButton key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-5 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                      isActive ? "text-[#c9a962]" : "text-white/60 hover:text-white"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#c9a962] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </MagneticButton>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            <MagneticButton>
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/60 hover:text-[#c9a962] transition-colors uppercase tracking-wider"
              >
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
              </button>
            </MagneticButton>

            <MagneticButton>
              <button className="relative p-3 text-white/60 hover:text-[#c9a962] transition-colors group">
                <ShoppingBag size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#c9a962] rounded-full scale-0 group-hover:scale-100 transition-transform" />
              </button>
            </MagneticButton>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <MagneticButton>
              <Link
                href="/iletisim"
                className="px-5 py-2 text-sm font-medium uppercase tracking-wider text-[#0a0a0a] bg-[#c9a962] rounded-full hover:bg-[#e8d5a3] transition-colors"
              >
                Book Now
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleLanguage}
              className="text-sm font-bold text-white/60 hover:text-[#c9a962] uppercase"
            >
              {language.toUpperCase()}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div 
              className="relative z-10 flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-3xl font-bold uppercase tracking-wider transition-colors",
                        pathname === link.href ? "text-[#c9a962]" : "text-white hover:text-[#c9a962]"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-px bg-[#c9a962]/30" />
                <span className="text-xs text-white/40 uppercase tracking-widest">
                  Wroclaw, Poland
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
