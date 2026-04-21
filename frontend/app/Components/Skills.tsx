"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Honest, internship-accurate skill data ───────────────────────────────────
// Three tiers — no fake percentages.
// Proficient = used in real projects, comfortable without googling basics
// Building   = actively using, still deepening knowledge
// Learning   = aware, experimenting, growing

type Tier = "Proficient" | "Building" | "Learning";

interface Skill {
  name: string;
  tier: Tier;
  note?: string;
}

interface Category {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Where I spend most of my time. Multiple shipped projects.",
    skills: [
      { name: "React.js",     tier: "Proficient", note: "primary framework"   },
      { name: "Next.js",      tier: "Proficient", note: "this portfolio"      },
      { name: "Tailwind CSS", tier: "Proficient", note: "daily use"           },
      { name: "JavaScript",   tier: "Proficient", note: "ES6+"                },
      { name: "TypeScript",   tier: "Building",   note: "using in projects"   },
      { name: "Redux",        tier: "Building",   note: "state management"    },
      { name: "Framer Motion",tier: "Building",   note: "animations"          },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "Python/Django focused. No Node.js — intentional.",
    skills: [
      { name: "Django",       tier: "Building",   note: "REST + AI projects"  },
      { name: "Python",       tier: "Building",   note: "backend language"    },
      { name: "Django REST",  tier: "Building",   note: "API development"     },
      { name: "REST APIs",    tier: "Proficient", note: "consumed & built"    },
      { name: "PostgreSQL",   tier: "Learning",   note: "learning actively"   },
    ],
  },
  {
    id: "ai",
    label: "AI Integration",
    description: "Actively exploring. Already shipped one AI product.",
    skills: [
      { name: "Groq API",     tier: "Building",   note: "used in Git Smart"   },
      { name: "Llama (LLM)",  tier: "Building",   note: "prompt engineering"  },
      { name: "HuggingFace",  tier: "Learning",   note: "experimenting"       },
      { name: "LangChain",    tier: "Learning",   note: "exploring"           },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    description: "Dev environment and shipping infrastructure.",
    skills: [
      { name: "Git & GitHub", tier: "Proficient", note: "daily driver"        },
      { name: "Vercel",       tier: "Proficient", note: "all deployments"     },
      { name: "Postman",      tier: "Building",   note: "API testing"         },
      { name: "VS Code",      tier: "Proficient", note: "primary editor"      },
      { name: "Railway",      tier: "Building",   note: "Django deploy"       },
    ],
  },
];

const ADDITIONAL = [
  "REST APIs", "Responsive Design", "Cross-browser",
  "Git Workflow", "Vercel Deploy", "API Integration",
  "Component Architecture", "SEO Basics", "Web Performance",
  "Postman", "Version Control", "Accessibility",
];

const TIER_CONFIG: Record<Tier, { dot: string; label: string; text: string }> = {
  Proficient: {
    dot:   "bg-[#00d4ff] shadow-[0_0_6px_#00d4ff80]",
    label: "text-[#00d4ff]",
    text:  "Proficient",
  },
  Building: {
    dot:   "bg-white/40",
    label: "text-white/40",
    text:  "Building",
  },
  Learning: {
    dot:   "bg-white/15",
    label: "text-white/20",
    text:  "Learning",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const [active, setActive] = useState<string>("frontend");
  const activeCategory = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <defs>
          <pattern id="sk-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#00d4ff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sk-dots)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
              03 / stack_overview
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-4">
            What I
            <span className="block text-white/20">Actually Know.</span>
          </h2>

          {/* Honest disclaimer — this is a STRENGTH not a weakness */}
          <div className="flex items-start gap-3 mt-6 max-w-xl p-4 border border-white/[0.06] bg-white/[0.02]">
            <span className="font-mono text-[#00d4ff] text-xs mt-0.5">{">"}</span>
            <p className="font-mono text-[11px] text-white/30 leading-relaxed tracking-wide">
              No fake 90% bars. Three honest tiers:{" "}
              <span className="text-[#00d4ff]/70">Proficient</span> means I've shipped it.{" "}
              <span className="text-white/50">Building</span> means I'm actively using it.{" "}
              <span className="text-white/25">Learning</span> means I'm honest about where I am.
            </p>
          </div>
        </motion.div>

        {/* ── Body: Tab selector + Skill panel ── */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-px bg-white/[0.05] mb-px">

          {/* Category tabs */}
          <div className="bg-[#0a0a0a] flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
            {CATEGORIES.map((cat, i) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`relative text-left px-6 py-5 font-mono text-[11px] tracking-widest uppercase transition-all whitespace-nowrap
                    ${isActive
                      ? "text-[#00d4ff] bg-[#00d4ff]/[0.05]"
                      : "text-white/20 hover:text-white/50 hover:bg-white/[0.02]"
                    }`}
                >
                  {/* Active left bar — desktop */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabBar"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00d4ff] hidden lg:block"
                    />
                  )}
                  {/* Active bottom bar — mobile */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabBarH"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d4ff] lg:hidden"
                    />
                  )}
                  <span className="text-white/15 mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Skill panel */}
          <div className="bg-[#0a0a0a] p-8">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Panel header */}
              <div className="mb-8 pb-6 border-b border-white/[0.05]">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeCategory.label}
                </h3>
                <p className="font-mono text-[11px] text-white/25 tracking-wide">
                  {activeCategory.description}
                </p>
              </div>

              {/* Skills list */}
              <div className="grid sm:grid-cols-2 gap-3">
                {activeCategory.skills.map((skill, i) => {
                  const tier = TIER_CONFIG[skill.tier];
                  return (
                    <motion.div
                      key={skill.name}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="group flex items-center justify-between p-4 border border-white/[0.05] hover:border-white/[0.1] transition-colors bg-transparent hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tier.dot}`} />
                        <div>
                          <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            {skill.name}
                          </p>
                          {skill.note && (
                            <p className="font-mono text-[9px] text-white/20 tracking-widest mt-0.5 uppercase">
                              {skill.note}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={`font-mono text-[9px] tracking-widest uppercase ${tier.label}`}>
                        {skill.tier}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.05] mb-16">
          {[
            { val: "2+",  label: "Years self-taught"   },
            { val: "8+",  label: "Projects shipped"    },
            { val: "1",   label: "AI app in prod"      },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a0a0a] px-8 py-6">
              <p className="font-mono text-3xl font-bold text-white mb-1">{s.val}</p>
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Additional capabilities ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mb-5">
            Additional Capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {ADDITIONAL.map((s, i) => (
              <motion.span
                key={s}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-mono text-[10px] tracking-widest text-white/25 border border-white/[0.06] px-3 py-1.5 uppercase hover:border-[#00d4ff]/20 hover:text-[#00d4ff]/50 transition-colors cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Tier legend ── */}
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/[0.05]">
          <span className="font-mono text-[10px] text-white/15 tracking-widest uppercase">Legend</span>
          {(Object.entries(TIER_CONFIG) as [Tier, typeof TIER_CONFIG[Tier]][]).map(([tier, cfg]) => (
            <div key={tier} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className={`font-mono text-[10px] tracking-widest uppercase ${cfg.label}`}>
                {cfg.text}
              </span>
            </div>
          ))}
          <div className="flex-1" />
          <a
            href="#projects"
            className="group flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/20 hover:text-white uppercase transition-colors"
          >
            See it in action
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}