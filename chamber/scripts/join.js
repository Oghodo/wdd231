// ===== Populate hidden timestamp =====
const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

// ===== Modal functionality =====
const modalButtons = document.querySelectorAll('.card button');
const closeButtons = document.querySelectorAll('.close');

modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.dataset.modal);
        if (modal) modal.style.display = 'flex';
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ===== Update footer: current year and last modified =====
const yearEl = document.getElementById('currentYear');
const lastModEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;

// ===== Display form data on thankyou.html =====
const thankyouMessage = document.getElementById('thankyouMessage');
if (thankyouMessage) {
    const params = new URLSearchParams(window.location.search);
    thankyouMessage.innerHTML = `
        <strong>First Name:</strong> ${params.get('firstName')}<br>
        <strong>Last Name:</strong> ${params.get('lastName')}<br>
        <strong>Email:</strong> ${params.get('email')}<br>
        <strong>Mobile:</strong> ${params.get('phone')}<br>
        <strong>Business/Organization Name:</strong> ${params.get('organization')}<br>
        <strong>Membership Level:</strong> ${params.get('membership')}<br>
        <strong>Business Description:</strong> ${params.get('description')}<br>
        <strong>Submitted At:</strong> ${params.get('timestamp')}
    `;
}
// ===== End of script =====//