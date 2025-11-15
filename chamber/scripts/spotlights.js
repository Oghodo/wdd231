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
    const filtered = members.filter(member =>
      member.membershipLevel === 2 || member.membershipLevel === 3
    );

    if (filtered.length === 0) {
      throw new Error("No Gold or Silver members found");
    }

    // ===== SHUFFLE & SELECT 2–3 MEMBERS =====
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedCount = Math.min(Math.floor(Math.random() * 2) + 2, filtered.length); // 2 or 3
    const selected = shuffled.slice(0, selectedCount);

    // ===== CLEAR EXISTING CONTENT =====
    if (spotlightsContainer) spotlightsContainer.innerHTML = "";

    // ===== CREATE & APPEND SPOTLIGHT CARDS =====
    selected.forEach(member => {
      const card = document.createElement("div");
      card.className = "spotlight-card";
      card.setAttribute("role", "region");
      card.setAttribute("aria-label", `${member.name} spotlight card`);

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h4>${member.name}</h4>
        <p>${member.description}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name} website">Visit Website</a>
        <p class="level">${member.membershipLevel === 3 ? "Gold" : "Silver"} Member</p>
      `;
      spotlightsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight loading failed:", error);
    if (spotlightsContainer) {
      spotlightsContainer.innerHTML = `<p class="error">Unable to load member spotlights at this time.</p>`;
    }
  }
}

/* ===== INITIALIZE SPOTLIGHTS ===== */
document.addEventListener("DOMContentLoaded", loadSpotlights);
