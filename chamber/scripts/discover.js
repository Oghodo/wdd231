// =========================
// Discover Page JavaScript
// =========================

// Import data
import { discoverItems } from '../data/discoverData.mjs';

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');

// ===== Populate Cards =====
function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Ensure images have alt text for accessibility
  card.innerHTML = `
    <img src="../images/${item.image}" alt="${item.title} image of ${item.title}">
    <div class="card-content">
      <h3>${item.title}</h3>
      <p><strong>Address:</strong> ${item.address}</p>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">Learn More</a>
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
const currentYearEl = document.createElement('span');
currentYearEl.textContent = new Date().getFullYear();

const footer = document.querySelector('footer');
footer.innerHTML = `&copy; <span id="currentYear">${currentYearEl.textContent}</span> Benin City Chamber of Commerce<br>
  Last modified: ${document.lastModified}`;
