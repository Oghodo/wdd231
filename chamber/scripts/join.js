// ===== Timestamp Injection =====
const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

// ===== Modal Functionality =====
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close");

modalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalID = btn.dataset.modal;
        const modal = document.getElementById(modalID);
        if (modal) {
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".modal");
        if (modal) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }
    });
});

// Close modal by clicking the background
window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
        e.target.setAttribute("aria-hidden", "true");
    }
});

// ===== Footer: Current Year & Last Modified =====
const yearEl = document.getElementById("currentYear");
const lastModEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;

// ===== Thank You Page Data Injection =====
const thanksMsg = document.getElementById("thankyouMessage");

if (thanksMsg) {
    const params = new URLSearchParams(window.location.search);

    const get = (name) => params.get(name) || "Not Provided";

    const submitted = get("timestamp") !== "Not Provided"
        ? get("timestamp")
        : new Date().toISOString();

    thanksMsg.innerHTML = `
        <p><strong>First Name:</strong> ${get("firstName")}</p>
        <p><strong>Last Name:</strong> ${get("lastName")}</p>
        <p><strong>Title:</strong> ${get("title")}</p>
        <p><strong>Email:</strong> ${get("email")}</p>
        <p><strong>Mobile:</strong> ${get("phone")}</p>
        <p><strong>Business/Organization Name:</strong> ${get("organization")}</p>
        <p><strong>Description:</strong> ${get("description")}</p>
        <p><strong>Submitted At:</strong> ${submitted}</p>
    `;
}
