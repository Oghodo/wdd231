// Display last visit message
const welcomeMsg = document.getElementById('welcomeMsg');
const lastVisit = localStorage.getItem('lastVisit');

if (lastVisit) {
  welcomeMsg.textContent = `Welcome back! Your last visit was on ${lastVisit}`;
} else {
  welcomeMsg.textContent = 'Welcome to our Chamber directory!';
}

localStorage.setItem('lastVisit', new Date().toLocaleString());

// Fetch JSON and build cards
const cardsContainer = document.getElementById('cardsContainer');

fetch('data/properties.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.gridArea = `card${index + 1}`; // named grid areas

      card.innerHTML = `
        <div class="card-image">
          <img src="${item.photo}" alt="${item.title}" loading="lazy">
        </div>
        <div class="card-content">
          <h3>${item.title}</h3>
          <p class="address">${item.address}</p>
          <p class="description">${item.description}</p>
          <a href="${item.link}" class="learn-more">Learn More</a>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));
