// === date.js ===
document.addEventListener('DOMContentLoaded', () => {
  const currentYearSpan = document.getElementById('currentyear');
  const lastModifiedSpan = document.getElementById('lastModified');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    // document.lastModified returns a string; show it as-is
    lastModifiedSpan.textContent = document.lastModified;
  }
});
