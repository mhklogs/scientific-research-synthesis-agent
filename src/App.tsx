import { useState, useEffect } from "react";
import { ResearchBrief } from "./types";
import ResearchForm from "./components/ResearchForm";
import ResearchBriefDisplay from "./components/ResearchBriefDisplay";
import ResearchHistory from "./components/ResearchHistory";
import ResearchStatusOverlay from "./components/ResearchStatusOverlay";
import { 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  User,
  Terminal,
  Cpu
} from "lucide-react";

// Pre-seeded high-fidelity sample research briefing
const PRESEEDED_SAMPLE: ResearchBrief = {
  id: "solid-state-battery-sample-2026",
  topic: "Next-generation Solid State Battery commercialization timeline and barriers",
  industry: "Automotive & Clean Tech",
  targetAudience: "Corporate Executives (C-Suite)",
  depth: "standard",
  timestamp: new Date("2026-06-28T08:00:00Z").toISOString(),
  brief: `# Solid State Batteries: Commercialization Timeline & Strategic Barriers
*Target Audience: Corporate Executives (C-Suite) | Industry: Automotive & Clean Tech | Date: 2026-06-28 | Focus Depth: Standard Briefing*

### 1. Executive Summary (The "TL;DR")
- **The Core Thesis:** Solid-state battery (SSB) technology represents the next paradigm shift in energy density, charging speed, and safety profiles. However, true widespread commercial market adoption is bottle-necked by advanced manufacturing scalability, material stability constraints, and cost premiums. Mainstream deployment is projected to occur as a phased trajectory between **2028 and 2033**.
- **Top 3 Critical Takeaways:**
  - **Anerobic Multi-Layer Manufacturing Barriers:** Atmospheric control and ultra-thin sulfide/oxide electrolyte sintering processes remain the principal cost-driver, resulting in an initial **40-60% price premium** over conventional liquid electrolyte cells.
  - **The Silicon-Anode Hybrid Bridging Strategy:** Prominent OEMs are implementing temporary silicon-anode or semi-solid platforms as an intermediate bridge toward fully solid-state systems.
  - **The Sulfide-Sintering Dominance:** Sulfide-based inorganic solid electrolytes have emerged as the leading technical pathway due to superior ionic conductivity, despite moisture-sensitivity challenges.

### 2. Deep-Dive Synthesis
- **Current Landscape & Technical Breakdown:**
  Liquid lithium-ion chemistries are approaching their theoretical threshold (~350 Wh/kg). Solid-state systems replace volatile organic liquid solvents with inorganic ceramic, polymer, or glass electrolytes. This architecture enables the utilization of pure lithium-metal anodes, raising energy densities to **450-550 Wh/kg** while virtually eliminating thermal runaway risks. Under the hood, ionic transport relies on lithium diffusion through solid interfaces, requiring high external stack pressure (up to 5-10 MPa) to maintain electrical contact and prevent structural delamination during expansion cycles.
- **Academic & Empirical Foundations:**
  Current experimental methodologies focus heavily on sulfide-type solid electrolytes (such as Li10GeP2S12 - LGPS) which demonstrate ionic conductivities exceeding $10^{-2}$ S/cm, comparable to liquid electrolytes. Academic literature targets the mechanical mechanics of dendrite growth through grain boundaries, demonstrating that localized stress concentrations, rather than material purity alone, induce short-circuit failures in ceramic separators.
- **Key Market/Operational Drivers:**
  - **The Supercharger Charging Demands:** Increasing global pressure for extreme fast charging (XFC) capabilities of <10 minutes without accelerating degradation.
  - **The Automotive Weight Reduction:** OEMs are actively seeking modular weight reductions to improve heavy-duty commercial EV payloads and overall driving range.
  - **The Supply Chain Decentralization:** Geopolitical mandates are pushing for structural supply-chain reshoring, highlighting safety regulations on battery transportation.

### 3. Data & Matrix Analysis
| Framework / Pathway | Ionic Conductivity | Mechanical Rigidity | Cost / Scalability | Primary OEM Sponsors |
| :--- | :--- | :--- | :--- | :--- |
| **Sulfide Electrolytes** (LGPS/Argyrodites) | **Excellent** (~1.2x10^-2 S/cm) | Moderate (Fragile grain boundaries) | **High Cost** (Requires dry room synthesis) | Toyota, Nissan, Solid Power (Ford/BMW) |
| **Oxide Electrolytes** (LLZO/LATP) | Moderate (~10^-3 S/cm) | **Very High** (Excellent dendrite resistance) | Very High (Brittle, requires extreme sintering) | Volkswagen (QuantumScape) |
| **Polymer Electrolytes** (PEO-based) | Low (Requires >60°C operating heat) | Low (Poor mechanical barrier) | **Low Cost** (Utilizes existing roll-to-roll lines) | Blue Solutions (Bolloré Group) |

### 4. Strategic Implications & Blindspots
- **Opportunities:**
  - **First-Mover Licensing Premium:** Early intellectual-property claims on roll-to-roll sintering equipment present massive licensing opportunities.
  - **Grid-Scale Micro-Storage:** Deploying first-generation lower-yield solid-state cells into high-density industrial micro-grids where high weight is not a penalty.
- **Information Gaps / Risks:**
  - **Aging Delamination Mechanics:** Long-term volumetric expansion degradation rates (after 800+ cycles) are not publicly quantified.
  - **Moisture Exposure Toxicity:** In sulfide platforms, exposure to ambient humidity creates highly toxic hydrogen sulfide ($H_2S$) gas, demanding strict manufacturing protocols.`,
  citations: [
    { title: "Sulfide-based solid state electrolyte research paper review", url: "https://www.nature.com/articles/nenergy" },
    { title: "Toyota Solid State Battery Commercial Development Forecast", url: "https://www.toyota-global.com" },
    { title: "QuantumScape LLZO Solid Electrolyte Engineering Milestones", url: "https://www.quantumscape.com" }
  ],
  metadata: {
    wordCount: 785,
    readingTimeMinutes: 4,
    triangulationStatus: "Triangulated"
  }
};

