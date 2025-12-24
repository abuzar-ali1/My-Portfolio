// src/components/Contact.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, 
  CheckCircle, Loader2, Github, 
  Linkedin, Twitter, MessageSquare,
  Calendar, Clock, Sparkles
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "abuzarali.dev@gmail.com",
      link: "mailto:abuzarali.dev@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+923372595592",
      link: "tel:+923372595592",
      color: "text-green-400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lahore, Punjab",
      link: "#",
      color: "text-red-400"
    },
    {
      icon: Calendar,
      title: "Availability",
      value: "Open to opportunities",
      link: "#",
      color: "text-purple-400"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/abuzar-ali1", label: "GitHub", color: "hover:text-zinc-100" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abuzar-ali01/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/Abu_zar_Ali", label: "Twitter", color: "hover:text-sky-400" },
    { icon: MessageSquare, href: "#", label: "WhatsApp", color: "hover:text-green-400" }
  ];

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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
            Get In Touch
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-400">Connect</span>
        </h2>
        
        <p className="text-lg text-zinc-400 max-w-2xl">
          Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Success Message */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-xl bg-gradient-to-r from-green-900/20 to-emerald-900/10 border border-green-800/30"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-green-300">Message sent successfully!</p>
                    <p className="text-sm text-green-400/80">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card */}
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <Send className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">Send a Message</h3>
                <p className="text-sm text-zinc-500">Fill out the form below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none transition-all"
                      placeholder="John Doe"
                    />
                    <div className="absolute right-3 top-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 text-zinc-100 font-semibold text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            {/* Form Note */}
            <p className="text-xs text-zinc-500 text-center mt-6">
              Your information is safe with me. I&apos;ll never share your details.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Contact Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 ${info.color}`}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">{info.title}</p>
                    <p className="text-zinc-100 font-medium group-hover:text-zinc-300 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Response Time Card */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-zinc-400" />
              <h3 className="text-lg font-bold text-zinc-100">Quick Response</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              I typically respond within 2-4 hours during business days. For urgent matters, please call.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Response Time</span>
                <span className="text-sm font-medium text-zinc-300">2-4 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Business Hours</span>
                <span className="text-sm font-medium text-zinc-300">Mon-Fri, 9AM-6PM PST</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-zinc-400" />
              <h3 className="text-lg font-bold text-zinc-100">Connect Socially</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 ${social.color} transition-all group/social`}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Freelance Availability */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-800/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-lg font-bold text-zinc-100">Available for Work</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-6">
              I&apos;m currently accepting new projects. Let&apos;s schedule a call to discuss your requirements.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-medium text-sm transition-all group/cta"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Call</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-zinc-500">
          Prefer email? Reach out directly at{" "}
          <a href="mailto:hello@abuzar.dev" className="text-zinc-300 hover:text-zinc-200 underline underline-offset-4">
            abuzarali.dev@gmail.com
          </a>
        </p>
      </motion.div>
    </section>
  );
}