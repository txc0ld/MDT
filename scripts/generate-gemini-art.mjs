import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

function loadEnv() {
  try {
    const raw = readFileSync('.env', 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

function arg(name, fallback = null) {
  const pref = `--${name}=`;
  const found = process.argv.find(a => a.startsWith(pref));
  return found ? found.slice(pref.length) : fallback;
}

loadEnv();
const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!key) {
  console.error('Missing GEMINI_API_KEY or GOOGLE_API_KEY. Add it to .env; do not commit .env.');
  process.exit(1);
}

const model = arg('model', process.env.GEMINI_IMAGE_MODEL || 'nano-banana-pro-preview');
const limit = Number(arg('limit', '1'));
const storyId = arg('story', null);
const pageId = arg('page', null);
const briefs = JSON.parse(readFileSync('art-briefs/nano-banana-2-page-briefs.json', 'utf8'));
let queue = briefs;
if (storyId) queue = queue.filter(b => b.storyId === storyId);
if (pageId) queue = queue.filter(b => b.pageId === pageId);
queue = queue.slice(0, Math.max(1, limit));
if (!queue.length) {
  console.error('No matching briefs. Run npm run export:image-briefs first.');
  process.exit(1);
}

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
const negative = 'No visible words, no letters, no numbers, no speech bubbles, no signs, no logos, no watermark, no captions, no title cards, no readable symbols, no scary detail, no uncanny faces, no malformed limbs, no franchise resemblance.';

async function generate(brief) {
  const prompt = [
    'Create one premium, high-end soft 3D children’s storybook page illustration for Mini Dream Time.',
    'Quality target: polished ChatGPT/Nano Banana style children’s book render, rounded plush characters, expressive safe faces, cinematic daylight-to-bedtime lighting, tactile clay/plush surfaces, rich colorful environment, shallow depth, crisp focal characters, subscription-worthy finish.',
    'Important production rule: this is ART ONLY. The app will place all story text separately in HTML. Do not put any text inside the image.',
    `Story: ${brief.title}`,
    `Age range: ${brief.ageRange}`,
    `Story beat: ${brief.storyBeat}`,
    `Characters / scene prompt: ${brief.prompt}`,
    `Composition: leave a calm clear visual zone for app text placement (${brief.textPlacement}); keep faces and important action out of that zone.`,
    `Negative requirements: ${negative}`
  ].join('\n');
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
  };
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${text.slice(0, 700)}`);
  const data = JSON.parse(text);
  const parts = data.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData?.data || p.inline_data?.data);
  if (!img) throw new Error(`No inline image returned. Response parts: ${JSON.stringify(parts).slice(0, 700)}`);
  const inline = img.inlineData || img.inline_data;
  const mime = inline.mimeType || inline.mime_type || 'image/png';
  const ext = mime.includes('jpeg') || mime.includes('jpg') ? 'jpg' : mime.includes('webp') ? 'webp' : 'png';
  const out = `art-output/${brief.storyId}/${brief.pageId}-${model.replace(/[^a-z0-9-]/gi, '-')}.${ext}`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(inline.data, 'base64'));
  const manifest = `${out}.json`;
  writeFileSync(manifest, JSON.stringify({ model, storyId: brief.storyId, pageId: brief.pageId, title: brief.title, mime, output: out, generatedAt: new Date().toISOString(), prompt }, null, 2));
  console.log(out);
}

for (const brief of queue) await generate(brief);
