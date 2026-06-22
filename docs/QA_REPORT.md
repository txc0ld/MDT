# GlimmerTales Phase 0 QA Report

Status: v0.2 checklist for the expanded scaffold.  
Latest automated verification is produced by `npm test`.

## Scope covered

- Structured catalog grew from 1 story / 5 pages to 3 stories / 17 pages.
- Parent Mode now includes library filters, status card, release-gate panel, and richer story cards.
- Story Mode now includes hash routes, progress dots, swipe/keyboard page turns, dim-light toggle, placement-aware read-aloud overlays, and page-level review drawer.
- Data now includes richer story/page metadata and release-blocking QA fields.

## Automated checks

Latest run:

```txt
> glimmertales-phase0@0.1.0 test
> node scripts/verify.mjs

ok: 3 stories, 17 pages, text-free SVG/data/docs checks passed
```

Impeccable detector:

```txt
[]
```

HTTP smoke checks against local server:

```txt
/ 200 text/html
/data/stories.json 200 application/json
/assets/stories/sleepy-lantern-leaf/page-01.svg 200 image/svg+xml
```

Browser checks completed:

- Parent Mode rendered with 3 stories and no console errors.
- Story Mode rendered for `The Sleepy Lantern Leaf` with visible read-aloud text and usable controls.
- Next page + tier-switch interaction returned `true` in browser evaluation.

`scripts/verify.mjs` checks:

- at least 3 reference stories
- at least 5 pages per story
- unique story ids and slugs
- required story metadata
- required page metadata
- all illustration refs exist
- SVG files contain no visible `<text>` elements or `foreignObject`
- all Drift/Wonder/Explore text tiers exist
- `audioRef` remains `null`
- no page/story is release-approved in Phase 0
- no obvious timer/autoplay/analytics markers in `src/app.js`
- required documentation files exist

## Manual browser QA to perform each session

1. Open `/` or `#/parent`.
2. Confirm Parent Mode loads without console errors.
3. Filter categories and open each story.
4. In each story:
   - Next/Previous work.
   - Arrow keys work.
   - Progress dots work.
   - Tier selector swaps copy without changing art.
   - Dim light toggle does not reduce readability below practical bedtime reading.
   - Final page returns calmly, no next-story trap.
5. Open the page review drawer and confirm release approval is blocked.
6. Confirm no network calls leave the local server except asset/data loading.

## Known limitations

- SVG scaffold is not final production art.
- Character consistency is deterministic within SVG construction, not proven through an image model.
- No real CMS, auth, subscription, deletion, privacy URL, or store submission path exists yet.
- Content safety/IP review is intentionally marked incomplete.

## Release decision

Do not release. This is now a substantially better Phase 0 prototype and validation surface, but it remains a local reference scaffold. The correct next gate is production-art tooling with reference-image character locking plus legal/privacy/content review.
