"use client";

import React, { useState, useRef, useEffect } from 'react';
import ContactCanvas from '../components/ContactCanvas';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import AnimatedButton from '../components/AnimatedButton';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message?: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ ok: false, message: 'Please fill all fields with a valid email.' });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: subject || 'Website Contact', message }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus({ ok: true, message: '✅ Message sent successfully! I will get back to you soon.' });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus({ ok: false, message: data.error || 'Failed to send. Try again.' });
      }
    } catch (err: any) {
      setStatus({ ok: false, message: String(err?.message || err) });
    } finally {
      setSending(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-navy" suppressHydrationWarning>
      {/* Full-screen 3D background */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <ContactCanvas />
      </div>

      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-navy/30 via-navy/50 to-navy/80 z-10 pointer-events-none" />

      {mounted && (
        <>
          {/* Contact form section */}
          <div className="relative z-20 flex items-center justify-center min-h-screen md:min-h-[70vh] px-4 sm:px-6 pt-24 md:pt-20 pb-12">
        <motion.div
          ref={formRef}
          className="max-w-2xl w-full"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gradient-to-br from-navy/80 to-lightNavy/60 backdrop-blur-xl border border-green/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl">
            {/* Header */}
            <motion.div variants={fieldVariants} className="mb-6 sm:mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 bg-green/20 rounded-full mb-3 sm:mb-4">
                <Mail className="w-6 sm:w-7 h-6 sm:h-7 text-green" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">Let's Connect</h1>
              <p className="text-base sm:text-lg text-slate">Send me a message and I'll respond within 24 hours.</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm font-semibold text-lightSlate mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy/60 border border-white/10 focus:border-green/50 rounded-lg text-white placeholder-slate/50 focus:outline-none focus:ring-2 focus:ring-green/20 transition text-sm sm:text-base"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm font-semibold text-lightSlate mb-2">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy/60 border border-white/10 focus:border-green/50 rounded-lg text-white placeholder-slate/50 focus:outline-none focus:ring-2 focus:ring-green/20 transition text-sm sm:text-base"
                  />
                </motion.div>
              </div>

              {/* Subject */}
              <motion.div variants={fieldVariants}>
                <label className="block text-xs sm:text-sm font-semibold text-lightSlate mb-2">Subject (Optional)</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy/60 border border-white/10 focus:border-green/50 rounded-lg text-white placeholder-slate/50 focus:outline-none focus:ring-2 focus:ring-green/20 transition text-sm sm:text-base"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={fieldVariants}>
                <label className="block text-xs sm:text-sm font-semibold text-lightSlate mb-2">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, idea, or question..."
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-navy/60 border border-white/10 focus:border-green/50 rounded-lg text-white placeholder-slate/50 focus:outline-none focus:ring-2 focus:ring-green/20 transition resize-none text-sm sm:text-base"
                />
              </motion.div>

              {/* Status Message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                    status.ok
                      ? 'bg-green/10 border border-green/50 text-green'
                      : 'bg-red-500/10 border border-red-500/50 text-red-400'
                  }`}
                >
                  {status.ok ? <Check size={18} className="sm:w-5 sm:h-5" /> : <AlertCircle size={18} className="sm:w-5 sm:h-5" />}
                  <span className="font-medium">{status.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={fieldVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green to-green/80 text-navy font-bold rounded-lg hover:shadow-lg hover:shadow-green/30 disabled:opacity-60 transition transform hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
                <div className="flex-1">
                  <AnimatedButton href="/" variant="outline">
                    Back Home
                  </AnimatedButton>
                </div>
              </motion.div>
            </form>

            {/* FAQ Quick Links */}
            <motion.div variants={fieldVariants} className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <p className="text-xs sm:text-sm text-lightSlate mb-3 sm:mb-4 font-semibold">Quick answers:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <a href="#" className="text-xs text-slate hover:text-green transition">
                  → Response time: 24–48 hours
                </a>
                <a href="#" className="text-xs text-slate hover:text-green transition">
                  → Open to freelance & full-time
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Sliding Section */}
      <div className="relative z-20 w-full py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-t from-navy/95 to-transparent">
        <Testimonials />
      </div>
      {/* FAQ Section (animated) */}
      <div className="relative z-20 w-full bg-transparent px-4 sm:px-6 pb-10">
        <FAQ />
      </div>
        </>
      )}
    </main>
  );
}
