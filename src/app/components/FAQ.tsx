"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  q: string;
  a: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    q: 'How quickly do you respond to messages?',
    a: 'I typically respond within 24–48 hours. For urgent inquiries, include "Urgent" in the subject and I will prioritize it.',
  },
  {
    q: 'Do you take freelance and full-time work?',
    a: 'Yes — I am open to freelance contracts and full-time roles. Please include project scope, timeline, and budget for faster evaluation.',
  },
  {
    q: 'What is your typical project process?',
    a: 'I start with discovery, then design & prototypes, followed by iterative development, testing, and deployment. I prefer frequent check-ins to keep projects aligned.',
  },
  {
    q: 'Do you offer revisions and support after delivery?',
    a: 'Yes — most engagements include a revision window. Ongoing support/maintenance can be provided under a separate agreement.',
  },
  {
    q: 'What information should I include in my initial message?',
    a: 'Provide a brief description, desired timeline, budget range (if available), and any reference links or assets. This helps me give a faster, more accurate reply.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <motion.h3
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Frequently Asked Questions
        </motion.h3>
        <p className="text-slate text-sm mt-2">Quick answers to common questions — still happy to chat.</p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              layout
              initial={{ borderColor: 'rgba(255,255,255,0.06)' }}
              className={`bg-gradient-to-br from-navy/80 to-lightNavy/50 border rounded-xl p-4 md:p-6 border-white/10`}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : idx);
                  }
                }}
                className="w-full flex items-center justify-between gap-4"
              >
                <div className="text-left">
                  <motion.h4
                    layout
                    className="text-white font-semibold text-base md:text-lg"
                    whileHover={{ x: 4 }}
                  >
                    {item.q}
                  </motion.h4>
                  <motion.div layout className="text-slate text-sm mt-1">
                    <span className="opacity-0 select-none">&nbsp;</span>
                  </motion.div>
                </div>

                <div className="flex items-center">
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-green"
                  >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="mt-4 overflow-hidden text-slate text-sm leading-relaxed"
                  >
                    <div className="prose prose-invert max-w-none">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
