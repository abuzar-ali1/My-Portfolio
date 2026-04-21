"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Globe, ChevronRight, Sparkles, Terminal, ShieldCheck } from "lucide-react";
import { certifications, stats } from "../Data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="certifications"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
    >
      {/* ── Dot grid background ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <defs>
          <pattern id="cert-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#00d4ff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cert-dots)" />
      </svg>

      {/* Ambient glow right */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#00d4ff]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
              03 / credentials
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="font-mono text-[10px] text-white/15 tracking-widest">
              sys.verify_certs()
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none">
            Verified
            <span className="block text-white/20">Expertise.</span>
          </h2>
        </motion.div>

        {/* ── Stats Terminal Grid ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] mb-16"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-[#0a0a0a] p-6 group hover:bg-[#00d4ff]/[0.04] transition-colors">
              <stat.icon className="w-5 h-5 text-white/20 group-hover:text-[#00d4ff] mb-4 transition-colors" />
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                  {stat.value}
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Certifications List (System Log Style) ── */}
        <div className="space-y-4 mb-16">
          {certifications.map((cert, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isHovered = hoveredId === cert.id;

            return (
              <motion.div
                key={cert.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#0a0a0a] border border-white/[0.05] hover:bg-[#0d0d0d] transition-colors duration-300 overflow-hidden"
              >
                {/* Cyan left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00d4ff] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
                  
                  {/* Left: Meta Info */}
                  <div className="flex lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-4 lg:w-48 flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-white/15 tracking-[0.2em]">
                        {num}
                      </span>
                      <div className="w-10 h-10 border border-white/[0.07] group-hover:border-[#00d4ff]/30 flex items-center justify-center transition-colors bg-[#0a0a0a]">
                        <cert.icon className="w-4 h-4 text-white/20 group-hover:text-[#00d4ff]/60 transition-colors" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end lg:items-start text-right lg:text-left gap-1.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00d4ff]/70 tracking-widest uppercase">
                        <Calendar className="w-3 h-3" /> {cert.period}
                      </div>
                      <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase px-2 py-0.5 border border-white/[0.06]">
                        {cert.duration}
                      </div>
                    </div>
                  </div>

                  {/* Center: Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white/90 group-hover:text-white mb-2 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest mb-4">
                      <Globe className="w-3.5 h-3.5" />
                      {cert.institution}
                    </div>
                    <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-2xl group-hover:text-white/40 transition-colors">
                      {cert.description}
                    </p>

                    {/* Tech / Skills tags */}
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[9px] tracking-widest text-white/20 border border-white/[0.06] px-2.5 py-1 uppercase group-hover:text-[#00d4ff]/50 group-hover:border-[#00d4ff]/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Validation indicator (Only visible on hover) */}
                  <div className="hidden lg:flex items-center justify-center w-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShieldCheck className="w-5 h-5 text-[#00ff88]/50" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Continuous Learning Protocol ── */}
        <motion.div
          custom={certifications.length + 1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-white/[0.05] bg-[#0a0a0a] p-8 md:p-10 relative overflow-hidden"
        >
          {/* Subtle animated scanline */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.05]">
            <Terminal className="w-4 h-4 text-[#00d4ff]/50" />
            <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">
              exec continuous_learning.sh
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-[9px] text-[#00ff88] uppercase tracking-widest">Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-10">
            <div>
              <h4 className="font-mono text-[12px] text-white/50 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" /> Philosophy
              </h4>
              <p className="text-sm text-white/30 leading-relaxed">
                Technology moves too fast for static knowledge. I treat my skill set as a continuous integration pipeline—always learning, testing, and deploying new concepts into my workflow.
              </p>
            </div>
            
            <div>
              <h4 className="font-mono text-[12px] text-white/50 tracking-widest uppercase mb-4">
                // Current Focus Threads
              </h4>
              <ul className="space-y-3">
                {[
                  "Advanced Next.js App Router Architecture",
                  "AI Integration & LLM Fine-Tuning Patterns",
                  "PostgreSQL Performance Optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[#00d4ff]/40 text-[10px] mt-0.5">{`>`}</span>
                    <span className="font-mono text-[11px] text-white/40 tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}