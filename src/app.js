const state = {
  stories: [],
  selected: null,
  page: 0,
  tier: 'Wonder',
  category: 'all',
  characterSet: 'all',
  ageRange: 'all',
  quiet: false,
  surprise: null,
  lastRead: null,
};

const app = document.querySelector('#app');
const tiers = ['Drift', 'Wonder', 'Explore'];
const moodOptions = [
  { id: 'all', label: 'Any feeling' },
  { id: 'sleepy', label: 'Sleepy' },
  { id: 'silly', label: 'Tiny giggles' },
  { id: 'soft-brave', label: 'Gentle courage' },
  { id: 'dreamy', label: 'Big imagination' },
  { id: 'teamwork', label: 'Helpful friends' },
  { id: 'gentle-heroes', label: 'Soft heroes' },
];

async function loadStories() {
  const res = await fetch('data/stories.json');
  state.stories = await res.json();
  state.surprise = pickRandom(state.stories);
  state.lastRead = loadLastRead();
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
    const cat = state.category === 'all' || s.mood === state.category || (s.themeTags || []).includes(state.category) || (s.categorySlug || slug(s.category)) === state.category;
    const set = state.characterSet === 'all' || slug(s.characterSet) === state.characterSet;
    const age = state.ageRange === 'all' || slug(s.ageRange) === state.ageRange;
    return cat && set && age;
  });
}
function completionLabel(story) { return `${story.pages.length} pages · ${story.characterSet || 'Story friends'}`; }
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)] || null; }
function loadLastRead() {
  try {
    const saved = JSON.parse(localStorage.getItem('mdt:lastRead') || 'null');
    if (!saved?.storyId || !saved?.pageId) return null;
    const story = state.stories.find(s => s.id === saved.storyId || s.slug === saved.storyId);
    if (!story || !story.pages.some(p => p.pageId === saved.pageId)) return null;
    return saved;
  } catch {
    return null;
  }
}
function saveLastRead(story, page) {
  const next = { storyId: story.id, pageId: page.pageId };
  state.lastRead = next;
  try { localStorage.setItem('mdt:lastRead', JSON.stringify(next)); } catch {}
}
function clearLastRead() {
  state.lastRead = null;
  try { localStorage.removeItem('mdt:lastRead'); } catch {}
}
function openLastRead() {
  const saved = state.lastRead;
  const story = saved && state.stories.find(s => s.id === saved.storyId || s.slug === saved.storyId);
  const page = story && story.pages.find(p => p.pageId === saved.pageId);
  if (story && page) setRoute(`story/${story.slug || story.id}/${page.pageId}`);
  else startStory((state.surprise || pickRandom(state.stories)).id);
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
  document.title = 'Mini Dream Time — Calm Bedtime Stories for Kids';
  renderHome();
}

function setRoute(path) {
  if (location.hash === `#/${path}`) applyRoute();
  else location.hash = `/${path}`;
}

window.addEventListener('hashchange', applyRoute);

