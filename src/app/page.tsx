"use client"; // Required for animations

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code, Terminal, Cpu, Menu, X, Instagram, MessageCircle } from 'lucide-react';
import TiltCard from './components/TiltCard';
import HeroCanvasLoader from './components/HeroCanvasLoader';
import StarterBot from './components/StarterBot';
import AnimatedButton from './components/AnimatedButton';
import HeroScene from './components/HeroScene';

// --- Data (Edit this to match your resume) ---

const EXPERIENCES = [
  {
    company: "Fiverr",
    role: "Web Developer",
    period: "Sep 2023 - Present",
    desc: [
      "Actively building e-commerce platforms and custom website solutions for global clients.",
      "Specializing in React.js, Next.js, WordPress design, and full-stack web development.",
      "Providing frontend development, site builds, and web application development services.",
      "Open to remote roles and seeking opportunities to collaborate on impactful projects."
    ]
  },
  {
    company: "Abbottabad University of Science and Technology (AUST)",
    role: "Bachelor of Science - Computer Science",
    period: "Feb 2024 - Feb 2028",
    desc: [
      "Currently pursuing BS in Computer Science with Grade A.",
      "Coursework in C++, MySQL, and advanced programming concepts.",
      "Building strong foundation in algorithms, data structures, and web technologies."
    ]
  }
];

const PROJECTS = [
  {
    title: "E-Commerce & Site Build Solutions",
    desc: "Developed full-stack e-commerce platforms and custom websites for clients worldwide. Built with React.js, Next.js, Node.js, and integrated payment solutions.",
    stack: ["React.js", "Next.js", "Node.js", "MySQL", "Tailwind CSS"],
    link: "https://www.fiverr.com"
  },
  {
    title: "WordPress Design & Development",
    desc: "Custom WordPress theme development and website design. Focused on SEO optimization, responsive design, and user experience.",
    stack: ["WordPress", "PHP", "CSS", "JavaScript"],
    link: "https://www.fiverr.com"
  },
  {
    title: "Mobile Application Development",
    desc: "Full-featured mobile applications with responsive design and cross-platform compatibility. Built with modern frameworks and best practices.",
    stack: ["React Native", "JavaScript", "Node.js", "Firebase"],
    link: "https://www.fiverr.com"
  }
];

// --- New Skill Data with Proficiency (Customize the levels and colors) ---

const SKILL_PROFICIENCY = [
  { name: "React.js", level: 92, color: "bg-green" },
  { name: "JavaScript", level: 90, color: "bg-yellow-400" },
  { name: "Next.js", level: 88, color: "bg-blue-500" },
  { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
  { name: "WordPress", level: 85, color: "bg-indigo-400" },
  { name: "Node.js", level: 85, color: "bg-yellow-600" },
  { name: "PHP", level: 80, color: "bg-orange-500" },
  { name: "MySQL", level: 80, color: "bg-indigo-500" },
  { name: "CSS", level: 90, color: "bg-pink-500" },
  { name: "C++", level: 75, color: "bg-red-500" },
  { name: "Mobile Application Development", level: 80, color: "bg-purple-500" },
  { name: "Adobe Photoshop", level: 80, color: "bg-blue-400" },
  { name: "Web Development", level: 92, color: "bg-green-500" },
  { name: "Front-End Development", level: 92, color: "bg-cyan-400" },
  { name: "E-Commerce", level: 85, color: "bg-yellow-500" },
];


// --- Components ---

// --- Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// --- New Animated Skill Component ---
const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    // Animate when the component scrolls into view
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.3 }}
    className="mb-6"
  >
    <div className="flex justify-between mb-1 font-mono text-sm text-lightSlate">
      <span>{name}</span>
      <span className="text-green">{level}%</span>
    </div>
    <div className="w-full bg-lightNavy rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        // Animate the width to the specified percentage
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }} // Smooth, springy animation
        viewport={{ once: true, amount: 0.5 }}
        className={`h-2 rounded-full ${color}`}
      />
    </div>
  </motion.div>
);


const Navbar = () => null; // Removed - using UltimateNavbar in layout instead

