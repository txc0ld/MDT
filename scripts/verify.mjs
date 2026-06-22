import { readFileSync, existsSync } from 'node:fs';
const stories = JSON.parse(readFileSync('data/stories.json','utf8'));
let failures=[];
if (!Array.isArray(stories) || stories.length<1) failures.push('stories.json must contain at least one story');
for (const s of stories){
  for (const required of ['id','slug','title','category','tier','readTime','theme','contentSafety','publication']) {
    if (!(required in s)) failures.push(`story ${s.id||'<unknown>'} missing ${required}`);
  }
  if (s.contentSafety?.reviewed === true) failures.push(`reference scaffold should not be release-approved yet: ${s.id}`);
  const seen = new Set();
  for (const page of s.pages || []){
    if (seen.has(page.pageId)) failures.push(`duplicate pageId ${s.id}/${page.pageId}`);
    seen.add(page.pageId);
    if (!existsSync(page.illustrationRef)) failures.push(`missing illustration ${page.illustrationRef}`);
    const tiers = page.readAloudText || {};
    for (const tier of ['Drift','Wonder','Explore']) {
      if (!tiers[tier] || tiers[tier].length < 10) failures.push(`missing/short ${tier} text ${s.id}/${page.pageId}`);
    }
    if (!page.illustrationAlt) failures.push(`missing illustrationAlt ${s.id}/${page.pageId}`);
    if (!page.textPlacement) failures.push(`missing textPlacement ${s.id}/${page.pageId}`);
    if (page.audioRef !== null) failures.push(`audioRef must be null in Phase 0 ${s.id}/${page.pageId}`);
    if (page.qa?.noBakedText !== true) failures.push(`noBakedText QA must be true for scaffold ${s.id}/${page.pageId}`);
  }
}
const files = [
  'index.html','src/app.js','src/styles.css',
  'PRODUCT.md','DESIGN.md',
  'docs/STYLE_GUIDE.md','docs/CHARACTER_BIBLE.md','docs/ILLUSTRATION_PIPELINE.md',
  'docs/BUILD_GATE_CHECKLIST.md','docs/TECHNICAL_SCAFFOLD_PLAN.md','docs/PHASE_0_REPORT.md'
];
for (const f of files) if(!existsSync(f)) failures.push(`missing ${f}`);
if (failures.length){ console.error(failures.join('\n')); process.exit(1); }
console.log(`ok: ${stories.length} story, ${stories.reduce((n,s)=>n+s.pages.length,0)} pages, docs+schema Phase 0 checks passed`);
