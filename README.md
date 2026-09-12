# Cool Designs

Browser entry point for the local design research library. The app is a TanStack Start site that reads repository content at build/server time and serves a compact, scrollable library of flows, captures, notes, and original recreations.

## Local development

```sh
npm install
npm run dev
```

The dev server runs with Vite. The content index is rebuilt before the server starts.

## Checks

```sh
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build from `.output/server/index.mjs`.

## Vercel

The project is Vercel-friendly through TanStack Start and Nitro. Vercel should use:

- Install command: `npm install`
- Build command: `npm run build`
- Output/runtime: Nitro output in `.output`

No external credentials, database, or runtime filesystem writes are required.

## Content model

Source material remains in the existing repository folders:

- `catalog/design-catalog.json` is the normalized flow manifest.
- `flows/`, `distillation/`, `captures/`, `companies/`, `websites/`, `index/`, `templates/`, and recreation README files are parsed as Markdown notes.
- `captures/` screenshots and `recreations/` plain HTML/CSS/JS samples are copied to `public/assets/` during `npm run content:build`.
- `src/generated/content-index.json` is generated from the source files and consumed by React routes. Browser code does not read from the filesystem.

Markdown is rendered with remark/rehype, GFM support, and sanitization. Internal Markdown links are rewritten to `/notes/:id` when the referenced file is indexed. Capture and recreation asset links are rewritten under `/assets/...`; external URLs remain external.

## Routes

- `/` browses the flow library with search and tag filtering.
- `/flows/:flowId` shows workflow detail, captures, sources, notes, and linked recreations.
- `/captures` shows available screenshots.
- `/recreations` lists original practice builds.
- `/recreations/:recreationId` embeds a copied recreation asset.
- `/notes/:noteId` renders sanitized Markdown notes.
