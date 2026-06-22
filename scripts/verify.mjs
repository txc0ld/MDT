
import { readFileSync, existsSync } from 'node:fs';
const stories = JSON.parse(readFileSync('data/stories.json','utf8'));
let failures=[];
if (!Array.isArray(stories) || stories.length<1) failures.push('stories.json must contain at least one story');
for (const s of stories){
  for (const page of s.pages || []){
    if (!existsSync(page.illustrationRef)) failures.push(`missing illustration ${page.illustrationRef}`);
    const txt = Object.values(page.readAloudText||{}).join(' ');
    if (!txt || txt.length < 20) failures.push(`short/missing readAloudText ${s.id}/${page.pageId}`);
    if (page.audioRef !== null) failures.push(`audioRef must be null in Phase 0 ${s.id}/${page.pageId}`);
  }
}
const files = ['index.html','src/app.js','src/styles.css','docs/STYLE_GUIDE.md','docs/CHARACTER_BIBLE.md'];
for (const f of files) if(!existsSync(f)) failures.push(`missing ${f}`);
if (failures.length){ console.error(failures.join('\n')); process.exit(1); }
console.log(`ok: ${stories.length} story, ${stories.reduce((n,s)=>n+s.pages.length,0)} pages, all Phase 0 checks passed`);
