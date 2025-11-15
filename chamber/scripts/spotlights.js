/* ==============================================
   spotlights.js
   Benin City Chamber of Commerce Member Spotlights
   Displays 2–3 random Gold/Silver members from members.json
   Author: Omoregbe Oghodo
============================================== */

const spotlightsContainer = document.getElementById("spotlights");

/* ===== LOAD SPOTLIGHTS FUNCTION ===== */
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const members = await response.json();

    // ===== FILTER Gold & Silver Members =====
    const filtered = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // ===== SHUFFLE & SELECT 2–3 MEMBERS =====
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 members
    const selected = shuffled.slice(0, selectedCount);

    // ===== CLEAR EXISTING CONTENT =====
    if (spotlightsContainer) spotlightsContainer.innerHTML = "";

    // ===== CREATE & APPEND SPOTLIGHT CARDS =====
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
    if (spotlightsContainer) {
      spotlightsContainer.innerHTML = `<p class="error">Unable to load member spotlights right now.</p>`;
    }
  }
}

/* ===== INITIALIZE SPOTLIGHTS ===== */
document.addEventListener("DOMContentLoaded", loadSpotlights);
