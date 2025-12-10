// data.js
const listingsContainer = document.getElementById('listings-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalPrice = document.getElementById('modal-price');
const modalBedBath = document.getElementById('modal-bedbath');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');

// Fetch listings
async function fetchListings() {
  try {
    const response = await fetch('../data/listings.json');
    const listings = await response.json();

    listings.forEach(listing => {
      const card = document.createElement('div');
      card.classList.add('listing-card');
      card.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <h3>${listing.title}</h3>
        <p>${listing.price}</p>
        <p>${listing.bedrooms} Bed | ${listing.bathrooms} Bath</p>
      `;
      card.addEventListener('click', () => showModal(listing));
      listingsContainer.appendChild(card);

      // Save to localStorage
      localStorage.setItem(`listing-${listing.id}`, JSON.stringify(listing));
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

// Show Modal
function showModal(listing) {
  modalTitle.textContent = listing.title;
  modalImg.src = listing.image;
  modalImg.alt = listing.title;
  modalPrice.textContent = listing.price;
  modalBedBath.textContent = `${listing.bedrooms} Bed | ${listing.bathrooms} Bath`;
  modalDesc.textContent = listing.description;
  modal.style.display = 'block';
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

fetchListings();
