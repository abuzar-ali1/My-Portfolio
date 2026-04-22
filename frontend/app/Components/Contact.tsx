// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Send, Loader2, Terminal, ArrowUpRight } from "lucide-react";
// import { contactInfo, socialLinks } from "../Data/data";
// import emailjs from "@emailjs/browser";

// const fadeUp = {
//   hidden: { opacity: 0, y: 16 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// export default function Contact() {
//   const formRef = useRef<HTMLFormElement>(null);

//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   useEffect(() => {
//     const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
//     if (!key) { setSubmitError("Email service not configured."); return; }
//     emailjs.init({ publicKey: key, blockHeadless: true });
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitError(null);
//     setIsSubmitting(true);

//     if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
//       setSubmitError("All fields required.");
//       setIsSubmitting(false);
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setSubmitError("Invalid email address.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
//       const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
//       const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
//       if (!serviceId || !templateId || !publicKey) throw new Error("configuration");

//       await emailjs.sendForm(serviceId, templateId, formRef.current!, { publicKey });

//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setFormData({ name: "", email: "", message: "" });
//       setTimeout(() => setIsSubmitted(false), 6000);
//     } catch (err: any) {
//       let msg = "Failed to send. Try again later.";
//       if (err?.message?.includes("configuration")) msg = "Email service misconfigured.";
//       else if (err?.status === 0 || err?.message?.includes("network")) msg = "Network error. Check your connection.";
//       setSubmitError(msg);
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Shared input classes
//   const inputBase =
//     "w-full bg-transparent px-4 py-3 font-mono text-sm text-white placeholder-white/15 outline-none transition-colors duration-200 border";
//   const inputIdle   = "border-white/[0.08]";
//   const inputFocus  = "border-[#00d4ff]/50";

//   return (
//     <section
//       id="contact"
//       className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
//     >
//       {/* Dot grid */}
//       <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
//         <defs>
//           <pattern id="ct-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
//             <circle cx="1" cy="1" r="1" fill="#00d4ff" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#ct-dots)" />
//       </svg>

//       {/* Ambient glow bottom-left */}
//       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00d4ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />

//       <div className="relative z-10 max-w-7xl mx-auto">

//         {/* ── Header ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <div className="flex items-center gap-4 mb-6">
//             <span className="font-mono text-[10px] text-[#00d4ff]/50 tracking-[0.2em] uppercase">
//               04 / get_in_touch
//             </span>
//             <div className="flex-1 h-px bg-white/[0.05]" />
//           </div>
//           <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none">
//             Let&apos;s
//             <span className="block text-white/20">Build Something.</span>
//           </h2>
//         </motion.div>

//         <div className="grid lg:grid-cols-[1fr_360px] gap-px bg-white/[0.05]">

//           {/* ── LEFT: Form ── */}
//           <div className="bg-[#0a0a0a] p-8 md:p-12">

//             {/* Terminal header */}
//             <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.05]">
//               <Terminal className="w-4 h-4 text-[#00d4ff]/50" />
//               <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">
//                 init_contact.form
//               </span>
//               <div className="ml-auto flex items-center gap-1.5">
//                 <span className="w-2 h-2 rounded-full bg-white/10" />
//                 <span className="w-2 h-2 rounded-full bg-white/10" />
//                 <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
//               </div>
//             </div>

//             {/* Success state */}
//             <AnimatePresence>
//               {isSubmitted && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -12 }}
//                   className="mb-8 p-4 border border-[#00ff88]/20 bg-[#00ff88]/[0.04]"
//                 >
//                   <div className="flex items-start gap-3">
//                     <span className="font-mono text-[#00ff88] text-sm mt-0.5">✓</span>
//                     <div>
//                       <p className="font-mono text-sm text-[#00ff88]">Message transmitted.</p>
//                       <p className="font-mono text-[11px] text-[#00ff88]/50 mt-1 tracking-wide">
//                         I&apos;ll respond within 24 hours.
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Error state */}
//             <AnimatePresence>
//               {submitError && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mb-8 p-4 border border-red-500/20 bg-red-500/[0.04]"
//                 >
//                   <p className="font-mono text-[11px] text-red-400 tracking-wide">
//                     <span className="text-red-500 mr-2">!</span>{submitError}
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

//               {/* Name + Email row */}
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {/* Name */}
//                 <div className="space-y-2">
//                   <label className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
//                     <span className="text-[#00d4ff]/40 mr-1">//</span> Your Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField("name")}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     placeholder="John Doe"
//                     className={`${inputBase} ${focusedField === "name" ? inputFocus : inputIdle}`}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-2">
//                   <label className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
//                     <span className="text-[#00d4ff]/40 mr-1">//</span> Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField("email")}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     placeholder="john@example.com"
//                     className={`${inputBase} ${focusedField === "email" ? inputFocus : inputIdle}`}
//                   />
//                 </div>
//               </div>

