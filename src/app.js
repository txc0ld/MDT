const state = {
  stories: [],
  selected: null,
  page: 0,
  tier: 'Wonder',
  category: 'all',
  quiet: false,
  qaOpen: false,
};

const app = document.querySelector('#app');
const tiers = ['Drift', 'Wonder', 'Explore'];

async function loadStories() {
  const res = await fetch('data/stories.json');
  state.stories = await res.json();
  applyRoute();
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function textFor(page) { return page.readAloudText[state.tier] || page.readAloudText.Wonder; }
function pagesCount() { return state.stories.reduce((n, s) => n + s.pages.length, 0); }
function currentStory() { return state.selected; }
function categoryList() {
  return [...new Map(state.stories.map(s => [s.categorySlug || slug(s.category), s.category])).entries()];
}
function filteredStories() {
  if (state.category === 'all') return state.stories;
  return state.stories.filter(s => (s.categorySlug || slug(s.category)) === state.category);
}
function completionLabel(story) {
  const count = story.pages.length;
  const approved = story.pages.filter(p => p.qa?.releaseApproved).length;
  return `${approved}/${count} release approved`;
}

function applyRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
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
  const categories = categoryList();
  const items = filteredStories();
  app.innerHTML = `<section class="shell parent-mode">
    <header class="topbar">
      <button class="brand-lockup" id="homeBtn" aria-label="GlimmerTales home"><span class="brand-mark">✦</span><span><strong>GlimmerTales</strong><small>Phase 0 library lab</small></span></button>
      <nav class="top-actions" aria-label="Parent tools">
        <button class="soft-pill" id="qaToggle">QA gates</button>
        <span class="privacy">No child data collected</span>
      </nav>
    </header>

    <section class="hero-grid">
      <div class="hero-copy">
        <p class="kicker">Parent-paced bedtime library</p>
        <h1>Three quiet stories, one small world, zero child tracking.</h1>
        <p class="lede">A richer Phase 0 viewer for testing story rhythm, art consistency, release gates, and read-aloud comfort before any production-art spend.</p>
        <div class="hero-actions"><button class="primary" id="startBtn">Read tonight’s pick</button><button class="secondary" id="browseBtn">Browse library</button></div>
      </div>
      <aside class="ritual-card" aria-label="Phase 0 status">
        <p class="label">Build status</p>
        <strong>${state.stories.length} stories · ${pagesCount()} pages</strong>
        <span>Fixed catalog, app-layer text, no narration, no child profiles.</span>
        <div class="status-rows">
          <span><b></b> Text-free SVG scaffold</span>
          <span><b></b> Release approval intentionally blocked</span>
          <span><b></b> Human safety/IP review required</span>
        </div>
      </aside>
    </section>

    <section class="pick" aria-label="Tonight's pick">
      <img src="${esc(pick.coverIllustrationRef)}" alt="" loading="lazy">
      <div class="pick-copy"><p class="label">Tonight’s pick</p><h2>${esc(pick.title)}</h2><p>${esc(pick.parentSummary || pick.theme)}</p><div class="chips"><span>${esc(pick.tier)}</span><span>${esc(pick.category)}</span><span>${esc(pick.readTime)}</span></div></div>
      <button class="primary" data-start="${esc(pick.id)}">Open story</button>
    </section>

    <section class="filters" id="library">
      <div><h2>Reference library</h2><p>Built to test page pacing and compliance gates, not final illustration quality.</p></div>
      <div class="filter-row" role="list" aria-label="Story filters">
        <button class="filter ${state.category === 'all' ? 'is-active' : ''}" data-cat="all">All</button>
        ${categories.map(([id, label]) => `<button class="filter ${state.category === id ? 'is-active' : ''}" data-cat="${esc(id)}">${esc(label)}</button>`).join('')}
      </div>
    </section>

    <section class="story-grid">${items.map(storyCard).join('')}</section>

    <section class="qa-panel ${state.qaOpen ? 'is-open' : ''}" id="qaPanel" aria-label="Phase 0 release gates">
      <div><p class="label">Release gate</p><h2>Nothing here is release-approved yet.</h2><p>That is intentional. The scaffold proves structure and reading experience; production art, legal review, and content safety still block launch.</p></div>
      <ul>
        <li>No child data, profiles, ads, or behavior analytics.</li>
        <li>No baked-in text in illustration assets.</li>
        <li>Every story requires editor, safety, IP, and provenance approval.</li>
        <li>Final art needs reference-locking or illustrator workflow.</li>
      </ul>
    </section>

    <footer class="note">Prototype only. Story text is HTML overlay, not baked into illustration assets. Audio remains deferred with <code>audioRef: null</code>.</footer>
  </section>`;

  document.querySelector('#startBtn').addEventListener('click', () => startStory(pick.id));
  document.querySelector('#browseBtn').addEventListener('click', () => document.querySelector('#library').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  document.querySelector('#qaToggle').addEventListener('click', () => { state.qaOpen = !state.qaOpen; renderHome(); });
  document.querySelectorAll('[data-start]').forEach(btn => btn.addEventListener('click', () => startStory(btn.dataset.start)));
  document.querySelectorAll('[data-cat]').forEach(btn => btn.addEventListener('click', () => { state.category = btn.dataset.cat; renderHome(); }));
}

function storyCard(s) {
  const tags = (s.themeTags || []).slice(0, 3).map(t => `<span>${esc(t)}</span>`).join('');
  return `<article class="story-card">
    <button class="cover-button" data-start="${esc(s.id)}" aria-label="Open ${esc(s.title)}"><img src="${esc(s.coverIllustrationRef || s.pages[0].illustrationRef)}" alt="" loading="lazy"></button>
    <div class="story-card-body"><div class="story-card-top"><span class="mini-badge">${esc(s.tier)}</span><span>${esc(s.readTime)}</span></div><h3>${esc(s.title)}</h3><p>${esc(s.parentSummary || s.theme)}</p><div class="tag-row">${tags}</div><small>${esc(completionLabel(s))}</small></div>
  </article>`;
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
    <div class="story-top">
      <button class="ghost" id="backHome">Close book</button>
      <div class="story-title"><strong>${esc(story.title)}</strong><span>Page ${state.page + 1} of ${total} · ${esc(story.category)}</span></div>
      <label class="tier-select">Reading tier <select id="tierSel">${tiers.map(t => `<option>${t}</option>`).join('')}</select></label>
      <button class="ghost" id="quietBtn">${state.quiet ? 'Raise light' : 'Dim light'}</button>
    </div>
    <article class="page-frame placement-${esc(placement)}">
      <img class="story-art" src="${esc(page.illustrationRef)}" alt="${esc(page.illustrationAlt || `Text-free illustration for ${story.title}`)}">
      <div class="read-text"><p>${esc(textFor(page))}</p></div>
      <aside class="page-meta"><span>${esc(page.lightingMood)}</span><span>${esc(placement.replace('-', ' '))}</span></aside>
    </article>
    <div class="progress-dots" aria-label="Story progress">${story.pages.map((p, i) => `<button class="dot ${i === state.page ? 'is-active' : ''}" data-page="${i}" aria-label="Go to page ${i + 1}"></button>`).join('')}</div>
    <nav class="turns" aria-label="Page turns"><button id="prev" ${state.page === 0 ? 'disabled' : ''}>Previous page</button><button id="next">${state.page === total - 1 ? 'Finish softly' : 'Next page'}</button></nav>
    <details class="review-drawer"><summary>Review gate for this page</summary><dl><dt>No baked text</dt><dd>${page.qa?.noBakedText ? 'Passed scaffold check' : 'Needs review'}</dd><dt>Character consistency</dt><dd>${esc(page.qa?.characterConsistency || 'not checked')}</dd><dt>Release approved</dt><dd>${page.qa?.releaseApproved ? 'Yes' : 'No, blocked pending human review'}</dd></dl></details>
  </section>`;

  document.querySelector('#tierSel').value = state.tier;
  document.querySelector('#tierSel').addEventListener('change', e => { state.tier = e.target.value; renderStory(); });
  document.querySelector('#backHome').addEventListener('click', () => setRoute('parent'));
  document.querySelector('#quietBtn').addEventListener('click', () => { state.quiet = !state.quiet; renderStory(); });
  document.querySelector('#prev').addEventListener('click', () => changePage(state.page - 1));
  document.querySelector('#next').addEventListener('click', () => state.page < total - 1 ? changePage(state.page + 1) : setRoute('parent'));
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
