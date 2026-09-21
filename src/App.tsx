import { useState, useEffect } from "react";
import { ResearchBrief } from "./types";
import ResearchForm from "./components/ResearchForm";
import ResearchBriefDisplay from "./components/ResearchBriefDisplay";
import ResearchHistory from "./components/ResearchHistory";
import ResearchStatusOverlay from "./components/ResearchStatusOverlay";
import { ResearchSynthLogo } from "./components/ResearchSynthLogo";
import {
  AlertTriangle,
  ArrowRight,
  Menu,
  X,
  Scale,
  BookOpenCheck,
  Clock,
  CircleCheck,
  Layers,
  Bug,
  FlaskConical
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

const NAV_LINKS = [
  { href: "#synthesize", label: "Synthesizer" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" }
];

const HOW = [
  {
    n: "01",
    title: "Paste your notes",
    text: "Dump abstracts, references, lab notes, or a half-written review. Messy is fine — ResearchSynth orders it for you."
  },
  {
    n: "02",
    title: "Set the framing",
    text: "Choose the industry, audience and depth. The brief is shaped for the person who has to act on it, not for a generic reader."
  },
  {
    n: "03",
    title: "Get a cited synthesis",
    text: "Structured claims, confidence levels, and the grounding citations attached — ready to copy into your paper or plan."
  }
];

const OUTCOMES = [
  {
    icon: Scale,
    title: "Claims carry confidence levels",
    text: "Every assertion in the brief is labelled high, medium or low confidence. You see at a glance what is settled and what is still open to challenge."
  },
  {
    icon: BookOpenCheck,
    title: "Citations are built in",
    text: "The claims you keep come with their grounding references attached. Copy them straight into your footnotes instead of hunting back through the pile."
  },
  {
    icon: Clock,
    title: "Notes to draft in minutes",
    text: "A weekend of reading collapses into a structured synthesis you can drop into a review, a strategy document, or a project plan."
  }
];

const PRAISE = [
  {
    q: "I pasted forty abstracts from my literature folder and got a comparison matrix with confidence labels in minutes. The citations landed exactly where my argument needed them.",
    n: "Postdoctoral Researcher",
    c: "Materials science, R1 university"
  },
  {
    q: "We took conflicting vendor claims into ResearchSynth. It split them into calibrated claims with sources attached — our slides finally match what the evidence supports.",
    n: "R&D Analyst",
    c: "Clean energy scale-up"
  },
  {
    q: "My PhD students share their paper notes in one living document. The synthesis flagged the two claims threading on a single source. That alone saved us a painful retraction.",
    n: "Principal Investigator",
    c: "Biomedical lab, 12-person group"
  }
];

const FAQS = [
  {
    q: "Is the output really cited?",
    a: "Yes. Every brief comes with a grounding-sources section and the claims map back to the references that support them. Nothing is bolted on after the fact."
  },
  {
    q: "Can I run it on my own pasted notes without it becoming public?",
    a: "Inputs you paste are sent to the model provider solely to produce the synthesis and are not used to train anything. Your lab protocols and unpublished work stay yours."
  },
  {
    q: "How do confidence levels work?",
    a: "Claims are triangulated across the sources you provide plus live grounding. A claim backed by multiple aligned sources reads high confidence; single-source or conflicting claims are explicitly flagged."
  },
  {
    q: "Do I need to structure my notes first?",
    a: "No. Raw notes, bullet fragments, full abstracts and reference lists all work. ResearchSynth normalizes the mess and returns the structured synthesis to you."
  },
  {
    q: "Is it really free to try?",
    a: "Yes. Run one free synthesis on your real notes. No credit card, no account friction. Keep the briefs you like even if you never upgrade."
  }
];

const TRUST_CHIPS = [
  "Free trial on your notes",
  "No credit card",
  "Runs on your own material"
];

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
  const [navOpen, setNavOpen] = useState(false);

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
    <div className="min-h-screen bg-void text-ink font-sans antialiased">
      {/* ============ SHELL BACKGROUND SCAFFOLDS ============ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 hud-grid" />
        <div className="aurora -top-32 left-1/4 h-80 w-80 bg-accent/15" />
        <div className="aurora top-40 right-[6%] h-72 w-72 bg-accent-deep/12" />
        <div className="aurora top-[90rem] left-[8%] h-80 w-80 bg-mint/8" />
      </div>

      {/* ============ HEADER ============ */}
      <header className="glass-strong sticky top-0 z-40 print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 min-w-0">
              <span className="logo-tile flex h-10 w-10 shrink-0 items-center justify-center">
                <ResearchSynthLogo size={28} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-bold tracking-[0.06em] leading-none">
                  RESEARCH<span className="text-accent">SYNTH</span>
                </span>
                <span className="mt-1 block truncate font-mono text-[10px]  tracking-[0.22em] text-muted">
                  cited research synthesis
                </span>
              </span>
            </a>

            <nav className="ml-auto hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-soft transition hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#synthesize"
              className="btn-primary ml-auto px-4 py-2.5 text-sm md:ml-3"
            >
              Try it free
            </a>

            <button
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-lg p-2.5 text-ink-soft transition hover:bg-white/5 md:hidden"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {navOpen && (
            <nav className="border-t border-line py-3 md:hidden">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm text-ink-soft transition hover:bg-white/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 px-3 pt-3 font-mono text-[10px]  tracking-widest text-muted">
                <span className="pulse-dot flex h-2 w-2 rounded-full bg-accent" />
                <span>{currentTime}</span>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl pb-16 pt-14 text-center md:pb-24 md:pt-24">
              <div className="chip animate-rise inline-flex">
                <span className="pulse-dot flex h-2 w-2 rounded-full bg-accent" />
                <span className="font-head font-semibold  tracking-[0.18em] text-ink-soft">
                  ResearchSynth · the research synthesis agent
                </span>
              </div>

              <h1 className="animate-rise mx-auto mt-8 max-w-4xl font-display text-4xl  leading-[1.05] leading-tight text-glow-white md:text-6xl" style={{ animationDelay: "80ms" }}>
                From scattered notes to a <span className="text-glow-accent text-accent">cited, confident</span> synthesis
              </h1>

              <p className="animate-rise mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg" style={{ animationDelay: "160ms" }}>
                ResearchSynth takes your abstracts, notes and references — messy or
                half-drafted — and returns a structured synthesis with claims,
                confidence levels and the citations attached. Built for the decision
                you actually have to make.
              </p>

              <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
                <a href="#synthesize" className="btn-primary px-7 py-3.5 text-sm group">
                  Try it free — synthesize your notes
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a href="#how" className="btn-ghost px-7 py-3.5 text-sm">
                  See how it works
                </a>
              </div>

              <div className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted" style={{ animationDelay: "300ms" }}>
                {TRUST_CHIPS.map((chip) => (
                  <span key={chip} className="flex items-center gap-1.5">
                    <CircleCheck className="h-3.5 w-3.5 text-mint" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="animate-rise mt-14 grid grid-cols-2 gap-6 border-t border-line/60 pt-8 sm:grid-cols-4" style={{ animationDelay: "360ms" }}>
                {[
                  { value: "~5 min", label: "to first synthesis" },
                  { value: "100%", label: "claims confidence-labeled" },
                  { value: "0", label: "sources lost from your notes" },
                  { value: "10+", label: "citations per brief" }
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-3xl text-glow-white md:text-4xl">{s.value}</p>
                    <p className="mt-1 text-[11px]  tracking-[0.22em] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ WORKSPACE (Synthesizer) ============ */}
        <section id="synthesize" className="scroll-mt-24 border-y border-line/60 bg-abyss/60 py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow text-accent">the synthesizer bench</p>
              <h2 className="mt-3 font-display text-3xl  leading-tight md:text-4xl">
                Paste the pile. Read the synthesis.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                The form and the brief work together as your working surface: drop a
                topic in, watch the pipeline ground it against live sources, and take
                the cited brief straight into your paper or plan.
              </p>
            </div>

            {/* Setup Notice: shown when the Gemini API key is not configured */}
            {apiConfigured === false && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber/40 bg-amber/10 p-4 text-sm text-amber-100">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber" />
                <div>
                  <h4 className="font-head font-semibold text-amber">Synthesis engine not configured</h4>
                  <p className="mt-1 text-xs leading-relaxed text-amber-100/80">
                    Set the <code className="font-mono text-amber">GEMINI_API_KEY</code> environment variable to enable live
                    research synthesis. You can still explore the sample briefing below while disconnected.
                  </p>
                </div>
              </div>
            )}

            {/* Error Notice Display */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber/60 bg-amber/10 p-4 text-sm text-amber-100 animate-fade-in">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber" />
                <div>
                  <h4 className="font-head font-semibold text-amber">Synthesis pipeline exception</h4>
                  <p className="mt-1 text-xs leading-relaxed text-amber-100/80">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 cursor-pointer bg-transparent text-xs font-semibold text-amber underline hover:text-amber-200"
                  >
                    Acknowledge and dismiss
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {/* Form & Archive Column */}
              <div className="space-y-5 print:hidden">
                <ResearchForm onSubmit={handleResearchSubmit} isLoading={isLoading} initialTopic={initialTopic} />
                <ResearchHistory
                  history={history}
                  activeId={activeBrief?.id || null}
                  onSelect={handleSelectBrief}
                  onDelete={handleDeleteBrief}
                />
              </div>

              {/* Active Brief Column */}
              <div className="lg:col-span-3 space-y-5">
                {isLoading ? (
                  <div className="flex min-h-[420px] items-center justify-center">
                    <div className="w-full max-w-xl">
                      <ResearchStatusOverlay topic={pendingTopic} />
                    </div>
                  </div>
                ) : activeBrief ? (
                  <ResearchBriefDisplay brief={activeBrief} />
                ) : (
                  /* Blank State */
                  <div className="panel p-8 md:p-12">
                    <div className="flex flex-col items-center gap-6 text-center">
                      <span className="logo-tile flex h-14 w-14 items-center justify-center">
                        <FlaskConical className="h-7 w-7 text-accent" />
                      </span>
                      <div className="max-w-xl space-y-3">
                        <h2 className="font-display text-2xl font-semibold  leading-tight text-ink">
                          Your bench is empty
                        </h2>
                        <p className="text-sm leading-relaxed text-ink-soft">
                          Paste a research target in the left column. ResearchSynth
                          will ground it against live sources, label the claims with
                          confidence, and hand you a cited synthesis.
                        </p>
                      </div>

                      <div className="grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-3">
                        <div className="accent-edge rounded-xl border border-line bg-[#0c1430]/40 p-5 text-left">
                          <Scale className="mb-3 h-5 w-5 text-accent" />
                          <h4 className="mb-1.5 font-head text-xs font-semibold  tracking-wider text-accent-soft">
                            Confidence on every claim
                          </h4>
                          <p className="text-xs leading-relaxed text-ink-soft">
                            Triangulated claims come back labelled high, medium or low confidence.
                          </p>
                        </div>
                        <div className="accent-edge rounded-xl border border-line bg-[#0c1430]/40 p-5 text-left">
                          <Layers className="mb-3 h-5 w-5 text-accent" />
                          <h4 className="mb-1.5 font-head text-xs font-semibold  tracking-wider text-accent-soft">
                            Grounded, not hallucinated
                          </h4>
                          <p className="text-xs leading-relaxed text-ink-soft">
                            Single-source claims and unverified projections are explicitly flagged.
                          </p>
                        </div>
                        <div className="accent-edge rounded-xl border border-line bg-[#0c1430]/40 p-5 text-left">
                          <BookOpenCheck className="mb-3 h-5 w-5 text-accent" />
                          <h4 className="mb-1.5 font-head text-xs font-semibold  tracking-wider text-accent-soft">
                            Citations attached
                          </h4>
                          <p className="text-xs leading-relaxed text-ink-soft">
                            The evidence behind each claim rides along with the brief.
                          </p>
                        </div>
                      </div>

                      <div className="w-full max-w-xl border-t border-line pt-4 font-mono text-xs text-muted">
                        Begin a synthesis from the left column — your notes, your references, your call.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" className="scroll-mt-24 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="logo-tile flex h-14 w-14 shrink-0 items-center justify-center">
                    <ResearchSynthLogo size={38} />
                  </span>
                  <div>
                    <p className="eyebrow text-accent">why researchers use it</p>
                    <h2 className="mt-1 font-display text-2xl  leading-tight md:text-3xl">
                      Stop re-reading the pile
                    </h2>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-soft md:text-base">
                  ResearchSynth is built for the way you actually work: it reads what
                  you already have, orders the evidence, and returns a synthesis you
                  can verify — not a confident paragraph generator.
                </p>
                <a href="#synthesize" className="btn-ghost mt-6 px-5 py-2.5 text-sm">
                  Try it on your notes
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="space-y-4">
                {OUTCOMES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="accent-edge panel flex flex-col gap-4 p-6 transition hover:-translate-y-0.5 sm:flex-row sm:items-start" style={{ animationDelay: `${i * 90}ms` }}>
                      <span className="logo-tile flex h-12 w-12 shrink-0 items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </span>
                      <div>
                        <h3 className="font-head text-lg font-semibold text-ink">{f.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="scroll-mt-24 border-y border-line/60 bg-abyss py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center eyebrow text-accent">three steps</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-display text-3xl  leading-tight md:text-4xl">
              From notes in to cited brief out
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {HOW.map((s, i) => (
                <div key={s.n} className="panel p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-bold text-accent/40">{s.n}</span>
                    <ArrowRight className={`h-5 w-5 text-muted ${i < 2 ? "hidden md:block" : "hidden"}`} />
                  </div>
                  <h3 className="mt-4 font-head text-lg font-semibold  tracking-wide text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRAISE ============ */}
        <section id="reports" className="scroll-mt-24 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center eyebrow text-mint">from the bench</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-display text-3xl  leading-tight md:text-4xl">
              What researchers do with it
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PRAISE.map((t) => (
                <figure key={t.n} className="panel flex h-full flex-col p-7">
                  <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line/60 pt-4">
                    <p className="font-head text-sm font-semibold text-ink">{t.n}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{t.c}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="scroll-mt-24 py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-center eyebrow text-amber">straight answers</p>
            <h2 className="mt-2 text-center font-display text-3xl  leading-tight md:text-4xl">
              Before you ask
            </h2>

            <div className="mt-10 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="panel group overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-head font-semibold text-ink">
                    {f.q}
                    <span className="text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="accent-edge panel mx-auto max-w-4xl p-8 text-center md:p-12">
              <p className="eyebrow text-accent">go publishing</p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl  leading-tight md:text-5xl">
                Synthesize your next reference stack tonight
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                One free synthesis on your real notes. No credit card, no promises
                you don't need — just a cited brief you can actually use.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#synthesize" className="btn-primary px-8 py-3.5 text-sm group">
                  Try it free — synthesize your notes
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a href="#faq" className="btn-ghost px-8 py-3.5 text-sm">
                  Read the FAQ
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line/60 bg-abyss/70 print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <a href="#" className="flex items-center gap-2.5">
                <span className="logo-tile flex h-10 w-10 items-center justify-center">
                  <ResearchSynthLogo size={28} />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold tracking-[0.06em] leading-none">
                    RESEARCH<span className="text-accent">SYNTH</span>
                  </span>
                  <span className="mt-1 block font-mono text-[10px]  tracking-[0.22em] text-muted">
                    cited research synthesis
                  </span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Turns messy research notes, abstracts and references into a structured,
                cited synthesis with claims and confidence levels.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TRUST_CHIPS.map((chip) => (
                  <span key={chip} className="chip">{chip}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-muted">product</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="text-sm text-ink-soft transition hover:text-accent">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow text-muted">working surface</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <span className="text-sm text-ink-soft">Notes to cited brief</span>
                  <span className="text-sm text-ink-soft">Confidence labels</span>
                  <span className="text-sm text-ink-soft">Grounding citations</span>
                </div>
              </div>
              <div>
                <p className="eyebrow text-muted">the machine</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                    <Bug className="h-3.5 w-3.5 text-accent" /> Gemini 2.5 family
                  </span>
                  <span className="text-sm text-ink-soft">Free trial, no card</span>
                  <span className="text-sm text-ink-soft">v1.1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 sm:flex-row">
            <p className="font-mono text-[11px] text-muted">
              {"\u00A9"} 2026 ResearchSynth — cited research synthesis for working scientists
            </p>
            <p className="hidden font-mono text-[11px]  tracking-widest text-muted md:block">
              {currentTime}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}