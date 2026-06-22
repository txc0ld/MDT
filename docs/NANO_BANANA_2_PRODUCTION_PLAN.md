# Nano Banana 2 Production Art Plan

Status: ready for API/configuration, not yet executed.  
Current machine check: no `nano-banana` or `gemini` CLI found, and no Gemini/Google image API environment variable is available in this session.

## Recommendation

Yes, use Nano Banana 2 / Gemini image generation for production interiors **if** we can use reference images or character-locking. The current Hermes image backend available in this session is text-to-image only, so it can create premium concept targets but cannot guarantee all 37 pages keep the same characters on-model.

## What Nano Banana 2 should do here

For every page:

1. Use the character set as reference context.
2. Generate high-end soft 3D storybook art.
3. Match the exact page beat from `data/stories.json`.
4. Keep the image text-free.
5. Preserve the UI-safe composition zone from `textPlacement`.
6. Save output to:
   - `assets/stories/<story-id>/<page-id>-nano-banana-2.png`
7. Update `illustrationRef` only after QA passes.

## Required setup

One of these is needed:

- a working Gemini / Nano Banana image API key exposed as an environment variable, or
- a configured CLI command available from the shell, or
- a Hermes image backend switched to a Gemini/Nano Banana model with reference-image support.

Do not hard-code keys in this repository.

## Generated briefs

Run:

```bash
npm run export:image-briefs
```

Outputs:

- `art-briefs/nano-banana-2-page-briefs.json`
- `art-briefs/nano-banana-2-page-briefs.md`

These contain one production prompt per page with:

- story title
- page id
- age range
- character set
- target output path
- exact story beat
- no-text negative block
- acceptance checklist

## QA gates before replacing scaffold art

A generated page can replace the SVG scaffold only if:

- it is clearly high-end soft 3D storybook quality;
- it depicts the exact story moment;
- character identity is consistent across pages in that story;
- no words, letters, signs, labels, logos, or watermarks are visible;
- composition leaves room for the app text placement;
- it is appropriate for the story age range;
- it passes visual review and the verifier.

## Current limitation

Until Nano Banana 2 or another reference-locking model is configured, the current SVG interiors remain scaffold art. They are useful for layout and QA, but not subscription-quality final art.
