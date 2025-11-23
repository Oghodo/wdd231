// ================== DISCOVER.JS ==================

// Visitor message using localStorage
const visitDisplay = document.getElementById("last-visit");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000*60*60*24));
    if (days === 0) {
        visitDisplay.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        visitDisplay.textContent = "You last visited 1 day ago.";
    } else {
        visitDisplay.textContent = `You last visited ${days} days ago.`;
    }
}
localStorage.setItem("lastVisit", now);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
    menuButton.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("open");
});

// Load JSON and build cards
const gridContainer = document.querySelector(".places-grid");
fetch("discover.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(place => {
            const card = document.createElement("div");
            card.className = "place-card";
            card.innerHTML = `
                <img src="${place.image}" alt="${place.name}" loading="lazy">
                <div class="place-info">
                    <span class="category-tag">${place.category}</span>
                    <h2>${place.name}</h2>
                    <p class="address">${place.address}</p>
                    <p class="description">${place.description}</p>
                    <a href="${place.link}" target="_blank" rel="noopener">Learn More</a>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading JSON:", err));
