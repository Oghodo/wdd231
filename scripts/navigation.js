// === navigation.js ===
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuToggle");
  const navMenu = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuButton || !navMenu) return; // Safety check

  // Toggle the navigation for small screens
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
  });

  // Close menu when clicking outside (small screens)
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && e.target !== menuButton && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Close nav on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });

  // Mark active nav link based on current path
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (href === 'index.html' && current === '')) {
      link.classList.add('active');
    }
  });
});