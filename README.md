# Palette Frontend

A Next.js web application for UofT Research — a platform for academic collaboration, research publishing, and team communication.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** Tailwind CSS 4, Radix UI, HeroUI, Framer Motion
- **Editor:** Tiptap rich text editor
- **Auth & Database:** Supabase (SSR integration)
- **State Management:** Zustand, TanStack React Query
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t palette-frontend .
docker run -p 3000:3000 palette-frontend
```

> **Note:** The Docker build uses Next.js standalone output. Make sure `output: "standalone"` is set in `next.config.mjs` before building.

## Project Structure

```
src/app/
  page.js              # Landing page
  auth/                # Sign in / sign up
  blog/                # Blog listing
  drafts/              # Draft posts
  inbox/               # Messaging (threaded)
  profile/             # User profile
  repository/          # Research repository
  workspace/           # Workspace dashboard
  privacy/             # Privacy policy
  terms/               # Terms of service
```

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build       |
| `npm start`   | Start production server  |
| `npm run lint` | Run ESLint              |