const DiscordIcon = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href="https://discord.com/users/869359283429584926"
      target="_blank"
      rel="noopener noreferrer"
      title="Discord"
      className="text-lightSlate hover:text-green hover:-translate-y-1 transition"
      aria-label="Discord"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
        <path d="M104.4 104.5c-5.7 0-10.3 5-10.3 11.1s4.6 11.1 10.3 11.1 10.3-5 10.3-11.1-4.6-11.1-10.3-11.1zm36.2 0c-5.7 0-10.3 5-10.3 11.1s4.6 11.1 10.3 11.1 10.3-5 10.3-11.1-4.6-11.1-10.3-11.1z" />
        <path d="M201.5 36s-18.1-14.3-41.8-16.1c-3.1-.2-6.2-.4-9.3-.5-35.8-.9-71.3.2-104.2 8.9C21.1 40.9 6 52.8 6 52.8s17.9 62.4 65.7 97.6c0 0-5.9 30.3-22 49 0 0 22.4 6.2 49.1-13.1 0 0 18.2 12.4 52.4 12.4 34.2 0 52.4-12.4 52.4-12.4 26.7 19.3 49.1 13.1 49.1 13.1-16.1-18.7-22-49-22-49 47.7-35.2 65.6-97.6 65.6-97.6s-15.1-11.9-44.8-18.9z" />
      </svg>
    </a>
  );
};

const SocialLinks = () => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }} // Appears after the Hero text
    className="hidden lg:flex fixed left-10 bottom-0 flex-col gap-6 items-center text-lightSlate after:content-[''] after:w-[1px] after:h-24 after:bg-lightSlate after:block"
  >
    <a href="https://github.com/Abdullah0450" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><Github size={20} /></a>
    <a href="https://www.fiverr.com/sellers/abdullahmali537/" target="_blank" rel="noopener noreferrer" title="Fiverr Profile" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><Code size={20} /></a>
    <a href="https://www.linkedin.com/in/abdullah-m-4a3b38296/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><Linkedin size={20} /></a>
    <a href="https://www.instagram.com/abdullah_malik_oo5/" target="_blank" rel="noopener noreferrer" title="Instagram Profile" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><Instagram size={20} /></a>
    <a href="https://wa.me/923495538902" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><MessageCircle size={20} /></a>
    <a href="mailto:malik.abdullah.232004@gmail.com" title="Email Me" className="text-lightSlate hover:text-green hover:-translate-y-1 transition"><Mail size={20} /></a>
    <DiscordIcon />
  </motion.div>
);