export default function App() {
  const initialTopic =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("topic") || undefined
      : undefined;

  const [history, setHistory] = useState<ResearchBrief[]>([]);
  const [activeBrief, setActiveBrief] = useState<ResearchBrief | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTopic, setPendingTopic] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);

  // Initialize and synchronize history
  useEffect(() => {
    const saved = localStorage.getItem("research_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        if (parsed.length > 0) {
          setActiveBrief(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse history, resetting:", e);
        setHistory([PRESEEDED_SAMPLE]);
        setActiveBrief(PRESEEDED_SAMPLE);
      }
    } else {
      // Seed with initial high-fidelity sample brief
      setHistory([PRESEEDED_SAMPLE]);
      setActiveBrief(PRESEEDED_SAMPLE);
      localStorage.setItem("research_history", JSON.stringify([PRESEEDED_SAMPLE]));
    }

    // Keep dynamic UTC clock ticking for executive aesthetics
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toUTCString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Surface graceful setup status when the Gemini API key is not configured
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setApiConfigured(Boolean(d.geminiConfigured)))
      .catch(() => setApiConfigured(true));

    return () => clearInterval(interval);
  }, []);

  const handleResearchSubmit = async (formData: {
    topic: string;
    industry: string;
    targetAudience: string;
    depth: "standard" | "deep";
    context: string;
  }) => {
    setIsLoading(true);
    setPendingTopic(formData.topic);
    setError(null);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || errData.details || "Failed to contact synthesis agent.");
      }

      const data = await response.json();

      const newBrief: ResearchBrief = {
        id: `brief-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        topic: formData.topic,
        industry: formData.industry,
        targetAudience: formData.targetAudience,
        depth: formData.depth,
        context: formData.context,
        brief: data.brief,
        citations: data.citations,
        timestamp: data.timestamp,
        metadata: data.metadata,
      };

      const updatedHistory = [newBrief, ...history];
      setHistory(updatedHistory);
      setActiveBrief(newBrief);
      localStorage.setItem("research_history", JSON.stringify(updatedHistory));
    } catch (err: any) {
      console.error("Research API execution failed:", err);
      setError(err.message || "An unexpected network or AI pipeline error occurred.");
    } finally {
      setIsLoading(false);
      setPendingTopic("");
    }
  };

  const handleDeleteBrief = (id: string) => {
    const updated = history.filter((b) => b.id !== id);
    setHistory(updated);
    localStorage.setItem("research_history", JSON.stringify(updated));

    if (activeBrief?.id === id) {
      setActiveBrief(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleSelectBrief = (brief: ResearchBrief) => {
    setActiveBrief(brief);
    setError(null);
    // Smooth scroll down to brief display on small screens
    const el = document.getElementById("briefing-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#040815] text-slate-100 selection:bg-red-600 selection:text-white font-sans antialiased bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#040815] to-[#010208]">
      {/* Top Professional Header Banner */}
      <header className="bg-[#070d1e] border-b border-red-950/80 sticky top-0 z-40 print:hidden shadow-[0_1px_15px_rgba(220,38,38,0.07)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="font-display font-semibold text-base text-red-500 tracking-tight">
            Research & Synthesis Agent
          </h1>
        </div>
      </header>

      {/* Main Core Work Space container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Setup Notice: shown when the Gemini API key is not configured */}
      {apiConfigured === false && (
        <div className="bg-amber-950/20 border border-amber-800/60 rounded-xl p-4 flex items-start gap-3 text-sm text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold font-display text-amber-300">Synthesis engine not configured</h4>
            <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
              Set the <code className="font-mono text-amber-300">GEMINI_API_KEY</code> environment variable to enable live research synthesis. You can still explore the sample briefing below while disconnected.
            </p>
          </div>
        </div>
      )}

      {/* Error Notice Display */}
        {error && (
          <div className="bg-red-950/20 border border-red-850/60 rounded-xl p-4 flex items-start gap-3 text-sm text-red-200 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold font-display text-red-400">Synthesis Pipeline Exception</h4>
              <p className="text-xs text-red-300 mt-1 leading-relaxed">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-xs font-semibold text-red-400 underline mt-2 hover:text-red-300 focus:outline-hidden"
              >
                Acknowledge and dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Form & Archive Control Column */}
          <div className="lg:col-span-1 space-y-6 print:hidden">
            <ResearchForm onSubmit={handleResearchSubmit} isLoading={isLoading} initialTopic={initialTopic} />
            <ResearchHistory 
              history={history} 
              activeId={activeBrief?.id || null} 
              onSelect={handleSelectBrief}
              onDelete={handleDeleteBrief}
            />
          </div>

          {/* Active Brief Display/Progress Column */}
          <div className="lg:col-span-3 space-y-6">
            {isLoading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="w-full max-w-xl">
                  <ResearchStatusOverlay topic={pendingTopic} />
                </div>
              </div>
            ) : activeBrief ? (
              <ResearchBriefDisplay brief={activeBrief} />
            ) : (
              /* Blank State Landing Experience */
              <div className="bg-[#0a0f24] border border-[#1b2a4a] shadow-xs rounded-xl p-8 md:p-12 text-center space-y-8 flex flex-col items-center shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                <div className="space-y-3 max-w-xl">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-semibold text-2xl tracking-tight text-white">
                    Deployed Intelligence Protocols
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    This workspace behaves as a full-service market intelligence desk, sourcing real-time web variables and synthesizing rigorous briefs adhering to strict executive frameworks.
                  </p>
                </div>

                {/* Core Synthesis Tenets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
                  <div className="border border-[#14203e] rounded-xl p-5 text-left bg-[#0c1430]/40 hover:border-red-900/40 transition-colors">
                    <TrendingUp className="w-5 h-5 text-red-500 mb-3" />
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-red-400 mb-1.5">Source Triangulation</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cross-references web search indices and academic data blocks. Conflicting claims are isolated for strategic exposure.
                    </p>
                  </div>
                  <div className="border border-[#14203e] rounded-xl p-5 text-left bg-[#0c1430]/40 hover:border-red-900/40 transition-colors">
                    <Terminal className="w-5 h-5 text-red-500 mb-3" />
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-red-400 mb-1.5">Signal-to-Noise Filtering</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ruthlessly isolates core technical parameters and operational vectors from superficial PR materials.
                    </p>
                  </div>
                  <div className="border border-[#14203e] rounded-xl p-5 text-left bg-[#0c1430]/40 hover:border-red-900/40 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-red-500 mb-3" />
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-red-400 mb-1.5">Intellectual Honesty</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Explicitly isolates unverified metrics, high-volatility projections, and information blindspots.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono pt-4 border-t border-[#1b2a4a] w-full max-w-xl">
                  Enter a research target in the left column to begin synthesis.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
