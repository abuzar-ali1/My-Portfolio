"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, Calendar, BookOpen,
  ChevronRight, TrendingUp, Award, 
  Target, Sparkles, ExternalLink, Terminal, ShieldCheck, Cpu, Database
} from "lucide-react";
import { educationData, educationStats } from "../Data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Education() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="education" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden min-h-screen">
      
      {/* ── Background Grid ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none">
        <defs>
          <pattern id="edu-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="32" height="32" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-grid)" />
      </svg>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00d4ff]/[0.02] rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

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
              05 / academic_foundation
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
            <span className="font-mono text-[10px] text-white/15 tracking-widest">
              sys.query_education()
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none">
            Knowledge
            <span className="block text-white/20">Base.</span>
          </h2>
        </motion.div>

        {/* ── Telemetry Stats Grid ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05] mb-20"
        >
          {educationStats.map((stat, index) => (
            <div key={stat.label} className="bg-[#0a0a0a] p-6 group hover:bg-[#00d4ff]/[0.03] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Database className="w-3 h-3 text-[#00d4ff]/30" />
              </div>
              <div className="w-8 h-8 border border-white/[0.05] bg-white/[0.01] flex items-center justify-center mb-4 group-hover:border-[#00d4ff]/30 transition-colors">
                <stat.icon className="w-4 h-4 text-white/20 group-hover:text-[#00d4ff] transition-colors" />
              </div>
              <div className="font-mono text-3xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── System Compilation Log (Timeline) ── */}
        <div className="relative max-w-5xl mb-24">
          {/* Main Vertical Trace Line */}
          <div className="absolute left-[15px] md:left-[23px] top-4 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/30 via-white/[0.05] to-transparent" />

          <div className="space-y-12">
            {educationData.map((edu, index) => {
              const isHovered = activeId === edu.id;
              const isInProgress = edu.status === "In Progress";

              return (
                <motion.div
                  key={edu.id}
                  custom={index + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveId(edu.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="relative pl-12 md:pl-20 group"
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-[11px] md:left-[19px] top-6 w-2.5 h-2.5 bg-[#0a0a0a] border ${isInProgress ? 'border-[#00ff88]' : 'border-[#00d4ff]'} transition-all duration-300 z-10 group-hover:bg-[currentColor] ${isInProgress ? 'text-[#00ff88]' : 'text-[#00d4ff]'}`}>
                    {isInProgress && (
                      <span className="absolute -inset-2 bg-[#00ff88]/20 rounded-full animate-pulse -z-10" />
                    )}
                  </div>

                  {/* Horizontal Connector */}
                  <div className="absolute left-[15px] md:left-[23px] top-[28px] w-8 md:w-16 h-px bg-white/[0.05] group-hover:bg-[#00d4ff]/30 transition-colors" />

                  {/* ── Education Card ── */}
                  <div className="relative border border-white/[0.05] bg-[#0a0a0a] hover:bg-[#0d0d0d] transition-colors duration-300 overflow-hidden">
                    {/* Hover Scanline */}
                    <motion.div
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Active Left Border */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-transform duration-300 origin-bottom scale-y-0 group-hover:scale-y-100 ${isInProgress ? 'bg-[#00ff88]' : 'bg-[#00d4ff]'}`} />

                    {/* Card Header (Terminal Style) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01] gap-4">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-white/20" />
                        <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                          module: {edu.degree.split(" ")[0].toLowerCase()}
                        </span>
                      </div>
                      
                      <div className={`inline-flex items-center gap-2 px-2.5 py-1 border font-mono text-[9px] tracking-widest uppercase ${
                        isInProgress ? 'border-[#00ff88]/20 bg-[#00ff88]/10 text-[#00ff88]' : 'border-[#00d4ff]/20 bg-[#00d4ff]/10 text-[#00d4ff]'
                      }`}>
                        {isInProgress ? <Cpu className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                        {edu.status}
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                        {edu.degree}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-widest uppercase text-white/40 mb-6">
                        <span className="flex items-center gap-2 text-[#00d4ff]/80">
                          <GraduationCap className="w-3.5 h-3.5" />
                          {edu.institution}
                        </span>
                        <span className="hidden sm:inline w-1 h-1 bg-white/10" />
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        {edu.gpa && (
                          <>
                            <span className="hidden sm:inline w-1 h-1 bg-white/10" />
                            <span className="flex items-center gap-2 text-[#00ff88]/80">
                              <Award className="w-3.5 h-3.5" />
                              GPA: {edu.gpa}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Terminal Progress Bar for "In Progress" */}
                      {isInProgress && (
                        <div className="mb-8 p-4 border border-[#00ff88]/10 bg-[#00ff88]/[0.02]">
                          <div className="flex justify-between items-end mb-3 font-mono text-[10px] tracking-widest uppercase">
                            <span className="text-[#00ff88]/60">Compilation Progress</span>
                            <span className="text-[#00ff88] font-bold">{edu.progress}%</span>
                          </div>
                          {/* Sleek Line Bar */}
                          <div className="h-[2px] w-full bg-white/[0.05] relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${edu.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                              className="absolute top-0 left-0 bottom-0 bg-[#00ff88] shadow-[0_0_10px_#00ff88]"
                            />
                          </div>
                          <p className="font-mono text-[9px] text-[#00ff88]/40 uppercase tracking-widest mt-3 flex items-center gap-2">
                            <span className="animate-pulse">{'>'}</span> Executing semester protocol...
                          </p>
                        </div>
                      )}

                      <p className="text-white/40 text-sm leading-relaxed mb-8">
                        {edu.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.05]">
                        {/* Coursework / Achievements */}
                        <div>
                          <h4 className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4">
                            {isInProgress ? "// Active_Modules" : "// Key_Outputs"}
                          </h4>
                          <ul className="space-y-3">
                            {(edu.achievements || edu.currentCourses)?.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className={`font-mono text-[10px] mt-0.5 ${isInProgress ? 'text-[#00ff88]/60' : 'text-[#00d4ff]/60'}`}>
                                  {'>'}
                                </span>
                                <span className="text-sm text-white/50">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills Loaded */}
                        <div>
                          <h4 className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-4">
                            // Loaded_Dependencies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(isInProgress 
                              ? ["Algorithms", "Data Structures", "System Architecture", "AI Ethics"]
                              : ["Research Methods", "Analytical Logic", "Physics", "Math"]
                            ).map((skill) => (
                              <span
                                key={skill}
                                className="font-mono text-[9px] tracking-widest text-white/30 border border-white/[0.06] bg-white/[0.01] px-2.5 py-1 uppercase group-hover:border-white/[0.1] transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Future Directives (Academic Goals) ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative border border-white/[0.05] bg-[#0a0a0a] p-8 md:p-12 overflow-hidden"
        >
          {/* Background Graphic */}
          <div className="absolute -right-20 -top-20 w-64 h-64 border-[1px] border-white/[0.03] rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-[1px] border-[#00d4ff]/10 rounded-full" />
          </div>

          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/[0.05] relative z-10">
            <Target className="w-5 h-5 text-[#00d4ff]" />
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Future Directives</h3>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-1">sys.get_career_trajectory()</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            {/* Current Threads */}
            <div>
              <h4 className="font-mono text-[11px] text-[#00d4ff]/70 tracking-widest uppercase mb-5 border-l-2 border-[#00d4ff]/30 pl-3">
                Immediate Execution
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20 mt-1.5 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Complete BS Computer Science with a core focus on scalable Software Engineering.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20 mt-1.5 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Engineer complex backend systems utilizing Django and PostgreSQL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20 mt-1.5 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Secure a high-impact internship to deploy academic theory into production code.</span>
                </li>
              </ul>
            </div>
            
            {/* Future Aspirations */}
            <div>
              <h4 className="font-mono text-[11px] text-[#00ff88]/70 tracking-widest uppercase mb-5 border-l-2 border-[#00ff88]/30 pl-3">
                Long-Term Compilation
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-[#00ff88]/50 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Pursue Masters in Artificial Intelligence or Advanced Distributed Systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#00ff88]/50 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Contribute to open-source infrastructure and academic research in AI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-[#00ff88]/50 shrink-0" />
                  <span className="text-sm text-white/50 leading-relaxed">Architect enterprise-scale applications impacting millions of users.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20 pt-8 border-t border-white/[0.05]"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.08] hover:border-[#00d4ff]/30 font-mono text-[11px] tracking-widest text-white/40 hover:text-white uppercase transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Review Applied Knowledge (Projects)</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:text-[#00d4ff] transition-colors group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}