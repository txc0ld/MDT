import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

const defs = `<defs>
  <radialGradient id="skyBubble" cx="35%" cy="18%" r="95%"><stop offset="0" stop-color="#BFE9FF"/><stop offset="0.45" stop-color="#BCA7FF"/><stop offset="1" stop-color="#6157B8"/></radialGradient>
  <linearGradient id="meadow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8FE7A6"/><stop offset="1" stop-color="#47B883"/></linearGradient>
  <linearGradient id="meadowDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CCB8C"/><stop offset="1" stop-color="#28896C"/></linearGradient>
  <radialGradient id="moonGlow" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#FFF6B8"/><stop offset="1" stop-color="#FFD56E"/></radialGradient>
  <linearGradient id="daisyShell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF7A8A"/><stop offset="0.55" stop-color="#F94E5F"/><stop offset="1" stop-color="#D92D45"/></linearGradient>
  <linearGradient id="dinoSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A9F36E"/><stop offset="0.55" stop-color="#6ED95E"/><stop offset="1" stop-color="#39A870"/></linearGradient>
  <linearGradient id="pipFur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFC05E"/><stop offset="0.52" stop-color="#FF9238"/><stop offset="1" stop-color="#E46E2E"/></linearGradient>
  <linearGradient id="itsyFuzz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8A7CE8"/><stop offset="0.55" stop-color="#6558C6"/><stop offset="1" stop-color="#4A3B99"/></linearGradient>
  <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#2C2156" flood-opacity="0.28"/></filter>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <pattern id="sprinkles" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="16" cy="14" r="2" fill="#FFFFFF" opacity=".35"/><circle cx="66" cy="26" r="2.4" fill="#FFE48A" opacity=".35"/><circle cx="42" cy="62" r="1.9" fill="#FF9BC3" opacity=".35"/></pattern>
</defs>`;

function bg({ motif = 'meadow', mood = 'bright' } = {}) {
  const sky = `<rect width="1200" height="900" fill="url(#skyBubble)"/><rect width="1200" height="900" fill="url(#sprinkles)" opacity=".55"/><circle cx="990" cy="120" r="58" fill="url(#moonGlow)" opacity=".92" filter="url(#glow)"/>`;
  const hills = `<path d="M0 602 C180 520 340 584 520 505 C760 405 960 535 1200 445 L1200 900 L0 900z" fill="url(#meadow)"/><path d="M0 724 C205 650 375 715 590 642 C810 565 980 690 1200 615 L1200 900 L0 900z" fill="url(#meadowDark)"/><ellipse cx="600" cy="815" rx="520" ry="88" fill="#FFF1A6" opacity=".30"/>`;
  let extras = '';
  if (motif === 'leaf') extras = `<ellipse cx="608" cy="560" rx="230" ry="86" fill="#6DE18B" transform="rotate(-10 608 560)" filter="url(#softShadow)"/><path d="M410 598 C520 538 710 524 830 575" stroke="#E9FF9C" stroke-width="10" fill="none" opacity=".85"/><circle cx="620" cy="535" r="48" fill="#FFF2A0" opacity=".42" filter="url(#glow)"/><circle cx="548" cy="558" r="18" fill="#DDFEFF" opacity=".55"/>`;
  if (motif === 'bridge') extras = `<ellipse cx="650" cy="640" rx="330" ry="105" fill="#67C8E8" opacity=".74"/><path d="M330 635 C500 535 780 535 960 635" stroke="#A97454" stroke-width="42" fill="none" stroke-linecap="round" filter="url(#softShadow)"/><path d="M342 630 C510 552 775 552 948 630" stroke="#FFE48A" stroke-width="7" fill="none" opacity=".8"/><circle cx="915" cy="610" r="28" fill="#FF9BC3" opacity=".55"/>`;
  return `${sky}${hills}${extras}`;
}

