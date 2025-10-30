// === navigation.js ===
// Accessible responsive navigation for the hamburger menu.
// Works with #menuToggle and #primaryNav in the markup.

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('primaryNav');

  if (!menuButton || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    navMenu.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  menuButton.addEventListener('click', (e) => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu();
    else openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  // Close if clicking outside the nav (mobile)
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
});
// End of navigation.js