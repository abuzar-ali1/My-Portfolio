"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BrainCircuit,
  RotateCcw,
  Target,
  FileText,
  BadgeCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FitResult {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  relevant_project: { name: string; reason: string };
  pitch: string;
  verdict: string;
}

export default function AiFitChecker() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/analyze-fit/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job_description: jd }),
        },
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Semantic analysis failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  const verdictStyles = {
    "Strong Match": "text-emerald-600 bg-emerald-50 border-emerald-100",
    "Good Match": "text-[#0077B5] bg-blue-50 border-blue-100",
    default: "text-slate-500 bg-slate-50 border-slate-100"
  };

  const currentVerdictStyle = result ? 
    (verdictStyles[result.verdict as keyof typeof verdictStyles] || verdictStyles.default) 
    : "";

  return (
    <section id="ai-fit" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden">
      
      {/* ── Suble Background Pattern ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ai-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-6">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                  06 / hiring_analytics
                </span>
              </div>
              <h2 style={{"color" : "#03030"}} className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-none">
                AI Compatibility
                <span className="block text-[#0077B5]">Analyzer.</span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed font-sans">
              Evaluate my fit against your requirements. I'm building a career on transparency—honesty about my skills is a features not a bug.
            </p>
          </div>
        </motion.div>

        {/* ── Main AI Dashboard Card ── */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0077B5] flex items-center justify-center shadow-lg shadow-[#0077B5]/20">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-slate-900 tracking-tight block leading-none font-sans">
                  Semantic Hiring Engine
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  powered by Groq / Llama
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077B5] animate-pulse" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Engine Ready</span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              
              {/* ── INPUT STAGE ── */}
              {!result && (
                <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <div className="flex items-start gap-4 mb-8 p-6 rounded-[2rem] bg-[#0077B5]/5 border border-[#0077B5]/10">
                    <Sparkles className="w-6 h-6 text-[#0077B5] shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans">
                      <strong>AI Strategic Counsel:</strong> Challenge me with your current opening. Paste the job description below and I’ll run a semantic vector analysis against my entire portfolio data to provide a credible, honest assessment of our compatibility.
                    </p>
                  </div>

                  <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    rows={6}
                    placeholder="Paste the requirements here (e.g., 'Looking for a React developer with Next.js and Django experience to build intelligent agents...')"
                    className="w-full bg-slate-50 border border-slate-100 focus:border-[#0077B5] focus:bg-white focus:ring-4 focus:ring-[#0077B5]/5 p-6 rounded-[1.5rem] text-slate-700 placeholder:text-slate-300 outline-none resize-none transition-all text-sm leading-relaxed font-sans"
                  />

                  {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wide font-sans">
                      <AlertCircle className="w-4 h-4" />
                      Semantics Failed: {error}
                    </div>
                  )}

                  <button
                    onClick={analyze}
                    disabled={!jd.trim() || loading}
                    className="mt-6 w-full py-4.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg hover:bg-slate-800 disabled:opacity-30 transition-all active:scale-[0.98] font-sans"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BadgeCheck className="w-5 h-5" />}
                    {loading ? "Calculations Running..." : "Execute Compatibility Analysis"}
                  </button>
                </motion.div>
              )}

              {/* ── RESULT STAGE ── */}
              {result && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  
                  {/* Score Dashboard Bento */}
                  <div className="grid md:grid-cols-[1fr_auto] items-center gap-8 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <div className="w-full">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Requirement Compatibility</span>
                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border uppercase font-sans", currentVerdictStyle)}>
                          {result.verdict}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative">
                         <div className="absolute inset-0 bg-[#0077B5]/10 group-hover:bg-[#0077B5]/20 animate-pulse transition-all"></div>
                        <motion.div
                          className="h-full bg-[#0077B5] rounded-full shadow-[0_0_15px_rgba(0,119,181,0.3)] relative z-10"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.match_score}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-right px-6">
                      <p className="text-5xl md:text-6xl font-black text-slate-900 leading-none font-sans">{result.match_score}<span className="text-sm text-slate-300">/100</span></p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1 font-sans">Match Index</p>
                    </div>
                  </div>

                  {/* Skills Analysis */}
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Confirmed Proficiency
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {result.matching_skills.map((s) => (
                          <span key={s} className="px-4 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100 font-sans">
                            {s}
                          </span >
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2 font-sans">
                        <Target className="w-4 h-4 text-slate-400" /> Honesty Check (Gaps)
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {result.missing_skills.length > 0 ? result.missing_skills.map((s) => (
                          <span key={s} className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold border border-slate-200 font-sans">
                            {s}
                          </span>
                        )) : <span className="text-xs text-slate-400 font-sans">No critical gaps detected by LLM.</span>}
                      </div>
                    </div>
                  </div>

                  {/* Evidence & Testimonial Bentos */}
                  <div className="grid sm:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                    {/* Relevant Project */}
                    <div className="p-6 rounded-3xl border-l-4 border-[#0077B5] bg-[#0077B5]/5">
                      <p className="text-[10px] font-bold text-[#0077B5] uppercase tracking-[0.2em] mb-2 font-sans">Most Critical Evidence</p>
                      <p className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0077B5] transition-colors font-sans">{result.relevant_project.name}</p>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">“{result.relevant_project.reason}”</p>
                    </div>
                    {/* Pitch */}
                    <div className="p-6 rounded-3xl bg-slate-900 text-white relative shadow-xl font-sans">
                       <FileText className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                        <p className="relative z-10 text-[11px] font-bold uppercase tracking-widest text-[#0077B5] mb-2">Automated Recommendation</p>
                       <p className="relative z-10 text-base md:text-lg font-medium leading-relaxed italic text-slate-100">“{result.pitch}”</p>
                    </div>
                  </div>

                  {/* Reset/Contact */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                    <a href="#contact" className="flex-1 py-4 bg-[#0077B5] text-white rounded-full font-bold text-sm uppercase tracking-widest text-center shadow-lg hover:bg-[#00669c] transition-all active:scale-[0.98] font-sans">
                      Start an Engagement Request
                    </a>
                    <button onClick={() => { setResult(null); setJd(""); }} className="px-8 py-4 border border-slate-200 text-slate-500 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 font-sans">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}