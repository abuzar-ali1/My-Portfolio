"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code, ChevronDown, Sparkles, Coffee, } from "lucide-react";
import Image from "next/image";
import profilePic from "./../../public/Images/my_profile.png";
import { AboutSocialLinks, AboutStats, roles } from "../Data/data";

export default function AboutHero() {
  const [textIndex, setTextIndex] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [activeStat, setActiveStat] = useState(0);


  const name = "Abuzar Ali";

  //  name animation
  useEffect(() => {
    if (revealedLetters < name.length) {
      const timer = setTimeout(() => {
        setRevealedLetters(revealedLetters + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setRevealedLetters(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [revealedLetters]);

  // Rotate roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate active stat
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


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
    }
  };

  return (
    <section id="about"  className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-zinc-800/10 to-zinc-900/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-to-r from-zinc-700/5 to-zinc-800/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-zinc-900/20 via-transparent to-transparent" />
      </div>

      {/* Geometric pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.015]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.1)_1px, transparent_0)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Main content card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-xl shadow-2xl shadow-black/30">

            {/* Floating profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:top-8 lg:translate-x-0"
            >
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-zinc-600/20 via-zinc-700/10 to-zinc-600/20 blur-xl" />

                {/* Image container */}
                <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-zinc-800/50 bg-zinc-800 shadow-2xl">                 
                 <Image
                  src={profilePic}
                  alt="Abuzar Ali - Frontend Developer"
                  fill
                  className="object-cover"
                  priority
                />

                  {/* Decorative ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-full border-2 border-zinc-600/30 border-t-transparent"
                  />
                </div>

                {/* Availability badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-zinc-300">Available</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="pt-20 lg:pt-8 lg:pr-48">
              {/* Intro badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-300">
                  Passionate Developer
                </span>
              </motion.div>

              {/* Animated name */}
              <motion.div
                variants={itemVariants}
                className="mb-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-2">
                  <span className="block mb-2 text-zinc-400 text-lg">Hi, I am</span>
                  <div className="flex flex-wrap items-center">
                    {name.split("").map((letter, index) => (
                      <motion.span
                        key={`${letter}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: index < revealedLetters ? 1 : 0,
                          y: index < revealedLetters ? 0 : 20
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                          delay: index * 0.05
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[2px] h-[1em] bg-zinc-400 ml-1"
                    />
                  </div>
                </h1>
              </motion.div>

              {/* Animated role - FIXED SECTION */}
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-6"
              >
                {(() => {
                  const CurrentRole = roles[textIndex];
                  const CurrentIcon = CurrentRole.icon;
                  return (
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 ${CurrentRole.color}`}>
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-medium text-zinc-300">
                        {CurrentRole.title}
                      </h2>
                    </div>
                  );
                })()}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-2xl"
              >
                I transform complex problems into elegant solutions through clean code and intuitive design.
                With a passion for creating immersive digital experiences, I bridge the gap between functionality
                and aesthetics in every project.
              </motion.p>

              {/* Stats grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {AboutStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    className={`p-4 rounded-xl border ${activeStat === index ? 'border-zinc-600 bg-zinc-800/30' : 'border-zinc-800 bg-zinc-900/30'} backdrop-blur-sm transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.color} border border-zinc-700/50`}>
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

              {/* CTA and Social */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-zinc-800"
              >
                {/* Social links */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-500">Connect</span>
                  <div className="flex items-center gap-2">
                    {AboutSocialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 ${social.color} transition-all`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    View Work
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-300 hover:text-zinc-100 font-medium text-sm transition-all flex items-center gap-2"
                  >
                    <Coffee className="w-4 h-4" />
                    Let's Talk
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
              <div className="absolute -left-8 -top-8 w-16 h-16 bg-gradient-to-br from-zinc-600/10 to-zinc-700/10 rotate-45" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-16 h-16 bg-gradient-to-br from-zinc-600/10 to-zinc-700/10 rotate-45" />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-500">Explore my journey</span>
            <ChevronDown className="w-5 h-5 text-zinc-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}