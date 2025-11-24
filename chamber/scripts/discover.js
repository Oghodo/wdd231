// scripts/discover.js
import { discoverItems } from '../data/discoverData.mjs';

const cardsContainer = document.getElementById('cardsContainer');
const visitorMessage = document.getElementById('visitorMessage');

// ----- Visitor Message using localStorage -----
const lastVisitKey = 'lastVisit';
const now = Date.now();
const lastVisit = localStorage.getItem(lastVisitKey);

let message = '';
if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const daysSince = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
  if (daysSince === 0) {
    message = "Back so soon! Awesome!";
  } else if (daysSince === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysSince} days ago.`;
  }
}

visitorMessage.textContent = message;
localStorage.setItem(lastVisitKey, now);

// ----- Create Cards Dynamically -----
discoverItems.forEach(item => {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <figure class="card-image">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
    </figure>
    <h2>${item.title}</h2>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <a href="${item.link}" class="learn-more-button">Learn More</a>
  `;

  cardsContainer.appendChild(card);
});

// ----- Hover Effects for Desktop Only -----
const mediaQuery = window.matchMedia('(min-width: 641px)');
if (mediaQuery.matches) {
  const images = document.querySelectorAll('.card img');
  images.forEach(img => {
    img.style.transition = 'transform 0.3s ease, filter 0.3s ease';
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.filter = 'brightness(1.1)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.filter = 'brightness(1)';
    });
  });
}