function eye(cx, cy, s = 1) {
  return `<g><ellipse cx="${cx}" cy="${cy}" rx="${11*s}" ry="${13*s}" fill="#FFFDF5"/><circle cx="${cx+2*s}" cy="${cy+1*s}" r="${5*s}" fill="#5B351E"/><circle cx="${cx+5*s}" cy="${cy-4*s}" r="${2.2*s}" fill="#FFFFFF"/></g>`;
}

function daisy(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow)">
    <path d="M-33 11 C-47 30 -42 59 -17 67 C-8 45 -4 25 0 5 C-12 2 -24 3 -33 11z" fill="url(#daisyShell)"/><path d="M33 11 C47 30 42 59 17 67 C8 45 4 25 0 5 C12 2 24 3 33 11z" fill="url(#daisyShell)"/>
    <ellipse cx="0" cy="28" rx="30" ry="39" fill="#242029"/><ellipse cx="-1" cy="14" rx="18" ry="16" fill="#FFD6C7"/>
    <circle cx="-21" cy="24" r="5" fill="#242029"/><circle cx="5" cy="45" r="5" fill="#242029"/><circle cx="21" cy="24" r="5" fill="#242029"/>
    <circle cx="0" cy="-18" r="27" fill="#242029"/><ellipse cx="0" cy="-10" rx="18" ry="15" fill="#FFD6C7"/>
    ${eye(-10,-21,.85)}${eye(11,-21,.85)}<circle cx="-15" cy="-4" r="4.5" fill="#FF9AB5" opacity=".75"/><circle cx="15" cy="-4" r="4.5" fill="#FF9AB5" opacity=".75"/><path d="M-8 4 Q0 10 9 3" fill="none" stroke="#5B351E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-12 -43 Q-25 -56 -29 -66" stroke="#242029" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M12 -43 Q25 -56 29 -66" stroke="#242029" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-67" r="5" fill="#242029"/><circle cx="30" cy="-67" r="5" fill="#242029"/>
    <path d="M-20 48 q-22 9 -28 28 M20 48 q22 9 28 28" stroke="#242029" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M-22 -38 q-8 -10 -20 -10 M22 -38 q8 -10 20 -10" stroke="#242029" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="-12" cy="-42" rx="8" ry="4" fill="#FFFFFF" opacity=".16"/>
  </g>`;
}

function dino(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow)">
    <path d="M-35 94 q-14 26 -38 24" stroke="url(#dinoSkin)" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M64 94 q16 25 42 24" stroke="url(#dinoSkin)" stroke-width="22" fill="none" stroke-linecap="round"/>
    <ellipse cx="18" cy="35" rx="61" ry="76" fill="url(#dinoSkin)"/><ellipse cx="20" cy="56" rx="34" ry="52" fill="#FFF0A7" opacity=".9"/>
    <path d="M-52 -70 L-34 -103 L-14 -72 M-8 -82 L13 -118 L35 -80 M40 -75 L58 -108 L78 -72" fill="#FF8B4A"/>
    <ellipse cx="18" cy="-38" rx="72" ry="50" fill="url(#dinoSkin)"/><ellipse cx="58" cy="-30" rx="48" ry="35" fill="url(#dinoSkin)"/>
    <circle cx="-25" cy="-48" r="9" fill="#3E9B65" opacity=".75"/><circle cx="17" cy="3" r="8" fill="#3E9B65" opacity=".60"/><circle cx="52" cy="28" r="7" fill="#3E9B65" opacity=".60"/>
    ${eye(-2,-60,1.05)}${eye(47,-58,1.05)}<ellipse cx="68" cy="-33" rx="5" ry="8" fill="#407E4A"/><ellipse cx="88" cy="-29" rx="5" ry="8" fill="#407E4A"/>
    <path d="M30 -13 Q53 7 83 -9" fill="none" stroke="#4A2B23" stroke-width="5" stroke-linecap="round"/><path d="M68 49 q72 20 105 70" stroke="url(#dinoSkin)" stroke-width="28" fill="none" stroke-linecap="round"/>
    <ellipse cx="-46" cy="121" rx="20" ry="10" fill="#FFF0CF"/><ellipse cx="100" cy="121" rx="20" ry="10" fill="#FFF0CF"/><path d="M-31 28 q-34 10 -42 35 M61 28 q33 11 46 34" stroke="url(#dinoSkin)" stroke-width="15" fill="none" stroke-linecap="round"/>
    <ellipse cx="-12" cy="-75" rx="15" ry="6" fill="#FFFFFF" opacity=".14"/>
  </g>`;
}

