// === navigation.js ===
// Accessible responsive navigation for hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('primaryNav');

  if (!menuButton || !navMenu) return;

  // Open menu
  function openMenu() {
    navMenu.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close Navigation Menu');
  }

  // Close menu
  function closeMenu() {
    navMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open Navigation Menu');
  }

  // Toggle menu
  menuButton.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Optional: Close menu on focus out (improves accessibility)
  navMenu.addEventListener('focusout', (e) => {
    if (!navMenu.contains(e.relatedTarget)) {
      closeMenu();
    }
  });
});
