"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Coffee, Copyright, ArrowUp, 
  Mail, Github, Linkedin, Twitter, 
  MapPin, Phone, ExternalLink, Terminal, ShieldCheck
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "// navigation",
    links: [
      { name: "Home", href: "#home" },
      { name: "Projects", href: "#projects" },
      { name: "Skills", href: "#skills" },
      { name: "Certifications", href: "#certifications" },
      { name: "Achievements", href: "#achievements" },
      { name: "Contact", href: "#contact" },
    ]
  },
  {
    title: "// external_resources",
    links: [
      { name: "GitHub", href: "https://github.com/abuzar-ali1", icon: Github },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/abuzar-ali01", icon: Linkedin },
      { name: "Twitter", href: "https://x.com/Abu_zar_Ali", icon: Twitter },
      { name: "Dev Blog", href: "#", icon: ExternalLink },
    ]
  },
  {
    title: "// system_legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Protocol", href: "#" },
    ]
  }
];

const contactInfo = [
  { icon: Mail, text: "abuzarali.dev@gmail.com", href: "mailto:abuzarali.dev@gmail.com" },
  { icon: Phone, text: "Secure Line", href: "#" },
  { icon: MapPin, text: "Lahore, Pakistan", href: "#" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const handleScroll = () => setScrollTop(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.05] overflow-hidden">
      
      {/* ── Background Matrix ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none">
        <defs>
          <pattern id="footer-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00d4ff]/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* ── Top Status Bar ── */}
        <div className="flex items-center gap-4 mb-16 pb-6 border-b border-white/[0.05]">
          <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
            sys.terminate()
          </span>
          <div className="flex-1 h-px bg-white/[0.02]" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00ff88]/60 tracking-widest uppercase">
              All Systems Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* ── Brand Column ── */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/[0.05] bg-white/[0.02] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">AbuZar<span className="text-[#00d4ff]">.dev</span></h2>
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mt-0.5">Full Stack Engineer</p>
              </div>
            </div>
            
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Architecting scalable backend systems and engineering high-performance interfaces. Based in Lahore, PK. Available for global deployment.
            </p>
            
            <div className="space-y-3 pt-2">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <info.icon className="w-4 h-4 text-[#00d4ff]/50" />
                  {info.href !== "#" ? (
                    <a href={info.href} className="font-mono text-[11px] text-white/40 hover:text-white transition-colors tracking-wide">
                      {info.text}
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] text-white/40 tracking-wide">{info.text}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Links Columns ── */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((column, colIndex) => (
              <motion.div 
                key={column.title} 
                custom={colIndex + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="font-mono text-[11px] text-[#00d4ff]/70 uppercase tracking-widest mb-6 border-l-2 border-[#00d4ff]/30 pl-3">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 font-mono text-[11px] text-white/30 hover:text-white transition-colors tracking-wide uppercase"
                      >
                        <span className="text-[#00d4ff]/0 group-hover:text-[#00d4ff]/60 transition-colors">{'>'}</span>
                        {'icon' in link && link.icon ? <link.icon className="w-3.5 h-3.5 text-white/20 group-hover:text-[#00d4ff] transition-colors" /> : null}
                        <span>{link.name}</span>
                        {link.name === "Dev Blog" && (
                          <span className="px-1.5 py-0.5 border border-[#00ff88]/20 bg-[#00ff88]/5 text-[#00ff88] text-[8px] ml-1">NEW</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]"
        >
          {/* Copyright */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-white/20 tracking-widest uppercase">
            <Copyright className="w-3.5 h-3.5" />
            <span>{currentYear} AbuZar Ali.</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              Built with Next.js <ShieldCheck className="w-3 h-3 text-[#00d4ff]/50 mx-0.5" /> Django
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/abuzar-ali1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.05] bg-white/[0.02] text-white/30 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/abuzar-ali01/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.05] bg-white/[0.02] text-white/30 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://x.com/Abu_zar_Ali" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/[0.05] bg-white/[0.02] text-white/30 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* ── Return to Root Button (Scroll Top) ── */}
        <AnimatePresence>
          {scrollTop > 500 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 group flex items-center gap-2 px-4 py-2 border border-[#00d4ff]/30 bg-[#0a0a0a] text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all shadow-[0_0_15px_rgba(0,212,255,0.15)]"
              aria-label="Return to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono text-[10px] tracking-widest uppercase hidden sm:inline">sys.up()</span>
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </footer>
  );
}