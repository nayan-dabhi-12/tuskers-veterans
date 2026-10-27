/* =========================================================
   TUSKERS VETERANS PORTAL — application
   Vanilla JS. Hash router + views + forms + local storage.
   ========================================================= */
(function () {
'use strict';

/* ---------- tiny helpers ---------- */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const store = {
  get(k, d){ try { return JSON.parse(localStorage.getItem('tv_' + k)) ?? d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('tv_' + k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem('tv_' + k); } catch(e){} }
};
function toast(msg, isErr){
  const t = $('#toast');
  t.innerHTML = msg; t.hidden = false; t.classList.toggle('is-err', !!isErr);
  requestAnimationFrame(() => t.classList.add('is-on'));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    t.classList.remove('is-on');
    setTimeout(() => { t.hidden = true; }, 320);
  }, 4200);
}
const initials = n => String(n||'?').trim().split(/\s+/).slice(-2).map(w => w[0]).join('').toUpperCase();
const uid = p => p + '-' + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2,5).toUpperCase();

/* =========================================================
   SVG ART for the hero carousel (self-contained, no images)
   ========================================================= */
function art(kind){
  const sky = {
    parade:     ['#F6C67A','#E2884B','#7A4A2E'],
    centre:     ['#BFD3E8','#7C9CBE','#33475E'],
    college:    ['#F2E3BD','#D9B96F','#6E5A2E'],
    welfare:    ['#FBD6A2','#F0A05E','#8A4B2A'],
    fellowship: ['#CFE0B8','#8FAE6B','#3E5227']
  }[kind] || ['#DCE6C9','#93A96E','#33421C'];

  const head = `<svg viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky_${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky[0]}"/><stop offset=".55" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/>
      </linearGradient>
      <linearGradient id="grd_${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2A3616"/><stop offset="1" stop-color="#141C09"/>
      </linearGradient>
      <radialGradient id="glow_${kind}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1440" height="620" fill="url(#sky_${kind})"/>
    <circle cx="1080" cy="180" r="150" fill="url(#glow_${kind})"/>
    <circle cx="1080" cy="180" r="46" fill="#FFF3D0" opacity=".9"/>`;

  const hills = `<path d="M0 400 L180 330 L340 392 L520 316 L700 388 L900 322 L1100 386 L1290 336 L1440 396 V620 H0Z" fill="#1F2B12" opacity=".45"/>`;
  const ground = `<path d="M0 470 H1440 V620 H0Z" fill="url(#grd_${kind})"/>`;

  const soldier = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#111A08">
      <ellipse cx="0" cy="-96" rx="15" ry="7"/><path d="M-11 -96h22v9a11 11 0 0 1-22 0Z"/>
      <path d="M-13 -84 h26 l7 46 h-40Z"/><rect x="-15" y="-38" width="30" height="10" rx="3"/>
      <path d="M-13 -28 h11 l2 30 h-12Z"/><path d="M2 -28 h11 l-1 30 h-12Z"/>
      <path d="M-19 -80 l-7 44 6 2 9-42Z"/><path d="M19 -80 l7 44-6 2-9-42Z"/>
      <rect x="20" y="-104" width="4" height="74" rx="2" transform="rotate(9 22 -60)"/>
    </g>`;

  const bodies = {
    parade: hills + ground +
      `<rect x="0" y="466" width="1440" height="6" fill="#C8A951" opacity=".55"/>` +
      [80,215,350,485,620,755,890,1025,1160,1295].map((x,i) => soldier(x, 470, .92 + (i%3)*0.04)).join('') +
      `<g transform="translate(700 120)"><rect x="-3" y="0" width="6" height="350" fill="#111A08"/>
        <path d="M3 8 h132 v34 H3Z" fill="#FF9933"/><path d="M3 42 h132 v34 H3Z" fill="#FDFDF8"/>
        <path d="M3 76 h132 v34 H3Z" fill="#046A38"/><circle cx="69" cy="59" r="11" fill="none" stroke="#123A73" stroke-width="3"/></g>`,

    centre: hills + ground +
      `<g fill="#1A2410">
        <path d="M120 470 V300 h250 v170Z"/><path d="M110 300 l135 -72 135 72Z"/>
        <path d="M1060 470 V320 h260 v150Z"/><path d="M1050 320 l140 -66 140 66Z"/>
        <path d="M470 470 V250 h500 v220Z"/><path d="M455 250 l265 -104 265 104Z"/>
        <rect x="690" y="60" width="60" height="30" rx="4"/><rect x="716" y="86" width="8" height="70"/>
      </g>
      <g fill="#C8A951" opacity=".85">
        ${[520,590,660,800,870,940].map(x=>`<rect x="${x}" y="330" width="34" height="52" rx="4"/>`).join('')}
        ${[160,220,280].map(x=>`<rect x="${x}" y="360" width="28" height="44" rx="4"/>`).join('')}
        ${[1100,1160,1220,1280].map(x=>`<rect x="${x}" y="372" width="26" height="42" rx="4"/>`).join('')}
      </g>
      <path d="M700 470 v-90 h40 v90Z" fill="#0D1406"/>`,

    college: hills + ground +
      `<g fill="#1A2410">
        <path d="M320 470 V260 h800 v210Z"/><path d="M300 260 l420 -120 420 120Z"/>
        <rect x="690" y="80" width="60" height="34" rx="4"/><rect x="716" y="110" width="8" height="42"/>
      </g>
      <g fill="#C8A951" opacity=".8">
        ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${360+i*95}" y="300" width="26" height="140" rx="6"/>`).join('')}
      </g>
      <path d="M690 470 v-80 h60 v80Z" fill="#0D1406"/>
      <g fill="#16210C">
        <ellipse cx="150" cy="404" rx="66" ry="76"/><rect x="142" y="400" width="16" height="76"/>
        <ellipse cx="1300" cy="396" rx="72" ry="82"/><rect x="1292" y="392" width="16" height="84"/>
      </g>`,

    welfare: hills + ground +
      `<g fill="#141C09">
        ${soldier(240, 470, 1.05)}
        <g transform="translate(430 470)">
          <circle cx="0" cy="-92" r="21"/><path d="M-17 -70 h34 l10 70h-54Z"/>
        </g>
        <g transform="translate(520 470)">
          <circle cx="0" cy="-66" r="16"/><path d="M-13 -50 h26 l8 50h-42Z"/>
        </g>
        <g transform="translate(596 470)">
          <circle cx="0" cy="-52" r="13"/><path d="M-11 -38 h22 l7 38h-36Z"/>
        </g>
      </g>
      <g transform="translate(1010 250)" opacity=".95">
        <path d="M0-70 L20-22 72-16 34 20 44 72 0 46-44 72-34 20-72-16-20-22Z" fill="#C8A951"/>
      </g>
      <path d="M860 470 c40-120 180-160 260-70" fill="none" stroke="#C8A951" stroke-width="4" opacity=".5" stroke-dasharray="10 12"/>`,

    fellowship: hills + ground +
      `<g fill="#141C09">
        <rect x="480" y="352" width="480" height="14" rx="7"/>
        <rect x="520" y="366" width="14" height="104"/><rect x="906" y="366" width="14" height="104"/>
        ${[430,560,690,820,950].map((x,i)=>`<g transform="translate(${x} 352)"><circle cx="0" cy="-56" r="19"/><path d="M-22 -34 h44 l9 34h-62Z"/></g>`).join('')}
      </g>
      <g fill="#C8A951" opacity=".9">
        ${[520,640,760,880].map(x=>`<g transform="translate(${x} 340)"><rect x="-5" y="-30" width="10" height="30" rx="3"/><path d="M-11-30 h22 l-11-16Z"/></g>`).join('')}
      </g>
      <g transform="translate(180 300)" opacity=".9">
        <circle r="60" fill="none" stroke="#C8A951" stroke-width="4"/>
        <text y="16" text-anchor="middle" font-size="52" fill="#C8A951" font-family="Georgia,serif">🐘</text>
      </g>`
  };

  return head + (bodies[kind] || ground) + '</svg>';
}

/* =========================================================
   INSIGNIA + MOTTO
   ========================================================= */

/* An <img> that silently falls back to inline art if the file is absent.
   The 'error' event does not bubble, so it is caught in the capture phase
   by the delegated listener in initCrest(). */
function imgSlot(src, alt, fallback, cls){
  return `<span class="imgslot ${cls || ''}">
    <img src="assets/img/${esc(src)}" alt="${esc(alt)}" loading="lazy">
    <span class="imgslot__fb" aria-hidden="true">${fallback}</span></span>`;
}

/* ---------------------------------------------------------
   Stylised renderings of the six historical badges, one per
   year, drawn to match the artwork supplied. These stand in
   until the real files are placed in assets/img/ (see README).
   --------------------------------------------------------- */
const GOLD = '#C8A951', GOLD_D = '#8E6A1F', MAROON = '#8E2B26', MAROON_D = '#5E1A16';

/* Imperial crown — band, arches, orb; used on the pre-1947 badges */
function crown(cx, cy, s){
  return `<g transform="translate(${cx} ${cy}) scale(${s})" stroke="${GOLD_D}" stroke-width="1.2">
    <path d="M-13 2 L-13 -8 l5 5 4-8 4 8 4-8 4 8 5-5 v10Z" fill="${GOLD}"/>
    <path d="M-13 2 h26 v5 h-26Z" fill="#9B2C22"/>
    <rect x="-14" y="6" width="28" height="4" rx="2" fill="${GOLD}"/>
    <circle cx="0" cy="-13" r="2.4" fill="${GOLD}"/>
  </g>`;
}

/* Lion Capital of Ashoka — used on the Republic badges */
function ashoka(cx, cy, s){
  return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="${GOLD_D}">
    <path d="M-9 0c0-5 4-8 9-8s9 3 9 8Z"/>
    <path d="M-6 -6c0-4 2-7 6-7s6 3 6 7Z"/>
    <circle cx="-5.5" cy="-7" r="3.4"/><circle cx="5.5" cy="-7" r="3.4"/><circle cx="0" cy="-9.5" r="3.6"/>
    <rect x="-10" y="0" width="20" height="3" rx="1.2"/>
    <rect x="-7" y="3" width="14" height="2.4" rx="1.2"/>
    <circle cx="0" cy="1.5" r="1.5" fill="${GOLD}"/>
  </g>`;
}

