import React, { useState, useEffect } from "react";
import { Sparkles, Globe, Cpu, CheckCircle, Database } from "lucide-react";

interface ResearchStatusOverlayProps {
  topic: string;
}

const RESEARCH_STEPS = [
  {
    title: "Formulating Query Grounding",
    description: "Formulating targeted, high-precision web queries to source relevant facts.",
    icon: Globe,
    color: "text-red-500 bg-red-950/20"
  },
  {
    title: "Deploying Multi-Source Grounding",
    description: "Sourcing empirical data across active web channels and academic portals.",
    icon: Sparkles,
    color: "text-rose-500 bg-red-950/20"
  },
  {
    title: "Denoising & Data Triangulation",
    description: "Ruthlessly filtering marketing jargon, cross-referencing conflicts, and vetting empirical benchmarks.",
    icon: Database,
    color: "text-red-400 bg-red-950/20"
  },
  {
    title: "Drafting Matrix & Synthesis",
    description: "Structuring qualitative timelines, quantitative performance comparisons, and executive tables.",
    icon: Cpu,
    color: "text-rose-400 bg-red-950/20"
  },
  {
    title: "Compiling Elite Executive Brief",
    description: "Finalizing the TL;DR, formatting strategic implications, and compiling grounding citations.",
    icon: CheckCircle,
    color: "text-red-300 bg-red-950/20"
  }
];

export default function ResearchStatusOverlay({ topic }: ResearchStatusOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Dynamically cycle through steps to simulate progress during live backend API call
    const intervals = [3500, 4500, 4500, 4000];
    let step = 0;

    const runNext = () => {
      if (step < RESEARCH_STEPS.length - 1) {
        step += 1;
        setCurrentStep(step);
        timer = setTimeout(runNext, intervals[step - 1] || 4000);
      }
    };

    let timer = setTimeout(runNext, intervals[0]);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-[#0a0f24] text-white rounded-xl shadow-lg border border-[#1b2a4a] p-8 flex flex-col items-center text-center space-y-6 animate-fade-in shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Rings */}
        <div className="absolute w-24 h-24 bg-red-650/10 rounded-full animate-ping duration-1000" />
        <div className="absolute w-16 h-16 bg-red-650/20 rounded-full animate-pulse" />
        <div className="relative w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)]">
          <Cpu className="w-6 h-6 text-white animate-spin-slow" />
        </div>
      </div>

      <div className="max-w-md">
        <h3 className="font-display font-semibold text-lg tracking-tight text-white">Active Synthesis Pipeline</h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">Synthesizing: <span className="italic">"{topic}"</span></p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm bg-[#050817] border border-[#14203e] h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-1000 ease-out"
          style={{ width: `${((currentStep + 1) / RESEARCH_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Active Step Details */}
      <div className="w-full max-w-md bg-[#050817] rounded-xl p-4 border border-[#1b2a4a] flex items-start gap-4 text-left">
        {React.createElement(RESEARCH_STEPS[currentStep].icon, {
          className: `w-5 h-5 mt-0.5 shrink-0 p-1 rounded border border-red-900/40 ${RESEARCH_STEPS[currentStep].color}`
        })}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 block mb-0.5">
            Step {currentStep + 1} of {RESEARCH_STEPS.length}: {RESEARCH_STEPS[currentStep].title}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {RESEARCH_STEPS[currentStep].description}
          </p>
        </div>
      </div>

      {/* Complete Step Micro-Indicators */}
      <div className="flex items-center gap-1.5 pt-2">
        {RESEARCH_STEPS.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2.5 h-1 rounded-full transition-all ${
              idx === currentStep 
                ? "bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]" 
                : idx < currentStep 
                ? "bg-red-700" 
                : "bg-[#14203e]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
