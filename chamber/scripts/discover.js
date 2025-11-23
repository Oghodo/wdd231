// scripts/discover.js
import { discoverItems } from "../data/discoverItems.mjs";

// ===== Populate cards dynamically =====
const cardsContainer = document.getElementById("cardsContainer");

if (cardsContainer) {
  discoverItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    cardsContainer.appendChild(card);
  });
}

// ===== Display localStorage visit message =====
const visitMessage = document.getElementById("visitMessage");

if (visitMessage) {
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");
  let message = "Welcome! Let us know if you have any questions.";

  if (lastVisit) {
    const days = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  visitMessage.textContent = message;
  localStorage.setItem("lastVisit", now);
}
