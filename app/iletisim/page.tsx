"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <div className="bg-[#fff0f5] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Contact</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Contact us to make an appointment or ask questions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-500 mb-8">
              We are here to offer the best care for your hair. You can reach us 24/7 through the following contact channels.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
              <MapPin className="w-6 h-6 text-[#ff69b4] shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-500 text-sm">
                  Rynek 12/3, Wroclaw<br />
                  Poland
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
              <Phone className="w-6 h-6 text-[#ff69b4] shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-500 text-sm">+48 000 000 000</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
              <Mail className="w-6 h-6 text-[#ff69b4] shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-500 text-sm">info@kulama.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-6 h-6 text-[#ff69b4] shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                <p className="text-gray-500 text-sm">
                  Mon - Sat: 09:00 - 20:00<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-lg shadow-pink-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] focus:outline-none transition-all placeholder:text-gray-400"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] focus:outline-none transition-all placeholder:text-gray-400"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] focus:outline-none transition-all placeholder:text-gray-400"
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] focus:outline-none transition-all">
                <option>Appointment Request</option>
                <option>Product Information</option>
                <option>Complaint / Suggestion</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-[#ff69b4] focus:ring-1 focus:ring-[#ff69b4] focus:outline-none transition-all resize-none placeholder:text-gray-400"
                placeholder="Write your message here..."
              />
            </div>

            <Button type="submit" className="w-full py-4 shadow-md shadow-pink-200">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
