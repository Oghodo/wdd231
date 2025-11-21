// ===== discover.js =====
const cardsContainer = document.getElementById('cards-container');
const visitorMessage = document.getElementById('visitor-message');

// ===== LocalStorage: Last Visit Message =====
const lastVisit = localStorage.getItem('lastVisit');
const now = new Date();

if (lastVisit) {
  visitorMessage.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;
} else {
  visitorMessage.textContent = 'Welcome to Benin City! Explore the top attractions below.';
}

// Update localStorage
localStorage.setItem('lastVisit', now.toLocaleString());

// ===== Current Year and Last Modified =====
document.getElementById('currentYear').textContent = now.getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// ===== Fetch JSON Data and Generate Cards =====
async function loadCards() {
  try {
    const response = await fetch('data/discover.json');
    if (!response.ok) throw new Error('Failed to load JSON data');
    
    const cardsData = await response.json();

    cardsData.forEach(card => {
      // Create card element
      const cardEl = document.createElement('div');
      cardEl.classList.add('card');

      // Add inner HTML
      cardEl.innerHTML = `
        <img src="images/${card.image}" alt="${card.name}" loading="lazy">
        <div class="card-content">
          <h2>${card.name}</h2>
          <p><strong>Address:</strong> ${card.address}</p>
          <p>${card.description}</p>
          <a href="${card.link}" class="button" target="_blank" rel="noopener">Learn More</a>
        </div>
      `;

      // Append to container
      cardsContainer.appendChild(cardEl);
    });
  } catch (error) {
    console.error('Error loading cards:', error);
    cardsContainer.textContent = 'Sorry, unable to load points of interest at this time.';
  }
}

// Load cards on page load
window.addEventListener('DOMContentLoaded', loadCards);
