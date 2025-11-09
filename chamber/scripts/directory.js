/* === scripts/directory.js ===
   Benin City Chamber of Commerce Directory
   Handles footer info, member loading, grid/list toggle, and navigation
   Author: Omoregbe Oghodo
   ----------------------------------------------- */

/* Footer Date & Last Modified */
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

/* Load Members */
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
    document.getElementById("memberContainer").innerHTML = `
      <p class="error">⚠️ Unable to load member data at this time. Please try again later.</p>
    `;
  }
}

/* Display Members */
function displayMembers(members) {
  const container = document.getElementById("memberContainer");
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        <p><strong>Membership Level:</strong> ${["Member","Silver","Gold"][member.membershipLevel-1]}</p>
        <p>${member.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

/* Initialize Page */
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();

  /* Grid/List Toggle */
  const gridBtn = document.getElementById("gridView");
  const listBtn = document.getElementById("listView");
  const container = document.getElementById("memberContainer");

  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  });

  /* Navigation Menu Toggle & Wayfinding */
  const menuButton = document.getElementById("menuButton");
  const navMenu = document.getElementById("navMenu");
  const firstNavLink = navMenu.querySelector("a");

  if (menuButton && navMenu) {
    navMenu.setAttribute("aria-hidden", "true");

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("show");
      navMenu.setAttribute("aria-hidden", isExpanded);
      if (!isExpanded && firstNavLink) firstNavLink.focus();
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

  /* Highlight Current Page */
  const navLinks = navMenu.querySelectorAll("a");
  const currentPage = location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
