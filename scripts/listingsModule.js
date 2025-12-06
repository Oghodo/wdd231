// scripts/listingsModule.js

const listingsContainer = document.getElementById('listings-container');
const modal = document.getElementById('listing-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

if (listingsContainer) {
  fetch('data/listings.json')
    .then(response => response.json())
    .then(data => {
      displayListings(data);
    })
    .catch(error => {
      console.error('Error loading listings:', error);
      listingsContainer.innerHTML = '<p>Sorry, listings could not be loaded.</p>';
    });
}

// ===== Display Listings =====
function displayListings(listings) {
  // Load favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  listingsContainer.innerHTML = listings.map(listing => {
    const isFav = favorites.includes(listing.id) ? '★' : '☆';
    return `
      <div class="listing-card">
        <img src="${listing.image}" alt="${listing.title}" loading="lazy">
        <h3>${listing.title}</h3>
        <p><strong>Price:</strong> ₦${listing.price.toLocaleString()}</p>
        <p><strong>Location:</strong> ${listing.location}</p>
        <p><strong>Type:</strong> ${listing.type}</p>
        <button class="fav-btn" data-id="${listing.id}">${isFav}</button>
        <button class="details-btn" data-id="${listing.id}">View Details</button>
      </div>
    `;
  }).join('');

  // Attach event listeners for favorites
  const favButtons = document.querySelectorAll('.fav-btn');
  favButtons.forEach(btn => {
    btn.addEventListener('click', () => toggleFavorite(btn, listings));
  });

  // Attach event listeners for modal
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn, listings));
  });
}

// ===== Toggle Favorites =====
function toggleFavorite(button, listings) {
  const id = button.dataset.id;
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    button.textContent = '☆';
  } else {
    favorites.push(id);
    button.textContent = '★';
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===== Open Modal =====
function openModal(button, listings) {
  const id = button.dataset.id;
  const listing = listings.find(l => l.id === id);

  if (!listing) return;

  modalContent.innerHTML = `
    <h2>${listing.title}</h2>
    <img src="${listing.image}" alt="${listing.title}" loading="lazy">
    <p><strong>Price:</strong> ₦${listing.price.toLocaleString()}</p>
    <p><strong>Location:</strong> ${listing.location}</p>
    <p><strong>Type:</strong> ${listing.type}</p>
    <p>${listing.description}</p>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  // Focus first element inside modal
  modalContent.querySelector('h2').focus();
}

// ===== Close Modal =====
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

// ===== Close Modal with Escape =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});
