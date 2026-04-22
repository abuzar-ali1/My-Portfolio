"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, Award, Code, Terminal, 
  Calendar, MapPin, ExternalLink, ChevronRight,
  Sparkles, CheckCircle2, Image as ImageIcon, X
} from "lucide-react";
import Image from "next/image";
import { TIMELINE } from "../Data/data";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Background() {
  const [selectedImg, setSelectedImg] = useState<any>(null);

  return (
    <section id="background" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      
      {/* ── Suble Background Grid ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="bg-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span className=" text-[10px] tracking-[0.2em] uppercase font-bold">
              04 / development_history
            </span>
          </div>
          <h2 style={{"color" : '#030303'}} className="text-4xl sm:text-6xl font-bold tracking-tight leading-none mb-6">
            Education &
            <span className="block text-[#0077B5]">Recognition.</span>
          </h2>
          <p className="text-slate-500 max-w-lg text-lg leading-relaxed">
            A chronological view of my academic foundation and the milestones 
            that define my technical expertise.
          </p>
        </motion.div>

        {/* ── The Unified Timeline ── */}
        <div className="relative">
          {/* Main Vertical Line */}
          <div className="absolute left-[19px] md:left-[31px] top-4 bottom-0 w-px bg-slate-200" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => {
              const isEdu = item.type === "education";
              const isCert = item.type === "certification";
              const isAward = item.type === "achievement";

              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pl-12 md:pl-20 group"
                >
                  {/* Timeline Dot Icon */}
                  <div className={cn(
                    "absolute left-0 md:left-4 top-2 w-10 h-10 rounded-2xl border-4 border-[#FAFAFA] flex items-center justify-center z-10 transition-all duration-300 shadow-sm",
                    isEdu ? "bg-emerald-500 text-white" : 
                    isCert ? "bg-[#0077B5] text-white" : 
                    "bg-amber-500 text-white"
                  )}>
                    <item.icon className="w-4 h-4" />
                  </div>

                  {/* ── Content Card ── */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm hover:shadow-xl hover:border-[#0077B5]/20 transition-all duration-500 group-hover:-translate-y-1">
                    
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3",
                          isEdu ? "bg-emerald-50 text-emerald-600" : 
                          isCert ? "bg-blue-50 text-[#0077B5]" : 
                          "bg-amber-50 text-amber-600"
                        )}>
                          {item.type}
                        </div>
                        <h3 style={{"color" : "#303030"}} className="text-xl md:text-2xl font-bold group-hover:text-[#0077B5] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 font-medium text-sm mt-1">{item.institution}</p>
                      </div>

                      <div className="flex flex-col md:items-end">
                        <span className=" text-xs font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">
                          {item.year}
                        </span>
                        {item.status && (
                          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter mt-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-2xl">
                      {item.description}
                    </p>

                    {/* Tags / Skills Row */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* ── Special Feature: Degree Progress ── */}
                    {isEdu && item.status?.includes("In Progress") && (
                      <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <span>   Completion</span>
                          <span className="text-slate-900">25%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "25%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                          />
                        </div>
                      </div>
                    )}

                    {/* ── Special Feature: Award Evidence Gallery ── */}
                    {isAward && item.images && (
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <ImageIcon className="w-3 h-3" /> Digital Evidence
                        </h4>
                        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                          {item.images.map((img: any, idx: number) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedImg(img)}
                              className="relative w-32 h-20 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 border-white shadow-sm hover:scale-105 transition-transform"
                            >
                              <Image src={img} alt="Evidence" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Final Footer CTA ── */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm mb-6 font-medium">Looking for a deeper technical breakdown?</p>
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-[#0077B5] transition-all group"
          >
            Review Project Repositories
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Lightbox for Evidence Images ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="relative max-w-4xl w-full aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImg} alt="Enlarged evidence" fill className="object-contain p-4" />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/10 hover:bg-slate-900/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}