# Artha

Artha is a hackathon-built AI workplace simulation for job readiness. It places learners inside realistic work scenarios, evaluates the choices they make, and turns the result into a capability diagnostic that is easier to act on than a generic score.

The current demo is a polished front-end experience built for the Wadhwani AI Hackathon. It includes onboarding, multiple simulation modes, a diagnostic profile, a run dashboard, and a landing experience designed to sell the product as a serious employability tool.

## What it does

- Simulates workplace situations across multiple modes, including office chat, branch decisions, inbox triage, negotiation, war-room response, and pitch stage scenarios.
- Produces a multi-dimensional diagnostic after each run.
- Persists run history and mode progress locally in the browser.
- Uses a mobile-first design language so it feels usable on low-cost phones as well as desktop.
- Frames the product for learners, employers, and ecosystem partners.

## Why Artha

Most learning products teach content. Artha teaches workplace texture.

The goal is not just to show what a candidate knows. It is to surface how they communicate, escalate, prioritize, and recover under pressure. That makes Artha more useful for employability conversations, mentoring, and screening than a static quiz or course completion badge.

## Tech Stack

- React 19
- Vite
- Zustand
- React Router
- Framer Motion
- Lucide React
- Recharts
- Tailwind CSS tooling

## Local Setup

Prerequisites:

- Node.js 20 or newer
- npm

Install and run:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available Scripts

```bash
npm run dev      # Start the local development server
npm run build    # Create a production build
npm run lint     # Run ESLint across the project
npm run preview  # Preview the production build locally
```

## Project Structure

```text
src/
  components/   Shared UI pieces, headers, visual systems, and jargon helpers
  data/         Diagnostic logic, personas, scenarios, and track definitions
  pages/        Landing, onboarding, simulation, diagnostic, and dashboard screens
  store/        Zustand state for simulation and user progress
```

## Browser Storage

Artha stores lightweight progress data in `localStorage` so the demo feels persistent across sessions.

- `artha:runs` stores completed simulation runs.
- `artha:modesCompleted` stores mode completion counts.

Legacy `karmaloop:*` keys are still read for backwards compatibility.

## Deployment Notes

- The app is ready to build as a static front end.
- It can be deployed to Vercel or any static hosting platform that supports Vite output.
- Before deployment, run `npm run build` and confirm the generated `dist/` folder is clean.

## Hackathon Context

This repository is the Artha presentation build for the Wadhwani AI Hackathon. The current experience is intentionally narrative-heavy, visually polished, and demo-friendly so it can be presented end-to-end without backend dependencies.

## License

No license has been specified yet. Add one before distributing the code outside the hackathon context.