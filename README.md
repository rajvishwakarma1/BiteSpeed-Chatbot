# BiteSpeed Chatbot Flow Builder

Build and preview chatbot flows with a clean, fast UI. Drag nodes, connect them, tweak content, and save — no fuss.

Live deployed at: https://bite-speed-chatbot-xi.vercel.app/

## What’s inside
- Canvas
  - Bigger, easy‑to‑click circular handles (half in / half out)
  - Rounded connection caps and a smoother preview
  - Cancel a connection quickly (Esc, click on the pane, or right‑click)
- Nodes
  - “Send Message” node with a tidy header and tightened styles
  - Delete Node action in Settings
- Sidebar
  - Top actions on the right: Reset, Export (JSON), Save Flow
  - Collapsible Instructions in a light card above the node list
  - “Nodes” section with drag‑to‑add items
- Save & validation
  - Single rule: show “Cannot save Flow” only when there are more than one nodes and more than one node without an incoming edge
  - Success and error messages pop at the top center (clean, unobtrusive)

## Tech
- React 18 + TypeScript
- Vite 5
- @xyflow/react (React Flow) v12.8.4

## Quick start
1) Install
```sh
npm install
```

2) Dev server
```sh
npm run dev
```

3) Build
```sh
npm run build
```

4) Preview build
```sh
npm run preview
```

## Project layout
```
src/
  components/
    Layout.tsx, Layout.css
    FlowBuilder.tsx, FlowBuilder.css
    Sidebar.tsx, Sidebar.css
    NodesPanel.tsx, NodesPanel.css
    SettingsPanel.tsx, SettingsPanel.css
    SaveButton.tsx, SaveButton.css
    TopBanner.tsx, TopBanner.css
    nodes/
      TextNode.tsx, TextNode.css
  utils/
    nodeUtils.ts
    edgeUtils.ts
    flowValidation.ts
  types/
    index.ts
public/
  favicon.ico
  manifest.json
vercel.json
```

## Deploying to Vercel
Ready out of the box.

- vercel.json
  - SPA rewrites to `/index.html`
  - Long‑term caching for `/assets/*`
  - `cleanUrls: true`, `trailingSlash: false`
- Build Command: `npm run build`
- Output Directory: `dist`

Steps
1) Push to GitHub
2) Import into Vercel (Framework: Vite)
3) Deploy

Optional env vars (only if you use them):
- `VITE_BASE=/`
- `VITE_SOURCEMAP=false`
- `VITE_API_BASE_URL=https://api.example.com`

## Tips & fixes
- 404 on refresh? SPA rewrite to `/index.html` is already in `vercel.json`.
- Type errors? `npm run typecheck`.
- Drag/connection quirks? Confirm React Flow v12.8.4 and custom node CSS are in place.

---

Made by Raj Vishwakarma — for the Full Stack Developer assignment at BiteSpeed.

## License
MIT
