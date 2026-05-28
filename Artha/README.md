# Artha

> AI workplace simulation for job readiness.
> Built for the Wadhwani AI Hackathon.

Artha turns a learner into the main character of a workday: they enter realistic situations, make choices under pressure, and leave with a capability diagnostic that is more useful than a generic score.

The demo in this repository is a polished front-end experience. It includes onboarding, multiple simulation modes, a diagnostic profile, a run dashboard, and a landing page designed to feel like a real product, not a classroom exercise.

## At A Glance

| What | Details |
| --- | --- |
| Product | AI workplace simulation for employability and training |
| Experience | Landing page, onboarding, simulation modes, diagnostic, dashboard |
| Output | Multi-dimensional capability profile after each run |
| Storage | Lightweight browser persistence via `localStorage` |
| Stack | React 19, Vite, Zustand, React Router, Framer Motion, Lucide React, Recharts, Tailwind CSS |

## Why Artha Exists

Most learning products teach content. Artha teaches workplace texture.

It is designed to reveal how someone communicates, escalates, prioritizes, and recovers under pressure. That makes it more useful for employability conversations, mentoring, and screening than a static quiz or course-completion badge.

## What It Does

- Simulates workplace situations across multiple modes, including office chat, branch decisions, inbox triage, war-room response, negotiation, and pitch-stage scenarios.
- Produces a multi-dimensional diagnostic after each run.
- Persists run history and mode progress locally in the browser.
- Uses a mobile-first design language so it feels usable on low-cost phones as well as desktop.
- Frames the product for learners, employers, and ecosystem partners.

## User Journey

```text
01  Onboard in under 90 seconds
02  Pick a simulation mode
03  Respond to live workplace pressure
04  Receive a diagnostic profile
05  Review progress on the dashboard
```

## Local Setup

### Prerequisites

- Node.js 20 or newer
- npm

### Install And Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |
## Project Map

```text
src/
  components/   Shared UI pieces, visual systems, and jargon helpers
  data/         Diagnostic logic, personas, scenarios, and track definitions
  pages/        Landing, onboarding, simulation, diagnostic, and dashboard screens
  store/        Zustand state for simulation and user progress
```

## Browser Storage

Artha stores lightweight progress data in `localStorage` so the demo feels persistent across sessions.

- `artha:runs` stores completed simulation runs.
- `artha:modesCompleted` stores mode completion counts.
- Legacy `karmaloop:*` keys are still read for backwards compatibility.

## Design Notes

- The app is intentionally narrative-heavy and demo-friendly.
- The interface is optimized for a strong first impression on mobile and desktop.
- The copy is written to sell the product as an employability tool, not just a game.

## Deployment Notes

- The app is ready to build as a static front end.
- It can be deployed to Vercel or any static hosting platform that supports Vite output.
- Before deployment, run `npm run build` and confirm the generated `dist/` folder is clean.

## Hackathon Context

This repository is the Artha presentation build for the Wadhwani AI Hackathon. The current experience is intentionally polished, narrative-driven, and presentation-ready so it can be shown end-to-end without backend dependencies.

## License

No license has been specified yet. Add one before distributing the code outside the hackathon context.