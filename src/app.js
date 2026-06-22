const state = {
  stories: [],
  selected: null,
  page: 0,
  tier: 'Wonder',
  category: 'all',
  characterSet: 'all',
  ageRange: 'all',
  quiet: false,
  qaOpen: false,
  surprise: null,
};

const app = document.querySelector('#app');
const tiers = ['Drift', 'Wonder', 'Explore'];
const quickPicks = [
  { id: 'sleepy', label: 'Sleepy', hint: 'soft wind-downs' },
  { id: 'silly', label: 'Silly', hint: 'tiny giggles' },
  { id: 'soft-brave', label: 'Brave', hint: 'gentle courage' },
  { id: 'dreamy', label: 'Dreamy', hint: 'big imagination' },
  { id: 'teamwork', label: 'Helpful', hint: 'friends solve it' },
  { id: 'gentle-heroes', label: 'Heroes', hint: 'older-kid brave' },
  { id: 'new-friends', label: 'New friends', hint: 'different cast' },
];

async function loadStories() {
  const res = await fetch('data/stories.json');
  state.stories = await res.json();
  state.surprise = pickRandom(state.stories);
  applyRoute();
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function textFor(page) { return page.readAloudText[state.tier] || page.readAloudText.Wonder; }
function pagesCount() { return state.stories.reduce((n, s) => n + s.pages.length, 0); }
function currentStory() { return state.selected; }
function uniquePairs(field, fallbackField) {
  return [...new Map(state.stories.map(s => [slug(s[field] || s[fallbackField]), s[field] || s[fallbackField]])).entries()];
}
function categoryList() { return uniquePairs('category', 'categorySlug'); }
function characterSetList() { return uniquePairs('characterSet', 'characterSet'); }
function ageRangeList() { return uniquePairs('ageRange', 'ageRange'); }
function filteredStories() {
  return state.stories.filter(s => {
    const cat = state.category === 'all' || (s.categorySlug || slug(s.category)) === state.category;
    const set = state.characterSet === 'all' || slug(s.characterSet) === state.characterSet;
    const age = state.ageRange === 'all' || slug(s.ageRange) === state.ageRange;
    return cat && set && age;
  });
}
function completionLabel(story) { return `${story.pages.length} cozy pages · ${story.characterSet || 'Story friends'}`; }
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)] || null; }
function storiesForQuick(id) {
  if (id === 'new-friends') return state.stories.filter(s => s.characterSet && s.characterSet !== 'Meadow Friends');
  return state.stories.filter(s => s.mood === id || (s.themeTags || []).includes(id));
}

function applyRoute() {
  const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
  const parts = hash.split('/').filter(Boolean);
  if (parts[0] === 'story') {
    const story = state.stories.find(s => s.slug === parts[1] || s.id === parts[1]);
    if (story) {
      state.selected = story;
      const pageIndex = parts[2] ? story.pages.findIndex(p => p.pageId === parts[2]) : 0;
      state.page = pageIndex >= 0 ? pageIndex : 0;
      renderStory();
      return;
    }
  }
  state.selected = null;
  renderHome();
}

function setRoute(path) {
  if (location.hash === `#/${path}`) applyRoute();
  else location.hash = `/${path}`;
}

window.addEventListener('hashchange', applyRoute);