function pip(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow)">
    <path d="M31 51 q42 18 32 62" stroke="url(#pipFur)" stroke-width="13" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="42" rx="38" ry="52" fill="url(#pipFur)"/><ellipse cx="0" cy="58" rx="23" ry="32" fill="#FFE0A9"/>
    <circle cx="0" cy="-16" r="40" fill="url(#pipFur)"/><circle cx="-26" cy="-48" r="15" fill="url(#pipFur)"/><circle cx="26" cy="-48" r="15" fill="url(#pipFur)"/><circle cx="-26" cy="-48" r="8" fill="#FFB2AC"/><circle cx="26" cy="-48" r="8" fill="#FFB2AC"/>
    <ellipse cx="0" cy="0" rx="24" ry="17" fill="#FFE0A9"/>
    <path d="M-31 -30 q14 8 27 1 M4 -31 q17 7 31 0 M-36 -10 q13 5 25 1 M13 -11 q14 5 27 -1 M-27 28 q13 5 25 0 M15 29 q15 4 29 -2" stroke="#513022" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${eye(-13,-20,.9)}${eye(14,-20,.9)}<path d="M0 -5 l8 6 l-8 6 l-8 -6z" fill="#E66A55"/><path d="M-9 13 Q0 20 10 12" stroke="#513022" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="-21" cy="2" r="4" fill="#FFB2AC" opacity=".55"/><circle cx="22" cy="2" r="4" fill="#FFB2AC" opacity=".55"/>
  </g>`;
}

function itsy(x, y, s = 1) {
  const legs = [[-33,-6],[-27,8],[-20,21],[-10,31],[33,-6],[27,8],[20,21],[10,31]].map(([dx,dy]) => `<path d="M${dx} ${dy} q${dx*1.55} ${20+Math.abs(dx)/2} ${dx*2.25} ${36+Math.abs(dx)/3}" stroke="#5547A8" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#softShadow)">${legs}<ellipse cx="0" cy="15" rx="38" ry="33" fill="url(#itsyFuzz)"/><ellipse cx="-8" cy="5" rx="25" ry="18" fill="#FFFFFF" opacity=".10"/>${eye(-12,4,.95)}${eye(13,4,.95)}<circle cx="-19" cy="18" r="4" fill="#FF9BC3" opacity=".55"/><circle cx="20" cy="18" r="4" fill="#FF9BC3" opacity=".55"/><path d="M-10 24 Q1 32 14 23" stroke="#FFD6C7" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-22" cy="-12" r="3" fill="#C8C1FF" opacity=".8"/><circle cx="18" cy="-10" r="2.5" fill="#C8C1FF" opacity=".8"/></g>`;
}

function safePanel(zone) {
  if (zone === 'top-left') return `<rect x="70" y="76" width="520" height="190" rx="42" fill="#FFFFFF" opacity=".30" stroke="#FFF2A0" stroke-width="2" stroke-dasharray="10 11"/>`;
  if (zone === 'right-panel') return `<rect x="760" y="165" width="350" height="540" rx="44" fill="#FFFFFF" opacity=".25" stroke="#FFF2A0" stroke-width="2" stroke-dasharray="10 11"/>`;
  return `<rect x="88" y="642" width="1024" height="184" rx="46" fill="#FFFFFF" opacity=".28" stroke="#FFF2A0" stroke-width="2" stroke-dasharray="10 11"/>`;
}

