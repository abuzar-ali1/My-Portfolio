"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, Code, Database, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tier = "Proficient" | "Building" | "Learning";

interface Skill {
  name: string;
  tier: Tier;
  note?: string;
}

interface Category {
  id: string;
  label: string;
  icon: any;
  description: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code,
    description: "Core expertise in modern interfaces and responsive architecture.",
    skills: [
      { name: "React.js",     tier: "Proficient", note: "Primary Framework"   },
      { name: "Next.js",      tier: "Proficient", note: "SaaS Architecture"   },
      { name: "Tailwind CSS", tier: "Proficient", note: "Design Systems"      },
      { name: "JavaScript",   tier: "Proficient", note: "ES6+ Logic"          },
      { name: "TypeScript",   tier: "Building",   note: "Type-Safe Dev"       },
      { name: "Redux",        tier: "Building",   note: "State Management"    },
      { name: "Framer Motion",tier: "Building",   note: "Interaction Design"  },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Database,
    description: "Server-side logic with a focus on Python and API design.",
    skills: [
      { name: "Django",       tier: "Building",   note: "Scalable Backends"   },
      { name: "Python",       tier: "Building",   note: "Core Language"       },
      { name: "Django REST",  tier: "Building",   note: "API Engineering"     },
      { name: "REST APIs",    tier: "Proficient", note: "Architecture"        },
      { name: "PostgreSQL",   tier: "Learning",   note: "Database Design"     },
    ],
  },
  {
    id: "ai",
    label: "AI Systems",
    icon: Sparkles,
    description: "Integrating LLMs and intelligent agents into web products.",
    skills: [
      { name: "Groq API",     tier: "Building",   note: "Inference Speed"     },
      { name: "Llama (LLM)",  tier: "Building",   note: "Prompt Design"       },
      { name: "HuggingFace",  tier: "Learning",   note: "Model Integration"   },
      { name: "LangChain",    tier: "Learning",   note: "Agentic Chains"      },
    ],
  },
  {
    id: "tools",
    label: "Workflow",
    icon: Terminal,
    description: "Industry-standard tools for deployment and version control.",
    skills: [
      { name: "Git & GitHub", tier: "Proficient", note: "Version Control"     },
      { name: "Vercel",       tier: "Proficient", note: "Cloud Deployment"    },
      { name: "Postman",      tier: "Building",   note: "API Testing"         },
      { name: "VS Code",      tier: "Proficient", note: "Primary IDE"         },
    ],
  },
];

const ADDITIONAL = [
  "Responsive Design", "Git Workflow", "Component Architecture", 
  "Web Performance", "API Integration", "SEO Basics", "Accessibility"
];

const TIER_STYLE: Record<Tier, { bg: string; text: string; dot: string }> = {
  Proficient: {
    bg: "bg-[#0077B5]/10",
    text: "text-[#0077B5]",
    dot: "bg-[#0077B5]",
  },
  Building: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },
  Learning: {
    bg: "bg-slate-50",
    text: "text-slate-400",
    dot: "bg-slate-200",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Skills() {
  const [active, setActive] = useState<string>("frontend");
  const activeCategory = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      
      {/* ── Background Grid ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="skill-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#skill-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] text-[#0077B5] font-bold tracking-[0.2em] uppercase">
              03 / technical_stack
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <h2 style={{"color" : '#030303'}} className="text-4xl sm:text-6xl font-bold tracking-tight leading-none mb-6">
            Core
            <span className="block text-[#0077B5]">Competencies.</span>
          </h2>

          {/* Professional Honest Alert */}
          <div className="inline-flex items-start gap-3 p-4 rounded-2xl bg-[#0077B5]/5 border border-[#0077B5]/10 max-w-2xl">
            <Info className="w-5 h-5 text-[#0077B5] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-[#0077B5]">Engineering Transparency:</span> No arbitrary percentage bars. 
              Skills are categorized by real-world application: <strong>Proficient</strong> (Production-ready), 
              <strong>Building</strong> (Active Projects), and <strong>Learning</strong> (Research & Development).
            </p>
          </div>
        </motion.div>

        {/* ── Body: Master-Detail Layout ── */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 mb-12">

          {/* Category Selection Sidebar */}
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "relative w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
                    isActive 
                      ? "bg-white shadow-md border-slate-100 border" 
                      : "hover:bg-slate-100/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute left-2 w-1.5 h-6 bg-[#0077B5] rounded-full"
                    />
                  )}
                  <cat.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-[#0077B5]" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className={cn(
                    "font-bold text-sm tracking-tight transition-colors",
                    isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                  )}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Skill Panel */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10">
                  <h3 style={{"color" : "#303030"}} className="text-2xl font-bold font-boldmb-2">{activeCategory.label}</h3>
                  <p className="text-slate-500 text-base">{activeCategory.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeCategory.skills.map((skill, i) => {
                    const style = TIER_STYLE[skill.tier];
                    return (
                      <motion.div
                        key={skill.name}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-bold text-slate-800 group-hover:text-[#0077B5] transition-colors">
                            {skill.name}
                          </p>
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg  text-[9px] font-bold uppercase tracking-widest",
                            style.bg, style.text
                          )}>
                            {skill.tier}
                          </span> 
                        </div>
                        <p className="text-[11px]  uppercase tracking-widest text-slate-400">
                          {skill.note}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Quick Telemetry ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Engineering Depth", val: "Full Stack" },
            { label: "Active Research", val: "Agentic AI" },
            { label: "Project Velocity", val: "High" },
            { label: "Code Quality", val: "Strict" },
          ].map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-white border border-slate-100 text-center">
              <p className="text-xl font-bold text-slate-900">{s.val}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Additional Tech Tags ── */}
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {ADDITIONAL.map((s) => (
              <span 
                key={s} 
                className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-semibold text-slate-500 hover:border-[#0077B5] hover:text-[#0077B5] transition-all cursor-default"
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href="#projects"
            className="group inline-flex items-center gap-3 font-bold text-sm text-[#0077B5] whitespace-nowrap"
          >
            Review Code Execution
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}