// scripts/form.js

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic JS validation
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Encode data for URL
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('phone', phone);
    params.append('message', message);

    // Redirect to form action page
    window.location.href = `form-action.html?${params.toString()}`;
  });
}
