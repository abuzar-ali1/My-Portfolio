"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, Palette, Cpu, Database, 
  GitBranch, Smartphone, Globe, Zap,
  CheckCircle, ArrowRight, Sparkles
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "React", level: 95, color: "from-blue-400/20 to-cyan-400/20" },
      { name: "TypeScript", level: 90, color: "from-blue-500/20 to-indigo-500/20" },
      { name: "Next.js", level: 88, color: "from-zinc-400/20 to-zinc-500/20" },
      { name: "Tailwind CSS", level: 96, color: "from-teal-400/20 to-cyan-400/20" },
    ]
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    skills: [
      { name: "Figma", level: 85, color: "from-pink-500/20 to-purple-500/20" },
      { name: "Framer Motion", level: 92, color: "from-red-500/20 to-pink-500/20" },
      { name: "Responsive Design", level: 94, color: "from-green-500/20 to-emerald-500/20" },
      { name: "Design Systems", level: 82, color: "from-yellow-500/20 to-orange-500/20" },
    ]
  },
  {
    title: "Tools & Others",
    icon: GitBranch,
    skills: [
      { name: "Git/GitHub", level: 90, color: "from-zinc-400/20 to-zinc-600/20" },
      { name: "VS Code", level: 96, color: "from-blue-400/20 to-blue-600/20" },
      { name: "Performance", level: 87, color: "from-purple-500/20 to-violet-500/20" },
      { name: "Web Vitals", level: 89, color: "from-green-400/20 to-lime-400/20" },
    ]
  }
];

const techStack = [
  { name: "JavaScript", icon: Code, color: "text-yellow-400" },
  { name: "TypeScript", icon: Cpu, color: "text-blue-400" },
  { name: "React", icon: Zap, color: "text-cyan-400" },
  { name: "Next.js", icon: Globe, color: "text-zinc-100" },
  { name: "Tailwind", icon: Palette, color: "text-teal-400" },
  { name: "Node.js", icon: Database, color: "text-green-400" },
  { name: "Framer Motion", icon: Smartphone, color: "text-pink-400" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-zinc-600 to-zinc-500" />
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Expertise
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Skills</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          Technologies and tools I work with to bring ideas to life.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills Categories */}
        <div className="lg:col-span-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                onMouseEnter={() => setActiveCategory(categoryIndex)}
                className="group relative"
              >
                <div className={`p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 ${activeCategory === categoryIndex ? 'ring-1 ring-zinc-600/30' : ''}`}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-zinc-600 transition-colors">
                      <category.icon className="w-6 h-6 text-zinc-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-100">{category.title}</h3>
                      <p className="text-sm text-zinc-500">Proficient in modern tools</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
                          <span className="text-xs font-bold text-zinc-400">{skill.level}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Tech Stack Pill */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-zinc-400" />
              <h3 className="text-lg font-bold text-zinc-100">Tech Stack</h3>
            </div>
            
            <div className="space-y-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group"
                >
                  <div className="p-2 rounded bg-zinc-800/50 group-hover:bg-zinc-700/50">
                    <tech.icon className={`w-4 h-4 ${tech.color}`} />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
                  <CheckCircle className="w-4 h-4 text-zinc-600 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Experience Stats */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-zinc-100 mb-6">Experience</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <span className="text-sm text-zinc-400">Years of Experience</span>
                <span className="text-2xl font-bold text-zinc-100">3+</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <span className="text-sm text-zinc-400">Projects Completed</span>
                <span className="text-2xl font-bold text-zinc-100">15+</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <span className="text-sm text-zinc-400">Technologies</span>
                <span className="text-2xl font-bold text-zinc-100">12+</span>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-zinc-100 mb-3">Need a Developer?</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Let's build something amazing together. I'm available for freelance projects and full-time opportunities.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-medium text-sm transition-all group/cta"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-zinc-100 mb-6">Additional Capabilities</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "REST APIs", "GraphQL", "State Management", "Testing", 
              "CI/CD", "Web Performance", "Accessibility", "PWA",
              "SEO Optimization", "Cross-browser", "Version Control"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* View Projects Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm font-medium group/link"
        >
          <span>Explore my projects</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}