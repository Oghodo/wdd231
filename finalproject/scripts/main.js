// main.js
import { openModal, closeModal } from './modal.js';

const listingsContainer = document.getElementById('listings-container');

async function fetchListings() {
  try {
    const response = await fetch('data/listings.json');
    const data = await response.json();

    // Save to localStorage
    localStorage.setItem('listings', JSON.stringify(data));

    // Dynamically create cards
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('feature'); // Reusing CSS card styles

      card.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <button onclick="openModal('modal-${index}')">View Details</button>

        <!-- Modal -->
        <div class="modal" id="modal-${index}" style="display:none;">
          <div class="modal-content" style="background:#fff; padding:1rem; border-radius:5px; max-width:500px; margin:2rem auto; position:relative;">
            <span class="close" onclick="closeModal('modal-${index}')" style="position:absolute; top:10px; right:15px; cursor:pointer;">&times;</span>
            <h2>${item.title}</h2>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Description:</strong> ${item.description}</p>
          </div>
        </div>
      `;

      listingsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

fetchListings();
