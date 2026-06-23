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
const limitArg = arg('limit', '1');
const limit = limitArg === 'all' ? Infinity : Number(limitArg);
const offset = Number(arg('offset', '0'));
const storyId = arg('story', null);
const pageId = arg('page', null);
const briefs = JSON.parse(readFileSync('art-briefs/nano-banana-2-page-briefs.json', 'utf8'));
let queue = briefs;
if (storyId) queue = queue.filter(b => b.storyId === storyId);
if (pageId) queue = queue.filter(b => b.pageId === pageId);
queue = queue.slice(Math.max(0, offset), Number.isFinite(limit) ? Math.max(1, limit) + Math.max(0, offset) : undefined);
if (!queue.length) {
  console.error('No matching briefs. Run npm run export:image-briefs first.');
  process.exit(1);
}

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
const negative = [
  'no visible words', 'no letters', 'no numbers', 'no speech bubbles unless explicitly blank',
  'no signs', 'no logos', 'no watermark', 'no signature', 'no captions', 'no title cards',
  'no readable symbols', 'no random glyphs', 'no subtitle text', 'no footer text', 'no printed text panels', 'no decorative writing', 'no scary realism', 'no horror', 'no violence',
  'no weapons', 'no injuries', 'no aggressive expressions', 'no sharp menace', 'no creepy eyes',
  'no uncanny faces', 'no distorted faces', 'no malformed limbs', 'no extra limbs',
  'no broken anatomy', 'no cluttered confusing composition', 'no franchise resemblance',
  'no named-studio imitation', 'not flat vector art', 'not clip art', 'not simple SVG'
].join(', ');

const characterBibles = {
  'moonlit-meadow': 'Use only Meadow Friends: Daisy, Dino, Pip, and Itsy. Daisy is a tiny original ladybug friend with glossy red shell wings, black spots, peach cheeks, tiny bead nose, soft black antennae with round tips, huge warm brown eyes. Dino is a small original green dinosaur with rounded toy-like body, oversized soft snout, cream-yellow belly, rounded orange back plates, olive spots, huge warm brown eyes, gentle smile. Pip is a small plush amber-orange tiger cub with cream muzzle/chest, rounded dark stripes, coral nose, fluffy cheek tufts, huge warm brown eyes, shy hopeful posture. Itsy is a tiny fuzzy charcoal-gray spider friend with round plush body, eight soft noodle legs with rounded feet, two oversized friendly eyes, tiny peach smile, never scary.',
  'sleepy-lantern-leaf': 'Use only Meadow Friends: Daisy the tiny red-and-black ladybug, Dino the gentle green dinosaur, Pip the plush amber tiger cub, and Itsy the tiny fuzzy charcoal spider. Keep the same proportions and colors as the Meadow Friends bible. The lantern leaf is a small glowing leaf object, not a new speaking character: soft green body, warm golden edge glow, sleepy face only if needed, child-safe and simple.',
  'itsy-soft-bridge': 'Use only Meadow Friends: Daisy the tiny red-and-black ladybug, Dino the gentle green dinosaur, Pip the plush amber tiger cub, and Itsy the tiny fuzzy charcoal spider. Itsy leads the bridge-building scenes and must stay cute, plush, harmless, and non-realistic; no horror spider traits.',
  'pillow-hill-parade': 'Use only Pillow Pals: Momo Puffin, Bibi Bunny, and Tula Turtle. Momo Puffin is a small rounded black-and-cream puffin with orange beak and tiny orange feet, plush sleepy eyes, childlike body. Bibi Bunny is a soft ivory bunny with long rounded ears, peach inner ears, rosy cheeks, big brown eyes, gentle bounce. Tula Turtle is a small sage-green turtle with rounded shell, cream belly, slow kind eyes, tiny feet, and calm posture. Pillows are soft props only, no extra face characters unless the beat requires a simple sleepy expression.',
  'button-moon-bakery': 'Use only Sky Bakers: Coco Cricket, Luma Lamb, and Nib Starling. Coco Cricket is a tiny rounded cocoa-brown cricket baker with soft antennae, kind eyes, no realistic insect detail. Luma Lamb is a small cream lamb with cloud-like wool, golden hooves, big gentle eyes, soft bakery apron shape without text. Nib Starling is a little midnight-blue bird with rounded beak, starry speckles, bright kind eyes, small wings. Button Moon is a glowing moon-like bakery object in the sky, not a franchise character.',
  'nori-bubble-tide': 'Use only Ocean Dreamers: Nori Narwhal, Puddle Otter, and Mimi Minnow. Nori Narwhal is a small rounded aqua narwhal child with soft cream belly, tiny harmless horn, big brown eyes, rosy cheeks, toy-like flippers, plush clay-like skin. Puddle Otter is a small warm-brown otter with cream muzzle, rounded ears, soft paws, big playful eyes, smooth plush fur. Mimi Minnow is a tiny pearly pink-and-silver minnow with big gentle eyes, translucent fins, rosy cheeks, and childlike proportions. Bubbles are props, not extra characters unless simple expression is explicitly needed.',
  'fennel-lantern-lane': 'Use only Lantern Lane: Fennel Fox, Roo Mouse, and Opal Owl. Fennel Fox is a small warm-orange fox child with cream muzzle, rounded ears, fluffy tail, big amber eyes, gentle careful expression. Roo Mouse is a tiny taupe mouse with large round ears, soft pink nose, small paws, earnest smile. Opal Owl is a small lavender-gray owl with rounded body, sleepy wise eyes, soft feathers, no sharp talons. Lanterns are warm glowing props only, no readable signs.',
  'starblanket-helpers': 'Use only Starlight Helpers: Nova Glow, Ollie Bluebeam, and Mica Mosslight. Nova Glow is a warm gold-pink childlike bedtime helper with soft blanket-cape, rounded hood/collar, large expressive eyes, eager gentle smile, no logo, no mask. Ollie Bluebeam is sky-blue, careful and observant, with soft blanket-cape, rounded plush proportions, big thoughtful eyes, no logo, no mask. Mica Mosslight is moss-green, steady and encouraging, with soft blanket-cape, rounded plush proportions, kind eyes, no logo, no mask. Only these three hero helpers should appear as characters.'
};

