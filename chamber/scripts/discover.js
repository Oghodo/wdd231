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
  card.className = 'card';

  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="card-content">
      <h3>${item.title}</h3>
      <p><strong>Address:</strong> ${item.address}</p>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
    </div>
  `;
  return card;
}

// Append cards if container exists
if (cardsContainer && Array.isArray(discoverItems)) {
  discoverItems.forEach(item => {
    cardsContainer.appendChild(createCard(item));
  });
}

// ===== Footer Info =====
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
