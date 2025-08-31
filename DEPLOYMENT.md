# Deployment Guide (Vercel)

This project is configured for fast, reliable deployments on Vercel with Vite optimizations and SPA routing.

## Prerequisites
- Node.js 18+
- Vercel account and CLI (optional)
- GitHub repo (recommended for CI/CD)

## One-time Setup
1) Push the project to GitHub
2) Import the repository into Vercel
3) Set the following in Vercel project settings (optional):
   - Environment Variables
     - VITE_BASE = /
     - VITE_SOURCEMAP = false
     - VITE_API_BASE_URL = https://api.example.com (if used later)
   - Build & Output Settings
     - Build Command: npm run build
     - Output Directory: dist

## Continuous Deployment
- On every push to the default branch (or PR), Vercel will:
  - Install deps
  - Run `npm run build`
  - Upload `dist/` to the global CDN

## SPA Routing
The provided `vercel.json` includes a fallback route:
- All routes are served by `/index.html` (client-side routing)

## Caching
- Static assets under `/assets/` are cached with long-term immutable headers
- `favicon.ico` and `manifest.json` have shorter cache durations

## Local Verification
- Build locally: `npm run build`
- Preview: `npm run preview`

## Custom Domains
- Add a domain in Vercel -> Domains
- Set as production domain and redeploy

## Troubleshooting
- 404s on reload: ensure SPA fallback route exists in `vercel.json`
- Missing env: configure Vercel Env variables (do not commit `.env` files)
- Large bundles: inspect chunks via `npm run build` output; consider dynamic imports

## Notes
- `vite.config.ts` supports a base path via `VITE_BASE`
- `@types/node` is included for Node types in the Vite config file
