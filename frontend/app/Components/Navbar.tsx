"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "../Data/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#about");
  const [hoverLink, setHoverLink] = useState<string | null>(null);
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
      navLinks.forEach((link) => {
        const el = document.getElementById(link.href.replace("#", ""));
        if (el && observerRef.current) observerRef.current.observe(el);
      });
    }, 100);

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = async (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (!el) return;
    isClickingRef.current = true;
    setMobileMenuOpen(false);
    setActiveLink(href);
    await new Promise((r) => setTimeout(r, 100));
    const navH = navbarRef.current?.getBoundingClientRect().height ?? 72;
    window.scrollTo({ top: el.offsetTop - navH, behavior: "smooth" });
    window.history.pushState?.(null, "", href);
    setTimeout(() => { isClickingRef.current = false; }, 1000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-[#00d4ff] transition-all duration-100 shadow-[0_0_8px_#00d4ff80]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <motion.nav
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-[72px]">

            {/* ── Logo ── */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer flex items-center gap-3"
              onClick={() => scrollToSection("#about")}
            >
              {/* Terminal icon box */}
              <div className="relative w-8 h-8 border border-[#00d4ff]/40 group-hover:border-[#00d4ff] transition-colors duration-300 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#00d4ff]" />
                {/* corner brackets */}
                <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#00d4ff]" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#00d4ff]" />
              </div>

              <div>
                <p className="text-[15px] font-semibold text-white leading-none tracking-wide font-mono">
                  AbuZar<span className="text-[#00d4ff]">.dev</span>
                </p>
                <p className="text-[10px] text-white/30 font-mono mt-0.5 tracking-widest uppercase">
                  Full Stack Developer
                </p>
              </div>
            </motion.div>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                const isHover = hoverLink === link.href;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoverLink(link.href)}
                    onMouseLeave={() => setHoverLink(null)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-mono tracking-wide transition-colors duration-200 select-none",
                      isActive
                        ? "text-[#00d4ff]"
                        : "text-white/40 hover:text-white/80"
                    )}
                  >
                    {/* Hover / active underline */}
                    <AnimatePresence>
                      {(isActive || isHover) && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#00d4ff]"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#00d4ff]"
                      />
                    )}

                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {/* ── Right Actions ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Social icons */}
              <div className="flex items-center gap-1.5 pr-3 border-r border-white/[0.08]">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://github.com/abuzar-ali1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/30 hover:text-white/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://www.linkedin.com/in/abuzar-ali01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/30 hover:text-[#00d4ff] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Hire Me — sharp rectangle, not pill */}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-5 py-2 border border-[#00d4ff]/50 text-[#00d4ff] font-mono text-[12px] tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:border-[#00d4ff]"
              >
                {/* fill on hover */}
                <span className="absolute inset-0 bg-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Hire Me</span>
              </motion.button>
            </div>

            {/* ── Mobile Toggle ── */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]/98 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = activeLink === link.href;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 border-l-2 font-mono text-[13px] tracking-wide transition-all",
                        isActive
                          ? "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/5"
                          : "border-transparent text-white/40 hover:text-white/80 hover:border-white/20"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile bottom bar */}
              <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <a href="https://github.com/abuzar-ali1" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/abuzar-ali01/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#00d4ff] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="px-5 py-2 border border-[#00d4ff]/50 text-[#00d4ff] font-mono text-[11px] tracking-widest uppercase"
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