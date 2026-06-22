# Mini Dream Time Phase 0 — Web Prototype / Read-Together Viewer Scaffold Plan

## Decision
Use a fast local web prototype first: **Vite + React + TypeScript**. Mobile native is not required for Phase 0 because the immediate goal is validating the read-together format, story-as-data shape, visual rhythm, and parent-paced page turns. Keep the data model portable so the same story records can later feed Expo/React Native.

Non-negotiables from the PRD:
- Parent reads aloud; no default narration.
- Parent Mode for browse/select.
- Story Mode is warm, dim, low-luminance, one illustrated page at a time.
- Text is overlaid by the app layer, never baked into illustrations.
- Parent-paced tap/swipe/keyboard page turns only.
- No autoplay, timers, gamification, ads, behavioral analytics, or child data collection.
- Story content is structured data, not hardcoded in UI components.

---

## Proposed stack

- **App:** Vite + React + TypeScript
- **Routing:** React Router
- **Styling:** CSS modules or plain CSS variables for speed; no heavy design system in Phase 0
- **Validation:** Zod schema for story JSON/TS data
- **Tests:** Vitest + Testing Library for unit/component tests; Playwright for smoke/e2e
- **Data location:** local static TypeScript or JSON under `src/content/stories/`
- **Assets:** local `/public/assets/stories/...` image placeholders/reference art

Why this stack:
- Starts instantly with Node/npm/pnpm already available.
- Browser demo works on laptop/tablet immediately.
- Same React component model can inform Expo later.
- No backend, account, storage, or analytics surface needed for Phase 0.

---

## Story-as-data schema

### TypeScript model

```ts
export type AgeTier = 'drift' | 'wonder' | 'explore';

export type StoryCategory =
  | 'sleepy-meadow'
  | 'friends-feelings'
  | 'brave-little-adventures'
  | 'curious-world'
  | 'silly-giggly'
  | 'dream-big';

export type LightingMood = 'daytime' | 'bedtime';

export interface StoryTextByTier {
  drift: string;
  wonder: string;
  explore: string;
}

export interface StoryPage {
  pageId: string;
  order: number;
  illustrationRef: string;
  illustrationAlt: string;
  lightingMood: LightingMood;
  textPlacement: 'bottom-panel' | 'top-panel' | 'left-panel' | 'right-panel' | 'center-card';
  readAloudText: StoryTextByTier;
  audioRef: string | null;
}

export interface Story {
  storyId: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: StoryCategory;
  recommendedTier: AgeTier;
  supportedTiers: AgeTier[];
  approxReadMinutes: number;
  themeTags: string[];
  parentSummary: string;
  coverIllustrationRef: string;
  characters: Array<'daisy' | 'dino' | 'pip' | 'itsy'>;
  pages: StoryPage[];
  contentSafety: {
    reviewed: boolean;
    reviewer: string;
    reviewedAt: string;
    notes?: string;
  };
  publication: {
    status: 'draft' | 'reference' | 'published';
    version: string;
    updatedAt: string;
  };
}
```

### Zod validation scaffold

```ts
import { z } from 'zod';

export const ageTierSchema = z.enum(['drift', 'wonder', 'explore']);
export const categorySchema = z.enum([
  'sleepy-meadow',
  'friends-feelings',
  'brave-little-adventures',
  'curious-world',
  'silly-giggly',
  'dream-big',
]);

export const storyPageSchema = z.object({
  pageId: z.string().min(1),
  order: z.number().int().nonnegative(),
  illustrationRef: z.string().min(1),
  illustrationAlt: z.string().min(1),
  lightingMood: z.enum(['daytime', 'bedtime']),
  textPlacement: z.enum(['bottom-panel', 'top-panel', 'left-panel', 'right-panel', 'center-card']),
  readAloudText: z.object({
    drift: z.string().min(1),
    wonder: z.string().min(1),
    explore: z.string().min(1),
  }),
  audioRef: z.string().nullable(),
});

export const storySchema = z.object({
  storyId: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  category: categorySchema,
  recommendedTier: ageTierSchema,
  supportedTiers: z.array(ageTierSchema).min(1),
  approxReadMinutes: z.number().positive(),
  themeTags: z.array(z.string()),
  parentSummary: z.string().min(1),
  coverIllustrationRef: z.string().min(1),
  characters: z.array(z.enum(['daisy', 'dino', 'pip', 'itsy'])),
  pages: z.array(storyPageSchema).min(1),
  contentSafety: z.object({
    reviewed: z.boolean(),
    reviewer: z.string(),
    reviewedAt: z.string(),
    notes: z.string().optional(),
  }),
  publication: z.object({
    status: z.enum(['draft', 'reference', 'published']),
    version: z.string(),
    updatedAt: z.string(),
  }),
});
```

### Example story record

