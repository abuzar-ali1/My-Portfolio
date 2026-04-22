"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Loader2, Mail, Phone, MapPin, Globe, ArrowUpRight, MessageSquare, Github, Linkedin, Twitter } from "lucide-react";
import { CONTACT_INFO } from "../Data/data";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (key) emailjs.init({ publicKey: key, blockHeadless: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) throw new Error("configuration");

      await emailjs.sendForm(serviceId, templateId, formRef.current!, { publicKey });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: any) {
      setSubmitError("Failed to transmit. Please try again or email directly.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      
      {/* ── Suble Background Pattern ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="contact-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className=" text-[10px] text-[#0077B5] font-bold tracking-[0.2em] uppercase">
              05 / start_conversation
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <h2 style={{"color" : '#030303'}} className="text-4xl sm:text-6xl font-bold  tracking-tight leading-none">
            Let&apos;s
            <span className="block text-[#0077B5]">Connect.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">

          {/* ── LEFT: Communication Card ── */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-slate-500">I typically respond within 4 business hours.</p>
            </div>

            {/* Status Overlays (Success/Error) */}
            <AnimatePresence mode="wait">
              {isSubmitted && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-8">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">✓</div>
                    <p className="text-sm font-semibold text-emerald-700">Message transmitted successfully!</p>
                  </div>
                </motion.div>
              )}
              {submitError && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-8">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">!</div>
                    <p className="text-sm font-semibold text-red-700">{submitError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Abuzar Ali"
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl outline-none transition-all text-slate-900 placeholder:text-slate-300",
                      focusedField === "name" && "border-[#0077B5] bg-white ring-4 ring-[#0077B5]/5"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="hello@example.com"
                    className={cn(
                      "w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl outline-none transition-all text-slate-900 placeholder:text-slate-300",
                      focusedField === "email" && "border-[#0077B5] bg-white ring-4 ring-[#0077B5]/5"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  placeholder="Tell me about your project opportunity..."
                  className={cn(
                    "w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl outline-none transition-all text-slate-900 placeholder:text-slate-300 resize-none",
                    focusedField === "message" && "border-[#0077B5] bg-white ring-4 ring-[#0077B5]/5"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isSubmitting ? "Transmitting..." : "Send Engagement Request"}
              </button>
            </form>
          </motion.div>

          {/* ── RIGHT: Direct Connection Panel ── */}
          <div className="flex flex-col justify-center">
            
            {/* Availability Status */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm mb-12 self-start">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Open for New Projects</p>
            </div>

            <div className="space-y-8 mb-12">
              {[
                { icon: Mail, label: "Official Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: Phone, label: "WhatsApp Support", value: CONTACT_INFO.phone, href: `https://wa.me/${CONTACT_INFO.phone.replace(/\s/g, '')}` },
                { icon: MapPin, label: "Current Location", value: CONTACT_INFO.location, href: "#" },
              ].map((item, i) => (
                <motion.a 
                  key={i} href={item.href} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#0077B5] group-hover:text-white transition-all shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900 group-hover:text-[#0077B5] transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Matrix */}
            <div className="pt-10 border-t border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Connect Globally</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: CONTACT_INFO.github, label: "GitHub" },
                  { icon: Linkedin, href: CONTACT_INFO.linkedin, label: "LinkedIn" },
                  { icon: Twitter, href: CONTACT_INFO.twitter, label: "Twitter" },
                ].map((social) => (
                  <a 
                    key={social.label} href={social.href} target="_blank" 
                    className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}