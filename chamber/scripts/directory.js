/* ==============================================
   directory.js
   Benin City Chamber of Commerce
   Handles footer, navigation, and page highlights
   Author: Omoregbe Oghodo
============================================== */

/* ===== FOOTER DATES ===== */
const currentYearElem = document.querySelector("#currentYear");
const lastModifiedElem = document.querySelector("#lastModified");

if (currentYearElem) currentYearElem.textContent = new Date().getFullYear();
if (lastModifiedElem) lastModifiedElem.textContent = `Last Modified: ${document.lastModified}`;

/* ===== NAVIGATION MENU ===== */
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const firstNavLink = navMenu?.querySelector("a");

if (menuButton && navMenu) {
  // Initial ARIA setup
  navMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");

  // Toggle menu on button click
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("show");
    navMenu.setAttribute("aria-hidden", isExpanded);

    if (!isExpanded && firstNavLink) firstNavLink.focus();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
    }
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (event) => {
    if ((event.key === "Escape" || event.key === "Esc") && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
      menuButton.focus();
    }
  });
}

/* ===== HIGHLIGHT CURRENT PAGE ===== */
const navLinks = navMenu?.querySelectorAll("a") || [];
const currentPage = location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
