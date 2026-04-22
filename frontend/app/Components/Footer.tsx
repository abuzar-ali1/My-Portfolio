"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Coffee, Copyright, ArrowUp, 
  Mail, Github, Linkedin, Twitter, 
  MapPin, Phone, ExternalLink, Sparkles, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, CONTACT_INFO } from "../Data/data";

const footerLinks = [
  {
    title: "Project Navigation",
    links: NAV_LINKS
  },
  {
    title: "External Connect",
    links: [
      { name: "GitHub Repository", href: CONTACT_INFO.github, icon: Github },
      { name: "LinkedIn Profile", href: CONTACT_INFO.linkedin, icon: Linkedin },
      { name: "X / Twitter", href: CONTACT_INFO.twitter, icon: Twitter },
      { name: "Tech Articles", href: "#", icon: ExternalLink },
    ]
  },
  {
    title: "System Protocols",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Security Standards", href: "#" },
      { name: "Cookie Architecture", href: "#" },
    ]
  }
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
      transition: { delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <footer className="relative bg-[#0077B5]/[0.02] border-t border-slate-200 overflow-hidden">
      
    
      
      {/* Subtle Blue Glow */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ── Environment Status Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0077B5] flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Abuzar Ali Portfolio</p>
              <p className="text-[10px]  text-slate-400 uppercase tracking-widest font-bold">Last Updated at May 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Environment: Production</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0077B5]" />
              <span className="text-[10px] font-bold text-[#0077B5] uppercase tracking-widest">SSL Encrypted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* ── Brand Summary ── */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Engineering the <span className="text-[#0077B5]">Future.</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-sm">
              Focused on building robust, accessible, and high-performance web experiences. Currently exploring the intersection of Full Stack Engineering and AI Agents.
            </p>
            
            <div className="flex items-center gap-3 pt-4">
              <a href={CONTACT_INFO.github} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all shadow-sm">
                <Github className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.linkedin} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={CONTACT_INFO.twitter} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ── Sitemaps ── */}
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
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-slate-500 hover:text-[#0077B5] transition-colors font-medium"
                      >
                        {link.name}
                        {link.name.includes("Articles") && (
                          <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-[#0077B5] text-[8px] font-bold uppercase tracking-widest">Soon</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Compliance Bar ── */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-200"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Copyright className="w-3.5 h-3.5" />
              <span>{currentYear} Abuzar Ali</span>
            </div>
            <span className="hidden md:inline opacity-30">|</span>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>&</span>
              <Coffee className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </div>

          <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
            LATENCY: 24MS · SECURE_HANDSHAKE: OK
          </p>
        </motion.div>

        {/* ── Scroll to Top (Light Professional Style) ── */}
        <AnimatePresence>
          {scrollTop > 600 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-[#0077B5] hover:-translate-y-1 transition-all active:scale-95"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </footer>
  );
}