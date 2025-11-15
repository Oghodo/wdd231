/* === spotlights.js ===
   Benin City Chamber of Commerce Member Spotlights
   Displays 2–3 random Gold/Silver members from members.json
   Author: Omoregbe Oghodo
*/

const spotlightsContainer = document.getElementById("spotlights");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const members = await response.json();

    // Filter only Silver (2) and Gold (3) members
    const filtered = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle array
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    // Pick 2–3 members
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    // Clear container
    spotlightsContainer.innerHTML = "";

    // Add spotlight cards
    selected.forEach(member => {
      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
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

// Load on page ready
document.addEventListener("DOMContentLoaded", loadSpotlights);
