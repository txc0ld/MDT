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