const Hero = () => (
  <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20" suppressHydrationWarning>
    {/* Full-screen particle background */}
    <div className="absolute inset-0 z-0 opacity-60" suppressHydrationWarning>
      <HeroScene isBackground />
    </div>

    {/* Dark overlay for text readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/60 to-navy/40 z-5 pointer-events-none"></div>

    <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
      {/* Left side - Text content only (no grid, full width) */}
      <motion.div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <p className="text-green font-mono text-sm md:text-base mb-2 tracking-widest uppercase">Welcome to my portfolio</p>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-2">
              Abdullah Malik.
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-green to-pink rounded-full"></div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-lightSlate">
              Aspiring Web Developer
            </h2>
            <p className="text-lg font-semibold text-green">MERN Stack Specialist</p>
            <p className="text-base md:text-lg text-slate leading-relaxed max-w-lg">
              Crafting modern, responsive web experiences with <span className="text-green font-semibold">React.js</span>, 
              <span className="text-green font-semibold"> JavaScript</span>, and <span className="text-green font-semibold">Next.js</span>. 
              Specialized in <span className="text-pink font-semibold">WordPress</span>, <span className="text-pink font-semibold">E-Commerce</span>, 
              and <span className="text-pink font-semibold">Mobile Applications</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {['React.js', 'JavaScript', 'Next.js', 'WordPress', 'E-Commerce'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`px-3 py-1 text-xs md:text-sm font-mono rounded-full border cursor-pointer transition ${
                  skill === 'WordPress' || skill === 'E-Commerce'
                    ? 'bg-pink/10 text-pink border-pink/30 hover:bg-pink/20 hover:border-pink/50 hover:shadow-lg hover:shadow-pink/20'
                    : 'bg-green/10 text-green border-green/30 hover:bg-green/20 hover:border-green/50 hover:shadow-lg hover:shadow-green/20'
                }`}>
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-6">
            <div className="flex-1 h-px bg-gradient-to-r from-green to-transparent"></div>
            <p className="text-green font-mono text-sm font-bold">🔴 OPEN TO WORK</p>
            <div className="flex-1 h-px bg-gradient-to-l from-green to-transparent"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-4 flex flex-wrap gap-4"
          >
            <AnimatedButton href="#projects" variant="primary">
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              View My Work
            </AnimatedButton>

            <AnimatedButton href="#contact" variant="outline">
              Get in Touch
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// --- Updated About Component (This now uses the SkillBar component) ---

const About = () => (
  <section id="about" className="py-24 max-w-5xl mx-auto px-6">
    <FadeIn>
      <h2 className="flex items-center text-2xl md:text-3xl font-bold text-white mb-12">
        <span className="text-green font-mono text-xl mr-2">01.</span> About Me & Skills
        <span className="h-px bg-white/20 flex-grow ml-6"></span>
      </h2>

      <div className="grid md:grid-cols-5 gap-12">

        {/* About Text & Skills (md:col-span-3) */}
        <div className="md:col-span-3 text-slate text-lg leading-relaxed space-y-4">
          <p>
            Hello! I'm Abdullah Malik, an aspiring web developer and MERN Stack enthusiast with a passion for building clean, functional digital experiences. Currently pursuing a BS in Computer Science at Abbottabad University of Science and Technology (AUST) with a Grade A average.
          </p>
          <p>
            I specialize in <span className="text-green">React.js & JavaScript</span>, <span className="text-green">Next.js</span>, <span className="text-green">WordPress development</span>, <span className="text-green">e-commerce solutions</span>, and <span className="text-green">mobile application development</span>. As a Web Developer on Fiverr, I've delivered 500+ connections and countless projects to clients worldwide.
          </p>
          <p>
            I'm actively seeking remote opportunities and collaborations on impactful projects. I bring expertise in frontend development, site builds, and full-stack solutions with a strong foundation in PHP, MySQL, C++, and modern web technologies. <span className="text-green font-bold\">🔴 OPEN TO WORK</span> for Web Developer, Frontend Developer, and WordPress Developer roles.
          </p>

          <div className="pt-6">
            <h3 className="text-white font-bold text-xl mb-4">My Core Technical Skills:</h3>
            {/* NEW ANIMATED SKILLS INTEGRATION */}
            <div className="space-y-4">
              {SKILL_PROFICIENCY.map(skill => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image (md:col-span-2) - Unchanged */}
        <div className="md:col-span-2 relative group">
          <div className="aspect-square bg-green/20 rounded hover:bg-transparent transition duration-300 relative z-10 border-2 border-green">
            <div className="absolute inset-0 flex items-center justify-center text-green/50 font-mono">
              [Profile Image]
            </div>
          </div>
          <div className="absolute w-full h-full border-2 border-green rounded top-4 left-4 -z-0 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
        </div>
      </div>
    </FadeIn>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-24 max-w-3xl mx-auto px-6">
    {/* FadeIn Wrapper Added Here */}
    <FadeIn>
      <h2 className="flex items-center text-2xl md:text-3xl font-bold text-white mb-12">
        <span className="text-green font-mono text-xl mr-2">02.</span> Where I've Worked
        <span className="h-px bg-white/20 flex-grow ml-6"></span>
      </h2>

      <div className="space-y-12 border-l-2 border-white/10 ml-3 md:ml-0">
        {EXPERIENCES.map((job, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-navy border-2 border-green"></span>
            <h3 className="text-xl font-bold text-white">
              {job.role} <span className="text-green">@ {job.company}</span>
            </h3>
            <p className="font-mono text-sm text-lightSlate mb-4">{job.period}</p>
            <ul className="space-y-2">
              {job.desc.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate text-sm md:text-base">
                  <span className="text-green mt-1.5">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </FadeIn>
    {/* End of FadeIn Wrapper */}
  </section>
);

const Projects = () => (
  <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
    {/* Main FadeIn for the section heading */}
    <FadeIn>
      <h2 className="flex items-center text-2xl md:text-3xl font-bold text-white mb-12">
        <span className="text-green font-mono text-xl mr-2">03.</span> Some Things I've Built
        <span className="h-px bg-white/20 flex-grow ml-6"></span>
      </h2>
    </FadeIn>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((project, index) => (
        // FadeIn applied to each card with a staggered delay
        <FadeIn key={index} delay={index * 0.1}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <TiltCard className="project-card-3d p-8 rounded-lg transition duration-300 group border border-green/20 hover:border-green/50 flex flex-col h-full bg-gradient-to-br from-navy/40 to-lightNavy/20 backdrop-blur-sm hover:shadow-lg hover:shadow-green/20 min-h-[340px]">
              <div className="flex justify-between items-center mb-6">
                <Code size={40} className="text-green" />
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate hover:text-green transition"
                >
                  <ExternalLink size={22} />
                </motion.a>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green transition">{project.title}</h3>
              <p className="text-slate mb-6 text-sm leading-relaxed flex-grow">{project.desc}</p>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-slate mt-auto mb-6">
                {project.stack.map((tech) => (
                  <motion.span 
                    key={tech}
                    whileHover={{ scale: 1.15, color: '#64ffda' }}
                    className="px-2 py-1 bg-green/10 rounded transition"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <AnimatedButton href={project.link} variant="secondary" className="w-full text-center">
                View Project
              </AnimatedButton>
            </TiltCard>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 px-6 text-center max-w-2xl mx-auto mb-20">
    {/* FadeIn Wrapper Added Here */}
    <FadeIn>
      <p className="text-green font-mono mb-4">04. What's Next?</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
      <p className="text-slate text-lg mb-10">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
      </p>
      <AnimatedButton href="/contact" variant="primary">
        Say Hello 👋
      </AnimatedButton>
    </FadeIn>
    {/* End of FadeIn Wrapper */}
  </section>
);

// --- New Component: Infinite Slider ---
const InfiniteSlider = () => {
  // Use a simplified set of core tech for the slider
  const CORE_TECH = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Framer Motion",
    "Adobe Photoshop",
    "PHP",
    "Mobile Applications",
    "MySQL",
    "CSS",
    "C++",
    "Front-End Development",
    "Web Development",
    "E-Commerce",
    "Site Build"
  ];

  // We duplicate the list to ensure a seamless loop transition
  const duplicatedTech = [...CORE_TECH, ...CORE_TECH];

  return (
    <div className="py-12 relative overflow-hidden bg-lightNavy/50">
      <h3 className="text-center text-slate font-mono text-lg mb-6">Technologies I Love</h3>
      <div className="flex w-[200%] md:w-[150%] animate-slide">
        {/* The width must be greater than 100% to create the loop effect */}
        {duplicatedTech.map((tech, index) => (
          <div key={index} className="flex-shrink-0 flex justify-center items-center px-8">
            <span className="text-white text-xl md:text-2xl font-bold whitespace-nowrap opacity-70 hover:opacity-100 transition duration-300">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    className="text-center py-6 text-slate font-mono text-xs hover:text-green cursor-pointer transition"
  >
    <a href="https://github.com/bchiang7/v4" target="_blank">
      <div>Designed & Built by Abdullah Malik</div>
      <div className="mt-1">Using Next.js & Tailwind</div>
    </a>
  </motion.footer>
);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // hide intro automatically after some time is handled by StarterBot as well
  }, []);

  return (
    <main className="bg-navy min-h-screen selection:bg-green selection:text-navy overflow-x-hidden">
      <Navbar />
      <SocialLinks />
      <div className="px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
      <Footer />

      {/* Intro overlay with 3D starter bot */}
      {showIntro && (
        <div className="intro-overlay" role="dialog" aria-modal="true">
          <div className="intro-card">
            <div className="intro-content">
              <div className="intro-title">Hi — I'm your interactive portfolio assistant</div>
              <div className="intro-desc">Welcome! I'm a small 3D bot that introduces the site. Click "Enter" to continue or wait a moment and I'll move aside automatically.</div>
              <div className="intro-actions">
                <button className="btn-primary" onClick={() => setShowIntro(false)}>Skip</button>
                <button className="btn-secondary" onClick={() => setShowIntro(false)}>Enter Site</button>
              </div>
            </div>
            <div className="intro-canvas">
              <StarterBot onClose={() => setShowIntro(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}