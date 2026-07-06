export interface Citation {
  title: string;
  url: string;
}

export interface ResearchMetadata {
  wordCount: number;
  readingTimeMinutes: number;
  triangulationStatus: "Triangulated" | "Heuristic Synthesis";
}

export interface ResearchBrief {
  id: string;
  topic: string;
  industry: string;
  targetAudience: string;
  depth: "standard" | "deep";
  context?: string;
  brief: string;
  citations: Citation[];
  timestamp: string;
  metadata: ResearchMetadata;
}

export const PRESET_INDUSTRIES = [
  "Artificial Intelligence & Software",
  "Biomedical & Healthcare",
  "Automotive & Clean Tech",
  "FinTech & Decentralized Finance",
  "Aerospace & Defense",
  "Energy & Raw Materials",
  "Consumer Goods & E-Commerce",
  "Socio-Political & Economics",
  "General / Cross-Industry"
];

export const PRESET_AUDIENCES = [
  "Corporate Executives (C-Suite)",
  "Product Strategy & Management",
  "Technical & Engineering Teams",
  "Investigative Journalists & Scholars",
  "Venture Capitalists & Investors"
];

export const SUGGESTED_TOPICS = [
  {
    topic: "Next-gen Solid State Battery commercialization timeline and barriers",
    industry: "Automotive & Clean Tech",
    audience: "Corporate Executives (C-Suite)"
  },
  {
    topic: "The impact of generative AI coding assistants on software developer productivity",
    industry: "Artificial Intelligence & Software",
    audience: "Product Strategy & Management"
  },
  {
    topic: "CRISPR gene-editing therapies pricing structures and regulatory approval hurdles",
    industry: "Biomedical & Healthcare",
    audience: "Venture Capitalists & Investors"
  },
  {
    topic: "Supply chain exposure to rare earth element restrictions by 2028",
    industry: "Energy & Raw Materials",
    audience: "Venture Capitalists & Investors"
  }
];
