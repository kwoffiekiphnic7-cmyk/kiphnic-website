# Kiphnic Website — V1

> the website for the ages to come

This is the first functional visual prototype for Kiphnic's AI-first technology company website.

## Run
Open `index.html` in a browser.
Original prototype preserved as `legacy-v1.html`.

## Next development phase
1. Replace placeholder logo treatment with the final Kiphnic logo asset.
2. Add real project images.
3. Connect the contact form to a backend/email service.
4. Build the dedicated Services, AI, Projects, About and Contact pages.
5. Convert the prototype to Next.js/React for production.
6. Add the real Kiphnic AI integration.
7. Connect a custom domain and deployment.

---

# Kiphnic Website — V2 (Next.js, current)

Production rebuild is live in this folder alongside V1.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Structure
- `src/app/` — layout, home, services, ai, projects, about, contact, api/contact, api/ai
- `src/components/` — Navbar, Footer, Hero, ServicesGrid, AiTerminal, ProjectsGrid, Sections, ContactForm
- `src/data/` — site.ts, services.ts, projects.ts
- `src/app/globals.css` — ported 1:1 from V1
- `public/projects/` — drop real screenshots: kiphnic-ai.jpg, software-system.jpg, game-project.jpg

## Status
- [x] Dedicated pages + routing (/, /services, /ai, /projects, /about, /contact)
- [x] Contact form → /api/contact (validates + honeypot + rate limit; Resend to kiphnic7@gmail.com when RESEND_API_KEY set)
- [x] Next.js/React conversion
- [x] Final logo asset (public/logo/logo.png; favicon.ico + apple-touch-icon + og-cover.jpg generated from updates/)
- [x] Kiphnic AI streaming in src/app/api/chat/route.ts (Anthropic when ANTHROPIC_API_KEY set, mock fallback otherwise; legacy /api/ai kept)
- [x] SEO/launch: per-page metadata + OG/Twitter, /sitemap.xml, /robots.txt, skip-link + focus states + reduced-motion
- [ ] Real project images in public/projects/ (kiphnic-ai.jpg, software-system.jpg, game-project.jpg)
- [ ] Domain + deployment (see below)

## Env

Copy `.env.example` → `.env.local`:

- `OPENAI_COMPAT_API_URL` / `OPENAI_COMPAT_API_KEY` / `OPENAI_COMPAT_MODEL` — your own AI via any OpenAI-compatible endpoint (Groq free tier recommended: `https://api.groq.com/openai/v1/chat/completions` + `llama-3.3-70b-versatile`)
- `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` — Anthropic chat (tried if the endpoint above is unset; else mock fallback)
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — contact delivery (else server-log only)

## Deploy (Vercel)

1. Push to GitHub, import into Vercel (Next.js preset, no custom build settings).
2. Add the same env vars in Project Settings → Environment Variables.
3. Redeploy, then verify: `/sitemap.xml`, `/robots.txt`, chat streams (`x-kiphnic-engine` header), contact delivers.
4. Connect `kiphnic.com` in Vercel → Domains (add the DNS records shown), set as primary.

Contact: 0200823079 · 0538616119 · kiphnic7@gmail.com · WhatsApp 0538616119
