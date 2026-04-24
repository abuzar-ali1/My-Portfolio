"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, Loader2, Sparkles, User, Bot, 
  MessageSquare, ShieldCheck, CornerDownLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Do you know Django?",
  "What is your strongest project?",
  "Why should I hire you?",
  "Can you work remotely?"
];

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AskPortfolio() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const askAi = async (query: string) => {
    if (!query.trim() || loading) return;

    const userMessage = { role: "user" as const, content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/ask_portfolio/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "ai", content: "System connection interrupted. Please email me directly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ask_portfolio" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] font-sans overflow-hidden">
      
      {/* ── Background Grid ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="chat-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077B5" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#chat-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">06 / digital_twin_interface</span>
            </div>
            <h2 style={{"color" : "black"}} className="text-4xl md:text-6xl font-black  tracking-tight leading-none">
              Ask My <span className="text-[#0077B5]">Portfolio.</span>
            </h2>
            <p className="mt-4 text-slate-500 font-medium">Have a question for me? Ask my AI Twin instantly.</p>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engine: Groq Llama 3.1</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Context
            </p>
          </div>
        </div>

        {/* ── Main Chat Interface ── */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col h-[650px]">
          
          {/* Header Bar */}
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0077B5] flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Abuzar_AI_Twin.sys</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Always Honest. Always Specific.</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
               <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
               <span className="w-2.5 h-2.5 rounded-full bg-[#0077B5]" />
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6 scroll-smooth bg-white"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <Bot className="w-16 h-16 text-slate-200 mb-6" />
                <p className="text-base font-bold text-slate-400 max-w-sm">
                  I am trained on Abuzar's real resume, projects, and skills. Ask me anything to evaluate his fit.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-4 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm",
                  msg.role === "user" ? "bg-slate-900 text-white" : "bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20"
                )}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-5 rounded-3xl text-[15px] font-medium leading-relaxed",
                  msg.role === "user" 
                    ? "bg-slate-900 text-white rounded-tr-none shadow-md" 
                    : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none shadow-sm"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                </div>
                <div className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl rounded-tl-none flex items-center h-[54px]">
                  <span className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 border-t border-slate-100 bg-white shrink-0">
            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {SUGGESTIONS.map(s => (
                  <button 
                    key={s} onClick={() => askAi(s)}
                    className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-500 hover:border-[#0077B5] hover:text-[#0077B5] hover:bg-[#0077B5]/5 transition-all active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askAi(input)}
                placeholder="Type your question for my Digital Twin..."
                className="w-full pl-6 pr-16 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0077B5] focus:ring-4 focus:ring-[#0077B5]/5 transition-all text-sm text-slate-800 font-bold"
              />
              <button 
                onClick={() => askAi(input)}
                disabled={!input.trim() || loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#0077B5] text-white rounded-xl hover:bg-[#00669c] disabled:opacity-30 transition-all shadow-lg shadow-[#0077B5]/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Footer Status */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
               <div className="flex items-center gap-1.5">
                 <ShieldCheck className="w-3.5 h-3.5" /> Prompt-Injected Context
               </div>
               <div className="flex items-center gap-1.5 hidden sm:flex">
                  Press Enter <CornerDownLeft className="w-3 h-3" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}