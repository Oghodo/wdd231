// ===== Populate Hidden Timestamp =====
const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();

    const timestampDebug = document.createElement("p");
    timestampDebug.style.fontSize = "0.9rem";
    timestampDebug.style.color = "#fff";
    timestampDebug.style.marginTop = "10px";
    timestampDebug.textContent = `DEBUG: Timestamp set to ${timestampInput.value}`;
    document.querySelector("form")?.appendChild(timestampDebug);
}

// ===== Modal Functionality =====
const modalButtons = document.querySelectorAll(".card button");
const closeButtons = document.querySelectorAll(".close");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "flex";
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        if (modal) modal.style.display = "none";
    });
});

// Close modal on background click
window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});

// ===== Footer: Current Year + Last Modified =====
const yearEl = document.getElementById("currentYear");
const lastModEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;

// ===== Thank You Page Data Display =====
const thankyouMessage = document.getElementById("thankyouMessage");

if (thankyouMessage) {
    const params = new URLSearchParams(window.location.search);

    const get = name => params.get(name) || "N/A";

    const submittedAt = get("timestamp") !== "N/A"
        ? get("timestamp")
        : new Date().toISOString();

    thankyouMessage.innerHTML = `
        <p><strong>First Name:</strong> ${get("firstName")}</p>
        <p><strong>Last Name:</strong> ${get("lastName")}</p>
        <p><strong>Title:</strong> ${get("title")}</p>
        <p><strong>Email:</strong> ${get("email")}</p>
        <p><strong>Mobile:</strong> ${get("phone")}</p>
        <p><strong>Business/Organization Name:</strong> ${get("organization")}</p>
        <p><strong>Business Description:</strong> ${get("description")}</p>
        <p><strong>Submitted At:</strong> ${submittedAt}</p>
    `;
}