//               {/* Message */}
//               <div className="space-y-2">
//                 <label className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
//                   <span className="text-[#00d4ff]/40 mr-1">//</span> Message
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField("message")}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   rows={6}
//                   placeholder="Tell me about your project or opportunity..."
//                   className={`${inputBase} resize-none ${focusedField === "message" ? inputFocus : inputIdle}`}
//                 />
//               </div>

//               {/* Submit */}
//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileTap={{ scale: 0.98 }}
//                 className="group relative w-full py-4 bg-[#00d4ff] text-[#0a0a0a] font-mono text-[12px] font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Transmitting...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4" />
//                     Send Message
//                   </>
//                 )}
//               </motion.button>

//               <p className="font-mono text-[10px] text-white/15 text-center tracking-wide">
//                 Your info stays private. No spam, ever.
//               </p>
//             </form>
//           </div>

//           {/* ── RIGHT: Info panel ── */}
//           <div className="bg-[#0a0a0a] flex flex-col divide-y divide-white/[0.05]">

//             {/* Availability status */}
//             <div className="p-8">
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88] animate-pulse" />
//                 <span className="font-mono text-[11px] text-[#00ff88] tracking-widest uppercase">
//                   Available Now
//                 </span>
//               </div>
//               <p className="font-mono text-[11px] text-white/25 leading-relaxed tracking-wide">
//                 Open to internships and freelance projects. Based in Lahore, PK. Remote-friendly.
//               </p>
//             </div>

//             {/* Contact info list */}
//             <div className="p-8 space-y-4">
//               <p className="font-mono text-[10px] text-white/15 tracking-[0.2em] uppercase mb-5">
//                 Direct Contact
//               </p>
//               {contactInfo.map((info, i) => (
//                 <motion.a
//                   key={info.title}
//                   href={info.link}
//                   custom={i}
//                   variants={fadeUp}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   className="group flex items-center justify-between p-4 border border-white/[0.05] hover:border-[#00d4ff]/20 transition-colors bg-transparent hover:bg-[#00d4ff]/[0.02]"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-7 h-7 border border-white/[0.07] flex items-center justify-center group-hover:border-[#00d4ff]/25 transition-colors">
//                       <info.icon className="w-3.5 h-3.5 text-white/25 group-hover:text-[#00d4ff]/60 transition-colors" />
//                     </div>
//                     <div>
//                       <p className="font-mono text-[9px] text-white/20 tracking-widest uppercase mb-0.5">
//                         {info.title}
//                       </p>
//                       <p className="font-mono text-[11px] text-white/55 group-hover:text-white/80 transition-colors">
//                         {info.value}
//                       </p>
//                     </div>
//                   </div>
//                   <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-[#00d4ff]/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
//                 </motion.a>
//               ))}
//             </div>

//             {/* Response time */}
//             <div className="p-8">
//               <p className="font-mono text-[10px] text-white/15 tracking-[0.2em] uppercase mb-5">
//                 Response Time
//               </p>
//               <div className="space-y-3">
//                 {[
//                   { label: "Avg. Response", val: "2–4 hrs"  },
//                   { label: "Timezone",      val: "PKT (UTC+5)" },
//                   { label: "Availability",  val: "Mon–Sat"  },
//                 ].map((row) => (
//                   <div key={row.label} className="flex items-center justify-between">
//                     <span className="font-mono text-[10px] text-white/20 tracking-wide uppercase">
//                       {row.label}
//                     </span>
//                     <span className="font-mono text-[11px] text-white/50">
//                       {row.val}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Social links */}
//             <div className="p-8">
//               <p className="font-mono text-[10px] text-white/15 tracking-[0.2em] uppercase mb-5">
//                 Socials
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {socialLinks.map((social) => (
//                   <motion.a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ y: -2 }}
//                     className="flex items-center gap-2 px-3 py-2 border border-white/[0.07] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] text-white/25 font-mono text-[10px] tracking-widest uppercase transition-all"
//                   >
//                     <social.icon className="w-3 h-3" />
//                     {social.label}
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Footer note ── */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]"
//         >
//           <p className="font-mono text-[10px] text-white/15 tracking-wide">
//             Or email directly:{" "}
//             <a
//               href="mailto:abuzarali.dev@gmail.com"
//               className="text-[#00d4ff]/40 hover:text-[#00d4ff] transition-colors"
//             >
//               abuzarali.dev@gmail.com
//             </a>
//           </p>
//           <p className="font-mono text-[10px] text-white/10 tracking-widest uppercase">
//             Built with Next.js · Django · Groq AI
//           </p>
//         </motion.div>

//       </div>
//     </section>
//   );
// }