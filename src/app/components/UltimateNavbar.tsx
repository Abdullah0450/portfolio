"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function UltimateNavbar() {
  return (
    <header className="header">
      {/* Logo/Title */}
      <motion.a
        href="/"
        className="navbar-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        MALIK
      </motion.a>

      {/* Email (center, hidden on mobile) */}
      <motion.a
        href="mailto:malik@example.com"
        className="navbar-connect flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Mail size={16} />
        malik@example.com
      </motion.a>

      {/* Navigation Links */}
      <ul>
        <li>
          <Link href="#about" className="hover-link">
            <span className="hover-in">
              <div>ABOUT</div>
              <div>ABOUT</div>
            </span>
          </Link>
        </li>
        <li>
          <Link href="#experience" className="hover-link">
            <span className="hover-in">
              <div>WORK</div>
              <div>WORK</div>
            </span>
          </Link>
        </li>
        <li>
          <Link href="#projects" className="hover-link">
            <span className="hover-in">
              <div>PROJECTS</div>
              <div>PROJECTS</div>
            </span>
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover-link">
            <span className="hover-in">
              <div>CONTACT</div>
              <div>CONTACT</div>
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
}
