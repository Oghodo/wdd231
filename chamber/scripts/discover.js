// =========================
// Discover Page JavaScript
// =========================

// Import data
import { discoverItems } from '../data/discoverData.mjs';

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');
const currentYearEl = document.getElementById('currentYear');
const lastModifiedEl = document.getElementById('lastModified');

// ===== Populate Cards =====
function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="card-content">
      <h3>${item.title}</h3>
      <p><strong>Address:</strong> ${item.address}</p>
      <p>${item.description}</p>
      <a href="${item.link}">Learn More</a>
    </div>
  `;
  return card;
}

// Append all cards
discoverItems.forEach(item => {
  const card = createCard(item);
  cardsContainer.appendChild(card);
});

// ===== Footer Info =====
const currentYear = new Date().getFullYear();
currentYearEl.textContent = currentYear;

lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
