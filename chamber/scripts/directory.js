// Footer Date
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Navigation Menu
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const firstLink = navMenu.querySelector("a");

if (menuButton && navMenu) {
  navMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("show");
    navMenu.setAttribute("aria-hidden", isExpanded);
    if (!isExpanded && firstLink) firstLink.focus();
  });

  document.addEventListener("click", (ev) => {
    if (!navMenu.contains(ev.target) && !menuButton.contains(ev.target)) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (ev) => {
    if ((ev.key === "Escape" || ev.key === "Esc") && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
      menuButton.focus();
    }
  });
}

// Highlight Current Page
const navLinks = navMenu.querySelectorAll("a");
const currentPage = location.pathname.split("/").pop() || "index.html";
navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
