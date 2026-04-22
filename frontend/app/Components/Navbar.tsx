"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, CONTACT_INFO } from "../Data/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? window.scrollY / totalHeight : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash || "#about";
    setActiveLink(hash);
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            const hash = `#${(entry.target as HTMLElement).id}`;
            if (hash !== activeLink) {
              setActiveLink(hash);
              window.history.replaceState?.(null, "", hash);
            }
            break;
          }
        }
      },
      { rootMargin: "-100px 0px -200px 0px", threshold: [0.1, 0.3, 0.5] }
    );

    setTimeout(() => {
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.href.replace("#", ""));
        if (el && observerRef.current) observerRef.current.observe(el);
      });
    }, 100);

    return () => observerRef.current?.disconnect();
  }, [activeLink]);

  const scrollToSection = async (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (!el) return;
    isClickingRef.current = true;
    setMobileMenuOpen(false);
    setActiveLink(href);
    await new Promise((r) => setTimeout(r, 50));
    const navH = navbarRef.current?.getBoundingClientRect().height ?? 72;
    window.scrollTo({ top: el.offsetTop - navH, behavior: "smooth" });
    window.history.pushState?.(null, "", href);
    setTimeout(() => { isClickingRef.current = false; }, 1000);
  };

  return (
    <>
      {/* ── Suble Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-[#0077B5] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <motion.nav
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">

            {/* ── Logo ── */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection("#about")}
            >
              <div className="w-9 h-9 rounded-xl bg-[#0077B5] flex items-center justify-center shadow-lg shadow-[#0077B5]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className={cn("text-lg font-bold tracking-tight block leading-none" , isScrolled ? "text-slate-900" : "text-white")}>
                  Abuzar<span className="text-[#0077B5]"> Ali</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Full Stack Developer
                </span>
              </div>
            </div>

            {/* ── Desktop Navigation ── */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "relative px-5 py-2 text-[13px] font-medium transition-all rounded-full",
                      isActive
                        ? "text-white shadow-sm"
                        : isScrolled                          ? "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                        : "text-white hover:text-white hover:bg-[#0077B5]/80"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-[#0077B5] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* ── Socials & CTA ── */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 border-r border-slate-200 pr-4">
                <a href={CONTACT_INFO.github} target="_blank" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={CONTACT_INFO.linkedin} target="_blank" className="p-2 text-slate-400 hover:text-[#0077B5] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={() => scrollToSection("#contact")}
                className="px-6 py-2 bg-slate-900 text-white rounded-full text-[13px] font-semibold hover:bg-slate-800 transition-all active:scale-95"
              >
                Let's Talk
              </button>
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <button
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl md:hidden"
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl text-sm font-medium transition-colors",
                      activeLink === link.href 
                        ? "bg-[#0077B5]/10 text-[#0077B5]" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {link.name}
                    <ChevronRight className={cn("w-4 h-4 transition-transform", activeLink === link.href && "rotate-90")} />
                  </button>
                ))}
              </div>
              <div className="p-6 bg-slate-50 flex items-center justify-between">
                <div className="flex gap-4">
                  <a href={CONTACT_INFO.github} className="text-slate-400 hover:text-slate-900"><Github className="w-5 h-5" /></a>
                  <a href={CONTACT_INFO.linkedin} className="text-slate-400 hover:text-[#0077B5]"><Linkedin className="w-5 h-5" /></a>
                </div>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="px-6 py-2 bg-[#0077B5] text-white rounded-full text-sm font-bold shadow-lg shadow-[#0077B5]/20"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}