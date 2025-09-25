document.addEventListener('DOMContentLoaded', () => {
  const bp = 900; // zelfde breakpoint als in je CSS
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');            // <nav id="menu" class="menu-overlay">
  const closeBtn = menu?.querySelector('.close');
  const links = menu?.querySelectorAll('a') || [];

  if (!menuBtn || !menu || !closeBtn) return;

  function isMobile() {
    return window.innerWidth < bp;
  }

  function openMenu() {
    if (!isMobile()) return;                     // desktop: niets doen
    menu.classList.add('open');                  // .menu-overlay.open { display:block; }
    document.body.style.overflow = 'hidden';
    menuBtn.style.display = 'none';              // knop verbergen op mobiel
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
    if (isMobile()) menuBtn.style.display = 'inline-block'; // knop terug op mobiel
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  // Clicks
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();                          // geen jump naar #menu
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  // Klik buiten de lijst (op de gele achtergrond) sluit ook
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  // Links sluiten ook
  links.forEach(a => a.addEventListener('click', closeMenu));

  // Escape sluit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Bij resize: op desktop altijd dicht + body unlock + knop terug
  function syncToViewport() {
    if (!isMobile()) {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      // Op desktop verberg je de knop al met CSS; toon hem hier voor de zekerheid weer.
      menuBtn.style.display = '';
    }
  }
  window.addEventListener('resize', syncToViewport);
  syncToViewport();
});
