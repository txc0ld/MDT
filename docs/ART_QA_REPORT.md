# Mini Dream Time Production Art QA

## Pilot: `moonlit-meadow/p1` via `nano-banana-pro-preview`

Output:

- `art-output/moonlit-meadow/p1-nano-banana-pro-preview.jpg`

Verdict: **do not promote to production asset yet**.

What worked:

- High-quality soft 3D render with polished lighting.
- Gentle bedtime-safe mood.
- No visible text, letters, signs, captions, logos, or watermark.
- Bottom portion leaves a broad text-safe zone for the app overlay.
- Color and depth are much closer to the desired subscription-quality target than the SVG scaffold.

Issues:

- Character identity drift: the generated characters do not match the Mini Dream Time character set for this story.
- Story beat is too generic: it shows a charming walk at sunset, but not the exact page moment from the manuscript.
- Bottom safe zone is very large and visually split; useful for text, but it may feel less like one continuous storybook image.
- Needs reference-image conditioning or stronger character descriptors before replacing page art.

Next prompt iteration:

- Use locked character reference sheets.
- Require the exact named characters and relative scale.
- Ask for one continuous scene with a calmer lower-third text-safe meadow/paper-light area rather than a hard split.
- Keep the no-text rule unchanged.

## Starblanket Helpers hero-art pass

Generated with the improved Gemini/Nano Banana prompt that avoids named studio styles and instead asks for original high-budget feature-animation-level soft 3D quality.

Promoted as production candidates:

- `assets/stories/starblanket-helpers/p1-nano-banana-pro-preview.jpg`
- `assets/stories/starblanket-helpers/p2-nano-banana-pro-preview.jpg`
- `assets/stories/starblanket-helpers/p8-nano-banana-pro-preview.jpg`

Verdict: **promoted as candidate art, not final sequence-approved art**.

What worked:

- The website shelf/card art now looks materially more premium than the SVG superhero scaffold.
- The latest p1 has only the three helpers, no extra people/silhouettes, no visible text/logos/signs, and a calming quilted-night composition.
- p2 strongly matches the fallen-star lantern beat and reads as high-end soft 3D bedtime hero art.
- p8 strongly matches the folded-capes/resting-resolution beat and leaves a large lower text-safe zone.
- The characters feel original, plush, young, non-combat, and bedtime-safe.

Issues still to solve before final art lock:

- p1/p2/p8 are strong enough to improve the site, but full 8-page sequence consistency still needs a dedicated character-reference pass.
- p4 was rejected: beautiful render, but the right-side safe zone was too blank and visually split the page.
- The remaining Starblanket pages still use SVG scaffold art.

Next prompt iteration:

- Generate a locked Starlight Helpers turnaround/reference sheet.
- Use that reference sheet for all remaining pages.
- Require integrated text-safe negative space rather than hard white/blank areas.
- Batch only after p1, p2, and one mid-story page stay visually consistent.
