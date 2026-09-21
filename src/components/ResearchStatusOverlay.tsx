import React, { useState, useEffect } from "react";
import { Sparkles, Globe, Cpu, CheckCircle, Database } from "lucide-react";
import { ResearchSynthLogo } from "./ResearchSynthLogo";

interface ResearchStatusOverlayProps {
  topic: string;
}

const RESEARCH_STEPS = [
  {
    title: "Formulating query grounding",
    description: "Building targeted, high-precision search queries to surface the sources you actually need.",
    icon: Globe,
    color: "text-accent bg-accent/10 border-accent/30"
  },
  {
    title: "Deploying multi-source grounding",
    description: "Reading across academic portals, journals and technical channels while excluding promotional noise.",
    icon: Sparkles,
    color: "text-accent-soft bg-accent/10 border-accent/30"
  },
  {
    title: "Denoising & claim triangulation",
    description: "Cross-referencing conflicts, isolating unverified metrics, and labelling each claim with a confidence level.",
    icon: Database,
    color: "text-accent bg-accent/10 border-accent/30"
  },
  {
    title: "Drafting matrix & synthesis",
    description: "Structuring qualitative timelines, quantitative comparisons, and the evidence tables for your decision.",
    icon: Cpu,
    color: "text-mint bg-accent/10 border-accent/30"
  },
  {
    title: "Compiling the cited brief",
    description: "Finalizing the synthesis, formatting claims and confidence labels, and compiling grounding citations.",
    icon: CheckCircle,
    color: "text-mint bg-accent/10 border-accent/30"
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
    <div className="panel p-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Rings */}
        <div className="absolute w-24 h-24 bg-accent/10 rounded-full animate-ping duration-1000" />
        <div className="absolute w-16 h-16 bg-accent/20 rounded-full animate-pulse" />
        <div className="relative w-12 h-12 bg-[#130a22] border border-accent/60 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,132,252,0.4)]">
          <Cpu className="w-6 h-6 text-accent animate-spin-slow" />
        </div>
      </div>

      <div className="max-w-md">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ResearchSynthLogo size={18} ring={false} />
          <h3 className="font-head font-semibold text-lg leading-tight text-ink">Active synthesis pipeline</h3>
        </div>
        <p className="text-xs text-ink-soft mt-1 line-clamp-1">Synthesizing: <span className="italic text-accent-soft">"{topic}"</span></p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-sm bg-[#050817] border border-line h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-accent-deep to-accent-soft h-full transition-all duration-1000 ease-out"
          style={{ width: `${((currentStep + 1) / RESEARCH_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Active Step Details */}
      <div className="w-full max-w-md bg-[#050817] rounded-xl p-4 border border-line flex items-start gap-4 text-left">
        {React.createElement(RESEARCH_STEPS[currentStep].icon, {
          className: `w-5 h-5 mt-0.5 shrink-0 p-0.5 rounded border ${RESEARCH_STEPS[currentStep].color}`
        })}
        <div>
          <span className="text-[10px]  font-bold tracking-wider text-accent block mb-0.5">
            Step {currentStep + 1} of {RESEARCH_STEPS.length}: {RESEARCH_STEPS[currentStep].title}
          </span>
          <p className="text-xs text-ink-soft leading-relaxed">
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
                ? "bg-accent shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                : idx < currentStep
                ? "bg-accent/60"
                : "bg-[#14203e]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}