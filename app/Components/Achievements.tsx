"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Award, Star, Chrome, ExternalLink,
  Calendar, MapPin, ChevronLeft, ChevronRight,
  X, ZoomIn, Target
} from "lucide-react";
import Image from "next/image";
import cert from "./../../public/Images/cert.jpeg";
import award from "./../../public/Images/award.jpeg";
import chromebook from "./../../public/Images/chromebook.jpeg";




const achievements = [
  {
    id: 1,
    title: "Chief Minister's Excellence Award",
    subtitle: "Outstanding Performance in Python Development",
    award: "Google Chromebook 11",
    date: "January 2025",
    location: "Sukkur IBA University, Sindh",
    description: "Awarded a Google Chromebook 11 by the Chief Minister of Sindh for demonstrating exceptional performance and outstanding achievements in the Python Development course. Recognized as the top performer among all students in the program.",
    icon: Chrome,
    color: "from-blue-500/10 to-green-500/10",
    highlight: "Top Performer in Class",
    images: [
      { id: "cert", alt: "Achievement Certificate", caption: "Certificate of Excellence" , src : cert },
      { id: "chromebook", alt: "Google Chromebook 11", caption: "Awarded Chromebook", src : chromebook},
      { id: "award", alt: "Award Ceremony with CM Sindh", caption: "Award Ceremony" , src: award }
    ]
  }
];

const otherAchievements = [
  {
    title: "Top 120 Student Selection",
    description: "Selected among top 120 students from 500+ applicants for xWave frontend development program",
    icon: Star,
    color: "text-amber-400"
  },
  {
    title: "10+ Projects Completed",
    description: "Built and deployed multiple real-world projects across various technologies",
    icon: Target,
    color: "text-emerald-400"
  },
  {
    title: "Freelance Certification",
    description: "Certified in professional freelancing and client management by Digi Skill",
    icon: Award,
    color: "text-purple-400"
  }
];

export default function Achievements() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (imageId: string) => {
    setSelectedImage(imageId);
    const index = achievements[0].images.findIndex(img => img.id === imageId);
    setCurrentImageIndex(index);
  };

  const closeImage = () => setSelectedImage(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === achievements[0].images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? achievements[0].images.length - 1 : prev - 1
    );
  };

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
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
            Honors & Awards
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Achievements</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          Recognition and awards received for exceptional performance and contributions.
        </p>
      </motion.div>

      {/* Main Achievement Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            variants={itemVariants}
            whileHover="hover"
            className="relative"
          >
            {/* Main Achievement Card */}
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all">
              {/* Header with Icon and Badge */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} border border-zinc-700/50`}>
                    <achievement.icon className="w-8 h-8 text-zinc-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-100">{achievement.title}</h3>
                    <p className="text-zinc-300 text-sm mt-1">{achievement.subtitle}</p>
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border border-amber-800/50">
                  <span className="flex items-center gap-2 text-sm font-medium text-amber-300">
                    <Trophy className="w-4 h-4" />
                    {achievement.highlight}
                  </span>
                </div>
              </div>

              {/* Achievement Details */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  {/* Award Details */}
                  <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-zinc-400" />
                      <h4 className="text-lg font-semibold text-zinc-100">Award Received</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <Chrome className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-xl font-bold text-zinc-100">{achievement.award}</p>
                        <p className="text-sm text-zinc-400">High-performance laptop for development work</p>
                      </div>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-400">Date</span>
                      </div>
                      <p className="text-zinc-100 font-medium">{achievement.date}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-400">Location</span>
                      </div>
                      <p className="text-zinc-100 font-medium text-sm">{achievement.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                    <h4 className="text-lg font-semibold text-zinc-100 mb-3">Achievement Details</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Images Grid */}
                <div>
                  <h4 className="text-lg font-semibold text-zinc-100 mb-4">Gallery</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {achievement.images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openImage(image.id)}
                        className="group relative cursor-pointer"
                      >
                        {/* Image Container */}
                        <div className="aspect-square rounded-xl overflow-hidden border-2 border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
                          {/* Replace with actual images */}
                          <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          />

                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute top-3 right-3 p-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4 text-zinc-300" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-800/30 to-zinc-900/20 border border-zinc-700/50">
                <p className="text-sm text-zinc-400 text-center">
                  This award recognizes exceptional dedication and performance in Python development, 
                  selected by faculty and endorsed by the Chief Minister of Sindh.
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/5 to-yellow-500/5 blur-xl" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Other Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold text-zinc-100 mb-8">Additional Recognitions</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {otherAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 ${achievement.color}`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-100">{achievement.title}</h4>
              </div>
              <p className="text-sm text-zinc-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all group/cta"
        >
          <Trophy className="w-5 h-5" />
          <span>See Projects That Earned Recognition</span>
          <ExternalLink className="w-5 h-5 opacity-0 -translate-x-2 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all" />
        </a>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeImage}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {achievements[0].images[currentImageIndex]?.caption}
                    </h3>
                    <p className="text-sm text-zinc-500">Achievement Gallery</p>
                  </div>
                  <button
                    onClick={closeImage}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                {/* Image Display */}
                <div className="relative h-150 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
                  {/* Replace with actual Image component */}
                        <Image
                        src={achievements[0].images[currentImageIndex]?.src}
                        alt={`images`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        />
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-zinc-300" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-zinc-300" />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="p-4 border-t border-zinc-800">
                  <div className="flex items-center justify-center gap-2">
                    {achievements[0].images.map((Image, index) => (
                      <button
                        key={Image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-zinc-300 w-4' 
                            : 'bg-zinc-700 hover:bg-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}