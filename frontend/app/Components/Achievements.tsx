"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Award, ExternalLink, Calendar, MapPin, 
  ChevronLeft, ChevronRight, X, ZoomIn, Terminal, 
  Target, Activity, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { achievements, otherAchievements } from "../Data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Achievements() {
  // UX State: Controls the "Master-Detail" view
  const [activeId, setActiveId] = useState(achievements[0].id);
  
  // Gallery Modal State
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeAchievement = achievements.find(a => a.id === activeId) || achievements[0];

  const openImage = (imageId: string) => {
    setSelectedImageId(imageId);
    const index = activeAchievement.images.findIndex(img => img.id === imageId);
    setCurrentImageIndex(index);
  };

  const closeImage = () => setSelectedImageId(null);
  const nextImage = () => setCurrentImageIndex((p) => p === activeAchievement.images.length - 1 ? 0 : p + 1);
  const prevImage = () => setCurrentImageIndex((p) => p === 0 ? activeAchievement.images.length - 1 : p - 1);

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden min-h-screen">
      
      {/* Background Matrix */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none">
        <defs>
          <pattern id="achieve-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#achieve-grid)" />
      </svg>
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00d4ff]/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
              04 / system_milestones
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
            <span className="font-mono text-[10px] text-[#00ff88]/60 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
              STATUS: EXCEPTIONAL
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none">
            Proven
            <span className="block text-white/20">Impact.</span>
          </h2>
        </motion.div>

        {/* ── The Command Center (Master-Detail Layout) ── */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 mb-20">
          
          {/* LEFT: Master List (The Tabs) */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x">
            <div className="hidden lg:flex items-center gap-2 px-2 pb-2 mb-2 border-b border-white/[0.05]">
              <Activity className="w-3.5 h-3.5 text-white/30" />
              <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Select Record</span>
            </div>

            {achievements.map((achievement) => {
              const isActive = activeId === achievement.id;
              return (
                <button
                  key={achievement.id}
                  onClick={() => setActiveId(achievement.id)}
                  className={`relative flex items-center gap-4 p-4 text-left border transition-all duration-300 min-w-[280px] lg:min-w-0 snap-start shrink-0 ${
                    isActive 
                      ? "border-[#00d4ff]/30 bg-[#00d4ff]/[0.03]" 
                      : "border-white/[0.05] bg-[#0a0a0a] hover:bg-white/[0.02] hover:border-white/[0.1]"
                  }`}
                >
                  {/* Magic Layout Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeAchievementTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className={`w-10 h-10 border flex items-center justify-center transition-colors ${isActive ? "border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]" : "border-white/10 bg-white/[0.02] text-white/40"}`}>
                    <achievement.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm line-clamp-1 transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                      {achievement.title}
                    </h3>
                    <p className="font-mono text-[9px] tracking-widest uppercase mt-1 text-white/30">
                      {achievement.date}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detail View (The Content) */}
          <div className="relative border border-white/[0.05] bg-[#0a0a0a] min-h-[500px] overflow-hidden group">
            {/* Ambient Background for active card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00d4ff]/10 to-transparent opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col h-full"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01]">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-[#00d4ff]/50" />
                    <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                      reading_record: {activeAchievement.id}.log
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-[#00ff88]/20 bg-[#00ff88]/10 px-2 py-1">
                    <ShieldCheck className="w-3 h-3 text-[#00ff88]" />
                    <span className="font-mono text-[9px] text-[#00ff88] uppercase tracking-widest">Verified</span>
                  </div>
                </div>

                <div className="p-6 md:p-10 flex-1">
                  {/* High Impact Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00d4ff]/20 bg-[#00d4ff]/[0.03] mb-6">
                    <Target className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="font-mono text-[10px] text-[#00d4ff] tracking-widest uppercase">
                      Impact Level: {activeAchievement.highlight}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                    {activeAchievement.title}
                  </h3>
                  <p className="font-mono text-[12px] text-[#00d4ff]/80 tracking-widest uppercase mb-8">
                    {activeAchievement.subtitle}
                  </p>

                  {/* Telemetry Grid */}
                  <div className="grid sm:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05] mb-8">
                    <div className="bg-[#0a0a0a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-3.5 h-3.5 text-white/20" />
                        <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Result</span>
                      </div>
                      <p className="text-sm font-semibold text-white/90">{activeAchievement.award}</p>
                    </div>
                    <div className="bg-[#0a0a0a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-white/20" />
                        <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Timeframe</span>
                      </div>
                      <p className="text-sm font-semibold text-white/90">{activeAchievement.date}</p>
                    </div>
                    <div className="bg-[#0a0a0a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-white/20" />
                        <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Location</span>
                      </div>
                      <p className="text-sm font-semibold text-white/90">{activeAchievement.location}</p>
                    </div>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-10">
                    {activeAchievement.description}
                  </p>

                  {/* Sleek Inline Gallery */}
                  <div>
                    <h4 className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#00d4ff]" /> Attached_Evidence ({activeAchievement.images.length})
                    </h4>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {activeAchievement.images.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => openImage(img.id)}
                          className="group/img relative w-40 h-28 shrink-0 cursor-pointer border border-white/[0.05] bg-white/[0.02] overflow-hidden"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover opacity-50 group-hover/img:opacity-100 grayscale group-hover/img:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-[#00d4ff]/0 group-hover/img:bg-[#00d4ff]/20 transition-colors duration-300 flex items-center justify-center">
                            <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover/img:opacity-100 transition-opacity transform translate-y-2 group-hover/img:translate-y-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Minor Recognitions (Bento Grid) ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
              // supplementary_data
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
            {otherAchievements.map((achievement, index) => (
              <div key={achievement.title} className="bg-[#0a0a0a] p-8 group hover:bg-[#0d0d0d] transition-colors relative overflow-hidden">
                <div className="w-10 h-10 border border-white/[0.05] bg-white/[0.02] flex items-center justify-center mb-5 group-hover:border-[#00d4ff]/30 group-hover:bg-[#00d4ff]/5 transition-colors">
                  <achievement.icon className="w-4 h-4 text-white/30 group-hover:text-[#00d4ff] transition-colors" />
                </div>
                <h4 className="text-sm font-semibold text-white/80 mb-2">{achievement.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <div className="text-center mt-12 pt-8 border-t border-white/[0.05]">
          <a href="#projects" className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.08] hover:border-[#00d4ff]/30 font-mono text-[11px] tracking-widest text-white/40 hover:text-[#00d4ff] uppercase transition-all">
            <Trophy className="w-3.5 h-3.5" />
            <span>View Associated Projects</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* ── Cyberpunk Image Modal ── */}
        <AnimatePresence>
          {selectedImageId && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-xl"
              onClick={closeImage}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-5xl w-full border border-white/[0.08] bg-[#0a0a0a] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-[#00d4ff]/50" />
                    <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                      inspect: {activeAchievement.images[currentImageIndex]?.id}.jpg
                    </span>
                  </div>
                  <button onClick={closeImage} className="w-8 h-8 flex items-center justify-center border border-white/[0.05] text-white/30 hover:text-white hover:border-white/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Image */}
                <div className="relative aspect-video w-full bg-[#050505] flex items-center justify-center overflow-hidden">
                  <Image
                    src={activeAchievement.images[currentImageIndex]?.src}
                    alt="Achievement Evidence"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="pointer-events-auto w-10 h-10 border border-white/[0.1] bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="pointer-events-auto w-10 h-10 border border-white/[0.1] bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08]">
                  <p className="text-sm font-semibold text-white/80">
                    {activeAchievement.images[currentImageIndex]?.caption}
                  </p>
                  <div className="flex items-center gap-2">
                    {activeAchievement.images.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`transition-all duration-300 ${index === currentImageIndex ? 'w-6 h-1 bg-[#00d4ff]' : 'w-2 h-1 bg-white/10 hover:bg-white/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}