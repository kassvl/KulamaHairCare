"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, MessageCircle } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, content, href, delay }: { 
  icon: React.ElementType; 
  title: string; 
  content: React.ReactNode; 
  href?: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <Wrapper 
        {...wrapperProps}
        className="group block glass hover:glass-gold rounded-2xl p-6 transition-all duration-500 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c9a962]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
            <Icon size={22} className="text-[#c9a962]" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-[#c9a962] transition-colors">{title}</h3>
            <div className="text-white/50 text-sm leading-relaxed">{content}</div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
};

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'appointment',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate submission
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ firstName: '', lastName: '', email: '', subject: 'appointment', message: '' });
      }, 3000);
    }, 1500);
  };

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a962]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a962] text-sm uppercase tracking-widest mb-4 block"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-lg"
          >
            Ready to transform your look? Book an appointment or reach out with any questions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Let's Create Something{' '}
                  <span className="font-[family-name:var(--font-playfair)] italic text-gradient-gold">Beautiful</span>
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Whether you're looking to book an appointment, have questions about our services, 
                  or want to learn more about our products, we're here to help.
                </p>
              </motion.div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <ContactCard 
                  icon={MapPin}
                  title="Visit Our Studio"
                  content={<>Rynek 12/3<br />50-101 Wroclaw, Poland</>}
                  href="https://maps.google.com"
                  delay={0.1}
                />
                <ContactCard 
                  icon={Phone}
                  title="Call Us"
                  content="+48 000 000 000"
                  href="tel:+48000000000"
                  delay={0.2}
                />
                <ContactCard 
                  icon={Mail}
                  title="Email Us"
                  content="info@kulama.com"
                  href="mailto:info@kulama.com"
                  delay={0.3}
                />
                <ContactCard 
                  icon={Clock}
                  title="Working Hours"
                  content={<>Monday - Saturday: 9:00 - 20:00<br />Sunday: Closed</>}
                  delay={0.4}
                />
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-6 border-t border-white/10"
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass hover:glass-gold rounded-full text-white/60 hover:text-[#c9a962] transition-all"
                  >
                    <Instagram size={18} />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a 
                    href="https://wa.me/48000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass hover:glass-gold rounded-full text-white/60 hover:text-[#c9a962] transition-all"
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="glass rounded-3xl p-8 lg:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
              
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 uppercase tracking-wider">First Name</label>
                      <input 
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 uppercase tracking-wider">Last Name</label>
                      <input 
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 uppercase tracking-wider">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#c9a962]/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="appointment" className="bg-[#0a0a0a]">Book an Appointment</option>
                      <option value="inquiry" className="bg-[#0a0a0a]">Product Inquiry</option>
                      <option value="feedback" className="bg-[#0a0a0a]">Feedback / Suggestion</option>
                      <option value="other" className="bg-[#0a0a0a]">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 uppercase tracking-wider">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9a962]/50 transition-colors resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
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
      </section>

      {/* Map Section */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] glass"
          >
            {/* Placeholder Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/5 to-transparent" />
            
            {/* Grid Overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(201, 169, 98, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201, 169, 98, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            
            {/* Center Pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#c9a962] flex items-center justify-center shadow-lg shadow-[#c9a962]/30">
                  <MapPin size={28} className="text-[#0a0a0a]" />
                </div>
                <div className="mt-4 glass-gold px-4 py-2 rounded-full">
                  <span className="text-white font-medium text-sm">KULAMA Studio</span>
                </div>
              </motion.div>
            </div>

            {/* View on Maps Link */}
            <a 
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 px-6 py-3 bg-[#c9a962] text-[#0a0a0a] font-semibold rounded-full hover:bg-[#e8d5a3] transition-colors"
            >
              View on Google Maps
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
