import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';

const stories = JSON.parse(readFileSync('data/stories.json', 'utf8'));
const appJs = readFileSync('src/app.js', 'utf8');
let failures = [];

if (!Array.isArray(stories) || stories.length < 7) failures.push('stories.json must contain at least seven Phase 0 reference stories and story seeds');

const storyIds = new Set();
const storySlugs = new Set();
let totalPages = 0;

for (const s of stories) {
  for (const required of ['id', 'storyId', 'slug', 'title', 'category', 'categorySlug', 'tier', 'readTime', 'theme', 'parentSummary', 'themeTags', 'characterSet', 'mood', 'ageRange', 'ageBand', 'ageRationale', 'bedtimeLengthGuide', 'storyStructureRule', 'draftLengthStatus', 'contentSafety', 'publication']) {
    if (!(required in s)) failures.push(`story ${s.id || '<unknown>'} missing ${required}`);
  }
  if (storyIds.has(s.id)) failures.push(`duplicate story id ${s.id}`);
  storyIds.add(s.id);
  if (storySlugs.has(s.slug)) failures.push(`duplicate story slug ${s.slug}`);
  storySlugs.add(s.slug);
  if (s.contentSafety?.reviewed === true) failures.push(`reference scaffold should not be release-approved yet: ${s.id}`);
  if (!/^\d+-\d+ yrs$/.test(s.ageRange)) failures.push(`invalid ageRange ${s.id}`);
  if (!s.bedtimeLengthGuide?.wordRange || !s.bedtimeLengthGuide?.minutes) failures.push(`missing bedtime length guide ${s.id}`);
  if (!/beginning/i.test(s.storyStructureRule) || !/resolution/i.test(s.storyStructureRule)) failures.push(`story structure rule must mention beginning and resolution ${s.id}`);
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
    if (!page.storyBeat || page.storyBeat.length < 20) failures.push(`missing storyBeat ${s.id}/${page.pageId}`);
    if (!page.illustrationPrompt || !/no text/i.test(page.illustrationPrompt)) failures.push(`missing no-text illustrationPrompt ${s.id}/${page.pageId}`);
    if (page.artProductionStatus !== 'needs-nano-banana-2-production') failures.push(`unexpected artProductionStatus ${s.id}/${page.pageId}`);
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
  'llms.txt', 'pricing.md', 'robots.txt', 'sitemap.xml',
  'PRODUCT.md', 'DESIGN.md',
  'docs/STYLE_GUIDE.md', 'docs/CHARACTER_BIBLE.md', 'docs/ILLUSTRATION_PIPELINE.md',
  'docs/BUILD_GATE_CHECKLIST.md', 'docs/TECHNICAL_SCAFFOLD_PLAN.md', 'docs/PHASE_0_REPORT.md',
  'docs/CONTENT_CATALOG.md', 'docs/CHARACTER_SET_EXPANSION.md', 'docs/BEDTIME_STORY_LENGTH_GUIDE.md',
  'docs/DOMAIN_AND_AEO_PLAN.md', 'docs/MINI_DREAM_TIME_SEO_AEO_ARCHITECTURE.md', 'docs/NANO_BANANA_2_PRODUCTION_PLAN.md', 'docs/ART_QA_REPORT.md', 'docs/QA_REPORT.md'
];
for (const f of files) if (!existsSync(f)) failures.push(`missing ${f}`);

const launchPages = [
  'bedtime-stories-for-kids/index.html',
  'read-aloud-bedtime-stories/index.html',
  'calm-bedtime-stories/index.html',
  'stories/1-3-years/index.html',
  'stories/3-5-years/index.html',
  'stories/5-7-years/index.html'
];
for (const f of launchPages) if (!existsSync(f)) failures.push(`missing launch page ${f}`);

const legacyBrandPattern = new RegExp(['Glim' + 'merTales', 'glim' + 'mertales', 'Glim' + 'mer'].join('|'));
for (const f of ['index.html', 'llms.txt', 'pricing.md', 'sitemap.xml', ...launchPages]) {
  if (!existsSync(f)) continue;
  const txt = readFileSync(f, 'utf8');
  if (legacyBrandPattern.test(txt)) failures.push(`legacy brand copy in ${f}`);
}

const appText = readFileSync('src/app.js', 'utf8');
if (legacyBrandPattern.test(appText)) failures.push('legacy brand copy in src/app.js');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`ok: ${stories.length} stories, ${totalPages} pages, text-free SVG/data/docs checks passed`);