function renderHome() {
  const featured = state.stories[0];
  const items = filteredStories();
  const ages = ageRangeList();
  const sets = characterSetList();
  const hasLastRead = Boolean(state.lastRead);

  app.innerHTML = `<section class="shell parent-mode">
    <header class="topbar">
      <button class="brand-lockup" id="homeBtn" aria-label="Mini Dream Time home"><span class="brand-mark">✦</span><span><strong>Mini Dream Time</strong></span></button>
    </header>

    <section class="hero-panel" aria-labelledby="homeTitle">
      <div class="hero-copy">
        <h1 id="homeTitle">Bedtime, simplified.</h1>
        <p class="lede">Pick a beautiful story and start reading.</p>
        <div class="hero-actions"><button class="primary" id="surpriseBtn">${hasLastRead ? 'Continue' : 'Start tonight'}</button><button class="secondary" id="browseBtn">Browse</button></div>
      </div>
      <article class="featured-book">
        <img src="${esc(featured.coverIllustrationRef)}" alt="">
        <div class="featured-copy"><span>${esc(featured.ageRange)} · ${esc(featured.readTime)}</span><h2>${esc(featured.title)}</h2><button class="primary" data-start="${esc(featured.id)}">Read</button></div>
      </article>
    </section>

    <section class="shelf-intro" id="library">
      <div><h2>Stories</h2></div>
      <form class="shelf-controls" aria-label="Filter stories">
        ${selectControl('ageSelect', 'Age', state.ageRange, [['all', 'All ages'], ...ages])}
        ${selectControl('moodSelect', 'Feeling', state.category, moodOptions.map(m => [m.id, m.label]))}
        ${selectControl('setSelect', 'Friends', state.characterSet, [['all', 'All friends'], ...sets])}
      </form>
    </section>

    <section class="story-grid" aria-live="polite">${items.length ? items.map(storyCard).join('') : emptyShelf()}</section>
  </section>`;

  document.querySelector('#homeBtn').addEventListener('click', () => setRoute('parent'));
  document.querySelector('#surpriseBtn').addEventListener('click', () => hasLastRead ? openLastRead() : startStory((state.surprise || featured).id));
  document.querySelector('#browseBtn').addEventListener('click', () => document.querySelector('#library').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  document.querySelector('#ageSelect').addEventListener('change', e => { state.ageRange = e.target.value; renderHome(); });
  document.querySelector('#moodSelect').addEventListener('change', e => { state.category = e.target.value; renderHome(); });
  document.querySelector('#setSelect').addEventListener('change', e => { state.characterSet = e.target.value; renderHome(); });
  document.querySelectorAll('[data-start]').forEach(btn => btn.addEventListener('click', () => startStory(btn.dataset.start)));
}

function selectControl(id, label, value, options) {
  return `<label><span>${esc(label)}</span><select id="${esc(id)}">${options.map(([idValue, text]) => `<option value="${esc(idValue)}" ${value === idValue ? 'selected' : ''}>${esc(text)}</option>`).join('')}</select></label>`;
}

function emptyShelf() {
  return `<article class="empty-shelf"><h3>No stories found.</h3><p>Try another filter.</p></article>`;
}

function storyCard(s) {
  return `<article class="story-card"><button class="cover-button" data-start="${esc(s.id)}" aria-label="Open ${esc(s.title)}"><img src="${esc(s.coverIllustrationRef || s.pages[0].illustrationRef)}" alt=""></button><div class="story-card-body"><div class="story-card-top"><span>${esc(s.ageRange)}</span><span>${esc(s.readTime)}</span></div><h3>${esc(s.title)}</h3></div></article>`;
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
  saveLastRead(story, page);
  document.title = `${story.title} — Mini Dream Time`;
  app.innerHTML = `<section class="story-mode ${state.quiet ? 'is-quiet' : ''}" aria-label="Story mode">
    <div class="story-top"><button class="ghost" id="backHome">Close</button><div class="story-title"><strong>${esc(story.title)}</strong><span>${state.page + 1} / ${total}</span></div><select id="tierSel" aria-label="Reading tier">${tiers.map(t => `<option>${t}</option>`).join('')}</select><button class="ghost" id="quietBtn">${state.quiet ? 'Light' : 'Dim'}</button></div>
    <article class="page-frame placement-${esc(placement)}"><img class="story-art" src="${esc(page.illustrationRef)}" alt="${esc(page.illustrationAlt || `Text-free illustration for ${story.title}`)}"><button class="tap-zone tap-zone-left" id="tapPrev" aria-label="Previous page"><span>‹</span></button><button class="tap-zone tap-zone-right" id="tapNext" aria-label="Next page"><span>›</span></button><div class="read-text"><p>${esc(textFor(page))}</p></div></article>
    <div class="progress-dots" aria-label="Story progress">${story.pages.map((p, i) => `<button class="dot ${i === state.page ? 'is-active' : ''}" data-page="${i}" aria-label="Go to page ${i + 1}"></button>`).join('')}</div>
    <nav class="turns" aria-label="Page turns"><button id="prev" ${state.page === 0 ? 'disabled' : ''}>Previous page</button><button id="next">${state.page === total - 1 ? 'Finish softly' : 'Next page'}</button></nav>
  </section>`;

  document.querySelector('#tierSel').value = state.tier;
  document.querySelector('#tierSel').addEventListener('change', e => { state.tier = e.target.value; renderStory(); });
  document.querySelector('#backHome').addEventListener('click', () => setRoute('parent'));
  document.querySelector('#quietBtn').addEventListener('click', () => { state.quiet = !state.quiet; renderStory(); });
  document.querySelector('#prev').addEventListener('click', () => changePage(state.page - 1));
  document.querySelector('#next').addEventListener('click', () => state.page < total - 1 ? changePage(state.page + 1) : (clearLastRead(), setRoute('parent')));
  document.querySelector('#tapPrev').addEventListener('click', () => changePage(state.page - 1));
  document.querySelector('#tapNext').addEventListener('click', () => state.page < total - 1 ? changePage(state.page + 1) : (clearLastRead(), setRoute('parent')));
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
