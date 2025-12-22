// src/components/Certifications.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Award, Calendar, CheckCircle, BookOpen,
  Code, Database, TrendingUp, Globe,
  ChevronRight, Sparkles, Zap, Terminal
} from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Front-end Web Development",
    institution: "xWave",
    period: "Jan 2024 - Jan 2025",
    duration: "12 months",
    icon: Code,
    color: "from-blue-500/10 to-cyan-500/10",
    skills: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "React.js", "Next.js", "WordPress"],
    description: "Selected as one of the top 120 students from over 500 applicants. Successfully developed 10+ projects, refining skills in modern frontend technologies to create responsive websites and landing pages. Also completed a 3-month online WordPress development course.",
    highlights: [
      "Selected among top 120/500+ applicants",
      "Developed 10+ responsive projects",
      "Additional WordPress specialization"
    ]
  },
  {
    id: 2,
    title: "Data Science Certification",
    institution: "Sukkur IBA University",
    period: "Jan 2025 - March 2025",
    duration: "2 months",
    icon: Database,
    color: "from-purple-500/10 to-violet-500/10",
    skills: ["Python", "Machine Learning", "TensorFlow", "Scikit-learn", "Statistical Analysis", "Tableau", "Matplotlib", "Predictive Modeling"],
    description: "Mastered core Data Science concepts including statistical analysis, machine learning algorithms (Decision Tree, Random Forest, SVM), and data visualization. Developed expertise in predictive modeling using Scikit-learn and TensorFlow.",
    highlights: [
      "Applied ML algorithms for dataset accuracy prediction",
      "Real-world projects in clustering, regression, and time-series forecasting",
      "Hands-on experience with TensorFlow and Scikit-learn"
    ]
  },
  {
    id: 3,
    title: "Python Development Certification",
    institution: "Sukkur IBA University",
    period: "Nov 2024 - Jan 2025",
    duration: "3 months",
    icon: Terminal,
    color: "from-amber-500/10 to-orange-500/10",
    skills: ["Python", "OOP", "Flask", "REST APIs", "Pandas", "NumPy", "pytest", "Web Scraping", "OpenCV", "Automation"],
    description: "Proficient in building scalable applications using core Python, OOP principles, and design patterns. Developed automation scripts, REST APIs (Flask), and data pipelines for efficient data processing. Expert in error handling, multithreading, and unit testing.",
    highlights: [
      "Built REST APIs with Flask framework",
      "Developed data pipelines with Pandas & NumPy",
      "Web scraping with BeautifulSoup & image processing with OpenCV",
      "Clean, maintainable code adhering to PEP8 standards"
    ]
  },
  {
    id: 4,
    title: "Freelancing & Client Management",
    institution: "Digi Skill",
    period: "Nov 2024 - Jan 2025",
    duration: "3 months",
    icon: TrendingUp,
    color: "from-emerald-500/10 to-green-500/10",
    skills: ["Client Communication", "Project Management", "Freelance Strategies", "Business Development", "Client Acquisition"],
    description: "Completed a three-month Freelancing course focusing on effective client interaction, project management strategies, and business development for successful freelance career growth.",
    highlights: [
      "Enhanced client communication skills",
      "Learned effective project management strategies",
      "Developed business development techniques"
    ]
  }
];

const stats = [
  { label: "Certifications", value: "4", icon: Award },
  { label: "Total Duration", value: "20 months", icon: Calendar },
  { label: "Technical Skills", value: "25+", icon: CheckCircle },
  { label: "Projects Built", value: "10+", icon: BookOpen }
];

export default function Certifications() {
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
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
            Credentials
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Training</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          Professional certifications and specialized training that validate my technical expertise.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <stat.icon className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800 -translate-x-1/2" />

        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            whileHover="hover"
            className={`relative mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}`}
          >
            {/* Timeline dot */}
            <div className={`absolute top-6 lg:top-8 ${index % 2 === 0 ? 'lg:right-1/2 lg:mr-6' : 'lg:left-1/2 lg:ml-6'} left-6 lg:left-auto`}>
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-700 border-2 border-zinc-800" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-zinc-600/20 to-zinc-700/20 animate-pulse" />
              </div>
            </div>

            {/* Certification Card */}
            <motion.div
              variants={itemVariants}
              className="ml-10 lg:ml-0"
            >
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all group">
                {/* Card Header */}
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start lg:items-center gap-4 mb-6`}>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} border border-zinc-700/50`}>
                    <cert.icon className="w-6 h-6 text-zinc-300" />
                  </div>
                  
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-zinc-100">{cert.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50">
                        {cert.duration}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-300">{cert.institution}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-400">{cert.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  {cert.description}
                </p>

                {/* Highlights */}
                {cert.highlights && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-3">Key Highlights:</h4>
                    <ul className="space-y-2">
                      {cert.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-zinc-400">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">Skills Acquired:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
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

      {/* Additional Training */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="p-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <Sparkles className="w-6 h-6 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Continuous Learning</h3>
              <p className="text-sm text-zinc-500">Committed to staying updated with latest technologies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-zinc-300">Learning Philosophy</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                I believe in continuous skill enhancement through certifications, online courses, and hands-on projects. Each certification represents not just completion, but practical application of knowledge.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-zinc-300">Current Focus</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Advanced React Patterns & Performance Optimization
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Cloud Deployment & DevOps Practices
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  Advanced Animation & Micro-interactions
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
          href="#contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all group/cta"
        >
          <Award className="w-5 h-5" />
          <span>Discuss My Qualifications</span>
          <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all" />
        </a>
      </motion.div>
    </section>
  );
}