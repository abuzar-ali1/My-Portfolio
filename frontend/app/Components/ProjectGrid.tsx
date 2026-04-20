"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, ArrowRight, Eye, Sparkles,
  Store, CloudDrizzle, School, ListTodo, Code,
  Zap, Layers, Cpu
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const iconMap: Record<string, React.ElementType> = {
  Github, Store, CloudDrizzle, School, ListTodo, Code
};

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image: string;
  size: string;
  icon_name: string;
  ai_insight?: string;
}

export default function ProjectGrid({ projects = [] }: { projects: Project[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const safeProjects = Array.isArray(projects) ? projects : [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
      rotateX: 15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
        mass: 0.8
      }
    },
  };

  const cardHoverVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-transparent via-indigo-500/5 to-transparent rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      {/* Enhanced Header Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-24 flex flex-col items-center text-center relative"
      >
        {/* Floating Icons */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
        >
          <Zap className="w-6 h-6 text-purple-400" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
        </motion.div>

        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white/90 border border-white/20 px-6 py-2 mb-8 rounded-full text-sm font-medium tracking-wide backdrop-blur-xl shadow-lg">
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-3 inline-block"
          />
          Neural Architecture
        </Badge>

        <motion.h2
          className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(45deg, #ffffff, #a855f7, #06b6d4, #ffffff)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Quantum
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Creations
          </span>
        </motion.h2>

        <motion.p
          className="text-xl text-zinc-300 max-w-3xl font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Architecting the future with Django backends, AI-powered insights, and cutting-edge design systems that push the boundaries of digital experience.
        </motion.p>
      </motion.div>

      {/* The Enhanced Bento Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-flow-dense"
      >
        {safeProjects.map((project, index) => {
          const IconComponent = iconMap[project.icon_name] || Code;
          const isHovered = hoveredId === project.id;
          const isClicked = clickedId === project.id;

          return (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              variants={cardHoverVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setClickedId(clickedId === project.id ? null : project.id)}
              className={`relative group cursor-pointer ${project.size}`}
              style={{ perspective: "1000px" }}
            >
              {/* Multi-layered Glow Effects */}
              <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-[2.5rem] blur-2xl animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-[2rem] blur-xl" />
                <div className="absolute inset-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-[1.5rem] blur-lg" />
              </div>

              {/* Main Glass Card */}
              <Card className="h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden group-hover:shadow-purple-500/25 group-hover:shadow-2xl">

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.05),transparent)] animate-spin" style={{ animationDuration: '10s' }} />
                </div>

                {/* Image Background with Morphing Effect */}
                {project.image && (
                  <motion.div
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                    animate={isHovered ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, 0]
                    } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale mix-blend-screen" />
                  </motion.div>
                )}

                <div className="relative z-10 p-8 flex flex-col flex-grow">

                  {/* Enhanced Top Row */}
                  <div className="flex justify-between items-start mb-8">
                    <motion.div
                      className="w-16 h-16 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center shadow-lg backdrop-blur-sm"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.3 }
                      }}
                      animate={isHovered ? {
                        boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)"
                      } : {}}
                    >
                      <IconComponent className="w-7 h-7 text-white group-hover:text-purple-300 transition-colors drop-shadow-sm" />
                    </motion.div>

                    {project.ai_insight && (
                      <motion.div
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 text-xs font-semibold backdrop-blur-sm"
                        animate={isHovered ? {
                          scale: [1, 1.05, 1],
                          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)"
                        } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        Neural AI
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Text Content */}
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight"
                    animate={isHovered ? {
                      background: "linear-gradient(45deg, #ffffff, #a855f7, #06b6d4)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    } : {}}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-zinc-300 text-sm leading-relaxed mb-6 flex-grow font-light"
                    animate={isHovered ? { color: "#e4e4e7" } : {}}
                  >
                    {project.description}
                  </motion.p>

                  {/* Enhanced AI Terminal */}
                  <AnimatePresence>
                    {project.ai_insight && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, height: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          height: "auto",
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          height: 0,
                          scale: 0.9,
                          transition: { duration: 0.2 }
                        }}
                        className="mb-6 rounded-2xl bg-gradient-to-r from-black/80 to-gray-900/80 border border-purple-500/40 p-5 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)] backdrop-blur-xl"
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5"
                          >
                            <Cpu className="w-3 h-3 text-white" />
                          </motion.div>
                          <p className="text-xs font-mono text-cyan-200/90 leading-relaxed flex-1">
                            <span className="text-purple-300 font-bold pr-2">~/quantum-ai $</span>
                            {project.ai_insight}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-8 mt-auto">
                    {project.tech_stack.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-gradient-to-r from-white/10 to-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        whileHover={{
                          scale: 1.05,
                          background: "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Links Row */}
                  <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                    {project.github_url && (
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-2 text-sm font-medium group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <Github className="w-4 h-4 group-hover/link:-translate-y-1 transition-transform" />
                        </motion.div>
                        Source Code
                      </motion.a>
                    )}
                    {project.live_url && (
                      <motion.a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm font-medium group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <Eye className="w-4 h-4 group-hover/link:-translate-y-1 transition-transform" />
                        </motion.div>
                        Live Demo
                      </motion.a>
                    )}
                    <motion.div
                      className="ml-auto w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 backdrop-blur-sm"
                      whileHover={{
                        scale: 1.1,
                        rotate: 45,
                        background: "linear-gradient(45deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'text-purple-300 translate-x-1 rotate-45' : 'text-zinc-500'}`} />
                    </motion.div>
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