const INSIGNIA_ART = {

  /* 1855 — armorial achievement: crown, quartered shield, two supporters, scroll */
  '1855': `
    ${crown(50, 16, 1)}
    <g stroke="${GOLD_D}" stroke-width="1.2">
      <path d="M50 30c9 0 15 2 15 2v16c0 11-7 17-15 21-8-4-15-10-15-21V32s6-2 15-2Z" fill="#F2EFE6"/>
      <path d="M50 30c9 0 15 2 15 2v9H50Z" fill="#9B2C22"/>
      <path d="M35 41h15v12c0 5 0 8-0 8-8-4-15-10-15-21Z" fill="#9B2C22"/>
      <path d="M50 41h15v7c0 5-2 9-5 12h-10Z" fill="${GOLD}"/>
      <path d="M35 32c0-0 6-2 15-2v11H35Z" fill="${GOLD}"/>
    </g>
    <g fill="#CFCABA" stroke="${GOLD_D}" stroke-width="1.4">
      <path d="M30 34c-6 1-10 6-10 12 0 9 3 16 7 22l6-3c-3-6-6-12-6-19 0-4 1-8 5-9Z"/>
      <circle cx="24" cy="29" r="5.4"/>
      <path d="M70 34c6 1 10 6 10 12 0 9-3 16-7 22l-6-3c3-6 6-12 6-19 0-4-1-8-5-9Z"/>
      <circle cx="76" cy="29" r="5.4"/>
    </g>
    <path d="M16 84c14 9 54 9 68 0l-5 13c-11 6-47 6-58 0Z" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="1.2"/>
    <rect x="30" y="88" width="40" height="3" rx="1.5" fill="${GOLD_D}" opacity=".55"/>`,

  /* 1896 — gold oval plate, three roundels, banded field, red scroll */
  '1896': `
    <g stroke="${GOLD_D}" stroke-width="1.4">
      <path d="M50 16c17 0 27 6 27 6v30c0 18-12 29-27 36-15-7-27-18-27-36V22s10-6 27-6Z" fill="${GOLD}"/>
    </g>
    <g fill="#2B3F63" stroke="${GOLD_D}" stroke-width="1">
      <circle cx="36" cy="28" r="5"/><circle cx="50" cy="26" r="5"/><circle cx="64" cy="28" r="5"/>
    </g>
    <g stroke="${GOLD_D}" stroke-width="1.1" fill="none" opacity=".85">
      <path d="M28 42q11 -5 22 0t22 0"/><path d="M28 51q11 -5 22 0t22 0"/>
      <path d="M29 60q11 -5 21 0t21 0"/><path d="M31 69q10 -5 19 0t19 0"/>
    </g>
    <path d="M14 78c14 12 58 12 72 0l-6 15c-12 8-48 8-60 0Z" fill="#9B2C22" stroke="${GOLD_D}" stroke-width="1.2"/>
    <rect x="27" y="83" width="46" height="3.4" rx="1.7" fill="${GOLD}" opacity=".8"/>`,

  /* 1918 — dark ground, crown over a circular garter, pale scroll below */
  '1918': `
    <rect x="14" y="6" width="72" height="104" rx="6" fill="#1B1B1B"/>
    ${crown(50, 20, .82)}
    <circle cx="50" cy="57" r="23" fill="${MAROON}" stroke="${GOLD}" stroke-width="2.4"/>
    <circle cx="50" cy="57" r="17" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".8"/>
    <g fill="${GOLD}" opacity=".85">
      ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return `<circle cx="${(50 + Math.cos(a) * 20).toFixed(1)}" cy="${(57 + Math.sin(a) * 20).toFixed(1)}" r="1.5"/>`;
      }).join('')}
    </g>
    <path d="M50 46c6 0 10 1 10 1v10c0 7-4 11-10 13-6-2-10-6-10-13V47s4-1 10-1Z"
      fill="#F2EFE6" stroke="${GOLD_D}" stroke-width="1"/>
    <path d="M50 46c6 0 10 1 10 1v6H50Z" fill="#9B2C22"/>
    <path d="M40 53h10v17c-6-2-10-6-10-13Z" fill="#9B2C22"/>
    <path d="M18 82c14 10 50 10 64 0l-5 14c-11 7-43 7-54 0Z" fill="#F2EFE6" stroke="${GOLD_D}" stroke-width="1.2"/>
    <rect x="30" y="87" width="40" height="3.2" rx="1.6" fill="${MAROON}" opacity=".8"/>`,

  /* 1922 — gold throughout: crown, garter with scroll, banner beneath */
  '1922': `
    ${crown(50, 17, .95)}
    <ellipse cx="50" cy="56" rx="25" ry="26" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="1.6"/>
    <ellipse cx="50" cy="56" rx="18" ry="19" fill="#FBF3DC" stroke="${GOLD_D}" stroke-width="1.2"/>
    <g stroke="${GOLD_D}" stroke-width="1" fill="none" opacity=".7">
      <path d="M34 50q16 -6 32 0"/><path d="M33 58q17 -6 34 0"/><path d="M35 66q15 -6 30 0"/>
    </g>
    <path d="M25 48c-3 5-3 12 0 17M75 48c3 5 3 12 0 17" stroke="${GOLD_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M16 80c14 11 54 11 68 0l-5 14c-12 7-46 7-58 0Z" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="1.4"/>
    <rect x="29" y="85" width="42" height="3.2" rx="1.6" fill="${GOLD_D}" opacity=".6"/>`,

  /* 1954 — Ashoka capital over a broad maroon device, gold crescent scroll */
  '1954': `
    ${ashoka(50, 22, 1.15)}
    <defs><linearGradient id="ins1954" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${MAROON}"/><stop offset="1" stop-color="${MAROON_D}"/></linearGradient></defs>
    <path d="M50 32c16 0 26 5 26 5v20c0 16-11 26-26 32-15-6-26-16-26-32V37s10-5 26-5Z"
      fill="url(#ins1954)" stroke="${GOLD}" stroke-width="2.2"/>
    <g fill="${GOLD}" opacity=".92">
      <circle cx="40" cy="48" r="4.2"/><circle cx="50" cy="46" r="4.2"/><circle cx="60" cy="48" r="4.2"/>
      <rect x="35" y="58" width="30" height="3.6" rx="1.8"/>
      <rect x="38" y="66" width="24" height="3.6" rx="1.8"/>
      <rect x="41" y="74" width="18" height="3.6" rx="1.8"/>
    </g>
    <path d="M12 84c16 12 60 12 76 0l-7 14c-13 7-49 7-62 0Z" fill="${GOLD}" stroke="${GOLD_D}" stroke-width="1.4"/>`,

  /* 1989 — the present badge: slimmer device, crossed swords, motto scroll */
  '1989': `
    ${ashoka(50, 20, 1)}
    <defs><linearGradient id="ins1989" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${MAROON}"/><stop offset="1" stop-color="${MAROON_D}"/></linearGradient></defs>
    <g stroke="${GOLD}" stroke-width="3" stroke-linecap="round">
      <path d="M20 76 L80 36"/><path d="M80 76 L20 36"/>
    </g>
    <g fill="${GOLD}" stroke="${GOLD_D}" stroke-width=".8">
      <circle cx="19" cy="77" r="3.6"/><circle cx="81" cy="77" r="3.6"/>
      <path d="M76 32 l8 2 -2 8Z"/><path d="M24 32 l-8 2 2 8Z"/>
    </g>
    <path d="M50 30c13 0 21 4 21 4v18c0 14-9 23-21 28-12-5-21-14-21-28V34s8-4 21-4Z"
      fill="url(#ins1989)" stroke="${GOLD}" stroke-width="2.2"/>
    <g fill="${GOLD}" opacity=".92">
      <circle cx="42" cy="45" r="3.6"/><circle cx="50" cy="43" r="3.6"/><circle cx="58" cy="45" r="3.6"/>
      <rect x="38" y="55" width="24" height="3.2" rx="1.6"/>
      <rect x="41" y="63" width="18" height="3.2" rx="1.6"/>
    </g>
    <path d="M14 82c16 12 56 12 72 0l-6 14c-13 7-47 7-60 0Z" fill="#9B2C22" stroke="${GOLD_D}" stroke-width="1.4"/>
    <rect x="30" y="87" width="40" height="3.2" rx="1.6" fill="${GOLD}" opacity=".85"/>`
};

function insigniaArt(year){
  return `<svg viewBox="0 0 100 116" role="img" aria-label="Corps insignia of ${esc(year)}">
    ${INSIGNIA_ART[year] || ''}</svg>`;
}

/* The Corps motto, as a full-width band */
function mottoBand(){
  const m = DATA.motto;
  return `<section class="motto ribbon-top"><div class="wrap">
    <span class="motto__deva">${m.deva}</span>
    <h2 class="motto__roman">${m.roman}</h2>
    <span class="motto__gloss">${m.gloss} &mdash; the motto of the Army Ordnance Corps</span>
  </div></section>`;
}

/* Heritage: the badge through the years */
function insigniaSection(compact){
  return `<section class="section ${compact ? '' : 'section--tint'}"><div class="wrap">
    ${shead('Heritage', 'The Badge Through the Years',
      'The device worn by the Corps has changed with the century — the crown of the presidency and imperial armies giving way, after 1947, to the Lion Capital of Ashoka. The thread running through all of them is the same.', true)}

    <!-- Single-image lineage plate. Shown only if assets/img/insignia-strip.png exists.
         The crop trims the motto baked into the foot of the artwork, since the
         motto already appears in its own band. -->
    <figure class="insig-strip" hidden>
      <div class="insig-strip__crop">
        <img src="assets/img/${esc(STRIP_SRC)}" alt="The insignia of the Army Ordnance Corps, 1855 to 1989">
      </div>
      <figcaption>The badges of the Corps as borne through its history.</figcaption>
    </figure>

    <div class="insig">
      ${DATA.insignia.map(i => `
        <figure class="insig__i">
          <div class="insig__art">${imgSlot(i.img, 'Corps insignia of ' + i.y, insigniaArt(i.y))}</div>
          <figcaption>
            <b>${i.y}</b>
            <span class="insig__t">${i.t}</span>
            <span class="insig__d">${i.d}</span>
          </figcaption>
        </figure>`).join('')}
    </div>
    <p class="small muted center mt24">Descriptions are indicative and are being verified against Corps records. <b>[to be confirmed]</b></p>
  </div></section>`;
}

/* small decorative banner used at the top of inner pages / galleries */
function galleryStrip(){
  const shots = [
    ['parade','Corps Day parade, AOC Centre'],
    ['centre','The Centre gates'],
    ['college','MCMM — seat of learning'],
    ['fellowship','Regimental fellowship'],
    ['welfare','Veteran outreach']
  ];
  return `<div class="gal">${shots.map(([k, cap]) => `
    <figure class="gal__i">
      <div class="gal__art">${art(k)}</div>
      <figcaption>${esc(cap)}</figcaption>
    </figure>`).join('')}</div>`;
}

/* =========================================================
   NAVIGATION MODEL
   ========================================================= */
const NAV = [
  { label:'Home', route:'home' },
  { label:'Mother Unit', route:'unit' },
  { label:'MCMM', route:'mcmm', sub:[
      ['Overview — Military College of Materials Management','mcmm'],
      ['Corps Museum','museum'],
      ['University Cell','ucell'] ] },
  { label:'AOC Centre', route:'aoc', sub:[
      ['About the Centre','aoc'],
      ['History of the Corps','aochistory'] ] },
  { label:'Resources', route:'resources', sub:[
      ['All resources','resources'],
      ['Welfare Schemes','welfare'],
      ['Pension','pension'],
      ['Materials Management','mm'],
      ['Baat Cheet Magazine','baatcheet'] ] },
  { label:'Jobs', route:'jobs', sub:[
      ['Jobs &amp; Placement','jobs'],
      ['Distress Grant','welfare/distress'],
      ['ADLRS','welfare/adlrs'],
      ['AOC History','welfare/aochist'],
      ['Torch Bearers','welfare/torch'],
      ['Educational Scholarships','welfare/scholar'] ] },
  { label:'Institutes', route:'booking', sub:[
      ['Booking &amp; requisition','booking'],
      ['Podam Farm','booking/podam'],
      ['AOC Mess','booking/aocmess'],
      ['Centre Mess','booking/centremess'],
      ['AOC Band','booking/band'],
      ['Ordnance Club','booking/club'],
      ['Tuskers Institute','booking/tuskers'] ] },
  { label:'Our Heroes', route:'heroes', sub:[
      ['Know Your Heroes','heroes'],
      ['Gallantry Awards','gallantry'],
      ['Battle Casualties (B Cas)','bcas'],
      ['Obituary','obituary'] ] },
  { label:'Links', route:'links' },
  { label:'More', route:'more', sub:[
      ['Latest Updates','updates'],
      ['Search Documents (PDF)','pdf'],
      ['Share Your Thoughts / Blog','blog'],
      ['Register a Grievance','grievance'],
      ['Contact Us','contact'] ] }
];

function buildNav(){
  $('#navList').innerHTML = NAV.map(n => {
    const sub = n.sub ? `<ul class="nav__sub">${n.sub.map(([t, r]) =>
      `<li><a href="#/${r}">${t}</a></li>`).join('')}</ul>` : '';
    return `<li class="nav__item" data-nav="${n.route}${n.sub ? ' ' + n.sub.map(s => s[1].split('/')[0]).join(' ') : ''}">
      <a class="nav__link" href="#/${n.sub ? n.sub[0][1] : n.route}">${n.label}${n.sub ? '<span class="caret">▼</span>' : ''}</a>${sub}</li>`;
  }).join('');

  $('#footLinks').innerHTML = DATA.links.slice(0, 6).map(l =>
    `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${l.code} — ${l.name}</a></li>`).join('');
}
/* Highlight at most one nav group: a route may appear under two groups
   (e.g. welfare/* is listed under both Resources and Jobs) — first wins. */
function markActive(route){
  let done = false;
  $$('.nav__item').forEach(li => {
    const hit = !done && li.dataset.nav.split(' ').includes(route);
    if (hit) done = true;
    li.classList.toggle('is-active', hit);
  });
}

/* =========================================================
   SHARED VIEW PARTS
   ========================================================= */
function head(eyebrow, title, lede){
  return `<section class="pagehead ribbon-top"><div class="wrap">
    <span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${lede}</p></div></section>`;
}
function crumb(items){
  return `<nav class="crumb" aria-label="Breadcrumb"><div class="wrap">
    <a href="#/home">Home</a>${items.map(i => `<span>›</span>${i}`).join('')}</div></nav>`;
}
function shead(eyebrow, title, lede, center){
  return `<div class="shead ${center ? 'shead--center' : ''}">
    ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
    <h2 class="ruled">${title}</h2>${lede ? `<p>${lede}</p>` : ''}</div>`;
}
function accordion(items, openId){
  return `<div class="acc">${items.map(it => `
    <div class="acc__i ${it.id === openId ? 'is-open' : ''}" id="${it.id ? 'sec-' + it.id : ''}">
      <button class="acc__h" type="button">${it.q || it.title}</button>
      <div class="acc__b"><div>${it.a || it.body}</div></div>
    </div>`).join('')}</div>`;
}

/* =========================================================
   VIEWS
   ========================================================= */
const V = {};

