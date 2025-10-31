// bron java gedeelte:https://chatgpt.com/share/68dc3965-1250-8004-8d77-85d698530a82

document.addEventListener('DOMContentLoaded', () => {
  // === Instellingen ===
  const mq = window.matchMedia('(max-width: 1024px)'); // zelfde breakpoint als je CSS
  const isMobile = () => mq.matches;

  // === Elementen ===
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu'); // <nav id="menu" class="menu-overlay">
  if (!menuBtn || !menu) return;

  const closeBtn = menu.querySelector('.close');
  const links = menu.querySelectorAll('a');

  // === ARIA / toegankelijkheid ===
  menuBtn.setAttribute('aria-controls', 'menu');
  menuBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');

  // === Acties ===
  function openMenu() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Verberg de knop alleen op mobile
    if (isMobile()) menuBtn.style.display = 'none';

    menuBtn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');

    // Focus naar sluitknop (als aanwezig)
    (closeBtn || menu).focus?.();
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = '';

    // Toon knop weer op mobile, reset op desktop
    if (isMobile()) {
      menuBtn.style.display = 'inline-block';
    } else {
      menuBtn.style.display = '';
    }

    menuBtn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    menuBtn.focus?.();
  }

  // === Events ===
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Klik op de achtergrond van de overlay sluit het menu
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  // Klik op navigatielinks sluit het menu
  links.forEach((a) => a.addEventListener('click', closeMenu));

  // Escape sluit het menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // === Viewport sync ===
  function syncToViewport() {
    if (!isMobile()) {
      // Op tablet/desktop: zorg dat alles netjes gereset is
      menu.classList.remove('open');
      document.body.style.overflow = '';
      menuBtn.style.display = '';
      menuBtn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    } else {
      // Op mobile: knop zichtbaar als menu dicht is
      if (!menu.classList.contains('open')) {
        menuBtn.style.display = 'inline-block';
      }
    }
  }

  // Luister naar breakpoint-wissel en resize
  mq.addEventListener?.('change', syncToViewport);
  window.addEventListener('resize', syncToViewport);

  // Initiale sync
  syncToViewport();
});

