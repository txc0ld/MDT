# GlimmerTales Phase 0 Report

Status: in progress, updated after scaffold creation.

## What is complete

- Imported PRD, kickoff prompt, and 8 visual reference inputs into `docs/` and `assets/reference-inputs/`.
- Locked a Phase 0 style guide in `docs/STYLE_GUIDE.md`.
- Locked a four-character bible in `docs/CHARACTER_BIBLE.md`.
- Wrote production prompt and rejection-log workflow in `docs/ILLUSTRATION_PIPELINE.md`.
- Integrated specialist art direction, compliance, and technical scaffold outputs into:
  - `docs/BUILD_GATE_CHECKLIST.md`
  - `docs/TECHNICAL_SCAFFOLD_PLAN.md`
- Added catalog and QA documentation:
  - `docs/CONTENT_CATALOG.md`
  - `docs/QA_REPORT.md`
- Created deterministic, text-free SVG master sheets for Daisy, Dino, Pip, and Itsy under `assets/characters/`.
- Regenerated reference SVGs with brighter kid-facing palette, gradients, soft shadows, more expressive details, and polished bubbly materials.
- Added a high-end generated art-direction target at `assets/brand/premium-cast-target.png` for subscription-quality character/material ambition.
- Expanded from one story to three reference stories with 17 text-free pages:
  - `Moonlit Meadow Echo`
  - `The Sleepy Lantern Leaf`
  - `Itsy’s Soft Bridge`
- Built an expanded static read-together viewer scaffold with Parent Mode and Story Mode:
  - story-as-data in `data/stories.json`
  - enriched page metadata: `order`, `illustrationAlt`, `lightingMood`, `textPlacement`, and QA markers
  - story-level release metadata: `contentSafety` and `publication`
  - parent browse/home screen
  - library category filters
  - QA/release-gate panel
  - story mode with one page at a time
  - hash routes for story/page QA
  - parent-paced Previous/Next controls
  - progress dots
  - keyboard and swipe page turns
  - dim-light toggle
  - Drift/Wonder/Explore text tier switcher
  - page-level review drawer
  - no autoplay
  - no analytics SDKs
  - no child data collection
  - no audio in Phase 0, `audioRef: null`

## Reference input findings

The supplied images are useful as mood/reference inputs only. They show a strong warm toy-render look, expressive rounded characters, and child-friendly humor. They also show the exact production hazards GlimmerTales must avoid: baked-in speech bubbles, signs, captions, title banners, bright daytime glare, and multi-panel drift. Phase 0 therefore uses clean art plus HTML text overlay.

## Consistency method used in this scaffold

Because the currently configured image tool is text-to-image only and does not support image-to-image or reference-image conditioning, the scaffold uses deterministic SVG character construction. This proves the data/rendering pipeline, relative scale, signature features, and text separation, but it is not final production illustration quality. Final catalog art still requires a proper reference-locking image workflow or illustrator pass.

## Approved-vs-rejected bar

Approved:
- character features match `CHARACTER_BIBLE.md`
- all visible story text lives in HTML overlay, not art
- each SVG has a reserved visual text-safe zone
- bedtime pages use lower luminance and warm amber/indigo mood
- no ads, game mechanics, autoplay, or child-data collection

Rejected:
- any baked-in visible words, signs, speech bubbles, captions, or logos
- any character palette/proportion drift
- frightening spider/cave treatment
- bright blue-white bedtime glare
- clutter behind read-aloud text

## Measured cost and time

- SVG scaffold generation cost: $0 marginal model/tool cost.
- App scaffold cost: $0 package/install cost, no external dependencies.
- Final production-art cost/time: not yet measurable with the active tool because reference-image character locking is required. Measure accepted-image cost, not generated-image cost, once that tool is available.

## Next production-art gate

Use a model/tool with reference-image conditioning. Generate each master sheet first. Do not produce catalog scenes from text alone. Run every scene through the rejection log before approving it.