/* ---------------- HOME ---------------- */
V.home = () => `
  <h1 class="sr">Tuskers Veterans Portal — Army Ordnance Corps</h1>
  <section class="hero" aria-roledescription="carousel" aria-label="Highlights">
    <div class="hero__track" id="heroTrack">
      ${DATA.slides.map((s, i) => `
        <div class="slide ${i === 0 ? 'is-on' : ''}" role="group" aria-label="${i+1} of ${DATA.slides.length}">
          ${art(s.art)}
          <div class="slide__cap"><div class="wrap">
            <span class="slide__kicker">${s.kicker}</span>
            <h2>${s.title}</h2><p>${s.text}</p>
          </div></div>
        </div>`).join('')}
    </div>
    <button class="hero__arrow hero__arrow--l" id="heroPrev" aria-label="Previous slide">‹</button>
    <button class="hero__arrow hero__arrow--r" id="heroNext" aria-label="Next slide">›</button>
    <div class="hero__dots" id="heroDots">
      ${DATA.slides.map((s, i) => `<button class="${i===0?'is-on':''}" aria-label="Slide ${i+1}"></button>`).join('')}
    </div>
  </section>

  <div class="ticker"><div class="wrap ticker__in">
    <span class="ticker__tag">Latest</span>
    <div class="ticker__scroll"><div class="ticker__row">
      ${[0,1].map(() => DATA.ticker.map(t =>
        `<a href="${t.href}">◆ ${t.text}</a>`).join('')).join('')}
    </div></div>
  </div></div>

  <section class="section">
    <div class="wrap">
      <div class="grid g4">
        ${[['🎖️','Gallantry &amp; sacrifice','Know Your Heroes','#/heroes'],
           ['🤝','Welfare &amp; distress grants','Welfare Schemes','#/welfare'],
           ['💼','Second career support','Jobs &amp; Placement','#/jobs'],
           ['🏛️','Messes, farm &amp; institutes','Institute Booking','#/booking']]
          .map(([i, t, l, h]) => `
          <a class="card card--link" href="${h}">
            <div class="card__ico">${i}</div>
            <h3>${l}</h3><p class="muted small">${t}</p>
          </a>`).join('')}
      </div>
    </div>
  </section>

  ${mottoBand()}

  ${insigniaSection(true)}

  <!-- DGOS MESSAGE -->
  <section class="section section--tint">
    <div class="wrap">
      ${shead('From the Directorate', 'Message from the Director General Ordnance Services',
        'A word to every Tusker, serving and retired, and to the families who serve alongside them.')}
      <div class="dgos">
        <figure class="dgos__photo">
          <div class="dgos__portrait">
            ${imgSlot('dgos.png', 'Lt Gen ' + DATA.dgos.name + ', Director General Ordnance Services',
              `<div class="dgos__ph">★</div>`)}
          </div>
          <figcaption>
            <b>${DATA.dgos.rank} ${DATA.dgos.name}</b>
            <span>${DATA.dgos.appt}</span>
            <span class="muted small">${DATA.dgos.org}</span>
          </figcaption>
        </figure>
        <div class="dgos__body">
          <blockquote>“The Corps has never fought for the headline. We have fought to make sure that when the headline is written, the soldier in it had what he needed.”</blockquote>
          <p>My dear Tuskers,</p>
          <p>It is my privilege to reach out to the extended family of the Army Ordnance Corps through this portal. Between our depots, our field units and our institutions, this Corps has quietly carried the Indian Army’s logistic burden for over two centuries. Every round fired, every vehicle moved and every soldier clothed carries, somewhere behind it, the work of a Tusker.</p>
          <div class="dgos__more" id="dgosMore">
            <p>Retirement changes a Tusker’s address, never his affiliation. This portal has been created so that the distance between a veteran and his Corps is no more than a click. Here you will find our welfare schemes, guidance on pension and entitlement, placement support through our partners, access to our institutes and messes, and a channel to register a grievance and have it followed up by name.</p>
            <p>I would especially ask our veer naris and the families of our departed comrades to make use of this facility. The Veteran Cell at the Centre exists for you, and it will come to you if you cannot come to it. Where our records are incomplete — and in places on this portal they still are — I ask our veterans to help us complete them, so that our history and our honours are recorded as they deserve to be.</p>
            <p>To those still in uniform: the standard you keep today is the inheritance of those who wore the cap badge before you. To those who have hung it up: you remain, in every sense that matters, on our strength.</p>
          </div>
          <button class="btn btn--ghost btn--sm mt24" id="dgosBtn" aria-expanded="false">Read more ↓</button>
          <p class="sig">${DATA.dgos.rank} ${DATA.dgos.name}<br><span class="muted small" style="font-style:normal">${DATA.dgos.appt} &amp; ${DATA.dgos.sub}</span></p>
        </div>
      </div>
    </div>
  </section>

  <!-- PHOTO SCROLL -->
  <section class="section">
    <div class="wrap">
      ${shead('Photo gallery', 'The Corps in Frame', 'Scroll through moments from the Centre, the college and the fraternity. Drag, swipe or use the arrows.')}
    </div>
    <div class="wrap">${galleryStrip()}</div>
  </section>

  <!-- UPDATES + STATS -->
  <section class="section section--tint">
    <div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Notice board', 'Latest Updates', 'Programmes, regimental events and notifications for the fraternity.')}
          <div class="grid" style="gap:14px">
            ${DATA.updates.slice(0, 4).map(u => updCard(u)).join('')}
          </div>
          <p class="mt24"><a class="btn btn--ghost btn--sm" href="#/updates">View all updates →</a></p>
        </div>
        <aside class="sticky">
          <div class="card card--accent">
            <h3>Veteran Cell</h3>
            <p class="small muted">AOC Centre, Secunderabad &mdash; 500 015</p>
            <p class="small"><b>Helpline:</b> 1800-XXX-XXXX<br><b>Email:</b> veterancell[at]aoc[dot]mil</p>
            <p class="small muted">Mon–Fri, 0900–1700 h</p>
            <a class="btn btn--green btn--sm btn--wide" href="#/contact">Contact the cell</a>
          </div>
          <div class="card mt24">
            <h3>Quick services</h3>
            <ul class="tick small">
              <li><a href="#/grievance">Register a grievance</a></li>
              <li><a href="#/pdf">Download a form</a></li>
              <li><a href="#/booking">Book an institute</a></li>
              <li><a href="#/pension">Pension &amp; entitlement</a></li>
              <li><a href="#/welfare/scholar">Apply for a scholarship</a></li>
            </ul>
          </div>
          <div class="grid g2 mt24">
            <div class="stat"><b>250+</b><span>Years of service</span></div>
            <div class="stat"><b>1 Lakh+</b><span>Veterans on roll*</span></div>
          </div>
          <p class="small muted mt24">*Indicative. [to be confirmed]</p>
        </aside>
      </div>
    </div>
  </section>

  <!-- LINKS STRIP -->
  <section class="section">
    <div class="wrap">
      ${shead('External resources', 'Useful Links', 'Official portals most used by veterans and their families.', true)}
      <div class="tiles">
        ${DATA.links.map(l => `
          <a class="tile" href="${esc(l.url)}" target="_blank" rel="noopener">
            <b>${esc(l.code)}</b><span>${l.name}</span><em>Visit ↗</em></a>`).join('')}
      </div>
    </div>
  </section>`;

function updCard(u){
  const chip = { new:'chip--new', evt:'chip--evt', not:'chip--not' }[u.tag] || 'chip--not';
  return `<article class="upd">
    <div class="upd__date"><b>${u.d}</b><span>${u.m} ${u.y}</span></div>
    <div class="upd__b"><span class="chip ${chip}">${u.type}</span>
      <h4>${u.title}</h4><p>${u.text}</p></div>
  </article>`;
}

/* ---------------- UPDATES ---------------- */
V.updates = () => head('Notice board', 'Latest Updates', 'Programmes, events, competitions and meetings across the Corps.')
  + crumb(['Latest Updates'])
  + `<section class="section"><div class="wrap">
      <div class="grid" style="gap:16px">${DATA.updates.map(updCard).join('')}</div>
      <div class="notice mt32"><b>Nominations and invitations:</b> serving personnel apply through their parent formation; veterans may write directly to the Veteran Cell, AOC Centre, or use the <a href="#/contact">contact form</a>. Dates marked here are indicative and are confirmed by formal invitation. <b>[to be confirmed]</b></div>
    </div></section>`;

