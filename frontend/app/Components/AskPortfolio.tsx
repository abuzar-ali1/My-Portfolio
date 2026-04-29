"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Loader2, Sparkles, User, Bot, X 
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Do you know Django?",
  "Strongest project?",
  "Why hire you?",
  "Remote work?"
];

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AskPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smoothly scroll to the anchor whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const askAi = async (query: string) => {
    if (!query.trim() || loading) return;

    const userMessage = { role: "user" as const, content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/ask-portfolio/`, {
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
    <>
      {/* ── Global Floating Trigger Button ── */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-[#0077B5] text-white p-3.5 rounded-full shadow-xl shadow-[#0077B5]/30 flex items-center justify-center group border-[3px] border-white"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
      </motion.button>

      {/* ── Global Modal Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
            
            {/* Modal Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl h-[92vh] sm:h-[82vh] bg-[#FAFAFA] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              
              {/* ── Compact Header ── */}
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0077B5] flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">Abuzar's AI Twin</h2>
                    <p className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ready to Answer
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div 
                className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 overscroll-contain"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60 px-4">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mb-4" />
                    <p className="text-sm sm:text-base font-bold text-slate-400 max-w-md">
                      I am trained exclusively on Abuzar's resume, tech stack, and portfolio. Ask me anything to evaluate his fit.
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex items-start gap-2.5 sm:gap-3 max-w-[92%] sm:max-w-[85%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-lg shrink-0 flex items-center justify-center shadow-sm",
                      msg.role === "user" ? "bg-slate-900 text-white" : "bg-white text-[#0077B5] border border-slate-200"
                    )}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "p-3 sm:p-4 rounded-2xl text-[13px] sm:text-[14px] font-medium leading-relaxed",
                      msg.role === "user" 
                        ? "bg-slate-900 text-white rounded-tr-none shadow-md" 
                        : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    </div>
                    <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none flex items-center h-[42px] sm:h-[48px] shadow-sm">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
                      </span>
                    </div>
                  </div>
                )}
                
                {/* ── Invisible Anchor for Auto-Scrolling ── */}
                <div ref={scrollRef} className="h-px w-full shrink-0" />
              </div>

              {/* ── Compact Input Area ── */}
              <div className="p-3 sm:p-4 border-t border-slate-200 bg-white shrink-0 z-10">
                
                {/* Suggestions */}
                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {SUGGESTIONS.map(s => (
                      <button 
                        key={s} onClick={() => askAi(s)}
                        className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-500 hover:border-[#0077B5] hover:text-[#0077B5] hover:bg-[#0077B5]/5 transition-all active:scale-95"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Box */}
                <div className="relative group mx-auto">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAi(input)}
                    placeholder="Ask about my skills or projects..."
                    className="w-full pl-4 pr-12 py-3 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#0077B5] focus:ring-2 focus:ring-[#0077B5]/10 transition-all text-sm text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-medium"
                  />
                  <button 
                    onClick={() => askAi(input)}
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#00669c] disabled:opacity-40 transition-all shadow-md active:scale-95 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}