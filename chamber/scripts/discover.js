// scripts/discover.js
const cardsContainer = document.querySelector('.cards-container');
const visitorMessage = document.getElementById('visitor-message');

fetch('discovery.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    if (!data || data.length === 0) {
      visitorMessage.textContent = 'No attractions found.';
      return;
    }

    visitorMessage.textContent = 'Welcome! Explore the top attractions and cultural highlights of Benin City.';

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="card-content">
          <h2>${item.name}</h2>
          <p><strong>Address:</strong> ${item.address}</p>
          <p>${item.description}</p>
          <a href="${item.link}" class="button" target="_blank" rel="noopener">Learn More</a>
        </div>
      `;

      cardsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching attractions:', error);
    visitorMessage.textContent = 'Failed to load attractions.';
  });
