"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github,  ArrowRight, Eye } from "lucide-react";
import { PROJECTS } from "../Data/data";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }
  },
  hover: {
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  }
};
export default function ProjectGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-zinc-600 to-zinc-500" />
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Portfolio
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Work</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          A collection of projects showcasing clean code, modern design, and innovative solutions.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover="hover"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative ${project.size}`}
          >
            <Card className="group relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm hover:border-zinc-600 transition-all duration-300">
              
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/40 opacity-90" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  {/* Icon with Zinc styling */}
                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-zinc-600 transition-colors">
                      <project.icon className="w-5 h-5 text-zinc-300 group-hover:text-zinc-200 transition-colors" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-bold text-zinc-100 mb-3 leading-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3 group-hover:text-zinc-300 transition-colors">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="secondary"
                        className="px-3 py-1 text-xs font-medium bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action links _ Matching navbar */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors group/link"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="p-1.5 rounded bg-zinc-800/50 group-hover/link:bg-zinc-700/50 transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                      <span>Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors group/link"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="p-1.5 rounded bg-zinc-800/50 group-hover/link:bg-zinc-700/50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </div>
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="text-zinc-600 group-hover:text-zinc-400"
                    animate={{ 
                      rotate: hoveredId === project.id ? 45 : 0,
                      scale: hoveredId === project.id ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-600/5 via-transparent to-zinc-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-700/0 via-zinc-600/5 to-zinc-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>
        ))}
      </motion.div>

      {/* View More Section - Consistent with Navbar CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
       
        
        <p className="mt-6 text-zinc-500 text-sm">
          Need a custom solution?{" "}
          <a href="#contact" className="text-zinc-300 hover:text-zinc-200 underline underline-offset-4">
            Let's build something
          </a>
        </p>
      </motion.div>
    </section>
  );
}