function renderHome() {
  const pick = state.stories[0];
  const surprise = state.surprise || pickRandom(state.stories);
  const categories = categoryList();
  const sets = characterSetList();
  const ages = ageRangeList();
  const items = filteredStories();
  app.innerHTML = `<section class="shell parent-mode">
    <header class="topbar">
      <button class="brand-lockup" id="homeBtn" aria-label="Mini Dream Time home"><span class="brand-mark">✦</span><span><strong>Mini Dream Time</strong><small>Story shelf preview</small></span></button>
      <nav class="top-actions" aria-label="Parent tools"><button class="soft-pill" id="qaToggle">Review notes</button><span class="privacy">Made for reading together</span></nav>
    </header>

    <section class="hero-grid">
      <div class="hero-copy">
        <p class="kicker">Pick a story in seconds</p>
        <h1>Beautiful little stories for tonight’s mood.</h1>
        <p class="lede">Choose by feeling, category, or character set. Every path keeps the parent in control and gets to reading fast.</p>
        <div class="hero-actions"><button class="primary" id="surpriseBtn">Surprise me tonight</button><button class="secondary" id="browseBtn">Browse the shelf</button></div>
      </div>
      <aside class="ritual-card" aria-label="Story shelf status">
        <p class="label">Story shelf</p><strong>${state.stories.length} stories · ${pagesCount()} pages</strong>
        <span>Multiple friend groups, simple choices, and quick starts for tired parents.</span>
        <div class="status-rows"><span><b></b> Pick by mood</span><span><b></b> Choose an age range</span><span><b></b> Choose familiar or new friends</span><span><b></b> One tap starts reading</span></div>
      </aside>
    </section>

    <section class="quick-pick" aria-label="Quick story picker">
      <div class="quick-card surprise-card">
        <img src="${esc(surprise.coverIllustrationRef)}" alt="">
        <div><p class="label">Surprise story</p><h2>${esc(surprise.title)}</h2><p>${esc(surprise.parentSummary || surprise.theme)}</p><div class="chips"><span>${esc(surprise.ageRange)}</span><span>${esc(surprise.characterSet)}</span><span>${esc(surprise.readTime)}</span></div></div>
        <button class="primary" data-start="${esc(surprise.id)}">Read this one</button>
      </div>
      <div class="mood-grid" aria-label="Quick choices">
        ${quickPicks.map(q => `<button class="mood-button" data-quick="${esc(q.id)}"><strong>${esc(q.label)}</strong><span>${esc(q.hint)}</span></button>`).join('')}
      </div>
    </section>

    <section class="pick" aria-label="Tonight's pick">
      <img src="${esc(pick.coverIllustrationRef)}" alt="">
      <div class="pick-copy"><p class="label">Featured tonight</p><h2>${esc(pick.title)}</h2><p>${esc(pick.parentSummary || pick.theme)}</p><div class="chips"><span>${esc(pick.ageRange)}</span><span>${esc(pick.tier)}</span><span>${esc(pick.category)}</span><span>${esc(pick.readTime)}</span></div></div>
      <button class="primary" data-start="${esc(pick.id)}">Open story</button>
    </section>

    <section class="filters" id="library">
      <div><h2>Story shelf</h2><p>Filter by feeling, world, or friend group. Keep it broad, or pick quickly and start reading.</p></div>
      <div class="filter-stack">
        <div class="filter-row" role="list" aria-label="Age range filters"><button class="filter ${state.ageRange === 'all' ? 'is-active' : ''}" data-age="all">All ages</button>${ages.map(([id, label]) => `<button class="filter ${state.ageRange === id ? 'is-active' : ''}" data-age="${esc(id)}">${esc(label)}</button>`).join('')}</div>
        <div class="filter-row" role="list" aria-label="Story category filters"><button class="filter ${state.category === 'all' ? 'is-active' : ''}" data-cat="all">All worlds</button>${categories.map(([id, label]) => `<button class="filter ${state.category === id ? 'is-active' : ''}" data-cat="${esc(id)}">${esc(label)}</button>`).join('')}</div>
        <div class="filter-row" role="list" aria-label="Character set filters"><button class="filter ${state.characterSet === 'all' ? 'is-active' : ''}" data-set="all">All friends</button>${sets.map(([id, label]) => `<button class="filter ${state.characterSet === id ? 'is-active' : ''}" data-set="${esc(id)}">${esc(label)}</button>`).join('')}</div>
      </div>
    </section>

    <section class="story-grid">${items.map(storyCard).join('')}</section>

    <section class="qa-panel ${state.qaOpen ? 'is-open' : ''}" id="qaPanel" aria-label="Phase 0 release gates">
      <div><p class="label">Review notes</p><h2>Prototype notes for grown-ups.</h2><p>This local build is here to shape the bedtime feel before final art and editorial sign-off. The reading experience is the part to judge tonight.</p></div>
      <ul><li>Stories are fixed, parent-paced, and calm by design.</li><li>Illustrations stay clean so the app can place readable text.</li><li>Final artwork still needs a character-locked production pass.</li><li>Every story gets safety, IP, and editorial review before launch.</li></ul>
    </section>

    <footer class="note">Local prototype. Read-aloud words stay in HTML, separate from the illustration artwork. Audio remains deferred with <code>audioRef: null</code>.</footer>
  </section>`;

  document.querySelector('#surpriseBtn').addEventListener('click', () => startStory((state.surprise || surprise).id));
  document.querySelector('#browseBtn').addEventListener('click', () => document.querySelector('#library').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  document.querySelector('#qaToggle').addEventListener('click', () => { state.qaOpen = !state.qaOpen; renderHome(); });
  document.querySelectorAll('[data-start]').forEach(btn => btn.addEventListener('click', () => startStory(btn.dataset.start)));
  document.querySelectorAll('[data-cat]').forEach(btn => btn.addEventListener('click', () => { state.category = btn.dataset.cat; renderHome(); }));
  document.querySelectorAll('[data-age]').forEach(btn => btn.addEventListener('click', () => { state.ageRange = btn.dataset.age; renderHome(); }));
  document.querySelectorAll('[data-set]').forEach(btn => btn.addEventListener('click', () => { state.characterSet = btn.dataset.set; renderHome(); }));
  document.querySelectorAll('[data-quick]').forEach(btn => btn.addEventListener('click', () => {
    const list = storiesForQuick(btn.dataset.quick);
    state.surprise = pickRandom(list.length ? list : state.stories);
    renderHome();
    document.querySelector('.quick-pick').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

function storyCard(s) {
  const tags = (s.themeTags || []).slice(0, 3).map(t => `<span>${esc(t)}</span>`).join('');
  return `<article class="story-card"><button class="cover-button" data-start="${esc(s.id)}" aria-label="Open ${esc(s.title)}"><img src="${esc(s.coverIllustrationRef || s.pages[0].illustrationRef)}" alt=""></button><div class="story-card-body"><div class="story-card-top"><span class="mini-badge">${esc(s.quickPickLabel || s.tier)}</span><span>${esc(s.readTime)}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.parentSummary || s.theme)}</p><div class="tag-row"><span>${esc(s.ageRange)}</span><span>${esc(s.characterSet)}</span>${tags}</div><small>${esc(completionLabel(s))}</small></div></article>`;
}

function startStory(id) {
  const story = state.stories.find(s => s.id === id || s.slug === id);
  if (!story) return;
  state.selected = story;
  state.page = 0;
  setRoute(`story/${story.slug || story.id}/${story.pages[0].pageId}`);
}

function changePage(nextPage) {
  const story = currentStory();
  state.page = Math.max(0, Math.min(story.pages.length - 1, nextPage));
  setRoute(`story/${story.slug || story.id}/${story.pages[state.page].pageId}`);
}

function renderStory() {
  const story = currentStory();
  const page = story.pages[state.page];
  const total = story.pages.length;
  const placement = page.textPlacement || 'bottom-panel';
  app.innerHTML = `<section class="story-mode ${state.quiet ? 'is-quiet' : ''}" aria-label="Story mode">
    <div class="story-top"><button class="ghost" id="backHome">Close book</button><div class="story-title"><strong>${esc(story.title)}</strong><span>${esc(story.ageRange)} · Page ${state.page + 1} of ${total} · ${esc(story.characterSet || story.category)}</span></div><label class="tier-select">Reading tier <select id="tierSel">${tiers.map(t => `<option>${t}</option>`).join('')}</select></label><button class="ghost" id="quietBtn">${state.quiet ? 'Raise light' : 'Dim light'}</button></div>
    <article class="page-frame placement-${esc(placement)}"><img class="story-art" src="${esc(page.illustrationRef)}" alt="${esc(page.illustrationAlt || `Text-free illustration for ${story.title}`)}"><button class="tap-zone tap-zone-left" id="tapPrev" aria-label="Previous page"><span>‹</span></button><button class="tap-zone tap-zone-right" id="tapNext" aria-label="Next page"><span>›</span></button><div class="read-text"><p>${esc(textFor(page))}</p></div><aside class="page-meta"><span>${esc(page.lightingMood)}</span><span>${esc(placement.replace('-', ' '))}</span></aside></article>
    <div class="progress-dots" aria-label="Story progress">${story.pages.map((p, i) => `<button class="dot ${i === state.page ? 'is-active' : ''}" data-page="${i}" aria-label="Go to page ${i + 1}"></button>`).join('')}</div>
    <nav class="turns" aria-label="Page turns"><button id="prev" ${state.page === 0 ? 'disabled' : ''}>Previous page</button><button id="next">${state.page === total - 1 ? 'Finish softly' : 'Next page'}</button></nav>
    <details class="review-drawer"><summary>Production notes for this page</summary><dl><dt>Clean illustration</dt><dd>${page.qa?.noBakedText ? 'Text stays separate from the artwork' : 'Needs review'}</dd><dt>Character consistency</dt><dd>${esc(page.qa?.characterConsistency || 'not checked')}</dd><dt>Launch review</dt><dd>${page.qa?.releaseApproved ? 'Complete' : 'Waiting for final art and editorial review'}</dd></dl></details>
  </section>`;

  document.querySelector('#tierSel').value = state.tier;
  document.querySelector('#tierSel').addEventListener('change', e => { state.tier = e.target.value; renderStory(); });
  document.querySelector('#backHome').addEventListener('click', () => setRoute('parent'));
  document.querySelector('#quietBtn').addEventListener('click', () => { state.quiet = !state.quiet; renderStory(); });
  document.querySelector('#prev').addEventListener('click', () => changePage(state.page - 1));
  document.querySelector('#next').addEventListener('click', () => state.page < total - 1 ? changePage(state.page + 1) : setRoute('parent'));
  document.querySelector('#tapPrev').addEventListener('click', () => changePage(state.page - 1));
  document.querySelector('#tapNext').addEventListener('click', () => state.page < total - 1 ? changePage(state.page + 1) : setRoute('parent'));
  document.querySelectorAll('[data-page]').forEach(btn => btn.addEventListener('click', () => changePage(Number(btn.dataset.page))));
}

window.onkeydown = e => {
  if (!state.selected) return;
  if (e.key === 'ArrowRight') changePage(state.page + 1);
  if (e.key === 'ArrowLeft') changePage(state.page - 1);
  if (e.key === 'Escape') setRoute('parent');
};

let touchStart = null;
window.addEventListener('touchstart', e => { touchStart = e.touches[0]?.clientX ?? null; }, { passive: true });
window.addEventListener('touchend', e => {
  if (!state.selected || touchStart === null) return;
  const dx = (e.changedTouches[0]?.clientX ?? touchStart) - touchStart;
  if (Math.abs(dx) > 56) changePage(state.page + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });

loadStories().catch(err => { app.innerHTML = `<pre class="error">${esc(err.stack || err)}</pre>`; });
