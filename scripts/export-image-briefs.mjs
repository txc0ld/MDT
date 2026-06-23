import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const stories = JSON.parse(readFileSync('data/stories.json', 'utf8'));
mkdirSync('art-briefs', { recursive: true });
const briefs = [];

for (const story of stories) {
  for (const page of story.pages) {
    briefs.push({
      id: `${story.id}-${page.pageId}`,
      storyId: story.id,
      storyTitle: story.title,
      title: story.title,
      pageId: page.pageId,
      storyBeat: page.storyBeat,
      readAloudText: page.readAloudText,
      ageRange: story.ageRange,
      ageBand: story.ageBand,
      characterSet: story.characterSet,
      characters: story.characters,
      mood: story.mood,
      textPlacement: page.textPlacement,
      lightingMood: page.lightingMood,
      currentIllustrationRef: page.illustrationRef,
      outputTarget: `assets/stories/${story.id}/${page.pageId}-nano-banana-2.png`,
      prompt: page.illustrationPrompt,
      negative: 'no words, no letters, no numbers, no readable marks, no signage, no logos, no watermarks, no franchise resemblance, no scary detail, no weapons, no photoreal insects, no uncanny faces, no malformed limbs',
      acceptance: [
        'High-end soft 3D children storybook quality',
        'The image clearly depicts the exact story beat',
        'Characters match the relevant character set and remain original',
        'No visible text or symbols inside the image',
        'Reserved visual breathing room for the app text placement',
        'Suitable for the listed age range',
      ],
    });
  }
}

writeFileSync('art-briefs/nano-banana-2-page-briefs.json', JSON.stringify(briefs, null, 2));
writeFileSync('art-briefs/nano-banana-2-page-briefs.md', briefs.map(b => `## ${b.id}\n\n- Story: ${b.storyTitle}\n- Page: ${b.pageId}\n- Age: ${b.ageRange} (${b.ageBand})\n- Character set: ${b.characterSet}\n- Target: \`${b.outputTarget}\`\n\nPrompt:\n\n\`\`\`text\n${b.prompt}\n\`\`\`\n\nNegative:\n\n\`\`\`text\n${b.negative}\n\`\`\`\n`).join('\n'));
console.log(`exported ${briefs.length} page briefs`);
