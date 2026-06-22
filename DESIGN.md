# Design

## Overview

GlimmerTales uses a warm low-luminance bedtime product UI around text-free story illustrations. The interface should disappear into the ritual: a parent opens the app, chooses a story in one or two taps, then reads from a calm picture-book page. The app chrome is premium and quiet, not playful in a way that competes with sleep.

## Color

Use OKLCH-compatible CSS tokens where possible, with the current scaffold expressed as hex fallbacks.

- Night base: `#151625`, deep indigo-black for bedtime surfaces.
- Plum depth: `#21192b`, secondary background and panels.
- Warm ink: `#fff3dc`, main text on dark surfaces.
- Muted parent text: `#d8c8aa`, supporting copy.
- Candle gold: `#e0b768`, trust accent, borders, dividers.
- Soft amber: `#f1c777`, primary button surface.
- Moss leaf: `#809958`, gentle natural accent.
- Panel overlay: `rgba(31,24,35,.72)`, used sparingly for text overlays.

Contrast rule: story text must remain readable in a dim room and hit WCAG AA against overlay panels. Avoid pale gray on tinted backgrounds.

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
