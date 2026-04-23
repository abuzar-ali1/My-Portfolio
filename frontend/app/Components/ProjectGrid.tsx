"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink, Layout } from "lucide-react";
import { PROJECTS } from "../Data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function ProjectGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  // We are now using your curated list of 4 high-impact projects
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden"
    >
      {/* ── Suble Background Pattern ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="light-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#light-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-6">
                <Layout className="w-3.5 h-3.5" />
                <span className=" text-[10px] tracking-[0.2em] uppercase font-bold">
                  02 / curated_work
                </span>
              </div>
              <h2 style={{"color" : '#030303'}} className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
                Featured 
                <span className="block text-[#0077B5]">Engineering.</span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              A selection of high-performance applications focused on user experience and robust architecture.
            </p>
          </div>
        </motion.div>

        {/* ── 1. Featured Project (Highlight) ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div 
            className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            onMouseEnter={() => setHovered(featured.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="grid lg:grid-cols-[1fr_1.2fr] items-stretch">
              {/* Content Side */}
              <div className="p-8 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <span className=" text-[11px] font-bold text-slate-300">01</span>
                  <div className="h-px w-8 bg-slate-100" />
                  <span className=" text-[10px] text-[#0077B5] tracking-widest uppercase font-bold">Featured Case Study</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-[#0077B5] transition-colors">
                  {featured.title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {featured.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <a
                    href={featured.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-[#0077B5] text-white rounded-full font-bold text-xs uppercase shadow-lg shadow-[#0077B5]/20 hover:bg-[#00669c] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Preview
                  </a>
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-7 py-3.5 border border-slate-200 text-slate-600 rounded-full font-bold text-xs uppercase hover:bg-slate-50 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative bg-slate-50 overflow-hidden min-h-[350px]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featured.image})` }}
                />
                <div className="absolute inset-0 bg-[#0077B5]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. The Rest (Bento Grid Style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#0077B5]/5 group-hover:border-[#0077B5]/20 transition-colors">
                  <project.icon className="w-5 h-5 text-slate-400 group-hover:text-[#0077B5] transition-colors" />
                </div>
                <div className="flex gap-2">
                  <a 
                    href={project.github} 
                    className="p-2.5 rounded-full border border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
                    target="_blank"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={project.liveLink} 
                    className="p-2.5 rounded-full bg-slate-900 text-white hover:bg-[#0077B5] transition-all"
                    target="_blank"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Text Info */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0077B5] transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-50">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className=" text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center text-center gap-6 pt-12 border-t border-slate-100"
        >
          <p className=" text-sm text-slate-400 font-medium">
            Explore more repositories on{" "}
            <a
              href="https://github.com/abuzar-ali1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077B5] hover:underline font-bold"
            >
              GitHub.com/abuzar-ali1
            </a>
          </p>

          <a
            href="#contact"
            className="group flex items-center gap-3 px-8 py-3.5 border border-slate-200 text-slate-900 rounded-full font-bold text-sm hover:border-[#0077B5] transition-all"
          >
            Start a Collaboration
            <ArrowUpRight className="w-4 h-4 text-[#0077B5] group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}