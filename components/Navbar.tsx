"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <div className="text-2xl font-bold tracking-wider text-gray-900">
            KULAMA<span className="text-[#ff69b4]">.</span>
          </div>
          <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase -mt-1 group-hover:text-[#ff69b4] transition-colors">
            {t('wroclaw')}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-[#ff69b4] transition-colors duration-200 uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#ff69b4] transition-colors"
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button className="relative p-2 text-gray-600 hover:text-[#ff69b4] transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff69b4] rounded-full animate-pulse" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="text-sm font-bold text-gray-600 hover:text-[#ff69b4]"
          >
            {language.toUpperCase()}
          </button>
          <button
            className="text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-pink-100 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-[#ff69b4] transition-colors uppercase tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
