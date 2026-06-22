# GlimmerTales Phase 0 Content Catalog

Status: expanded scaffold v0.2.  
Purpose: prove repeatable catalog structure, parent browsing, story metadata, and release gating before production art spend.

## Catalog rules

- Each story has 5-6 pages, fixed order, and tiered read-aloud text.
- Every page has a text-free illustration asset and app-layer read-aloud copy.
- Every story is `publication.status: reference`, not `published`.
- Every story has `contentSafety.reviewed: false` until real human editorial, IP, provenance, and child-safety review occurs.
- Every page has `audioRef: null`; narration remains deferred.

## Stories

### Moonlit Meadow Echo

- Category: Brave Little Adventures
- Tier: Wonder
- Pages: 5
- Theme: Fear becomes silly when friends understand it.
- Purpose: tests mild uncertainty, cave/echo safety, group reassurance, and return-to-calm ending.
- Characters: Daisy, Dino, Pip, Itsy
- Production risk: keep the cave/echo non-scary; avoid monster framing.

### The Sleepy Lantern Leaf

- Category: Curious World
- Tier: Drift
- Pages: 6
- Theme: A tiny glow becomes a quiet lesson in looking closely.
- Purpose: tests gentle nature curiosity, dew/reflection explanation, and a low-stimulation science-like bedtime arc.
- Characters: Daisy, Dino, Pip, Itsy
- Production risk: keep the glow warm and soft, never neon or magical in a high-arousal way.

### Itsy’s Soft Bridge

- Category: Friends & Feelings
- Tier: Wonder
- Pages: 6
- Theme: Small helpers can make the safest way across.
- Purpose: tests Itsy as a spider-sensitive but lovable problem-solver, teamwork, puddle crossing, and safe physical stakes.
- Characters: Daisy, Dino, Pip, Itsy
- Production risk: keep spider/web language gentle; no trap, fang, Halloween, or realistic arachnid cues.

## Metadata fields now represented

Story-level:
- `id`
- `storyId`
- `slug`
- `title`
- `category`
- `categorySlug`
- `tier`
- `recommendedTier`
- `supportedTiers`
- `readTime`
- `approxReadMinutes`
- `theme`
- `parentSummary`
- `themeTags`
- `characters`
- `coverIllustrationRef`
- `audioRef`
- `contentSafety`
- `publication`

Page-level:
- `pageId`
- `order`
- `illustrationRef`
- `illustrationAlt`
- `lightingMood`
- `textPlacement`
- `audioRef`
- `readAloudText.Drift`
- `readAloudText.Wonder`
- `readAloudText.Explore`
- `qa.noBakedText`
- `qa.characterConsistency`
- `qa.releaseApproved`

## Next catalog expansion

Before production art, add two more reference records without new systems work:

1. `Pip’s Little Brave Step`, Friends & Feelings, 6 pages.
2. `Dino Carries the Moon`, Dream Big, 6 pages.

Only after the reference-locking art workflow is selected should those become production-image tasks.
