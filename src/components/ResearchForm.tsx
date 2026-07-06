import React, { useState } from "react";
import { 
  PRESET_INDUSTRIES, 
  PRESET_AUDIENCES, 
  SUGGESTED_TOPICS 
} from "../types";
import { Search, Sparkles, BookOpen, Layers, Users, FileText, ChevronRight } from "lucide-react";

interface ResearchFormProps {
  onSubmit: (data: {
    topic: string;
    industry: string;
    targetAudience: string;
    depth: "standard" | "deep";
    context: string;
  }) => void;
  isLoading: boolean;
}

export default function ResearchForm({ onSubmit, isLoading }: ResearchFormProps) {
  const [topic, setTopic] = useState("");
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
    <div id="research-form-card" className="bg-[#0a0f24] rounded-xl border border-[#1b2a4a] shadow-[0_4px_30px_rgba(0,0,0,0.3)] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-red-600 text-white rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.3)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg text-white">Initiate Synthesis Briefing</h2>
          <p className="text-xs text-slate-400">Provide a topic below to deploy our intelligence agent.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Topic Entry */}
        <div>
          <label htmlFor="research-topic" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Research Target & Objective <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="research-topic"
              type="text"
              required
              disabled={isLoading}
              placeholder="e.g., Timeline for Sodium-ion battery adoption in commercial heavy-duty trucks..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#050817] border border-[#1b2a4a] focus:border-red-600 focus:ring-red-600 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:ring-1 transition-all font-sans"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </div>
        </div>

        {/* Dynamic Suggesters */}
        <div>
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Suggested High-Signal Briefings
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUGGESTED_TOPICS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => selectSuggested(item)}
                className="text-left p-3 rounded-lg border border-[#14203e] bg-[#0c1430]/40 hover:bg-[#121c42]/60 hover:border-red-900/60 transition-all group flex items-start gap-2 text-xs"
              >
                <ChevronRight className="w-3.5 h-3.5 text-red-500 mt-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                <div>
                  <span className="font-medium text-slate-200 line-clamp-2">{item.topic}</span>
                  <span className="text-[10px] text-red-400/80 block mt-1 font-mono">{item.industry}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1b2a4a] pt-5">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1.5 focus:outline-hidden transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-red-500" />
              {showAdvanced ? "Hide Protocol Parameters" : "Customize Protocol Parameters"}
            </button>
          </div>

          <div className={`space-y-4 overflow-hidden transition-all duration-300 ${showAdvanced ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Industry Select */}
              <div>
                <label htmlFor="industry-select" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  <BookOpen className="w-3 h-3 inline mr-1 text-red-500" />
                  Industry Domain
                </label>
                <select
                  id="industry-select"
                  disabled={isLoading}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-2.5 bg-[#050817] border border-[#1b2a4a] focus:border-red-600 focus:ring-red-600 rounded-lg text-xs text-slate-200 focus:outline-hidden focus:ring-1 transition-all"
                >
                  {PRESET_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#050817]">{ind}</option>
                  ))}
                </select>
              </div>

              {/* Target Audience Select */}
              <div>
                <label htmlFor="audience-select" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  <Users className="w-3 h-3 inline mr-1 text-red-500" />
                  Target Audience
                </label>
                <select
                  id="audience-select"
                  disabled={isLoading}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full p-2.5 bg-[#050817] border border-[#1b2a4a] focus:border-red-600 focus:ring-red-600 rounded-lg text-xs text-slate-200 focus:outline-hidden focus:ring-1 transition-all"
                >
                  {PRESET_AUDIENCES.map((aud) => (
                    <option key={aud} value={aud} className="bg-[#050817]">{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Strategic Depth Select */}
              <div className="md:col-span-1">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Protocol Depth
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setDepth("standard")}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      depth === "standard"
                        ? "bg-red-600 text-white border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                        : "bg-[#050817] text-slate-400 border-[#1b2a4a] hover:bg-[#0c1430]"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setDepth("deep")}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                      depth === "deep"
                        ? "bg-red-600 text-white border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                        : "bg-[#050817] text-slate-400 border-[#1b2a4a] hover:bg-[#0c1430]"
                    }`}
                  >
                    Deep Advisory
                  </button>
                </div>
              </div>

              {/* Custom pasted document context */}
              <div className="md:col-span-2">
                <label htmlFor="custom-context" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  <FileText className="w-3 h-3 inline mr-1 text-red-500" />
                  Additional Source / Internal Document Context (Optional)
                </label>
                <textarea
                  id="custom-context"
                  disabled={isLoading}
                  placeholder="Paste proprietary findings, literature extracts, or project briefs here to guide the synthesis..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-[#050817] border border-[#1b2a4a] focus:border-red-600 focus:ring-red-600 rounded-lg text-xs text-slate-200 focus:outline-hidden focus:ring-1 transition-all font-mono"
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
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-[#14203e] disabled:text-slate-500 text-white font-medium text-sm transition-all focus:outline-hidden cursor-pointer shadow-[0_4px_15px_rgba(220,38,38,0.35)]"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-red-300 border-t-white rounded-full animate-spin" />
              <span>Engaging Synthesis Engine...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Synthesize Structured Research Brief</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
