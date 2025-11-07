// === scripts.js ===
// Handles date display, member loading, and view toggling for the directory page

// === Footer Information ===
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// === Load and Display Members ===
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
    document.getElementById("memberContainer").innerHTML = `
      <p class="error">Unable to load member data at this time. Please try again later.</p>
    `;
  }
}

// === Display Members in Grid/List View ===
function displayMembers(members) {
  const container = document.getElementById("memberContainer");
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        <p><strong>Membership Level:</strong> ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
        <p>${member.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// === Initialize Page ===
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();

  const gridBtn = document.getElementById("gridView");
  const listBtn = document.getElementById("listView");
  const container = document.getElementById("memberContainer");

  // Toggle between grid and list view
  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  });
});
