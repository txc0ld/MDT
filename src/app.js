
const state = { stories: [], selected: null, page: 0, tier: 'Wonder' };
const app = document.querySelector('#app');

async function loadStories(){
  const res = await fetch('data/stories.json');
  state.stories = await res.json();
  renderHome();
}

function textFor(page){ return page.readAloudText[state.tier] || page.readAloudText.Wonder; }
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function renderHome(){
  const story = state.stories[0];
  app.innerHTML = `<section class="shell parent-mode">
    <header class="topbar"><div><span class="brand-mark">✦</span><strong>GlimmerTales</strong></div><span class="privacy">No child data collected</span></header>
    <section class="hero">
      <p class="kicker">Phase 0 read-together scaffold</p>
      <h1>A warm little library for bedtime reading.</h1>
      <p class="lede">A parent-paced picture book viewer with clean art, app-layer text, calm lighting, and no autoplay.</p>
    </section>
    <section class="pick" aria-label="Tonight's pick">
      <div class="pick-copy"><p class="label">Tonight’s pick</p><h2>${esc(story.title)}</h2><p>${esc(story.theme)}</p><div class="chips"><span>${esc(story.tier)}</span><span>${esc(story.category)}</span><span>${esc(story.readTime)}</span></div></div>
      <button class="primary" id="startBtn">Read this story</button>
    </section>
    <section class="library"><h2>Reference library</h2><div class="story-grid">${state.stories.map(s=>`<button class="story-card" data-story="${esc(s.id)}"><img src="${esc(s.pages[0].illustrationRef)}" alt=""><span>${esc(s.title)}</span><small>${esc(s.readTime)} · ${esc(s.tier)}</small></button>`).join('')}</div></section>
    <footer class="note">Prototype only. Narration is intentionally absent. Story text is HTML overlay, not baked into illustration assets.</footer>
  </section>`;
  document.querySelector('#startBtn').addEventListener('click', ()=>startStory(story.id));
  document.querySelectorAll('[data-story]').forEach(btn=>btn.addEventListener('click',()=>startStory(btn.dataset.story)));
}

function startStory(id){ state.selected = state.stories.find(s=>s.id===id); state.page=0; renderStory(); }
function renderStory(){
  const story = state.selected; const page = story.pages[state.page]; const total = story.pages.length;
  app.innerHTML = `<section class="story-mode" aria-label="Story mode">
    <div class="story-top"><button class="ghost" id="backHome">Close book</button><div><strong>${esc(story.title)}</strong><span>Page ${state.page+1} of ${total}</span></div><label>Tier <select id="tierSel"><option>Drift</option><option>Wonder</option><option>Explore</option></select></label></div>
    <article class="page-frame">
      <img class="story-art" src="${esc(page.illustrationRef)}" alt="Text-free illustration for ${esc(story.title)}, page ${state.page+1}">
      <div class="read-text"><p>${esc(textFor(page))}</p></div>
    </article>
    <nav class="turns" aria-label="Page turns"><button id="prev" ${state.page===0?'disabled':''}>Previous page</button><button id="next">${state.page===total-1?'Finish softly':'Next page'}</button></nav>
  </section>`;
  document.querySelector('#tierSel').value = state.tier;
  document.querySelector('#tierSel').addEventListener('change', e=>{state.tier=e.target.value; renderStory();});
  document.querySelector('#backHome').addEventListener('click', renderHome);
  document.querySelector('#prev').addEventListener('click', ()=>{ if(state.page>0){ state.page--; renderStory(); }});
  document.querySelector('#next').addEventListener('click', ()=>{ if(state.page<total-1){ state.page++; renderStory(); } else renderHome(); });
  window.onkeydown = (e)=>{ if(!state.selected) return; if(e.key==='ArrowRight' && state.page<total-1){state.page++; renderStory();} if(e.key==='ArrowLeft' && state.page>0){state.page--; renderStory();} if(e.key==='Escape') renderHome(); };
}

loadStories().catch(err=>{ app.innerHTML = `<pre class="error">${esc(err.stack||err)}</pre>`; });
