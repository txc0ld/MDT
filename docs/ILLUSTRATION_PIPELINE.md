# Mini Dream Time Illustration Pipeline

Status: Phase 0 v0.1. Use this before producing any catalog art.

## Gate order

1. Read `STYLE_GUIDE.md` and `CHARACTER_BIBLE.md`.
2. Generate one master sheet per character on a neutral background, no visible text.
3. Approve/reject master sheets against locked descriptors.
4. Condition every scene on approved master sheets using reference-image / character-consistency features where available.
5. Generate text-free scene art only. The app overlays story text.
6. Reject and regenerate any off-model character, baked-in text, scary tone, or cluttered text zone.
7. Log prompt, seed/model, references, rejection reason, cost, and elapsed time.

## Per-illustration prompt template

```text
[CHARACTERS]: <verbatim locked descriptor for each character present from CHARACTER_BIBLE.md>
[ACTION/POSE]: <what they are doing and the feeling on their faces>
[SETTING]: <environment, time of day, props, no words/signs/text anywhere>
[COMPOSITION]: 4:3 landscape tablet page, <camera/framing>, reserved clean negative space for app text overlay in <lower third|upper left|upper sky>, no characters crossing text-safe zone
[LIGHTING/MOOD]: <Daytime warm | Bedtime dim-warm> from STYLE_GUIDE.md
[STYLE]: <verbatim Style Token Block from STYLE_GUIDE.md>
[NEGATIVE]: <verbatim Negative Block from STYLE_GUIDE.md>
[ASPECT RATIO]: 4:3 landscape
```

## Rejection log template

```md
## Asset
- Story/page:
- Model/tool:
- Prompt file:
- Seed/reference IDs:
- Cost:
- Elapsed time:

## Result
- Approved: yes/no
- Rejection reason:
- Character consistency notes:
- Text-free check:
- Bedtime calm check:
- Fix attempted:
```

## Phase 0 reference story concepts

### 1. Moonlit Meadow Echo
Category: Brave Little Adventures. Tier: Wonder. 5 pages.  
Theme: Fear becomes silly when friends understand it.  
Status: scaffolded in `data/stories.json` and `assets/stories/moonlit-meadow/`.

### 2. The Sleepy Lantern Leaf
Category: Sleepy Meadow / Curious World. Tier: Drift/Wonder. 5 pages.  
Beat outline:
1. Daisy notices one leaf glowing amber under the moon.
2. Dino lifts friends gently to see tiny dew drops catching light.
3. Pip worries the glow might disappear if touched.
4. Itsy shows that the glow is moonlight resting on water beads.
5. The friends say good night to the leaf as the meadow dims.
Educational weave: reflection/dew without naming a lesson.

### 3. Pip’s Little Brave Step
Category: Friends & Feelings. Tier: Wonder. 6 pages.  
Beat outline:
1. Pip watches Daisy and Dino play from behind soft flowers.
2. Daisy notices and leaves space beside her.
3. Dino rolls a seed-ball gently, not too fast.
4. Pip takes one small step, then another.
5. Itsy does a silly bow and everyone laughs softly.
6. Pip curls beside the group, proud and sleepy.
Educational weave: inclusion and courage through action, not lecture.

## Cost/time measurement

For deterministic SVG scaffold:
- Generation cost: $0.
- Human/agent production time: captured by git/session logs.
- Production-art estimate: cannot be measured until a reference-locking image tool is used. Record real model cost per accepted image, not per generated image, because rejected drift is the true economic unit.
