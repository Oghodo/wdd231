// === date.js ===
document.addEventListener("DOMContentLoaded", () => {
  const currentYearSpan = document.getElementById("currentyear");
  const lastModifiedSpan = document.getElementById("lastModified");

  // Display current year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Display formatted last modified date
  if (lastModifiedSpan) {
    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short"
    });
    lastModifiedSpan.textContent = formattedDate;
  }
});