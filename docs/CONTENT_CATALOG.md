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

Age range labels are surfaced in Parent Mode and Story Mode. They are story content bands, not child profiles.

- `Moonlit Meadow Echo`: 4-6 yrs, Pre-K / early school.
- `The Sleepy Lantern Leaf`: 1-3 yrs, toddler wind-down.
- `Itsy’s Soft Bridge`: 3-5 yrs, preschool.
- `The Pillow Hill Parade`: 1-3 yrs, toddler giggles.
- `Button Moon Bakery`: 5-7 yrs, early reader imagination.
- `Nori and the Bubble Tide`: 2-4 yrs, toddler / preschool calm.
- `Fennel’s Lantern Lane`: 3-5 yrs, preschool comfort.

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

Completed in v0.4:

- Added four quick-selection story seeds:
  - `The Pillow Hill Parade`, Pillow Pals, Silly & Giggly.
  - `Button Moon Bakery`, Sky Bakers, Dream Big.
  - `Nori and the Bubble Tide`, Ocean Dreamers, Curious World.
  - `Fennel’s Lantern Lane`, Lantern Lane, Sleepy Meadow.
- Added quick-pick moods: Sleepy, Silly, Brave, Dreamy, Helpful, New friends.
- Added character-set filtering: Meadow Friends, Pillow Pals, Sky Bakers, Ocean Dreamers, Lantern Lane.
- Expanded catalog to 7 stories / 37 pages.

Next production expansion:

1. Replace reused scaffold interiors for the four new story seeds with character-specific production art.
2. Add final character bibles for the new sets before any paid production-art pass.
3. Add a parent preference model that stays local/account-level: preferred reading length, mood, and favorite character set.
