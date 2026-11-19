# GRAHANA CHECKING — Final Frontend Workshop Prototype

**Tagline:** Know the Place. Trust the Information.

A frontend-only prototype with two distinct experiences:
- Public directory for tourists and the general public (Accommodation, Restaurant, Mall).
- Government workspace simulation for demo business records, inspection status, internal demo notes, activity history, and reports.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173).

## Tests and production build

```bash
npm test
npm run build
npm run preview
```

## What is included

- Public business catalog, search, category filter, detail view.
- Government dashboard overview, business CRUD, activity history, reports, JSON import/export, CSV export.
- Demo access gate with officer name/role for presentation only.
- Internal demo inspection fields: document information status (Available / Not Found / Needs Review), source, date, and notes.
- Mall/tenant relationship field. A tenant can reference a Mall record; a Mall cannot be a tenant.
- Input validation, URL protocol validation, bounded import size, safe DOM text rendering, and CSP baseline.

## Important security and scope statement

This is a **frontend-only workshop simulation**, not a production government system. The demo access gate is not authentication. Browser LocalStorage is user-controlled and is not suitable for confidential or official records. There is no server-side authorization, secure database, encryption-at-rest, immutable audit trail, or real OSS/tax integration.

Use fictional/demo information only. Never enter real NPWP, tax information, identity data, permits, confidential documents, passwords, or other sensitive records. `Not Found` means only that a demo record has no supplied information; it does not mean a business is illegal or tax-delinquent. A mall management record does not verify its tenants.

## Deployment

Can be deployed as a static frontend to GitHub Pages, Vercel, or Netlify. For production deployment, configure security headers (including CSP) at the hosting layer and conduct a security review. Do not use this prototype to process official or confidential government data.
