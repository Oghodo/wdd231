/* === spotlights.js ===
   Displays 2–3 random gold/silver member spotlights
   using data from members.json.
   Author: Omoregbe Oghodo
*/

const spotlightsContainer = document.querySelector("#spotlights");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // Filter only Gold (3) and Silver (2) members
    const filteredMembers = data.filter(member =>
      member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Shuffle and pick 2–3 random members
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3 members

    // Clear any existing content
    spotlightsContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h4>${member.name}</h4>
        <p>${member.description}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p class="level">${member.membershipLevel === 3 ? "Gold" : "Silver"} Member</p>
      `;
      spotlightsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight loading failed:", error);
    spotlightsContainer.innerHTML = `<p class="error">Unable to load member spotlights right now.</p>`;
  }
}

loadSpotlights();
