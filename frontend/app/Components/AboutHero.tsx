"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ArrowRight, Download, Terminal, Cpu, Layers, Zap } from "lucide-react";
import Image from "next/image";
import profilePic from "./../../public/Images/my_profile.png";
import { AboutSocialLinks, AboutStats, roles } from "../Data/data";

// Subtle dot-grid background
function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#00d4ff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

// Typewriter hook
function useTypewriter(text: string, speed = 60, pause = 2800) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");
  const idx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (idx.current < text.length) {
        timer = setTimeout(() => {
          setDisplayed(text.slice(0, idx.current + 1));
          idx.current++;
        }, speed);
      } else {
        timer = setTimeout(() => setPhase("waiting"), pause);
      }
    } else if (phase === "waiting") {
      setPhase("deleting");
    } else {
      if (idx.current > 0) {
        timer = setTimeout(() => {
          idx.current--;
          setDisplayed(text.slice(0, idx.current));
        }, speed / 2);
      } else {
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, phase, text, speed, pause]);

  return displayed;
}

export default function AboutHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const name = useTypewriter("AbuZar Ali", 80, 3000);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 3200);
    return () => clearInterval(iv);
  }, []);

  if (!mounted) return null;

  const currentRole = roles[roleIndex];
  const RoleIcon = currentRole.icon;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <DotGrid />
        {/* Ambient glow — top left */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00d4ff]/[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
        {/* Ambient glow — bottom right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00d4ff]/[0.02] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-20 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* System label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#00d4ff]/60 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88] animate-pulse" />
                <span>sys.init — portfolio_v2.0</span>
              </div>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>

            {/* Terminal prompt + name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3"
            >
              <p className="font-mono text-sm text-white/20 mb-3 tracking-wide">
                <span className="text-[#00d4ff]/50">$</span> whoami
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                {name}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  className="inline-block w-[3px] h-[0.85em] bg-[#00d4ff] ml-1 align-middle"
                />
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 h-9 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-px h-6 bg-[#00d4ff]" />
                  <span className="text-xl text-white/50 font-light tracking-wide">
                    {currentRole.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-base leading-relaxed mb-10 max-w-lg"
            >
              Self-taught full-stack engineer from interior Sindh — building with
              React, Next.js, and Django. I integrate AI into real products and
              figure things out without a safety net.
            </motion.p>

            {/* Stats — terminal readout style */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] mb-10"
            >
              {AboutStats.map((stat, i) => (
                <div key={stat.label} className="bg-[#0a0a0a] p-4 group hover:bg-[#00d4ff]/[0.04] transition-colors">
                  <p className="font-mono text-2xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs + Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Buttons */}
              <div className="flex items-center gap-3">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-6 py-3 bg-[#00d4ff] text-[#0a0a0a] font-mono text-[12px] font-bold tracking-widest uppercase flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Code className="w-3.5 h-3.5" />
                    View Work
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 border border-white/10 hover:border-[#00d4ff]/40 text-white/50 hover:text-white font-mono text-[12px] tracking-widest uppercase transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </motion.a>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {AboutSocialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="w-9 h-9 border border-white/[0.08] hover:border-[#00d4ff]/40 text-white/30 hover:text-[#00d4ff] flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Outer frame with corner brackets */}
            <div className="relative">
              {/* Corner brackets */}
              <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#00d4ff] z-20" />
              <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#00d4ff] z-20" />
              <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#00d4ff] z-20" />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#00d4ff] z-20" />

              {/* Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                <Image
                  src={profilePic}
                  alt="AbuZar Ali — Full Stack Developer"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />

                {/* Scan overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10" />

                {/* Moving scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent z-20"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Bottom overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <p className="font-mono text-[10px] text-[#00d4ff]/60 tracking-widest uppercase mb-1">
                    ID_001 — AbuZar Ali
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_4px_#00ff88] animate-pulse" />
                    <span className="font-mono text-[10px] text-white/40 tracking-widest">
                      Available for internship · Lahore, PK
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side tech tags */}
              <div className="absolute -right-14 top-0 bottom-0 flex flex-col justify-evenly">
                {[
                  { icon: Layers, label: "React" },
                  { icon: Terminal, label: "Django" },
                  { icon: Cpu, label: "AI" },
                  { icon: Zap, label: "Next.js" },
                ].map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: -4 }}
                    className="flex flex-col items-center gap-1 group cursor-default"
                  >
                    <div className="w-9 h-9 border border-white/[0.08] group-hover:border-[#00d4ff]/40 flex items-center justify-center transition-colors bg-[#0a0a0a]">
                      <Icon className="w-4 h-4 text-white/20 group-hover:text-[#00d4ff] transition-colors" />
                    </div>
                    <span className="font-mono text-[8px] text-white/15 group-hover:text-[#00d4ff]/50 tracking-widest uppercase transition-colors">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Coordinate label */}
            <p className="font-mono text-[9px] text-white/15 tracking-widest mt-4 text-center">
              28.0473° N, 68.7120° E — Kandhkot, Sindh
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
          <span className="font-mono text-[9px] text-white/15 tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}