```ts
export const referenceStory = {
  storyId: 'gt-ref-001',
  slug: 'moonlit-meadow-goodnight',
  title: 'Moonlit Meadow Goodnight',
  category: 'sleepy-meadow',
  recommendedTier: 'wonder',
  supportedTiers: ['drift', 'wonder', 'explore'],
  approxReadMinutes: 4,
  themeTags: ['wind-down', 'friendship', 'bedtime'],
  parentSummary: 'Daisy, Dino, Pip, and Itsy say goodnight to the meadow one soft light at a time.',
  coverIllustrationRef: '/assets/stories/moonlit-meadow-goodnight/cover.webp',
  characters: ['daisy', 'dino', 'pip', 'itsy'],
  pages: [
    {
      pageId: 'p01',
      order: 0,
      illustrationRef: '/assets/stories/moonlit-meadow-goodnight/p01.webp',
      illustrationAlt: 'Daisy and Dino walking through a warm moonlit meadow with soft golden fireflies.',
      lightingMood: 'bedtime',
      textPlacement: 'bottom-panel',
      readAloudText: {
        drift: 'The meadow glowed. Daisy whispered, “Goodnight, little lights.”',
        wonder: 'The meadow glowed with tiny golden lights. Daisy gave a little wave. “Goodnight, fireflies. Thank you for shining so softly.”',
        explore: 'Across the dim meadow, fireflies blinked like sleepy stars. Daisy slowed her steps and whispered, “Goodnight, little lanterns. Thank you for lighting our path home.”',
      },
      audioRef: null
    }
  ],
  contentSafety: {
    reviewed: true,
    reviewer: 'phase-0-placeholder',
    reviewedAt: '2026-06-23',
  },
  publication: {
    status: 'reference',
    version: '0.1.0',
    updatedAt: '2026-06-23',
  },
} satisfies Story;
```

---

## Routes

Use React Router with simple, shareable paths:

- `/` — redirect to `/parent`
- `/parent` — Parent Mode home: Tonight's Pick, reference stories, category tiles
- `/parent/category/:categorySlug` — filtered story list
- `/story/:storySlug` — Story Mode starts at page 1
- `/story/:storySlug/:pageId` — optional deep link to a page for QA/review
- `/about-privacy` — static parent-facing privacy promise for prototype: no child data, no analytics
- `*` — calm not-found page returning to Parent Mode

Phase 0 should not include login, purchase, sync, personalization, analytics, or CMS admin routes.

---

## Component scaffold

```txt
src/
  app/
    App.tsx
    router.tsx
    routes/
      ParentHomeRoute.tsx
      CategoryRoute.tsx
      StoryRoute.tsx
      PrivacyRoute.tsx
      NotFoundRoute.tsx
  content/
    schema/
      story.ts
      story.zod.ts
    stories/
      moonlit-meadow-goodnight.ts
      index.ts
    categories.ts
    characters.ts
  components/
    layout/
      AppShell.tsx
      WarmBackground.tsx
    parent/
      ParentHome.tsx
      TonightPick.tsx
      CategoryTileGrid.tsx
      StoryCard.tsx
      TierBadge.tsx
      ReadTimeBadge.tsx
    story/
      StoryViewer.tsx
      StoryPageFrame.tsx
      IllustrationStage.tsx
      ReadAloudOverlay.tsx
      PageControls.tsx
      ProgressDots.tsx
      StoryExitButton.tsx
      TierSelector.tsx
    qa/
      DataValidationPanel.tsx
  hooks/
    useStoryNavigation.ts
    useSwipePageTurn.ts
    useKeyboardPageTurn.ts
    usePrefersReducedMotion.ts
  styles/
    tokens.css
    global.css
    parent.css
    story.css
  test/
    renderWithRouter.tsx
```

### Key component responsibilities

- `ParentHome`: browse/select reference stories; first page reachable in two taps.
- `StoryCard`: title, cover, age tier, read time, parent summary.
- `StoryViewer`: owns current page index and selected tier; loads story by slug.
- `StoryPageFrame`: dim full-screen page shell with safe-area padding.
- `IllustrationStage`: renders one illustration at a time; no carousel/autoplay.
- `ReadAloudOverlay`: large accessible text in page-defined negative-space placement.
- `PageControls`: previous/next buttons; disabled at bounds; final page shows “Back to stories”.
- `useSwipePageTurn`: horizontal swipe threshold only; never timer-based.
- `useKeyboardPageTurn`: ArrowLeft/ArrowRight for QA and desktop demo.
- `TierSelector`: parent-only control for Drift/Wonder/Explore text variant.

---

## Asset layout

```txt
public/
  assets/
    brand/
      mini-dream-time-mark.svg
    characters/
      daisy/
        master-sheet.webp
      dino/
        master-sheet.webp
      pip/
        master-sheet.webp
      itsy/
        master-sheet.webp
    stories/
      moonlit-meadow-goodnight/
        cover.webp
        p01.webp
        p02.webp
        p03.webp
        p04.webp
        p05.webp
        manifest.json
      brave-little-echo/
        cover.webp
        p01.webp
        p02.webp
        p03.webp
        p04.webp
        manifest.json
src/
  content/
    art-direction/
      style-token-block.md
      character-bible.md
      prompt-log.md
```