/* ---------------- MOTHER UNIT ---------------- */
V.unit = () => head('Section 2', 'Mother Unit Details',
  'Your mother unit is the thread that ties you to the Corps. Search the directory, record your affiliation, and reconnect with those you served alongside.')
  + crumb(['Mother Unit'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Directory', 'Units, Depots &amp; Establishments', 'Search by name, station or type.')}
          <div class="filters">
            <input type="search" id="unitQ" placeholder="Search units, depots, stations…" aria-label="Search units">
            <select id="unitT" aria-label="Filter by type"><option value="">All types</option></select>
          </div>
          <div class="tbl-wrap"><table>
            <thead><tr><th>Unit / establishment</th><th>Type</th><th>Station</th></tr></thead>
            <tbody id="unitBody"></tbody>
          </table></div>
          <p class="small muted mt24">This directory is indicative and is being completed with the assistance of veterans. Corrections may be sent to the Veteran Cell. <b>[to be confirmed]</b></p>
        </div>
        <aside>
          <div class="card card--accent">
            <h3>Record your mother unit</h3>
            <p class="small muted">Help us build the Tuskers roll. Your entry is held with the Veteran Cell and used for reunions and unit-wise outreach.</p>
            <form id="unitForm">
              <div class="field"><label for="mu_ic">IC / Army number</label><input id="mu_ic" required></div>
              <div class="field"><label for="mu_unit">Mother unit</label><input id="mu_unit" list="unitList" required></div>
              <div class="field"><label for="mu_from">Served from</label><input id="mu_from" type="month"></div>
              <div class="field"><label for="mu_to">Served to</label><input id="mu_to" type="month"></div>
              <button class="btn btn--green btn--wide" type="submit">Submit affiliation</button>
            </form>
          </div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- MCMM ---------------- */
V.mcmm = () => head('Section 3', 'Military College of Materials Management',
  'The Corps’ premier institution for materials, inventory and logistics management — training the Army’s logisticians and awarding recognised academic qualifications.')
  + crumb(['MCMM'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('The college', 'A Seat of Logistic Learning', '')}
          <p>The Military College of Materials Management is the Category ‘A’ training establishment of the Army Ordnance Corps. It trains officers, JCOs and other ranks of the three Services, defence civilians and officers of friendly foreign countries in materials management, inventory control, procurement, warehousing, codification and supply chain management.</p>
          <p>Beyond its military curriculum, the college functions as a recognised academic institution, offering post-graduate and diploma qualifications in materials and logistics management through its University Cell, and houses the Corps Museum — the custodian of the Corps’ material heritage.</p>
          <div class="grid g3 mt32">
            <a class="card card--link" href="#/museum"><div class="card__ico">🏛️</div><h3>Corps Museum</h3><p class="small muted">Arms, equipment, records and regalia tracing the story of ordnance in India.</p></a>
            <a class="card card--link" href="#/ucell"><div class="card__ico">🎓</div><h3>University Cell</h3><p class="small muted">Academic accreditation, PG and diploma programmes, research and convocation.</p></a>
            <a class="card card--link" href="#/mm"><div class="card__ico">📦</div><h3>Materials Management</h3><p class="small muted">The professional discipline at the heart of the Corps.</p></a>
          </div>
          <h3 class="mt32">Courses conducted</h3>
          <div class="tbl-wrap"><table>
            <thead><tr><th>Course</th><th>For</th><th>Broad content</th></tr></thead>
            <tbody>
              <tr><td>Materials Management (Long)</td><td>Officers</td><td>Provisioning, procurement, inventory control, warehousing, codification</td></tr>
              <tr><td>Materials Management (Short)</td><td>Officers, tri-service</td><td>Logistics fundamentals and supply chain overview</td></tr>
              <tr><td>Ammunition Management</td><td>Officers &amp; JCOs</td><td>Storage, surveillance, accounting and safety of ammunition</td></tr>
              <tr><td>Inventory Systems &amp; IT</td><td>All ranks</td><td>Computerised inventory suites, data integrity, MIS</td></tr>
              <tr><td>Revision Programme</td><td>Veterans &amp; serving</td><td>Refresher on revised policy and current procedures</td></tr>
            </tbody></table></div>
          <p class="small muted mt24">Course nomenclature and content are indicative. <b>[to be confirmed against the current training directive]</b></p>
        </div>
        <aside class="sticky">
          <div class="card">
            <h3>At a glance</h3>
            <dl class="dl">
              <div><dt>Category</dt><dd>Category ‘A’ training establishment</dd></div>
              <div><dt>Parent Corps</dt><dd>Army Ordnance Corps</dd></div>
              <div><dt>Trains</dt><dd>Tri-service, civilians &amp; FF countries</dd></div>
              <div><dt>Houses</dt><dd>Corps Museum, University Cell</dd></div>
            </dl>
          </div>
          <div class="card mt24"><h3>Visiting</h3>
            <p class="small">Veterans wishing to visit the college or the museum should intimate the college in advance through the Veteran Cell.</p>
            <a class="btn btn--ghost btn--sm btn--wide" href="#/contact">Request a visit</a></div>
        </aside>
      </div>
    </div></section>`;

V.museum = () => head('MCMM', 'The Corps Museum',
  'The material memory of the Army Ordnance Corps — from the Board of Ordnance at Fort William to the modern computerised depot.')
  + crumb(['<a href="#/mcmm">MCMM</a>', 'Corps Museum'])
  + `<section class="section"><div class="wrap">
      ${shead('Collections', 'What the Museum Holds', 'The galleries trace the evolution of ordnance support to the Indian Army across two and a half centuries.')}
      <div class="grid g3">
        ${[['⚔️','Arms &amp; equipment','Small arms, ordnance and equipment held and issued by the Corps through successive eras, including obsolete patterns preserved for record.'],
           ['📜','Documents &amp; records','Ledgers, indents, provisioning records and orders that show how the Army was supplied in each period.'],
           ['🎖️','Honours &amp; regalia','Medals, badges of rank, cap badges, colours and trophies including the Corps’ competition silver.'],
           ['🚚','Transport &amp; handling','Materials-handling equipment, packaging and transport exhibits from depot and field service.'],
           ['🖼️','Campaign galleries','Ordnance support in the World Wars, 1947–48, 1962, 1965, 1971, Siachen and Kargil.'],
           ['🐘','The Tusker story','The origin of the elephant emblem, the Corps’ motto and its regimental traditions.']]
          .map(([i,t,d]) => `<div class="card"><div class="card__ico">${i}</div><h3>${t}</h3><p class="small">${d}</p></div>`).join('')}
      </div>
      <div class="mt32">${galleryStrip()}</div>
      <div class="grid g2 mt32">
        <div class="card"><h3>Visitor information</h3>
          <dl class="dl">
            <div><dt>Location</dt><dd>Within the MCMM campus</dd></div>
            <div><dt>Open</dt><dd>Working days, by prior intimation <b>[timings to be confirmed]</b></dd></div>
            <div><dt>Entry</dt><dd>Free for veterans, families and school groups</dd></div>
            <div><dt>Photography</dt><dd>Permitted in designated galleries only</dd></div>
          </dl></div>
        <div class="card card--accent"><h3>Donate to the collection</h3>
          <p class="small">Veterans holding photographs, documents, uniforms, trophies or equipment of Corps interest are encouraged to donate or lend them. Each item is catalogued and credited to the donor.</p>
          <a class="btn btn--green btn--sm" href="#/contact">Offer an exhibit</a></div>
      </div>
    </div></section>`
  + insigniaSection();

V.ucell = () => head('MCMM', 'University Cell',
  'Academic accreditation of military training — converting professional military qualifications into recognised civil credentials.')
  + crumb(['<a href="#/mcmm">MCMM</a>', 'University Cell'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Purpose', 'Why the Cell Exists', '')}
          <p>The University Cell is the academic interface of the Military College of Materials Management. It links the college’s professional courses to a recognised university, so that the training an officer or JCO undergoes in uniform is also credited towards a civil qualification. For a veteran, that credential is often the difference between a résumé that lists courses and one that lists degrees.</p>
          <h3 class="mt32">Functions</h3>
          <ul class="tick">
            <li>Registration of course students with the affiliating university</li>
            <li>Conduct of university examinations and internal assessment</li>
            <li>Award of post-graduate degrees and diplomas in materials / logistics management</li>
            <li>Issue and re-issue of mark sheets, transcripts and degree certificates</li>
            <li>Verification of credentials for employers, universities and placement agencies</li>
            <li>Guidance on research and dissertation work</li>
          </ul>
          <h3 class="mt32">For veterans</h3>
          <p>Veterans who completed accredited courses at the college and require a duplicate certificate, transcript or credential verification for employment or higher study should apply to the University Cell through the Veteran Cell, quoting IC/Army number, course name and year.</p>
          <div class="notice mt24"><b>Documents to enclose:</b> course completion certificate or course report extract, service particulars, identity proof, and the prescribed fee. Processing time and fee <b>[to be confirmed]</b>.</div>
          <p class="mt24"><a class="btn btn--green" href="#/contact">Request a transcript / verification</a></p>
        </div>
        <aside class="sticky">
          <div class="card"><h3>Typical credentials</h3>
            <ul class="tick small">
              <li>PG Diploma in Materials Management</li>
              <li>MBA / M.Sc equivalent in Materials &amp; Logistics Management</li>
              <li>Certificate courses in inventory and supply chain</li>
            </ul>
            <p class="small muted">Exact nomenclature depends on the affiliating university and the year of the course. <b>[to be confirmed]</b></p>
          </div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- AOC CENTRE ---------------- */
V.aoc = () => head('Section 4', 'AOC Centre',
  'The regimental home of every Tusker — where the Corps trains its soldiers, keeps its records, and looks after its own.')
  + crumb(['AOC Centre'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('The Centre', 'Home of the Corps', '')}
          <p>The AOC Centre at Secunderabad is the training centre and regimental home of the Army Ordnance Corps. It receives, trains and turns out the recruits of the Corps; it maintains the Corps’ records and traditions; and through its Veteran Cell it remains the point of contact for every Tusker long after retirement.</p>
          <p>The Centre’s campus houses training wings, the Corps’ messes and institutes, sports and recreational facilities, and the welfare organisation that administers the Corps’ schemes for veterans, veer naris and dependants.</p>
          <div class="grid g3 mt32">
            ${[['🎯','Training','Basic and advanced training of recruits and trade training of the Corps.'],
               ['🗂️','Records','AOC Records — service documents, discharge papers and pension claims.'],
               ['🤝','Veteran Cell','Welfare, grievance redressal, outreach and reunions.']]
              .map(([i,t,d]) => `<div class="card"><div class="card__ico">${i}</div><h3>${t}</h3><p class="small">${d}</p></div>`).join('')}
          </div>
          <h3 class="mt32">Facilities open to veterans</h3>
          <ul class="tick">
            <li>Officers’ Mess and Centre Mess — transit accommodation, dining and functions</li>
            <li>Ordnance Club — sports, recreation and family facilities</li>
            <li>Podam Farm — open-air venue for large gatherings</li>
            <li>Tuskers Institute — auditorium, seminar and conference facilities</li>
            <li>AOC Band — for regimental and family occasions</li>
            <li>Medical support and ECHS polyclinic linkage</li>
          </ul>
          <p class="mt24"><a class="btn btn--gold" href="#/booking">Book a Centre facility →</a></p>
          <div class="mt32">${galleryStrip()}</div>
        </div>
        <aside class="sticky">
          <div class="card card--accent">
            <h3>Reach the Centre</h3>
            <p class="small">AOC Centre, Secunderabad — 500 015, Telangana</p>
            <dl class="dl">
              <div><dt>Veteran Cell</dt><dd>1800-XXX-XXXX</dd></div>
              <div><dt>Records</dt><dd>AOC Records, Secunderabad</dd></div>
              <div><dt>Hours</dt><dd>Mon–Fri, 0900–1700 h</dd></div>
            </dl>
            <a class="btn btn--green btn--sm btn--wide" href="#/contact">Contact us</a>
          </div>
          <div class="card mt24"><h3>Read next</h3>
            <ul class="tick small">
              <li><a href="#/aochistory">History of the Corps</a></li>
              <li><a href="#/heroes">Know your heroes</a></li>
              <li><a href="#/booking">Institute booking</a></li>
            </ul></div>
        </aside>
      </div>
    </div></section>`
  + mottoBand();

V.aochistory = () => head('AOC Centre', 'History of the Army Ordnance Corps',
  'From the Board of Ordnance at Fort William in 1775 to a modern, computerised logistic Corps.')
  + crumb(['<a href="#/aoc">AOC Centre</a>', 'History'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Timeline', 'Two and a Half Centuries of Ordnance Support', '')}
          <div class="tl">${DATA.history.map(h =>
            `<div class="tl__i"><span class="tl__y">${h.y}</span><p>${h.t}</p></div>`).join('')}</div>
          <div class="notice mt24">Dates and milestones on this page are indicative and are being verified against the published Corps history and Directorate records. <b>[to be confirmed]</b></div>
        </div>
        <aside class="sticky">
          <div class="card"><h3>The Tusker emblem</h3>
            <p class="small">The elephant — the beast of burden that moved the guns and stores of Indian armies for centuries — gives the Corps both its emblem and its name. It stands for strength held in reserve, patience under load, and memory that does not fail.</p>
          </div>
          <div class="card mt24"><h3>Read the history</h3>
            <p class="small muted">Published volumes and monographs are held at the Corps Museum and MCMM library.</p>
            <a class="btn btn--ghost btn--sm btn--wide" href="#/pdf">Search the library</a>
            <a class="btn btn--ghost btn--sm btn--wide mt24" href="#/museum">Visit the museum</a>
          </div>
        </aside>
      </div>
      <div class="mt32">${galleryStrip()}</div>
    </div></section>`
  + insigniaSection()
  + mottoBand();

/* ---------------- RESOURCES ---------------- */
V.resources = () => head('Section 5', 'Resources',
  'Everything a Tusker and his family may need in one place — welfare, pension, professional material and the Corps’ own magazine.')
  + crumb(['Resources'])
  + `<section class="section"><div class="wrap">
      <div class="grid g2">
        ${[['🤝','Welfare Schemes','Distress grants, ADLRS, AOC history publications, Torch Bearers and educational scholarships.','#/welfare'],
           ['💰','Pension','Civilian pension, entitlement categories, life certificate and grievance escalation.','#/pension'],
           ['📦','Materials Management','The professional core of the Corps — provisioning, inventory, warehousing and codification.','#/mm'],
           ['📖','Baat Cheet Magazine','The Corps’ house magazine — issues, archives and contributions from the fraternity.','#/baatcheet']]
          .map(([i,t,d,h]) => `<a class="card card--link" href="${h}">
            <div class="card__ico">${i}</div><h3>${t}</h3><p>${d}</p>
            <p class="mb0"><em class="small" style="color:var(--gold-d);font-weight:700">Open →</em></p></a>`).join('')}
      </div>
      <div class="grid g3 mt32">
        <a class="card card--link" href="#/pdf"><div class="card__ico">🔍</div><h3>Document search</h3><p class="small">Find forms, policy digests and back issues.</p></a>
        <a class="card card--link" href="#/links"><div class="card__ico">🔗</div><h3>External portals</h3><p class="small">CSD, ECHS, KSB, DGR, AWPO and more.</p></a>
        <a class="card card--link" href="#/grievance"><div class="card__ico">📝</div><h3>Grievance</h3><p class="small">Register and track a grievance with the Veteran Cell.</p></a>
      </div>
    </div></section>`;

V.welfare = (id) => head('Resources', 'Welfare Schemes',
  'The Corps looks after its own. These are the schemes administered for Tuskers, veer naris and dependants.')
  + crumb(['<a href="#/resources">Resources</a>', 'Welfare Schemes'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Schemes', 'What You Can Apply For', 'Select a scheme to see eligibility, documents and how to apply.')}
          ${accordion(DATA.welfare.map(w => ({
            id: w.id,
            title: `<span style="color:var(--gold-d);margin-right:9px">${w.icon}</span>${w.title} <span class="muted small" style="font-weight:400">— ${w.lede}</span>`,
            body: w.body
          })), id || 'distress')}
        </div>
        <aside class="sticky">
          <div class="card card--accent"><h3>How to apply</h3>
            <ul class="tick small">
              <li>Download the proforma from the <a href="#/pdf">document library</a></li>
              <li>Have it countersigned by the nearest ZSB / RSB where required</li>
              <li>Submit to the Veteran Cell, AOC Centre, by post or email</li>
              <li>Track the case by quoting the acknowledgement number</li>
            </ul>
            <a class="btn btn--green btn--sm btn--wide" href="#/grievance">Raise a query</a>
          </div>
          <div class="card mt24"><h3>Also see</h3>
            <ul class="tick small">
              <li><a href="#/pension">Pension &amp; entitlements</a></li>
              <li><a href="#/jobs">Jobs &amp; placement</a></li>
              <li><a href="https://ksb.gov.in" target="_blank" rel="noopener">KSB welfare grants ↗</a></li>
            </ul></div>
        </aside>
      </div>
    </div></section>`;

V.pension = () => head('Resources', 'Pension',
  'Guidance on defence civilian pension and on the entitlement categories that apply to veterans of the Corps and their families.')
  + crumb(['<a href="#/resources">Resources</a>', 'Pension'])
  + `<section class="section"><div class="wrap">
      ${shead('Civilians', 'Defence Civilian Pension', 'For civilian employees of ordnance depots, workshops and establishments, and their family pensioners.')}
      ${accordion(DATA.pension.civil)}
      <div class="mt32">${shead('Entitlement', 'Pension Entitlement Categories', 'The principal categories of pension applicable to service personnel and their families.')}</div>
      ${accordion(DATA.pension.entitlement)}
      <div class="grid g2 mt32">
        <div class="card"><h3>Who to approach</h3>
          <dl class="dl">${DATA.pension.contacts.map(c =>
            `<div><dt>${c.name}</dt><dd>${c.detail}</dd></div>`).join('')}</dl></div>
        <div class="card card--accent"><h3>Before you write in</h3>
          <ul class="tick small">
            <li>Keep your PPO / e-PPO and Corrigendum PPO numbers ready</li>
            <li>Check the pension credited against the OROP table for your rank and service</li>
            <li>Confirm the life certificate for the current year has been accepted</li>
            <li>Ensure your bank account is Aadhaar-seeded and active</li>
          </ul>
          <a class="btn btn--green btn--sm" href="#/grievance">Register a pension grievance</a></div>
      </div>
      <div class="notice mt32">This page is guidance only. Entitlement in an individual case is governed by the rules and government letters in force and by the sanction of the competent authority. <b>[rates and thresholds to be confirmed]</b></div>
    </div></section>`;

V.mm = () => head('Resources', 'Materials Management',
  'The professional discipline of the Corps — the science of having the right item, in the right quantity, at the right place, at the right time.')
  + crumb(['<a href="#/resources">Resources</a>', 'Materials Management'])
  + `<section class="section"><div class="wrap">
      <div class="grid g3">
        ${[['📋','Provisioning','Forecasting demand, fixing scales and levels, and raising indents so that stocks match the operational requirement.'],
           ['🛒','Procurement','Local and central purchase, contracting, quality assurance and receipt of stores into the ordnance system.'],
           ['🏬','Warehousing','Storage principles, binning, preservation, stock verification and depot layout for rapid issue.'],
           ['🔢','Codification','Cataloguing and codification of items so that every store carries one unambiguous identity across the Services.'],
           ['📊','Inventory control','Levels, ordering policy, ABC/VED and FSN analysis, and the computerised inventory management suites in use.'],
           ['♻️','Disposal','Survey, condemnation, salvage and disposal of surplus, obsolete and unserviceable stores.']]
          .map(([i,t,d]) => `<div class="card"><div class="card__ico">${i}</div><h3>${t}</h3><p class="small">${d}</p></div>`).join('')}
      </div>
      <div class="grid g-side mt32">
        <div>
          ${shead('For veterans', 'Carrying the Trade into Civil Life', '')}
          <p>Materials management is the single most transferable skill the Corps gives its people. A depot officer who has managed a live inventory of lakhs of line items, under audit, against an operational clock, has done in uniform what industry pays a premium for outside it.</p>
          <ul class="tick">
            <li>Warehouse and distribution centre management</li>
            <li>Supply chain planning and demand forecasting</li>
            <li>Procurement, vendor management and contract administration</li>
            <li>Inventory audit, stock accuracy and loss prevention</li>
            <li>Safety and hazardous-goods handling (ammunition background)</li>
          </ul>
          <p><a class="btn btn--gold" href="#/jobs">See placement opportunities →</a></p>
        </div>
        <aside>
          <div class="card card--accent"><h3>Study material</h3>
            <ul class="tick small">
              <li><a href="#/pdf">Provisioning policy digest</a></li>
              <li><a href="#/pdf">Inventory management &amp; codification handbook</a></li>
              <li><a href="#/mcmm">MCMM courses and the Revision Programme</a></li>
            </ul></div>
        </aside>
      </div>
    </div></section>`;

V.baatcheet = () => head('Resources', 'Baat Cheet',
  'The house magazine of the Army Ordnance Corps — the conversation the Corps has been having with itself, in print, for decades.')
  + crumb(['<a href="#/resources">Resources</a>', 'Baat Cheet'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('The magazine', 'A Corps in Its Own Words', '')}
          <p><i>Baat Cheet</i> carries professional articles, unit news, veteran reminiscences, obituaries, honours and awards, sporting achievements and the family news of the Corps. It is the single publication that reaches serving and retired Tuskers alike.</p>
          <h3 class="mt32">Contribute</h3>
          <p>Contributions are invited from veterans, serving personnel and families. The editorial board welcomes:</p>
          <ul class="tick">
            <li>Professional articles on logistics, materials management and defence supply chains</li>
            <li>Reminiscences of service — operations, stations, characters and lessons</li>
            <li>Veteran achievements for the Torch Bearers column</li>
            <li>Obituaries and tributes to departed comrades</li>
            <li>Photographs of Corps interest, with captions and credits</li>
          </ul>
          <div class="notice mt24"><b>Submission:</b> typed matter in a common word-processing format, with photographs separately at the highest available resolution, to the editor through the Veteran Cell. Contributions are edited for length and house style. <b>[editorial address to be confirmed]</b></div>
          <p class="mt24"><a class="btn btn--green" href="#/blog">Or share your thoughts on the portal →</a></p>
        </div>
        <aside class="sticky">
          <div class="card"><h3>Recent issues</h3>
            ${DATA.pdfs.filter(p => p.c === 'Magazine').map(p => `
              <div class="pdfrow mt24" style="box-shadow:none;border-color:var(--line)">
                <div class="pdfrow__ico">PDF</div>
                <div class="pdfrow__b"><b>${p.t}</b><span>${p.y} · ${p.s}</span></div>
              </div>`).join('')}
            <a class="btn btn--ghost btn--sm btn--wide mt24" href="#/pdf">All back issues</a>
          </div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- JOBS ---------------- */
V.jobs = () => head('Section 6', 'Jobs &amp; Placement',
  'Second-career opportunities for Tuskers, and the welfare schemes that support veterans in transition.')
  + crumb(['Jobs &amp; Placement'])
  + `<section class="section"><div class="wrap">
      ${shead('Openings', 'Current Opportunities', 'Indicative openings circulated to the Veteran Cell by employers and placement partners.')}
      <div class="grid g2">
        ${DATA.jobs.map(j => `
          <div class="card card--link">
            <span class="card__tag">${j.tag}</span>
            <h3>${j.role}</h3>
            <p class="small muted mb0">${j.org}</p>
            <dl class="dl mt24">
              <div><dt>Location</dt><dd>${j.loc}</dd></div>
              <div><dt>Suited to</dt><dd>${j.exp}</dd></div>
            </dl>
            <a class="btn btn--ghost btn--sm mt24" href="#/contact">Express interest</a>
          </div>`).join('')}
      </div>
      <div class="notice mt32">Openings listed here are indicative. Veterans should register in parallel with <a href="https://www.awpo.in" target="_blank" rel="noopener">AWPO</a> and <a href="https://www.dgrindia.gov.in" target="_blank" rel="noopener">DGR</a>, which run the Army’s formal placement and resettlement channels. <b>[listings to be confirmed]</b></div>

      <div class="mt32">${shead('Support', 'Welfare Support for Veterans in Transition',
        'The Corps’ welfare schemes run alongside placement — a veteran between careers should not have to choose between dignity and delay.')}</div>
      <div class="grid g3">
        ${DATA.welfare.map(w => `
          <a class="card card--link" href="#/welfare/${w.id}">
            <div class="card__ico">${w.icon}</div>
            <h3>${w.title}</h3><p class="small">${w.lede}</p>
            <p class="mb0"><em class="small" style="color:var(--gold-d);font-weight:700">Details →</em></p>
          </a>`).join('')}
      </div>

      <div class="grid g2 mt32">
        <div class="card card--accent"><h3>Employers</h3>
          <p class="small">Organisations wishing to recruit veterans of the Corps may write to the Veteran Cell with the role, location, experience sought and point of contact. There is no charge.</p>
          <a class="btn btn--green btn--sm" href="#/contact">Post a vacancy</a></div>
        <div class="card"><h3>Resettlement training</h3>
          <p class="small">DGR-sponsored courses in management, security, logistics and entrepreneurship are open to retiring and retired personnel, with a fee subsidy.</p>
          <a class="btn btn--ghost btn--sm" href="https://www.dgrindia.gov.in" target="_blank" rel="noopener">Visit DGR ↗</a></div>
      </div>
    </div></section>`;

/* ---------------- LINKS ---------------- */
V.links = () => head('Section 7', 'Useful Links',
  'The official portals a veteran of the Corps is most likely to need. All links open in a new tab.')
  + crumb(['Links'])
  + `<section class="section"><div class="wrap">
      <div class="grid g3">
        ${DATA.links.map(l => `
          <a class="card card--link" href="${esc(l.url)}" target="_blank" rel="noopener">
            <div class="card__ico" style="font-size:.82rem;font-weight:800;letter-spacing:.04em">${esc(l.code)}</div>
            <h3>${l.name}</h3><p class="small">${l.note}</p>
            <p class="mb0"><em class="small" style="color:var(--gold-d);font-weight:700">${esc(l.url.replace('https://',''))} ↗</em></p>
          </a>`).join('')}
      </div>
      <div class="notice mt32">External sites are maintained by their respective organisations. The Tuskers Veterans Portal is not responsible for their content or availability. Report a broken link through the <a href="#/contact">contact form</a>.</div>
    </div></section>`;

/* ---------------- CONTACT ---------------- */
V.contact = () => head('Section 8', 'Contact Us',
  'The Veteran Cell at the AOC Centre is your single point of contact with the Corps.')
  + crumb(['Contact Us'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          ${shead('Write to us', 'Send a Message', 'Use this form for general queries. For a formal grievance, use the grievance page so that a ticket is raised and tracked.')}
          <form id="contactForm" class="card">
            <div class="grid2">
              <div class="field"><label for="c_name">Your name <span class="req">*</span></label><input id="c_name" required></div>
              <div class="field"><label for="c_ic">IC / Army number</label><input id="c_ic"></div>
              <div class="field"><label for="c_email">Email <span class="req">*</span></label><input id="c_email" type="email" required></div>
              <div class="field"><label for="c_phone">Mobile</label><input id="c_phone" type="tel" pattern="[0-9]{10}"></div>
            </div>
            <div class="field"><label for="c_sub">Subject <span class="req">*</span></label>
              <select id="c_sub" required>
                <option value="">— Select —</option>
                <option>Welfare scheme query</option><option>Pension / entitlement</option>
                <option>Institute or mess booking</option><option>Placement / employment</option>
                <option>Museum visit or exhibit donation</option><option>University Cell / transcripts</option>
                <option>Records and documents</option><option>Other</option>
              </select></div>
            <div class="field"><label for="c_msg">Message <span class="req">*</span></label>
              <textarea id="c_msg" rows="5" required placeholder="Please give particulars — dates, references and any case numbers."></textarea></div>
            <button class="btn btn--green" type="submit">Send message</button>
          </form>
        </div>
        <aside class="sticky">
          <div class="contact-card"><h4>Veteran Cell</h4>
            <p><b>AOC Centre</b><br>Secunderabad — 500 015<br>Telangana, India</p>
            <p><b>Helpline:</b> 1800-XXX-XXXX<br><b>Email:</b> veterancell[at]aoc[dot]mil</p>
            <p class="muted small">Mon–Fri, 0900–1700 h. Closed on gazetted holidays.</p>
          </div>
          <div class="contact-card mt24"><h4>AOC Records</h4>
            <p class="small">Service records, discharge documents, family pension claims and verification.</p>
            <p class="small muted">Secunderabad, Telangana. <b>[direct number to be confirmed]</b></p></div>
          <div class="contact-card mt24"><h4>In an emergency</h4>
            <p class="small">For medical emergencies use the nearest ECHS polyclinic or service hospital. For immediate financial distress, telephone the Veteran Cell helpline and follow up with the distress grant application.</p>
            <a class="btn btn--ghost btn--sm btn--wide" href="#/welfare/distress">Distress grant</a></div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- PDF SEARCH ---------------- */
V.pdf = () => head('Section 9', 'Search Documents',
  'Forms, policy digests, handbooks, histories and back issues — search the portal’s document library.')
  + crumb(['Search Documents'])
  + `<section class="section"><div class="wrap">
      <div class="filters">
        <input type="search" id="pdfQ" placeholder="Search by title or keyword…" aria-label="Search documents" style="min-width:280px">
        <select id="pdfC" aria-label="Filter by category"><option value="">All categories</option></select>
        <select id="pdfY" aria-label="Filter by year"><option value="">All years</option></select>
        <button class="pill" id="pdfClear" type="button">Clear</button>
      </div>
      <p class="small muted" id="pdfCount"></p>
      <div class="grid" style="gap:12px" id="pdfList"></div>
      <div class="notice mt32">Documents are held by the Veteran Cell. In this demonstration build the files are not attached — selecting a document records a request. <b>[files to be uploaded]</b></div>
    </div></section>`;

/* ---------------- BOOKING ---------------- */
V.booking = (id) => head('Section 10', 'Institutes &amp; Booking',
  'The Centre’s messes, farm, club, band and institute — available to veterans of the Corps on requisition.')
  + crumb(['Institute Booking'])
  + `<section class="section"><div class="wrap">
      ${shead('Venues', 'What You Can Book', 'Select a venue to raise a booking request. Allotment is subject to availability, precedence and the sanction of the competent authority.')}
      <div class="grid" style="gap:18px">
        ${DATA.venues.map(v => `
          <article class="venue" id="v-${v.id}">
            <div class="venue__img">${v.icon}</div>
            <div class="venue__b">
              <h3>${v.name}</h3>
              <p class="small muted mb0">${v.type}</p>
              <div class="venue__meta mt24"><span>◆ ${v.cap}</span><span>◆ ${v.rates}</span></div>
              <p>${v.note}</p>
              <button class="btn btn--gold btn--sm" data-book="${v.id}" type="button">Request booking</button>
            </div>
          </article>`).join('')}
      </div>

      <div class="card mt32" id="bookingCard">
        ${shead('Requisition', 'Booking Request Form', 'Complete this form to raise a request. You will receive a reference number; confirmation follows from the institute.')}
        <form id="bookForm">
          <div class="grid2">
            <div class="field"><label for="b_venue">Venue <span class="req">*</span></label>
              <select id="b_venue" required><option value="">— Select —</option>
                ${DATA.venues.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}</select></div>
            <div class="field"><label for="b_occ">Occasion <span class="req">*</span></label>
              <select id="b_occ" required><option value="">— Select —</option>
                <option>Wedding / reception</option><option>Regimental function</option>
                <option>Reunion / get-together</option><option>Conference / seminar</option>
                <option>Transit accommodation</option><option>Band engagement</option><option>Other</option></select></div>
            <div class="field"><label for="b_name">Name <span class="req">*</span></label><input id="b_name" required></div>
            <div class="field"><label for="b_ic">IC / Army number <span class="req">*</span></label><input id="b_ic" required></div>
            <div class="field"><label for="b_from">From <span class="req">*</span></label><input id="b_from" type="date" required></div>
            <div class="field"><label for="b_to">To <span class="req">*</span></label><input id="b_to" type="date" required></div>
            <div class="field"><label for="b_guests">Expected guests</label><input id="b_guests" type="number" min="1" max="2000"></div>
            <div class="field"><label for="b_phone">Mobile <span class="req">*</span></label><input id="b_phone" type="tel" pattern="[0-9]{10}" required></div>
            <div class="field field--full"><label for="b_notes">Special requirements</label>
              <textarea id="b_notes" rows="3" placeholder="Catering, accommodation, band, audio-visual, parking…"></textarea></div>
          </div>
          <label class="check"><input type="checkbox" required> I have read and accept the institute rules and the applicable tariff, and understand that allotment is subject to availability and sanction. <span class="req">*</span></label>
          <button class="btn btn--green mt24" type="submit">Submit booking request</button>
        </form>
      </div>
      <div id="myBookings" class="mt32"></div>
    </div></section>`;

/* ---------------- BLOG ---------------- */
V.blog = () => head('Section 11', 'Share Your Thoughts',
  'The Corps’ own noticeboard for memory and opinion. Write about a posting, a comrade, a lesson learned, or a Tusker worth honouring.')
  + crumb(['Share Your Thoughts'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div id="postList"></div>
        <aside class="sticky">
          <div class="card card--accent">
            <h3>Write a post</h3>
            <form id="postForm">
              <div class="field"><label for="p_name">Name <span class="req">*</span></label><input id="p_name" required></div>
              <div class="field"><label for="p_unit">Unit / affiliation</label><input id="p_unit" placeholder="e.g. COD Jabalpur"></div>
              <div class="field"><label for="p_title">Title <span class="req">*</span></label><input id="p_title" required maxlength="110"></div>
              <div class="field"><label for="p_text">Your thoughts <span class="req">*</span></label>
                <textarea id="p_text" rows="6" required maxlength="1400" placeholder="Keep it in your own voice."></textarea>
                <small class="hint"><span id="pCount">0</span>/1400 characters</small></div>
              <label class="check"><input type="checkbox" required> I confirm this post contains no classified, operational or personal information that should not be published. <span class="req">*</span></label>
              <button class="btn btn--green btn--wide mt24" type="submit">Publish post</button>
            </form>
            <p class="small muted mt24">Posts are moderated by the Veteran Cell before appearing to all users. In this build they are saved to your browser only.</p>
          </div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- GRIEVANCE ---------------- */
V.grievance = () => head('Section 12', 'Register a Grievance',
  'Raise a grievance with the Veteran Cell and track it by ticket number. Every ticket is allotted to a named officer.')
  + crumb(['Grievance'])
  + `<section class="section"><div class="wrap">
      <div class="grid g-side">
        <div>
          <form id="grvForm" class="card">
            ${shead('New grievance', 'Grievance Particulars', '')}
            <div class="grid2">
              <div class="field"><label for="g_name">Name <span class="req">*</span></label><input id="g_name" required></div>
              <div class="field"><label for="g_ic">IC / Army number <span class="req">*</span></label><input id="g_ic" required></div>
              <div class="field"><label for="g_email">Email <span class="req">*</span></label><input id="g_email" type="email" required></div>
              <div class="field"><label for="g_phone">Mobile <span class="req">*</span></label><input id="g_phone" type="tel" pattern="[0-9]{10}" required></div>
              <div class="field"><label for="g_cat">Category <span class="req">*</span></label>
                <select id="g_cat" required><option value="">— Select —</option>
                  <option>Pension — non-receipt or short payment</option>
                  <option>Pension — PPO / corrigendum</option>
                  <option>ECHS — medical facility</option>
                  <option>CSD — canteen facility</option>
                  <option>Records — documents and certificates</option>
                  <option>Welfare scheme — application pending</option>
                  <option>Institute / mess booking</option>
                  <option>Placement and resettlement</option>
                  <option>Other</option></select></div>
              <div class="field"><label for="g_pri">Priority <span class="req">*</span></label>
                <select id="g_pri" required><option value="">— Select —</option>
                  <option>Routine</option><option>Important</option><option>Distress — immediate</option></select></div>
              <div class="field field--full"><label for="g_sub">Subject <span class="req">*</span></label><input id="g_sub" required maxlength="140"></div>
              <div class="field field--full"><label for="g_det">Details <span class="req">*</span></label>
                <textarea id="g_det" rows="6" required placeholder="Give dates, references, PPO or case numbers, and what action you have already taken."></textarea></div>
              <div class="field field--full"><label for="g_prev">Have you raised this elsewhere?</label>
                <input id="g_prev" placeholder="e.g. CPENGRAMS reference, bank complaint number"></div>
            </div>
            <label class="check"><input type="checkbox" required> The particulars given are true and I consent to their being taken up with the concerned agency on my behalf. <span class="req">*</span></label>
            <button class="btn btn--green mt24" type="submit">Register grievance</button>
          </form>
        </div>
        <aside class="sticky">
          <div class="card"><h3>Track a grievance</h3>
            <form id="trackForm">
              <div class="field"><label for="t_id">Ticket number</label><input id="t_id" placeholder="TVP-XXXXXXX"></div>
              <button class="btn btn--ghost btn--sm btn--wide" type="submit">Track</button>
            </form>
            <div id="trackOut"></div>
          </div>
          <div class="card mt24"><h3>How it is handled</h3>
            <ul class="tick small">
              <li>Acknowledgement with ticket number, immediately</li>
              <li>Allotment to a named officer of the Veteran Cell</li>
              <li>Action with the concerned agency — Records, CDA (P), ECHS, bank</li>
              <li>Status intimation to you by email or telephone</li>
              <li>Closure only on your confirmation</li>
            </ul>
            <p class="small muted">Distress cases are taken up the same working day.</p>
          </div>
          <div id="myGrv" class="mt24"></div>
        </aside>
      </div>
    </div></section>`;

/* ---------------- HEROES ---------------- */
V.heroes = () => head('Section 13', 'Know Your Heroes',
  'The Corps’ gallantry awardees and its battle casualties. These pages are being compiled with the help of veterans and unit records.')
  + crumb(['Know Your Heroes'])
  + `<section class="section"><div class="wrap">
      <div class="grid g3">
        <a class="card card--link" href="#/gallantry"><div class="card__ico">🎖️</div><h3>Gallantry Awards</h3><p class="small">Awardees of the Corps — Ashoka Chakra, Kirti Chakra, Shaurya Chakra, Sena Medal and mentions.</p></a>
        <a class="card card--link" href="#/bcas"><div class="card__ico">🕯️</div><h3>Battle Casualties (B Cas)</h3><p class="small">Tuskers who laid down their lives in operations. The Corps carries their names on its roll for ever.</p></a>
        <a class="card card--link" href="#/obituary"><div class="card__ico">🤍</div><h3>Obituary</h3><p class="small">Comrades who have passed on. Intimations from families and units.</p></a>
      </div>
      <div class="card card--accent mt32">
        <h3>Help us complete the record</h3>
        <p>Our records of gallantry awards and battle casualties are incomplete, and every year of delay costs us a name. If you can supply a citation, a Gazette reference, a photograph or a date, the Corps would be in your debt.</p>
        <a class="btn btn--green" href="#/contact">Send us a record</a>
      </div>
      <div class="mt32">${galleryStrip()}</div>
    </div></section>`;

V.gallantry = () => head('Know Your Heroes', 'Gallantry Awards',
  'Personnel of the Army Ordnance Corps decorated for gallantry.')
  + crumb(['<a href="#/heroes">Know Your Heroes</a>', 'Gallantry Awards'])
  + `<section class="section"><div class="wrap">
      <div class="grid g4">
        ${DATA.gallantry.map(h => `
          <article class="hero-card">
            <div class="hero-card__top">
              <div class="hero-card__medal">🎖️</div>
              <b>${h.rank} ${h.name}</b><span>${h.unit} · ${h.year}</span>
            </div>
            <div class="hero-card__b">
              <span class="hero-card__award">${h.award}</span>
              <p class="mt24">${h.cite}</p>
            </div>
          </article>`).join('')}
      </div>
      <div class="notice mt32"><b>Under compilation.</b> The Veteran Cell is verifying every award against Gazette notifications and Directorate records before publication. Veterans who can assist with citations or references are requested to <a href="#/contact">write in</a>.</div>
    </div></section>`;

V.bcas = () => head('Know Your Heroes', 'Battle Casualties',
  'Tuskers who gave their lives in the service of the nation. Their units, their operations, their names.')
  + crumb(['<a href="#/heroes">Know Your Heroes</a>', 'Battle Casualties'])
  + `<section class="section"><div class="wrap">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Rank</th><th>Name</th><th>Unit</th><th>Operation</th><th>Year</th></tr></thead>
        <tbody>${DATA.bcas.map(b =>
          `<tr><td>${b.rank}</td><td>${b.name}</td><td>${b.unit}</td><td>${b.op}</td><td>${b.year}</td></tr>`).join('')}</tbody>
      </table></div>
      <div class="card card--accent mt32 center">
        <h3 style="margin-bottom:6px">“They gave up their todays for our tomorrows.”</h3>
        <p class="muted mb0">The Corps’ roll of battle casualties is maintained at the AOC Centre. Families and units are requested to assist the Veteran Cell in completing it.</p>
      </div>
      <div class="notice mt32"><b>Under compilation. [names and particulars to be confirmed]</b></div>
    </div></section>`;

V.obituary = () => head('Section 14', 'Obituary',
  'The Corps records with sorrow the passing of its comrades. Intimations may be sent by families or units to the Veteran Cell.')
  + crumb(['Obituary'])
  + `<section class="section"><div class="wrap">
      <div class="grid g4">
        ${DATA.obituary.map(o => `
          <div class="obit">
            <div class="obit__frame">🕯️</div>
            <b>${o.rank} ${o.name}</b>
            <span>${o.unit}</span>
            <span class="dates">${o.b} — ${o.d}</span>
          </div>`).join('')}
      </div>
      <div class="grid g2 mt32">
        <div class="card card--accent">
          <h3>Intimate a bereavement</h3>
          <p class="small">Families and units may intimate the Veteran Cell of the passing of a member of the Corps. Please give rank, name, IC/Army number, last unit, dates and a contact for the next of kin. The Cell will assist the family with family pension, ECHS and CSD formalities.</p>
          <a class="btn btn--green btn--sm" href="#/contact">Send an intimation</a>
        </div>
        <div class="card">
          <h3>Support for the bereaved</h3>
          <ul class="tick small">
            <li><a href="#/pension">Family pension — claim documents</a></li>
            <li><a href="#/welfare/distress">Distress grant for the family</a></li>
            <li><a href="#/welfare/adlrs">ADLRS for veer naris in need</a></li>
            <li><a href="#/welfare/scholar">Scholarships for children</a></li>
            <li><a href="https://echs.gov.in" target="_blank" rel="noopener">ECHS card transfer ↗</a></li>
          </ul>
        </div>
      </div>
      <div class="notice mt32"><b>[names and particulars to be confirmed]</b></div>
    </div></section>`;

/* fallbacks */
V.more = V.resources;
V.notfound = () => head('404', 'Page Not Found', 'The page you asked for is not on this portal.')
  + `<section class="section"><div class="wrap center">
      <p><a class="btn btn--green" href="#/home">Return to the home page</a></p></div></section>`;

/* =========================================================
   ROUTER
   ========================================================= */
const TITLES = {
  home:'Home', unit:'Mother Unit', mcmm:'MCMM', museum:'Corps Museum', ucell:'University Cell',
  aoc:'AOC Centre', aochistory:'History', resources:'Resources', welfare:'Welfare Schemes',
  pension:'Pension', mm:'Materials Management', baatcheet:'Baat Cheet', jobs:'Jobs & Placement',
  links:'Useful Links', contact:'Contact Us', pdf:'Search Documents', booking:'Institute Booking',
  blog:'Share Your Thoughts', grievance:'Grievance', heroes:'Know Your Heroes',
  gallantry:'Gallantry Awards', bcas:'Battle Casualties', obituary:'Obituary', updates:'Latest Updates'
};

function route(){
  const raw = (location.hash || '#/home').replace(/^#\/?/, '');
  let [key, param] = raw.split('/');

  /* Section 1 — the registration / sign-in gate is a modal over the home view */
  let authTab = null;
  if (key === 'register' || key === 'login'){ authTab = key; key = 'home'; }

  const name = V[key] ? key : (key === '' ? 'home' : 'notfound');
  $('#view').innerHTML = V[name](param);
  document.title = (TITLES[name] || 'Not found') + ' — Tuskers Veterans Portal';
  markActive(name);
  window.scrollTo(0, 0);
  $('#primaryNav').classList.remove('is-open');
  $('#navToggle').setAttribute('aria-expanded', 'false');
  wire(name, param);
  if (authTab) setTimeout(() => openAuth(authTab), 60);
}

/* =========================================================
   PER-VIEW WIRING
   ========================================================= */
function wire(name, param){
  /* accordions (all views) */
  $$('.acc__h').forEach(b => b.addEventListener('click', () => {
    b.parentElement.classList.toggle('is-open');
  }));

  if (name === 'home')      wireHome();
  if (name === 'unit')      wireUnit();
  if (name === 'pdf')       wirePdf();
  if (name === 'booking')   wireBooking(param);
  if (name === 'blog')      wireBlog();
  if (name === 'grievance') wireGrievance();
  if (name === 'contact')   wireContact();
  if (name === 'welfare' && param){
    const t = document.getElementById('sec-' + param);
    if (t) setTimeout(() => t.scrollIntoView({ behavior:'smooth', block:'center' }), 120);
  }
  buildUnitDatalist();
  initStrip();
}

/* ---------- HOME: carousel + read more ---------- */
function wireHome(){
  const slides = $$('.slide'), dots = $$('#heroDots button');
  let i = 0, timer;
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-on', k === i));
    dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
  dots.forEach((d, k) => d.addEventListener('click', () => { go(k); play(); }));
  const nx = $('#heroNext'), pv = $('#heroPrev');
  if (nx) nx.addEventListener('click', () => { go(i + 1); play(); });
  if (pv) pv.addEventListener('click', () => { go(i - 1); play(); });
  const track = $('#heroTrack');
  if (track){
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', play);
    let sx = null;
    track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive:true });
    track.addEventListener('touchend', e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
      sx = null; play();
    });
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();

  const btn = $('#dgosBtn'), more = $('#dgosMore');
  if (btn) btn.addEventListener('click', () => {
    const open = more.classList.toggle('is-open');
    btn.textContent = open ? 'Read less ↑' : 'Read more ↓';
    btn.setAttribute('aria-expanded', String(open));
  });
}

/* ---------- MOTHER UNIT ---------- */
function buildUnitDatalist(){
  const dl = $('#unitList');
  if (dl && !dl.children.length)
    dl.innerHTML = DATA.units.map(u => `<option value="${esc(u.name)}">`).join('');
}
function wireUnit(){
  const types = [...new Set(DATA.units.map(u => u.type))];
  const sel = $('#unitT');
  sel.innerHTML += types.map(t => `<option>${t}</option>`).join('');
  const draw = () => {
    const q = $('#unitQ').value.toLowerCase().trim(), t = sel.value;
    const rows = DATA.units.filter(u =>
      (!t || u.type === t) &&
      (!q || (u.name + u.loc + u.type + u.note).toLowerCase().includes(q)));
    $('#unitBody').innerHTML = rows.length ? rows.map(u => `
      <tr><td><b>${u.name}</b><br><span class="small muted">${u.note}</span></td>
      <td>${u.type}</td><td>${u.loc}</td></tr>`).join('')
      : `<tr><td colspan="3" class="muted">No unit matched that search.</td></tr>`;
  };
  $('#unitQ').addEventListener('input', draw);
  sel.addEventListener('change', draw);
  draw();

  $('#unitForm').addEventListener('submit', e => {
    e.preventDefault();
    toast('Affiliation recorded for <b>' + esc($('#mu_unit').value) + '</b>. The Veteran Cell will verify it against Centre records.');
    e.target.reset();
  });
}

/* ---------- PDF LIBRARY ---------- */
function wirePdf(){
  const cats = [...new Set(DATA.pdfs.map(p => p.c))].sort();
  const yrs  = [...new Set(DATA.pdfs.map(p => p.y))].sort().reverse();
  $('#pdfC').innerHTML += cats.map(c => `<option>${c}</option>`).join('');
  $('#pdfY').innerHTML += yrs.map(y => `<option>${y}</option>`).join('');
  const draw = () => {
    const q = $('#pdfQ').value.toLowerCase().trim(), c = $('#pdfC').value, y = $('#pdfY').value;
    const rows = DATA.pdfs.filter(p =>
      (!c || p.c === c) && (!y || p.y === y) && (!q || (p.t + p.c).toLowerCase().includes(q)));
    $('#pdfCount').textContent = rows.length + ' of ' + DATA.pdfs.length + ' documents';
    $('#pdfList').innerHTML = rows.length ? rows.map(p => `
      <div class="pdfrow">
        <div class="pdfrow__ico">PDF</div>
        <div class="pdfrow__b"><b>${p.t}</b><span>${p.c} · ${p.y} · ${p.s}</span></div>
        <button class="btn btn--ghost btn--sm" type="button" data-doc="${esc(p.t)}">Request</button>
      </div>`).join('')
      : `<p class="muted">No document matched. Try a different keyword, or <a href="#/contact">ask the Veteran Cell</a>.</p>`;
  };
  ['pdfQ','pdfC','pdfY'].forEach(id => $('#' + id).addEventListener('input', draw));
  $('#pdfClear').addEventListener('click', () => {
    $('#pdfQ').value = ''; $('#pdfC').value = ''; $('#pdfY').value = ''; draw();
  });
  $('#pdfList').addEventListener('click', e => {
    const b = e.target.closest('[data-doc]');
    if (b) toast('Request noted for “' + b.dataset.doc + '”. The Veteran Cell will email the document.');
  });
  draw();
}

/* ---------- BOOKING ---------- */
function wireBooking(param){
  if (param){
    const t = document.getElementById('v-' + param);
    if (t) setTimeout(() => t.scrollIntoView({ behavior:'smooth', block:'center' }), 120);
    const sel = $('#b_venue'); if (sel) sel.value = param;
  }
  $$('[data-book]').forEach(b => b.addEventListener('click', () => {
    $('#b_venue').value = b.dataset.book;
    $('#bookingCard').scrollIntoView({ behavior:'smooth', block:'start' });
    setTimeout(() => $('#b_name').focus(), 400);
  }));
  const drawMine = () => {
    const list = store.get('bookings', []);
    $('#myBookings').innerHTML = list.length ? `
      ${shead('Your requests', 'Booking Requests Raised', 'Saved on this device.')}
      <div class="tbl-wrap"><table>
        <thead><tr><th>Reference</th><th>Venue</th><th>Dates</th><th>Occasion</th><th>Status</th></tr></thead>
        <tbody>${list.map(b => `<tr><td><b>${esc(b.id)}</b></td><td>${esc(b.venue)}</td>
          <td>${esc(b.from)} → ${esc(b.to)}</td><td>${esc(b.occ)}</td>
          <td><span class="chip chip--not">Awaiting confirmation</span></td></tr>`).join('')}</tbody>
      </table></div>` : '';
  };
  $('#bookForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.b_to.value && f.b_from.value && f.b_to.value < f.b_from.value){
      toast('The end date cannot be before the start date.', true); return;
    }
    const venue = DATA.venues.find(v => v.id === f.b_venue.value);
    const rec = { id: uid('TVB'), venue: venue ? venue.name : f.b_venue.value,
      from: f.b_from.value, to: f.b_to.value, occ: f.b_occ.value };
    const list = store.get('bookings', []); list.unshift(rec); store.set('bookings', list);
    toast('Booking request <b>' + rec.id + '</b> raised for ' + esc(rec.venue) + '. You will be contacted to confirm.');
    f.reset(); drawMine();
    $('#myBookings').scrollIntoView({ behavior:'smooth' });
  });
  drawMine();
}

/* ---------- BLOG ---------- */
function wireBlog(){
  const draw = () => {
    const mine = store.get('posts', []);
    const all = mine.concat(DATA.posts);
    $('#postList').innerHTML = `
      ${shead('The noticeboard', 'From the Fraternity', all.length + ' posts')}
      <div class="grid" style="gap:18px">
        ${all.map((p, i) => `
          <article class="post">
            <div class="post__meta">
              <span class="post__av">${initials(p.name)}</span>
              <span><b style="color:var(--ink)">${esc(p.name)}</b>${p.unit ? ' · ' + esc(p.unit) : ''}</span>
              <span>· ${esc(p.date)}</span>
              ${p.own ? '<span class="chip chip--evt">Your post</span>' : ''}
            </div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.text).replace(/\n+/g, '<br>')}</p>
            <div class="post__foot">
              <button type="button" data-like="${i}">♥ <span>${p.likes || 0}</span></button>
              ${p.own ? `<button type="button" data-del="${i}">Delete</button>` : ''}
            </div>
          </article>`).join('')}
      </div>`;
  };
  const cnt = $('#pCount'), ta = $('#p_text');
  ta.addEventListener('input', () => { cnt.textContent = ta.value.length; });
  $('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const rec = { name:f.p_name.value.trim(), unit:f.p_unit.value.trim(), title:f.p_title.value.trim(),
      text:f.p_text.value.trim(), likes:0, own:true,
      date:new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) };
    const list = store.get('posts', []); list.unshift(rec); store.set('posts', list);
    f.reset(); cnt.textContent = '0'; draw();
    toast('Your post has been submitted. It is visible to you now and goes to the Veteran Cell for moderation.');
  });
  $('#postList').addEventListener('click', e => {
    const like = e.target.closest('[data-like]'), del = e.target.closest('[data-del]');
    const mine = store.get('posts', []);
    if (like){
      const i = +like.dataset.like;
      if (i < mine.length){ mine[i].likes = (mine[i].likes || 0) + 1; store.set('posts', mine); draw(); }
      else { const s = like.querySelector('span'); s.textContent = +s.textContent + 1; }
    }
    if (del){
      const i = +del.dataset.del;
      mine.splice(i, 1); store.set('posts', mine); draw(); toast('Post deleted.');
    }
  });
  draw();
}

/* ---------- GRIEVANCE ---------- */
function wireGrievance(){
  const drawMine = () => {
    const list = store.get('grv', []);
    $('#myGrv').innerHTML = list.length ? `
      <div class="card"><h3>Your tickets</h3>
        ${list.map(g => `<div style="border-bottom:1px dashed var(--line);padding:9px 0">
          <b>${esc(g.id)}</b><br><span class="small muted">${esc(g.cat)} · ${esc(g.date)}</span><br>
          <span class="chip chip--not">${esc(g.status)}</span></div>`).join('')}
      </div>` : '';
  };
  $('#grvForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const rec = { id: uid('TVP'), cat:f.g_cat.value, sub:f.g_sub.value, pri:f.g_pri.value,
      status: f.g_pri.value.startsWith('Distress') ? 'Taken up — same day' : 'Registered — under action',
      date:new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) };
    const list = store.get('grv', []); list.unshift(rec); store.set('grv', list);
    f.reset(); drawMine();
    toast('Grievance registered. Ticket number <b>' + rec.id + '</b>. Keep it for tracking.');
  });
  $('#trackForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = $('#t_id').value.trim().toUpperCase();
    const g = store.get('grv', []).find(x => x.id === id);
    $('#trackOut').innerHTML = g
      ? `<div class="notice notice--info mt24"><b>${esc(g.id)}</b><br>${esc(g.sub)}<br>
         <span class="small">${esc(g.cat)} · raised ${esc(g.date)}</span><br>
         <span class="chip chip--evt mt24">${esc(g.status)}</span></div>`
      : `<div class="notice mt24">No ticket found with that number on this device. Tickets raised elsewhere are traced by the Veteran Cell — please <a href="#/contact">write in</a>.</div>`;
  });
  drawMine();
}

