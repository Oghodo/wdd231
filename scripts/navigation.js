// === navigation.js ===
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuToggle');
  const navMenu = document.getElementById('primaryNav');

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

    // Toggle "open" class for mobile nav visibility
    navMenu.classList.toggle('open');

    // Update aria-expanded for accessibility
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
  });
});
