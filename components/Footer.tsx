"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href}
    className="group flex items-center gap-1 text-white/50 hover:text-[#c9a962] transition-colors duration-300"
  >
    <span>{children}</span>
    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
  </Link>
);

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-[#c9a962] hover:glass-gold transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

export const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold tracking-[0.2em] text-white">
                KULAMA<span className="text-[#c9a962]">.</span>
              </h2>
            </Link>
            <p className="text-white/40 leading-relaxed">
              Where traditional African braiding artistry meets modern elegance. 
              Your destination for premium hair care in Wroclaw.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://instagram.com" icon={Instagram} />
              <SocialLink href="https://facebook.com" icon={Facebook} />
              <SocialLink href="https://twitter.com" icon={Twitter} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <FooterLink href="/magaza">Shop</FooterLink>
              <FooterLink href="/galeri">Gallery</FooterLink>
              <FooterLink href="/iletisim">Book Appointment</FooterLink>
              <FooterLink href="#">Our Story</FooterLink>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Services
            </h3>
            <nav className="flex flex-col gap-3">
              <FooterLink href="#">Box Braids</FooterLink>
              <FooterLink href="#">Cornrows</FooterLink>
              <FooterLink href="#">Knotless Braids</FooterLink>
              <FooterLink href="#">Twist Styles</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Contact
            </h3>
            <div className="space-y-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 hover:text-[#c9a962] transition-colors group"
              >
                <MapPin size={18} className="shrink-0 mt-1 text-[#c9a962]/70" />
                <span>Rynek 12/3<br />Wroclaw, Poland</span>
              </a>
              <a 
                href="tel:+48000000000"
                className="flex items-center gap-3 text-white/50 hover:text-[#c9a962] transition-colors"
              >
                <Phone size={18} className="text-[#c9a962]/70" />
                <span>+48 000 000 000</span>
              </a>
              <a 
                href="mailto:info@kulama.com"
                className="flex items-center gap-3 text-white/50 hover:text-[#c9a962] transition-colors"
              >
                <Mail size={18} className="text-[#c9a962]/70" />
                <span>info@kulama.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-white/40 text-sm">
                Get exclusive offers and the latest news directly in your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-[#c9a962] text-[#0a0a0a] font-semibold rounded-full hover:bg-[#e8d5a3] transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p>© {new Date().getFullYear()} KULAMA Hair Care & Braids. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#c9a962] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c9a962] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#c9a962]/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-24 bg-gradient-to-b from-[#c9a962]/20 to-transparent" />
    </footer>
  );
};
