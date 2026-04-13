"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, Calendar, BookOpen,
  ChevronRight, TrendingUp, Award, 
  CheckCircle, Target, Sparkles, ExternalLink
} from "lucide-react";
import { educationData, educationStats } from "../Data/data";


export default function Education() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

 const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 15 
    }
  },
  hover: {
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400
    }
  }
};

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
            Academic Journey
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Background</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          My academic path that built the foundation for my technical career and continuous learning.
        </p>
      </motion.div>

      {/* Education Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {educationStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Education Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800 -translate-x-1/2" />

        {educationData.map((edu, index) => (
          <motion.div
            key={edu.id}
            variants={itemVariants}
            whileHover="hover"
            onMouseEnter={() => setActiveId(edu.id)}
            onMouseLeave={() => setActiveId(null)}
            className={`relative mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}`}
          >
            {/* Timeline dot */}
            <div className={`absolute top-6 ${index % 2 === 0 ? 'lg:right-1/2 lg:mr-6' : 'lg:left-1/2 lg:ml-6'} left-6 lg:left-auto z-10`}>
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-700 border-2 border-zinc-800" />
                {edu.status === "In Progress" && (
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" />
                )}
              </div>
            </div>

            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="ml-10 lg:ml-0"
            >
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all group">
                {/* Card Header */}
                <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${edu.color} border border-zinc-700/50`}>
                    <edu.icon className="w-6 h-6 text-zinc-300" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-zinc-100">{edu.degree}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${edu.status === "Completed" ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-purple-900/30 text-purple-400 border border-purple-800/50'}`}>
                        {edu.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-zinc-800/50">
                          <GraduationCap className="w-4 h-4 text-zinc-500" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{edu.institution}</span>
                      </div>
                      

                    </div>

                    {/* Period and GPA */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-400">{edu.period}</span>
                        {edu.expected && (
                          <span className="text-xs text-zinc-500">({edu.expected})</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-300">{edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar (for current degree) */}
                {edu.status === "In Progress" && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-zinc-300">Degree Progress</span>
                      <span className="text-sm font-bold text-purple-400">{edu.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${edu.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">Currently in {edu.period.split(" ")[2]} Semester</p>
                  </div>
                )}

                {/* Description */}
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  {edu.description}
                </p>

                {/* Achievements or Current Courses */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                    {edu.status === "Completed" ? "Key Achievements:" : "Current Courses:"}
                  </h4>
                  <div className="space-y-2">
                    {(edu.achievements || edu.currentCourses)?.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-zinc-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Developed */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                    Skills Developed:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.status === "Completed" ? (
                      ["Analytical Thinking", "Problem Solving", "Scientific Methodology", "Research Skills"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      ["Programming Logic", "Algorithm Design", "Data Structures", "Academic Writing"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
                        >
                          {skill}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className={`absolute ${index % 2 === 0 ? 'right-6' : 'left-6'} top-6 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <ChevronRight className={`w-5 h-5 text-zinc-600 ${index % 2 === 0 ? '' : 'rotate-180'}`} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Academic Goals */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="p-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <Target className="w-6 h-6 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Academic Goals & Future Plans</h3>
              <p className="text-sm text-zinc-500">Balancing education with professional growth</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-300">Current Focus</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Complete BS Computer Science with specialization in Software Engineering</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Participate in open-source projects and coding competitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Balance academic learning with practical industry experience</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-300">Future Aspirations</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-400">Pursue Masters in AI/ML or Software Engineering</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-400">Contribute to academic research in computer science</span>
                </li>
                <li className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-400">Mentor aspiring developers and students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all group/cta"
        >
          <BookOpen className="w-5 h-5" />
          <span>See How I Apply My Knowledge</span>
          <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all" />
        </a>
      </motion.div>
    </section>
  );
}