/* ---------- CONTACT ---------- */
function wireContact(){
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    toast('Message sent to the Veteran Cell. You will receive an acknowledgement by email.');
    e.target.reset();
  });
}

/* =========================================================
   AUTH
   ========================================================= */
function openAuth(tab){
  const m = $('#authModal');
  m.hidden = false;
  document.body.style.overflow = 'hidden';
  switchAuth(tab || 'login');
  setTimeout(() => { const i = $('#authModal .form:not([hidden]) input'); if (i) i.focus(); }, 60);
}
function closeAuth(){
  $('#authModal').hidden = true;
  document.body.style.overflow = '';
}
function switchAuth(tab){
  $$('[data-authtab]').forEach(b => {
    const on = b.dataset.authtab === tab;
    if (b.classList.contains('tabs__t')){
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-selected', String(on));
    }
  });
  $$('[data-authpane]').forEach(p => { p.hidden = p.dataset.authpane !== tab; });
}
function setUser(u){
  store.set('user', u);
  paintUser();
}
function paintUser(){
  const u = store.get('user', null);
  const chip = $('#userChip'), btn = $('#authBtn');
  if (u){
    chip.hidden = false;
    chip.textContent = (u.rank ? u.rank + ' ' : '') + (u.name || u.ic);
    btn.textContent = 'Sign out';
    btn.classList.remove('btn--gold'); btn.classList.add('btn--ghost');
  } else {
    chip.hidden = true;
    btn.textContent = 'Sign in';
    btn.classList.add('btn--gold'); btn.classList.remove('btn--ghost');
  }
}
function pwScore(v){
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v) && v.length >= 10) s++;
  return s;
}
function fieldError(el, msg){
  el.setAttribute('aria-invalid', 'true');
  let e = el.parentElement.querySelector('.err');
  if (!e){ e = document.createElement('div'); e.className = 'err'; el.parentElement.appendChild(e); }
  e.textContent = msg;
}
function clearErrors(form){
  $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
  $$('.err', form).forEach(e => e.remove());
}

