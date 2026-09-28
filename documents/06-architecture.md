# scientific-research-synthesis-agent — Architecture Summary

> Generated from static analysis on 2026-09-28.

## Components

| Layer | Present | Evidence |
| --- | --- | --- |
| Presentation / UI | yes | 0 route module(s), 37 component file(s) |
| API / server | yes | 0 handler(s), entrypoints: api/index.ts, optimared-ai-pricing-agent/GetAuto/liberty-assist/referralclose-llc-new/Bridgebot/api/index.ts, optimared-ai-pricing-agent/GetAuto/liberty-assist/referralclose-llc-new/Bridgebot/server.ts, optimared-ai-pricing-agent/api/index.ts |
| Domain / business logic | unclear | no dedicated layer detected |
| Persistence | yes | @supabase/supabase-js |
| Authentication | no | none detected |

## Detected frameworks and libraries

| Package | Purpose (inferred) |
| --- | --- |
| `@google/genai` | dependency |
| `@supabase/supabase-js` | Supabase |
| `@tailwindcss/vite` | dependency |
| `@types/express` | dependency |
| `@types/node` | dependency |
| `@types/react` | dependency |
| `@types/react-dom` | dependency |
| `@vitejs/plugin-react` | dependency |
| `autoprefixer` | dependency |
| `dexie` | dependency |
| `dexie-react-hooks` | dependency |
| `dotenv` | dependency |
| `esbuild` | esbuild |
| `express` | Express |
| `lucide-react` | dependency |
| `motion` | dependency |
| `nodemailer` | dependency |
| `oxlint` | dependency |
| `postcss` | dependency |
| `react` | React |
| `react-dom` | React |
| `react-markdown` | dependency |
| `react-router-dom` | dependency |
| `tailwindcss` | Tailwind CSS |
| `tsx` | dependency |
| `twilio` | dependency |
| `typescript` | dependency |
| `vite` | Vite |
| `vite-plugin-pwa` | dependency |

## Runtime and delivery

| Concern | Finding |
| --- | --- |
| Language mix | TypeScript, JavaScript, CSS, HTML, SQL |
| Package manager | npm |
| Container | none |
| Serverless / PaaS | Vercel configuration present |
| CI | none detected |
| Tests | **none detected** |
| Type safety | TypeScript |

## Environment variables referenced

- `DISABLE_HMR`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `NODE_ENV`
- `OTP_EMAIL_FROM`
- `PORT`
- `SMTP_HOST`
- `SMTP_PASS`
- `SMTP_PORT`
- `SMTP_USER`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `VERCEL`
