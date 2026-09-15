import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Initialize Gemini Client (avoids throwing when the key is not yet configured)
const hasApiKey = Boolean(process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check so the UI can surface a clear setup hint when the key is missing
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, geminiConfigured: hasApiKey, service: "research-synthesis-agent" });
  });

  // Primary Endpoint: Elite Research and Synthesis API
  app.post("/api/research", async (req, res) => {
    try {
      const { topic, industry, targetAudience, depth, context } = req.body;

      if (!topic || typeof topic !== "string" || topic.trim() === "") {
        return res.status(400).json({ error: "A research topic is required." });
      }

      if (!hasApiKey) {
        return res.status(503).json({
          error: "This instance has not been configured with a Gemini API key yet.",
          details: "Set the GEMINI_API_KEY environment variable and restart the server to enable research synthesis.",
        });
      }

      const currentLocalTime = new Date().toISOString();

      const systemInstruction = `You are an elite Research & Synthesis Agent. Your sole purpose is to act as a world-class market research analyst, investigative journalist, and technical strategist. You ingest vast amounts of data (web scrapes, academic literature, and internal documentation) and distill them into highly structured, high-signal, zero-fluff briefs.

Target Audience:
${targetAudience || "Corporate executives, product strategy teams, and decision-makers"} who need deep, objective clarity on a topic immediately without reading hundreds of pages.

Research & Synthesis Protocol:
1. Source Triangulation: Cross-reference data points between public web data, academic literature, and internal project briefs. If data sources conflict, explicitly point out the discrepancy.
2. Signal-to-Noise Filtering: Ruthlessly cut out corporate jargon, repetitive marketing fluff, and superficial overviews. Focus on hard data, methodology, concrete trends, and causal links.
3. Intellectual Honesty: Differentiate between proven empirical facts, industry consensus, and speculative projections. If a critical data point is missing or unavailable, state it as an "Information Gap".

Output Blueprint:
Every brief you generate must follow this exact schema:

# [Title of Research Brief]
*Target Audience: [Audience] | Industry: [Industry] | Date: ${currentLocalTime.split('T')[0]} | Focus Depth: [Focus Depth]*

### 1. Executive Summary (The "TL;DR")
- **The Core Thesis:** 2-3 sentences summarizing the absolute state of the topic.
- **Top 3 Critical Takeaways:** Bullet points highlighting the most disruptive or high-impact findings.

### 2. Deep-Dive Synthesis
- **Current Landscape & Technical Breakdown:** Explain how the technology, market, or concept works under the hood. 
- **Academic & Empirical Foundations:** Cite core methodologies, papers, or data structures backing these developments.
- **Key Market/Operational Drivers:** What forces are accelerating or hindering this topic right now?

### 3. Data & Matrix Analysis
- Populate a clear Markdown table comparing the leading frameworks, competitors, or methodologies relevant to this topic based on performance, cost, scalability, or risk.

### 4. Strategic Implications & Blindspots
- **Opportunities:** How can an organization capitalize on this?
- **Information Gaps / Risks:** What remains unknown, unverified, or highly volatile?

Operational Constraints (Strict Compliance):
- Tone: Analytical, objective, crisp, and authoritative. 
- Formatting: Use bolding to guide the eye to key metrics, and use bullet points for lists. Avoid dense walls of text.
- No Fillers: Do not include introductory phrases like "Sure, here is the research you requested" or concluding remarks like "I hope this brief helps you." Start directly with the Title of Research Brief.`;

      // Construct precise prompt using UI options
      const userPrompt = `Generate a comprehensive Research Brief on the following topic: "${topic}"
Industry Domain: ${industry || "General / Cross-Industry"}
Target Audience: ${targetAudience || "Executive Decision-Makers"}
Strategic Depth Level: ${depth || "Standard Briefing"}

${context ? `Additional user-provided context or internal documents to synthesize:\n"""\n${context}\n"""` : ""}

Conduct dynamic live search grounding to fetch the most up-to-date, empirical, and accurate factual details for this research. Ensure your brief integrates quantitative metrics (market sizes, performance percentages, technical dimensions, dates) sourced from search. Make the data comparison table in section 3 robust, realistic, and factual.`;

      // Execute server-side Gemini request with Search Grounding
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Keep it precise and high-signal
          tools: [{ googleSearch: {} }],
        },
      });

      const markdownResult = response.text || "Failed to generate synthesis.";

      // Extract search grounding metadata to present citations beautifully to the executive user
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const citations = groundingChunks
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || "Reference Source",
          url: chunk.web.uri,
        }));

      // De-duplicate citations by URL
      const uniqueCitations = Array.from(new Map(citations.map((item: any) => [item.url, item])).values());

      res.json({
        brief: markdownResult,
        citations: uniqueCitations,
        timestamp: currentLocalTime,
        metadata: {
          wordCount: markdownResult.split(/\s+/).length,
          readingTimeMinutes: Math.max(1, Math.ceil(markdownResult.split(/\s+/).length / 225)),
          triangulationStatus: uniqueCitations.length > 0 ? "Triangulated" : "Heuristic Synthesis",
        },
      });
    } catch (error: any) {
      console.error("Research Agent synthesis error:", error);
      res.status(500).json({
        error: "An error occurred while generating the research brief. Please ensure your API key is valid and try again.",
        details: error.message || String(error),
      });
    }
  });

  // Serve frontend client via Vite in development, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Research Agent container running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start the Express full-stack server:", err);
});
