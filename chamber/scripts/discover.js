import { discoverItems } from '../data/discoverData.mjs';

// ===== Display Visitor Message =====
const visitorMessage = document.getElementById('visitorMessage');
if (visitorMessage) {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = "Welcome! Let us know if you have any questions.";

    if (lastVisit) {
        const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) message = "Back so soon! Awesome!";
        else message = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
    }
    visitorMessage.textContent = message;
    localStorage.setItem('lastVisit', now);
}

// ===== Populate Discover Cards =====
const cardsContainer = document.getElementById('discoverCards');
if (cardsContainer) {
    discoverItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        cardsContainer.appendChild(card);
    });
}

// ===== Footer Year & Last Modified =====
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
