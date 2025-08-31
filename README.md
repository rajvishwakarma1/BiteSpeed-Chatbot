# BiteSpeed Chatbot Flow Builder

Build and validate chatbot flows visually with React Flow and a polished React + TypeScript UX. Optimized for production and ready to deploy on Vercel.

• Demo: https://your-vercel-deployment-url.vercel.app

## Features
- Visual flow builder using @xyflow/react (React Flow)
- Custom nodes, edge validation, and drag-and-drop palette
- Settings panel with node editing and live validation
- Save button with flow validation feedback
- Modern UI with responsive layout and accessible styles
- Vite build optimizations: code splitting, treeshaking, sourcemaps (optional)
- Vercel-ready: vercel.json, SPA routing, caching headers

## Tech Stack
- React 18 + TypeScript
- Vite 5 with React plugin
- @xyflow/react (React Flow)

## Getting Started

1) Install dependencies
```sh
npm install
```

2) Run development server
```sh
npm run dev
```

3) Build for production
```sh
npm run build
```

4) Preview production build
```sh
npm run preview
```

## Environment Variables
Copy .env.example to .env.local and adjust as needed.

- VITE_BASE: Base path for deployment (default '/')
- VITE_SOURCEMAP: Enable prod sourcemaps ('true'|'false')
- VITE_API_BASE_URL: API endpoint placeholder
- VITE_FLAGS: Feature flags

## Project Structure
```
src/
  components/        # Layout, FlowBuilder, Sidebar, NodesPanel, SettingsPanel, SaveButton, nodes/
  types/             # Shared types
  utils/             # nodeUtils, edgeUtils, flowValidation
public/
  favicon.ico
  manifest.json
```

## Deployment (Vercel)
- vercel.json routes SPA traffic to /index.html and sets asset caching
- Build command: npm run build
- Output directory: dist
- Configure environment variables in Vercel Project Settings

### GitHub Integration
1) Push to GitHub
2) Import project in Vercel
3) Set Environment Variables (optional)
4) Deploy — Vercel builds via npm run build and serves dist/

## Troubleshooting
- If TypeScript complains about Node types in vite.config.ts, ensure @types/node is installed (already in devDependencies)
- If assets 404 after deploy, verify base path (VITE_BASE) and that vercel.json routes include the SPA fallback
- For DnD or connection issues, check the React Flow version and nodeTypes wiring in FlowBuilder

## License
MIT