function svg(chars, opts = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="Text-free Mini Dream Time reference illustration"><title>Text-free Mini Dream Time reference illustration</title>${defs}${bg(opts)}<g>${chars}</g>${safePanel(opts.zone || 'bottom')}</svg>`;
}

const storyPages = {
  'moonlit-meadow': [
    svg(daisy(390,470,1.55)+dino(640,405,1.22)+pip(860,428,1.55), { motif:'meadow', zone:'bottom' }),
    svg(daisy(350,485,1.35)+dino(575,405,1.14)+pip(760,480,1.35)+itsy(910,505,1.35), { motif:'meadow', zone:'bottom' }),
    svg(daisy(410,520,1.25)+dino(655,455,1.08)+itsy(850,550,1.55), { motif:'bridge', zone:'top-left' }),
    svg(itsy(555,500,2.1)+daisy(355,530,1.2)+dino(755,465,1.02)+pip(955,520,1.22), { motif:'bridge', zone:'bottom' }),
    svg(daisy(350,525,1.25)+dino(590,455,1.02)+pip(790,525,1.3)+itsy(940,560,1.15), { motif:'meadow', zone:'bottom' }),
  ],
  'sleepy-lantern-leaf': [
    svg(daisy(385,480,1.32)+dino(640,410,1.08), { motif:'leaf', zone:'bottom' }),
    svg(pip(370,480,1.42)+dino(640,405,1.06)+daisy(840,485,1.12), { motif:'leaf', zone:'bottom' }),
    svg(pip(470,490,1.5)+itsy(700,525,1.45), { motif:'leaf', zone:'right-panel' }),
    svg(itsy(520,510,1.9)+daisy(720,510,1.2)+pip(860,510,1.32), { motif:'leaf', zone:'bottom' }),
    svg(daisy(330,500,1.2)+dino(560,425,1.0)+pip(765,505,1.25)+itsy(930,535,1.15), { motif:'leaf', zone:'top-left' }),
    svg(daisy(355,530,1.1)+dino(590,465,.96)+pip(780,535,1.15)+itsy(920,565,1.05), { motif:'leaf', zone:'bottom' }),
  ],
  'itsy-soft-bridge': [
    svg(daisy(340,500,1.2)+dino(575,425,1.02)+pip(800,500,1.22)+itsy(955,535,1.1), { motif:'bridge', zone:'bottom' }),
    svg(pip(500,515,1.55)+daisy(725,535,1.1), { motif:'bridge', zone:'top-left' }),
    svg(daisy(445,520,1.42)+dino(745,445,1.02), { motif:'bridge', zone:'bottom' }),
    svg(dino(450,430,1.08)+pip(770,510,1.25), { motif:'bridge', zone:'right-panel' }),
    svg(itsy(520,500,2.0)+daisy(735,528,1.2), { motif:'bridge', zone:'bottom' }),
    svg(daisy(350,500,1.15)+pip(525,520,1.2)+dino(735,438,.98)+itsy(960,535,1.1), { motif:'bridge', zone:'bottom' }),
  ]
};

for (const [story, pages] of Object.entries(storyPages)) {
  pages.forEach((content, idx) => write(`assets/stories/${story}/page-${String(idx+1).padStart(2,'0')}.svg`, content));
}

// Premium character master sheets.
write('assets/characters/daisy-master.svg', svg(daisy(600,430,3.0), { motif:'meadow', zone:'top-left' }));
write('assets/characters/dino-master.svg', svg(dino(570,405,2.18), { motif:'meadow', zone:'top-left' }));
write('assets/characters/pip-master.svg', svg(pip(600,430,2.9), { motif:'meadow', zone:'top-left' }));
write('assets/characters/itsy-master.svg', svg(itsy(600,430,3.35), { motif:'meadow', zone:'top-left' }));

console.log('premium SVG assets regenerated:', Object.values(storyPages).flat().length, 'story pages');
