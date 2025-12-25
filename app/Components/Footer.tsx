// src/components/Footer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, Coffee, Copyright, ArrowUp, 
  Mail, Github, Linkedin, Twitter, 
  MapPin, Phone, ExternalLink, Sparkles 
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Navigation",
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
    title: "Resources",
    links: [
      { name: "GitHub", href: "https://github.com", icon: Github },
      { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "Blog", href: "#", icon: ExternalLink },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ]
  }
];

const contactInfo = [
  { icon: Mail, text: "hello@abuzar.dev", href: "mailto:hello@abuzar.dev" },
  { icon: Phone, text: "+92 123 456 7890", href: "tel:+921234567890" },
  { icon: MapPin, text: "Karachi, Pakistan", href: "#" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

 const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

  return (
    <footer className="relative border-t border-zinc-800 bg-gradient-to-b from-zinc-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-zinc-800/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-zinc-700/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600/50">
                <Sparkles className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Abuzar Ali</h2>
                <p className="text-sm text-zinc-500">Frontend Developer</p>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed">
              Crafting exceptional digital experiences with modern technologies and clean code.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.text}
                  href={info.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
                  aria-label={info.text}
                >
                  <info.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div 
              key={column.title} 
              variants={itemVariants}
              transition={{ delay: colIndex * 0.05 }}
            >
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (colIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm transition-colors"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span>{link.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8"
        />

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 text-zinc-500 text-sm">
            <Copyright className="w-4 h-4" />
            <span>{currentYear} Abuzar Ali. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> and <Coffee className="w-4 h-4 text-amber-600 mx-1" />
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="text-sm text-zinc-500">Follow my journey:</span>
            <div className="flex items-center gap-2">
              <motion.a
                href="https://github.com/abuzar-ali1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/abuzar-ali01/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://x.com/Abu_zar_Ali"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: scrollTop > 500 ? 1 : 0,
            y: scrollTop > 500 ? 0 : 20
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600 transition-all shadow-lg shadow-black/30 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Absolute bottom note */}
      <div className="border-t border-zinc-800/50 py-4">
        <p className="text-center text-xs text-zinc-600">
          Built with Next.js, Tailwind CSS & Framer Motion • Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}