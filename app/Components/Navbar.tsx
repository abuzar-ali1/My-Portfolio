// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
  { name: "Certification", href: "#certification" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education", href: "#education" },

];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#projects");

  // Handle scroll effect with Zinc/Slate colors
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-4 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800/50"
          : "py-6 bg-gradient-to-b from-zinc-900/80 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo - Zinc/Slate theme */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600/50 group-hover:border-zinc-500 transition-colors">
                  <Sparkles className="w-4 h-4 text-zinc-300 group-hover:text-zinc-100 transition-colors" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-100 tracking-tight">
                  Abuzar Ali
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400 ml-1">
                    .DEV
                  </span>
                </h1>
                <p className="text-xs text-zinc-500">Frontend Developer</p>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation - Zinc floating pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "hidden md:flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-500 border",
              isScrolled
                ? "bg-zinc-800/30 backdrop-blur-md border-zinc-700/50 shadow-lg shadow-black/20"
                : "bg-zinc-900/30 backdrop-blur-sm border-zinc-600/30"
            )}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveLink(link.href)}
                onMouseLeave={() => setActiveLink("#about")}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  activeLink === link.href
                    ? "text-zinc-100 bg-zinc-800/50"
                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/30"
                )}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full border border-zinc-600/50 -z-10"
                  />
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                className="p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                className="p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Hire Me Button - Slate accent */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-zinc-100 font-semibold text-sm hover:from-slate-600 hover:to-slate-700 transition-all border border-slate-600/50 hover:border-slate-500/50 shadow-lg shadow-slate-900/30"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu - Zinc overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="py-4 px-4 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 shadow-2xl shadow-black/40">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      variants={itemVariants}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-4 text-base font-medium rounded-lg text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Mobile Social & CTA */}
                <div className="flex items-center justify-center gap-4 pt-6 mt-6 border-t border-zinc-800">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://github.com"
                    className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://linkedin.com"
                    className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 text-zinc-100 font-semibold text-sm"
                  >
                    Hire Me
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Progress Indicator - Zinc gradient */}
      <motion.div
        className="h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
}