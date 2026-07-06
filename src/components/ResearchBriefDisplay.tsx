import { useState } from "react";
import { ResearchBrief } from "../types";
import ReactMarkdown from "react-markdown";
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Clock, 
  Layers, 
  ExternalLink, 
  AlertCircle,
  Share2
} from "lucide-react";

interface ResearchBriefDisplayProps {
  brief: ResearchBrief;
}

export default function ResearchBriefDisplay({ brief }: ResearchBriefDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(brief.brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([brief.brief], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${brief.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-synthesis-brief.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?topic=${encodeURIComponent(brief.topic)}`;
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div id="briefing-container" className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      {/* Sidebar Metadata Dashboard */}
      <div className="lg:col-span-1 space-y-4 print:hidden">
        <div className="bg-[#0c1430] border border-[#1b2a4a] rounded-xl p-5 space-y-5">
          <div>
            <h3 className="font-display font-semibold text-xs text-red-400 uppercase tracking-wider mb-2">
              Briefing Identity
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">TOPIC</span>
                <span className="text-xs font-semibold text-white font-sans line-clamp-3">{brief.topic}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">INDUSTRY</span>
                <span className="text-xs font-semibold text-slate-200">{brief.industry}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">AUDIENCE</span>
                <span className="text-xs font-semibold text-slate-200">{brief.targetAudience}</span>
              </div>
            </div>
          </div>

          <hr className="border-[#1b2a4a]" />

          <div>
            <h3 className="font-display font-semibold text-xs text-red-400 uppercase tracking-wider mb-2.5">
              Synthesis Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#050817] border border-[#1b2a4a]/80 rounded-lg p-2.5 text-center">
                <Clock className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 block font-mono">READ TIME</span>
                <span className="text-xs font-semibold text-white">{brief.metadata.readingTimeMinutes} min</span>
              </div>
              <div className="bg-[#050817] border border-[#1b2a4a]/80 rounded-lg p-2.5 text-center">
                <FileText className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 block font-mono">WORD COUNT</span>
                <span className="text-xs font-semibold text-white">{brief.metadata.wordCount}</span>
              </div>
            </div>
          </div>

          <hr className="border-[#1b2a4a]" />

          <div>
            <h3 className="font-display font-semibold text-xs text-red-400 uppercase tracking-wider mb-2">
              Verification Status
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${brief.metadata.triangulationStatus === "Triangulated" ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-red-700"}`} />
              <span className="text-xs font-semibold text-white">{brief.metadata.triangulationStatus}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
              {brief.metadata.triangulationStatus === "Triangulated" 
                ? "Triangulated with real-time web search grounding to filter noise." 
                : "Heuristic intelligence model synthesis."}
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-[#0a0f24] border border-[#1b2a4a] rounded-xl p-4 flex flex-col gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#121c42] rounded-lg text-xs font-medium transition-colors cursor-pointer text-slate-300 hover:text-white"
          >
            <span className="flex items-center gap-2">
              {copied ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              {copied ? "Copied" : "Copy Markdown"}
            </span>
            <span className="text-[10px] text-red-400/80 font-mono uppercase bg-[#050817] px-1.5 py-0.5 rounded border border-[#14203e]">CLIPBOARD</span>
          </button>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#121c42] rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-slate-400" />
              Download Source (.md)
            </span>
            <span className="text-[10px] text-red-400/80 font-mono uppercase bg-[#050817] px-1.5 py-0.5 rounded border border-[#14203e]">FILE</span>
          </button>
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#121c42] rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-slate-400" />
              Print Research Brief
            </span>
            <span className="text-[10px] text-red-400/80 font-mono uppercase bg-[#050817] px-1.5 py-0.5 rounded border border-[#14203e]">PRINT</span>
          </button>
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#121c42] rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {shared ? <Check className="w-4 h-4 text-red-500" /> : <Share2 className="w-4 h-4 text-slate-400" />}
              {shared ? "Link Copied" : "Share Briefing link"}
            </span>
            <span className="text-[10px] text-red-400/80 font-mono uppercase bg-[#050817] px-1.5 py-0.5 rounded border border-[#14203e]">URL</span>
          </button>
        </div>
      </div>

      {/* Main Research Content Sheet */}
      <div className="lg:col-span-3 space-y-6">
        {/* Document Frame */}
        <div className="bg-[#0a0f24] border border-[#1b2a4a] shadow-xs rounded-xl p-6 md:p-10 relative shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          {/* Subtle Document Grid Guide Header */}
          <div className="flex items-center justify-between border-b border-[#1b2a4a] pb-4 mb-6 text-[10px] text-red-400/60 font-mono tracking-widest uppercase print:hidden">
            <span>Synthesis Brief | Official Record</span>
            <span>ID: {brief.id.slice(0, 8).toUpperCase()}</span>
          </div>

          {/* Render the core Briefing document in markdown */}
          <div className="markdown-body">
            <ReactMarkdown>{brief.brief}</ReactMarkdown>
          </div>

          {/* Grounding Source Citations Segment */}
          {brief.citations.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#1b2a4a] print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4.5 h-4.5 text-red-500" />
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-200">
                  Grounding Sources & Empirical Citations ({brief.citations.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brief.citations.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#050817] hover:bg-[#0c1430]/60 border border-[#1b2a4a] rounded-lg group transition-colors block text-left"
                  >
                    <span className="text-[10px] text-slate-500 font-mono block mb-1">SOURCE [{idx + 1}]</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-300 line-clamp-1 group-hover:text-white transition-colors">
                        {source.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 shrink-0 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Strict compliance informational notice */}
          <div className="mt-8 p-3.5 bg-[#050817] border border-red-950/40 rounded-lg flex items-start gap-2.5 text-[10px] text-slate-400 leading-relaxed print:hidden">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-500 uppercase">Strategic Advisory Notice:</span> This intelligence briefing represents trialed synthesis sourced from real-time dynamic web grounding indexes as of {new Date(brief.timestamp).toLocaleDateString()}. Cross-reference strategic decisions with primary risk underwriters.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
