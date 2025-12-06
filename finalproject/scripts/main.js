// scripts/main.js

// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('#nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('nav-open');
  });
}

// ===== Close navigation when a link is clicked (small screens) =====
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
});

// ===== Optional: Accessibility improvements =====
// Close navigation with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
    nav.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.focus();
  }
});
