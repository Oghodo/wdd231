// === date.js ===
document.addEventListener('DOMContentLoaded', () => {
  const currentYearSpan = document.getElementById('currentyear');
  const lastModifiedP = document.getElementById('lastModified');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
  }
});
