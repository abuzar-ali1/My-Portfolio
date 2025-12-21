// src/components/Hero.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    ArrowRight, Sparkles, Code, Palette,
    Github, Linkedin, Twitter, Mail,
    ChevronDown, Zap, ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profilePic from "./../../public/Images/my_profile.png";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [textIndex, setTextIndex] = useState(0);

    const roles = ["Frontend Developer", "UI/UX Designer", "React Specialist", "Web Animator"];

    const name = "Abuzar Ali";
    const [revealedLetters, setRevealedLetters] = useState(0);

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



    // Smooth mouse follower effect
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Background gradient position based on mouse
    const backgroundX = useTransform(cursorXSpring, [0, window.innerWidth], ["20%", "80%"]);
    const backgroundY = useTransform(cursorYSpring, [0, window.innerHeight], ["20%", "80%"]);

    // Rotate text through roles
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Mouse movement tracker
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Mail, href: "mailto:hello@abuzar.dev", label: "Email" },
    ];

    const stats = [
        { value: "15+", label: "Projects", icon: Code },
        { value: "3+", label: "Years", icon: Zap },
        { value: "100%", label: "Satisfaction", icon: Sparkles },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(circle at ${backgroundX} ${backgroundY}, 
            rgba(39, 39, 42, 0.15) 0%, 
            rgba(24, 24, 27, 0) 50%)`,
                }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Subtle floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-zinc-800/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zinc-700/5 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Intro Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium text-zinc-300">
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <div className="space-y-4">
                            <div className="flex items-center">
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
                                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300"
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                                {/* Blinking cursor */}
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-[2px] h-[0.9em] bg-zinc-400 ml-1"
                                />
                            </div>
                            {/* Animated Role Text */}
                            <motion.div
                                key={textIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-12"
                            >
                                <h2 className="text-xl md:text-2xl text-zinc-400">
                                    <span className="flex items-center gap-3">
                                        <Palette className="w-5 h-5 text-zinc-500" />
                                        {roles[textIndex]}
                                    </span>
                                </h2>
                            </motion.div>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-zinc-400 leading-relaxed max-w-lg"
                        >
                            I craft immersive digital experiences with clean code and thoughtful design.
                            Specializing in modern frontend development with React, TypeScript, and Tailwind CSS.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-6 pt-4"
                        >
                            {stats.map((stat, index) => (
                                <div key={stat.label} className="text-center">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className="w-4 h-4 text-zinc-500" />
                                        <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                                    </div>
                                    <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap gap-4 pt-6"
                        >
                            <Link
                                href="#projects"
                                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-zinc-900/30"
                            >
                                <span className="flex items-center gap-2">
                                    View Projects
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="#contact"
                                className="px-8 py-3.5 rounded-full bg-zinc-800/30 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-300 hover:text-zinc-100 font-medium text-sm transition-all backdrop-blur-sm"
                            >
                                Get In Touch
                            </Link>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center gap-4 pt-8"
                        >
                            <span className="text-sm text-zinc-500">Connect with me</span>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 + index * 0.1 }}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2.5 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Outer glow ring - enlarged */}
                            <div className="absolute -inset-4 lg:-inset-6 rounded-3xl bg-gradient-to-r from-zinc-700/20 via-zinc-600/10 to-zinc-700/20 blur-xl" />

                            {/* Image container - larger for desktop */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-2xl overflow-hidden border-2 border-zinc-800/50 bg-zinc-800">
                                {/* actual image */}
                                <Image
                                    src={profilePic}
                                    alt="Abuzar Ali - Frontend Developer"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
                                        <Code className="w-5 h-5 lg:w-6 lg:h-6 text-zinc-400" />
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-700 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge - repositioned for larger image */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700/50 shadow-lg"
                            >
                                <span className="text-sm lg:text-base font-medium text-zinc-300">Open to work</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-zinc-500">Scroll to explore</span>
                        <ChevronDown className="w-5 h-5 text-zinc-600" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}