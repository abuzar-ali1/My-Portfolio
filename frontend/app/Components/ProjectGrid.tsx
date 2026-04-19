"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, ArrowRight, Eye, Sparkles, 
  Store, CloudDrizzle, School, ListTodo, Code 
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

// 1. We create a map to translate Django strings into React Components
const iconMap: Record<string, React.ElementType> = {
  Github, Store, CloudDrizzle, School, ListTodo, Code
};

// 2. We define the TypeScript interface for your Django data
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[]; // From Django JSONField
  github_url: string;
  live_url: string;
  image: string; // The URL from Django Media
  size: string; // e.g., "md:col-span-2 md:row-span-2"
  icon_name: string;
  ai_insight?: string; // The new AI field!
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
            Live Database
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Architecture</span>
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Powered by a custom Python/Django backend. Real-time data, AI insights, and modern Bento-grid design.
        </p>
      </motion.div>

      {/* The Bento Grid (Note the dense flow for perfect packing) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-dense"
      >
        {projects.map((project) => {
          // Dynamically grab the icon from our map, fallback to <Code />
          const IconComponent = iconMap[project.icon_name] || Code;

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              // This dynamically applies the layout class from Django
              className={`relative group ${project.size}`} 
            >
              <Card className="h-full overflow-hidden rounded-3xl border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                
                {/* Optional Background Image Logic */}
                {project.image && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="relative z-10 p-8 flex flex-col flex-grow">
                  
                  {/* Top Row: Icon & AI Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-zinc-400 group-hover:text-blue-400" />
                    </div>
                    
                    {/* The "AI Insight" Badge */}
                    {project.ai_insight && (
                      <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        AI Analyzed
                      </Badge>
                    )}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* AI Insight Terminal Box (Reveals on Hover if it exists) */}
                  <AnimatePresence>
                    {project.ai_insight && hoveredId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 rounded-lg bg-black/40 border border-zinc-800 p-3 overflow-hidden"
                      >
                        <p className="text-xs font-mono text-cyan-400">
                          <span className="text-zinc-500">&gt; AI_Insight:</span> {project.ai_insight}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tech_stack.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="secondary"
                        className="bg-zinc-900 text-zinc-300 border-zinc-800 font-mono text-[10px] tracking-wider uppercase px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links Row */}
                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/50">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                        <Eye className="w-4 h-4" /> Live
                      </a>
                    )}
                    <div className="ml-auto">
                      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${hoveredId === project.id ? 'text-blue-400 translate-x-1' : 'text-zinc-600'}`} />
                    </div>
                  </div>

                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}