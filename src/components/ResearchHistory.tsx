import { ResearchBrief } from "../types";
import { BookOpen, Calendar, Trash2, Clock, Eye } from "lucide-react";

interface ResearchHistoryProps {
  history: ResearchBrief[];
  activeId: string | null;
  onSelect: (brief: ResearchBrief) => void;
  onDelete: (id: string) => void;
}

export default function ResearchHistory({ history, activeId, onSelect, onDelete }: ResearchHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-[#0a0f24] rounded-xl border border-[#1b2a4a] p-6 text-center space-y-3">
        <div className="w-10 h-10 bg-[#0c1430] text-red-500 rounded-full flex items-center justify-center mx-auto border border-[#1b2a4a]">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-300">No Archives Found</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your intelligence synthesis briefs will reside here once generated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Briefing Archive</h3>
        <span className="text-[10px] font-mono text-slate-300 bg-[#0c1430] border border-[#1b2a4a] px-1.5 py-0.5 rounded">
          {history.length} Record{history.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {history.map((brief) => {
          const isActive = brief.id === activeId;
          const formattedDate = new Date(brief.timestamp).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={brief.id}
              className={`group flex items-center justify-between p-3.5 rounded-lg border transition-all text-left ${
                isActive
                  ? "bg-[#121c42] border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                  : "bg-[#050817] border-[#1b2a4a] hover:border-red-900/40 text-slate-300 hover:text-white"
              }`}
            >
              <button
                onClick={() => onSelect(brief)}
                className="flex-1 text-left pr-2 focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className={`w-3.5 h-3.5 ${isActive ? "text-red-400" : "text-slate-500"}`} />
                  <span className={`text-[10px] font-mono tracking-wider ${isActive ? "text-red-300" : "text-slate-400"}`}>
                    {formattedDate} • {brief.industry}
                  </span>
                </div>
                <h4 className={`font-medium text-xs line-clamp-2 leading-snug ${isActive ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                  {brief.topic}
                </h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock className={`w-3 h-3 ${isActive ? "text-red-400" : "text-slate-500"}`} />
                  <span className={`text-[9px] font-mono ${isActive ? "text-red-300" : "text-slate-400"}`}>
                    {brief.metadata.readingTimeMinutes}m Read • {brief.metadata.wordCount} words
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelect(brief)}
                  title="View Briefing"
                  className={`p-2 rounded-md transition-colors focus:outline-hidden cursor-pointer ${
                    isActive
                      ? "text-slate-300 hover:bg-[#1c2d66]"
                      : "text-slate-400 hover:bg-[#0c1430] hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(brief.id);
                  }}
                  title="Delete Briefing"
                  className={`p-2 rounded-md transition-colors focus:outline-hidden cursor-pointer ${
                    isActive
                      ? "text-slate-400 hover:bg-[#1c2d66] hover:text-red-400"
                      : "text-slate-400 hover:bg-[#0c1430] hover:text-red-550"
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
