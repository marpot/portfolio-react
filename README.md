# Marcin Potoczny — portfolio

Recruiter-facing personal portfolio built with React, TypeScript, Vite and SCSS. It includes Polish and English content, light/dark themes, project filtering, accessible navigation and motion preferences.

**Live portfolio:** https://marcinpotoczny.vercel.app/

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The optimized static build is written to `dist/` and deployed on Vercel.

## Project structure

- `src/App.tsx` — page composition and interactions
- `src/data.ts` — projects, experience and skills
- `src/i18n.ts` — Polish and English interface copy
- `src/styles/main.scss` — theme, layout and responsive styling

## Content updates

Edit portfolio facts in `src/data.ts` and translated copy in `src/i18n.ts`. No content management system or external API is required.
