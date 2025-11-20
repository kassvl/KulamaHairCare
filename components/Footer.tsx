import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-pink-100 pt-16 pb-8 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-wider">
            KULAMA<span className="text-[#ff69b4]">.</span>
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Meeting point of modern hair care and professional braiding art in Wroclaw.
            Rediscover your style with us.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold tracking-wide uppercase">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/magaza" className="hover:text-[#ff69b4] transition-colors">Shop</a></li>
            <li><a href="/galeri" className="hover:text-[#ff69b4] transition-colors">Gallery</a></li>
            <li><a href="/iletisim" className="hover:text-[#ff69b4] transition-colors">Contact & Appointment</a></li>
            <li><a href="#" className="hover:text-[#ff69b4] transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold tracking-wide uppercase">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#ff69b4]" />
              <span>Wroclaw, Poland</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#ff69b4]" />
              <span>+48 000 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#ff69b4]" />
              <span>info@kulama.com</span>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-[#ff69b4] transition-transform hover:scale-110"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#ff69b4] transition-transform hover:scale-110"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#ff69b4] transition-transform hover:scale-110"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-pink-50 text-center text-xs opacity-60">
        © {new Date().getFullYear()} KULAMA Hair Care & Braids. All rights reserved. Wroclaw Based.
      </div>
    </footer>
  );
};
