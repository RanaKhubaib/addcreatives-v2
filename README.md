# ADD Creatives — Website (v3)

A fresh Next.js (App Router) website for **ADD Creatives**, a digital agency in Lahore,
Pakistan. Tagline: _Digital Solutions That Drive Growth_.

- **Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion,
  GSAP, Lenis, Three.js / React Three Fiber, Lottie, Firebase, Nodemailer.
- **Fonts:** Bricolage Grotesque (display) + Manrope (body) via `next/font/google`.
- **Design tokens:** navy `#163E73`, royal `#0B4DA2`, peri `#5B7FC0`, ink `#0A0F1C`,
  mist `#F4F7FB`, card radius `24px` — see `src/app/globals.css` (`@theme`).

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real values (see below)
npm run dev                  # http://localhost:3000
```

## Scripts

| Script           | What it does                    |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start the dev server            |
| `npm run build`  | Production build                |
| `npm run start`  | Serve the production build      |
| `npm run lint`   | ESLint (Next.js + Prettier)     |
| `npm run format` | Format everything with Prettier |

## Deploy on Vercel

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js).
2. Add the env vars from `.env.example` in **Project → Settings → Environment Variables**.
3. Deploy. Every push to the main branch redeploys automatically.

## Editing content

All site content lives in typed files under `src/data/` — no CMS needed for edits:

| File              | Contents                                                              |
| ----------------- | --------------------------------------------------------------------- |
| `site-config.ts`  | Company facts, contact details, socials, feature flags, analytics IDs |
| `services.ts`     | The 7 services (copy, tools, benefits, process, FAQs)                 |
| `case-studies.ts` | Sample case-study concepts                                            |
| `clients.ts`      | Client list (placeholders for now)                                    |
| `stats.ts`        | Stats (placeholder numbers)                                           |
| `testimonials.ts` | Testimonials (placeholders for now)                                   |
| `faq.ts`          | General FAQs                                                          |
| `tools.ts`        | The 18 tools we use                                                   |

## Replacing sample data

Sample/placeholder content is clearly marked and hidden behind feature flags in
`site-config.ts` (`SHOW_CLIENT_LOGOS`, `SHOW_STATS`, `SHOW_TESTIMONIALS` — all `false`).

- **Case studies:** each entry in `case-studies.ts` has `illustrative: true` and a
  `TODO: Replace with real case study` comment. Swap in real projects, set
  `illustrative: false`, and use real images from `public/images/`.
- **Clients:** replace the placeholder names in `clients.ts`, then set
  `SHOW_CLIENT_LOGOS: true` in `site-config.ts` (add real logos to `public/images/`).
- **Stats:** replace the numbers in `stats.ts` with verified figures, then set
  `SHOW_STATS: true`. Never present the placeholder numbers as facts.
- **Testimonials:** replace the entries in `testimonials.ts` with real quotes
  (with the client's permission), then set `SHOW_TESTIMONIALS: true`.

## Firebase setup

The site reads Firebase from env vars and **never crashes without them** — see
`src/lib/firebase.ts` (`firebaseReady`, `getDb()`) and `src/lib/firebaseAdmin.ts`
(`adminReady`, `getAdminDb()`).

1. Create a Firebase project, then a Web app — copy its config into the
   `NEXT_PUBLIC_FIREBASE_*` vars in `.env.local`.
2. For server-side writes, create a service account (Project Settings → Service
   accounts → Generate new private key) and set `FIREBASE_CLIENT_EMAIL` and
   `FIREBASE_PRIVATE_KEY` (keep the `\n` escapes as-is; the code unescapes them).
3. Enable **Cloud Firestore** in the Firebase console.

Suggested Firestore rules (lock down before going live — only the server should
write submissions):

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Forms are written server-side via the Admin SDK; clients cannot write.
    match /contact_submissions/{doc} { allow read, write: if false; }
    match /newsletter_subscribers/{doc} { allow read, write: if false; }
    match /audit_requests/{doc} { allow read, write: if false; }
  }
}
```

Collections used: `contact_submissions`, `newsletter_subscribers`, `audit_requests`
(exported as `COLLECTIONS` from `src/lib/firebase.ts`).

## SMTP setup (contact form)

The contact form sends mail via Nodemailer using `SMTP_*` env vars.

- **Gmail:** use an [App Password](https://support.google.com/accounts/answer/185833)
  (Google Account → Security → 2-Step Verification → App passwords), not your normal
  password. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER` to the Gmail
  address, and `SMTP_PASS` to the 16-character app password.
- `OWNER_EMAIL` receives submissions; `MAIL_FROM` is the sender shown to recipients.

## Project structure

```
src/
  app/            # App Router: layout, page, globals.css
  data/           # Typed content (services, case studies, FAQs, ...)
  lib/            # firebase.ts, firebaseAdmin.ts, utils.ts (cn helper)
public/images/    # Brand & project photography (11 JPGs)
```