Asset rules:
- Story images should be clean art only: no captions, signs, speech bubbles, watermarks, or baked-in text.
- Prefer `webp` for prototype performance; keep source files outside app or under `assets/source/` if needed.
- Initial target aspect ratio: **4:3 landscape** for tablet-style read-together pages.
- Images need intentional negative space matching `textPlacement`.
- All image refs in story data must be relative public paths beginning with `/assets/...`.

---

## Visual/UI tokens

Use CSS variables first:

```css
:root {
  --gt-night-900: #171124;
  --gt-night-800: #211832;
  --gt-plum-700: #3a253f;
  --gt-amber-300: #f2c978;
  --gt-cream-100: #fff4dc;
  --gt-cream-200: #f6dfb7;
  --gt-text: #fff0d1;
  --gt-muted: #c9ad82;
  --gt-panel: rgba(31, 22, 42, 0.76);
  --gt-panel-border: rgba(242, 201, 120, 0.24);
  --gt-focus: #ffd98a;
  --gt-radius-lg: 28px;
  --gt-radius-md: 18px;
  --gt-shadow-soft: 0 18px 60px rgba(0, 0, 0, 0.34);
}
```

Story Mode requirements:
- Default background: deep plum/indigo, not white or blue-white.
- Text overlay: cream/amber on translucent warm panel.
- Large parent-readable type: target `clamp(1.25rem, 2.4vw, 2rem)`.
- Avoid high-stimulation animation. Page transitions should be subtle fade/slide and respect `prefers-reduced-motion`.
- Touch targets >= 44px.

---

## QA commands

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 0.0.0.0",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "qa": "npm run typecheck && npm run lint && npm run test && npm run build && npm run e2e",
    "validate:content": "tsx scripts/validate-content.ts"
  }
}
```

Manual QA checklist:
- Open `/parent`; confirm story can start in <=2 taps.
- Open a story; confirm exactly one illustrated page is visible.
- Confirm page does not advance without parent action.
- Confirm left/right buttons, swipe, and arrow keys work.
- Confirm last page resolves calmly and does not autoplay another story.
- Confirm no network requests to analytics/ad domains in browser devtools.
- Confirm story data validates and every `illustrationRef` exists.
- Confirm text remains readable at phone, tablet, and laptop widths.
- Confirm `prefers-reduced-motion` disables nonessential transitions.

Automated QA priorities:
- `storySchema` rejects missing text tiers and non-null malformed audio fields.
- Story pages sort by `order` and have unique `pageId` values.
- Story Mode renders selected tier text.
- Next/previous never go out of bounds.
- No timer/autoplay behavior exists in `StoryViewer`.
- E2E: `/parent` -> first story -> page 1 -> next -> previous -> final page -> exit.

---

## Acceptance criteria

### Data/content
- At least one reference story loads from structured story data.
- Story has 4–6 ordered pages.
- Every page includes `pageId`, `illustrationRef`, tiered `readAloudText`, `textPlacement`, and `audioRef: null`.
- Schema validation passes via `npm run validate:content`.
- No component hardcodes page text or page image paths outside story data.

### Parent Mode
- `/parent` displays Tonight's Pick, category access, and reference story cards.
- Story card shows title, parent summary, read time, category, and age tier.
- Parent reaches first story page in <=2 taps from `/parent`.
- No account wall, purchase wall, or child-data prompt exists.

### Story Mode
- Route `/story/:storySlug` opens page 1.
- One illustrated page is shown at a time.
- Read-aloud text overlays the image in the page-defined reserved area.
- UI uses warm/dim low-luminance palette.
- Page turns are parent-paced only: tap/click/swipe/keyboard.
- No autoplay, timer, next-story recommendation, ad, gamified reward, or analytics SDK exists.
- Final page ends quietly and offers only calm exit/back controls.

### Accessibility and usability
- Buttons have accessible names.
- Illustration `alt` text exists for every page.
- Text contrast is sufficient against the overlay panel.
- Touch targets are >=44px.
- Keyboard navigation works for desktop QA.
- Reduced-motion preference is respected.

### Build/QA
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.
- `npm run e2e` passes for the core read-through journey.

---

## Implementation order

1. Initialize `mini-dream-time-viewer` with Vite React TS.
2. Add routes and warm global tokens.
3. Implement story schema/types and one reference story record with placeholder images.
4. Implement Parent Mode story cards.
5. Implement Story Mode one-page renderer, overlay, and controls.
6. Add content validation script.
7. Add unit tests for schema/navigation.
8. Add Playwright smoke test for parent-to-story read-through.
9. Replace placeholders with approved Phase 0 reference art as it becomes available.
10. Run full QA and record results in a Phase 0 report.

---

## Deferred deliberately

- Mobile native app shell.
- Backend/CMS.
- Accounts, entitlements, payments, favorites, sync.
- Offline downloads.
- Narration/audio playback.
- Behavioral analytics.
- Runtime AI generation or personalization.
- Child profiles, child names, photos, or voice data.
