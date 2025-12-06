// modal.js

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Function to show the modal
export function showModal(listing) {
  modalBody.innerHTML = `
    <h2>${listing.title}</h2>
    <img src="${listing.image}" alt="${listing.title}" loading="lazy">
    <p><strong>Price:</strong> ${listing.price}</p>
    <p><strong>Location:</strong> ${listing.location}</p>
    <p>${listing.description}</p>
  `;
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  modalClose.focus();
}

// Function to close the modal
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
}

// Close button event
modalClose.addEventListener('click', closeModal);

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Close modal if clicked outside modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
