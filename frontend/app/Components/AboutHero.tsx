"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ArrowRight, FileText, Globe, Layers, Zap, Sparkles, Phone } from "lucide-react";
import Image from "next/image";
import profilePic from "./../../public/Images/my_profile.png";
import { CONTACT_INFO, QUICK_STATS, roles } from "../Data/data";
import Contact from "./Contact";

// Typewriter hook for the name
function useTypewriter(text: string, speed = 80, pause = 3000) {
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
  const name = useTypewriter("Abuzar Ali", 100, 4000);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 3500);
    return () => clearInterval(iv);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* ── Suble Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0077B5]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0077B5]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-24 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="order-2 lg:order-1">
            
        

            {/* Name Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]"
              style={{"color" : "#030303"}}
              >
                {name}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[4px] h-[0.9em] bg-[#0077B5] ml-2 align-middle"
                />
              </h1>
            </motion.div>

            {/* Role Switcher */}
            <div className="mb-8 h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-xl sm:text-2xl text-[#0077B5] font-medium"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="tracking-tight">{roles[roleIndex].title}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Professional Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl "
            >
              Building the next generation of web applications. I specialize in 
              bridging the gap between robust <span className="text-slate-900 font-semibold">Backend Architecture</span> and 
              seamless <span className="text-slate-900 font-semibold">Frontend Experiences</span>. 
              Currently refining my craft with React, Django, and AI integrations.
            </motion.p>

            {/* Dynamic Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {QUICK_STATS.map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-[#0077B5]/20 transition-colors">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="px-8 py-3.5 bg-[#0077B5] text-white rounded-full font-semibold text-sm shadow-lg shadow-[#0077B5]/20 hover:bg-[#00669c] transition-all flex items-center gap-2 group"
              >
                <Code className="w-4 h-4" />
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 border border-slate-200 text-slate-600 rounded-full font-semibold text-sm hover:text-white hover:bg-[#030303] hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Let's Talk......
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Profile Showcase ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            {/* The Image Container */}
            <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl">
              <Image
                src={profilePic}
                alt="Abuzar Ali"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              
              {/* Floating Tech Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stack Status</p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                    <div className="w-2 h-2 rounded-full bg-[#0077B5]" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-[#0077B5] rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-100 rounded-full" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-50 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}