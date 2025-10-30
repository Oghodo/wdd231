// === Responsive Navigation ===
const menuButton = document.getElementById("menu");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});