function readTierLine(brief) {
  const text = brief.readAloudText?.Explore || brief.readAloudText?.Wonder || brief.readAloudText?.Drift || '';
  return text ? `Read-aloud text handled by app layer, not image: ${text}` : '';
}

function shotType(brief) {
  if (brief.textPlacement === 'right-panel') return 'medium-wide storybook composition, main action on left and center, integrated calm negative space on the right for app text overlay, not a blank white block';
  if (brief.textPlacement === 'top-left') return 'medium-wide storybook composition, main action center/right, integrated soft negative space in the top-left for app text overlay, not a blank white block';
  return 'medium-wide storybook composition, characters readable at thumbnail size, action in the upper two-thirds, integrated calm lower area for app text overlay, not a blank white block';
}

function styleBible(brief) {
  const age = brief.ageRange || '';
  const extra = brief.storyId === 'starblanket-helpers'
    ? 'Gentle bedtime superheroes only: no villains, no combat, no weapons, no armor, no city destruction, no masks, no logos, no franchise-like costume marks. Heroism feels like helping, listening, waiting, and making night safe.'
    : 'Keep all creatures cute, gentle, harmless, approachable, and emotionally warm. Even bugs, spiders, dinosaurs, sea creatures, and night scenes must feel safe for small children.';
  return `Create a premium cinematic 3D children’s bedtime storybook illustration.

Scene:
${brief.storyBeat}. Make this one clear emotional action, not a generic landscape.

Characters:
${characterBibles[brief.storyId] || `Use the ${brief.characterSet} characters only: ${(brief.characters || []).join(', ')}.`}
Maintain the exact colors, proportions, facial features, markings, accessories, and personalities across the whole story. ${extra}

Composition:
${shotType(brief)} Clear focal point on facial expressions. Avoid clutter. Characters must be large, readable, and emotionally clear.

Environment:
Lush magical bedtime storybook world appropriate to ${brief.title || brief.storyTitle}: flowers, leaves, soft hills, clouds, lantern glow, fireflies, pebbles, grass, water, or dream-world scenery only where it supports the page beat. Rich but clean detail.

Lighting:
${brief.lightingMood === 'bedtime' ? 'Cozy blue-purple night ambience, warm lantern/firefly/moon glow, soft rim light, gentle bounce light, no harsh contrast.' : brief.lightingMood === 'dawn' ? 'Soft dawn glow, warm bounce light, gentle shadows, pastel sky, cozy bedtime-safe atmosphere.' : 'Soft warm golden light, gentle bounce light, subtle rim light, polished global illumination, soft shadows, cozy bedtime-safe atmosphere.'}

Style:
High-end animated 3D storybook art, rounded toy-like characters, soft plush/clay-like tactile surfaces, large expressive eyes, rounded cheeks, rich colour, gentle depth of field, polished render, clean forms, warm child-friendly mood, book-ready quality. Original IP only; do not copy any specific studio, franchise, artist, or copyrighted character.

Text/Layout:
No text in image. No text panels. No footer subtitles. No printed caption areas. Do not generate letters, words, numbers, signs, labels, title cards, captions, watermarks, or logos. The product overlays all story text separately in HTML.

Quality constraints:
Ultra-polished, emotionally clear, child-safe, charming, coherent, soft enough for bedtime, detailed enough for a paid children’s product, no scary realism, no harsh shadows, no clutter, no distorted faces, no extra limbs, no unreadable gibberish text.

Negative constraints: ${negative}`;
}

async function generate(brief) {
  const prompt = styleBible(brief);
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }).finally(() => clearTimeout(timeout));
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
  writeFileSync(manifest, JSON.stringify({ model, storyId: brief.storyId, pageId: brief.pageId, title: brief.title || brief.storyTitle, mime, output: out, generatedAt: new Date().toISOString(), prompt }, null, 2));
  console.log(out);
}

for (const brief of queue) await generate(brief);
