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
      <div className="panel p-6 text-center space-y-3">
        <div className="w-10 h-10 bg-[#0c1430] text-accent rounded-full flex items-center justify-center mx-auto border border-line">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-head font-semibold text-xs uppercase tracking-wider text-ink-soft">No archives found</h4>
          <p className="text-xs text-muted max-w-xs mx-auto">
            Your synthesized briefs will reside here once generated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-muted">Briefing archive</h3>
        <span className="text-[10px] font-mono text-ink-soft bg-[#0c1430] border border-line px-1.5 py-0.5 rounded">
          {history.length} Record{history.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">
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
                  ? "bg-[#121c42] border-accent/60 text-ink shadow-[0_0_12px_rgba(192,132,252,0.18)]"
                  : "bg-[#050817] border-line text-ink-soft hover:border-accent/40 hover:text-ink"
              }`}
            >
              <button
                onClick={() => onSelect(brief)}
                className="flex-1 text-left pr-2 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className={`w-3.5 h-3.5 ${isActive ? "text-accent" : "text-muted"}`} />
                  <span className={`text-[10px] font-mono tracking-wider ${isActive ? "text-accent" : "text-ink-soft/70"}`}>
                    {formattedDate} • {brief.industry}
                  </span>
                </div>
                <h4 className={`font-medium text-xs line-clamp-2 leading-snug ${isActive ? "text-ink" : "text-ink-soft"}`}>
                  {brief.topic}
                </h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <Clock className={`w-3 h-3 ${isActive ? "text-accent" : "text-muted"}`} />
                  <span className={`text-[9px] font-mono ${isActive ? "text-accent/90" : "text-muted"}`}>
                    {brief.metadata.readingTimeMinutes}m read • {brief.metadata.wordCount} words
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelect(brief)}
                  title="View Briefing"
                  className={`p-2 rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? "text-ink-soft hover:bg-[#1c2d66] hover:text-ink"
                      : "text-muted hover:bg-[#0c1430] hover:text-ink"
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
                  className={`p-2 rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? "text-ink-soft hover:bg-[#1c2d66] hover:text-accent"
                      : "text-muted hover:bg-[#0c1430] hover:text-accent"
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