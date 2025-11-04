// === scripts.js ===

// Display current year
document.querySelector("#currentYear").textContent = new Date().getFullYear();

// Display last modified date
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayMembers(members) {
  const container = document.getElementById("memberContainer");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      <p>Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
      <p>${member.description}</p>
    `;
    container.appendChild(card);
  });
}

// Load members on page load
loadMembers();

// Toggle between grid and list view
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const container = document.getElementById("memberContainer");

gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});
