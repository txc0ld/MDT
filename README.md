# Mini Dreamtime / GlimmerTales Phase 0

Expanded local Phase 0 scaffold for the read-together bedtime story product.

Primary launch domain: `minidreamtime.com`. GlimmerTales is the first story world/collection inside Mini Dreamtime.

## Run

```bash
npm test
npm run serve
```

Open <http://localhost:4173>.

## Current scope

- 7 reference stories and story seeds
- 5 selectable character sets
- visible age-range tags and filters
- 6 quick-pick mood buttons plus a random story card
- 3 premium generated story covers as art-direction targets
- 37 upgraded text-free SVG interior scaffold pages
- Parent Mode with library filters, status card, release-gate panel, and story cards
- Story Mode with hash routes, tier selector, progress dots, keyboard/swipe/page controls, dim-light toggle, and page review drawer
- Structured content metadata for release gates and future CMS migration

## Deliverables

- `PRODUCT.md`
- `DESIGN.md`
- `docs/STYLE_GUIDE.md`
- `docs/CHARACTER_BIBLE.md`
- `docs/ILLUSTRATION_PIPELINE.md`
- `docs/BUILD_GATE_CHECKLIST.md`
- `docs/TECHNICAL_SCAFFOLD_PLAN.md`
- `docs/CONTENT_CATALOG.md`
- `docs/QA_REPORT.md`
- `docs/PHASE_0_REPORT.md`
- `assets/characters/*.svg` text-free master sheets
- `assets/stories/*/*.svg` text-free reference story pages
- `data/stories.json` story-as-data schema
- `index.html` + `src/` read-together viewer scaffold

## Phase 0 limitation

This scaffold uses deterministic SVG reference art to prove text separation, character feature consistency, data loading, release gates, and viewer UX. Final production art still requires a dedicated image-generation/illustration pass with true reference-image character locking.
