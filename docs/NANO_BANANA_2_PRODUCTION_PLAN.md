# Gemini / Nano Banana Production Art Plan

Status: Gemini API is available locally through ignored `.env`; generation pipeline is now scripted. Do not commit `.env`.

## Recommendation

Use Gemini / Nano Banana image generation for production interiors with a strict 2-3 page pilot before replacing any scaffold art. The final images need reference-locking or repeated QA to keep characters consistent across a story.

## User quality target

The user supplied a high-quality ChatGPT-generated children’s storybook example on 2026-06-23. Use it as a **quality benchmark**, not something to copy.

Emulate:

- premium soft 3D render quality;
- rounded toy-like characters with expressive eyes and readable emotion;
- cinematic storybook environment depth;
- colorful foliage/flowers, polished materials, and rich lighting;
- clear scale contrast between characters;
- an immediately understandable story moment.

Avoid:

- baked-in speech bubbles, signs, banners, captions, or any readable text;
- copying the exact dinosaur/ladybug scene, joke, sign, or composition;
- clutter over the app text-safe zone;
- hyperactive action when the story beat should help bedtime wind down.

Mini Dream Time keeps all story words in HTML/app text. Production images must be text-free.

## What Gemini / Nano Banana should do here

For every page:

1. Use the character set as reference context.
2. Generate high-end soft 3D storybook art.
3. Match the exact page beat from `data/stories.json`.
4. Keep the image text-free.
5. Preserve the UI-safe composition zone from `textPlacement`.
6. Save output first to:
   - `art-output/<story-id>/<page-id>-<model>.png`
7. Move approved output to:
   - `assets/stories/<story-id>/<page-id>-nano-banana-2.png`
8. Update `illustrationRef` only after QA passes.

## Commands

Export briefs:

```bash
npm run export:image-briefs
```

Generate one pilot image:

```bash
npm run art:pilot
```

Generate a specific page:

```bash
npm run generate:gemini-art -- --story=moonlit-meadow --page=p1 --limit=1
```

Generate more pages after pilot approval:

```bash
npm run generate:gemini-art -- --limit=3
```

## Generated briefs

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

## Key handling

- `.env` is ignored by git.
- `.env.example` documents expected variables without secrets.
- If the key was shared anywhere public, rotate it before production.
