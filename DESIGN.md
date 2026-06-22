# Design

## Overview

GlimmerTales uses a warm low-luminance bedtime product UI around text-free story illustrations. The interface should disappear into the ritual: a parent opens the app, chooses a story in one or two taps, then reads from a calm picture-book page. The app chrome is premium and quiet, not playful in a way that competes with sleep.

## Color

The v0.3 direction is brighter and more kid-facing while staying premium and readable.

- Sky bubble: `#bfe9ff`, airy background and storybook sky.
- Mint meadow: `#95efc2`, fresh child-friendly field color.
- Sun candy: `#ffd66e`, primary warmth and CTA base.
- Peach pop: `#ffad8f`, CTA gradient and friendly highlights.
- Bubble pink: `#ff8fc8`, playful accent used sparingly.
- Story grape: `#7467d8`, filters, progress, focus, and premium contrast.
- Deep berry ink: `#3c276b`, headings and critical text.
- Card cream: `#fffaf4`, polished readable surfaces.

Contrast rule: large story text uses deep berry ink on warm cream overlays. Avoid privacy/legal phrasing in visible kid-facing hero copy; keep trust details in parent notes and docs.

## Typography

- Display: Georgia or another bookish serif with soft forms for story titles and read-aloud text.
- UI/body: rounded humanist sans stack via `ui-rounded`, `Avenir Next`, `Nunito`, system fallback.
- Read-aloud text: large serif, balanced line breaks, short line lengths, generous leading.
- Avoid monospace, tight tracking, all-caps body copy, and hard geometric product typography.

## Layout

- Parent Mode: one calm home surface with Tonight’s Pick, category/library cards, and clear privacy reassurance.
- Story Mode: one image per page in a 4:3 frame, with an app-layer read-aloud panel over reserved illustration negative space.
- Page turns: parent-paced Previous/Next. No timers, no autoplay, no next-story trap.
- Mobile: story controls stack; story text remains reachable and large.

## Components

- `topbar`: quiet brand + privacy claim.
- `pick`: highlighted story recommendation.
- `story-card`: image preview with title, tier, and read time.
- `page-frame`: protected story canvas.
- `read-text`: semi-opaque warm overlay for parent-readable copy.
- `turns`: simple parent controls.

## Motion

Motion is minimal. Hover lift is allowed on parent selection cards. Story page turns should remain instant or softly crossfaded later. Respect `prefers-reduced-motion`.

## Illustration system

Illustrations are not UI decorations; they are content. They must be text-free, character-consistent, warm, and calm. Any story text, title, speech, signage, or caption belongs in HTML/app layout, never inside generated art.
