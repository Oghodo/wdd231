// scripts/discover.js
import { discoverItems } from '../data/discoverData.mjs';

// ===== DYNAMIC CARDS =====
const cardsContainer = document.getElementById('cardsContainer');

discoverItems.forEach((item, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.gridArea = `card${index + 1}`; // Named grid area

  card.innerHTML = `
    <figure>
      <img src="${item.image}" alt="${item.title}" loading="lazy">
    </figure>
    <h2>${item.title}</h2>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button onclick="window.location.href='${item.link}'">Learn More</button>
  `;

  cardsContainer.appendChild(card);
});

// ===== LOCALSTORAGE VISITOR MESSAGE =====
const visitorMessage = document.getElementById('visitorMessage');
const lastVisitKey = 'lastVisit';
const now = Date.now();
const lastVisit = localStorage.getItem(lastVisitKey);

if (!lastVisit) {
  visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    visitorMessage.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitorMessage.textContent = `You last visited 1 day ago.`;
  } else {
    visitorMessage.textContent = `You last visited ${days} days ago.`;
  }
}

// Update localStorage with current visit
localStorage.setItem(lastVisitKey, now);
