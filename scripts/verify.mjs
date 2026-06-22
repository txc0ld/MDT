import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';

const stories = JSON.parse(readFileSync('data/stories.json', 'utf8'));
const appJs = readFileSync('src/app.js', 'utf8');
let failures = [];

if (!Array.isArray(stories) || stories.length < 3) failures.push('stories.json must contain at least three Phase 0 reference stories');

const storyIds = new Set();
const storySlugs = new Set();
let totalPages = 0;

for (const s of stories) {
  for (const required of ['id', 'storyId', 'slug', 'title', 'category', 'categorySlug', 'tier', 'readTime', 'theme', 'parentSummary', 'contentSafety', 'publication']) {
    if (!(required in s)) failures.push(`story ${s.id || '<unknown>'} missing ${required}`);
  }
  if (storyIds.has(s.id)) failures.push(`duplicate story id ${s.id}`);
  storyIds.add(s.id);
  if (storySlugs.has(s.slug)) failures.push(`duplicate story slug ${s.slug}`);
  storySlugs.add(s.slug);
  if (s.contentSafety?.reviewed === true) failures.push(`reference scaffold should not be release-approved yet: ${s.id}`);
  if (s.audioRef !== null) failures.push(`story audioRef must be null in Phase 0 ${s.id}`);
  if (!existsSync(s.coverIllustrationRef)) failures.push(`missing cover illustration ${s.coverIllustrationRef}`);
  if (!Array.isArray(s.pages) || s.pages.length < 5) failures.push(`story ${s.id} needs at least 5 pages`);

  const seenPages = new Set();
  for (const [idx, page] of (s.pages || []).entries()) {
    totalPages += 1;
    if (seenPages.has(page.pageId)) failures.push(`duplicate pageId ${s.id}/${page.pageId}`);
    seenPages.add(page.pageId);
    if (page.order !== idx) failures.push(`page order mismatch ${s.id}/${page.pageId}`);
    if (!existsSync(page.illustrationRef)) failures.push(`missing illustration ${page.illustrationRef}`);
    if (extname(page.illustrationRef) === '.svg') {
      const svg = readFileSync(page.illustrationRef, 'utf8');
      if (/<text\b/i.test(svg)) failures.push(`visible SVG text element found in ${page.illustrationRef}`);
      if (/<foreignObject\b/i.test(svg)) failures.push(`foreignObject could hide visible text in ${page.illustrationRef}`);
    }
    const tiers = page.readAloudText || {};
    for (const tier of ['Drift', 'Wonder', 'Explore']) {
      if (!tiers[tier] || tiers[tier].length < 10) failures.push(`missing/short ${tier} text ${s.id}/${page.pageId}`);
    }
    if (!page.illustrationAlt) failures.push(`missing illustrationAlt ${s.id}/${page.pageId}`);
    if (!['bottom-panel', 'top-left', 'right-panel'].includes(page.textPlacement)) failures.push(`unsupported textPlacement ${s.id}/${page.pageId}`);
    if (!['evening', 'bedtime', 'dawn'].includes(page.lightingMood)) failures.push(`unsupported lightingMood ${s.id}/${page.pageId}`);
    if (page.audioRef !== null) failures.push(`audioRef must be null in Phase 0 ${s.id}/${page.pageId}`);
    if (page.qa?.noBakedText !== true) failures.push(`noBakedText QA must be true for scaffold ${s.id}/${page.pageId}`);
    if (page.qa?.releaseApproved === true) failures.push(`page should not be release-approved in Phase 0 scaffold ${s.id}/${page.pageId}`);
  }
}

if (/setTimeout\s*\(|setInterval\s*\(|autoplay\s*=|gtag\s*\(|posthog\.|plausible\s*\(|mixpanel\.|amplitude\./i.test(appJs)) {
  failures.push('src/app.js contains a forbidden timer/autoplay/analytics implementation marker');
}

const files = [
  'index.html', 'src/app.js', 'src/styles.css',
  'PRODUCT.md', 'DESIGN.md',
  'docs/STYLE_GUIDE.md', 'docs/CHARACTER_BIBLE.md', 'docs/ILLUSTRATION_PIPELINE.md',
  'docs/BUILD_GATE_CHECKLIST.md', 'docs/TECHNICAL_SCAFFOLD_PLAN.md', 'docs/PHASE_0_REPORT.md',
  'docs/CONTENT_CATALOG.md', 'docs/QA_REPORT.md'
];
for (const f of files) if (!existsSync(f)) failures.push(`missing ${f}`);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`ok: ${stories.length} stories, ${totalPages} pages, text-free SVG/data/docs checks passed`);
