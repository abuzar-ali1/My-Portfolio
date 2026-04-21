"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "../Data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dot grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pg-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#00d4ff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pg-dots)" />
      </svg>

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
              02 / selected_work
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="font-mono text-[10px] text-white/15 tracking-widest">
              {PROJECTS.length} projects
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none">
            Things I've
            <span className="block text-white/20">Built.</span>
          </h2>
        </motion.div>

        {/* ── Featured Project ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4"
        >
          <div
            className="group relative border border-white/[0.07] hover:border-[#00d4ff]/25 transition-colors duration-500 overflow-hidden"
            onMouseEnter={() => setHovered(featured.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${featured.image})` }}
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/88 group-hover:bg-[#0a0a0a]/80 transition-colors duration-500" />

            {/* Scan line on hover */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent pointer-events-none"
              animate={hovered === featured.id ? { top: ["0%", "100%"] } : { top: "50%" }}
              transition={{ duration: 2.5, repeat: hovered === featured.id ? Infinity : 0, ease: "linear" }}
            />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 p-8 md:p-12">
              {/* Left */}
              <div>
                {/* Meta row */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">01</span>
                  <div className="px-2.5 py-1 border border-[#00d4ff]/30 font-mono text-[9px] text-[#00d4ff] tracking-widest uppercase">
                    Featured
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
                  {featured.title}
                </h3>

                <p className="text-white/40 text-base leading-relaxed mb-8 max-w-xl">
                  {featured.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-widest text-white/30 border border-white/[0.07] px-3 py-1 uppercase group-hover:border-white/10 group-hover:text-white/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2.5 px-5 py-2.5 border border-white/10 hover:border-[#00d4ff]/40 font-mono text-[11px] tracking-widest text-white/40 hover:text-white uppercase transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source
                  </a>
                  <a
                    href={featured.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-[#00d4ff] font-mono text-[11px] tracking-widest text-[#0a0a0a] font-bold uppercase transition-all hover:opacity-85"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Right — large project number watermark */}
              <div className="hidden lg:flex items-center justify-center pr-4">
                <span className="font-mono text-[120px] font-bold text-white/[0.03] leading-none select-none">
                  01
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Rest of Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
          {rest.map((project, i) => {
            const num = String(i + 2).padStart(2, "0");
            const isHovered = hovered === project.id;

            return (
              <motion.div
                key={project.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative bg-[#0a0a0a] hover:bg-[#0d0d0d] transition-colors duration-300 overflow-hidden"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Background image — subtle */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Cyan left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00d4ff] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                <div className="relative z-10 p-7 flex flex-col h-full min-h-[280px]">
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] text-white/15 tracking-[0.2em]">
                      {num}
                    </span>
                    <div className="w-8 h-8 border border-white/[0.07] group-hover:border-[#00d4ff]/30 flex items-center justify-center transition-colors">
                      <project.icon className="w-4 h-4 text-white/20 group-hover:text-[#00d4ff]/60 transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white/80 group-hover:text-white mb-3 leading-snug transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/30 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-white/40 transition-colors flex-1">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-widest text-white/20 border border-white/[0.06] px-2 py-0.5 uppercase group-hover:text-[#00d4ff]/40 group-hover:border-[#00d4ff]/15 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="font-mono text-[9px] text-white/15 px-2 py-0.5">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] group-hover:border-white/[0.08] transition-colors">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/25 hover:text-white uppercase transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/25 hover:text-[#00d4ff] uppercase transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live
                      </a>
                    </div>

                    <motion.div
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-[#00d4ff]/40 transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]"
        >
          <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase">
            More on GitHub →{" "}
            <a
              href="https://github.com/abuzar-ali1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d4ff]/50 hover:text-[#00d4ff] transition-colors"
            >
              github.com/abuzar-ali1
            </a>
          </p>

          <a
            href="#contact"
            className="group flex items-center gap-2.5 px-6 py-3 border border-white/[0.08] hover:border-[#00d4ff]/30 font-mono text-[11px] tracking-widest text-white/30 hover:text-white uppercase transition-all"
          >
            Start a project
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#00d4ff] transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}