// bron java gedeelte:https://chatgpt.com/share/68dc3965-1250-8004-8d77-85d698530a82

document.addEventListener('DOMContentLoaded', () => {
  const bp = 900; 
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');            
  const closeBtn = menu?.querySelector('.close');
  const links = menu?.querySelectorAll('a') || [];

  if (!menuBtn || !menu || !closeBtn) return;

  function isMobile() {
    return window.innerWidth < bp;
  }

  function openMenu() {
    if (!isMobile()) return;                     
    menu.classList.add('open');                 
    document.body.style.overflow = 'hidden';
    menuBtn.style.display = 'none';              
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
    if (isMobile()) menuBtn.style.display = 'inline-block';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  // Clicks
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();                        
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  
  menu.addEventListener('click', (e) => {
    if (e.target === menu) closeMenu();
  });

  
  links.forEach(a => a.addEventListener('click', closeMenu));

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function syncToViewport() {
    if (!isMobile()) {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      menuBtn.style.display = '';
    }
  }
  window.addEventListener('resize', syncToViewport);
  syncToViewport();
});
