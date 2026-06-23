# 15-Page Book Expansion Pass

Status: **complete as a production-candidate pass; still requires human final release QA before `releaseApproved: true`.**

## What changed

All 8 Mini Dream Time books have been expanded to 15 pages each:

- `moonlit-meadow` — 15 pages
- `sleepy-lantern-leaf` — 15 pages
- `itsy-soft-bridge` — 15 pages
- `pillow-hill-parade` — 15 pages
- `button-moon-bakery` — 15 pages
- `nori-bubble-tide` — 15 pages
- `fennel-lantern-lane` — 15 pages
- `starblanket-helpers` — 15 pages

Total: **120 pages**.

Each page now has:

- ordered `pageId` / `order`
- beginning / middle / resolution `manuscriptRole`
- flowing page beat
- Drift / Wonder / Explore read-aloud text
- text placement
- lighting mood
- no-text premium 3D prompt
- same character set throughout the story
- generated Gemini/Nano Banana production-candidate JPG art

## Character continuity rule

Every book uses one character set throughout:

- Meadow Friends: Daisy, Dino, Pip, Itsy
- Pillow Pals: Momo Puffin, Bibi Bunny, Tula Turtle
- Sky Bakers: Coco Cricket, Luma Lamb, Nib Starling
- Ocean Dreamers: Nori Narwhal, Puddle Otter, Mimi Minnow
- Lantern Lane: Fennel Fox, Roo Mouse, Opal Owl
- Starlight Helpers: Nova Glow, Ollie Bluebeam, Mica Mosslight

No cross-casting between books.

## Art regeneration state

After Gemini credits were restored, the full remaining generation queue completed.

Generated/promoted production candidates:

- `moonlit-meadow`: 15 / 15
- `sleepy-lantern-leaf`: 15 / 15
- `itsy-soft-bridge`: 15 / 15
- `pillow-hill-parade`: 15 / 15
- `button-moon-bakery`: 15 / 15
- `nori-bubble-tide`: 15 / 15
- `fennel-lantern-lane`: 15 / 15
- `starblanket-helpers`: 15 / 15

Total: **120 / 120** generated pages.

All `data/stories.json` page `illustrationRef` values now point to JPG production candidates under `assets/stories/<story>/p*-nano-banana-pro-preview.jpg`.

## QA contact sheet

`docs/art-qa-contact-sheet-120.jpg`

All pages are labeled `GEN`; no fallback `NEEDS` labels remain.

## Verification

```txt
npm run export:image-briefs
exported 120 page briefs
```

```txt
npm test
ok: 8 stories, 120 pages, text-free SVG/data/docs checks passed
```

## Release caveat

This is a full production-candidate image/story pass, not final release approval. Before setting any page to `releaseApproved: true`, run human QA for:

- character consistency page-to-page
- exact story-beat match
- no visible text/glyph artifacts
- overlay readability
- age-safety and bedtime calm
- final art compression/performance
