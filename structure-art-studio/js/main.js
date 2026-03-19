/* ═══════════════════════════════════════
   STRUCTURE ART STUDIO — Main JS
═══════════════════════════════════════ */

// ── LANGUAGE SYSTEM ──
let currentLang = localStorage.getItem('sa-lang') || 'en';

function setLang(lang, btn) {
  currentLang = lang;
  localStorage.setItem('sa-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    const b = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (b) b.classList.add('active');
  }
  document.documentElement.lang = lang;
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    const txt = el.getAttribute('data-' + currentLang);
    if (txt) el.textContent = txt;
  });
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + currentLang) || el.placeholder;
  });
  document.querySelectorAll('select option[data-en]').forEach(opt => {
    const txt = opt.getAttribute('data-' + currentLang);
    if (txt) opt.textContent = txt;
  });
  if (typeof buildTicker === 'function') buildTicker();
  if (typeof renderPortfolio === 'function') renderPortfolio(currentFilter || 'all');
}

// Init lang on load
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  const activeBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
  if (activeBtn) activeBtn.classList.add('active');
});

// ── LOGO SVG ──
const LOGO_SVG = `<svg class="nav-logo-svg" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="3" width="30" height="30" rx="1" transform="rotate(45 30 18)" stroke="#B38D5F" stroke-width="1.8" fill="none"/>
  <rect x="15" y="15" width="30" height="30" rx="1" transform="rotate(45 30 30)" stroke="#B38D5F" stroke-width="1.8" fill="none"/>
  <line x1="22" y1="14" x2="30" y2="22" stroke="#B38D5F" stroke-width="1.5"/>
  <line x1="30" y1="22" x2="38" y2="14" stroke="#B38D5F" stroke-width="1.5"/>
  <line x1="22" y1="46" x2="30" y2="38" stroke="#B38D5F" stroke-width="1.5"/>
  <line x1="30" y1="38" x2="38" y2="46" stroke="#B38D5F" stroke-width="1.5"/>
</svg>`;

// Inject logo wherever .nav-logo-placeholder exists
document.querySelectorAll('.nav-logo-placeholder').forEach(el => {
  el.innerHTML = LOGO_SVG;
});

// ── NAV SHARED ──
function buildNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const catLinksEN = `
    <li class="nav-dropdown">
      <a href="#" data-en="Custom" data-es="Custom">Custom ▾</a>
      <div class="nav-dropdown-menu">
        <a href="custom-kitchen.html" data-en="Kitchen" data-es="Cocina">Kitchen</a>
        <a href="custom-living.html" data-en="Living Room" data-es="Sala">Living Room</a>
        <a href="custom-dining.html" data-en="Dining Room" data-es="Comedor">Dining Room</a>
        <a href="custom-bedroom.html" data-en="Bedroom" data-es="Recámara">Bedroom</a>
        <a href="custom-office.html" data-en="Office" data-es="Oficina">Office</a>
        <a href="custom-outdoor.html" data-en="Outdoor" data-es="Exterior">Outdoor</a>
      </div>
    </li>
    <li class="nav-dropdown">
      <a href="#" data-en="New Furniture" data-es="Muebles Nuevos">New Furniture ▾</a>
      <div class="nav-dropdown-menu">
        <a href="new-kitchen.html" data-en="Kitchen" data-es="Cocina">Kitchen</a>
        <a href="new-living.html" data-en="Living Room" data-es="Sala">Living Room</a>
        <a href="new-dining.html" data-en="Dining Room" data-es="Comedor">Dining Room</a>
        <a href="new-bedroom.html" data-en="Bedroom" data-es="Recámara">Bedroom</a>
        <a href="new-office.html" data-en="Office" data-es="Oficina">Office</a>
        <a href="new-outdoor.html" data-en="Outdoor" data-es="Exterior">Outdoor</a>
      </div>
    </li>
    <li><a href="about.html" data-en="About" data-es="Nosotros">About</a></li>
    <li><a href="index.html#contact" class="nav-cta" data-en="Get a Quote" data-es="Cotizar">Get a Quote</a></li>
  `;
  nav.querySelector('.nav-links').innerHTML = catLinksEN;
  applyLang();
}

// ── TICKER ──
const tickerEN = ['Custom Fabrication', 'Metal · Wood · Stone', 'Chicago Made', 'Industrial Luxury', 'Made to Order', 'Premium Quality', 'Unique Designs', 'Fast Delivery', 'Your Vision Built'];
const tickerES = ['Fabricación Custom', 'Metal · Madera · Piedra', 'Hecho en Chicago', 'Lujo Industrial', 'A la Medida', 'Calidad Premium', 'Diseños Únicos', 'Entrega Rápida', 'Tu Visión Construida'];

function buildTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  const items = currentLang === 'es' ? tickerES : tickerEN;
  track.innerHTML = '';
  [...items, ...items, ...items].forEach((t, i, arr) => {
    const s = document.createElement('span');
    s.className = 'ticker-item'; s.textContent = t; track.appendChild(s);
    if (i < arr.length - 1) {
      const dot = document.createElement('span');
      dot.className = 'ticker-item ticker-sep'; dot.textContent = '·'; track.appendChild(dot);
    }
  });
}

// ── SCROLL REVEAL ──
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

// ── FORM SUBMIT ──
function handleSend(btn) {
  const msg = currentLang === 'es' ? '✓ Mensaje enviado — te contactamos pronto!' : '✓ Message Sent — We\'ll be in touch!';
  const orig = btn.getAttribute('data-' + currentLang) || btn.textContent;
  btn.textContent = msg;
  btn.style.background = '#2a7a2a'; btn.style.color = '#fff'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = ''; btn.style.color = ''; btn.disabled = false;
  }, 4000);
}