function initAuth(){
  $('#authBtn').addEventListener('click', () => {
    if (store.get('user', null)){
      store.del('user'); paintUser(); toast('Signed out.');
    } else openAuth('login');
  });
  $$('#authModal [data-close]').forEach(b => b.addEventListener('click', closeAuth));
  $$('[data-authtab]').forEach(b => b.addEventListener('click', () => switchAuth(b.dataset.authtab)));
  $('#guestBtn').addEventListener('click', () => { closeAuth(); toast('Browsing as a guest. Some services need a signed-in account.'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#authModal').hidden) closeAuth(); });

  $$('.pw__eye').forEach(b => b.addEventListener('click', () => {
    const i = document.getElementById(b.dataset.eye);
    i.type = i.type === 'password' ? 'text' : 'password';
    b.style.opacity = i.type === 'text' ? 1 : .55;
  }));

  /* states */
  $('#rg_state').innerHTML += DATA.states.map(s => `<option>${s}</option>`).join('');

  /* password meter */
  const pw = $('#rg_pw'), bar = $('#pwBar'), hint = $('#pwHint');
  pw.addEventListener('input', () => {
    const s = pwScore(pw.value);
    bar.style.width = (s * 25) + '%';
    bar.dataset.s = s;
    hint.textContent = ['Too weak','Weak — add a capital letter and a number','Fair','Good','Strong'][s];
  });

  /* login */
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target; clearErrors(f);
    const ic = f.ic.value.trim();
    if (ic.length < 4){ fieldError(f.ic, 'Enter a valid IC / Army number.'); return; }
    if (f.password.value.length < 8){ fieldError(f.password, 'Password must be at least 8 characters.'); return; }
    const saved = store.get('account', null);
    const u = (saved && saved.ic.toUpperCase() === ic.toUpperCase())
      ? { ic: saved.ic, name: saved.name, rank: saved.rank }
      : { ic, name: '', rank: '' };
    setUser(u); closeAuth();
    toast('Welcome back, ' + esc(u.name || u.ic) + '. Jai Hind.');
  });

  /* register */
  $('#registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target; clearErrors(f);
    let ok = true, first = null;
    const fail = (el, msg) => { fieldError(el, msg); ok = false; first = first || el; };

    $$('[required]', f).forEach(el => {
      if (el.type === 'checkbox'){ if (!el.checked) { ok = false; first = first || el; } return; }
      if (!el.value.trim()) fail(el, 'This field is required.');
    });
    if (f.email.value && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(f.email.value))
      fail(f.email, 'Enter a valid email address.');
    if (f.mobile.value && !/^[0-9]{10}$/.test(f.mobile.value))
      fail(f.mobile, 'Enter a 10-digit mobile number.');
    if (f.password.value.length < 8)
      fail(f.password, 'Minimum 8 characters.');
    else if (pwScore(f.password.value) < 3)
      fail(f.password, 'Add a capital letter and a number.');
    if (f.password.value !== f.password2.value)
      fail(f.password2, 'Passwords do not match.');
    if (f.dob.value && new Date(f.dob.value) > new Date())
      fail(f.dob, 'Date of birth cannot be in the future.');
    if (f.doc.value && f.dor.value && f.dor.value < f.doc.value)
      fail(f.dor, 'Retirement cannot precede commission / enrolment.');

    if (!ok){
      toast('Please correct the highlighted fields.', true);
      if (first) first.focus();
      return;
    }
    const acct = { ic:f.ic.value.trim(), name:f.name.value.trim(), rank:f.rank.value,
      email:f.email.value.trim(), unit:f.unit.value.trim(), category:f.category.value };
    store.set('account', acct);
    setUser({ ic:acct.ic, name:acct.name, rank:acct.rank });
    f.reset(); $('#pwBar').style.width = '0';
    closeAuth();
    toast('Registration submitted. Your account is active and pending verification against Centre records. Welcome, ' + esc(acct.name) + '.');
  });

  paintUser();
}

