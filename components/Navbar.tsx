"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
          scrolled ? "bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <div className="text-2xl font-bold tracking-[0.2em] text-gray-900">
              KULAMA<span className="text-pink-500">.</span>
            </div>
            <span className="text-[9px] font-medium tracking-[0.3em] text-gray-400 uppercase group-hover:text-pink-500 transition-colors">
              {t('wroclaw')}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                    isActive ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-pink-500 transition-colors uppercase"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>

            <button className="p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <ShoppingBag size={20} />
            </button>

            <div className="w-px h-5 bg-gray-200 mx-2" />

            <Link
              href="/iletisim"
              className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-white bg-pink-500 rounded-full hover:bg-pink-600 transition-colors shadow-md shadow-pink-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleLanguage} className="text-sm font-bold text-gray-600">
              {language.toUpperCase()}
            </button>
            <button className="text-gray-900" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-white"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold uppercase tracking-wider ${
                    pathname === link.href ? "text-pink-500" : "text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
