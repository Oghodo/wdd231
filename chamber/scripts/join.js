// ===== Populate hidden timestamp =====
const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();

    // Optional debug display below the form
    const timestampDebug = document.createElement('p');
    timestampDebug.style.fontSize = '0.9rem';
    timestampDebug.style.color = '#fff';
    timestampDebug.style.marginTop = '10px';
    timestampDebug.textContent = `DEBUG: Timestamp set to ${timestampInput.value}`;
    document.querySelector('form').appendChild(timestampDebug);
}

// ===== Modal functionality =====
const modalButtons = document.querySelectorAll('.card button');
const closeButtons = document.querySelectorAll('.close');

modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'flex';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
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

    // Safely get each parameter or fallback to "N/A"
    const firstName = params.get('firstName') || 'N/A';
    const lastName = params.get('lastName') || 'N/A';
    const title = params.get('title') || 'N/A';
    const email = params.get('email') || 'N/A';
    const phone = params.get('phone') || 'N/A';
    const organization = params.get('organization') || 'N/A';
    const description = params.get('description') || 'N/A';
    let submittedAt = params.get('timestamp');

    // If timestamp is missing, set it to current time
    if (!submittedAt) {
        submittedAt = new Date().toISOString();
    }

    thankyouMessage.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${phone}</p>
        <p><strong>Business/Organization Name:</strong> ${organization}</p>
        <p><strong>Business Description:</strong> ${description}</p>
        <p><strong>Submitted At:</strong> ${submittedAt}</p>
    `;
}