/* =========================================================
   GLOBAL SEARCH
   ========================================================= */
function buildIndex(){
  const ix = [];
  const add = (t, s, h) => ix.push({ t, s, h });
  Object.keys(TITLES).forEach(k => add(TITLES[k], 'Page', '#/' + k));
  DATA.welfare.forEach(w => add(w.title, 'Welfare scheme', '#/welfare/' + w.id));
  DATA.venues.forEach(v => add(v.name, 'Institute / venue', '#/booking/' + v.id));
  DATA.links.forEach(l => add(l.code + ' — ' + l.name, 'External link', l.url));
  DATA.units.forEach(u => add(u.name, 'Unit · ' + u.loc, '#/unit'));
  DATA.pdfs.forEach(p => add(p.t, 'Document · ' + p.c, '#/pdf'));
  DATA.updates.forEach(u => add(u.title, 'Update · ' + u.type, '#/updates'));
  DATA.jobs.forEach(j => add(j.role.replace(/&amp;/g,'&'), 'Vacancy · ' + j.loc, '#/jobs'));
  DATA.pension.entitlement.forEach(p => add(p.q, 'Pension', '#/pension'));
  return ix;
}
function initSearch(){
  const ix = buildIndex();
  const box = $('#globalSearchInput'), out = $('#gsearchResults');
  const draw = () => {
    const q = box.value.toLowerCase().trim();
    if (q.length < 2){ out.hidden = true; return; }
    const hits = ix.filter(r => r.t.toLowerCase().includes(q) || r.s.toLowerCase().includes(q)).slice(0, 12);
    out.innerHTML = hits.length
      ? hits.map(r => `<a href="${esc(r.h)}"${r.h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>
          <b>${esc(r.t)}</b><span>${esc(r.s)}</span></a>`).join('')
      : `<div class="gsearch__none">Nothing matched “${esc(box.value)}”. Try the <a href="#/pdf">document library</a> or <a href="#/contact">ask the Veteran Cell</a>.</div>`;
    out.hidden = false;
  };
  box.addEventListener('input', draw);
  box.addEventListener('focus', draw);
  $('#globalSearch').addEventListener('submit', e => {
    e.preventDefault();
    const first = out.querySelector('a');
    if (first) first.click();
  });
  out.addEventListener('click', e => { if (e.target.closest('a')){ out.hidden = true; box.value = ''; } });
  document.addEventListener('click', e => { if (!e.target.closest('#globalSearch')) out.hidden = true; });
}

