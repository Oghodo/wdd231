// scripts/discover.js
const cardsContainer = document.getElementById('cards-container');
const visitorMessage = document.getElementById('visitor-message');

async function fetchAttractions() {
  try {
    const response = await fetch('discovery.json');
    const attractions = await response.json();
    displayVisitorMessage();
    createFilterButtons(attractions);
    displayCards(attractions);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    cardsContainer.innerHTML = '<p>Failed to load attractions.</p>';
  }
}

function displayVisitorMessage() {
  const name = localStorage.getItem('visitorName') || 'Guest';
  visitorMessage.textContent = `Welcome, ${name}! Explore the top attractions in Benin City.`;
}

function createFilterButtons(attractions) {
  // Get unique categories
  const categories = ['All', ...new Set(attractions.map(a => a.category))];

  const filterContainer = document.createElement('div');
  filterContainer.classList.add('filter-buttons');
  filterContainer.style.textAlign = 'center';
  filterContainer.style.marginBottom = '1.5rem';

  categories.forEach(cat => {
    const button = document.createElement('button');
    button.textContent = cat;
    button.classList.add('filter-btn');
    button.style.margin = '0 0.5rem';
    button.style.padding = '0.5rem 1rem';
    button.style.border = 'none';
    button.style.borderRadius = 'var(--border-radius)';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = 'var(--primary-color)';
    button.style.color = 'var(--white)';
    button.style.fontWeight = '700';
    button.addEventListener('click', () => filterCards(cat, attractions));
    filterContainer.appendChild(button);
  });

  cardsContainer.parentNode.insertBefore(filterContainer, cardsContainer);
}

function filterCards(category, attractions) {
  const filtered = category === 'All' 
    ? attractions 
    : attractions.filter(a => a.category === category);
  displayCards(filtered);
}

function displayCards(attractions) {
  cardsContainer.innerHTML = '';
  attractions.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="images/${a.image}" alt="${a.name}">
      <div class="card-content">
        <h2>${a.name}</h2>
        <p><strong>Address:</strong> ${a.address}</p>
        <p>${a.description}</p>
        <a class="button" href="${a.link}" target="_blank" rel="noopener">Learn More</a>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Run
fetchAttractions();
