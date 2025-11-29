import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
}

export default function AnimatedButton({
  href,
  children,
  variant = 'primary',
  target,
  rel,
  onClick,
  className = '',
}: AnimatedButtonProps) {
  const baseClasses = 'relative inline-block px-6 py-3 font-bold rounded-lg overflow-hidden group';

  const variantClasses = {
    primary: 'bg-[#64ffda] text-[#041126] shadow-lg',
    secondary: 'bg-[#ec4899] text-white shadow-lg',
    outline: 'border-2 border-[#64ffda] text-[#64ffda] bg-transparent',
  };

  const isExternalLink = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https');

  const ButtonContent = () => (
    <>
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.12), rgba(255,255,255,0.06))' }}
        initial={{ x: '-50%', opacity: 0.12 }}
        whileHover={{ x: '100%', opacity: 0.4 }}
        transition={{ duration: 0.5 }}
      />

      {/* Glow Effect */}
      {variant !== 'outline' && (
        <motion.div
          className={`absolute -inset-0.5 rounded-lg blur opacity-50 -z-10 ${
            variant === 'primary'
              ? 'bg-gradient-to-r from-green to-green/50'
              : 'bg-gradient-to-r from-pink to-pink/50'
          }`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Border Glow for Outline */}
      {variant === 'outline' && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-green/0"
          animate={{
            borderColor: ['rgba(100, 255, 218, 0)', 'rgba(100, 255, 218, 0.5)', 'rgba(100, 255, 218, 0)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Content */}
      <motion.span
        className="relative flex items-center justify-center gap-2 whitespace-nowrap"
        whileHover={{ letterSpacing: '0.05em' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Bottom Border Animation on Hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileHover={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {isExternalLink ? (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          onClick={onClick}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
          <ButtonContent />
        </a>
      ) : (
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
          <ButtonContent />
        </Link>
      )}
    </motion.div>
  );
}