/* =========================================================
   OFFICIAL CREST
   Drop the official AOC crest at assets/img/aoc-crest.png and it is
   picked up automatically here; until then the inline SVG placeholder
   in index.html is used.
   ========================================================= */
/* First of these that exists is used as the Corps crest. */
const CREST_CANDIDATES = ['assets/img/ordnancebadge.png', 'assets/img/aoc-crest.png'];
const STRIP_SRC = 'insignia-strip.png';

/* Reveal the single-image lineage plate only if the file is actually present.
   Called after every render, since the view is rebuilt on each route change. */
function initStrip(){
  const fig = $('.insig-strip');
  if (!fig) return;
  const img = fig.querySelector('img');
  /* With the real lineage artwork on the page, the drawn stand-ins in the
     cards below would just repeat it — so the cards become captions only. */
  const show = ok => {
    fig.hidden = !ok;
    const grid = $('.insig');
    if (grid) grid.classList.toggle('insig--noart', ok);
  };
  if (img.complete) { show(!!img.naturalWidth); return; }
  img.addEventListener('load',  () => show(true));
  img.addEventListener('error', () => show(false));
}

function initCrest(){
  /* Any .imgslot whose image is missing falls back to its inline art.
     'error' does not bubble, so listen in the capture phase. */
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.parentElement && img.parentElement.classList.contains('imgslot'))
      img.parentElement.classList.add('is-missing');
  }, true);

  /* Masthead motto, from data */
  const m = $('.brand__motto');
  if (m) m.innerHTML = `${DATA.motto.deva} &middot; ${DATA.motto.roman}`;

  /* Try each candidate in turn; the first that loads wins. */
  (function tryCrest(i){
    if (i >= CREST_CANDIDATES.length) return;
    const src = CREST_CANDIDATES[i];
    const probe = new Image();
    probe.onerror = () => tryCrest(i + 1);
    probe.onload = () => {
      document.documentElement.classList.add('has-crest');
      $('.brand__crest').innerHTML = `<img src="${src}" alt="Army Ordnance Corps crest">`;
      const aside = $('.auth__crest');
      if (aside) aside.innerHTML = `<img src="${src}" alt="">`;
      const link = document.createElement('link');
      link.rel = 'icon'; link.href = src;
      document.head.appendChild(link);
    };
    probe.src = src;
  })(0);
}

/* =========================================================
   CHROME (nav toggle, a11y tools, to-top)
   ========================================================= */
function initChrome(){
  $('#yr').textContent = new Date().getFullYear();

  $('#navToggle').addEventListener('click', () => {
    const n = $('#primaryNav'), open = n.classList.toggle('is-open');
    $('#navToggle').setAttribute('aria-expanded', String(open));
  });
  /* mobile: tapping a parent with a submenu opens it instead of navigating */
  $('#navList').addEventListener('click', e => {
    const link = e.target.closest('.nav__link');
    if (!link || window.innerWidth > 900) return;
    const li = link.parentElement;
    if (li.querySelector('.nav__sub')){ e.preventDefault(); li.classList.toggle('is-open'); }
  });

  /* font size */
  let fs = store.get('font', 16);
  const applyFs = () => { document.documentElement.style.setProperty('--fs', fs + 'px'); store.set('font', fs); };
  applyFs();
  $$('[data-font]').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.font;
    fs = a === 'inc' ? Math.min(fs + 1, 21) : a === 'dec' ? Math.max(fs - 1, 13) : 16;
    applyFs();
  }));

  /* contrast */
  const cb = $('#contrastBtn');
  const applyC = on => {
    document.documentElement.dataset.contrast = on ? 'on' : '';
    cb.setAttribute('aria-pressed', String(on));
    store.set('contrast', on);
  };
  applyC(store.get('contrast', false));
  cb.addEventListener('click', () => applyC(document.documentElement.dataset.contrast !== 'on'));

  /* to top */
  const tt = $('#toTop');
  window.addEventListener('scroll', () => { tt.hidden = window.scrollY < 500; }, { passive:true });
  tt.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* =========================================================
   BOOT
   ========================================================= */
buildNav();
initCrest();
initChrome();
initAuth();
initSearch();
window.addEventListener('hashchange', route);
route();

/* First-time visitors land on the registration / sign-in gate (Section 1). */
if (!store.get('user', null) && !store.get('seen', false)){
  store.set('seen', true);
  setTimeout(() => openAuth('register'), 700);
}

})();
