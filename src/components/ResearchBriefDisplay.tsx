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

  const triangulated = brief.metadata.triangulationStatus === "Triangulated";

  return (
    <div id="briefing-container" className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
      {/* Sidebar Metadata Dashboard */}
      <div className="lg:col-span-1 space-y-4 print:hidden">
        <div className="panel p-5 space-y-5">
          <div>
            <h3 className="font-head font-semibold text-[11px] text-accent  tracking-wider mb-3">
              Briefing identity
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-muted font-mono block">TOPIC</span>
                <span className="text-xs font-semibold text-ink line-clamp-3">{brief.topic}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted font-mono block">INDUSTRY</span>
                <span className="text-xs font-semibold text-ink-soft">{brief.industry}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted font-mono block">AUDIENCE</span>
                <span className="text-xs font-semibold text-ink-soft">{brief.targetAudience}</span>
              </div>
            </div>
          </div>

          <hr className="border-line" />

          <div>
            <h3 className="font-head font-semibold text-[11px] text-accent  tracking-wider mb-2.5">
              Synthesis metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#050817] border border-line rounded-lg p-2.5 text-center">
                <Clock className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
                <span className="text-[10px] text-muted block font-mono">READ TIME</span>
                <span className="text-xs font-semibold text-ink">{brief.metadata.readingTimeMinutes} min</span>
              </div>
              <div className="bg-[#050817] border border-line rounded-lg p-2.5 text-center">
                <FileText className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
                <span className="text-[10px] text-muted block font-mono">WORD COUNT</span>
                <span className="text-xs font-semibold text-ink">{brief.metadata.wordCount}</span>
              </div>
            </div>
          </div>

          <hr className="border-line" />

          <div>
            <h3 className="font-head font-semibold text-[11px] text-accent  tracking-wider mb-2">
              Verification status
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  triangulated
                    ? "bg-mint animate-pulse shadow-[0_0_8px_rgba(78,242,186,0.8)]"
                    : "bg-accent/60"
                }`}
              />
              <span className="text-xs font-semibold text-ink">{brief.metadata.triangulationStatus}</span>
            </div>
            <p className="text-[10px] text-muted mt-1.5 leading-relaxed">
              {triangulated
                ? "Claims cross-checked against live sources and labelled with confidence."
                : "Heuristic synthesis model output."}
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="panel p-4 flex flex-col gap-1.5">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-ink-soft hover:text-ink"
          >
            <span className="flex items-center gap-2">
              {copied ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4 text-muted" />}
              {copied ? "Copied" : "Copy markdown"}
            </span>
            <span className="text-[10px] text-accent/80 font-mono  bg-[#050817] px-1.5 py-0.5 rounded border border-line">CLIPBOARD</span>
          </button>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-ink-soft hover:text-ink"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-muted" />
              Download source (.md)
            </span>
            <span className="text-[10px] text-accent/80 font-mono  bg-[#050817] px-1.5 py-0.5 rounded border border-line">FILE</span>
          </button>
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-ink-soft hover:text-ink"
          >
            <span className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-muted" />
              Print research brief
            </span>
            <span className="text-[10px] text-accent/80 font-mono  bg-[#050817] px-1.5 py-0.5 rounded border border-line">PRINT</span>
          </button>
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-between py-2 px-3 hover:bg-white/5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-ink-soft hover:text-ink"
          >
            <span className="flex items-center gap-2">
              {shared ? <Check className="w-4 h-4 text-mint" /> : <Share2 className="w-4 h-4 text-muted" />}
              {shared ? "Link copied" : "Share briefing link"}
            </span>
            <span className="text-[10px] text-accent/80 font-mono  bg-[#050817] px-1.5 py-0.5 rounded border border-line">URL</span>
          </button>
        </div>
      </div>

      {/* Main Research Content Sheet */}
      <div className="lg:col-span-3 space-y-5">
        {/* Document Frame */}
        <div className="panel p-6 md:p-10 relative">
          {/* Subtle Document Grid Guide Header */}
          <div className="flex items-center justify-between border-b border-line pb-4 mb-6 text-[10px] text-accent/60 font-mono tracking-widest  print:hidden">
            <span>Synthesis brief | cited record</span>
            <span>ID: {brief.id.slice(0, 8).toUpperCase()}</span>
          </div>

          {/* Render the core Briefing document in markdown */}
          <div className="markdown-body">
            <ReactMarkdown>{brief.brief}</ReactMarkdown>
          </div>

          {/* Grounding Source Citations Segment */}
          {brief.citations.length > 0 && (
            <div className="mt-10 pt-8 border-t border-line print:break-inside-avoid">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4.5 h-4.5 text-accent" />
                <h4 className="font-head font-semibold text-xs  tracking-wider text-ink">
                  Grounding sources &amp; empirical citations ({brief.citations.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {brief.citations.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#050817] hover:bg-[#0c1430]/60 border border-line rounded-lg group transition-colors block text-left"
                  >
                    <span className="text-[10px] text-muted font-mono block mb-1">SOURCE [{idx + 1}]</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-ink-soft line-clamp-1 group-hover:text-ink transition-colors">
                        {source.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Strict compliance informational notice */}
          <div className="mt-8 p-3.5 bg-[#050817] border border-amber/30 rounded-lg flex items-start gap-2.5 text-[10px] text-ink-soft leading-relaxed print:hidden">
            <AlertCircle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber ">Research advisory:</span> this brief reflects a synthesis of sources grounded as of{" "}
              {new Date(brief.timestamp).toLocaleDateString()}. Claims carry confidence labels; cross-check primary literature before final decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}