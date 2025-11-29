"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    role: 'Founder & CEO',
    company: 'TechStart Solutions',
    content:
      'Abdullah delivered an exceptional portfolio website that perfectly showcases his 3D design expertise. His attention to detail and innovative use of Three.js impressed us tremendously.',
    rating: 5,
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    name: 'Fatima Khan',
    role: 'Product Manager',
    company: 'Creative Digital',
    content:
      'Working with Abdullah was a game-changer. He transformed our vision into a stunning interactive experience. His communication and professionalism are unmatched in the industry.',
    rating: 5,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 3,
    name: 'Samir Patel',
    role: 'CTO',
    company: 'Innovation Labs',
    content:
      'Abdullah\'s technical skills combined with creative flair resulted in a website that not only looks amazing but performs flawlessly. Highly recommend for any project.',
    rating: 5,
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'BrandForce Inc',
    content:
      'The 3D animations on our website are jaw-dropping. Abdullah understood our brand perfectly and delivered beyond expectations. Our conversion rate improved significantly.',
    rating: 5,
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 5,
    name: 'Marco Rossi',
    role: 'Startup Founder',
    company: 'NextGen AI',
    content:
      'Abdullah helped us stand out in a crowded market with his innovative design approach. He\'s not just a developer—he\'s a creative partner who understands the bigger picture.',
    rating: 5,
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setDirection(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const slide = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 6000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-green text-green" />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            What Clients Say
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-green to-green/50 mx-auto" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-80 md:h-64">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 w-full"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <div
                className={`h-full bg-gradient-to-br ${testimonials[current].gradient} border border-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-between hover:border-green/30 transition-colors`}
              >
                {/* Quote Content */}
                <div>
                  <p className="text-lg text-lightSlate leading-relaxed mb-6 font-light italic">
                    "{testimonials[current].content}"
                  </p>
                </div>

                {/* Author Info & Rating */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {testimonials[current].name}
                    </h3>
                    <p className="text-sm text-slate">
                      {testimonials[current].role} • {testimonials[current].company}
                    </p>
                  </div>
                  <div>{renderStars(testimonials[current].rating)}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => slide(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:translate-x-0 z-10 p-2 rounded-full bg-green/20 hover:bg-green/40 text-green hover:scale-110 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => slide(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-0 z-10 p-2 rounded-full bg-green/20 hover:bg-green/40 text-green hover:scale-110 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
                setAutoplay(false);
                setTimeout(() => setAutoplay(true), 6000);
              }}
              className={`transition-all rounded-full ${
                index === current ? 'bg-green w-8 h-3' : 'bg-white/20 w-3 h-3 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        {autoplay && (
          <div className="text-center mt-6">
            <p className="text-xs text-slate">Auto-rotating • {testimonials.length} testimonials</p>
          </div>
        )}
      </div>
    </section>
  );
}
