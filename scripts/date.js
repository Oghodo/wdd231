// === date.js ===
// Dynamically sets the current year and last modified date in the footer

document.addEventListener('DOMContentLoaded', () => {
  const currentYearSpan = document.getElementById('currentyear');
  const lastModifiedSpan = document.getElementById('lastModified');

  // Update the current year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Update the last modified date
  if (lastModifiedSpan) {
    // document.lastModified returns a string; display as-is
    lastModifiedSpan.textContent = document.lastModified;
  }
});
