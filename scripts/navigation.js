// === navigation.js ===
// Accessible responsive navigation for the hamburger menu
// Works with #menuToggle and #primaryNav in the markup

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('primaryNav');

  if (!menuButton || !navMenu) return;

  /**
   * Closes the navigation menu
   */
  function closeMenu() {
    navMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  /**
   * Opens the navigation menu
   */
  function openMenu() {
    navMenu.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  /**
   * Toggles the navigation menu on button click
   */
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) closeMenu();
    else openMenu();
  });

  /**
   * Close the menu when Escape key is pressed
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  /**
   * Close the menu if clicking outside the nav
   */
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
});
