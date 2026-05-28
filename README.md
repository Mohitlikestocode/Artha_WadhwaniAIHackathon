# Artha

<p align="center">
  <img src="public/favicon.svg" alt="Artha logo" width="96" height="96" />
</p>

<h1 align="center">Artha</h1>

<p align="center"><strong>AI workplace simulation for job readiness.</strong></p>

<p align="center">
  Learners step into realistic work situations, make decisions in motion, and leave with a diagnostic that is more useful than a generic score.
</p>

<p align="center">
  <em>Presentation build for the Wadhwani AI Hackathon</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Zustand-State_Management-111827?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Static%20Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

## Snapshot

| Area | What it does |
| --- | --- |
| Product | AI workplace simulation for employability and training |
| Experience | Landing page, onboarding, simulation modes, diagnostic, dashboard |
| Output | Multi-dimensional capability profile after each run |
| Persistence | Lightweight browser storage via `localStorage` |
| Stack | React 19, Vite, Zustand, React Router, Framer Motion, Lucide React, Recharts, Tailwind CSS |

## Sticker Sheet

| Sticker | Meaning |
| --- | --- |
| ✦ | Capability-first product story |
| ⌁ | Reactive simulations instead of static quizzes |
| ◌ | Lightweight persistence with zero backend setup |
| ✦ | Mobile-first layout for lower-cost devices |
| ⟡ | Presentation-ready design language |

## Why It Exists

Most learning products measure completion. Artha measures workplace texture.

It is designed to surface how someone communicates, escalates, prioritizes, and recovers under pressure. That makes it useful for employability conversations, mentoring, and screening in a way that a static quiz cannot match.

## What You Get

| Experience | Outcome |
| --- | --- |
| Onboarding | A fast start that gets the learner into the flow quickly |
| Simulation modes | Scenarios such as office chat, branch decisions, inbox triage, war-room response, negotiation, and pitch-stage moments |
| Diagnostic | A multi-dimensional profile after each run |
| Dashboard | A clean view of progress and history |
| Mobile-first UI | A layout that still feels usable on lower-cost phones |

## Journey

```text
01  Onboard in under 90 seconds
02  Pick a simulation mode
03  Respond to live workplace pressure
04  Receive a diagnostic profile
05  Review progress on the dashboard
```

## Local Setup

### Requirements

- Node.js 20 or newer
- npm

### Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
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

Artha keeps lightweight progress data in `localStorage` so the demo feels persistent across sessions.

- `artha:runs` stores completed simulation runs.
- `artha:modesCompleted` stores mode completion counts.
- Legacy `karmaloop:*` keys are still read for backwards compatibility.

## Design Notes

- Narrative-first copy keeps the product presentation-ready.
- The interface is optimized for a strong first impression on both desktop and mobile.
- The visual style is meant to feel like a real product rather than a classroom exercise.

## Deployment Notes

- The app is ready to build as a static front end.
- It can be deployed to Vercel or any static host that supports Vite output.
- Before deployment, run `npm run build` and confirm the generated `dist/` folder is clean.

## Hackathon Context

This repository contains the Artha presentation build for the Wadhwani AI Hackathon. The current experience is intentionally polished, narrative-driven, and presentation-ready so it can be shown end to end without backend dependencies.

## License

No license has been specified yet. Add one before distributing the code outside the hackathon context.