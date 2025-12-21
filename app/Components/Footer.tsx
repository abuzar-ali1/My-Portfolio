// src/components/Footer.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main "Call to Action" Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
              LETS BUILD <br /> 
              <span className="text-zinc-500">SOMETHING NEXT.</span>
            </h2>
            <a 
              href="mailto:your@email.com" 
              className="group inline-flex items-center gap-2 text-xl font-medium text-white hover:text-zinc-400 transition-colors"
            >
              your@email.com 
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Socials</p>
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">Twitter / X</a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Navigation</p>
              <a href="#projects" className="text-zinc-300 hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-zinc-300 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-zinc-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-zinc-500 text-sm">
              © {currentYear} — Crafted with passion.
            </p>
            {/* Professional Detail: Local Time */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Available for global opportunities
            </p>
          </div>

          {/* Back to Top Button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}