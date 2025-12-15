"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', subject: 'appointment', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ firstName: '', lastName: '', email: '', subject: 'appointment', message: '' });
      }, 3000);
    }, 1500);
  };

  const contacts = [
    { icon: MapPin, title: "Visit Us", content: "Rynek 12/3, Wroclaw, Poland", href: "https://maps.google.com" },
    { icon: Phone, title: "Call Us", content: "+48 000 000 000", href: "tel:+48000000000" },
    { icon: Mail, title: "Email Us", content: "info@kulama.com", href: "mailto:info@kulama.com" },
    { icon: Clock, title: "Working Hours", content: "Mon-Sat: 9:00-20:00" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-24 pb-20">
      {/* Header */}
      <div className="text-center px-6 mb-12">
        <span className="text-pink-500 text-sm uppercase tracking-widest mb-2 block">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-gray-500 max-w-md mx-auto">Ready to transform your look? Book an appointment.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Let's Create Something{' '}
              <span className="text-gradient-pink">Beautiful</span>
            </h2>
            <p className="text-gray-500 mb-8">
              Whether you're booking an appointment or have questions, we're here to help.
            </p>

            {/* Contact Cards */}
            <div className="grid gap-4 mb-8">
              {contacts.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-pink-100 hover:border-pink-200 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                        <item.icon size={18} className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.content}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-pink-100">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                        <item.icon size={18} className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-pink-200 rounded-full text-gray-600 hover:text-pink-500 hover:border-pink-300 transition-colors text-sm">
                <Instagram size={16} /> Instagram
              </a>
              <a href="https://wa.me/48000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-pink-200 rounded-full text-gray-600 hover:text-pink-500 hover:border-pink-300 transition-colors text-sm">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-pink-100 shadow-lg shadow-pink-100/50"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
            
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">First Name</label>
                    <input 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-pink-50 border border-pink-100 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Last Name</label>
                    <input 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-pink-50 border border-pink-100 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-pink-50 border border-pink-100 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-pink-50 border border-pink-100 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-pink-300 text-sm"
                  >
                    <option value="appointment">Book an Appointment</option>
                    <option value="inquiry">Product Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-pink-50 border border-pink-100 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 resize-none text-sm"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
