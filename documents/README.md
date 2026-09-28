# Research & Synthesis Agent

An elite AI-powered market research, technical strategy, and investigative synthesis platform. It uses Gemini with real-time **search grounding** to produce structured, zero-fluff executive briefing documents complete with triangulation status, quantitative data matrices, and grounding citations.

## Features

- **Search-grounded synthesis** — live web grounding feeds empirical, up-to-date data into every brief.
- **Strict executive output schema** — TL;DR executive summary, deep-dive synthesis, data & matrix analysis, strategic implications, and information gaps.
- **Source triangulation** — conflicting claims and missing data are explicitly flagged rather than papered over.
- **Customizable protocol parameters** — industry domain, target audience, and standard vs. deep advisory depth, plus optional pasted internal context.
- **Briefing archive** — locally persisted history, copy / download (.md) / print / share actions.
- **Graceful degradation** — the UI surfaces a clear setup hint when no `GEMINI_API_KEY` is configured instead of crashing.

## Run Locally

**Prerequisite:** Node.js 18+

1. Install dependencies:
   ```
   npm install
   ```
2. Set your Gemini API key in a `.env` file (see `.env.example`):
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The app runs at [http://localhost:3000](http://localhost:3000).

## Deploy

- **Vercel:** deploy the repo and set the `GEMINI_API_KEY` environment variable. Serverless handler lives in `api/index.ts` (`vercel.json` rewrites `/api/*`).
- **Self-hosted:** `npm run build` then `npm start` serves the built client and API on port `3000`.

## Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start full-stack dev server (Express + Vite) |
| `npm run build` | Build the client bundle and server entrypoint |
| `npm start` | Run the production server |
| `npm run lint` | Type-check with `tsc --noEmit` |

## How It Works

The frontend posts a research request to `POST /api/research`. The server sends a structured system instruction (research & synthesis protocol) plus the user's parameters to the Gemini model with the `googleSearch` tool enabled. Grounding chunks returned by the model are de-duplicated and presented as citations alongside the rendered Markdown brief.