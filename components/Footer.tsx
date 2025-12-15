"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-pink-50 border-t border-pink-100">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold tracking-[0.2em] text-gray-900">
                KULAMA<span className="text-pink-500">.</span>
              </h2>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Where traditional African braiding artistry meets modern elegance. Premium hair care in Wroclaw.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-pink-200 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-300 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-pink-200 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-300 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-pink-200 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-300 transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/magaza" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Shop</Link>
              <Link href="/galeri" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Gallery</Link>
              <Link href="/iletisim" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Book Appointment</Link>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Our Story</a>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Services</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Box Braids</a>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Cornrows</a>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Knotless Braids</a>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-sm transition-colors">Twist Styles</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">Contact</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-start gap-3 text-gray-500 hover:text-pink-500 text-sm transition-colors">
                <MapPin size={16} className="text-pink-400 mt-0.5 shrink-0" />
                <span>Rynek 12/3<br />Wroclaw, Poland</span>
              </a>
              <a href="tel:+48000000000" className="flex items-center gap-3 text-gray-500 hover:text-pink-500 text-sm transition-colors">
                <Phone size={16} className="text-pink-400" />
                +48 000 000 000
              </a>
              <a href="mailto:info@kulama.com" className="flex items-center gap-3 text-gray-500 hover:text-pink-500 text-sm transition-colors">
                <Mail size={16} className="text-pink-400" />
                info@kulama.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-pink-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Subscribe to newsletter</h3>
              <p className="text-gray-400 text-sm">Get exclusive offers in your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-pink-50 border border-pink-200 rounded-full px-5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-400 transition-colors text-sm"
              />
              <button className="px-6 py-2.5 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors text-sm shadow-md shadow-pink-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} KULAMA Hair Care & Braids. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
