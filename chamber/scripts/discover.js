// scripts/discover.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards-container");
  const visitorMessage = document.getElementById("visitor-message");

  try {
    // Fetch the JSON data
    const response = await fetch("discover.json");
    if (!response.ok) throw new Error("Failed to load attractions.");

    const attractions = await response.json();

    if (attractions.length === 0) {
      visitorMessage.textContent = "No attractions found at this time.";
      return;
    }

    // Clear visitor message if data exists
    visitorMessage.textContent = "Welcome! Explore the top attractions and cultural highlights of Benin City.";

    // Create card elements for each attraction
    attractions.forEach(attraction => {
      const card = document.createElement("div");
      card.className = "card";

      // Image
      const img = document.createElement("img");
      img.src = attraction.image;
      img.alt = attraction.name;

      // Card content container
      const content = document.createElement("div");
      content.className = "card-content";

      // Name / Title
      const title = document.createElement("h2");
      title.textContent = attraction.name;

      // Description
      const desc = document.createElement("p");
      desc.textContent = attraction.description;

      // Link button
      const link = document.createElement("a");
      link.href = attraction.link;
      link.textContent = "Learn More";
      link.className = "button";

      // Append elements
      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(link);

      card.appendChild(img);
      card.appendChild(content);

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    visitorMessage.textContent = "Failed to load attractions.";
  }
});
