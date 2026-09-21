import React, { useState } from "react";
import {
  PRESET_INDUSTRIES,
  PRESET_AUDIENCES,
  SUGGESTED_TOPICS
} from "../types";
import { Search, Sparkles, BookOpen, Layers, Users, FileText, ChevronRight } from "lucide-react";
import { ResearchSynthLogo } from "./ResearchSynthLogo";

interface ResearchFormProps {
  onSubmit: (data: {
    topic: string;
    industry: string;
    targetAudience: string;
    depth: "standard" | "deep";
    context: string;
  }) => void;
  isLoading: boolean;
  initialTopic?: string;
}

export default function ResearchForm({ onSubmit, isLoading, initialTopic }: ResearchFormProps) {
  const [topic, setTopic] = useState(initialTopic || "");
  const [industry, setIndustry] = useState(PRESET_INDUSTRIES[0]);
  const [targetAudience, setTargetAudience] = useState(PRESET_AUDIENCES[0]);
  const [depth, setDepth] = useState<"standard" | "deep">("standard");
  const [context, setContext] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({
      topic,
      industry,
      targetAudience,
      depth,
      context
    });
  };

  const selectSuggested = (item: typeof SUGGESTED_TOPICS[0]) => {
    setTopic(item.topic);
    setIndustry(item.industry);
    setTargetAudience(item.audience);
  };

  return (
    <div id="research-form-card" className="panel p-6 md:p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="logo-tile flex h-12 w-12 items-center justify-center shrink-0">
          <ResearchSynthLogo size={30} ring={false} />
        </span>
        <div>
          <h2 className="font-head font-semibold text-lg text-ink leading-tight">Start a synthesis</h2>
          <p className="text-xs text-ink-soft">Paste your notes, abstract or references. Get a cited brief back.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Main Topic Entry */}
        <div>
          <label htmlFor="research-topic" className="label-field">
            Research target &amp; objective <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              id="research-topic"
              type="text"
              required
              disabled={isLoading}
              placeholder="e.g., Timeline for sodium-ion battery adoption in commercial heavy-duty trucks..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="control pl-11 pr-4 py-3 text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          </div>
        </div>

        {/* Dynamic Suggesters */}
        <div>
          <span className="block text-[10px] font-mono font-semibold text-muted uppercase tracking-wider mb-2.5">
            Suggested high-signal briefings
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {SUGGESTED_TOPICS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => selectSuggested(item)}
                className="text-left p-3 rounded-lg border border-line bg-[#0c1430]/40 hover:bg-[#121c42]/60 hover:border-accent/50 transition-all group flex items-start gap-2 text-xs cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-accent mt-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                <div className="min-w-0">
                  <span className="font-medium text-ink-soft line-clamp-2">{item.topic}</span>
                  <span className="text-[10px] text-accent/80 block mt-1 font-mono">{item.industry}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-5">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-ink-soft hover:text-accent flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-accent" />
              {showAdvanced ? "Hide protocol parameters" : "Customize protocol parameters"}
            </button>
          </div>

          <div className={`space-y-4 overflow-hidden transition-all duration-300 ${showAdvanced ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Industry Select */}
              <div>
                <label htmlFor="industry-select" className="label-field">
                  <BookOpen className="w-3 h-3 inline mr-1 text-accent" />
                  Industry domain
                </label>
                <select
                  id="industry-select"
                  disabled={isLoading}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="control p-2.5 text-xs"
                >
                  {PRESET_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Target Audience Select */}
              <div>
                <label htmlFor="audience-select" className="label-field">
                  <Users className="w-3 h-3 inline mr-1 text-accent" />
                  Target audience
                </label>
                <select
                  id="audience-select"
                  disabled={isLoading}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="control p-2.5 text-xs"
                >
                  {PRESET_AUDIENCES.map((aud) => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Strategic Depth Select */}
              <div className="md:col-span-1">
                <span className="label-field">Protocol depth</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setDepth("standard")}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                      depth === "standard"
                        ? "bg-accent text-[#150826] border-accent shadow-[0_0_10px_rgba(192,132,252,0.35)]"
                        : "bg-[#050817] text-ink-soft border-line hover:bg-[#0c1430]"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setDepth("deep")}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                      depth === "deep"
                        ? "bg-accent text-[#150826] border-accent shadow-[0_0_10px_rgba(192,132,252,0.35)]"
                        : "bg-[#050817] text-ink-soft border-line hover:bg-[#0c1430]"
                    }`}
                  >
                    Deep advisory
                  </button>
                </div>
              </div>

              {/* Custom pasted document context */}
              <div className="md:col-span-2">
                <label htmlFor="custom-context" className="label-field">
                  <FileText className="w-3 h-3 inline mr-1 text-accent" />
                  Paste your notes / internal context (optional)
                </label>
                <textarea
                  id="custom-context"
                  disabled={isLoading}
                  placeholder="Paste your abstracts, literature extracts, lab notes, or project briefs here to guide the synthesis..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={2}
                  className="control p-2.5 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="trigger-research-btn"
          disabled={isLoading || !topic.trim()}
          className="btn-primary w-full py-3 px-5 text-sm"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#150826]/30 border-t-[#150826] rounded-full animate-spin" />
              <span>Running synthesis...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Try it free — synthesize your notes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}